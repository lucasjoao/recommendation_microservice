import express from 'express'
import path from 'path'
import users from './dump_data.json'

const app = express();

// helper that get dump data when other microservice is down
app.get('/allUsers', (req, res) => {
  res.send(users);
})

app.get('/suggestions', (req, res) => {
  const id = req.query.id - 1;
  // TODO: def prox var como lista com todos os usuarios
  let u = ['Alfred', 'Bob', 'Cold', 'Dumb', 'Elliot',
           'Frank', 'Geralt', 'Host'];
  let suggestions = []
  // TODO: proximo for deve iterar o tamanho de u vezes
  for (let i = 0; i < 2; i++) {
    // TODO: gerar numero random dentro da faixa permitida
    let random = Math.floor(Math.random() * 8);
    // TODO: proximo if tbm deve checar se eles nao sao amigos
    if (u[id] != u[random] && !suggestions.includes(u[random])) {
      suggestions.push(u[random]);
    }
    // TODO: add uma verificacao de que se ja tem x recomencadoes, entao para
  }
  let result = {
    "suggestions": suggestions
  }
  let result_json = JSON.stringify(result);
  res.send(result_json);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
