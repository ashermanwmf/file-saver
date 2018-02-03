const FileService = {
  getMoment(Master, self, req, res, next) {
    Master.designateTask({ message: 'TEST_MESSAGE', payload: 123456 });
    res.status(200).send('you got me \n \n');
  },
  
  sendMoment(Master, self, req, res, next) {
    
  },
  
  updateMoment(Master, self, req, res, next) {
    
  },
  
  
  getMoments(...args) {
    self.getMoment(...args)
  },
  sendMoments(...args) {
    self.sendMoment(...args)
  },
  updateMoments(...args) {
    self.sendMoment(...args)
  }
};

module.exports = FileService;
