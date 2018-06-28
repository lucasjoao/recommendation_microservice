1. reiniciar vm no id ufsc (opcional)

na rede da ufsc
---

1. `ssh lucas.joao@recommendation.lucas.joao.vms.ufsc.br` para acessar vm
2. zipar a pasta com o código
3. `scp zip_path lucas.joao@recommendation.lucas.joao.vms.ufsc.br:~/` colocar código no servidor
4. unzipar pasta
5. tanto em client quanto em server:
  - `rm -rf node_modules`
  - `npm install`
6. se houver a pasta, então no client `rm -rf build`
7. se houver a pasta, então no client `rm -rf dist`
8. tanto em client quanto em server:
  - `npm run build`
9. no server, copiar arquivo json do `src` para `dist`
10. no client, copiar tudo que tem na pasta `build` para uma nova pasta `public` em `dist` no server
11. em `client/build/static/js` realizar `cp main.xxxxxxxx.js ../../../../server/dist/main.js`
12. executar `export MONGODB=mongodb://admin:password0@ds159110.mlab.com:59110/recommendation_microservice`
13. por fim, no build do server, colocar no ar com `node app.js`
