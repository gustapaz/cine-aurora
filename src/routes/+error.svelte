<script lang="ts">
  import { page } from '$app/state';
  import { base } from '#lib/config.ts';
  import Seo from '#lib/components/Seo.svelte';
  import Icon from '#lib/components/Icon.svelte';
</script>

<Seo title="Fora de cena — Cine Aurora" />
<section class="wrap section error-page">
  <span class="eyebrow gold-text">{page.status} · FORA DE CENA</span>
  <h1>Essa cena ficou<br /><em>fora do roteiro.</em></h1>
  <p>Não encontramos a página que você procurou. Uma nova história está logo ali.</p>
  <a class="button gold" href={`${base}/`}>Voltar ao início <Icon name="arrow" size={18} /></a>
</section>
