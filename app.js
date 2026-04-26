const card        = document.getElementById('card');
const btn         = document.getElementById('btn');
const placeholder = document.getElementById('placeholder');
const pokemonInfo = document.getElementById('pokemonInfo');
const loading     = document.getElementById('loading');
const sprite      = document.getElementById('sprite');
const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const typeBadges  = document.getElementById('typeBadges');
const statsEl     = document.getElementById('stats');

const POKEMON_COUNT = 1025;

const STAT_COLORS = {
  hp:              '#ff5959',
  attack:          '#f5ac78',
  defense:         '#fae078',
  'special-attack':'#9db7f5',
  'special-defense':'#a7db8d',
  speed:           '#fa92b2',
};

const STAT_LABELS = {
  hp:              'HP',
  attack:          'こうげき',
  defense:         'ぼうぎょ',
  'special-attack':'とくこう',
  'special-defense':'とくぼう',
  speed:           'すばやさ',
};

function showLoading() {
  placeholder.classList.add('hidden');
  pokemonInfo.classList.add('hidden');
  loading.classList.remove('hidden');
}

function showPokemon(data) {
  loading.classList.add('hidden');

  const imgSrc = data.sprites.other?.['official-artwork']?.front_default
               || data.sprites.front_default;

  sprite.src = imgSrc || '';
  pokemonName.textContent = data.name;
  pokemonNumber.textContent = `#${String(data.id).padStart(3, '0')}`;

  typeBadges.innerHTML = data.types
    .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
    .join('');

  statsEl.innerHTML = data.stats.map(s => {
    const key   = s.stat.name;
    const val   = s.base_stat;
    const pct   = Math.min(100, Math.round((val / 255) * 100));
    const color = STAT_COLORS[key] || '#aaa';
    const label = STAT_LABELS[key] || key;
    return `
      <span class="stat-label">${label}</span>
      <div class="stat-bar-wrap">
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width:${pct}%; background:${color};"></div>
        </div>
        <span class="stat-value">${val}</span>
      </div>`;
  }).join('');

  pokemonInfo.classList.remove('hidden');
}

async function fetchRandomPokemon() {
  showLoading();
  const id = Math.floor(Math.random() * POKEMON_COUNT) + 1;
  try {
    const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    showPokemon(data);
  } catch {
    loading.classList.add('hidden');
    placeholder.classList.remove('hidden');
    placeholder.querySelector('span').textContent = '取得に失敗しました。もう一度お試しください。';
  }
}

card.addEventListener('click', fetchRandomPokemon);
btn.addEventListener('click', (e) => {
  e.stopPropagation();
  fetchRandomPokemon();
});
