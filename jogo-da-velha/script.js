const jogadorSelecionado = document.querySelector('#jogador-selecionado');
const vencedorLabel = document.querySelector('#vencedor');
const quadrados = document.querySelectorAll('.box');
const reiniciarBtn = document.querySelector('button');

const jogadorX = 'X';
const jogadorO = 'O';
let jogadorAtual = jogadorX;
let jogoAcabou = false;

jogadorSelecionado.textContent = jogadorAtual;

const marcaQuadrado = (quadrado) => {
    quadrado.textContent = jogadorAtual;
    quadrado.classList.add(`marked-${jogadorAtual.toLowerCase()}`);
};

const verificarVitoria = () => {
    const possibilidadesVitoria = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let i = 0; i < possibilidadesVitoria.length; i++) {
        const [a, b, c] = possibilidadesVitoria[i];
        const quadradoA = document.getElementById(a);
        const quadradoB = document.getElementById(b);
        const quadradoC = document.getElementById(c);

        if (
            quadradoA.textContent === quadradoB.textContent &&
            quadradoB.textContent === quadradoC.textContent &&
            quadradoA.textContent !== ''
        ) {
            vencedorLabel.textContent = `Jogador ${jogadorAtual} venceu!`;
            jogoAcabou = true;
            break;
        }
    }
};

const trocarJogador = () => {
    jogadorAtual = jogadorAtual === jogadorX ? jogadorO : jogadorX;
    jogadorSelecionado.textContent = jogadorAtual;
};

const reiniciarJogo = () => {
    for (let i = 0; i < quadrados.length; i++) {
        quadrados[i].textContent = '';
        quadrados[i].classList.remove('marked-x', 'marked-o');
    }

    vencedorLabel.textContent = '';
    jogadorAtual = jogadorX;
    jogadorSelecionado.textContent = jogadorAtual;
    jogoAcabou = false;
};

const escolherQuadradinho = (e) => {
    if (jogoAcabou) return;

    const quadradoSelecionado = e.target;

    if (
        quadradoSelecionado.classList.contains('marked-x') ||
        quadradoSelecionado.classList.contains('marked-o')
    ) {
        return;
    }

    marcaQuadrado(quadradoSelecionado);
    verificarVitoria();
    trocarJogador();
};

quadrados.forEach((quadrado) => {
    quadrado.addEventListener('click', escolherQuadradinho);
});

reiniciarBtn.addEventListener('click', reiniciarJogo);