const { FileService } = require('../services/index');

const FileController = (app, Master) => {

  app.get('/api/moment/storage*', FileService.getMoment.bind(app, Master, FileService));
  app.get('/api/moments/storage*', FileService.getMoments.bind(app, Master, FileService))
  
  app.post('/api/send/moment*', FileService.sendMoment.bind(app, Master, FileService));
  app.post('/api/send/moments*', FileService.sendMoments.bind(app, Master, FileService));

  app.patch('/api/update/moment*', FileService.updateMoment.bind(app, Master, FileService));
  app.patch('/api/update/moments*', FileService.updateMoments.bind(app, Master, FileService));
};

module.exports = FileController;
