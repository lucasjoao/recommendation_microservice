import express from 'express'
import users from './dump_data.json'

const app = express();

app.get("/data", (req, res) => {
  res.send(users);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
