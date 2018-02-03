const FileService = {
  getMoment(self, Master, req, res, next) {
    console.log(req.body);
    res.status(200).send();
  },
  
  sendMoment(self, Master, req, res, next) {
    
  },
  
  updateMoment(self, Master, req, res, next) {
    
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
