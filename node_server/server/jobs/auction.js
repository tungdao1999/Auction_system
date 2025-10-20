const { workerData } = require('worker_threads');
const auctionRepository = require('../repositories/auction.repository');

module.exports = async () => { 
    console.log("ruunnning auction job", workerData);
};