<script lang="ts">
  import { rows, allSeats } from '#lib/data.ts';
  let {
    occupied,
    selected,
    onToggle,
  }: { occupied: string[]; selected: string[]; onToggle: (seat: string) => void } = $props();
  let focusSeat = $state('A1');
  let grid: HTMLDivElement;
  $effect(() => {
    if (occupied.includes(focusSeat))
      focusSeat = allSeats.find((s) => !occupied.includes(s)) || 'A1';
  });
  function move(event: KeyboardEvent, seat: string) {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 8,
      ArrowUp: -8,
    };
    let offset = moves[event.key];
    if (!offset && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    let index = allSeats.indexOf(seat);
    if (event.key === 'Home') {
      index = Math.floor(index / 8) * 8;
      offset = 1;
    } else if (event.key === 'End') {
      index = Math.floor(index / 8) * 8 + 7;
      offset = -1;
    } else index += offset;
    while (index >= 0 && index < allSeats.length) {
      const next = allSeats[index]!;
      if (!occupied.includes(next)) {
        focusSeat = next;
        grid.querySelector<HTMLButtonElement>(`[data-seat="${next}"]`)?.focus();
        return;
      }
      index += offset;
    }
  }
</script>

<div class="screen">
  <span></span>
  <p>TELA · O PRÓXIMO MUNDO COMEÇA AQUI</p>
</div>
<p id="seat-help" class="seat-help">
  Escolha até 6 lugares. Use as setas para navegar e Espaço para selecionar.
</p>
<div
  class="seat-map"
  bind:this={grid}
  role="group"
  aria-label="Mapa da sala, seis fileiras e oito assentos por fileira"
  aria-describedby="seat-help"
>
  {#each rows as row}<div class="seat-row" role="group" aria-label={`Fileira ${row}`}>
      <span class="row-label" aria-hidden="true">{row}</span
      >{#each Array.from({ length: 8 }, (_, i) => `${row}${i + 1}`) as seat, index}<button
          type="button"
          class="seat"
          class:aisle={index === 4}
          class:selected={selected.includes(seat)}
          class:accessible={row === 'A' && index < 2}
          disabled={occupied.includes(seat)}
          tabindex={focusSeat === seat ? 0 : -1}
          data-seat={seat}
          aria-label={`${seat}, ${occupied.includes(seat) ? 'ocupado' : selected.includes(seat) ? 'selecionado' : 'disponível'}${row === 'A' && index < 2 ? ', espaço acessível ilustrativo' : ''}`}
          aria-pressed={selected.includes(seat)}
          onkeydown={(event) => move(event, seat)}
          onclick={() => {
            focusSeat = seat;
            onToggle(seat);
          }}>{seat.slice(1)}</button
        >{/each}<span class="row-label" aria-hidden="true">{row}</span>
    </div>{/each}
</div>
<div class="seat-legend">
  <span><i></i>Disponível</span><span><i class="chosen"></i>Sua escolha</span><span
    ><i class="taken"></i>Ocupado</span
  ><span><i class="access"></i>Acessível*</span>
</div>
<p class="seat-disclaimer">* Marcação ilustrativa de acessibilidade em um espaço fictício.</p>
