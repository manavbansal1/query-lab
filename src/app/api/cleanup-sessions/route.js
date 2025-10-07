import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'querylab';
const MAX_AGE_HOURS = 24; // Delete sessions older than 24 hours

export async function GET() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);

        const metadataCollection = db.collection('session_metadata');
        
        // Find sessions older than 24 hours
        const cutoffTime = new Date(Date.now() - MAX_AGE_HOURS * 60 * 60 * 1000);
        
        const oldSessions = await metadataCollection.find({
            lastActivity: { $lt: cutoffTime }
        }).toArray();

        console.log(`Found ${oldSessions.length} old sessions to clean up`);

        let deletedCollections = 0;
        let deletedSessions = 0;

        // Delete collections for each old session
        for (const session of oldSessions) {
            const sessionId = session.sessionId;
            
            // Get all collections for this session
            const allCollections = await db.listCollections().toArray();
            const sessionCollections = allCollections.filter(c => c.name.endsWith(`_${sessionId}`));

            // Drop each collection
            for (const collection of sessionCollections) {
                try {
                    await db.collection(collection.name).drop();
                    deletedCollections++;
                    console.log(`Deleted collection: ${collection.name}`);
                } catch (err) {
                    console.error(`Error deleting collection ${collection.name}:`, err.message);
                }
            }

            // Delete the session metadata
            await metadataCollection.deleteOne({ sessionId });
            deletedSessions++;
        }

        await client.close();

        return Response.json({
            success: true,
            message: `Cleanup completed successfully`,
            deletedSessions,
            deletedCollections,
            cutoffTime: cutoffTime.toISOString(),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Cleanup error:', error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}