const state = {
    dilemma: null,
    nodeId: null,
    path: []
};

const screens = {
    menu: document.getElementById('menu'),
    story: document.getElementById('story'),
    ending: document.getElementById('ending')
};

function show(screenId) {
    Object.entries(screens).forEach(([id, el]) => {
        const active = id === screenId;
        el.classList.toggle('hidden', !active);
        el.setAttribute('aria-hidden', String(!active));
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMenu() {
    state.dilemma = null;
    state.nodeId = null;
    state.path = [];

    const availableGrid = document.getElementById('available-grid');
    availableGrid.innerHTML = '';

    DILEMMAS.filter((d) => !d.comingSoon).forEach((d) => {
        const card = document.createElement('button');
        card.className = 'dilemma-card';
        card.type = 'button';
        card.setAttribute('role', 'listitem');

        const tags = (d.tags || []).map((t) => `<span class="tag">${t}</span>`).join('');
        const meta = `<span class="duration">≈ ${d.estimatedMinutes} min</span>`;

        card.innerHTML = `
            <span class="card-kicker">${d.kicker}</span>
            <h3>${d.title}</h3>
            <p class="card-desc">${d.description}</p>
            <div class="card-meta">${tags}${meta}</div>
        `;

        card.addEventListener('click', () => startDilemma(d.id));
        availableGrid.appendChild(card);
    });

    show('menu');
}

function startDilemma(id) {
    const dilemma = DILEMMAS.find((d) => d.id === id);
    if (!dilemma || dilemma.comingSoon) return;

    state.dilemma = dilemma;
    state.nodeId = dilemma.start;
    state.path = [];

    document.getElementById('story-kicker').textContent = dilemma.kicker;
    document.getElementById('story-title').textContent = dilemma.title;

    renderScene(dilemma.start);
    show('story');
}

function renderScene(nodeId) {
    const node = state.dilemma.story[nodeId];
    state.nodeId = nodeId;

    const sceneEl = document.getElementById('scene-text');
    sceneEl.textContent = node.text;
    sceneEl.style.animation = 'none';
    void sceneEl.offsetWidth;
    sceneEl.style.animation = '';

    const choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';

    if (node.choices) {
        node.choices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.type = 'button';
            btn.innerHTML = `
                <span class="choice-key">${idx + 1}</span>
                <span class="choice-text">${choice.text}</span>
            `;
            btn.addEventListener('click', () => makeChoice(choice));
            choicesEl.appendChild(btn);
        });
    } else {
        showEnding(nodeId);
        return;
    }

    updateProgress();
}

function makeChoice(choice) {
    state.path.push({
        nodeId: state.nodeId,
        choiceText: choice.text
    });

    const nextNode = state.dilemma.story[choice.next];
    if (!nextNode || !nextNode.choices) {
        showEnding(choice.next);
    } else {
        renderScene(choice.next);
    }
}

function updateProgress() {
    const dotsEl = document.getElementById('progress-dots');
    dotsEl.innerHTML = '';
    const total = Math.max(state.dilemma.approxSteps || 3, state.path.length + 1);
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i < state.path.length) dot.classList.add('done');
        else if (i === state.path.length) dot.classList.add('current');
        dotsEl.appendChild(dot);
    }
}

function showEnding(endingId) {
    const node = state.dilemma.story[endingId];
    const endingData = state.dilemma.endings[endingId];

    document.getElementById('ending-title').textContent = endingData.title;
    document.getElementById('ending-text').textContent = node && node.text ? node.text : '';
    document.getElementById('ending-verdict').textContent = endingData.verdict;

    const pathList = document.getElementById('path-list');
    pathList.innerHTML = '';
    state.path.forEach((step) => {
        const li = document.createElement('li');
        li.textContent = step.choiceText;
        pathList.appendChild(li);
    });

    show('ending');
}

document.getElementById('back-to-menu').addEventListener('click', renderMenu);
document.getElementById('to-menu').addEventListener('click', renderMenu);
document.getElementById('restart').addEventListener('click', () => {
    if (state.dilemma) startDilemma(state.dilemma.id);
});

document.addEventListener('keydown', (e) => {
    if (screens.story.classList.contains('hidden')) return;
    const idx = parseInt(e.key, 10) - 1;
    if (idx === 0 || idx === 1) {
        const buttons = document.querySelectorAll('#choices .choice-btn');
        if (buttons[idx]) buttons[idx].click();
    } else if (e.key === 'Escape') {
        renderMenu();
    }
});

renderMenu();
