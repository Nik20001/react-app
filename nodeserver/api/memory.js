const fs = require('fs');
const config = require('../config/config.js');
const memoryFilePath = config.getMemoryFilePath();
const MemoryService = require('../services/MemoryService.js')

const memoryService = new MemoryService();


async function postNumber(req, res, next) {
  const number = req.body.num;
  try {
    const confirmation = await memoryService.writeFile(number);
    res.send(confirmation);
  } catch (error) {
    next(error)
  }
}


async function getNumber(req, res, next) {
  try {
    const data = await memoryService.readFile();
    res.send(data);
  } catch (error) {
    next(error)
  }
}


async function resetMemory(req, res, next) {
  try {
    await postNumber(req, res);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getNumber,
  postNumber,
  resetMemory,
};