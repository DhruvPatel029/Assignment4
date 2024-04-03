const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/DhruvDB1';

function findAll() {
    MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => {
            console.log('Connected to MongoDB');
            const db = client.db("mydb");
            let collection = db.collection('customers');
            let cursor = collection.find({}).limit(10);
            cursor.forEach(doc => console.log(doc))
                .then(() => {
                    console.log('All documents retrieved');
                    client.close();
                })
                .catch(err => console.error('Error retrieving documents:', err))
                .finally(() => console.log('Connection closed'));
        })
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

setTimeout(() => {
    findAll();
    console.log('iter');
}, 5000);
