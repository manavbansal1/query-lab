import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'querylab';

let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

// Sample data templates
const SAMPLE_DATA = {
    users: [
        { name: 'Alice Johnson', email: 'alice@example.com', age: 28, city: 'New York' },
        { name: 'Bob Smith', email: 'bob@example.com', age: 35, city: 'Los Angeles' },
        { name: 'Carol White', email: 'carol@example.com', age: 42, city: 'Chicago' },
        { name: 'David Brown', email: 'david@example.com', age: 31, city: 'Houston' },
        { name: 'Eve Davis', email: 'eve@example.com', age: 29, city: 'Phoenix' }
    ],
    posts: [
        { title: 'Getting Started with MongoDB', author: 'John Doe', views: 1500, category: 'Tutorial', published: new Date() },
        { title: 'Advanced Aggregation Pipeline', author: 'Jane Smith', views: 2300, category: 'Advanced', published: new Date() },
        { title: 'Database Optimization Tips', author: 'Mike Johnson', views: 890, category: 'Tips', published: new Date() }
    ],
    products: [
        { name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, rating: 4.5 },
        { name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 50, rating: 4.2 },
        { name: 'Office Chair', category: 'Furniture', price: 199.99, stock: 8, rating: 4.7 },
        { name: 'Desk Lamp', category: 'Furniture', price: 45.00, stock: 25, rating: 4.0 },
        { name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 100, rating: 4.3 }
    ]
};
const DB_TYPE_COLLECTIONS = {
    users: ['users'],           
    blog: ['posts'],            
    ecommerce: ['products'],    
    custom: []                  
};

// Track session activity
async function updateSessionActivity(db, sessionId) {
    const metadataCollection = db.collection('session_metadata');
    
    await metadataCollection.updateOne(
        { sessionId },
        { 
            $set: { 
                sessionId,
                lastActivity: new Date(),
                updatedAt: new Date()
            },
            $setOnInsert: {
                createdAt: new Date()
            }
        },
        { upsert: true }
    );
}

// Initialize session collections with sample data
async function initializeSession(db, sessionId, dbType) {
    // Get collections for this database type
    const collections = DB_TYPE_COLLECTIONS[dbType] || [];
    
    for (const collectionName of collections) {
        const sessionCollectionName = `${collectionName}_${sessionId}`;
        const collection = db.collection(sessionCollectionName);
        
        // Check if already initialized
        const count = await collection.countDocuments();
        if (count === 0 && SAMPLE_DATA[collectionName]) {
            await collection.insertMany(SAMPLE_DATA[collectionName]);
        }
    }
}

// Parse and execute MongoDB query with session isolation
async function executeQuery(db, queryString, sessionId) {
    // Remove comments and trim
    queryString = queryString.replace(/\/\/.*/g, '').trim();

    // Parse: db.collection.operation(...)
    const regex = /db\.(\w+)\.(\w+)\((.*)\)/s;
    const match = queryString.match(regex);

    if (!match) {
        throw new Error('Invalid query format. Use: db.collection.operation(...)');
    }

    const [, collectionName, operation, argsString] = match;
    
    // Add session ID to collection name
    const sessionCollectionName = `${collectionName}_${sessionId}`;
    const collection = db.collection(sessionCollectionName);

    // Parse arguments
    let args = [];
    if (argsString.trim()) {
        try {
            // Safely evaluate arguments
            args = new Function(`'use strict'; return [${argsString}]`)();
        } catch (e) {
            throw new Error('Invalid query arguments: ' + e.message);
        }
    }

    // Execute operation
    switch (operation) {
        case 'find': {
            const query = args[0] || {};
            const options = args[1] || {};
            
            let cursor = collection.find(query);
            
            if (options.sort) cursor = cursor.sort(options.sort);
            if (options.limit) cursor = cursor.limit(options.limit);
            else cursor = cursor.limit(100);
            
            return await cursor.toArray();
        }
        
        case 'findOne': {
            const doc = await collection.findOne(args[0] || {});
            return doc ? [doc] : [];
        }
        
        case 'insertOne': {
            const result = await collection.insertOne(args[0]);
            return [{ acknowledged: true, insertedId: result.insertedId }];
        }
        
        case 'insertMany': {
            const result = await collection.insertMany(args[0]);
            return [{ acknowledged: true, insertedCount: result.insertedCount }];
        }
        
        case 'updateOne': {
            const result = await collection.updateOne(args[0], args[1]);
            return [{ 
                acknowledged: true, 
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount 
            }];
        }
        
        case 'updateMany': {
            const result = await collection.updateMany(args[0], args[1]);
            return [{ 
                acknowledged: true, 
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount 
            }];
        }
        
        case 'deleteOne': {
            const result = await collection.deleteOne(args[0]);
            return [{ acknowledged: true, deletedCount: result.deletedCount }];
        }
        
        case 'deleteMany': {
            const result = await collection.deleteMany(args[0]);
            return [{ acknowledged: true, deletedCount: result.deletedCount }];
        }
        
        case 'countDocuments': {
            const count = await collection.countDocuments(args[0] || {});
            return [{ count }];
        }
        
        case 'aggregate': {
            const pipeline = args[0] || [];
            return await collection.aggregate(pipeline).toArray();
        }
        
        default:
            throw new Error(`Operation '${operation}' is not supported yet`);
    }
}

// POST - Execute query
export async function POST(req) {
    try {
        const { query, sessionId, dbType } = await req.json();

        if (!query) {
            return Response.json({ error: 'Query is required' }, { status: 400 });
        }

        if (!sessionId) {
            return Response.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db(DB_NAME);

        // Track session activity
        await updateSessionActivity(db, sessionId);

        // Initialize session collections if needed
        if (dbType && dbType !== 'custom') {
            await initializeSession(db, sessionId, dbType);
        }

        // Execute query
        const results = await executeQuery(db, query, sessionId);

        return Response.json({
            success: true,
            results,
            count: results.length
        });
    } catch (error) {
        console.error('MongoDB query error:', error);
        return Response.json({
            error: error.message || 'Failed to execute query'
        }, { status: 500 });
    }
}

// GET - Get schema for session
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        const dbType = searchParams.get('dbType') || 'users';

        if (!sessionId) {
            return Response.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db(DB_NAME);

        // Track session activity
        await updateSessionActivity(db, sessionId);

        // Initialize session collections if they don't exist
        if (dbType !== 'custom') {
            await initializeSession(db, sessionId, dbType);
        }

        // Get all collections for this session
        const allCollections = await db.listCollections().toArray();
        const sessionCollections = allCollections.filter(c => c.name.endsWith(`_${sessionId}`));

        const schema = {};

        // Get allowed collections for this database type
        const allowedCollections = DB_TYPE_COLLECTIONS[dbType] || [];

        for (const collection of sessionCollections) {
            const collectionName = collection.name.replace(`_${sessionId}`, '');
            
            // Only include collections that belong to the current database type
            if (allowedCollections.includes(collectionName) || dbType === 'custom') {
                const sampleDoc = await db.collection(collection.name).findOne();
                schema[collectionName] = sampleDoc ? Object.keys(sampleDoc) : [];
            }
        }

        return Response.json({ success: true, schema });
    } catch (error) {
        console.error('Schema fetch error:', error);
        return Response.json({ error: 'Failed to fetch schema' }, { status: 500 });
    }
}