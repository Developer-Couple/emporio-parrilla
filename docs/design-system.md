# Design System — Empório Parrilla

Estado: `ready`

Última atualização: 2026-09-04 (rodada 6) — quatro decisões sobre a seção Cardápio, refletidas em `docs/briefing.md` na mesma data: (1) botão flutuante de WhatsApp, oculto durante o Hero e exibido após a rolagem além dele; (2) reversão do placeholder "Foto em breve" — os 189 itens passam a exibir imagem real e apetitosa coerente com o tipo do item (banco de imagens livre, com reaproveitamento de imagem permitido entre itens semelhantes da mesma categoria); (3) direção de UX para a seção parecer mais um "cardápio navegável" (hierarquia visual, imagens), sem alterar dados/estrutura; (4) centralização do título "Cardápio" e do campo de busca no layout da seção. Ver "Componentes necessários", "Estados" e "Comportamento responsivo" abaixo. Atualização anterior (2026-09-04, rodada 5) — a seção Sobre (`#sobre`) passa a usar `assets/video/video01.mp4` como mídia principal do grid de 2 colunas, no lugar da imagem estática `assets/img/ambiente-salao-cheio.jpg`, que é reaproveitada como fallback/poster do vídeo — mesma técnica já usada no Hero (`<video poster="...">`). Detalhe completo em `docs/briefing.md`. Ver "Componentes necessários" abaixo. Atualização anterior (2026-09-04, rodada 4) — a animação de entrada do Hero passa a usar a biblioteca GSAP, carregada via CDN, replicando o efeito de outro projeto do usuário (`stlvalley-hub`): zoom-out da logo, recolhimento de altura da seção, fade-in em cascata do texto e bounce do indicador de scroll. Requisito de acessibilidade: respeita `prefers-reduced-motion` e tem fallback funcional sem JS. Detalhe completo em `docs/briefing.md`. Ver "Componentes necessários" e "Acessibilidade" abaixo. Atualização anterior (2026-09-04, rodada 3) — o carrossel duplo da seção Galeria passa de 10 para 20 fotos (10 por trilha), com as 10 novas fotos reais inseridas pelo usuário e curadoria por intercalação de categoria; possível ajuste de altura da seção para manter velocidade de scroll confortável com o dobro de conteúdo. Detalhe completo em `docs/briefing.md`. Ver "Componentes necessários" abaixo. Atualização anterior (2026-09-04, rodada 2) — incorporadas duas novas decisões do usuário/dono do projeto, refletidas em `docs/briefing.md` na mesma data: (1) a seção de cardápio passa a ser revelada sob demanda ao clicar em "Menu" no header, em vez de ficar sempre visível na rolagem contínua; (2) o Hero passa a exibir a logo `assets/logo/logo-fundo-transparente.png` no lugar do `<h1>` textual do nome da marca. Ver "Componentes necessários" e "Comportamento responsivo" abaixo. Atualização anterior (2026-09-04, rodada 1): incorporada a decisão sobre fotos por item de cardápio (1 item, "Laranja", com foto real; demais 188 com placeholder "em breve"). Atualização anterior (2026-09-03/04): incorporadas as mesmas 4 decisões refletidas em `docs/briefing.md` em 2026-09-03: mídia de hero (vídeo `assets/video/hero.mp4` + fallback `assets/img/hero.jpeg`), remoção das subseções de galeria "Cardápio impresso oficial" e "Vídeos do ambiente", e correção da contagem de itens do cardápio (189, não ~150).

Este documento consolida o design system construído a partir de material real do cliente (logos em `assets/logo/`, cardápio impresso oficial) e das decisões finais do usuário/dono do projeto onde o material não bastava (tipografia exata, borda/divisor, descarte do acento âmbar). Onde a evidência é uma observação direta do material, está marcado como tal; onde é inferência/derivação ou decisão explícita, também está marcado.

## Direção visual

Tom clássico steakhouse rústico-sofisticado: preto/ardósia + marrom-café + dourado envelhecido + off-white com textura de madeira. Observado nas logos e no cardápio oficial do cliente (`assets/logo/`).

Elemento gráfico de marca (observado nas logos): losango com bordas duplas douradas, monograma "EP", dois espetos cruzados, linhas horizontais decorativas em leque.

## Tipografia (decidida pelo usuário/dono do projeto)

O material do cliente (logos, cardápio impresso) mostra apenas o estilo — nome da marca em serifada tipo slab/display condensada, corpo de texto em serifada editorial, títulos de seção em sans-serif condensada em caixa alta — sem identificar a família exata, pesos ou licenciamento. Com base nesse estilo observado, foi decidido o seguinte trio de fontes gratuitas via Google Fonts como aproximação estilística (não são a fonte real da marca, e isso deve permanecer registrado):

| Uso | Fonte | Fallback de sistema |
|---|---|---|
| Display/marca (nome "Empório Parrilla", títulos hero) | `Abril Fatface` | serif |
| Corpo de texto | `Lora` | serif |
| Títulos de seção do cardápio (ENTRADAS, BATATAS, etc.) | `Oswald` | sans-serif |

Carregamento: via `<link>`/`@import` do Google Fonts (dependência externa leve, compatível com o projeto HTML/CSS/JS puro). Como é uma dependência externa, o CSS deve definir fallback de fonte de sistema (serif/sans-serif genérico, conforme tabela acima) para o caso de indisponibilidade de conexão com o Google Fonts.

## Paleta de cores

### Modo claro

| Uso | Hex | Status |
|---|---|---|
| Fundo | `#F5F2EC` | Observado (off-white com textura de madeira) |
| Texto principal | `#3D2E26` | Observado (marrom-café escuro) |
| Texto secundário | `#6B5B4F` | Derivado — não observado diretamente, marcar como decisão de implementação |
| Destaque / CTA | `#C9A662` | Observado (dourado envelhecido; faixa observada `#C9A662`–`#D4AF6A`) |
| Borda / divisor | `#3D2E26` | Decidido pelo usuário/dono do projeto — mais fiel aos divisores observados no cardápio impresso oficial. Alternativa `#D8CBB0` foi cogitada e descartada. |

### Modo escuro

| Uso | Hex | Status |
|---|---|---|
| Fundo | `#141210` | Observado (preto amarronzado, textura ardósia) |
| Texto principal | `#EFE7D8` | Observado (off-white quente) |
| Texto secundário | `#B8A98F` | Derivado — não observado diretamente |
| Destaque / CTA | `#D9B65C` | Observado (dourado mais claro/luminoso) |
| Borda / divisor | `#4A3B31` | Inferido — não observado literalmente como borda no material |

### Acento cogitado e descartado

`#D98C4A` (âmbar de brasa) — apareceu apenas no Instagram do cliente, não no material impresso oficial (cardápio/logos). Decisão do usuário/dono do projeto: **não usar** como token estrutural ou oficial. Registrado aqui apenas como nota histórica de que foi cogitado; a paleta oficial do design-system se baseia exclusivamente em preto/ardósia + marrom-café + dourado envelhecido + off-white (ver "Direção visual" e tabelas acima).

## Espaçamento

Não há evidência de sistema de espaçamento no material do cliente (logos e cardápio impresso não definem grid digital). Recomenda-se escala simples em múltiplos de 8px (8, 16, 24, 32, 48, 64) por ser suficiente para o porte da página — **decisão de implementação**, não fato de marca.

## Componentes necessários

- Header com navegação, incluindo link/item "Menu" (ou equivalente) para a seção de cardápio. **Atualização (2026-09-04, rodada 2):** esse link deixa de ser uma âncora de rolagem contínua para uma seção sempre visível — ver requisito de revelação sob demanda no componente "Seção de cardápio" abaixo.
- Toggle de modo claro/escuro.
- Hero institucional (chamada, CTA de WhatsApp), com vídeo de fundo/destaque (`assets/video/hero.mp4`) e imagem de fallback/poster (`assets/img/hero.jpeg`), confirmados pelo usuário/dono do projeto em 2026-09-03. O mecanismo técnico exato (ex. elemento `<video>` com `poster` e `<source>`, autoplay/muted/loop) fica a critério do commerial na implementação, respeitando os dois arquivos como requisito de conteúdo. **Nome da marca no Hero (decidido em 2026-09-04, rodada 2):** o `<h1>` textual ("Empório Parrilla") é substituído pela logo `assets/logo/logo-fundo-transparente.png` (monograma dourado "EP" com moldura em losango, fundo transparente; ver inventário em `docs/briefing.md`). A implementação deve manter o nome "Empório Parrilla" acessível/indexável (ex. `alt` descritivo, ou técnica equivalente) para leitores de tela e SEO — requisito obrigatório, técnica exata a critério do commerial. **Animação de entrada via GSAP (decidido em 2026-09-04, rodada 4):** ao carregar a página, uma única vez (não vinculado a scroll), a logo, o slogan, o subtítulo e a localização do Hero animam em sequência — zoom-out da logo até o tamanho normal, clareamento progressivo do fundo escurecido sobre o vídeo, fade-in em cascata do texto e, por último, bounce contínuo em CSS no indicador de "role para explorar". Implementado com a biblioteca GSAP via CDN (dependência externa adicional — ver `docs/briefing.md`, "Stack técnica"). **Altura da seção durante a entrada (complemento, mesma rodada):** o Hero permanece em 100vh durante toda essa animação de entrada (zoom da logo + overlay + cascata de texto); só depois que a timeline termina, a seção anima sua altura de 100vh para um valor menor (ex. 80vh), em transição suave, revelando o início da seção seguinte — mesmo efeito de referência do `stlvalley-hub` ("hero em tela cheia que recolhe" após o impacto inicial), parte da mesma timeline de entrada. Requisito obrigatório: respeitar `prefers-reduced-motion` e ter fallback funcional sem JS (ver "Acessibilidade" abaixo).
- Seção de cardápio com 189 itens em ~25 categorias (correção de contagem em 2026-09-03; valor anterior "~150" estava desatualizado — ver `docs/briefing.md`) — componente central da página. Layout decidido (ver `docs/briefing.md`, seção "Decisões de implementação"): tabs horizontais por categoria no desktop, colapsando para dropdown/accordion vertical em mobile; campo de busca simples no topo; accordion secundário "Bar/Bebidas" separado visualmente das categorias de comida. **Revelação sob demanda (decidido em 2026-09-04, rodada 2):** a seção fica oculta por padrão e só é exibida quando o usuário clica em "Menu"/"Cardápio" no header — deixa de ser uma seção sempre visível na rolagem contínua da single page. Mecanismo técnico (ex. exibir/expandir via JS) a critério do commerial, com fallback de acessibilidade que preserve o link como âncora de navegação para uso sem JS. **Direção de UX "cardápio navegável" (decidido em 2026-09-04, rodada 6):** o usuário pediu que a seção "tenha pegada de cardápio" e seja fácil e agradável de navegar — reforçar hierarquia visual (títulos de categoria, espaçamento, uso de imagem por item) para que pareça mais um cardápio de restaurante do que uma lista de preços simples. Não altera os dados/estrutura (189 itens, ~25 categorias, tabs/accordion continuam); não inclui carrinho, seleção de item ou pedido via WhatsApp por item (fora de escopo — ver `docs/briefing.md`, "Backlog / melhorias futuras"). A técnica exata de reforço visual (tipografia, espaçamento, uso do grid de imagens) fica a critério do commerial, respeitando a paleta e tipografia já definidas neste documento.
- **Cabeçalho do cardápio centralizado (decidido em 2026-09-04, rodada 6):** o título "Cardápio" (`#cardapioTitle`) e o campo de busca (`.menu-search`/`#menuSearch`) passam a ficar centralizados no layout da seção, em todos os breakpoints. Estado anterior (verificado em `css/styles.css`): `h2` sem `text-align` próprio (alinhamento padrão à esquerda do fluxo) e `.menu-search` como container flex com `max-width: 40rem` sem margem automática — hoje ambos ficam alinhados à esquerda dentro do `.container`. Técnica exata (ex. `text-align: center` no título; `margin: 0 auto` + `justify-content: center` no container de busca, preservando o layout flexível de `.menu-search-input`/`.menu-search-clear`) a critério do commerial.
- Cards de item de cardápio: nome, descrição (quando houver), preço; grid de 2 colunas no desktop e 1 coluna no mobile; leiaute inspirado no padrão do cardápio impresso oficial. **Imagem por item — decisão revisada em 2026-09-04, rodada 6 (substitui a decisão de placeholder de 2026-09-04, rodada 1, mantida abaixo apenas como histórico):** todos os 189 itens do cardápio passam a exibir uma imagem real e apetitosa, coerente com o tipo/categoria do item (ex. item de drink recebe foto de drink, item de carne recebe foto de carne grelhada) — deixa de existir o estado final de placeholder textual "Foto em breve" para a maioria dos itens. Critérios:
  - Fonte recomendada: bancos de imagens gratuitos de uso comercial (Unsplash, Pexels ou equivalente); evitar extração direta do Pinterest por risco de direitos autorais de terceiros.
  - Reaproveitamento de imagem entre itens muito semelhantes da mesma categoria é permitido (ex. variações de caipirinha podem compartilhar uma foto genérica de drink), mas deve ficar registrado como critério de curadoria explícito na implementação, não decidido silenciosamente.
  - Material bruto do usuário em `assets/cardapio/` (3 imagens nomeadas — `cerveja.png`, `steak-salada.png`, `carne-salada.png` — e 17 capturas de tela de referência de concorrente) está disponível, mas sem correspondência verificada item-a-item; uso opcional, a critério do commerial, preferindo banco de imagens livre quando não houver correspondência clara. Ver detalhe completo em `docs/briefing.md`.
  - O componente de card mantém um slot de imagem fixo (`.menu-item-media`, `aspect-ratio: 4/3` já definido em CSS), mas o estado "placeholder textual" deixa de ser o padrão esperado para 188 dos 189 itens — passa a ser exceção/fallback apenas enquanto uma imagem definitiva não é escolhida, não o estado final de aceite.
  - *(Histórico, substituído): dos 189 itens, apenas 1 ("Laranja", categoria Sucos Naturais) tinha foto real (`bebida-suco-laranja-detalhe.jpg`); os demais 188 exibiam placeholder de texto "em breve".*
- Campo de busca (filtro em JS puro) no topo da seção de cardápio, centralizado junto ao título (ver "Cabeçalho do cardápio centralizado" acima).
- Seção de galeria/ambiente com carrossel duplo (2 trilhas, 10 fotos cada — 20 fotos no total, ver inventário em `docs/briefing.md`), usando as fotos reais do estabelecimento catalogadas em `assets/img/`. **Atualização (2026-09-04, rodada 3):** o total passou de 10 para 20 fotos com a inserção de 10 novas fotos pelo usuário; curadoria por intercalação de categoria (carne grelhada / prato executivo / entrada / ambiente institucional) entre e dentro das duas trilhas, evitando blocos repetitivos do mesmo tipo. Como o conteúdo scrollável dobrou, pode ser necessário ajustar a altura da seção para manter velocidade de scroll confortável — mecanismo técnico a critério do commerial. Sem subseções de cardápio impresso ou de vídeos: as duas subseções de galeria que as usavam ("Cardápio impresso oficial" e "Vídeos do ambiente") foram removidas do escopo em 2026-09-03. Nota (atualizada em 2026-09-04, rodada 5): `video02.mp4` e `video03.mp4` continuam sem uso ativo previsto; `video01.mp4` passou a ser usado na seção Sobre (ver "Componentes necessários", item "Seção Sobre").
- Seção Sobre (`#sobre`, "Sobre o Empório Parrilla"): grid de 2 colunas (`sobre-grid`, 3fr/2fr no desktop, empilhado no mobile), texto de um lado e mídia do outro. **Vídeo com fallback (decidido em 2026-09-04, rodada 5):** a mídia passa a ser `assets/video/video01.mp4`, com `assets/img/ambiente-salao-cheio.jpg` (imagem antes usada diretamente nessa seção) reaproveitada como fallback/poster — mesma técnica de `<video poster="...">` já usada no Hero. Requisito obrigatório: respeitar `prefers-reduced-motion` e manter acessibilidade equivalente à imagem anterior (ex. texto alternativo/`aria-label` descritivo). Técnica exata (atributos de autoplay/loop/mute, ajuste de CSS do grid) a critério do commerial.
- Seção de informações institucionais: endereço, horários (almoço/jantar), Instagram, estacionamento exclusivo.
- Rodapé com contato e observância das regras gerais do cardápio (idade mínima para álcool, ambiente livre de fumo, taxa de serviço de 10%).
- **Botão flutuante de WhatsApp (decidido em 2026-09-04, rodada 6):** elemento fixo (`position: fixed`), num canto da tela — sugestão do usuário: inferior direito, padrão comum de sites. Usa o mesmo link/texto de mensagem fixo já usado nos demais CTAs de WhatsApp do site (`https://wa.me/5535997493378?text=...`, mesma mensagem, não dinâmica). Visualmente deve seguir o token de destaque/CTA já definido (dourado, ver "Paleta de cores"), com ícone reconhecível de WhatsApp e texto acessível (ver "Acessibilidade"). Comportamento de exibição: oculto enquanto a seção Hero está visível; aparece depois que o usuário rola a página além do Hero (ver "Estados" e "Comportamento responsivo").

## Estados

- Toggle de tema: estado claro/escuro, com persistência (ex. `localStorage`) — decisão de implementação.
- Tabs de categoria de cardápio (desktop): estado ativo/inativo, com indicação visual clara e acessível.
- Dropdown/accordion de categoria (mobile) e accordion "Bar/Bebidas": estado aberto/fechado, com indicação visual clara e acessível.
- Campo de busca: estado vazio vs. com filtro aplicado (ex. destaque de resultados, mensagem de "nenhum resultado").
- Card de item de cardápio: estado "com imagem definitiva" (esperado para os 189 itens, ver "Componentes necessários", decisão de 2026-09-04 rodada 6) vs. estado "placeholder em breve" (exceção/fallback temporário, enquanto uma imagem definitiva não é escolhida para o item — não é mais o estado final esperado).
- CTA de WhatsApp (header/hero/seção de contato/menu): estado padrão e hover/focus com destaque de cor (dourado de destaque), sem estado de carregamento (link direto `wa.me`, sem requisição assíncrona).
- **Botão flutuante de WhatsApp (decidido em 2026-09-04, rodada 6):** estado "oculto" enquanto a seção Hero está visível vs. estado "visível" depois que o usuário rola além do Hero, além dos estados padrão/hover/focus já aplicados aos demais CTAs de WhatsApp. Transição de exibição (fade/slide) fica a critério do commerial, desde que não prejudique a legibilidade do conteúdo sob o botão.

## Acessibilidade

- Contraste mínimo AA entre texto e fundo em ambos os modos — a validar durante implementação, especialmente nas combinações com texto secundário derivado (não observado diretamente).
- Toggle de tema deve ser operável via teclado e anunciado por leitor de tela (ex. `aria-pressed` ou `role="switch"`).
- Accordion/tabs de cardápio devem seguir padrão de acessibilidade adequado (ex. `aria-expanded` no accordion, `role="tablist"`/`role="tab"`/`role="tabpanel"` em tabs), garantindo navegação por teclado.
- CTA de WhatsApp deve ter texto acessível (não depender apenas de ícone) — vale também para o botão flutuante (ex. `aria-label` descritivo do tipo "Falar no WhatsApp", já que o espaço visual reduzido do botão flutuante tende a depender só do ícone).
- **Botão flutuante de WhatsApp (decidido em 2026-09-04, rodada 6):** deve ter fallback funcional sem `IntersectionObserver` (ex. permanecer num estado padrão seguro — visível ou seguindo o mesmo comportamento de graceful degradation já usado em `setupSobreVideo`/`setupGalleryCarousel` em `js/main.js` — nunca ficar permanentemente inacessível por falha de detecção de scroll/JS). Não deve sobrepor conteúdo interativo (ex. rodapé, outros CTAs) de forma a bloquear navegação por teclado ou leitor de tela.
- **Animação de entrada do Hero (decidido em 2026-09-04, rodada 4):** deve respeitar `prefers-reduced-motion: reduce`, desativando a animação e exibindo o estado final diretamente; deve ter fallback funcional sem JS, com o CSS mostrando o estado final por padrão e o JS "rebobinando" para o estado inicial antes de animar.

## Comportamento responsivo

Sem framework CSS — grid/flexbox nativos. Coluna única em mobile; cardápio em grid de múltiplas colunas a partir de breakpoint desktop (ex. `min-width: 768px`). Comportamento específico de accordion/tabs em mobile vs. desktop fica a critério da implementação, desde que mantenha usabilidade em ambos.

**Revelação sob demanda da seção de cardápio (decidido em 2026-09-04, rodada 2):** em qualquer breakpoint, a seção de cardápio permanece oculta até o clique em "Menu"/"Cardápio" no header — não é mais uma seção sempre visível na rolagem contínua. Deve manter usabilidade e acessibilidade equivalentes em mobile e desktop, incluindo fallback de navegação por âncora sem JS (mecanismo exato a critério do commerial).

**Cabeçalho do cardápio centralizado (decidido em 2026-09-04, rodada 6):** título e busca centralizados em todos os breakpoints (ver "Componentes necessários"), não apenas no desktop.

**Botão flutuante de WhatsApp (decidido em 2026-09-04, rodada 6):** presente em todos os breakpoints, com posição/tamanho ajustados para não sobrepor conteúdo essencial em telas pequenas (ex. respeitar área segura/`safe-area-inset` em mobile, se aplicável). Regra de exibição (oculto no Hero, visível após rolar além dele) vale em qualquer breakpoint.

## Lacunas / decisões pendentes

Nenhuma lacuna de decisão pendente. Resumo do que foi resolvido pelo usuário/dono do projeto:

- **Borda/divisor no modo claro**: decidido `#3D2E26`; `#D8CBB0` descartado.
- **Tipografia**: decidido o trio `Abril Fatface` (display/marca), `Lora` (corpo), `Oswald` (títulos de seção), com fallback de sistema documentado — aproximação estilística assumida, não a fonte real da marca (isso permanece registrado, não é mais lacuna de decisão).
- **Acento `#D98C4A`**: decidido não usar como token oficial; mantido apenas como nota histórica.

Itens que continuam sendo **notas de metodologia**, não lacunas de decisão pendente (não bloqueiam o estado `ready`, mas devem ser observados na implementação):

- Não há hex oficial único de marca documentado pelo cliente para o destaque/CTA — os valores usados vêm de uma faixa observada (`#C9A662`–`#D4AF6A` no claro, análogo no escuro). Usar os valores já fixados nas tabelas acima.
- Texto secundário (ambos os modos) e borda/divisor do modo escuro (`#4A3B31`) são derivações/inferências, não observações diretas do material do cliente — validar contraste (ver "Acessibilidade") durante a implementação.
- Não há paleta de cores semânticas (erro, sucesso, aviso) no material do cliente — se a página precisar, definir em implementação de forma consistente com a paleta já fixada aqui.
- Contraste AA das combinações de texto secundário deve ser validado durante a implementação (checagem técnica, não decisão de identidade).
- **Curadoria de imagem por item do cardápio (nota de metodologia, 2026-09-04, rodada 6):** a escolha exata de qual imagem de banco vai em cada item, e quais itens compartilham a mesma imagem, é trabalho de curadoria do commerial durante a implementação — os critérios (coerência com o tipo de item, fonte recomendada, reaproveitamento permitido para itens semelhantes, preferência por banco livre sobre `assets/cardapio/` quando não houver correspondência clara) já estão fixados aqui e em `docs/briefing.md`. Não bloqueia o estado `ready`.
