const tf = require('@tensorflow/tfjs-node');
const tfn = require("@tensorflow/tfjs-node");

async function loadModel() {
    return tf.loadGraphModel(process.env.MODEL_URL);
    // return tf.loadGraphModel(tfn.io.fileSystem('submissions-model/model.json'));
}

module.exports = loadModel;