<script lang="ts">
  import { base } from '#lib/config.ts';
  import Icon from './Icon.svelte';
  import type { Film } from '#lib/data.ts';
  let { film, index = 0 }: { film: Film; index?: number } = $props();
</script>

<article class="film-card">
  <a class="poster-link" href={`${base}/filmes/${film.slug}/`} aria-label={`Conhecer ${film.title}`}
    ><img
      src={`${base}/posters/${film.slug}.svg`}
      alt={`Pôster ilustrado de ${film.title}`}
      width="600"
      height="850"
      loading="lazy"
    /><span class="poster-arrow"><Icon name="arrow" size={19} /></span><span class="poster-index"
      >0{index + 1}</span
    ></a
  >
  <div class="film-meta">
    <span class:all-ages={film.rating === 'L'} class="age">{film.rating}</span><span
      >{film.genre}</span
    ><span class="dot-separator">·</span><span>{film.duration} min</span>
  </div>
  <h3><a href={`${base}/filmes/${film.slug}/`}>{film.title}</a></h3>
  <p>{film.tagline}</p>
  <a class="film-sessions-link" href={`${base}/filmes/${film.slug}/#sessoes`}
    >Ver sessões <Icon name="arrow" size={15} /></a
  >
</article>
