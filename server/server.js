const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();   

app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/

app.use(cors({
    origin: 'http://localhost:5173', // Update with your client's origin
    credentials: true,
  }));
  app.use(cookieParser());

require('./config/mongoose.config');   
require('./routes/post.routes')(app);
require('./routes/user.routes')(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
})