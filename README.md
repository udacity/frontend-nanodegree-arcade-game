# frontend-nanodegree-arcade-game
Olá! Meu nome é **Paulo Freitas Nobrega** e esta é a minha versão do Frontend Nanodegree Arcade Game, projeto do curso de gradução Nanodegree Desenvolvedor Web Front-End oferecido pela Udacity (Conheça mais sobre a Udacity neste link (https://br.udacity.com/us/)). Frontend Nanodegree Arcade Game tem como objetivo o desenvolvimento de um jogo baseado no clássico dos fliperamas [Frogger](https://pt.wikipedia.org/wiki/Frogger). Encontre mais detalhes na rúbrica do projeto: (https://review.udacity.com/#!/projects/2696458597/rubric).

### Instalação
Você pode fazer o download do arquivo **.zip** diretamente neste link: (https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game/archive/master.zip)

Ou se preferir poderá utilizar o git:

```git
git clone https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game.git
```

Após obter os arquivos, inicie o jogo executando o arquivo **index.html**.

### Como Jogar?
A mecânica é simples! Controlar o personagem, ajudando-o a atravesar a rua até chegar ao rio. Pontos são adicionados no placar do jogo toda vez que o personagem chega ao objetivo, e vidas são retiradas quando o mesmo é atingido no trajeto. Há pontos e vidas extras que são oferecidos, em intervalos, durante todo o jogo. O jogo chega ao fim somente quando o jogador perder todas as vidas disponíveis.

###### Controle do Jogo
- <kbd>Up</kbd>
- <kbd>Right</kbd>
- <kbd>Down</kbd>
- <kbd>Left</kbd>
- <kbd>Space Bar</kbd> - Pause
- <kbd>Shift</kbd> - Select (Alterna os personagens)

# Para Desenvolvedores
Alguns comentários sobre sessões e códigos específicos.

### Configurações
Em **config.js** você encontrará as configurações de praticamente todas as partes do jogo. Você pode brincar e alterá-las, mas tome cuidado, essas configurações afetam como o jogo se comporta. Abaixo você verá um pequeno trecho do arquivo de configuração. Ele é responsável pela configuração do cenário do jogo:

```javascript
cols: 5,
rows: {
    water: 1,
    stone: 3,
    grass: 1
}
```

O código acima define um cenário com: 5 colunas e 5 linhas (Água - 1; Pedra - 3; Grama - 1):

![image](images/readme/0001.jpg)

Se optarmos talvez por (Água - 1; Pedra - 2; Grama - 2) teremos o seguinte código:

```javascript
cols: 5,
rows: {
    water: 1,
    stone: 2,
    grass: 2
}
```

![image](images/readme/0002.jpg)

### Rotas
Rotas são estradas que os inimigos percorrerão. Pontos comuns no eixo Y que mantem os inimigos trafegando por referências próximas ao centro de cada linha do cenário. Em **routes.js** as rotas do cenário são associadas aos seus terrenos. Isso permite definir de forma mais clara o trajeto dos inimigos.

```javascript
var MyEnemy = function() {
    // more code ...
    this.addTerrainsSurface(['stone', 'grass']);
    // more code ...
};
```

Esse código define um inimigo capaz de percorrer qualquer uma das rotas de pedra ou grama que o cenário possuir.

### Gerenciando o Tráfico de Inimigos
**traffic.js** gerencia a entrada e saída de inimigos em cada rota do cenário. Isso mantem uma melhor distribuição destes inimigos e permite um movimento fluído do jogador.

```javascript
// free route
var route = traffic.getEmptyRoute(enemy.getTerrainsSurface());

// entering the route
traffic.declareRouteEntry(route);

// leaving the route
traffic.declareRouteOutput(route);
```

### Placar do Jogo
Sempre que um evento acontece no jogo, envolvendo o placar, **scoreboard.js** alerta o jogador:

- Novos pontos conquistados;
- Novo nível alcançado;
- Vida recebida;
- Vida removida;

![image](images/readme/0003.jpg)
