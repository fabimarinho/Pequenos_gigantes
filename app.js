const screens = [
    {
        id: "welcome",
        label: "Boas-vindas",
        description:
            "Uma entrada gentil para um assunto delicado, com um caminho principal e sem excesso de informação.",
        principles: [
            "Acolhe sem alarmismo",
            "Um único próximo passo",
            "Deixa claro que é possível explorar no próprio ritmo",
        ],
    },
    {
        id: "home",
        label: "Menu principal",
        description:
            "A pessoa escolhe a dúvida que faz sentido agora. A informação aparece em blocos curtos, não como um curso obrigatório.",
        principles: [
            "Conteúdo fácil de escanear",
            "Navegação por intenção",
            "Acesso rápido a dúvidas frequentes",
        ],
    },
    {
        id: "definition",
        label: "O que é doação?",
        description:
            "Uma explicação simples apresenta o conceito e os órgãos, sem esconder um ponto essencial do processo brasileiro: a autorização familiar.",
        principles: [
            "Linguagem simples",
            "Informação essencial em destaque",
            "Próximo passo visual",
        ],
    },
    {
        id: "myths",
        label: "Mitos e verdades",
        description:
            "Afirmações podem ser abertas para revelar uma resposta breve e acolhedora, sem constranger quem está com dúvidas.",
        principles: [
            "Interação com resposta imediata",
            "Ícones e texto, não apenas cores",
            "Contexto e fonte oficial",
        ],
    },
    {
        id: "process",
        label: "Como funciona",
        description:
            "Um fluxo visual apresenta as principais etapas e ajuda a entender o papel da equipe de saúde, da família e do sistema.",
        principles: [
            "Sequência fácil de acompanhar",
            "Papéis bem definidos",
            "Sem prometer um resultado específico",
        ],
    },
    {
        id: "talk",
        label: "Conversa em família",
        description:
            "A tela valida sentimentos e oferece frases simples para ajudar a iniciar uma conversa importante.",
        principles: [
            "Empatia antes de instruções",
            "Sugestões práticas para conversar",
            "Dúvidas clínicas ficam com a equipe de saúde",
        ],
    },
    {
        id: "faq",
        label: "Perguntas frequentes",
        description:
            "Respostas curtas atendem às dúvidas mais comuns e podem ser abertas sem sair da tela.",
        principles: [
            "Perguntas reais e diretas",
            "Respostas resumidas",
            "Referência oficial ao final",
        ],
    },
    {
        id: "favorites",
        label: "Favoritos",
        description:
            "Conteúdos salvos continuam acessíveis para rever com calma ou compartilhar em uma conversa familiar.",
        principles: [
            "Continuidade da jornada",
            "Compartilhamento sem pressão",
            "Sem gamificação excessiva",
        ],
    },
    {
        id: "sources",
        label: "Fontes e confiança",
        description:
            "Uma área própria mostra de onde vem a informação e reforça que conteúdos de saúde precisam ser rastreáveis.",
        principles: [
            "Fontes identificadas",
            "Prioridade para canais oficiais",
            "Conteúdo educativo, não aconselhamento clínico",
        ],
    },
    {
        id: "closing",
        label: "Encerramento",
        description:
            "Uma despedida leve retoma a ideia de cuidado sem transformar a decisão em obrigação.",
        principles: [
            "Fechamento acolhedor",
            "Ação segura de retorno",
            "Tom coerente do começo ao fim",
        ],
    },
];

const favoriteContent = {
    definition: {
        title: "O que é doação?",
        detail: "Entenda o conceito e a autorização familiar.",
        icon: "♡",
    },
    myths: {
        title: "Mitos e verdades",
        detail: "Respostas para conversar com mais segurança.",
        icon: "✳",
    },
    process: {
        title: "Como funciona a doação",
        detail: "Um resumo das principais etapas.",
        icon: "↗",
    },
    talk: {
        title: "Conversa em família",
        detail: "Ideias para começar uma conversa.",
        icon: "☼",
    },
    faq: {
        title: "Perguntas frequentes",
        detail: "Respostas rápidas para dúvidas comuns.",
        icon: "?",
    },
};
const savableScreens = Object.keys(favoriteContent);
const defaultFavorites = ["process", "myths"];
let currentScreen = "welcome";
let favorites = loadFavorites();

function loadFavorites() {
    try {
        const stored = localStorage.getItem("pequenos-gigantes-favorites");
        return stored === null
            ? [...defaultFavorites]
            : JSON.parse(stored).filter((id) => favoriteContent[id]);
    } catch {
        return [...defaultFavorites];
    }
}
function saveFavorites() {
    try {
        localStorage.setItem(
            "pequenos-gigantes-favorites",
            JSON.stringify(favorites),
        );
    } catch {
        /* armazenamento opcional */
    }
}
function currentIndex() {
    return screens.findIndex((screen) => screen.id === currentScreen);
}
function safeText(text) {
    return String(text).replace(
        /[&<>"']/g,
        (char) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[char],
    );
}

const templates = {
    welcome: () => `
    <div class="app-body welcome-copy">
      <div class="welcome-art" aria-hidden="true"><span class="art-sun"></span><span class="art-orbit"></span><span class="art-star one">✦</span><span class="art-star two">✧</span><span class="art-leaf"></span><span class="art-heart">♡</span></div>
      <p class="screen-eyebrow">PEQUENOS GIGANTES</p>
      <h1 class="screen-title">Toda família merece informação.</h1>
      <p class="screen-lead">Entenda o processo de doação de órgãos infantis com calma, sem termos difíceis e no seu tempo.</p>
      <button class="primary-button" data-go="home">COMEÇAR <span aria-hidden="true">→</span></button>
      <p class="welcome-note">Um espaço de informação e acolhimento.<br>Você pode pausar ou voltar quando quiser.</p>
    </div>`,
    home: () => `
    <div class="app-body">
      <p class="screen-eyebrow">BEM-VINDA(O), FIQUE À VONTADE</p>
      <h1 class="screen-title">Comece por onde fizer sentido.</h1>
      <p class="screen-lead">Escolha uma dúvida para explorar. Não existe uma ordem certa.</p>
      <div class="content-card-grid">
        <button class="content-card card-pink" data-go="definition"><span class="card-icon">♡</span><strong>O que é doação?</strong><small>Entenda o essencial</small></button>
        <button class="content-card card-lilac" data-go="myths"><span class="card-icon">✳</span><strong>Mitos e verdades</strong><small>Vamos conversar?</small></button>
        <button class="content-card card-teal" data-go="process"><span class="card-icon">↗</span><strong>Como funciona?</strong><small>Veja as etapas</small></button>
        <button class="content-card card-peach" data-go="talk"><span class="card-icon">☼</span><strong>Um momento difícil</strong><small>Converse em família</small></button>
        <button class="content-card card-cream" data-go="talk"><span class="card-icon">F</span><strong>Como falar em família</strong><small>Ideias para começar</small></button>
        <button class="content-card card-blue" data-go="faq"><span class="card-icon">?</span><strong>Dúvidas frequentes</strong><small>Respostas rápidas</small></button>
      </div>
      <div class="section-row"><strong>Informação com cuidado</strong><button class="text-link" data-go="sources">VER FONTES ↗</button></div>
      <p class="small-muted">Conteúdo educativo. Para orientações sobre uma situação específica, converse com a equipe de saúde.</p>
    </div>`,
    definition: () => `
    <div class="app-body">
      <p class="screen-eyebrow">ENTENDA O ESSENCIAL</p><h1 class="screen-title">Doação de órgãos e tecidos</h1>
      <p class="screen-lead">É um processo regulado, realizado por equipes de saúde e que pode ajudar pessoas que precisam de um transplante.</p>
      <div class="organ-grid"><div class="organ-chip"><span>♡</span>Coração</div><div class="organ-chip"><span>◉</span>Pulmões</div><div class="organ-chip"><span>◌</span>Fígado</div><div class="organ-chip"><span>⌁</span>Rins</div></div>
      <div class="info-card"><strong><span aria-hidden="true">♡</span> No Brasil, a família é parte central</strong><p>Na doação após a morte, a autorização dos familiares é necessária. Por isso, conversar sobre o assunto com a família é importante.</p></div>
      <div class="screen-actions"><button class="primary-button" data-go="process">VER COMO FUNCIONA <span aria-hidden="true">→</span></button><button class="secondary-button" data-favorite="definition">♡ SALVAR PARA VER DEPOIS</button></div>
      <p class="small-muted">A possibilidade de doação depende de avaliação da equipe de saúde.</p>
    </div>`,
    myths: () => `
    <div class="app-body">
      <p class="screen-eyebrow">INFORMAÇÃO SEM JULGAMENTO</p><h1 class="screen-title">Verdadeiro ou mito?</h1>
      <p class="screen-lead">Toque em cada afirmação para ver uma explicação simples.</p>
      <div class="myth-list">
        <button class="myth-card" aria-expanded="false"><span class="myth-top"><span class="truth-mark">✕</span><span class="myth-quote">“A doação desfigura o corpo.”</span></span><span class="myth-hint">Toque para ver a explicação</span><span class="myth-answer">Mito. A retirada é feita por cirurgia e, ao final, o corpo é recomposto com cuidado e dignidade.<span class="mini-source">Fonte: Ministério da Saúde / SNT</span></span></button>
        <button class="myth-card" aria-expanded="false"><span class="myth-top"><span class="truth-mark true">✓</span><span class="myth-quote">“A família autoriza a doação.”</span></span><span class="myth-hint">Toque para ver a explicação</span><span class="myth-answer">Verdade. No Brasil, para a doação após a morte, a autorização familiar é necessária. Falar sobre a vontade em vida pode ajudar.<span class="mini-source">Fonte: Ministério da Saúde / SNT</span></span></button>
        <button class="myth-card" aria-expanded="false"><span class="myth-top"><span class="truth-mark">✕</span><span class="myth-quote">“Só existe um tipo de doador.”</span></span><span class="myth-hint">Toque para ver a explicação</span><span class="myth-answer">Mito. Há doação em vida e após a morte. As possibilidades dependem do órgão, das condições clínicas e da avaliação da equipe de saúde.<span class="mini-source">Fonte: Ministério da Saúde / SNT</span></span></button>
      </div>
      <div class="screen-actions"><button class="secondary-button" data-favorite="myths">♡ SALVAR PARA VER DEPOIS</button></div>
    </div>`,
    process: () => `
    <div class="app-body">
      <p class="screen-eyebrow">PASSO A PASSO, COM CUIDADO</p><h1 class="screen-title">Como o processo acontece</h1>
      <p class="screen-lead">Cada situação é acompanhada por profissionais. Estas são as etapas principais, em linhas gerais.</p>
      <ol class="flow-list">
        <li class="flow-step"><span class="flow-number">1</span><div><strong>Avaliação e confirmação</strong><small>Equipe médica realiza os protocolos necessários.</small></div></li>
        <li class="flow-step"><span class="flow-number">2</span><div><strong>Conversa com a família</strong><small>Profissionais explicam o processo e acolhem dúvidas.</small></div></li>
        <li class="flow-step"><span class="flow-number">3</span><div><strong>Autorização familiar</strong><small>A decisão é conversada e registrada pela família.</small></div></li>
        <li class="flow-step"><span class="flow-number">4</span><div><strong>Avaliação e compatibilidade</strong><small>Central e equipes seguem critérios técnicos.</small></div></li>
        <li class="flow-step"><span class="flow-number">5</span><div><strong>Transplante</strong><small>Realizado por equipe especializada, quando possível.</small></div></li>
      </ol>
      <p class="flow-footnote">As etapas podem variar conforme cada caso. A distribuição segue critérios do Sistema Nacional de Transplantes.</p>
      <div class="screen-actions"><button class="secondary-button" data-favorite="process">♡ SALVAR PARA VER DEPOIS</button><button class="text-link" data-go="sources">CONHEÇA AS FONTES ↗</button></div>
    </div>`,
    talk: () => `
    <div class="app-body">
      <p class="screen-eyebrow">UM ESPAÇO DE ACOLHIMENTO</p><h1 class="screen-title">Está difícil conversar?</h1>
      <p class="screen-lead">Você não precisa ter todas as respostas. Uma conversa pode começar aos poucos.</p>
      <div class="support-card"><div class="support-card-heading"><span>♡</span>Comece pelo que você sabe</div><p class="quote-text">“Eu queria conversar sobre uma coisa importante.”</p></div>
      <div class="support-card"><div class="support-card-heading"><span>☼</span>Escute antes de explicar</div><p>Dê espaço para medo, dúvidas, sentimentos e até para o silêncio.</p></div>
      <div class="support-card"><div class="support-card-heading"><span>✳</span>Use fontes confiáveis</div><p>Se ajudar, leia este conteúdo com alguém da família ou mostre uma fonte oficial.</p></div>
      <div class="soft-callout"><span aria-hidden="true">♡</span><p><strong>Não existe conversa perfeita.</strong><br>Este app apoia a conversa; dúvidas sobre saúde devem ser levadas à equipe responsável.</p></div>
      <div class="screen-actions"><button class="secondary-button" data-favorite="talk">♡ SALVAR PARA VER DEPOIS</button></div>
    </div>`,
    faq: () => `
    <div class="app-body">
      <p class="screen-eyebrow">RESPOSTAS DIRETAS, SEM PRESSA</p><h1 class="screen-title">Perguntas frequentes</h1>
      <p class="screen-lead">Toque em uma pergunta para abrir a resposta.</p>
      <div class="faq-list">
        <div class="faq-item"><button class="faq-question" aria-expanded="false"><span>Quem autoriza a doação?</span><span>＋</span></button><div class="faq-answer">No Brasil, a doação após a morte depende da autorização da família, registrada conforme as regras vigentes. Converse com seus familiares sobre sua vontade.</div></div>
        <div class="faq-item"><button class="faq-question" aria-expanded="false"><span>O corpo fica deformado?</span><span>＋</span></button><div class="faq-answer">Não. A retirada é um procedimento cirúrgico e o corpo é recomposto com cuidado e respeito. A família pode conversar com a equipe sobre os procedimentos.</div></div>
        <div class="faq-item"><button class="faq-question" aria-expanded="false"><span>Para quem vão os órgãos?</span><span>＋</span></button><div class="faq-answer">A distribuição é coordenada pelo Sistema Nacional de Transplantes com critérios técnicos, como compatibilidade e prioridade clínica. A família doadora não escolhe um destinatário específico.</div></div>
        <div class="faq-item"><button class="faq-question" aria-expanded="false"><span>Preciso registrar que sou doador?</span><span>＋</span></button><div class="faq-answer">O mais importante é comunicar sua vontade à família, pois a autorização familiar é necessária para a doação após a morte no Brasil.</div></div>
        <div class="faq-item"><button class="faq-question" aria-expanded="false"><span>Onde encontro informação oficial?</span><span>＋</span></button><div class="faq-answer">Consulte o Ministério da Saúde e o Sistema Nacional de Transplantes. Você encontra os links na seção “Fontes oficiais” deste protótipo.</div></div>
      </div>
      <div class="screen-actions"><button class="secondary-button" data-favorite="faq">♡ SALVAR PARA VER DEPOIS</button></div>
    </div>`,
    favorites: () => {
        const saved = favorites.filter((id) => favoriteContent[id]);
        const cards = saved
            .map(
                (id) =>
                    `<article class="saved-card"><span class="saved-icon">${favoriteContent[id].icon}</span><span class="saved-copy"><strong>${safeText(favoriteContent[id].title)}</strong><small>${safeText(favoriteContent[id].detail)}</small></span><button class="icon-button" data-open="${id}" aria-label="Abrir ${safeText(favoriteContent[id].title)}">→</button><button class="icon-button" data-favorite="${id}" aria-label="Remover ${safeText(favoriteContent[id].title)} dos favoritos">♥</button></article>`,
            )
            .join("");
        return `<div class="app-body"><p class="screen-eyebrow">SEUS CONTEÚDOS GUARDADOS</p><h1 class="screen-title">Para rever com calma.</h1><p class="screen-lead">Salve conteúdos para voltar quando quiser ou conversar com alguém da família.</p>${saved.length ? `<div class="saved-list">${cards}</div>` : `<div class="empty-state"><span>♡</span><p>Você ainda não salvou nenhum conteúdo.<br>Explore um tema e toque em “salvar para ver depois”.</p></div>`}<div class="section-row"><strong>Continue explorando</strong><button class="text-link" data-go="home">VER CONTEÚDOS →</button></div><div class="soft-callout"><span>✳</span><p>Compartilhar é opcional. O mais importante é que a conversa aconteça no seu tempo.</p></div><div class="screen-actions"><button class="secondary-button" data-share>COMPARTILHAR CONTEÚDO ↗</button><p class="share-message" aria-live="polite"></p></div></div>`;
    },
    sources: () => `
    <div class="app-body">
      <p class="screen-eyebrow">INFORMAÇÃO COM ORIGEM</p><h1 class="screen-title">Fontes oficiais</h1>
      <p class="screen-lead">Conteúdo de saúde precisa ser confiável e atualizado. Consulte os canais oficiais para saber mais.</p>
      <div class="source-banner"><p class="screen-eyebrow">MINISTÉRIO DA SAÚDE · SNT</p><strong>Sistema Nacional de Transplantes</strong><p>Informações oficiais sobre doação, transplantes e orientações para a população.</p></div>
      <div class="source-list">
        <a class="source-link" href="https://www.gov.br/saude/pt-br/composicao/saes/snt" target="_blank" rel="noopener noreferrer"><span class="source-icon">↗</span><span><strong>Como ser doador de órgãos</strong><small>Ministério da Saúde · SNT</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.gov.br/saude/pt-br/composicao/saes/snt" target="_blank" rel="noopener noreferrer"><span class="source-icon">↗</span><span><strong>O que acontece após a autorização</strong><small>Ministério da Saúde · SNT</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.gov.br/saude/pt-br/composicao/saes/snt" target="_blank" rel="noopener noreferrer"><span class="source-icon">↗</span><span><strong>Perguntas frequentes</strong><small>Sistema Nacional de Transplantes</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.gov.br/saude/pt-br/composicao/saes/snt" target="_blank" rel="noopener noreferrer"><span class="source-icon">↗</span><span><strong>Morte encefálica</strong><small>Ministério da Saúde · SNT</small></span><span class="source-arrow">↗</span></a>
      </div>
      <div class="soft-callout"><span>i</span><p>Protótipo acadêmico. Antes de qualquer publicação, revise o conteúdo com profissionais de saúde e confira a versão atual das fontes.</p></div>
    </div>`,
    closing: () => `
    <div class="app-body closing-copy">
      <div class="closing-art" aria-hidden="true"><span class="art-sun"></span><span class="art-orbit"></span><span class="art-star one">✦</span><span class="art-star two">✧</span><span class="art-heart">♡</span></div>
      <p class="screen-eyebrow">PEQUENOS GIGANTES</p><h1 class="screen-title">Você chegou até aqui.</h1>
      <p class="screen-lead">Informação também é uma forma de cuidado. Obrigada por conhecer este conteúdo no seu tempo.</p>
      <button class="primary-button" data-go="home">VOLTAR AO INÍCIO <span aria-hidden="true">→</span></button>
      <p class="small-muted">Sem pressão. Você pode voltar quando quiser.</p>
    </div>`,
};

const tabItems = [
    { id: "home", icon: "⌂", label: "Início" },
    { id: "definition", icon: "▤", label: "Conteúdo" },
    { id: "favorites", icon: "♡", label: "Favoritos" },
    { id: "sources", icon: "☰", label: "Mais" },
];
function tabMarkup() {
    return `<nav class="app-bottom-nav" aria-label="Navegação principal">${tabItems.map((tab) => `<button class="tab-button ${tab.id === currentScreen || (tab.id === "home" && currentScreen === "welcome") || (tab.id === "definition" && ["myths", "process", "talk", "faq"].includes(currentScreen)) || (tab.id === "sources" && currentScreen === "closing") ? "active" : ""}" data-go="${tab.id}" aria-label="${tab.label}"><span class="tab-icon" aria-hidden="true">${tab.icon}</span><span>${tab.label}</span></button>`).join("")}</nav>`;
}
function renderScreen() {
    const screen =
        screens.find((item) => item.id === currentScreen) || screens[0];
    const root = document.getElementById("app-root");
    const header =
        currentScreen === "welcome"
            ? ""
            : `<header class="app-header"><button class="app-back" data-go="home" aria-label="Voltar ao início">‹</button><h2>${safeText(screen.label)}</h2>${savableScreens.includes(currentScreen) ? `<button class="app-back header-favorite" style="left:auto;right:13px;color:${favorites.includes(currentScreen) ? "#bd7180" : "#958b95"}" data-favorite="${currentScreen}" aria-label="${favorites.includes(currentScreen) ? "Remover dos favoritos" : "Salvar nos favoritos"}">${favorites.includes(currentScreen) ? "♥" : "♡"}</button>` : ""}</header>`;
    root.innerHTML = `${header}${templates[currentScreen]()}${tabMarkup()}`;
    root.querySelector(".app-body")?.scrollTo(0, 0);
    updatePresentation();
}
function updatePresentation() {
    const index = currentIndex();
    const item = screens[index];
    document.getElementById("screen-list").innerHTML = screens
        .map(
            (screen, i) =>
                `<button type="button" class="rail-item ${screen.id === currentScreen ? "active" : ""}" data-go="${screen.id}" aria-current="${screen.id === currentScreen ? "step" : "false"}"><span class="rail-number">${String(i + 1).padStart(2, "0")}</span><span class="rail-title">${safeText(screen.label)}</span></button>`,
        )
        .join("");
    document.getElementById("stage-number").textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}`;
    document.getElementById("stage-progress").innerHTML = screens
        .map(
            (screen, i) =>
                `<button type="button" class="progress-dot ${screen.id === currentScreen ? "active" : ""}" data-go="${screen.id}" aria-label="Ir para tela ${i + 1}"></button>`,
        )
        .join("");
    document.getElementById("context-count").textContent =
        `TELA ${String(index + 1).padStart(2, "0")}`;
    document.getElementById("context-title").textContent = item.label;
    document.getElementById("context-description").textContent =
        item.description;
    document.getElementById("context-principles").innerHTML = item.principles
        .map((text) => `<li>${safeText(text)}</li>`)
        .join("");
}
function goTo(id) {
    if (!screens.some((screen) => screen.id === id)) return;
    currentScreen = id;
    renderScreen();
}
function changeFavorite(id) {
    if (!favoriteContent[id]) return;
    favorites = favorites.includes(id)
        ? favorites.filter((item) => item !== id)
        : [...favorites, id];
    saveFavorites();
    renderScreen();
}

// Delegação única mantém os controles ativos também após a troca de tela.
document.addEventListener("click", async (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.id === "reset-prototype") {
        favorites = [...defaultFavorites];
        saveFavorites();
        goTo("welcome");
        return;
    }
    if (target.id === "previous-screen") {
        goTo(screens[Math.max(0, currentIndex() - 1)].id);
        return;
    }
    if (target.id === "next-screen") {
        goTo(screens[Math.min(screens.length - 1, currentIndex() + 1)].id);
        return;
    }
    if (target.dataset.go) {
        event.preventDefault();
        goTo(target.dataset.go);
        return;
    }
    if (target.dataset.open) {
        goTo(target.dataset.open);
        return;
    }
    if (target.dataset.favorite) {
        changeFavorite(target.dataset.favorite);
        return;
    }
    const myth = target.closest(".myth-card");
    if (myth) {
        const open = myth.classList.toggle("open");
        myth.setAttribute("aria-expanded", String(open));
        return;
    }
    const question = target.closest(".faq-question");
    if (question) {
        const item = question.closest(".faq-item");
        const open = item.classList.toggle("open");
        question.setAttribute("aria-expanded", String(open));
        return;
    }
    if (target.hasAttribute("data-share")) {
        const message = document.querySelector(".share-message");
        const shareData = {
            title: "Pequenos Gigantes",
            text: "Informação também é uma forma de cuidado. Conheça este conteúdo educativo sobre doação de órgãos.",
            url: location.href,
        };
        try {
            if (navigator.share) await navigator.share(shareData);
            else if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    `${shareData.text} ${shareData.url}`,
                );
                if (message)
                    message.textContent =
                        "Link copiado. Você pode compartilhar quando quiser.";
            } else if (message)
                message.textContent =
                    "Use o endereço desta página para compartilhar o protótipo.";
        } catch (error) {
            if (error.name !== "AbortError" && message)
                message.textContent =
                    "Não foi possível compartilhar agora. Tente novamente.";
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft")
        goTo(screens[Math.max(0, currentIndex() - 1)].id);
    if (event.key === "ArrowRight")
        goTo(screens[Math.min(screens.length - 1, currentIndex() + 1)].id);
});

renderScreen();
