<script lang="ts">
  import { base } from '#lib/config.ts';
  import Icon from '#lib/components/Icon.svelte';
  import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
  title="O universo Aurora — Cine Aurora"
  description="Conheça a proposta do Cine Aurora, uma experiência fictícia de cinema com pôsteres originais, dados locais e nenhuma cobrança real."
/>
<section class="wrap section about-page">
  <div class="page-heading">
    <span class="eyebrow gold-text">UM LUGAR PARA OUTROS MUNDOS</span>
    <h1>O mundo lá fora<br /><em>pode esperar.</em></h1>
    <p>
      Uma experiência digital sobre o que torna o cinema tão especial: descobrir uma boa história e
      escolher estar presente.
    </p>
  </div>
  <div class="about-art">
    <img
      src={`${base}/hero.svg`}
      alt="Paisagem ilustrada de montanhas em tons quentes, com um grande sol ao fundo"
      width="1600"
      height="820"
    /><span>UM UNIVERSO INTEIRO, CRIADO PARA IMAGINAR.</span>
  </div>
  <div class="about-narrative">
    <span class="eyebrow gold-text">A IDEIA POR TRÁS DA TELA</span>
    <div>
      <h2>Fictício na programação.<br /><em>Completo na experiência.</em></h2>
      <p>
        O Cine Aurora é um projeto de portfólio de desenvolvimento front-end. Todos os filmes,
        personagens, profissionais, salas, sessões e preços foram criados para a demonstração. As
        classificações etárias são ilustrativas e não são classificações oficiais de obras reais.
      </p>
      <p>
        Você pode percorrer o catálogo, filtrar horários, escolher assentos e gerar ingressos de
        demonstração. Não há um cinema físico, venda, reserva ou sessão real.
      </p>
    </div>
  </div>
  <div class="about-features">
    <article>
      <Icon name="film" size={28} />
      <h3>Histórias originais</h3>
      <p>Seis filmes imaginários com sinopses e pôsteres vetoriais criados para esta coleção.</p>
    </article>
    <article>
      <Icon name="seat" size={28} />
      <h3>Do seu ponto de vista</h3>
      <p>
        Mapa interativo com navegação por teclado, seleção de lugares e conferência de
        disponibilidade local.
      </p>
    </article>
    <article>
      <Icon name="ticket" size={28} />
      <h3>Sem transações reais</h3>
      <p>
        Ingressos fictícios, valores ilustrativos e uma carteira local que funciona sem conta ou
        cartão.
      </p>
    </article>
  </div>
  <section class="privacy-section" id="privacidade">
    <span class="eyebrow gold-text">TRANSPARÊNCIA DESDE A PRIMEIRA CENA</span>
    <h2>Seus dados ficam <em>com você.</em></h2>
    <details open>
      <summary>O que fica salvo no navegador?<Icon name="chevron" size={17} /></summary>
      <p>
        A chave <code>aurora-wallet</code> do armazenamento local contém suas emissões demonstrativas:
        nome fictício, sessão, assentos, valores ilustrativos, código e estado de cancelamento. Não informe
        dados pessoais. Limpar os dados do site remove a carteira local.
      </p>
    </details>
    <details>
      <summary>Existe servidor, banco ou pagamento?<Icon name="chevron" size={17} /></summary>
      <p>
        Não. Os dados do catálogo vêm de arquivos locais. Não há API de aplicação, backend, banco de
        dados, autenticação, formulário enviado ou integração financeira. A pequena espera ao emitir
        ingressos é uma simulação de interface.
      </p>
    </details>
    <details>
      <summary
        >Os assentos ficam reservados para outras pessoas?<Icon name="chevron" size={17} /></summary
      >
      <p>
        Não. A disponibilidade inicial é um mock e as emissões afetam apenas este navegador. As abas
        do mesmo navegador leem o estado local, mas não há garantia transacional de concorrência,
        sincronização entre dispositivos ou reserva real.
      </p>
    </details>
    <details>
      <summary>Há rastreadores ou serviços externos?<Icon name="chevron" size={17} /></summary>
      <p>
        O site não usa analytics, rastreadores, fontes remotas ou serviços de aplicação. A
        hospedagem estática é feita no GitHub Pages, que pode processar registros técnicos de acesso
        conforme a <a
          href="https://docs.github.com/pt/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noreferrer">política de privacidade do GitHub</a
        >.
      </p>
    </details>
    <details>
      <summary>Como foram feitas as ilustrações?<Icon name="chevron" size={17} /></summary>
      <p>
        Os pôsteres, a paisagem e os ícones são desenhos vetoriais próprios feitos em SVG. Não são
        cartazes de filmes reais. O script de geração está incluído no código do projeto. As fontes
        Outfit e Space Grotesk são servidas localmente e mantêm suas licenças SIL Open Font License.
      </p>
    </details>
  </section>
  <div class="source-card">
    <div>
      <span class="eyebrow gold-text">POR TRÁS DOS BASTIDORES</span>
      <h2>Código aberto.<br /><em>Olhar curioso.</em></h2>
      <p>
        Desenvolvido por Gustavo Paz com Svelte, SvelteKit e TypeScript. Código e ilustrações sob
        licença MIT.
      </p>
    </div>
    <a
      class="button outline"
      href="https://github.com/gustapaz/cine-aurora"
      target="_blank"
      rel="noreferrer">Explorar código <Icon name="arrow" size={18} /></a
    >
  </div>
  <a class="text-link" href={`${base}/programacao/`}
    >Voltar para as histórias <Icon name="arrow" size={18} /></a
  >
</section>
