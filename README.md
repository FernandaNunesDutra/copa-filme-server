# Copa Filme Servidor

* Instalar node https://nodejs.org/en/
* Executar npm i na pasta raiz do projeto
* Executar npm run start na pasta raiz

Após executar os comandos o projeto da api irá rodar na em http://locallhost:3535.

## Endpoints da api
* GET **/movie/all** 
  - Retorna todas os 16 filmes.
* POST **/movie/champiosn** 
  - Recebe uma lista de 8 filmes escolhidos e que iram disputar o campeonato.
  - Retorna o primeiro e o segundo lugar do campeonato.
  
## Executando testes
```
npm run test
```

A api está hospedada em https://copa-filme-server.herokuapp.com