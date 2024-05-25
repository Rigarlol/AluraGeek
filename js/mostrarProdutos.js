import { conexaoApi } from "./conexaoApi.js";

const lista = document.querySelector("[data-produtos]");

function constroiCard(nome, preco, imagem, id) {
    const produtos = document.createElement("div");
    produtos.className = 'card';
    produtos.innerHTML = `
        <img class="produto__imagem" src="${imagem}" alt="">
        <div class="card__container__info">
            <p class="font-descricao">${nome}</p>
            <div class="card__container__valor">
                <p class="font-preco">$ ${preco}</p>
                <img src="assets/lixeira.png" alt="Excluir produto" class="lixeira" data-id="${id}">
            </div>
        </div>`;
    return produtos;
}

function adicionaEventoDeClique(produtos, id) {
    const lixeira = produtos.querySelector(".lixeira");
    lixeira.addEventListener('click', async () => {
        const produtoRemovido = await conexaoApi.deleteProduto(id);
        if (produtoRemovido) {
            produtos.remove();
        } else {
            alert('Falha ao excluir o produto!');
        }
    });
}

async function listaProduto() {
    try {
        const listaApi = await conexaoApi.listaProdutos();
        listaApi.forEach(elemento => {
            const card = constroiCard(elemento.nome, elemento.preco, elemento.imagem, elemento.id);
            adicionaEventoDeClique(card, elemento.id);
            lista.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

listaProduto();