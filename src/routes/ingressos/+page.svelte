<script lang="ts">
  import { base } from '#lib/config.ts';
  import { tick } from 'svelte';
  import { bookings, cancelBooking } from '#lib/storage.ts';
  import { sessions, getFilm, dateLabel } from '#lib/data.ts';
  import { money } from '#lib/domain.ts';
  import type { Booking } from '#lib/domain.ts';
  import { downloadTicket } from '#lib/ticket.ts';
  import Seo from '#lib/components/Seo.svelte';
  import Icon from '#lib/components/Icon.svelte';
  let filter = $state('Ativos');
  let shown = $derived(
    $bookings.filter(
      (b) => filter === 'Todos' || (filter === 'Ativos' ? !b.cancelled : b.cancelled),
    ),
  );
  let cancelTarget = $state<Booking | null>(null);
  let dialog: HTMLDialogElement;
  let trigger: HTMLElement | null = null;
  let notice = $state('');
  async function askCancel(booking: Booking) {
    trigger = document.activeElement as HTMLElement;
    cancelTarget = booking;
    await tick();
    dialog.showModal();
  }
  function close() {
    dialog.close();
  }
  function confirmCancel() {
    if (cancelTarget) {
      cancelBooking(cancelTarget.id);
      notice = 'Ingresso demonstrativo cancelado. Os assentos foram liberados neste navegador.';
    }
    close();
  }
</script>

<Seo
  title="Meus ingressos — Cine Aurora"
  description="Sua carteira local de ingressos fictícios do Cine Aurora. Consulte, baixe ou cancele emissões demonstrativas sem qualquer transação real."
/>
<section class="wrap section wallet-page">
  <div class="page-heading">
    <span class="eyebrow gold-text">BOAS HISTÓRIAS MERECEM UM LUGAR</span>
    <h1>Seus ingressos.<br /><em>Suas próximas histórias.</em></h1>
    <p>Uma carteira que vive neste navegador. Sem conta, sem envio de dados.</p>
  </div>
  <div class="wallet-toolbar">
    <div class="genre-tabs" role="group" aria-label="Filtrar ingressos">
      {#each ['Ativos', 'Cancelados', 'Todos'] as option}<button
          aria-pressed={filter === option}
          onclick={() => (filter = option)}>{option}</button
        >{/each}
    </div>
    <span role="status"
      >{shown.length}
      {shown.length === 1 ? 'reserva demonstrativa' : 'reservas demonstrativas'}</span
    >
  </div>
  {#if shown.length}<div class="wallet-list">
      {#each shown as booking}{@const session = sessions.find(
          (s) => s.id === booking.sessionId,
        )!}{@const film = getFilm(session.film)}
        <article class="wallet-ticket" class:cancelled={booking.cancelled}>
          <div class="wallet-poster">
            <img
              src={`${base}/posters/${film.slug}.svg`}
              alt={`Pôster de ${film.title}`}
              width="600"
              height="850"
              loading="lazy"
            />
          </div>
          <div class="wallet-ticket-info">
            <span class="ticket-status" class:inactive={booking.cancelled}
              >{booking.cancelled ? 'CANCELADO' : 'ATIVO · DEMONSTRAÇÃO'}</span
            >
            <h2>{film.title}</h2>
            <p>{dateLabel(session.date)} · {session.time}</p>
            <div class="wallet-metadata">
              <span><Icon name="film" size={16} />{session.room}</span><span
                ><Icon name="seat" size={16} />{booking.seats.join(' · ')}</span
              >
            </div>
            <details>
              <summary>Ver detalhes do ingresso <Icon name="chevron" size={15} /></summary>
              <dl>
                <div>
                  <dt>Nome fictício</dt>
                  <dd>{booking.name}</dd>
                </div>
                <div>
                  <dt>Código local</dt>
                  <dd>{booking.id}</dd>
                </div>
                <div>
                  <dt>Ingressos</dt>
                  <dd>
                    {booking.seats.length - booking.half} inteira(s), {booking.half} meia(s) simulada(s)
                  </dd>
                </div>
                <div>
                  <dt>Valor ilustrativo</dt>
                  <dd>{money(booking.total)}</dd>
                </div>
              </dl>
              <p>Sem validade para entrada. Nenhum pagamento foi realizado.</p>
            </details>
          </div>
          <div class="wallet-ticket-actions">
            <span class="wallet-stub"
              ><Icon name="ticket" size={30} /><code>{booking.id}</code></span
            ><button class="button outline" onclick={() => downloadTicket(booking)}
              ><Icon name="download" size={17} />Baixar ingresso</button
            >{#if !booking.cancelled}<button
                class="cancel-button"
                onclick={() => askCancel(booking)}>Cancelar simulação</button
              >{/if}
          </div>
        </article>{/each}
    </div>{:else}<div class="empty-state wallet-empty">
      <div class="empty-ticket-icon"><Icon name="ticket" size={45} /></div>
      <h2>
        {filter === 'Cancelados' ? 'Nenhuma história cancelada.' : 'Toda história tem um começo.'}
      </h2>
      <p>
        {filter === 'Cancelados'
          ? 'Os ingressos que você cancelar aparecerão aqui.'
          : 'Escolha um filme, encontre seu lugar e experimente seu primeiro ingresso demonstrativo.'}
      </p>
      <a class="button gold" href={`${base}/programacao/`}
        >Explorar programação <Icon name="arrow" size={18} /></a
      >
    </div>{/if}
  <p class="wallet-notice">
    <Icon name="info" size={18} />Os ingressos ficam apenas neste navegador. Limpar os dados do site
    remove esta carteira. Não há sincronização entre dispositivos.
  </p>
  <p class="wallet-feedback" role="status">{notice}</p>
</section>
<dialog
  bind:this={dialog}
  class="cancel-dialog"
  aria-labelledby="cancel-title"
  onclose={() => trigger?.focus()}
>
  <button class="dialog-close" aria-label="Fechar confirmação" onclick={close}
    ><Icon name="close" /></button
  ><Icon name="ticket" size={35} /><span class="eyebrow gold-text">UMA MUDANÇA DE PLANOS</span>
  <h2 id="cancel-title">Deixar essa história<br /><em>para outra hora?</em></h2>
  <p>
    O ingresso demonstrativo {cancelTarget?.id} será cancelado. Seus assentos serão liberados apenas nesta
    experiência local.
  </p>
  <div>
    <button class="button gold" onclick={confirmCancel}>Cancelar ingresso simulado</button><button
      class="button outline"
      onclick={close}>Manter meu ingresso</button
    >
  </div>
</dialog>
