import models from '../models/index.js';
import db from '../config/connection.js';

// Add this type to allow string indexing
type ModelsType = {
    [key: string]: any;
};

const typedModels = models as ModelsType;

export default async (modelName: string, collectionName: string) => {
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
    } catch (err) {
        throw err;
    }
};