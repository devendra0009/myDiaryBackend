const connectToMongo = require('./db.js');
const authRouter = require('./routes/auth.js');
const notesRouter = require('./routes/notes.js');
const userRouter = require('./routes/users.js');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT;

connectToMongo(); //to connecct to our mongodb database

//to use cors
const corsOptions = {
  origin: ['https://my-diary-rgwg.onrender.com', 'http://localhost:3000'], // Replace with your allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

//middleware used to populate req.body() can be express.json() or express.urlencoded()
// For parsing application/json-> express.json() used
//// For parsing application/x-www-form-urlencoded-> express.urlencoded() used
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Dev!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
   console.log(`myDiary backend listening on port ${port}`);
});
