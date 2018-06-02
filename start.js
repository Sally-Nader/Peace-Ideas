const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 →  ${err.message}`);
});

const app = require('./app');

app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), () => {
  console.log(`App running at port ${process.env.PORT}`);
});
