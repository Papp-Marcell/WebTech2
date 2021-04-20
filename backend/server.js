let express = require('express'),
path = require('path'),
bodyParser = require ('body-parser'),
cors = require ('cors'),
mongoose = require ('mongoose'),
    autoIncrement = require('mongoose-auto-increment');



mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0.6mich.mongodb.net/myDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true}).then(
  () => {console.log('Database is connected')},
  err => {console.log('Can not connect to the database' + err)}
);

autoIncrement.initialize(mongoose.connection);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const vehicleRoute = require('./routes/vehicle.route');
const authRoute = require('./routes/auth.route');

app.listen(3000, function() {
    console.log('listening on 3000')
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Registry')));
app.use('/', express.static(path.join(__dirname, 'dist/Registry')));
app.use('/app', vehicleRoute);
app.use('/app', authRoute);

