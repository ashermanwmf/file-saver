const cluster = require('cluster'),
  http = require('http'),
  { cpus } = require('os'),
  { WorkerService } = require('./services/index');

module.exports = (resolve, reject) => {
  const workers = [];

  if (cluster.isMaster) {
    masterProcess(resolve, reject);
  } else {
    workerProcess(resolve, reject);
  }
  
  function masterProcess(resolve, reject) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers
    for (let i = 0; i < cpus().length - 2; i++) {
      console.log(`Forking process number ${i}...`);
      const worker = cluster.fork();
      workers.push(worker);

      WorkerService.initListeners(WorkerService, worker);
    }

    resolve({ workers, processId: process.pid });
  }
  
  function workerProcess(resolve, reject) {
    resolve({ workers: null, processId: process.pid });
  }
}
