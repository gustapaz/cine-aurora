<script lang="ts">
  import { base } from '#lib/config.ts';
  import { tick } from 'svelte';
  import { dateLabel } from '#lib/data.ts';
  import { occupiedSeats, totalPrice, validateSelection, money } from '#lib/domain.ts';
  import type { Booking } from '#lib/domain.ts';
  import { bookings, issueBooking, refreshWallet } from '#lib/storage.ts';
  import { downloadTicket } from '#lib/ticket.ts';
  import Icon from '#lib/components/Icon.svelte';
  import SeatMap from '#lib/components/SeatMap.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  let selected = $state<string[]>([]);
  let half = $state(0);
  let step = $state(1);
  let name = $state('');
  let agreed = $state(false);
  let busy = $state(false);
  let message = $state('');
  let completed = $state<Booking | null>(null);
  let heading = $state<HTMLHeadingElement>(null!);
  let occupied = $derived([
    ...occupiedSeats(data.session.id),
    ...$bookings
      .filter((b) => b.sessionId === data.session.id && !b.cancelled)
      .flatMap((b) => b.seats),
  ]);
  let total = $derived(
    selected.length ? totalPrice(selected.length, Math.min(half, selected.length)) : 0,
  );
  function toggle(seat: string) {
    message = '';
    if (selected.includes(seat)) {
      selected = selected.filter((s) => s !== seat);
      half = Math.min(half, selected.length);
    } else if (selected.length === 6) message = 'Você pode escolher até 6 assentos por emissão.';
    else selected = [...selected, seat].sort();
  }
  async function next() {
    refreshWallet();
    const error = validateSelection(data.session.id, selected, $bookings);
    if (error) {
      message = error;
      return;
    }
    step = 2;
    message = '';
    await tick();
    heading.focus();
  }
  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (busy || !agreed) return;
    busy = true;
    message = '';
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      completed = issueBooking(data.session.id, selected, half, name);
      step = 3;
      await tick();
      heading.focus();
    } catch (error) {
      message =
        error instanceof Error
          ? error.message
          : 'Não foi possível concluir a simulação. Tente novamente.';
    } finally {
      busy = false;
    }
  }
  async function back() {
    step = 1;
    message = '';
    await tick();
    heading.focus();
  }
</script>

<Seo
  title={`Escolher assentos · ${data.film.title} — Cine Aurora`}
  description={`Experimente a reserva fictícia de ${data.film.title}. Escolha seus assentos, confira os valores ilustrativos e emita ingressos de demonstração, sem pagamento.`}
/>
<section class="wrap section booking-page">
  <a class="back-link" href={`${base}/filmes/${data.film.slug}/#sessoes`}
    ><Icon name="back" size={16} />Outras sessões</a
  >
  <ol class="booking-steps" aria-label="Etapas da emissão">
    <li class:current={step === 1} class:done={step > 1}>
      <span>{step > 1 ? '✓' : '01'}</span>Seu lugar
    </li>
    <li class:current={step === 2} class:done={step > 2}>
      <span>{step > 2 ? '✓' : '02'}</span>Sua escolha
    </li>
    <li class:current={step === 3}><span>03</span>Sua história</li>
  </ol>
  {#if step === 3 && completed}<div class="booking-success">
      <span class="success-symbol"><Icon name="check" size={30} /></span><span
        class="eyebrow gold-text">ESTÁ TUDO PRONTO NA NOSSA IMAGINAÇÃO</span
      >
      <h1 bind:this={heading} tabindex="-1">Seu próximo destino:<br /><em>outra história.</em></h1>
      <p>Seu ingresso demonstrativo foi gerado e está na carteira deste navegador.</p>
      <div class="success-ticket">
        <span class="ticket-label">CINE AURORA · SEM VALIDADE REAL</span>
        <h2>{data.film.title}</h2>
        <p>{dateLabel(data.session.date)} · {data.session.time}</p>
        <div><span>{data.session.room}</span><strong>{completed.seats.join(' · ')}</strong></div>
        <div class="mock-barcode" aria-hidden="true">
          {#each Array.from({ length: 45 }, (_, i) => i) as index}<i
              style:width={`${index % 3 === 0 ? 3 : index % 2 === 0 ? 2 : 1}px`}
            ></i>{/each}
        </div>
        <code>{completed.id}</code><small>Código visual ilustrativo · não escaneável</small>
      </div>
      <div class="success-actions">
        <button class="button gold" onclick={() => downloadTicket(completed!)}
          ><Icon name="download" size={18} />Baixar ingresso</button
        ><a class="button outline" href={`${base}/ingressos/`}
          >Abrir minha carteira <Icon name="arrow" size={17} /></a
        >
      </div>
      <p class="fiction-note">Nenhuma reserva, sessão ou cobrança real foi realizada.</p>
    </div>
  {:else}<div class="booking-heading">
      <span class="eyebrow gold-text"
        >{step === 1 ? 'A PERSPECTIVA É SUA' : 'FALTA SÓ O ÚLTIMO DETALHE'}</span
      >
      <h1 bind:this={heading} tabindex="-1">
        {step === 1 ? 'Escolha seu' : 'Confirme sua'} <em>{step === 1 ? 'lugar.' : 'história.'}</em>
      </h1>
      <p>
        {step === 1
          ? 'No centro, na ponta ou pertinho da tela. Encontre sua melhor perspectiva.'
          : 'Tudo aqui é uma simulação. Você não precisa informar dados reais ou pagar.'}
      </p>
    </div>
    <div class="booking-grid">
      <div class="booking-main">
        {#if step === 1}<div class="seat-card">
            <div class="seat-card-heading">
              <span><Icon name="seat" size={18} />{data.session.room}</span><span
                >48 lugares · mapa ilustrativo</span
              >
            </div>
            {#if selected.length}<button
                class="seat-reset"
                onclick={() => {
                  selected = [];
                  half = 0;
                  message = '';
                }}>Limpar escolha ({selected.length}) <Icon name="close" size={14} /></button
              >{/if}
            <SeatMap {occupied} {selected} onToggle={toggle} />
          </div>{:else}<form id="confirmation-form" class="checkout-form" onsubmit={submit}>
            <section class="form-panel">
              <span class="eyebrow">01 · SEUS INGRESSOS</span>
              <h2>Uma boa história cabe para todos.</h2>
              <div class="ticket-type">
                <div><strong>Inteira</strong><span>{money(32)} por ingresso</span></div>
                <output>{selected.length - half}</output>
              </div>
              <div class="ticket-type">
                <div>
                  <strong>Meia simulada</strong><span
                    >{money(16)} por ingresso · apenas demonstração</span
                  >
                </div>
                <label
                  ><span class="sr-only">Quantidade de meias simuladas</span><select
                    bind:value={half}
                    >{#each Array.from({ length: selected.length + 1 }, (_, i) => i) as quantity}<option
                        value={quantity}>{quantity}</option
                      >{/each}</select
                  ></label
                >
              </div>
              <p class="form-help">
                Valores fictícios. Nenhuma comprovação ou documento é solicitado.
              </p>
            </section>
            <section class="form-panel">
              <span class="eyebrow">02 · SUA IDENTIFICAÇÃO FICTÍCIA</span><label class="name-label"
                >Nome no ingresso<input
                  bind:value={name}
                  placeholder="Ex.: Alex Aurora"
                  minlength="2"
                  maxlength="60"
                  pattern=".*\S.*\S.*"
                  required
                  autocomplete="off"
                /><small>Use um nome inventado. Não informe dados pessoais.</small></label
              >
            </section>
            <section class="form-panel">
              <span class="eyebrow">03 · NENHUM PAGAMENTO REAL</span>
              <div class="payment-demo">
                <Icon name="ticket" size={25} />
                <div>
                  <strong>Emissão demonstrativa</strong>
                  <p>Sem cartão, Pix, cobrança ou transação financeira.</p>
                </div>
                <Icon name="check" size={20} />
              </div>
              <label class="agreement"
                ><input type="checkbox" bind:checked={agreed} required /><span
                  >Entendi que este ingresso é fictício, não dá acesso a uma sessão real e será
                  salvo apenas neste navegador.</span
                ></label
              >
            </section>
          </form>{/if}
        <div class="booking-message" role="status" aria-live="polite">{message}</div>
      </div>
      <aside class="order-summary">
        <span class="eyebrow">SUA PRÓXIMA HISTÓRIA</span>
        <div class="summary-film">
          <img
            src={`${base}/posters/${data.film.slug}.svg`}
            alt={`Pôster de ${data.film.title}`}
            width="600"
            height="850"
          />
          <div>
            <span class="age" class:all-ages={data.film.rating === 'L'}>{data.film.rating}</span>
            <h2>{data.film.title}</h2>
            <p>{data.film.genre} · {data.film.duration} min</p>
          </div>
        </div>
        <dl class="summary-session">
          <div>
            <dt><Icon name="calendar" size={17} />QUANDO</dt>
            <dd>{dateLabel(data.session.date)}<br /><strong>{data.session.time}</strong></dd>
          </div>
          <div>
            <dt><Icon name="film" size={17} />ONDE</dt>
            <dd>{data.session.room}<br />{data.session.format} · {data.session.audio}</dd>
          </div>
          <div>
            <dt><Icon name="seat" size={17} />SEUS LUGARES</dt>
            <dd>
              {#if selected.length}<div class="selected-chips">
                  {#each selected as seat}<span>{seat}</span>{/each}
                </div>{:else}<span class="muted">A história começa com uma escolha.</span>{/if}
            </dd>
          </div>
        </dl>
        <div class="summary-price">
          <span
            >Total ilustrativo<small
              >{selected.length}
              {selected.length === 1 ? 'ingresso' : 'ingressos'} · sem taxas</small
            ></span
          ><strong>{money(total)}</strong>
        </div>
        {#if step === 1}<button class="button gold full" disabled={!selected.length} onclick={next}
            >Continuar <Icon name="arrow" size={18} /></button
          >{:else}<button
            class="button gold full"
            type="submit"
            form="confirmation-form"
            disabled={busy}
            aria-busy={busy}
            >{busy
              ? 'Preparando sua história...'
              : 'Emitir ingressos de demonstração'}{#if !busy}<Icon
                name="ticket"
                size={17}
              />{/if}</button
          ><button class="text-link full center" disabled={busy} onclick={back}
            ><Icon name="back" size={15} />Alterar assentos</button
          >{/if}
        <p class="summary-disclaimer">
          <Icon name="info" size={15} />Uma experiência fictícia. Nada será cobrado.
        </p>
      </aside>
    </div>{/if}
</section>
