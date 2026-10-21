<script lang="ts">
  import { base } from '#lib/config.ts';
  import { dates, films, sessions, dateLabel } from '#lib/data.ts';
  import Icon from '#lib/components/Icon.svelte';
  import Seo from '#lib/components/Seo.svelte';
  let selected = $state(dates[0]!);
  let genre = $state('Todos');
  let time = $state('Todos');
  let results = $derived(
    films
      .map((film) => ({
        film,
        sessions: sessions.filter(
          (s) =>
            s.film === film.slug &&
            s.date === selected &&
            (time === 'Todos' || (time === 'Até 18h' ? s.time < '18:00' : s.time >= '18:00')),
        ),
      }))
      .filter((r) => r.sessions.length && (genre === 'Todos' || r.film.genre === genre)),
  );
</script>

<Seo
  title="Programação — Cine Aurora"
  description="Explore a programação fictícia do Cine Aurora por dia, gênero e horário. Escolha uma sessão e experimente o mapa de assentos."
/>
<section class="wrap section program-page">
  <div class="page-heading">
    <span class="eyebrow gold-text">UM ENCONTRO MARCADO COM O CINEMA</span>
    <h1>Escolha o dia.<br /><em>A história espera.</em></h1>
    <p>De 23 a 29 de outubro de 2026 · Uma semana imaginária de cinema.</p>
  </div>
  <div class="date-tabs large" role="group" aria-label="Filtrar programação por dia">
    {#each dates as date, index}<button
        aria-pressed={selected === date}
        onclick={() => (selected = date)}
        ><span>{['SEX', 'SÁB', 'DOM', 'SEG', 'TER', 'QUA', 'QUI'][index]}</span><strong
          >{date.slice(-2)}</strong
        ><small>OUT</small></button
      >{/each}
  </div>
  <div class="program-filters">
    <span class="selected-date">{dateLabel(selected)}</span><label
      ><span class="sr-only">Gênero do filme</span><select bind:value={genre}
        ><option value="Todos">Todos os gêneros</option>{#each films as film}<option
            >{film.genre}</option
          >{/each}</select
      ></label
    ><label
      ><span class="sr-only">Horário da sessão</span><select bind:value={time}
        ><option value="Todos">Todos os horários</option><option>Até 18h</option><option
          >A partir de 18h</option
        ></select
      ></label
    >
  </div>
  <p class="catalog-result" role="status">
    {results.length}
    {results.length === 1 ? 'filme nesta seleção' : 'filmes nesta seleção'}
  </p>
  {#if results.length}<div class="program-list">
      {#each results as result}<article class="program-film">
          <a class="program-poster" href={`${base}/filmes/${result.film.slug}/`}
            ><img
              src={`${base}/posters/${result.film.slug}.svg`}
              alt={`Pôster de ${result.film.title}`}
              width="600"
              height="850"
              loading="lazy"
            /></a
          >
          <div class="program-info">
            <div class="film-meta">
              <span class="age" class:all-ages={result.film.rating === 'L'}
                >{result.film.rating}</span
              ><span>{result.film.genre} · {result.film.duration} min</span>
            </div>
            <h2><a href={`${base}/filmes/${result.film.slug}/`}>{result.film.title}</a></h2>
            <p>{result.film.tagline}</p>
            <a class="text-link" href={`${base}/filmes/${result.film.slug}/`}
              >Sobre o filme <Icon name="arrow" size={15} /></a
            >
          </div>
          <div class="program-times">
            {#each result.sessions as session}<span class="session-room"
                >{session.room} · {session.format}</span
              ><a
                class="time-button"
                href={`${base}/sessao/${session.id}/`}
                aria-label={`${result.film.title}, ${session.time}, escolher assentos`}
                >{session.time}<Icon name="arrow" size={17} /></a
              ><span class="time-caption">Português · reserva simulada</span>{/each}
          </div>
        </article>{/each}
    </div>{:else}<div class="empty-state">
      <Icon name="calendar" size={36} />
      <h2>Outro horário, outra possibilidade.</h2>
      <p>Não há sessões para esta combinação de filtros.</p>
      <button
        class="button gold"
        onclick={() => {
          genre = 'Todos';
          time = 'Todos';
        }}>Ver todos os horários <Icon name="arrow" size={17} /></button
      >
    </div>{/if}
</section>
