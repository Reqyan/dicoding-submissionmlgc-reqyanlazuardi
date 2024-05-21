const InputError = require('../exceptions/InputError');
const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require("../services/storeData");
const getHistories = require('../services/getHistories');

async function postPredictHandler(request, h) { 
    const { image } = request.payload;
    const { model } = request.server.app;

    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      "result": label,
      suggestion,
      createdAt
    };
    await storeData(id, data);
    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    })
    response.code(201);
    return response;

  };

  const getHistoriesHandler = async (request, h) => {
    const result = await getHistories();
    const response = h.response({
      status: 'success',
      data: result,
    })
    response.code(200);
    return response;
  }

module.exports = {postPredictHandler, getHistoriesHandler};