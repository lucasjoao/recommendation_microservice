import express from 'express'
import path from 'path'
import users from './dump_data.json'

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/data', (req, res) => {
  res.send(users);
})

app.get('/recommendations', (req, res) => {
  const id = req.query.id - 1;
  let u = ['Alfred', 'Bob', 'Cold', 'Dumb', 'Elliot',
           'Frank', 'Geralt', 'Host'];
  let recommendations = []
  for (let i = 0; i < 2; i++) {
    let random = Math.floor(Math.random() * 8);
    if (u[id] != u[random] && !recommendations.includes(u[random])) {
      recommendations.push(u[random]);
    }
  }
  let result = {
    "recommendations": recommendations
  }
  let result_json = JSON.stringify(result);
  res.send(result_json);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
