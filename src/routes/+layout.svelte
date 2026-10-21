<script lang="ts">
  import '../app.css';
  import '@fontsource-variable/outfit';
  import '@fontsource-variable/space-grotesk';
  import { base } from '#lib/config.ts';
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import Icon from '#lib/components/Icon.svelte';
  import { bookings, storageWarning, initializeWallet, refreshWallet } from '#lib/storage.ts';
  let { children } = $props();
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement;
  let active = $derived($bookings.filter((b) => !b.cancelled).length);
  afterNavigate(() => (menuOpen = false));
  onMount(() => {
    initializeWallet();
    const sync = (event: StorageEvent) => {
      if (event.key === 'aurora-wallet') refreshWallet();
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      menuButton?.focus();
    }
  }}
/>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="demo-strip">
  UMA EXPERIÊNCIA DE CINEMA FICTÍCIA <span>·</span> SEM RESERVAS OU COBRANÇAS REAIS
</div>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href={`${base}/`} aria-label="Cine Aurora, início"
      ><span class="brand-symbol">✳</span><span
        ><small>CINE</small>aurora<span class="brand-period">.</span></span
      ></a
    ><button
      class="menu-toggle"
      bind:this={menuButton}
      aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
      aria-expanded={menuOpen}
      aria-controls="navigation"
      onclick={() => (menuOpen = !menuOpen)}
      ><Icon name={menuOpen ? 'close' : 'menu'} size={23} /></button
    >
    <nav id="navigation" class:open={menuOpen} aria-label="Principal">
      <a
        href={`${base}/#em-cartaz`}
        aria-current={page.url.pathname === `${base}/` ? 'page' : undefined}>Em cartaz</a
      ><a
        href={`${base}/programacao/`}
        aria-current={page.url.pathname.includes('programacao') ? 'page' : undefined}>Programação</a
      ><a
        class="wallet-link"
        href={`${base}/ingressos/`}
        aria-current={page.url.pathname.includes('ingressos') ? 'page' : undefined}
        ><Icon name="ticket" size={17} />Meus ingressos{#if active}<span class="count"
            >{active}</span
          >{/if}</a
      >
    </nav>
  </div>
</header>
<main id="conteudo">
  {#if $storageWarning}<div class="wrap storage-alert" role="status">
      <Icon name="info" size={18} />O armazenamento está indisponível. Seus ingressos ficam
      acessíveis apenas nesta sessão.
    </div>{/if}{@render children()}
</main>
<footer class="site-footer">
  <div class="wrap footer-main">
    <div>
      <a class="brand" href={`${base}/`}
        ><span class="brand-symbol">✳</span><span
          ><small>CINE</small>aurora<span class="brand-period">.</span></span
        ></a
      >
      <p>O mundo lá fora pode esperar.<br />Aqui dentro, começa outra história.</p>
    </div>
    <div class="footer-links">
      <span>ENCONTRE SUA PRÓXIMA HISTÓRIA</span><a href={`${base}/programacao/`}
        >Programação <Icon name="arrow" size={16} /></a
      ><a href={`${base}/sobre/`}>O universo Aurora <Icon name="arrow" size={16} /></a><a
        href={`${base}/ingressos/`}>Minha carteira <Icon name="arrow" size={16} /></a
      >
    </div>
    <div class="footer-note">
      <Icon name="film" size={26} />
      <p>Filmes, sessões, salas e ingressos são fictícios. Nenhum pagamento é processado.</p>
      <a href="https://github.com/gustapaz/cine-aurora" target="_blank" rel="noreferrer"
        >Código no GitHub ↗</a
      >
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© {new Date().getFullYear()} Cine Aurora · Projeto demonstrativo</span><a
      href={`${base}/sobre/#privacidade`}>Privacidade & créditos</a
    ><span>FEITO PARA QUEM GOSTA DE HISTÓRIAS</span>
  </div>
</footer>
