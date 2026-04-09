const cpf = "49133687889";
const response = await fetch(`https://api.cpfhub.io/cpf/${cpf}`, {
  method: "GET",
  headers: {
    "x-api-key":
      "9d1a8a37e793615729c98da95859de73c6b5263a972cb1e6d502f61f77d663a6",
    Accept: "application/json",
  },
});

const data = await response.json();
console.log(data);
