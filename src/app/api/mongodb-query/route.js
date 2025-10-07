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
    // Users & Orders Database
    users: [
        { _id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, created_at: new Date() },
        { _id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 35, created_at: new Date() },
        { _id: 3, name: 'Carol White', email: 'carol@example.com', age: 42, created_at: new Date() },
        { _id: 4, name: 'David Brown', email: 'david@example.com', age: 31, created_at: new Date() },
        { _id: 5, name: 'Eve Davis', email: 'eve@example.com', age: 29, created_at: new Date() }
    ],
    orders: [
        { _id: 1, user_id: 1, product: 'Laptop', amount: 1200.00, order_date: new Date() },
        { _id: 2, user_id: 1, product: 'Mouse', amount: 25.50, order_date: new Date() },
        { _id: 3, user_id: 2, product: 'Keyboard', amount: 75.00, order_date: new Date() },
        { _id: 4, user_id: 3, product: 'Monitor', amount: 350.00, order_date: new Date() },
        { _id: 5, user_id: 2, product: 'Headphones', amount: 89.99, order_date: new Date() },
        { _id: 6, user_id: 4, product: 'Webcam', amount: 120.00, order_date: new Date() },
        { _id: 7, user_id: 5, product: 'Desk', amount: 450.00, order_date: new Date() },
        { _id: 8, user_id: 1, product: 'Chair', amount: 299.99, order_date: new Date() }
    ],
    
    // Blog Database
    posts: [
        { _id: 1, title: 'Getting Started with SQL', content: 'SQL is a powerful database language...', author: 'John Doe', views: 1500, published_at: new Date() },
        { _id: 2, title: 'Advanced Joins Explained', content: 'Understanding different types of joins...', author: 'Jane Smith', views: 2300, published_at: new Date() },
        { _id: 3, title: 'Database Optimization Tips', content: 'Here are 10 tips to optimize...', author: 'Mike Johnson', views: 890, published_at: new Date() }
    ],
    comments: [
        { _id: 1, post_id: 1, author: 'Alice', comment: 'Great tutorial!', created_at: new Date() },
        { _id: 2, post_id: 1, author: 'Bob', comment: 'Very helpful, thanks!', created_at: new Date() },
        { _id: 3, post_id: 2, author: 'Carol', comment: 'Could you explain LEFT JOIN more?', created_at: new Date() },
        { _id: 4, post_id: 2, author: 'David', comment: 'Excellent examples', created_at: new Date() },
        { _id: 5, post_id: 3, author: 'Eve', comment: 'These tips saved me hours!', created_at: new Date() }
    ],
    
    // E-commerce Database
    products: [
        { _id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, rating: 4.5 },
        { _id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 50, rating: 4.2 },
        { _id: 3, name: 'Office Chair', category: 'Furniture', price: 199.99, stock: 8, rating: 4.7 },
        { _id: 4, name: 'Desk Lamp', category: 'Furniture', price: 45.00, stock: 25, rating: 4.0 },
        { _id: 5, name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 100, rating: 4.3 }
    ],
    customers: [
        { _id: 1, name: 'John Smith', email: 'john@email.com', city: 'New York', total_spent: 1500.00 },
        { _id: 2, name: 'Sarah Lee', email: 'sarah@email.com', city: 'Los Angeles', total_spent: 890.50 },
        { _id: 3, name: 'Mike Chen', email: 'mike@email.com', city: 'Chicago', total_spent: 2300.00 }
    ]
};
const DB_TYPE_COLLECTIONS = {
    users: ['users', 'orders'],        
    blog: ['posts', 'comments'],         
    ecommerce: ['products', 'customers'], 
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

        // Get list of ALL sample data collection names
        const sampleCollectionNames = Object.keys(SAMPLE_DATA); // ['users', 'orders', 'posts', 'comments', 'products', 'customers']

        for (const collection of sessionCollections) {
            const collectionName = collection.name.replace(`_${sessionId}`, '');
            
            if (dbType === 'custom') {
                // For custom: ONLY show collections that are NOT in sample data
                if (!sampleCollectionNames.includes(collectionName)) {
                    const sampleDoc = await db.collection(collection.name).findOne();
                    schema[collectionName] = sampleDoc ? Object.keys(sampleDoc) : [];
                }
            } else {
                // For other database types: show only allowed collections
                if (allowedCollections.includes(collectionName)) {
                    const sampleDoc = await db.collection(collection.name).findOne();
                    schema[collectionName] = sampleDoc ? Object.keys(sampleDoc) : [];
                }
            }
        }

        return Response.json({ success: true, schema });
    } catch (error) {
        console.error('Schema fetch error:', error);
        return Response.json({ error: 'Failed to fetch schema' }, { status: 500 });
    }
}