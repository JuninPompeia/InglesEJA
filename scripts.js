function ordemQuestoes() {
    const ordem = [0,0,0,0];
    for (let i = 0; i < 4; i++){
        let novoValor;
        do {
            novoValor = Math.trunc(Math.random() * (4 - 1 + 1)) + 1;
        } while (novoValor == ordem[0] || novoValor == ordem[1] || novoValor == ordem[2] || novoValor == ordem[3]);
        ordem[i] = novoValor;
    }
    return ordem;
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