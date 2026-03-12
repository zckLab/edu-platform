🛠️ Prompt: Integração de Background 3D Otimizado (Hero Section)
Objetivo: Substituir o fundo estático do topo do site pelo componente Spline, garantindo que a página carregue instantaneamente mesmo em conexões 4G limitadas.

1. Injeção Técnica e Posicionamento:

"Insira o código abaixo como a primeira camada (background) da seção principal do website:

HTML
<div class="hero-spline-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; overflow: hidden;">
  <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js"></script>
  <spline-viewer url="https://prod.spline.design/MGQudzz4R8QG6eSw/scene.splinecode" loading="lazy" preload="none"></spline-viewer>
</div>
"Garanta que o conteúdo de marketing (títulos e botões) fique sobreposto ao Spline com um z-index superior".

2. Otimização para Conexões 4G e Mobile:

"Utilize o atributo loading="lazy" para que o navegador priorize o carregamento dos textos e links antes do cenário 3D."

"Adicione um background-color sólido ou um gradiente escuro ao container enquanto o Spline carrega, para que o usuário não veja um espaço vazio em conexões lentas."

"Desabilite todas as interações de mouse no Spline (pointer-events: none) para evitar consumo desnecessário de processamento enquanto o usuário tenta clicar nos botões de marketing."

3. Performance de Renderização:

"Configure o componente para rodar em 'Low Power Mode' ou reduza a taxa de atualização (FPS) se o dispositivo for detectado como móvel, economizando bateria e dados do usuário."

"Aplique um leve desfoque (filter: blur(4px)) via CSS no container do Spline caso a conexão seja identificada como lenta, mascarando carregamentos parciais de texturas."

4. Preservação da Identidade LED:

"Mantenha o logo da LED e os botões de conversão com contraste máximo sobre este novo fundo, garantindo que a mensagem de venda seja a primeira coisa que o cliente veja".