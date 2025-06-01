import models from '../models/index.js';
import db from '../config/connection.js';
const typedModels = models;
export default async (modelName, collectionName) => {
    try {
        const model = typedModels[modelName];
        if (!model || !model.db || !model.db.db) {
            throw new Error(`Model or database connection not found for: ${modelName}`);
        }
        let modelExists = await model.db.db.listCollections({
            name: collectionName
        }).toArray();
        if (modelExists.length) {
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        throw err;
    }
};
