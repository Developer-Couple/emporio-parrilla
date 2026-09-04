# Briefing — Empório Parrilla

Estado: `ready`

Última atualização: 2026-09-04 (rodada 6) — quatro novas decisões sobre a seção Cardápio: (1) botão flutuante de WhatsApp, oculto enquanto o Hero está visível e exibido após o usuário rolar além dele; (2) reversão da decisão de placeholder "Foto em breve" — os 189 itens do cardápio passam a usar imagens reais e apetitosas coerentes com o tipo de item (banco de imagens gratuito, com critério de reaproveitamento entre itens semelhantes); (3) reformulação de UX da seção Cardápio (hierarquia visual, sensação de "cardápio navegável"), sem alterar dados/estrutura (189 itens, tabs/accordion) e sem incluir carrinho/seleção/pedido via WhatsApp (registrado como backlog); (4) centralização do título "Cardápio" e do campo de busca no layout da seção. Ver "Decisões de implementação", "Materiais disponíveis e suas fontes" e "Backlog / melhorias futuras" abaixo. Atualização anterior (2026-09-04, rodada 5) — o usuário decidiu reaproveitar `assets/video/video01.mp4` (antes marcado como sem uso ativo previsto) na seção `#sobre` ("Sobre o Empório Parrilla"), substituindo a imagem `assets/img/ambiente-salao-cheio.jpg` no grid de 2 colunas dessa seção. A imagem passa a ser usada como fallback/poster do vídeo, na mesma técnica já usada no Hero (`<video poster="...">`). Ver "Materiais disponíveis e suas fontes" e "Decisões de implementação" abaixo. Atualização anterior (2026-09-04, rodada 4) — o usuário/dono do projeto pediu que a animação de entrada do Hero (logo, slogan, subtítulo, localização) replique o efeito usado em outro projeto seu (`stlvalley-hub`), baseado na biblioteca **GSAP**, carregada via CDN (script tag direto, sem bundler). Isso introduz uma dependência externa de JavaScript adicional ao projeto, documentada como exceção pontual — ver "Stack técnica" e "Decisões de implementação" abaixo. Atualização anterior (2026-09-04, rodada 3) — o usuário inseriu 10 novas fotos reais do estabelecimento em `assets/img/`; o carrossel duplo da seção Galeria passa de 10 para 20 fotos (10 por trilha). A renomeação dos 10 arquivos para os nomes definitivos listados abaixo é execução do commerial nesta mesma rodada de trabalho (os nomes já constam no inventário como nomes-alvo, não como nomes de origem). Curadoria das 20 fotos por intercalação de categoria (carne grelhada / prato executivo / entrada / ambiente institucional), evitando blocos repetitivos do mesmo tipo consecutivos numa trilha. Registrado também possível ajuste de altura da seção Galeria para compensar o dobro de conteúdo scrollável. Ver "Materiais disponíveis e suas fontes" e "Decisões de implementação" abaixo. Atualização anterior (2026-09-04, rodada 2) — registradas duas novas decisões do usuário/dono do projeto, anteriores à implementação: (1) a seção de cardápio deixa de ficar sempre visível na rolagem contínua e passa a ser revelada sob demanda, ao clicar em "Menu" no header; (2) o Hero passa a exibir a logo `assets/logo/logo-fundo-transparente.png` no lugar do texto do nome da marca, arquivo incorporado ao inventário de `assets/logo/`. Ver "Tipo de página", "Decisões de implementação" e "Materiais disponíveis e suas fontes" abaixo. Atualização anterior (2026-09-04, rodada 1): resolvida a pendência de rastreabilidade dos arquivos de hero (confirmação explícita do usuário) e registrada a decisão sobre fotos por item de cardápio (1 item com foto real, 188 com placeholder "em breve"). Atualização anterior (2026-09-03): incorporadas 4 decisões do usuário/dono do projeto (mídia de hero, remoção de "Cardápio impresso oficial" e "Vídeos do ambiente" na Galeria, correção da contagem de itens do cardápio).

## Objetivo da apresentação

Landing page real (cliente real) para o Empório Parrilla, com uma seção/página de cardápio acessível pelo header/navegação, exibindo o cardápio real do restaurante em cards com descrição e valor, seguindo o padrão visual do cardápio impresso oficial. Etapa atual: implementação + preview local para aprovação do usuário — publicação ainda não autorizada.

## Negócio e público

- Negócio: Empório Parrilla, restaurante/churrascaria em Lavras-MG. Instagram: `@emporioparrillalavras`.
- Conceito operacional do churrasco: self-service na parrilla (ver seção "Churrasco na Parrilla" abaixo), com serviço à la carte completo (entradas, massas, pratos executivos, carta de vinhos e drinks).
- Público-alvo (decidido pelo usuário/dono do projeto): perfil "all-around" — famílias, casais e público corporativo, sem foco em nicho único. Consistente com o perfil do cardápio (carta de vinhos, drinks autorais, pratos executivos, ambiente com estacionamento exclusivo).

## Tipo de página

Landing page institucional de página única (single page) com navegação por header, incluindo uma seção/página de cardápio dedicada e acessível a partir do header. O cardápio tem 189 itens em ~25 categorias (contagem real via `grep -c 'class="menu-item-price"' index.html`, corrigido em 2026-09-03; valor anterior "~150" estava desatualizado) — ver decisão de organização em "Decisões de implementação". **Atualização (2026-09-04, rodada 2):** a seção de cardápio não fica mais sempre visível na rolagem contínua da single page; passa a ser revelada sob demanda, ao clicar no item "Menu"/"Cardápio" do header — ver "Decisões de implementação" para o requisito de comportamento e o fallback de acessibilidade.

## Contato e dados institucionais (fato confirmado — fonte: prints do Instagram do próprio cliente, em `assets/`)

- Nome: Empório Parrilla
- Cidade: Lavras-MG
- Instagram: `@emporioparrillalavras`
- Endereço: Rua Comendador José Esteves, 272, Bairro dos Ipês, Lavras-MG
- Horário almoço: Segunda a Sexta 11h–14h | Sábado e Domingo 11h–15h
- Horário jantar: Segunda 18h–22h | Terça a Sábado 18h–23h | Domingo fechado
- Diferencial mencionado pelo cliente: estacionamento exclusivo
- WhatsApp confirmado pelo usuário (formato internacional): `+55 35 99749-3378`
- Link base para uso nos botões/CTA: `https://wa.me/5535997493378`

## CTA

Decidido: um único CTA geral de contato/reserva via WhatsApp, usando o link acima (`https://wa.me/5535997493378`). Não há CTA individual por item de cardápio — o cardápio (189 itens) é apenas para consulta/visualização. O CTA geral aparece no header/hero e na seção de contato; não há botão de "interesse" por prato.

## Produtos/serviços confirmados — Cardápio completo

Fonte: 13 páginas do cardápio impresso oficial do cliente, extraídas via Playwright do site virtual.cardapiosecia.com/emporio-parrilla/, lidas visualmente por outro agente. Tratado integralmente como **fato confirmado**. Todos os valores em R$.

### Entradas
Burrata de Búfala 57,00; Bolinho de Costela 35,00 (6un); Bolinho de Bacalhau 50,00 (10un); Queijo Coalho Grelhado com Mel 12,00 (unidade); Provoleta Grelhada 46,00 (+tomate seco +8,00); Choripán na Chapa 27,00; Chapa de Legumes 34,00; Pão de Alho 13,00; Pão de Alho Especial 22,00; Pastéis com Molho de Queijo 32,00 (6un); Queijo Brie Empanado 58,00.

### Batatas
Batata Frita 24,00; Batata Frita com Parmesão 27,00; Batata Rústica 26,00; Batata Confit 24,00.

### Churrasco na Parrilla
Conceito self-service: o cliente escolhe o corte no freezer (etiquetado com peso e valor), podendo levar para casa pelo valor da etiqueta ou pedir para grelhar na hora (acréscimo de +45% sobre o valor da etiqueta). Não há lista fixa de preços por corte — o preço é variável por peça/peso.

### Massas
Ravioli de Ricota com Damasco 47,00; Capeletti de Queijo 47,00; Nhoque de Batata 47,00; Fetuccine 29,00; Fetuccine com Rúcula e Tomate Seco 33,00; Fetuccine ao Molho de Camarão 65,00.
Molhos à escolha: Pomodoro, Bechamel com Queijo, Pesto Cremoso, Gorgonzola.

### Arrozes (porção para 2 pessoas)
Arroz Branco 19,00; Arroz com Alho 25,00; Arroz Parrilla 30,00; Arroz de Camarão 65,00; Arroz à Piamontese 32,00; Arroz do Chef 32,00; Arroz Caprese 32,00; Arroz com Tomate Seco e Rúcula 32,00.

### Saladas
Salada Blue Cheese 36,00; Salada Tropical 33,00.

### Complementos
Farofa da Casa 7,00; Vinagrete de Abacaxi 7,00; Queijo Gruyère Derretido na Racleteira 29,00.

### Molhos Extras
Molho Defumado Especial 7,00; Molho Chimichurri 8,00; Geleia de Abacaxi com Pimenta 8,00; Creme de Queijo 22,00.

### Sobremesas
Petit Gâteau 26,90; Brownie com Sorvete 25,00; Medalhão de Romeu e Julieta com Sorvete 27,00; Pudim 17,00; Cheese Cake 27,00.

### Executivos (segunda a sábado, horário de almoço)
Parrilla 37,00; Parrilla Barbecue 29,50; Parmegiana de Frango 37,00; Parmegiana Bovina 48,00; Arroz de Camarão 55,00; Fetuccine 38,00; Fetuccine com Rúcula e Tomate Seco 42,00; Fetuccine de Camarão 55,00; Filé de Tilápia Grelhado 44,00; Salmão Grelhado ao Molho de Maracujá 49,00; Vegano 38,00; Kids 21,00.

### Monte Seu Prato
Montagem em 4 etapas: proteína + complemento + acompanhamento + salada, escolhendo 1 de cada complemento/acompanhamento/salada, sem custo adicional pela escolha.

Proteínas: Ancho Grelhado 40,00; Picanha Grelhada 54,00; Filé de Tilápia Grelhado 45,00; Copa Lombo ao Barbecue 36,00; Salmão Grelhado 54,00; Filé de Sobrecoxa de Frango 36,00; Filé de Frango Empanado 36,00; Shimeji no Shoyo 38,00.

### Steak Salada (acompanha salada da casa)
Ancho Grelhado 34,00; Picanha Grelhada 48,00; Filé de Tilápia 35,00; Copa Lombo ao Barbecue 27,00; Salmão Grelhado 44,00; Filé de Frango à Parmegiana 30,00; Filé de Sobrecoxa de Frango 28,00; Filé de Frango Empanado 26,00.

### Proteínas Avulsas
Ancho Grelhado 24,00; Picanha Grelhada 38,00; Filé de Tilápia 25,00; Copa Lombo ao Barbecue 19,00; Salmão Grelhado 35,00; Filé de Frango à Parmegiana 24,00; Filé de Sobrecoxa de Frango 19,00; Filé de Frango Empanado 16,00.

### Adicionais / Guarnições
Arroz 17,00; Arroz ao Alho 17,00; Arroz à Piamontese 18,00; Arroz Parrilla 18,00; Arroz de Cogumelos 18,00; Arroz Caprese 18,00; Arroz Cremoso de Brócolis 18,00; Fetuccine Rúcula e Tomate Seco 30,00; Fetuccine ao Molho Branco 27,00; Feijão 3,00; Batata Frita 12,00; Batata Rústica 13,00; Legumes Confit 10,00; Maionese de Batata 11,00; Vinagrete de Abacaxi 7,00; Salada 15,00; Farofa da Casa 7,00.

### Bebidas
Água Mineral 5,00; Água com Gás 5,50; Água Mamba Water com Gás 6,00; Água Tônica 8,00; H2OH! 9,00; Refrigerante Lata 6,50; Soda Limonada 6,50; Energético Red Bull 16,00.

### Sucos Naturais
Maracujá 12,00; Morango 12,00; Abacaxi 11,00; Limão 10,00; Laranja 11,00; Misto 15,00; Uva 10,00.

### Cervejas Clássicas
Garrafa 600ml: Heineken 19,00, Original 16,00.
Long neck: Blue Moon 20,00, Heineken 13,00, Heineken 0.0% 13,00, Corona 12,00, Corona Cero 12,00, Stella Artois Pure Gold 13,00, Laut de Leve 11,00.
Chopps: Heineken 11,00, Laut 10,00, Chope de Vinho 17,00.

### Cervejas Artesanais
Joia Mesquita 600ml: Amber Lager 32,00, Premium Lager 32,00, Trigo 32,00, Trigo Escura 33,00, APA 33,00, Session IPA 33,00, IPA 35,00, Red Ale 32,00.
Baden Baden 600ml: Crystal 30,00, Witbier 30,00, Golden 30,00.
Laut 600ml: Laut de Leve 19,00, Laut Session IPA 24,00.

### Caipis
Caipirinha 18,00; Caipiroska Smirnoff 23,00; Caipiroska Absolut 28,00.

### Drinks
Garibaldi 24,00; Mojito Cubano 24,00; Lagoa Azul 26,00; Piña Colada 25,00; Amarula Passion 29,00; Mimosa 29,00; Prosecco Spritz 29,00; Gin Tônica 33,00; Gin Parrilla 30,00; Kir Royal 30,00; Negroni 34,00; Penicilin 33,00.

### Doses
Campari 16,00; Amarula 20,00; Vodka Absolut 18,00; Rum Bacardi 10,00; Whisky J.W. Red Label 18,00; Whisky Chivas Regal 25,00; Cachaça 6,00.

### Drinks Sem Álcool
Soda Italiana 20,00; Mocktail Morango 25,00; Parrillinha Kids 26,00.

### Vinhos Tintos (taxa de rolha 60,00)
Gato Negro Cabernet Sauvignon 90,00; Gato Negro Carmenere 90,00; Concha y Toro Cabernet Sauvignon 85,00; Concha y Toro Carmenere 85,00; Pata Negra Tempranillo 99,00; Periquita 123,00; Casal Garcia 112,00; Altos del Condor Malbec 75,00; Pueblo del Sol Pinot Noir 78,00; Blason del Valle Bonarda 85,00; Citadel Tempranillo 78,00; Paine Merlot 78,00; Capitán Tomás Malbec Tannat 94,00; V9 Reservado 85,00; Épica 23 92,00; Pueblo del Sol Cabernet Sauvignon 78,00; Taça de Vinho Tinto 26,90.

### Vinhos Brancos
Gato Negro Chardonnay 90,00; Casal Garcia Verde 112,00; Ouro do Monte 89,00.

### Vinhos Rosés
Ballade Cabernet Sauvignon 75,00; Partridge Flying Malbec 85,00; Casal Garcia 112,00; Bodegazza 86,00.

### Espumantes / Frisantes
Lambrusco Rosso 83,00; Espumante Salton Classic 84,00; Espumante Dancing Flame Moscatel 109,00; Espumante de Vergy Blanc 109,00.

### Regras gerais do cardápio (fato confirmado)

- Bebida alcoólica servida somente para maiores de 18 anos.
- Ambiente livre de fumo.
- Taxa de serviço de 10%.
- Pode haver couvert artístico quando houver música ao vivo.
- Aviso do cliente sobre alergias/intolerâncias alimentares.
- Mensagem de boas-vindas do cardápio menciona que os pratos levam de 20 a 50 minutos de preparo.

## Materiais disponíveis e suas fontes

Inventário final de assets (organizado; estado atual real do projeto, atualizado em 2026-09-03):

- Logos em `assets/logo/`: `logo-primaria.jpeg`, `logo-secundaria.jpeg` (material do cliente); `logo-fundo-transparente.png` (monograma dourado "EP" com moldura em losango, fundo transparente — arquivo já existe em disco, confirmado pelo Jarvis em 2026-09-04, incorporado ao inventário nesta atualização; ver decisão de uso no Hero em "Decisões de implementação").
- `assets/img/` — 34 arquivos, em três grupos:
  - 20 fotos reais do estabelecimento, distribuídas em carrossel duplo (10 por trilha) na seção Galeria (ver "Decisões de implementação" para o critério de curadoria/intercalação):
    - Grupo original (10): `acougue-carnes-nobres-vitrine.jpg`, `ambiente-salao-cheio.jpg`, `bebida-suco-laranja-detalhe.jpg`, `carne-na-chapa-parrilla.jpg`, `mesa-farta-peixe-legumes-grelhados.jpg`, `momento-familia-cliente.jpg`, `prato-carne-arroz-fritas.jpg`, `prato-carne-chope-laut.jpg`, `prato-file-empanado-massa-legumes.jpg`, `sobremesa-caramelizada-ambiente.jpg`.
    - Grupo novo, inserido pelo usuário nesta rodada (10), nomes definitivos após renomeação pelo commerial (2026-09-04, rodada 3): `picanha-fatiada-chapa-fumegante.jpg`, `prato-carne-tomate-mandioca-grelhados.jpg`, `carne-grelhada-brasa-vermelha.jpg`, `carne-fatiada-pao-alho-acompanhamento.jpg`, `prato-carne-farofa-vinagrete-taca-vinho.jpg`, `prato-carne-fritas-pure-berinjela.jpg`, `entrada-queijo-pesto-tomate-cereja.jpg`, `prato-executivo-arroz-fritas-salao.jpg`, `cardapios-fisicos-empilhados-mesa.jpg`, `prato-carne-arroz-fritas-ambiente-externo.jpg`.
  - 13 imagens das páginas do cardápio impresso oficial: `cardapio-capa.jpg`, `cardapio-boas-vindas.jpg`, `cardapio-pagina-01.jpg` a `cardapio-pagina-10.jpg`, `cardapio-contracapa.jpg`. Servem de referência visual do padrão gráfico oficial do cardápio impresso. Todo o conteúdo textual delas já está transcrito na seção de cardápio acima. **Não usar mais como subseção dedicada na Galeria** (ver "Decisões de implementação" — subseção "Cardápio impresso oficial" removida do escopo em 2026-09-03); permanecem disponíveis apenas como referência de estilo, se o commerial julgar útil.
  - `hero.jpeg` (1 arquivo): imagem de fallback/poster confirmada pelo usuário para a seção Hero (ver "Decisões de implementação" abaixo). Antes órfã (não catalogada), incorporada ao inventário em 2026-09-03.
- Vídeos em `assets/video/` — 4 arquivos:
  - `video01.mp4`: **usado na seção Sobre** (decidido em 2026-09-04, rodada 5) — vídeo principal do grid de 2 colunas da seção `#sobre` ("Sobre o Empório Parrilla"), com fallback/poster `assets/img/ambiente-salao-cheio.jpg` (a mesma imagem que já estava nessa seção). Nota histórica: seu conteúdo não foi identificado individualmente e ele não é mais usado na seção "Vídeos do ambiente" da Galeria, removida do escopo em 2026-09-03 (ver "Decisões de implementação") — esse era o status anterior de "sem uso ativo previsto", agora substituído pelo uso confirmado na seção Sobre.
  - `video02.mp4`, `video03.mp4`: conteúdo de cada vídeo não identificado individualmente. **Não usar mais** — a seção "Vídeos do ambiente" da Galeria que os exibia foi removida do escopo em 2026-09-03 (ver "Decisões de implementação"). Permanecem no projeto sem uso ativo previsto nesta rodada.
  - `hero.mp4` (1 arquivo): vídeo principal confirmado pelo usuário para a seção Hero (ver "Decisões de implementação" abaixo). Antes órfão (não catalogado), incorporado ao inventário em 2026-09-03.
- Removidos do projeto (resolvido): os 3 SVGs placeholder de teste da rodada anterior com cliente fictício (`parrilla-angus.svg`, `combo-familia.svg`, `choripan-artesanal.svg`) e os 3 prints de Instagram usados como fonte de horário/endereço (já transcritos em texto na seção de contato acima e não são mais necessários como arquivo).
- `assets/cardapio/` (pasta nova, ainda não versionada/`untracked`, incorporada ao inventário em 2026-09-04, rodada 6): material bruto trazido pelo usuário para a decisão de imagens por item (ver "Decisões de implementação", item "Imagens reais por item do cardápio"). Contém 3 imagens nomeadas (`cerveja.png`, `steak-salada.png`, `carne-salada.png`) e 17 capturas de tela genéricas (`Captura de Tela 2026-09-04 às HH.MM.SS.png`) do cardápio digital de referência do concorrente/plataforma (`virtual.cardapiosecia.com/emporio-parrilla`), que não pôde ser inspecionado tecnicamente nesta rodada. **Não há correspondência verificada e confiável entre esses 20 arquivos e itens específicos do cardápio** — os 3 nomeados sugerem categoria (cerveja, steak salada) mas não identificam o item exato dentro da categoria (ex. qual cerveja, qual proteína do Steak Salada), e as 17 capturas de tela não foram catalogadas individualmente. Uso: **opcional, a critério de quem for implementar** (commerial); preferir banco de imagens livre (ver decisão abaixo) sempre que não houver correspondência clara e verificável entre arquivo e item nomeado.

**Nota de rastreabilidade (2026-09-03, pendência resolvida em 2026-09-04):** a instrução original desta rodada de decisões referia-se aos arquivos de hero pelos nomes `assets/video/SaveClip.App_AQOcX7JAFqgQxVO0QgZjZLqtNs-Fmei1mKbotP6fVApZ1YjLNK-pLPfu0RD0Yl84zizO6MrW6l7MqEjesRmvnPQfhvXPomlkcA4DJbQ.mp4` e `assets/img/SaveClip.App_504194171_1982934982244093_7436632229144047400_n.jpg`. Esses nomes não existem no projeto; os arquivos efetivamente presentes em disco no momento da atualização de 2026-09-03 eram `assets/video/hero.mp4` e `assets/img/hero.jpeg` (timestamps de poucos minutos antes daquela atualização), indicando renomeação prévia. Este documento registra os nomes reais em disco, mantidos aqui como histórico de rastreabilidade. **Confirmação do usuário/dono do projeto (2026-09-04):** `hero.mp4` é de fato o vídeo principal do Hero e `hero.jpeg` é de fato a imagem de fallback/poster — confirmação explícita, não mais pendência.

## Referências visuais

Ver `docs/design-system.md` para paleta, tipografia e elementos gráficos derivados das logos e do cardápio oficial do cliente.

## Escopo

- Landing page institucional, HTML/CSS/JS puros (sem framework, sem bundler, sem backend).
- Navegação via header, incluindo item "Cardápio" com acesso à seção dedicada.
- Cardápio completo (ver seção acima), com layout decidido (ver "Decisões de implementação" abaixo): tabs por categoria, cards de item, busca, accordion "Bar/Bebidas" separado.
- Modo claro e modo escuro (toggle no header, aplicável a toda a página).
- Um único CTA geral de contato/reserva via WhatsApp com o número confirmado (sem CTA por item de cardápio).
- Informações institucionais: endereço, horários, Instagram.
- Aviso "Proposta de site demonstrativo" visível (banner + rodapé), mantido mesmo com dados reais do cliente.

## Critérios de aceite

- Todas as informações institucionais (endereço, horários, Instagram, WhatsApp) batem com a seção "Contato e dados institucionais" deste briefing.
- Cardápio exibe todos os itens/preços listados na seção "Produtos/serviços confirmados", organizados por categoria conforme o layout decidido (tabs/accordion, cards, busca, accordion "Bar/Bebidas").
- Único CTA geral de WhatsApp funcional (`https://wa.me/5535997493378`), sem CTA por item.
- Modo claro e modo escuro funcionam em toda a página, com toggle acessível no header.
- Aviso "Proposta de site demonstrativo" visível em banner e rodapé.
- Nenhum carrinho, checkout, pedido online ou backend implementado.
- HTML/CSS/JS puros, sem framework/bundler.
- Preview local revisado e aprovado pelo usuário antes de qualquer publicação.
- Botão flutuante de WhatsApp presente, usando o mesmo link/número/texto já usado nos demais CTAs do site, oculto enquanto o Hero está visível e exibido após a rolagem além do Hero.
- Todos os 189 itens do cardápio exibem imagem coerente com seu tipo/categoria (sem placeholder "Foto em breve" como estado final), respeitando o critério de reaproveitamento de imagem entre itens semelhantes quando aplicável.
- Título "Cardápio" e campo de busca centralizados no layout da seção, em todos os breakpoints.

## Fora de escopo (explícito)

- Carrinho de compras.
- Checkout ou qualquer forma de pagamento online.
- Sistema de pedido online/delivery.
- Backend de qualquer tipo.
- Framework (React, Vue, etc.) ou bundler (Webpack, Vite, etc.).

## Backlog / melhorias futuras (fora de escopo nesta rodada, registrado para não se perder)

- **Interesse/seleção de item de cardápio com envio via WhatsApp** (mencionado pelo usuário em 2026-09-04, rodada 6, ao pedir a reformulação de UX do Cardápio): possibilidade futura de o usuário sinalizar interesse por item(ns) específico(s) e gerar uma mensagem de WhatsApp com esse contexto — sem carrinho, sem checkout, sem pedido online formal. Não implementar nesta rodada; a seção "Fora de escopo" acima e o CTA único geral (ver "CTA") continuam valendo como estão até nova decisão explícita do usuário/dono do projeto.

## Stack técnica

HTML, CSS e JavaScript puros. Sem framework de UI, sem bundler, sem backend. Compatível com execução local via arquivo estático ou servidor simples para preview.

**Ressalva (decidida em 2026-09-04, rodada 4):** o projeto passa a ter uma dependência externa de JavaScript adicional — **GSAP** (`gsap`), carregada via CDN (ex. `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js`), usada exclusivamente na animação de entrada do Hero (ver "Decisões de implementação"). Não requer bundler nem build step — é incluída via `<script>` direto, na mesma lógica já usada para justificar a dependência de Google Fonts (ver `docs/design-system.md`). Isso é uma exceção pontual e documentada, não uma mudança geral de filosofia do projeto: continua sem framework de UI (React, Vue, etc.) e sem bundler.

## Decisões de implementação (confirmadas pelo usuário/dono do projeto)

- **Layout da seção de cardápio** (acessível via item "Cardápio" no header/nav):
  - Navegação por categoria em tabs horizontais no desktop, colapsando para dropdown/accordion vertical em mobile — cerca de 25 categorias.
  - Dentro de cada categoria: grid de cards (2 colunas desktop, 1 coluna mobile), cada card com nome do prato, descrição (quando houver) e preço.
  - Campo de busca simples no topo da seção (filtro em JS puro), dado o volume de 189 itens.
  - Categorias de bebida (cervejas, vinhos, drinks, doses, sucos, água) agrupadas num accordion secundário "Bar/Bebidas", separado visualmente da comida.
  - Nenhum CTA por item — apenas os CTAs gerais de contato/reserva já previstos (header/seção de contato).
  - Tudo implementado em JS puro, sem dependências externas.
- Toggle de modo claro/escuro no header, aplicável a toda a página. Mecanismo de persistência (ex. `prefers-color-scheme` + toggle manual em `localStorage`) fica a critério da implementação, respeitando a exigência de ambos os modos.
- **Fotos por item do cardápio (decidido em 2026-09-04):** o usuário/dono do projeto delegou a análise de correspondência foto↔item ao Jarvis, que aplicou critério conservador de correspondência de conteúdo (evitar atribuir uma foto a um item quando a composição exata do prato retratado não bate com certeza suficiente contra o item nomeado, por risco de misrepresentação de produto real de comida). Resultado, aprovado pelo usuário:
  - Das 8 fotos genéricas de comida/ambiente catalogadas em `assets/img/` (ver "Materiais disponíveis e suas fontes"), apenas `bebida-suco-laranja-detalhe.jpg` tem correspondência confiável o suficiente para ser atribuída a um item específico: categoria "Sucos Naturais", item "Laranja" (R$ 11,00).
  - As outras 7 fotos (`prato-carne-arroz-fritas.jpg`, `prato-carne-chope-laut.jpg`, `prato-file-empanado-massa-legumes.jpg`, `carne-na-chapa-parrilla.jpg`, `mesa-farta-peixe-legumes-grelhados.jpg`, `sobremesa-caramelizada-ambiente.jpg`, `acougue-carnes-nobres-vitrine.jpg`) **não** devem ser atribuídas a nenhum item específico do cardápio — continuam com o uso já existente (seção de Galeria), sem vínculo com item de cardápio.
  - Para os demais 188 itens do cardápio (todos exceto "Laranja"), o card do item exibia um placeholder de texto "em breve" no lugar de imagem. **Esta decisão foi revertida em 2026-09-04, rodada 6 — ver decisão "Imagens reais por item do cardápio" abaixo.** Mantido aqui apenas como histórico.
- **Imagens reais por item do cardápio (decidido em 2026-09-04, rodada 6) — substitui a decisão de placeholder acima:** o usuário/dono do projeto decidiu que os 189 itens do cardápio devem ganhar imagens reais e apetitosas, coerentes com o tipo/categoria de cada item (ex.: item de drink recebe foto de drink, item de carne recebe foto de carne grelhada), abandonando o placeholder "Foto em breve" como estado final da seção. Critérios registrados:
  - **Fonte recomendada:** bancos de imagens gratuitos de uso comercial (ex. Unsplash, Pexels ou equivalente). Não são fotos profissionais do prato real do restaurante — são imagens de banco, escolhidas por coerência visual com o tipo de item, mantendo o espírito de "foto real e apetitosa" pedido pelo usuário.
  - **Evitar Pinterest** como fonte direta de extração de imagem, por risco de direitos autorais de terceiros não claros.
  - **Reaproveitamento de imagem permitido, mas registrado como critério explícito, não decidido silenciosamente na implementação:** não é obrigatório ter uma imagem única por item quando fizer sentido reaproveitar a mesma imagem para itens muito semelhantes da mesma categoria (ex.: variações de caipirinha podem compartilhar uma foto genérica de drink). A curadoria exata (que itens compartilham imagem, quais têm imagem única) fica a critério do commerial na implementação, respeitando este critério.
  - **Material bruto do usuário em `assets/cardapio/`:** ver "Materiais disponíveis e suas fontes" — uso opcional, sem correspondência verificada item-a-item; preferir banco de imagens livre quando não houver correspondência clara.
  - Este requisito de conteúdo atualiza o componente "Card de item de cardápio" em `docs/design-system.md` (slot de imagem deixa de alternar entre "foto real" e "placeholder textual" como estado final — todo item deve ter imagem).
- **Navegação do cardápio sob demanda (decidido em 2026-09-04, rodada 2)** — atualiza a decisão de layout acima: a seção de cardápio deixa de ficar sempre visível durante a rolagem contínua da single page e passa a ser exibida somente quando o usuário clicar na opção "Menu" (ou item de navegação equivalente) no header. Requisito de comportamento: cardápio oculto por padrão, revelado ao clique. O mecanismo técnico exato (ex. revelar/expandir via JS, com fallback de acessibilidade garantindo que o link continue funcionando como âncora de navegação para quem não tem JS habilitado) fica a critério do commerial na implementação.
- **Logo no Hero substitui texto (decidido em 2026-09-04, rodada 2):** o `<h1>` textual do Hero ("Empório Parrilla") é substituído pela logo `assets/logo/logo-fundo-transparente.png` (ver inventário em "Materiais disponíveis e suas fontes"). A implementação deve preservar a acessibilidade/semântica do nome da marca (ex. `alt` descritivo com o nome "Empório Parrilla", ou técnica equivalente que mantenha o nome disponível para leitores de tela e SEO); a técnica exata fica a critério do commerial, mas esse requisito é obrigatório.
- **Animação de entrada do Hero via GSAP (decidido em 2026-09-04, rodada 4):** o usuário pediu que a animação de entrada do Hero (logo, slogan, subtítulo, localização) replique o efeito de outro projeto seu (`stlvalley-hub`), implementado com a biblioteca GSAP, carregada via CDN. Efeito, disparado uma única vez ao carregar a página (não vinculado a scroll): a logo do hero começa maior/deslocada e anima até o tamanho normal (~1,3s); o fundo escurecido sobre o vídeo clareia progressivamente revelando o vídeo; em seguida a seção hero recolhe de altura de tela cheia para uma altura menor; o texto (nome/slogan/localização, conforme o que existir no hero atual) entra em cascata (fade-in + slide-up), um elemento após o outro com atraso; o indicador de "role para explorar" aparece por último, com animação contínua de bounce em CSS. Requisitos de acessibilidade, obrigatórios: (1) respeitar `prefers-reduced-motion: reduce`, desativando a animação e mostrando o estado final direto; (2) funcionar de forma degradada sem JS — o CSS já mostra o estado final por padrão, e o JS "rebobina" para o estado inicial antes de animar. A técnica exata de implementação (seletores, timeline do GSAP, easing) fica a critério do commerial, respeitando esse comportamento. **Complemento sobre altura da seção durante a entrada (decidido em 2026-09-04, mesma rodada):** o hero começa e permanece em 100vh durante toda a animação de entrada (zoom da logo, clareamento do overlay e cascata de fade-in do texto) — a altura cheia não é reduzida antes da timeline terminar. Somente depois que a timeline de entrada completa (incluindo a cascata de texto), a seção anima sua altura de 100vh para um valor menor (ex. 80vh), em transição suave, revelando o início da seção seguinte. Esse recolhimento de altura faz parte da mesma timeline/experiência de entrada do Hero (mesmo efeito de referência do `stlvalley-hub` — "hero em tela cheia que recolhe" após o impacto inicial), não é uma decisão separada. A técnica exata (ex. GSAP animando `height`/`min-height`, ou classe CSS com `transition`) fica a critério do commerial.
- **Vídeo na seção Sobre com fallback (decidido em 2026-09-04, rodada 5):** a seção `#sobre` ("Sobre o Empório Parrilla"), estruturada em grid de 2 colunas (`sobre-grid`, 3fr/2fr no desktop, empilhado no mobile) com texto de um lado e mídia do outro, passa a exibir `assets/video/video01.mp4` no lugar da imagem estática `assets/img/ambiente-salao-cheio.jpg` que ocupava esse espaço (`<img class="sobre-imagem">`). A imagem `ambiente-salao-cheio.jpg` é reaproveitada como fallback/poster do vídeo, na mesma técnica já usada na seção Hero (`<video poster="...">`). Requisitos obrigatórios: respeitar `prefers-reduced-motion` (ex. pausar autoplay ou exibir o poster estático quando o usuário preferir menos movimento) e manter acessibilidade equivalente à mídia anterior (ex. `aria-label`/texto alternativo descrevendo o conteúdo, autoplay mudo sem áudio inesperado). A técnica exata de implementação (atributos do elemento `<video>`, comportamento de loop/autoplay, ajuste de CSS do grid) fica a critério do commerial, respeitando esse requisito de conteúdo e acessibilidade.
- **Botão flutuante de WhatsApp (decidido em 2026-09-04, rodada 6):** adição de um botão flutuante fixo, posicionado num canto da tela (sugestão do usuário: inferior direito, padrão comum de sites), usando exatamente o mesmo link/número/texto de mensagem já usado nos 4 CTAs de WhatsApp existentes no site (`https://wa.me/5535997493378?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Emp%C3%B3rio%20Parrilla%20e%20fazer%20uma%20reserva.`) — mensagem fixa, não dinâmica por seção/produto. Regra de exibição: o botão fica **oculto enquanto a seção Hero está visível** e passa a **aparecer depois que o usuário rolar a página para além do Hero**. Mecanismo técnico sugerido (ex. `IntersectionObserver` observando a seção `#hero`, no mesmo padrão de graceful degradation já usado em `setupSobreVideo`/`setupGalleryCarousel` em `js/main.js` — sem suporte a `IntersectionObserver`, o botão deve assumir um estado padrão seguro, não ficar preso invisível) fica a critério do commerial; o requisito de comportamento (oculto no Hero, visível depois) é obrigatório. Não substitui os CTAs existentes — é um CTA adicional, sempre acessível durante a navegação fora do Hero.
- **Reformulação de UX da seção Cardápio (decidido em 2026-09-04, rodada 6):** o usuário quer que a seção "tenha pegada de cardápio" e seja fácil e agradável de navegar. Isso é uma direção de UX/hierarquia visual — melhorar apresentação, uso de imagens (ver decisão acima) e centralização do cabeçalho (ver decisão abaixo) para que a seção pareça mais um cardápio de restaurante navegável do que uma lista de preços simples. **Não é uma reformulação estrutural de dados**: os 189 itens, ~25 categorias e o mecanismo de tabs (desktop) / accordion (mobile) continuam existindo como estão. Não inclui carrinho, seleção de itens ou pedido via WhatsApp por item — ver "Backlog / melhorias futuras" abaixo; a seção "Fora de escopo" desta rodada permanece como já registrada, sem alteração.
- **Centralização do cabeçalho do cardápio (decidido em 2026-09-04, rodada 6):** o título "Cardápio" (`#cardapioTitle`) e o campo de busca (`#menuSearch`, dentro de `.menu-search`) passam a ficar centralizados no layout da seção. Estado anterior (verificado em `css/styles.css`): `h2` não tem `text-align` próprio (segue o alinhamento padrão à esquerda do fluxo do documento) e `.menu-search` é um container flex com `max-width: 40rem` sem margem automática — ou seja, título e busca hoje ficam alinhados à esquerda dentro do `.container` da seção `#cardapio`, não centralizados. A técnica exata (ex. `text-align: center` no título, `margin: 0 auto` + `justify-content: center` no container de busca) fica a critério do commerial, respeitando o requisito de centralização em todos os breakpoints.
- **Carrossel duplo da Galeria com 20 fotos (decidido em 2026-09-04, rodada 3):** o usuário inseriu 10 novas fotos reais em `assets/img/`, elevando o total usado na Galeria de 10 para 20, distribuídas em duas trilhas de carrossel (10 fotos por trilha). Critério de curadoria: intercalação por categoria de conteúdo (carne grelhada / prato executivo / entrada / ambiente institucional) entre as duas trilhas e dentro de cada trilha, evitando sequências repetitivas do mesmo tipo de foto. A composição exata de qual foto vai em qual trilha e em qual posição fica a critério do commerial, respeitando o critério de intercalação. **Possível ajuste de altura da seção:** como o volume de conteúdo scrollável da Galeria dobra, pode ser necessário ajustar a altura da seção para manter uma velocidade de scroll confortável ao usuário; o mecanismo técnico (ex. duração de animação, altura de container, velocidade por trilha) fica a critério do commerial, desde que a experiência de rolagem permaneça confortável nos dois modos (claro/escuro) e breakpoints.

## Fatos fornecidos (pelo cliente/usuário, ainda não verificados por fonte independente da própria marca)

- Nome, cidade, Instagram, endereço, horários, diferencial de estacionamento exclusivo: fonte são prints do próprio Instagram do cliente.
- Cardápio completo com itens e preços: fonte é o cardápio impresso oficial do cliente (extraído via site virtual.cardapiosecia.com/emporio-parrilla/).
- WhatsApp: confirmado diretamente pelo usuário do fluxo (não pelo cliente final, mas assumido como correto por instrução explícita).

## Fatos verificados

Não há verificação por terceiros independente da própria marca (ex. checagem cruzada em outro canal oficial diferente do Instagram/cardápio digital do próprio cliente). Os dados acima são tratados como confirmados por serem oriundos de material do próprio cliente, mas não houve dupla checagem externa.

## Hipóteses assumidas

Nenhuma hipótese não confirmada restante. O público-alvo e o modelo de CTA, antes tratados como inferência/hipótese, foram confirmados pelo usuário/dono do projeto (ver "Negócio e público" e "CTA" acima).

## Lacunas (decisão humana pendente)

Nenhuma lacuna de decisão pendente neste momento. Todas as pendências anteriores foram resolvidas pelo usuário/dono do projeto:

- Aviso "Proposta de site demonstrativo": mantido (banner + rodapé), mesmo com dados reais do cliente.
- CTA por item de cardápio: descartado — apenas um CTA geral de contato/reserva via WhatsApp.
- Público-alvo: confirmado como "all-around" (famílias, casais, público corporativo).
- Limpeza de assets antigos (SVGs de teste e prints de Instagram): executada — arquivos removidos.
- Uso das 13 imagens do cardápio impresso: incorporadas a `assets/img/`; a forma exata de uso na seção de cardápio (referência de estilo vs. exibição direta) é decisão de implementação, não bloqueia aprovação.
- Paleta de cores e tipografia: ver `docs/design-system.md`, também em estado `ready`.

## Etapa atual

Implementação (HTML/CSS/JS puro) + preview local para aprovação do usuário. Não há autorização de publicação nesta rodada. GitHub Pages em repositório público sob a conta `development-coulpe`, sem `noindex` obrigatório, é a convenção deste fluxo para uma etapa futura, condicionada a aprovação explícita do usuário — não é o próximo passo automático.

## Partes liberadas para publicação (quando/se aprovada)

- Nome, endereço, horários de funcionamento, Instagram, WhatsApp, cardápio completo com preços, logos e fotos organizadas em `assets/` são dados destinados a uso público na própria página, uma vez que vêm de material que o próprio cliente já publica (Instagram, cardápio digital) ou fornece para este fim.
- Vídeos em `assets/video/` podem ser usados de forma genérica (galeria/ambiente), sem atribuir conteúdo/legenda não verificado.
- Este documento de briefing e o `docs/design-system.md` são notas internas de processo e não devem ser publicados como conteúdo do site.
- A inferência de público-alvo (item de "Hipóteses assumidas") é nota interna de raciocínio, não deve virar texto de marketing publicado sem validação do cliente.
