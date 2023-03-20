const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const mongoose = require('mongoose');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/test_db'
mongoose.connect(uri)
  .then(() => {console.log(`Database Connected successfully,`)})
  .catch((e)=> {console.log(`Error occured : ${e}`)})

app.use('/user', userRouter);
app.use('/post', postRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})