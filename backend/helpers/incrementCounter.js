const admin = require('firebase-admin');
const db = admin.firestore();

async function incrementCounter(operation) {
    const docRef = db.collection('stats').doc('crudCounters');
    const doc = await docRef.get();

    if (!doc.exists) {
        await docRef.set({
            create: 0,
            retrieve: 0,
            update: 0,
            delete: 0,
        });
    }

    await docRef.update({
        [operation]: admin.firestore.FieldValue.increment(1),
    });
}

module.exports = incrementCounter;
