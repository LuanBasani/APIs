const { error } = require('console');
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

//função para manipular requisições
const requestHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //Definir a lógica da rota
    if(req.url === '/hello' && req.method === 'GET'){
        res.end(JSON.stringify({message: 'olá gomes!'}))
    } else{
        res.statusCode = 404;
        res.end(JSON.stringify({error: 'Rota não encontrada!'}))
    
    }
};

// criando o servidor
const server = http.createServer(requestHandler);
// iniciando servidor

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});