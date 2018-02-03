const cluster = require('cluster'),
  http = require('http'),
  { cpus } = require('os');

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
    }

    resolve({ workers, processId: process.pid });
  }
  
  function workerProcess(resolve, reject) {
    console.log(`Worker ${process.pid} started`);
  
    process.on('message', function(message) {
      console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
    });

    resolve({ workers: null, processId: process.pid });
  }
}
