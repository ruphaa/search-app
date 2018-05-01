const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'temp/' });
const { parseAndDump, getTickets } = require('../lib/file-handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload-file', upload.single('file'), function(req, res, next){
  console.log('File Uploaded'); 
  parseAndDump(req.file)
  .then((data) => {
    res.json({success: true});
  }).catch(() => {
    res.status(500).json({success: false});
  })
});

router.post('/upload-contents', function(req, res, next){
  const item = req.body;
  console.log('Item ' + item);
  mongooseQuery.insertIntoItemsCollection(item)
  .then(function(message){
    res.json({response: message});
  }).catch(function(){
    res.status = 500;
    res.send('Something went wrong');
  });
  
});

router.get('/search-by-term/', function(req, res, next){
  const searchTerm = req.query.searchTerm;
  console.log('Search term '+searchTerm);
  getTickets(searchTerm)
  .then(function(docs){
    console.log('Result '+docs);
    res.json({response: docs});
  }).catch(function(){
    res.status = 500;
    res.send('Something went wrong');
  });
});

module.exports = router;
