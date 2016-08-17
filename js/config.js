/**
 * @description This is the central configuration. In this file you can change
 * most of the behavior of your game. IMPORTANT: I recommend that you study all
 * the codes before making permantes changes.
 * @constructor
 */
function Config() {
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
    				bug: 'images/enemy-bug.png',
    				bee: 'images/enemy-bee.png'
    			},
    			characters: {
    				boy: 'images/char-boy.png'
    			},
    			bonus: {
    				gemBlue: 'images/Gem Blue.png',
    				heart: 'images/Heart.png'
    			}
    		}
    	}
    },
    this.canvas = {
    	containerId: 'canvas-container'
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
    		fisrtLevelUp: 300,
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
    },
    this.bonus = {
    	gemBlue: {
    		score: 50,
    		padding: 30,
    		terrainsSurface: 'stone'
    	},
    	heart: {
    		life: 1,
    		padding: 20,
    		terrainsSurface: ['stone', 'grass']
    	}
    }
};

/**
 * @description Select a function group
 * @param  {string} group - Name of group
 * @param  {string} element - Name of element
 * @return {object} Object or proprieties containing the group settings
 */
Config.prototype.select = function(group, element) {
    if (typeof group === 'string') {
    	if (!this.hasOwnProperty(group))
    		throw new TypeError(group + ' config not found');

    	if (typeof element === 'string') {
    		if (!this[group].hasOwnProperty(element))
    			throw new TypeError(element + ' config not found');

    		return this[group][element];
    	}

    	return this[group];
    }

    throw new TypeError('Required group and (or) element to perform selection');
};
