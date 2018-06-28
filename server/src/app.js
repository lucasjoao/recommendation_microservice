import express from 'express'
import path from 'path'
import fetch from 'node-fetch';
import users from './dump_data.json'
import * as db from './db'

const app = express();

// things necessary to run in production
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/connect', (req, res) => db.connect(res))

// helper that get dump data when other microservice is down
app.get('/allUsers', (req, res) => {
  res.send(users);
})

// BUG: get real data from other microservice
app.get('/realAllUsers', (req, res) => {
  let url = 'http://m1.nathan.werlich.vms.ufsc.br:3001/searchAll';

  // BUG: try with xmlhttprequest, doesnt work
  // let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // let request = new XMLHttpRequest();
  // request.onreadystatechange = (e) => {
  //   if (request.readyState !== 4) {
  //     return;
  //   }

  //   if (request.status === 200) {
  //     console.log('success', request.responseText);
  //     res.send(request.responseText)
  //   } else {
  //     console.log('error', request.status);
  //   }
  // };
  // request.open("GET", url);
  // request.send();

  // BUG: try with fetch, doesnt work
  // fetch(url)
  //   .then(data => console.log(data)) // test purpose
  //   .then(data => res.send(data));

  // BUG: try with async, doesnt work
  // (async () => {
  //   let response = await fetch(url);
  //   let data = await response.text();
  //   console.log(data); // test purpose
  //   res.send(data)
  // })();
})

// helper that get dump suggestions
app.get('/suggestions', (req, res) => {
  const id = req.query.id - 1;
  let u = users.users;
  let suggestions = [];

  for (let i = 0; i < u.length; i++) {
    let random = Math.floor(Math.random() * u.length);

    if (u[id].id != u[random].id // not the same people
        && !suggestions.includes(u[random].name) // new suggestion
        && !u[id].friends.includes(u[random].id)) { // arent friends yet
          suggestions.push(u[random].name);
    }

    if(suggestions.length == 3) {
      break;
    }
  }

  let result = {
    "suggestions": suggestions
  }
  let result_json = JSON.stringify(result);
  res.send(result_json);
})

app.listen(3001, () => console.log('localhost:3001. Check this!'));
