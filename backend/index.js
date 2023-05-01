const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const appointementRouter = require('./routes/appointementRouter');

const app = express();


const corsOptions = {
  origin: '*',
};

app.use('/api', cors(corsOptions));

require('dotenv').config();

const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb://localhost/turdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ");
});
// Set up middleware
app.use(express.json());

app.use('/api/users', userRouter );

app.use('/api/appointements', appointementRouter );



app.listen(PORT, (req, res) => {
    console.log('listening on port ' + PORT);
})

