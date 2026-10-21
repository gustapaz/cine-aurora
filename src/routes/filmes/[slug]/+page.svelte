<script lang="ts">
  import { base } from '#lib/config.ts';
  import Icon from '#lib/components/Icon.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import SessionList from '#lib/components/SessionList.svelte';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<Seo title={`${data.film.title} — Cine Aurora`} description={data.film.synopsis} />
<section class="wrap film-detail section">
  <a class="back-link" href={`${base}/#em-cartaz`}
    ><Icon name="back" size={16} />Voltar aos filmes</a
  >
  <div class="film-detail-grid">
    <div class="detail-poster">
      <img
        src={`${base}/posters/${data.film.slug}.svg`}
        alt={`Pôster ilustrado de ${data.film.title}`}
        width="600"
        height="850"
        fetchpriority="high"
      />
    </div>
    <div class="detail-copy">
      <span class="eyebrow gold-text">{data.film.label}</span>
      <h1>{data.film.title}</h1>
      <p class="film-tagline">{data.film.tagline}</p>
      <div class="film-meta">
        <span class="age" class:all-ages={data.film.rating === 'L'}>{data.film.rating}</span><span
          >{data.film.genre}</span
        ><span>·</span><span>{data.film.duration} min</span><span>·</span><span
          >{data.film.year}</span
        >
      </div>
      <h2 class="small-title">A história</h2>
      <p class="synopsis">{data.film.synopsis}</p>
      <p class="director-note">“{data.film.note}”</p>
      <dl class="credits">
        <div>
          <dt>DIREÇÃO</dt>
          <dd>{data.film.director}</dd>
        </div>
        <div>
          <dt>ELENCO FICTÍCIO</dt>
          <dd>{data.film.cast.join(', ')}</dd>
        </div>
        <div>
          <dt>IDIOMA</dt>
          <dd>Português</dd>
        </div>
        <div>
          <dt>CLASSIFICAÇÃO ILUSTRATIVA</dt>
          <dd>{data.film.rating === 'L' ? 'Livre' : `${data.film.rating} anos`}</dd>
        </div>
      </dl>
      <a class="button gold" href="#sessoes">Encontrar uma sessão <Icon name="arrow" size={17} /></a
      >
      <p class="fiction-note">
        <Icon name="info" size={15} />Filme e equipe criados para esta experiência fictícia.
      </p>
    </div>
  </div>
</section>
<section class="wrap section sessions-section" id="sessoes">
  <div class="section-heading">
    <div>
      <span class="eyebrow gold-text">DÊ UM TEMPO PARA ESSA HISTÓRIA</span>
      <h2>Seu lugar começa <em>aqui.</em></h2>
    </div>
    <span class="price-note"
      >Inteira <strong>R$ 32</strong> · Meia simulada <strong>R$ 16</strong><small
        >Sem taxa ou cobrança real</small
      ></span
    >
  </div>
  <SessionList sessions={data.sessions} />
</section>
