var HTMLheaderDiv = '<div class="board"></div>';
var HTMLheaderTitle = '<h1 id="header-title">%data%</h1>';
var HTMLheaderPanel = '<div id="game-panel-board"><ul id="list" class="flex-item"></ul></div>';
var HTMLheaderStageLevel = '<li class="flex-item level">Level: %data%</li>';
var HTMLheaderStageScore = '<li class="flex-item score">Score: %data%</li>';
var HTMLheaderStageGems = '<li class="flex-item gems">Gems: %data%</li>';
var HTMLheaderStageItems = '<li class="flex-item items">Items: %data%</li>';
var HTMLheaderStageLifePoint = '<li class="flex-item lifePoint">Life Point: %data%</li>';

var gameInfo = {
    "stageInformation": {
        "level": 1,
        "score": 0,
        "gems": 0,
        "items": "Pick up the key!",
        "lifePoint": 3
    }
};

gameInfo.display = function() {
    $("#header").append(HTMLheaderDiv);
    $(".board").append(HTMLheaderTitle.replace("%data%", "The Frogger"));
    $(".board:last").append(HTMLheaderPanel);
        
    var formattedLevel = HTMLheaderStageLevel.replace("%data%", gameInfo.stageInformation.level);
    $("#list").append(formattedLevel);
        
    var formattedScore = HTMLheaderStageScore.replace("%data%", gameInfo.stageInformation.score);
    $("#list").append(formattedScore);
        
    var formattedGems = HTMLheaderStageGems.replace("%data%", gameInfo.stageInformation.gems);
    $("#list").append(formattedGems);
        
    var formattedItems = HTMLheaderStageItems.replace("%data%", gameInfo.stageInformation.items);
    $("#list").append(formattedItems);
    
    var formattedLifePoints = HTMLheaderStageLifePoint.replace("%data%", gameInfo.stageInformation.lifePoint);
    $("#list:last").append(formattedLifePoints).addClass("hi");
};

gameInfo.display();