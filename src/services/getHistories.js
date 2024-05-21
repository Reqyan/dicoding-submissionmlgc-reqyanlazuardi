const { Firestore } = require("@google-cloud/firestore");

const getHistories = async (id, data) => {
    try {
        const db = new Firestore();
        const predictCollection = db.collection("prediction");
        const snapshot = await predictCollection.get()
        const result = snapshot.docs.map((doc) => {
            const id = doc.id;
            const data = doc.data();
            return { id, data };
        });
        return result;
    } catch (error) {
        console.error('Error getting snapshot data:', error);
        throw error;
    }
}
module.exports = getHistories;