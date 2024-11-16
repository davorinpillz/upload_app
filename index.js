var express = require('express');
var cors = require('cors');
const app = express();

require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect('mongodb+srv://ddp1329:clifton84@cluster0.x0i7l.mongodb.net/uploads?retryWrites=true&w=majority&appName=Cluster0')
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

console.log("tetsetest")
//test

const Schema = mongoose.Schema
const fileSchema = new Schema({
  name: String,
  type: String,
  size: Number
})
const File = mongoose.model("File", fileSchema)

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  let newFile = new File({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
  newFile.save()
  res.json(newFile)
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
