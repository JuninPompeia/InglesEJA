const traducao = [
    { "palavra": "verb", "ptbr": "Verbo" },
    { "palavra": "to be", "ptbr": "Ser / Estar" },
    { "palavra": "i", "ptbr": "Eu" },
    { "palavra": "you", "ptbr": "Você" },
    { "palavra": "he", "ptbr": "Ele" },
    { "palavra": "she", "ptbr": "Ela" },
    { "palavra": "it", "ptbr": "Ele / Ela (objetos, animais)" },
    { "palavra": "we", "ptbr": "Nós" },
    { "palavra": "they", "ptbr": "Eles / Elas" },
    { "palavra": "be", "ptbr": "Ser / Estar"},

    { "palavra": "am", "ptbr": "Sou / Estou" },
    { "palavra": "is", "ptbr": "É / Está" },
    { "palavra": "are", "ptbr": "São / Estão" },
    { "palavra": "not", "ptbr": "Não" },

    { "palavra": "i'm", "ptbr": "Eu Sou / Eu Estou" },
    { "palavra": "he's", "ptbr": "Ele É / Ele Está" },
    { "palavra": "she's", "ptbr": "Ela É / Ela Está" },
    { "palavra": "they're", "ptbr": "Eles São / Eles Estão" },
    { "palavra": "isn't", "ptbr": "Não É / Não Está" },
    { "palavra": "aren't", "ptbr": "Não São / Não Estão" },

    { "palavra": "happy", "ptbr": "Feliz" },
    { "palavra": "tired", "ptbr": "Cansado" },
    { "palavra": "beautiful", "ptbr": "Bonito / Bonita" },
    { "palavra": "intelligent", "ptbr": "Inteligente" },
    { "palavra": "friend", "ptbr": "Amigo / Amiga" },
    { "palavra": "students", "ptbr": "Estudantes" },
    { "palavra": "busy", "ptbr": "Ocupado" },
    { "palavra": "ready", "ptbr": "Pronto" },
    { "palavra": "late", "ptbr": "Atrasado" },
    { "palavra": "hungry", "ptbr": "Com Fome" },
    { "palavra": "smart", "ptbr": "Esperto / Inteligente" },
    { "palavra": "sad", "ptbr": "Triste" },
    { "palavra": "angry", "ptbr": "Bravo / Irritado" },
    { "palavra": "okay", "ptbr": "Bem / Tudo bem" },
    { "palavra": "tall", "ptbr": "Alto" },
    { "palavra": "home", "ptbr": "Casa" },
    { "palavra": "school", "ptbr": "Escola" },
    { "palavra": "today", "ptbr": "Hoje" },
    { "palavra": "very", "ptbr": "Muito" },
    { "palavra": "cold", "ptbr": "Frio" },
    { "palavra": "hot", "ptbr": "Quente" },
    { "palavra": "teacher", "ptbr": "Professor / Professora" },
    { "palavra": "doctor", "ptbr": "Médico / Médica" },


    { "palavra": "i ___ a student.", "ptbr": "Eu ___ um estudante." },
    { "palavra": "she ___ my friend.", "ptbr": "Ela ___ minha amiga." },
    { "palavra": "they ___ at school.", "ptbr": "Eles ___ na escola." },
    { "palavra": "he ___ very happy.", "ptbr": "Ele ___ muito feliz." },
    { "palavra": "we ___ from brazil.", "ptbr": "Nós ___ do Brasil." },
    { "palavra": "you ___ a good teacher.", "ptbr": "Você ___ um bom professor." }
];

let respostas = {
    acertos: [],
    erros: [],
    opcaoErrada: []
};

let questoes = [
    { "pergunta": "Complete a frase:<br> <span class='word'>I ___ a student.</span>", "respostas": ["am", "is", "are", "be"] },
    { "pergunta": "Complete a frase:<br> <span class='word'>She ___ my friend.</span>", "respostas": ["is", "am", "are", "be"] },
    { "pergunta": "Complete a frase:<br> <span class='word'>They ___ at school.</span>", "respostas": ["are", "be", "is", "am"] },
    { "pergunta": "Complete a frase:<br> <span class='word'>He ___ very happy.</span>", "respostas": ["is", "are", "be", "am"] },
    { "pergunta": "Complete a frase:<br> <span class='word'>We ___ from Brazil.</span>", "respostas": ["are", "is", "am", "be"] },
    { "pergunta": "Complete a frase:<br> <span class='word'>You ___ a good teacher.</span>", "respostas": ["are", "be", "am", "is"] }
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

    document.getElementById("contador").innerHTML = `${countQuiz + 1} / ${questoes.length}`;

    for (let i = 0; i < 4; i++) {
        document.getElementById(`resposta${i + 1}`).innerHTML = questoes[ordemQuizzes[countQuiz]].respostas[ordemRespostas[i]];
    }

    document.getElementById("pergunta").innerHTML = questoes[ordemQuizzes[countQuiz]].pergunta;
}

function enviarResposta(resposta) {
    if (resposta == questoes[ordemQuizzes[countQuiz]].respostas[0]) {
        respostas.acertos.push(ordemQuizzes[countQuiz]);
    } else {
        respostas.erros.push(ordemQuizzes[countQuiz]);
        respostas.opcaoErrada.push(".quizResposta").innerHTML;
    }

    if (countQuiz < questoes.length - 1) {
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
            const traduzido = traducao.find(obj => obj.palavra === word.innerHTML.toLowerCase());

            if (traduzido) {
                tooltip.innerHTML = traduzido.ptbr;
            } else {
                tooltip.innerHTML = "Tradução inexistente";
            }

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
            const traduzido = traducao.find(obj => obj.palavra === resposta.innerHTML.toLowerCase());

            if (traduzido) {
                tooltip.innerHTML = traduzido.ptbr;
            } else {
                tooltip.innerHTML = "Tradução inexistente";
            }

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