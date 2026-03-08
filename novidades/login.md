Com certeza. Vamos recalibrar o prompt para garantir que a AI de frontend entenda a estrutura de split-screen, o efeito de crop para remover a marca d'água e a integração correta do seu link do Spline.

Aqui está o prompt técnico detalhado para você copiar e enviar:

🚀 Prompt de Implementação: Portal LED Automação (V2)
Objetivo: Criar uma interface de login imersiva em "Split Screen" (Dividida) utilizando o runtime do Spline 3D e um painel de autenticação moderno.

1. Estrutura do Layout (CSS Grid/Flex)
Lado Esquerdo (70%): Área exclusiva para a cena 3D.

Lado Direito (30%): Painel de login escuro (Background: #0D0D0D).

Responsividade: Em dispositivos móveis, o painel de login deve assumir 100% da largura, empilhando sobre a cena 3D.

2. Implementação do Spline (Com Efeito de Crop)
Para remover a marca d'água "Built with Spline" sem violar os termos, utilizaremos um container com overflow: hidden:

Script: <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"></script>.

Componente: <spline-viewer url="https://prod.spline.design/HlQppNESmgOMAq-k/scene.splinecode"></spline-viewer>.

CSS de Enquadramento:
```css
.spline-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Esconde o que estiver fora da área */
}
spline-viewer {
  width: 100%;
  height: 110%; /* Faz a cena ser mais alta que o container */
  margin-bottom: -10%; /* Empurra o selo da Spline para fora do campo de visão */
}
```
3. Painel de Login (Interface)
Logo: Inserir o logotipo da LED Automação centralizado no topo do formulário.

Campos: * CPF: Input com máscara 000.000.000-00.

Senha: Input tipo password com toggle de visibilidade (ícone de olho).

Botão: Cor #00A859 (Verde LED), arredondado, com efeito de hover suave e texto "Acessar Portal".

4. Requisitos Adicionais
Remover margens e paddings padrão do body.

Garantir que a transição entre a cena 3D e o painel de login seja limpa (utilize um leve box-shadow interno no painel se necessário para dar profundidade).

Ambiente: Certificar-se de que as URLs de API no frontend estão apontando corretamente para o backend configurado via variáveis de ambiente.