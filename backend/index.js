const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoDBOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGODB_URI, mongoDBOptions).then(
  () => {
    console.log('The database was successfully connected.');
  },
  error => {
    console.log('CANNOT connect to the database' + error);
  },
);

mongoose.set;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);

app.use('/v1/api', routes);

app.get('/', function (req, res) {
  res.send(`Express server running on => http://localhost:${PORT}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express server running on PORT ${PORT}`);
});
