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
Alguns módulos desenvolvidos para o jogo:

- **Config**:           Configurações
- **Timer**:            Gerenciamento de tempo
- **Resouces**:         Gerenciamento dos recursos
- **Resources Loader**: Carregador de recursos
- **Scenario**:         Gerenciamento de cenários
- **Routes**:           Gerenciamento de rotas de cenário
- **Traffic**:          Gerenciamento de tráfico de inimigos
- **Scoreboard**:       Gerenciamento de placar do jogo
- **Entity Factory**:   Criador de entidades
- **Bonus Factory**:    Criador de bônus
- **Game Control**:     Controle de Jogo
- **Collision**:        Gerenciamento de colisão entre entidades

### Alguns exemplos de utilização:

**Timer**
```javascript
// create future timer (in seconds)
var soon = timer.createFutureTime(10);

// checking the date
if (timer.isFutureTime(soon))
    console.log('Yes!');
```

**Resources**
```javascript
// set config
resources.setConfig(config.select('resources'));

// Standard size of the images
resources.imageSize('width');   // 101
resources.imageSize('height');  // 83

// One url image
resources.urlImage('characters', 'boy'); // images/char-boy.png

// Urls of a group
resources.urlsByImagesGroup('characters'); // array
```

**Resources Loader**
```javascript
// loading an image
var url = resources.urlImage('characters', 'boy');
resourcesLoader.singleLoad(url);

// Loading multiple images
var urls = resources.urlsByImagesGroup('characters');
resourcesLoader.multipleLoad(urls);

// Get
resourcesLoader.get(url); // image
```

**Scenario**
```javascript
// Default settings
scenario.setDefaultConfig();

// Specific settings
scenario.setNumberColumns(5);
scenario.addNumberRows('water', 1);
scenario.addNumberRows('stone', 3);
scenario.addNumberRows('grass', 2);

// Get
scenario.getNumberColumns();    // 5
scenario.getNumberRows();       // 6
```

**Routes**
```javascript
// Returning grass routes
routes.get('grass');

// Returning grass and water routes
routes.get(['grass', 'water']);

// Returning last route grass
routes.getFirstOrLast('last', 'grass');
```

**Traffic**
```javascript
// free route
var route = traffic.getEmptyRoute(enemy.getTerrainsSurface());

// entering the route
traffic.declareRouteEntry(route);

// leaving the route
traffic.declareRouteOutput(route);
```

**Scoreboard**
```javascript
// Score
scoreboard.addScore();      // add 10
scoreboard.addScore(50);    // add 50

// Life
scoreboard.addLife();       // add 1
scoreboard.removeLife(2);   // remove 2
```

**Factories**
```javascript
// Entity
var bug = entityFactory.create(Bug);

// Gem
var gem = bonusFactory.create(Gem, config.select('bonus','gemBlue'));
```
