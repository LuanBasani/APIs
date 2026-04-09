const prompt = require('prompt-sync')();

function consultarCEP() {
    let cep = prompt('Digite o CEP: ');
    cep = cep.trim();

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) => {
        if (dados.erro) {
            console.log('CEP inválido');
            return;
        } 
    console.log("Dados do CEP: ")
    console.log(`CEP: ${dados.cep}`);
    console.log(`Logradouro: ${dados.logradouro}`);
    console.log(`Bairro: ${dados.bairro}`);
    console.log(`Cidade: ${dados.localidade}`);
    console.log(`Estado: ${dados.uf}`);[]
    })
    .catch ((erro) =>{
        console.log("Erro ao acessar a API: ")
        console.log(erro.mensage);
    });
}
consultarCEP();