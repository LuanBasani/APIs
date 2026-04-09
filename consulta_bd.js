const prompt = require('prompt-sync')();

function menu(){
    //Menu de busca do breaking bead
    console.log("Menu de busca do Breaking Bad");
    console.log("1 - Buscar por personagem");
    console.log("2 - Buscar por episódio");
    console.log("3 - Buscar por temporada");
    console.log("4 - Sair");
    const opcao = prompt("Digite a opção desejada: ");
    return opcao;
}

async function buscarPersonagem(){
    const nome = prompt("Digite o nome do personagem: ");
    const url = `https://www.breakingbadapi.com/api/characters?name=${encodeURIComponent(nome)}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados);
}

async function buscarEpisodio(){
    const numero = prompt("Digite o número do episódio: ");
    const url = `https://www.breakingbadapi.com/api/episodes?episode=${numero}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados);
}

async function buscarTemporada(){
    const numero = prompt("Digite o número da temporada: ");
    const url = `https://www.breakingbadapi.com/api/episodes?season=${numero}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados);
}
async function main(){
    let opcao;
    do {
        opcao = menu();
        switch (opcao) {
            case "1":
                await buscarPersonagem();
                break
            case "2":
                await buscarEpisodio();
                break
            case "3":
                await buscarTemporada();
                break
            case "4":
                console.log("Saindo...");
                break
            default:  
                console.log("Opção inválida! Tente novamente.");
                break
        }
    } while (opcao !== "4");
}

main();