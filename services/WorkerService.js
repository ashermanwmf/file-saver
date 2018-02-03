const WorkerService = {
  initListeners(self, worker) {
    worker.on('message', self._performTask);
  },

  _performTask({ message, payload }) {
    console.log('AHHHHHHH')
    switch(message) {
      case 'TEST_MESSAGE':
        console.log('worker recieved message');
        return true;
      default:
        return null;
    }
  }
};

module.exports = WorkerService;
