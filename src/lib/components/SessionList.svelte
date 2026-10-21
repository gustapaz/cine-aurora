<script lang="ts">
  import { base } from '#lib/config.ts';
  import { dates, dateLabel } from '#lib/data.ts';
  import type { Session } from '#lib/data.ts';
  import Icon from './Icon.svelte';
  let { sessions }: { sessions: Session[] } = $props();
  let selected = $state(dates[0]!);
  let filtered = $derived(sessions.filter((s) => s.date === selected));
</script>

<div class="date-tabs" role="group" aria-label="Dia da sessão">
  {#each dates as date, index}<button
      aria-pressed={selected === date}
      onclick={() => (selected = date)}
      ><span
        >{index === 0
          ? 'SEX'
          : index === 1
            ? 'SÁB'
            : index === 2
              ? 'DOM'
              : index === 3
                ? 'SEG'
                : index === 4
                  ? 'TER'
                  : index === 5
                    ? 'QUA'
                    : 'QUI'}</span
      ><strong>{date.slice(-2)}</strong><small>OUT</small></button
    >{/each}
</div>
<p class="selected-date">{dateLabel(selected)} <span>· Horários demonstrativos</span></p>
<div class="session-options">
  {#each filtered as session}<a class="session-option" href={`${base}/sessao/${session.id}/`}
      ><div>
        <span class="session-room"><Icon name="film" size={16} />{session.room}</span><span
          >{session.format} <i>·</i> {session.audio}</span
        >
      </div>
      <strong>{session.time}</strong><span class="session-choose"
        >Escolher assentos <Icon name="arrow" size={17} /></span
      ></a
    >{/each}
</div>
