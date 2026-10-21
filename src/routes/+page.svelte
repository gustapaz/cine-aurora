<script lang="ts">
  import { base } from '#lib/config.ts';
  import { films } from '#lib/data.ts';
  import FilmCard from '#lib/components/FilmCard.svelte';
  import Icon from '#lib/components/Icon.svelte';
  import Seo from '#lib/components/Seo.svelte';
  let genre = $state('Todos');
  let search = $state('');
  let filtered = $derived(
    films.filter(
      (f) =>
        (genre === 'Todos' || f.genre === genre) &&
        `${f.title} ${f.genre}`
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            search
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .trim()
              .toLowerCase(),
          ),
    ),
  );
</script>

<Seo />
<section class="hero" aria-labelledby="hero-title">
  <img
    class="hero-art"
    src={`${base}/hero.svg`}
    alt="Ilustração de um viajante diante de montanhas e de um grande sol em um deserto"
    width="1600"
    height="820"
    fetchpriority="high"
  />
  <div class="hero-shade"></div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="eyebrow hero-label"><span></span>EM DESTAQUE · UMA JORNADA ALÉM DO ÓBVIO</span>
      <h1 id="hero-title">Depois do<br /><em>Horizonte</em></h1>
      <div class="hero-details">
        <span class="age">12</span><span>Ficção científica</span><i></i><span>1h 52min</span><i
        ></i><span>2026</span>
      </div>
      <p>
        Uma cidade que desapareceu.<br />Um sinal que não deveria existir.<br />Algumas respostas
        estão além do que vemos.
      </p>
      <div class="hero-actions">
        <a class="button gold" href={`${base}/filmes/depois-do-horizonte/#sessoes`}
          ><Icon name="ticket" size={18} />Escolher minha sessão</a
        ><a class="button ghost" href={`${base}/filmes/depois-do-horizonte/`}
          >Conhecer a história <Icon name="arrow" size={17} /></a
        >
      </div>
    </div>
    <div class="hero-vertical" aria-hidden="true">O CINEMA ACONTECE QUANDO A LUZ SE APAGA.</div>
    <div class="hero-foot">
      <span>01 <i>/</i> 06 <small>HISTÓRIAS EM CARTAZ</small></span><a href="#em-cartaz"
        >A próxima história é sua <span>↓</span></a
      ><span class="hero-format">IMAGINE EM TELA GRANDE <Icon name="spark" size={19} /></span>
    </div>
  </div>
</section>
<div class="cinema-ribbon">
  <div class="wrap">
    <span><Icon name="film" size={18} />Histórias fora do óbvio</span><span
      ><Icon name="volume" size={18} />Imagem, som e presença</span
    ><span><Icon name="seat" size={18} />Seu lugar na próxima história</span><a
      href={`${base}/sobre/`}>Conheça o Aurora <Icon name="arrow" size={16} /></a
    >
  </div>
</div>
<section class="wrap section catalog" id="em-cartaz">
  <div class="section-heading">
    <div>
      <span class="eyebrow gold-text">APAGUE AS LUZES. AMPLIE O OLHAR.</span>
      <h2>Qual história te <em>encontra?</em></h2>
    </div>
    <a class="text-link" href={`${base}/programacao/`}
      >Ver programação completa <Icon name="arrow" size={17} /></a
    >
  </div>
  <div class="catalog-tools">
    <div class="genre-tabs" role="group" aria-label="Filtrar filmes por gênero">
      {#each ['Todos', ...films.map((f) => f.genre)] as g}<button
          aria-pressed={genre === g}
          onclick={() => (genre = g)}>{g}</button
        >{/each}
    </div>
    <label class="search-field"
      ><Icon name="search" size={17} /><span class="sr-only">Buscar um filme</span><input
        type="search"
        bind:value={search}
        placeholder="Encontre uma história"
      /></label
    >
  </div>
  <div class="catalog-result" role="status">
    {filtered.length}
    {filtered.length === 1 ? 'filme para descobrir' : 'filmes para descobrir'}
  </div>
  {#if filtered.length}<div class="film-grid">
      {#each filtered as film, index}<FilmCard {film} {index} />{/each}
    </div>{:else}<div class="empty-state">
      <Icon name="search" size={38} />
      <h3>Essa história ainda não chegou.</h3>
      <p>Tente outro título ou explore todos os gêneros.</p>
      <button
        class="button gold"
        onclick={() => {
          genre = 'Todos';
          search = '';
        }}>Limpar filtros <Icon name="arrow" size={17} /></button
      >
    </div>{/if}
</section>
<section class="experience">
  <div class="wrap experience-inner">
    <div class="experience-graphic" aria-hidden="true">
      <div class="light-cone"></div>
      <span class="big-asterisk">✳</span>
      <div class="graphic-caption">
        <span>LUZ. SOM. PRESENÇA.</span><span>EST. IMAGINÁRIO / 2026</span>
      </div>
    </div>
    <div class="experience-copy">
      <span class="eyebrow gold-text">MAIS DO QUE ASSISTIR</span>
      <h2>Tem coisa que<br />só a sala de cinema<br /><em>faz sentir.</em></h2>
      <p>
        O silêncio antes da primeira cena. Um olhar que encontra o seu. A sensação de sair um pouco
        diferente de como entrou.
      </p>
      <p>O Aurora é um convite para descobrir histórias com tempo, espaço e curiosidade.</p>
      <a class="text-link" href={`${base}/sobre/`}
        >Entre no universo Aurora <Icon name="arrow" size={18} /></a
      >
    </div>
  </div>
</section>
<section class="wrap final-cta">
  <span class="eyebrow">SEU PRÓXIMO ENCONTRO COM O INESPERADO</span>
  <h2>O melhor lugar é<br /><em>dentro da história.</em></h2>
  <a class="button gold" href={`${base}/programacao/`}
    >Encontre sua sessão <Icon name="arrow" size={18} /></a
  >
</section>
