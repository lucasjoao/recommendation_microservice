import express from 'express'
import users from './dump_data.json'
import * as db from './db'

const app = express();

app.get('/connect', (req, res) => db.connect(res))

// helper that get dump data when other microservice is down
app.get('/allUsers', (req, res) => {
  res.send(users);
})

// XXX: verificar se consigo usar um unico so para fake e para real
app.get('/suggestions', (req, res) => {
  const id = req.query.id - 1;
  // XXX: def prox var como lista com todos os usuarios
  let u = ['Alfred', 'Bob', 'Cold', 'Dumb', 'Elliot',
           'Frank', 'Geralt', 'Host'];
  let suggestions = []
  // XXX: proximo for deve iterar o tamanho de u vezes
  for (let i = 0; i < 4; i++) {
    // XXX: gerar numero random dentro da faixa permitida
    let random = Math.floor(Math.random() * 8);
    // XXX: proximo if tbm deve checar se eles nao sao amigos
    if (u[id] != u[random] && !suggestions.includes(u[random])) {
      suggestions.push(u[random]);
    }
    // XXX: add uma verificacao de que se ja tem x recomencadoes, entao para
  }
  let result = {
    "suggestions": suggestions
  }
  let result_json = JSON.stringify(result);
  res.send(result_json);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
