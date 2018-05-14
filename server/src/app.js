import express from 'express'
import users from './dump_data.json'

const app = express();

app.get('/data', (req, res) => {
  res.send(users);
})

app.get('/recommendations', (req, res) => {
  const id = req.query.id;
  // TODO: retornar json com possiveis amigos
  // TODO: por enquanto ha erro aqui
  let u = JSON.parse(users)
  let user = u.find(user => { return u.id == id })
  console.log(user)
  res.send(users);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
