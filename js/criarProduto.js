import { conexaoApi } from "./conexaoApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarProduto(evento) {
    evento.preventDefault();

    const imagem = document.querySelector("[data-imagem]").value;
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-valor]").value;

    await conexaoApi.criaProduto(nome, preco, imagem);
}

formulario.addEventListener("submit", evento => criarProduto(evento));