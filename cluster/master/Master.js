const sha1 = require('sha1');

class Master {
  constructor(options) {
    const { processId } = options;

    this._id = processId;
    this._loadBalancer = [];
    this._workers = this._initWorkers(options);
  }

  get selectWorker() {
    return this._loadBalancer.shift();
  }

  set balanceWorker(worker) {
    this._loadBalancer.push(worker); 
  }

  _initWorkers({ workers, processId })  {
    return workers.reduce((acc, worker) => {
      let time = new Date(),
        key = sha1(`${worker.id}${this._id}`);
      
      acc = acc || {};
      this.balanceWorker = key;
      acc[key] = worker;
      return acc;
    }, {});
  }

  designateTask(options) {
    const { message, payload } = options;

    switch(message) {
      case 'TEST_MESSAGE':
        const workerKey = this.selectWorker,
          worker = this._workers[workerKey];

        worker.send(options);      
        this.balanceWorker = workerKey;
        return true;
      default:
        return null;
    }
  }
}

module.exports = Master;
