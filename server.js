const express = require('express'),
  Controllers = require('./controllers/index'),
  initWorkers = require('./initWorkers'),
  Master = require('./cluster/master/Master'),
  bodyParser = require('body-parser');

new Promise ((resolve, reject) => {
  initWorkers(resolve, reject);
})
.then((options = null) => {
  const { workers, processId } = options;

  if (workers) {
    const app = express(),
      master = new Master(options),
      port = 3000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    Controllers(app, master);
    
    app.listen(port, () => {
      console.log(`master_worker_${processId} listening on port ${port}`);
    });
  } else {
    console.log(`child_worker_${processId} created and not listening`);
  }
})
.catch(console.log)
