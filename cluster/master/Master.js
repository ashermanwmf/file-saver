const sha1 = require('sha1');

class Master {
  constructor(options) {
    const { processId } = options;

    this._id = processId;
    this._loadBalancer = [];
    this._workers = this._initWorkers(options);
    this._initListeners();
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

  _initListeners() {
    process.on('createTask', this._designateTask);
  }

  _designateTask(taskData) {
    const workerKey = this.selectWorker,
      worker = this.workers[workerKey];

    worker.send(task.message, taskData);
    
    this.balanceWorker = workerKey;

    // need to return true or have other message bus for response to service
    return true;
  }
}

module.exports = Master;
