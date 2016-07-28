/**
 * @description This is the central configuration. In this file you can change
 * most of the behavior of your game. IMPORTANT: I recommend that you study all
 * the codes before making permantes changes.
 */
var Config = function() {
    this.scenario = {
		size: {
			cols: 5,
			rows: {
				water: 1,
				stone: 3,
				grass: 1
			}
		}
	},
	this.resources = {
		images: {
			size: {
				width: 101,
				height: 83,
				full: 171
			},
			urls: {
				scenario: {
					water: 'images/water-block.png',
					stone: 'images/stone-block.png',
					grass: 'images/grass-block.png'
				},
				enemies: {
					bug: 'images/enemy-bug.png'
				},
				characters: {
					boy: 'images/char-boy.png'
				},
				bonus: {
					gemBlue: 'images/Gem Blue.png'
				}
			}
		}
	},
	this.traffic = {
		routeCapacity: 2
	},
	this.scoreboard = {
		score: {
			startingIn: 0,
			increment: 10,
            webInterface: {
                id: 'sb-score',
                label: 'Score: '
            }
		},
		level: {
			startingIn: 1,
			fisrtLevelUp: 60,
			percentageNextLevel: 52,
            webInterface: {
                id: 'sb-level',
                label: 'Level: '
            }
		},
		life: {
			startingIn: 3,
            webInterface: {
                id: 'sb-life',
                label: 'Life: '
            }
		}
	},
	this.gameControl = {
		standardDevice: 'keyboard',
		keyboard: {
			32: 'pause',
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		}
	}
};

/**
 * @description Select a function group
 * @param  {string} group - Name of group
 * @return {object} Object containing the group settings
 */
Config.prototype.select = function(group) {
    return this[group];
};
