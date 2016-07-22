// Creating objects
var config = new Config,
    resources   = new Resources,
    scenario    = new Scenario,
    routes      = new Routes,
    traffic     = new Traffic,
    engine      = new Engine(this);

// Assigning settings
resources.setConfig(config.select('resources'));
scenario.setConfig(config.select('scenario'));
traffic.setConfig(config.select('traffic'));

// Creating routes
routes.create(scenario.rowsForEnvironment(), resources.imageSize('height'));

// Assigning routes to traffic manager
traffic.setRoutes(this.routes);

// Create canvas
var imgWidth        = this.resources.imageSize('width');
    imgHeight       = this.resources.imageSize('height'),
    imgFull         = this.resources.imageSize('full');
    scenarioWidth   = this.scenario.width(imgWidth);
    scenarioHeight  = this.scenario.height(imgHeight, imgFull);

this.engine.createCanvas(scenarioWidth, scenarioHeight);

// Run engine
this.engine.run();
