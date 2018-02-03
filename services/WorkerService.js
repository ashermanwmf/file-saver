const WorkerService = {
  initListeners(self, worker) {
    worker.on('message', self._performTask);
    return worker;
  },

  _performTask({ message, payload }) {
    switch(message) {
      case 'TEST_MESSAGE':
        console.log('worker received message');
        process.send({ message: process.pid });
        return true;
      default:
        return null;
    }
  }
};

module.exports = WorkerService;
