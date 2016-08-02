# frontend-nanodegree-arcade-game
Olá! Meu nome é **Paulo Freitas Nobrega** e esta é a minha versão do Frontend Nanodegree Arcade Game da Udacity. Você pode acessar a rúbrica do projeto neste link: (https://review.udacity.com/#!/projects/2696458597/rubric).

#### História do Jogo
Na minha versão do jogo o personagem principal tem sua cidade invadida por insetos gigantes. Mas fique atento, seu personagem não sabe nadar, portanto, evite a água. Talvez você não gostou da ideia, e prefere a versão original da rúbrica, onde o personagem deve alcançar a água para ganhar pontos. Neste caso, eu desenvolvi uma versão para isso. Você poderá obtê-la neste link:

#### Como Jogar?
Como mencionei acima, o objetivo do jogo é desviar dos insetos gingantes. A cada inseto que atravessa todo o cenário (10 pontos) são creditados no placar. Ao acumular pontos, o nível de jogo aumenta, aumentando também a dificuldade. Isso acontece porque os inimigos estão diretamente ligados ao nível de jogo. Quanto maior o nível, maior será a velocidade deles.

O personagem inicia o jogo com três vidas. Quando um inseto o atinge ou o mesmo cai na água, uma de suas vidas é retirada do placar do jogo. E quando as vidas acabam, o jogo chega ao fim. Mas não se preocupe, esporadicamente bônus apareceram pelo cenário, e ao coletá-los pontos e vidas extras serão creditados no placar.

O jogo não tem fim! seu objetivo é ultrapassar seus próprios limites, batendo seu próprio recorde de pontos ou o recorde de seus amigos, mostrando que você é um verdadeiro campeão.

Então bom jogo e divirta-se!

#### Instalação
Você pode fazer o download do arquivo **.zip** diretamente neste link: (https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game/archive/master.zip)

Ou se preferir poderá utilizar o git:

```git
git clone https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game.git
```
# Para Desenvolvedores
Agora vou comentar sobre algumas sessões e códigos específicos.

#### Configuração
Em **config.js** você encontrará as configurações de praticamente todas as partes do jogo. Você pode brincar e alterá-las, mas tome cuidado, essas configurações afetam como o jogo se comporta. Por essa razão, sugiro que estude o comportamento dos códigos antes de fazer qualquer alteração permanente.

Abaixo você verá um pequeno trecho do arquivo de configuração. Este trecho é responsável pela representação das linhas do cenário (falaremos sobre o cenário um pouco à frente). Ou seja, define a quantidade de linhas que cada superfície de terreno possui. Neste caso, o cenário possuirá um total de 05 linhas, agrupadas da seguinte forma:

- 01 Superfície de Água
- 03 Superfícies de Pedra
- 01 Superfície de Grama

```javascript
rows: {
    water: 1,
    stone: 3,
    grass: 1
}
```

Veja o resultado:

[image]

Vamos tentar uma pequena mudança.

```javascript
rows: {
    water: 1,
    stone: 2,
    grass: 2
}
```

[image here]

Legal. Agora o cenário possui 02 superfície de grama.

###### Sobre o Objeto:
**Config** possui o(s) seguinte(s) método(s):

* config.**select()**

#### Scenario and Routes
Agora vamos falar um pouco sobre o cenário e suas rotas. Pense que neste jogo, o cenário é simplemente uma tabela, formada por linhas e colunas. Junte o trecho do código acima com a quantidade de colunas e terá essa configuração:

```javascript
cols: 5,
rows: {
    water: 1,
    stone: 3,
    grass: 1
}
```
Você já deve ter imaginado o resultado. Um cenário de 05 colunas por 05 linhas possuindo 25 células. Não há nada de especial nisso, certo? Então vamos falar de algo um pouco mais interessante - **rotas**.

Rotas são estradas que seus inimigos percorreram. Pontos comuns no eixo Y que mantem os inimigos trafegando por referências imaginárias próximas ao centro de cada linha do cenário. Resumindo, cada linha do cenário possuirá uma rota.

Um dos arquivos responsáveis por gerenciar as rotas é **routes.js**. Na verdade ele faz mais do que definir o ponto (eixo Y) dessas rotas. Routes associa as rotas as suas superfícies de terreno. Ou seja, na configuração citada acima, existirá:

- 01 Rota de Água
- 03 Rotas de Pedra
- 01 Rota de Grama

Isso é muito interessante, porque através dessas associações não é necessário definir rotas específicas aos inimigos. Simplesmente você atribui superfícies de terrenos a eles. Observe:

```javascript
var MyEnemy = function() {
    // code ...
    this.terrainsSurface = ['stone', 'grass'];
    // code ...
};
```
Esse código criará um novo tipo de inimigo no jogo que poderá percorrer qualquer uma das rotas de pedra o grama que o cenário possuir. Legal não?!
