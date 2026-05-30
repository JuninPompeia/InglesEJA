let respostas = {
    acertos: [],
    erros: [],
    opcaoErrada: []
};

let questoes = [
    {"pergunta":"Complete a frase:<br> I ___ a student.", "respostas":["am", "is", "are", "be"]},
    {"pergunta":"Complete a frase:<br> She ___ my friend.", "respostas":["is", "am", "are", "be"]},
    {"pergunta":"Complete a frase:<br> They ___ at school.", "respostas":["are", "be", "is", "am"]},
    {"pergunta":"Complete a frase:<br> He ___ very happy.", "respostas":["is", "are", "be", "am"]},
    {"pergunta":"Complete a frase:<br> We ___ from Brazil.", "respostas":["are", "is", "am", "be"]},
    {"pergunta":"Complete a frase:<br> You ___ a good teacher.", "respostas":["are", "be", "am", "is"]}
];

let countQuiz = 0;

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let indicesQuizzes = questoes.map((_, i) => i);
let ordemQuizzes = embaralhar(indicesQuizzes);

function carregarQuiz(countQuiz) {
    let ordemRespostas = embaralhar([0, 1, 2, 3]);

    document.getElementById("contador").innerHTML = `${countQuiz+1} / ${questoes.length}`;

    for (let i = 0; i < 4; i++){
        document.getElementById(`resposta${i+1}`).innerHTML = questoes[ordemQuizzes[countQuiz]].respostas[ordemRespostas[i]];
    }

    document.getElementById("pergunta").innerHTML = questoes[ordemQuizzes[countQuiz]].pergunta;
}

function enviarResposta(resposta){
    if (resposta == questoes[ordemQuizzes[countQuiz]].respostas[0]){
        respostas.acertos.push(ordemQuizzes[countQuiz]);
    } else {
        respostas.erros.push(ordemQuizzes[countQuiz]);
        respostas.opcaoErrada.push(".quizResposta").innerHTML;
    }

    if (countQuiz < questoes.length-1){
        countQuiz++;
        carregarQuiz(countQuiz);
    } else {
        window.location.href = `TelaResultado.html?acertos=${respostas.acertos.join(",")}&erros=${respostas.erros.join(",")}&opcaoErrada=${respostas.opcaoErrada.join(",")}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip");
    const words = document.querySelectorAll(".word");
    const respostasQuiz = document.querySelectorAll(".quizResposta");

    // WORDS (click tooltip)
    words.forEach(word => {
        word.addEventListener("click", (e) => {
            const rect = word.getBoundingClientRect();

            tooltip.classList.add("show");

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            const wordCenter = rect.left + rect.width / 2;

            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);

            left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

            let top = rect.bottom + 8;

            
            if (top + tooltipHeight > window.innerHeight) {
                top = rect.top - tooltipHeight - 8;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top + window.scrollY}px`;
        });
    });

    // click fora fecha tooltip
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("word")) {
            tooltip.classList.remove("show");
        }
    });

    // RESPOSTAS
    respostasQuiz.forEach(resposta => {
        // Hover: Show tooltip
        resposta.addEventListener("mouseenter", () => {
            const rect = resposta.getBoundingClientRect();

            tooltip.classList.add("show");

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            const wordCenter = rect.left + rect.width / 2;

            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);

            left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

            let top = rect.bottom + 8;

            
            if (top + tooltipHeight > window.innerHeight) {
                top = rect.top - tooltipHeight - 8;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top + window.scrollY}px`;
        });

        // Exit: Hide tooltip
        resposta.addEventListener("mouseleave", () => {
            tooltip.classList.remove("show");
        });
    });

    const boxes = document.querySelectorAll(".quizBox");
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            const respostaQuiz = box.querySelector(".quizResposta").innerHTML;
            box.classList.add("clicado");
            setTimeout(() => {
                box.classList.remove("clicado");
                enviarResposta(respostaQuiz);
            }, 200);
        });
    });

    const listaAcertos = document.getElementById("listaAcertos");
    const listaErros = document.getElementById("listaErros");

    acertos.forEach(indice => {
        const pergunta = document.createElement("p");
        const resposta = document.createElement("p");
        pergunta.style.fontFamily = "Inter Bold"
        pergunta.innerHTML = `${questoes[indice].pergunta.slice(21)}`;
        resposta.innerHTML = `Opção escolhida: ${questoes[indice].respostas[0]}`;
        listaAcertos.appendChild(pergunta);
        listaAcertos.appendChild(resposta);
    });

    erros.forEach(indice => {
        const pergunta = document.createElement("p");
        const respostaEscolhida = document.createElement("p");
        const respostaCorreta = document.createElement("p");
        pergunta.style.fontFamily = "Inter Bold"
        pergunta.innerHTML = `${questoes[indice].pergunta.slice(21)}`;
        respostaCorreta.innerHTML = `Opção escolhida: ${questoes[indice].respostas[0]}`;
        listaErros.appendChild(pergunta);
        // listaErros.appendChild(respostaEscolhida);
        listaErros.appendChild(respostaCorreta);
    });
});