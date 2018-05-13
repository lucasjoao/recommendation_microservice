import express from 'express'

const app = express();

app.get("/data", (req, res) => {
  const data = {
    tmp: 'tmp'
  }
  res.json(data);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
