

const cardBoard = document.querySelector("#cardboard");
const images = [
    "a.png",
    "body.png",
    "br.png",
    "div.png",
    "footer.png",
    "head.png",
    "html.png",
    "p.png",
    "style.png",
    "title.png"
];

let cardHTML = "";

images.forEach(img => {
    cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/${img}"/>
            <img class="back-face" src="img/backcard.png">
        </div>
    `;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** fim do html jogo */
const siteBoard = document.querySelector("#siteboard");

let tags = "",
    tagBody = "",
    tagHtml = "",
    tagBr = "",
    tagA = "",
    tagFooter = "",
    tagDiv = "",
    tagHead = "",
    tagP = "",
    tagStyle = "",
    tagTitle = "";

/* definições das tags quando se combina as cartas*/

tagHtml = `
    <div class="item black">
        a tag &lt;html&gt; tem a função de envolver todo o código que será mostrado na página.<br>
         o documento de HTML inicia com &lt;html&gt; e finaliza com &lt;/html&gt;
    </div>
`;
tagBody = `
    <div class="item blue">
        A tag &lt;body&gt; define o corpo do documento. Ela contém todo o conteúdo de um documento HTML, como títulos, imagens, hiperlinks, etc.<br>
        Só pode haver um &lt;body&gt; em um documento HTML.
    </div>
`;
tagBr = `
    <div class="item yellow">
        A tag &lt;br&gt; tem a função de inserir uma quebra de linha.<br>
        É uma tag vazia, o que siginifica que ela não tem tag final de fechamento.
    </div>
`;
tagA = `
    <div class="item green">
        A tag &lt;a&gt; define o link para ser visualizado e clicado na página.<br>
        Exemplo: &lt;a href="https://www.w3schools.com"&gt;Este é um link&lt;/a&gt;
    </div>
`;
tagFooter = `
    <div class="item black">
        a tag &lt;footer&gt; define um rodapé para um documento ou seção.<br>
        Essa tag normalmente contém informações de autoria, contato, links, etc. 
    </div>
`;
tagDiv = `
    <div class="item blue">
        a tag &lt;div&gt; define uma divisão ou uma seção em um documento HTML.<br>
        Ela pode ser considerada um caixa aonde você coloca qualquer conteúdo dentro e pode estilizar diferente de outras caixas("divs"). 
    </div>
`;
tagHead = `
    <div class="item yellow">
        a tag &lt;head&gt; é um contêiner(espaço) para metadados(dados sobre dados) e é colocado entre as tags &lt;html&gt; e &lt;body&gt;.<br>
        Metadados são dados sobre o documento HTML. Os metadados não são exibidos. 
    </div>
`;
tagP = `
    <div class="item green">
        a tag &lt;p&gt; tem a função de definir um parágrafo.<br>
    </div>
`;
tagStyle = `
    <div class="item red">
        a tag &lt;style&gt; tem a função de definir as informações de estilo do documento HTML.<br> É conhecida como CSS.
        Dentro do elemento &lt;style&gt;, você especifica como os elementos HTML devem ser renderizados em um navegador.
    </div>
`;
tagTitle = `
    <div class="item red">
        a tag &lt;title&gt; define o título do documento. O título deve ser somente texto
         e é mostrado na barra de título do navegador ou na aba da página. 
    </div>
`;

siteBoard.innerHTML;



const cards = document.querySelectorAll(".memory-card");
let checkCard, firstCard, secondCard;
let lockCard = false;
/* função de girar a carta e definir carta 1 e 2*/
function flipCard() {

    if (lockCard) return false;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;

        return false;
    }

    secondCard = this;

    if (secondCard.attributes.style === firstCard.attributes.style) {
        secondCard = null;
        return false;
    }
    checkForMatch();
}
/* funçao de checar se cartas são iguais */
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
}
/* função de desabiliar cartas iguais*/
function disableCards() {

    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetCards();
    }, 1000);
}
/* função de embaralhar cartas*/
(function shuffle() {
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 20);
        card.style.order = rand;
    });
})();
/* funçao de tirar o click da carta e apresentar significado da tag*/
function resetCards(isMatch = false) {
    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        switch (firstCard.dataset.card) {
            case 'html.png':
                tags = tags + tagHtml;
                siteBoard.innerHTML = tags;
                break;
            case 'body.png':
                tags = tags + tagBody;
                siteBoard.innerHTML = tags;
                break;
            case 'a.png':
                tags = tags + tagA;
                siteBoard.innerHTML = tags;
                break;
            case 'head.png':
                tags = tags + tagHead;
                siteBoard.innerHTML = tags;
                break;
            case 'style.png':
                tags = tags + tagStyle;
                siteBoard.innerHTML = tags;
                break;
            case 'div.png':
                tags = tags + tagDiv;
                siteBoard.innerHTML = tags;
                break;
            case 'br.png':
                tags = tags + tagBr;
                siteBoard.innerHTML = tags;
                break;
            case 'footer.png':
                tags = tags + tagFooter;
                siteBoard.innerHTML = tags;
                break;
            case 'title.png':
                tags = tags + tagTitle;
                siteBoard.innerHTML = tags;
                break;
            case 'p.png':
                tags = tags + tagP;
                siteBoard.innerHTML = tags;
                break;

            default:
                console.log('ok');
        }

    }


    [firstCard, secondCard, lockCard] = [null, null, false]
}
/*funçao de reiniciar jogo */
function resetGame() {

    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 20);
        card.style.order = rand;
    });

    cards.forEach(card => card.classList.remove("flip"));

    cards.forEach(card => card.addEventListener('click', flipCard));

    [firstCard, secondCard, lockCard] = [null, null, false]

    tags = "";
    siteBoard.innerHTML = tags;


}
cards.forEach(card => card.addEventListener('click', flipCard));

