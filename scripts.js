let acertos;
let questoes = [
    {"pergunta":"Complete a frase:<br> I ___ a student.", "respostas":["am", "is", "are", "be"]},
    {"pergunta":"Complete a frase:<br> She ___ my friend.", "respostas":["is", "am", "are", "be"]},
    {"pergunta":"Complete a frase:<br> They ___ at school.", "respostas":["are", "be", "is", "am"]},
    {"pergunta":"Complete a frase:<br> He ___ very happy.", "respostas":["are", "is", "be", "am"]},
    {"pergunta":"Complete a frase:<br> We ___ from Brazil.", "respostas":["is", "are", "am", "be"]},
    {"pergunta":"Complete a frase:<br> You ___ a good teacher.", "respostas":["are", "be", "am", "si"]}
];

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

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip");
    const words = document.querySelectorAll(".word");
    const respostas = document.querySelectorAll(".quizResposta");

    // WORDS (click tooltip)
    words.forEach(word => {
        word.addEventListener("click", (e) => {
            const rect = word.getBoundingClientRect();

            tooltip.classList.add("show");

            const tooltipWidth = tooltip.offsetWidth;

            const wordCenter = rect.left + rect.width / 2;

            let left = wordCenter + window.scrollX - (tooltipWidth / 2);

            // prevent going off-screen
            const minLeft = 10;
            const maxLeft = window.innerWidth - tooltipWidth - 10;

            left = Math.max(minLeft, Math.min(left, maxLeft));

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
        });
    });

    // click fora fecha tooltip
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("word")) {
            tooltip.classList.remove("show");
        }
    });

    // RESPOSTAS (hover tooltip)
    respostas.forEach(resposta => {

        resposta.addEventListener("mouseenter", () => {
            const rect = resposta.getBoundingClientRect();

            tooltip.classList.add("show");

            const tooltipWidth = tooltip.offsetWidth;

            const wordCenter = rect.left + rect.width / 2;

            let left = wordCenter + window.scrollX - (tooltipWidth / 2);

            // prevent going off-screen
            const minLeft = 10;
            const maxLeft = window.innerWidth - tooltipWidth - 10;

            left = Math.max(minLeft, Math.min(left, maxLeft));

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
        });

        resposta.addEventListener("mouseleave", () => {
            tooltip.classList.remove("show");
        });

    });

});