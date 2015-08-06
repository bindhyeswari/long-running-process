var express = require('express');
var uuid = require('uuid');
var router = express.Router();



var long_running_process_status = {

};

function imap(uuid, long_running_process_status) {
  var interval = 8000; //1000 + ~~(Math.random() * 4000);
  setTimeout(function () {
    long_running_process_status[uuid].status = 'complete';
    long_running_process_status[uuid].result = interval;
    console.log('done with the task: ', uuid);
  }, interval)
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/long-running-operation', function (req, res) {
  // fire a long running operation
  var id = uuid.v4();
  long_running_process_status[id] = {
    status: 'processing'
  };
  res.status(202).json({
    message: 'Started with the operation ... ',
    url: '/updates/' + id
  });
  imap(id, long_running_process_status);
});

router.get('/updates/:id', function (req, res) { // /updates/9d10975f-9e61-47e9-95f7-80bf0b76556a
  res.status(200).json(long_running_process_status[req.params.id]); // 9d10975f-9e61-47e9-95f7-80bf0b76556a
});

module.exports = router;
