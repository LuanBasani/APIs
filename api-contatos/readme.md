# 📱 API de Gerenciamento de Contatos Escolar

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Uma API RESTful simples e direta para gerenciar contatos divididos por categorias. Os dados são armazenados de forma persistente e local em um arquivo JSON (`contatos.json`).

📍 **URL Base:** `http://localhost:3000`

---

## 📖 Tabela de Conteúdos
- [Como Usar a API](#-como-usar-a-api)
- [Estrutura de Dados](#%EF%B8%8F-estrutura-de-dados)
- [Endpoints](#-endpoints)
  - [🟢 GET: Listar Contatos](#-1-listar-contatos-por-grupo)
  - [🟡 POST: Adicionar Contato](#-2-adicionar-contato)
  - [🔵 PUT: Atualizar Contato](#-3-atualizar-contato)
  - [🔴 DELETE: Deletar Contato](#-4-deletar-contato)

---

## 🚀 Como Usar a API

Para rodar e testar esta API na sua máquina, siga os passos abaixo:

### 1. Preparando o ambiente
Certifique-se de ter o arquivo `contatos.json` criado na mesma pasta do seu arquivo principal (ex: `index.js`), contendo a estrutura base mostrada na seção de *Estrutura de Dados*.

Inicie o servidor no seu terminal:
```bash
node index.js
```
*(O console deve mostrar: `Servidor rodando em http://localhost:3000`)*

### 2. Testando as Requisições
Você precisará de um cliente HTTP como **Insomnia**, **Postman** ou a extensão **Thunder Client** do VS Code para testar as rotas. 

Aqui estão exemplos práticos de como chamar as URLs:
* **Para ver todos os alunos:** Faça um `GET` para `http://localhost:3000/contatos/alunos`
* **Para adicionar um professor:** Faça um `POST` para `http://localhost:3000/contatos/professores` enviando o JSON com nome e telefone na aba *Body*.
* **Para editar o João Santos (índice 0 de alunos):** Faça um `PUT` para `http://localhost:3000/contatos/alunos/0`
* **Para deletar o Jorge Carneiro (índice 1 de professores):** Faça um `DELETE` para `http://localhost:3000/contatos/professores/1`

---

## 🗂️ Estrutura de Dados

O banco de dados local (`contatos.json`) utiliza chaves principais para definir os grupos (`alunos` e `professores`), que armazenam arrays de contatos.

O estado inicial do arquivo deve ser assim:

```json
{
  "alunos": [
    {
      "nome": "João Santos",
      "telefone": "11999999999"
    },
    {
      "nome": "Fernanda",
      "telefone": "12365465789"
    }
  ],
  "professores": [
    {
      "nome": "Ana Oliveira",
      "telefone": "11923456789"
    },
    {
      "nome": "Jorge Carneiro",
      "telefone": "199987987"
    },
    {
      "nome": "Enzo Basani",
      "telefone": "19996335291"
    }
  ]
}
```

---

## ⚙️ Endpoints

### 🟢 1. Listar Contatos por Grupo
Retorna a lista de todos os contatos pertencentes a um grupo específico.

* **Método:** `GET`
* **Rota:** `/contatos/:grupo`

**Parâmetros de Rota:**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `grupo` | `string` | O nome do grupo que deseja buscar (ex: `alunos` ou `professores`). |

**Exemplo de Resposta (200 OK):**
```json
[
  { "nome": "João Santos", "telefone": "11999999999" },
  { "nome": "Fernanda", "telefone": "12365465789" }
]
```

---

### 🟡 2. Adicionar Contato
Cria um novo contato dentro de um grupo já existente.

* **Método:** `POST`
* **Rota:** `/contatos/:grupo`

**Parâmetros de Rota:**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `grupo` | `string` | O nome do grupo onde o contato será inserido. |

**Body (JSON) esperado:**
```json
{
  "nome": "Carlos Silva",
  "telefone": "11988887777"
}
```

**Exemplo de Resposta (201 Created):**
```json
{
  "message": "Contato adicionado com sucesso",
  "contato": { "nome": "Carlos Silva", "telefone": "11988887777" }
}
```

---

### 🔵 3. Atualizar Contato
Atualiza os dados de um contato baseado no seu índice (posição na lista, começando do `0`) dentro do grupo.

* **Método:** `PUT`
* **Rota:** `/contatos/:grupo/:index`

**Parâmetros de Rota:**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `grupo` | `string` | O nome do grupo. |
| `index` | `number` | O índice do contato no array (ex: `0` para o primeiro da lista). |

**Body (JSON) esperado:**
```json
{
  "nome": "João Santos Silva",
  "telefone": "11900000000"
}
```

**Exemplo de Resposta (200 OK):**
```json
{
  "message": "Contato atualizado com sucesso",
  "contato": { "nome": "João Santos Silva", "telefone": "11900000000" }
}
```

---

### 🔴 4. Deletar Contato
Remove um contato específico de um grupo baseado no seu índice.

* **Método:** `DELETE`
* **Rota:** `/contatos/:grupo/:index`

**Parâmetros de Rota:**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `grupo` | `string` | O nome do grupo. |
| `index` | `number` | O índice do contato que será removido. |

**Exemplo de Resposta (200 OK):**
```json
{
  "message": "Contato removido com sucesso",
  "contato": { "nome": "Jorge Carneiro", "telefone": "199987987" }
}
```