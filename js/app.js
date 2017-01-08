var config          = new Config,
    timer           = new Timer,
    resources       = new Resources,
    resourcesLoader = new ResourcesLoader,
    scenario        = new Scenario,
    canvas          = new Canvas,
    routes          = new Routes,
    traffic         = new Traffic,
    scoreboardWI    = new ScoreboardWebInterface,
    scoreboard      = new Scoreboard,
    entityFactory   = new EntityFactory,
    bonusFactory    = new BonusFactory,
    engine          = new Engine,
    gameControl     = new GameControl,
    collision       = new Collision;

// Resources
resources.setConfig(config.select('resources'));

// Resources Loader
resourcesLoader.multipleLoad(resources.urlsAllImages());

// Scenario
scenario.setConfig(config.select('scenario'));
scenario.addDependencies([canvas, resources, resourcesLoader]);
scenario.setDefaultConfig();

// Canvas
canvas.setConfig(config.select('canvas'));
canvas.size(scenario.width(), scenario.height());
canvas.create();

// Routes
routes.addDependencies([scenario, resources]);
routes.create();

// Traffic
traffic.addDependencies(routes);
traffic.setConfig(config.select('traffic'));

// Scoreboard
scoreboardWI.setConfig(config.select('scoreboard'));
// And Scoreboard Web Interface
scoreboard.setConfig(config.select('scoreboard'));
scoreboard.addDependencies(scoreboardWI);

// Entity Factory
entityFactory.addDefaultDependencies([
    scenario, resources, canvas, resourcesLoader, timer, scoreboard, traffic
]);

// Bonus Factory
bonusFactory.addDependencies(entityFactory);

// Player
var player = entityFactory.create(Player, [routes, scoreboard]);

// Collision
collision.setPlayer(player);

// Engine
engine.addDependencies([scenario, traffic, scoreboard, collision]);
engine.addEntities([
    entityFactory.create(Bug),
    entityFactory.create(Bug),
    entityFactory.create(Bug),
    bonusFactory.create(Gem, config.select('bonus','gemBlue')),
    bonusFactory.create(Gem, config.select('bonus','gemGreen')),
    bonusFactory.create(Gem, config.select('bonus','gemOrange')),
    bonusFactory.create(Heart, config.select('bonus','heart'))
]);
engine.setPlayer(player);

// Game Control
gameControl.setConfig(config.select('gameControl'));
gameControl.addCallbacks('keyup', [
    engine.pauseGame.bind(engine),
    player.move.bind(player),
    player.selectSprite.bind(player)
]);
gameControl.init();

// Run
resourcesLoader.addCallbacks('onReady', engine.run.bind(engine));
