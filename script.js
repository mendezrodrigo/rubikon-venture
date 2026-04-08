const navButtons = document.querySelectorAll('.nav-button');
const views = document.querySelectorAll('.view');
const feedbackButton = document.getElementById('feedback-button');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetView = button.dataset.view;

    navButtons.forEach((btn) => btn.classList.remove('active'));
    views.forEach((view) => view.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`${targetView}-view`).classList.add('active');

    if (feedbackButton) {
      feedbackButton.style.display = targetView === 'identity' ? 'inline-flex' : 'none';
    }
  });
});

const stage = document.getElementById('network-stage');
const nodes = document.querySelectorAll('.map-node');
const detailCard = document.getElementById('network-detail-card');

function setDetailCard(node) {
  const name = node.dataset.name;
  const role = node.dataset.role;
  const city = node.dataset.city;
  const building = node.dataset.building;
  const culture = node.dataset.culture;
  const initials = node.dataset.initials;
  const id = node.dataset.id;

  const pipelineTitle = node.dataset.pipelineTitle;
  const pipelineSummary = node.dataset.pipelineSummary;
  const pipeline1 = node.dataset.pipeline1;
  const pipeline2 = node.dataset.pipeline2;
  const pipeline3 = node.dataset.pipeline3;

  detailCard.innerHTML = `
    <p class="eyebrow">Selected Connection</p>
    <h3>${name}</h3>
    <p class="muted">${role} · ${city} · ${initials}</p>

    <div class="detail-block">
      <p class="section-label">What they are building</p>
      <p>${building}</p>
    </div>

    <div class="detail-block">
      <p class="section-label">Collaboration culture</p>
      <p>${culture}</p>
    </div>

    <div class="detail-block">
      <p class="section-label">Opportunity pipeline</p>
      <h4>${pipelineTitle}</h4>
      <p class="muted detail-summary">${pipelineSummary}</p>
      <ul class="detail-pipeline-list">
        <li>${pipeline1}</li>
        <li>${pipeline2}</li>
        <li>${pipeline3}</li>
      </ul>
    </div>
  `;

  nodes.forEach((n) => n.classList.remove('active'));
  node.classList.add('active');

  highlightLines(id);
}

function highlightLines(id) {
  for (let i = 1; i <= 6; i++) {
    const line = document.getElementById(`line-center-${i}`);
    if (!line) continue;

    if (String(i) === String(id)) {
      line.style.stroke = 'rgba(134, 188, 255, 0.95)';
      line.style.strokeWidth = '2.8';
      line.style.opacity = '1';
    } else {
      line.style.stroke = 'rgba(255,255,255,0.14)';
      line.style.strokeWidth = '1.2';
      line.style.opacity = '0.7';
    }
  }
}

nodes.forEach((node) => {
  node.addEventListener('mouseenter', () => setDetailCard(node));
  node.addEventListener('click', () => setDetailCard(node));
});

if (stage) {
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;

    const rotateY = offsetX * 5;
    const rotateX = offsetY * -5;

    stage.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  stage.addEventListener('mouseleave', () => {
    stage.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });
}

const searchInput = document.getElementById('flow-search');
const signalCards = document.querySelectorAll('.signal-card');
const quickTags = document.querySelectorAll('.quick-tag');

function filterSignals(query) {
  const normalized = query.trim().toLowerCase();

  signalCards.forEach((card) => {
    const haystack = (card.dataset.search || '').toLowerCase();
    const text = card.textContent.toLowerCase();
    const match = !normalized || haystack.includes(normalized) || text.includes(normalized);

    card.classList.toggle('hidden', !match);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    filterSignals(e.target.value);
  });
}

quickTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    const value = tag.textContent.trim();
    searchInput.value = value;
    filterSignals(value);

    quickTags.forEach((t) => t.classList.remove('active'));
    tag.classList.add('active');
  });
});
