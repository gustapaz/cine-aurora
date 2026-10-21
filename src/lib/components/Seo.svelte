<script lang="ts">
  import { page } from '$app/state';
  let {
    title = 'Cine Aurora — histórias que ficam',
    description = 'Um cinema fictício para explorar histórias, escolher assentos e experimentar ingressos digitais. Demonstração front-end sem reservas ou cobranças reais.',
  }: { title?: string; description?: string } = $props();
  let canonical = $derived(`https://gustapaz.github.io${page.url.pathname}`);
</script>

<svelte:head
  ><title>{title}</title><meta name="description" content={description} /><link
    rel="canonical"
    href={canonical}
  /><meta property="og:title" content={title} /><meta
    property="og:description"
    content={description}
  /><meta property="og:url" content={canonical} /><meta property="og:type" content="website" /><meta
    property="og:image"
    content="https://gustapaz.github.io/cine-aurora/social.png"
  /><meta name="twitter:card" content="summary_large_image" /></svelte:head
>
