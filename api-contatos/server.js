// express para criação de APIS
const express = require("express");
// fs para leitura e escrita de arquivos
const fs = require("fs");
// cria a aplicação express
const app = express();
// porta onde a API vai rodar
const PORT = 3000;
// permite o servidor enter json enviado no body
// req.body fica undefined
app.use(express.json());
// chama o arquivo json (BD)
const path = require("path");
const ARQUIVO = path.join(__dirname, "contatos.json");


// ler dados
function lerDados() {
  // le conteúdo do arquivo
    const dados = fs.readFileSync(ARQUIVO, "utf-8");
  // converto json em objeto
    return JSON.parse(dados);
}

function salvarDados(dados) {
  // converte o objeto em JSON
  // null, 2 para a identação de 2 Espaços
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
}

// onde :grupo é o parâmetro que vamos receber na url
app.get("/contatos/:grupo", (req, res) => {
    const grupo = req.params.grupo;
  // faz a requisição dos parâmetros(grupo)

    const dados = lerDados();

    if (!dados[grupo]) {
        return res.status(404).json({ error: "Grupo não encontrado" });
    }
    res.json(dados[grupo]);
});

// rota para adicionar contato
app.post("/contatos/:grupo", (req, res) => {
    const grupo = req.params.grupo;
    const { nome, telefone } = req.body;
    const dados = lerDados();
  // validar se o grupo existe
    if (!dados[grupo]) {
        return res.status(404).json({ error: "Grupo não encontrado" });
    }

    if (!nome || !telefone) {
        return res.status(400).json({ error: "nome e telefone são obrigatórios" });
    }
    dados[grupo].push({ nome, telefone });
    salvarDados(dados);
    res.status(201).json({
        message: "Contato adicionado com sucesso",
        contato: { nome, telefone },
    });
});

// rota para atualizar um contato
app.put("/contatos/:grupo/:index", (req, res) => {
    const grupo = req.params.grupo;
    const index = Number(req.params.index);
    const { nome, telefone } = req.body;
    const dados = lerDados();

    if (isNaN(index)) {
        return res.status(400).json({ error: "Index inválido" });
    }

    if (!dados[grupo]) {
        return res.status(404).json({ error: "Grupo não encontrado" });
    }

    // verifica se o index existe
    if (index < 0 || index >= dados[grupo].length) {
        return res.status(404).json({ error: "Contato não encontrado" });
    }

    // atualizar o contatos
    dados[grupo][index] = { nome, telefone };
    salvarDados(dados);

    // retorna o contato atualizado
    res.json({
        message: "Contato atualizado com sucesso",
        contato: dados[grupo][index],
    });
});

// rota para deletar um contato

app.delete("/contatos/:grupo/:index", (req, res) => {
    const grupo = req.params.grupo;
    const index = Number(req.params.index);

    const dados = lerDados();

    if (isNaN(index)) {
        return res.status(400).json({ error: "Index inválido" });
    }

    if (!dados[grupo]) {
        return res.status(404).json({ error: "Grupo não encontrado" });
    }

    // verifica se o index existe
    if (index < 0 || index >= dados[grupo].length) {
        return res.status(404).json({ error: "Contato não encontrado" });
    }

    //remove o contato da variável dados e salva o contato removido para retornar na resposta
    const removido = dados[grupo].splice(index, 1);
    salvarDados(dados);

    res.json({
        message: "Contato removido com sucesso",
        contato: removido[0],
    });
});

// inicia o servidor

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
