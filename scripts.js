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