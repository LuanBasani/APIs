const prompt = require("prompt-sync")();

function menu() {
    console.log("\n=== MENU BREAKING BAD ===");
    console.log("1 - Buscar personagem");
    console.log("2 - Buscar episódio");
    console.log("3 - Buscar temporada");
    console.log("4 - Sair");
    return prompt("Opção: ");
}

// normaliza texto
function normalizar(txt) {
    return txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// PERSONAGEM FLEX
async function buscarPersonagem() {
    const busca = normalizar(prompt("Nome do personagem: "));

    const res = await fetch(
    "https://api.tvmaze.com/singlesearch/shows?q=breaking bad&embed=cast",
    );
    const dados = await res.json();

    const filtrado = dados._embedded.cast.filter((c) => {
        const nome = normalizar(c.character.name);
        const ator = normalizar(c.person.name);

        return nome.includes(busca) || ator.includes(busca);
    });

    if (!filtrado.length) {
        console.log("Nada encontrado.");
        return;
    }

    filtrado.forEach((c, i) => {
        console.log(`\n===== ${i + 1} =====`);
        console.log(`Personagem: ${c.character.name}`);
        console.log(`Ator: ${c.person.name}`);
    });
}

// EPISÓDIO FLEX
async function buscarEpisodio() {
    const busca = normalizar(prompt("Nome, número ou S1E1: "));

    const res = await fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=breaking bad&embed=episodes`,
    );
    const dados = await res.json();

    const filtrado = dados._embedded.episodes.filter((ep) => {
    const nome = normalizar(ep.name);

    const cod1 = `s${ep.season}e${ep.number}`;
    const cod2 = `${ep.season}x${ep.number}`;
    const num = String(ep.number);

    return (
        nome.includes(busca) || cod1 === busca || cod2 === busca || num === busca
    );
    });

    if (!filtrado.length) {
        console.log("Nada encontrado.");
        return;
    }

    filtrado.forEach((ep) => {
        console.log(`\n===== S${ep.season}E${ep.number} =====`);
        console.log(`Título: ${ep.name}`);
        console.log(`Nota: ${ep.rating.average || "N/A"}`);

        const resumo = ep.summary?.replace(/<[^>]*>/g, "")?.trim();

        console.log(`Resumo: ${resumo || "N/A"}`);
    });
}

// TEMPORADA FLEX
async function buscarTemporada() {
    const busca = prompt("Temporada (ex: 1): ");

    const res = await fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=breaking bad&embed=episodes`,
    );
    const dados = await res.json();

    const filtrado = dados._embedded.episodes.filter(
        (ep) => String(ep.season) === busca,
    );

    if (!filtrado.length) {
        console.log("Nada encontrado.");
        return;
    }

    filtrado.forEach((ep) => {
        console.log(`S${ep.season}E${ep.number} - ${ep.name}`);
    });
}

// MAIN
async function main() {
    let opcao;

    do {
        opcao = menu();

    try {
        switch (opcao) {
            case "1":
                await buscarPersonagem();
                break;
            case "2":
                await buscarEpisodio();
                break;
            case "3":
                await buscarTemporada();
                break;
            case "4":
                console.log("Saindo...");
                break;
            default:
                console.log("Inválido");
        }
    } catch (err) {
        console.log("Erro:", err.message);
    }
    } while (opcao !== "4");
}

main();