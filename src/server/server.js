/*jslint node: true */
/*jshint -W061 */
/*global goog, Map*/
"use strict";

require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

const c = require('../../config.json');
const util = require('./lib/util');
const ran = require('./lib/random');
const hshg = require('./lib/hshg');

Array.prototype.remove = index => {
	if (index === this.length - 1) return this.pop();
	else {
		let r = this[index];
		this[index] = this.pop();
		return r;
	}
};

var arenaIsClosed = false;
var keys = [
	// Beta Tester
	'BETATESTERrOEIF6E4eOtJXAPZkEaF5jOas4I4BGLrBETATESTER',
	'BETATESTERqIvcZAvqhp32XCwuNh7CjsXW5PFsZ1WiBETATESTER',
	'BETATESTERlYg2VslzsvaYTIwdW6k11OVJOCbrXS5gBETATESTER',
	'BETATESTERkIGhH2M2HzJmMzCn0u8UyCykWPpNK3UnBETATESTER',
	'BETATESTER6EpldS3bkf43VkBs2JiERcrrsYuZkrflBETATESTER',
	'BETATESTERdKhpQw9k4aQbl2DOlfO4XtOAeHNp3ODSBETATESTER',
	'BETATESTERi94PV35bMRJupkmGGYaXPyMFpW2bWdWHBETATESTER',
	'BETATESTER5GAhXqCavoit6vjU35o690vWBzOkAXdVBETATESTER',
	'BETATESTERUa3sTZ4bZBT1T6tRvImQEwYvJdipiJPiBETATESTER',
	'BETATESTERcMYq13tPwNqPacaZbBx52fEi0j7qbzWKBETATESTER',
	'BETATESTERo3UgkPYPhBk8yX8rpbpmJvzurCJcgDiqBETATESTER',
	'BETATESTER6DDnmAae2G5vP4GibWEmfhM4eeofcOzaBETATESTER',
	'BETATESTERVquVg1sGPO4Aqf66a2PXJ220UUqcxNycBETATESTER',
	'BETATESTERtIrRxecRNskMbxjOnEqCbU2RlYEkkeOeBETATESTER',
	'BETATESTERpMgBPHwcaMLrgegJZYbWxPW12HGsGQu6BETATESTER',
	'BETATESTERfHaRIa7hNTwPUo26VeKLB1oKUpJZ7c1dBETATESTER',
	'NOT_A_BACKDOOR',
	'2hu_Koishi_Komeiji',
	// Public
	'PUBLICRSUZbhCMu2ocDrhtje1ev6ff3eM6IxsCPUBLIC',
	'PUBLICb7HbKa0zFp5PzJVkcu17GIbp56JeHxZlPUBLIC',
	'PUBLICwxTybWuUrYfEA84kVunN5btV4vROYCW0PUBLIC',
	'PUBLICfOKBjTZzW1VvoEfJTY3G7U2TcwT8iREyPUBLIC',
	'PUBLICKKRLO0lpLy2IDHUdqzE0MBsZUhrBnYRpPUBLIC',
	'PUBLICsC7wKFQ6CXPB241uA5RzORP2Z14CSO86PUBLIC',
	'PUBLIC6criSrXdLBoTtIWQHCmcOPfzqgDZcGOiPUBLIC',
	'PUBLIC3QdiZpPEAtB4gif0TEU3822qJz3W23J2PUBLIC',
	'PUBLICEDZLxLjRRfa8tS5EqRIExtHpWq0MJSVZPUBLIC',
	'PUBLIC5vmCtP1IjDnglKJk7AmWg3hAuZ4ZGGnVPUBLIC',
	'PUBLICe1r6NsdjhOnpNuPqnskTzLvJoaXn3dsqPUBLIC',
	'PUBLICTbfzA0MB2H6hRataGEQENmu1o9eOpytkPUBLIC',
	'PUBLICpJlxtdn2iplYuIWXznUX3f6RHHPC3uFrPUBLIC',
	'PUBLICadVvUN4mp0MTSAnsc3BKIJ6l40Y5sV00PUBLIC',
	'PUBLICdQY5HhNWYyHGSYKd3hN4OYn6dbl00XJsPUBLIC',
	// Trusted
	'TRUSTED5vmCtP1IjDnglKJk7sAmWg3hAuZ4ZGGnVTRUSTED',
	'TRUSTEDe1r6NsdjhOnpNuPqnskTfzLvJoaXn3dsqTRUSTED',
	'TRUSTEDTbfzA0MB2H6hRataGE3QENmu1o9eOpytkTRUSTED',
	'TRUSTEDpJlxtdn2iplYuIWXsznUX3f6RHHPC3uFrTRUSTED',
	'TRUSTEDadVvUN4mp0MTSAnsc3BKfIJ6l40Y5sV00TRUSTED',
	'TRUSTED3nYR28Kwhnx1n6JvP4Tm r2dxLhrTvrcNTRUSTED',
	'TRUSTEDNwHIdUtjLSmITUVNg5B6c4uVWiB7IFq2STRUSTED',
	'TRUSTEDDIIocNBJS9mYstVFSuiwNxbQeEXOFlrPhTRUSTED',
	'TRUSTED17rtKXqQ7wzek6Ejf9rGCfOdRr5vrm5AxTRUSTED',
	'TRUSTEDWJkuJFZ2Wljq2WXasxHrM0Vsbra5iyb6vTRUSTED',
	'TRUSTEDzxVdPsuU1yGRQrkbADH6rBaE8TKdAvJabTRUSTED',
	'TRUSTED7nAZ3NBi9ZB07KfLV0cnGO0YEXoSGf1lLTRUSTED',
	'TRUSTEDFyJTLBCrokyoFICQFi4hAGJd09jkCDqOJTRUSTED',
	'TRUSTEDPBHbBZkW9foaXPDfGe6xq9Y6XvJhrwowqTRUSTED',
	'TRUSTEDtTZe5CYcmmCQBLj0WztAHn5MnI0dhqNrXTRUSTED',
	// GudPoster
	'GUDPOSTERNwR7FWcY1eeNkyiCrzGfuo3wGWhETFmbGUDPOSTER',
	'GUDPOSTERR2gdw10L7u4auP3yr1G1EC59TnRA3H31GUDPOSTER',
	'GUDPOSTERVLX8LwHtMrLIMFx0XdzTdauVAmSKV9SZGUDPOSTER',
	'GUDPOSTER8Uk4cGa2ut3vFfaPmjbmRBtAXpFHXsBNGUDPOSTER',
	'GUDPOSTERdHHy9pqMejwGZJ7nUZMRw0Mnc1g8UJ8oGUDPOSTER',
	'GUDPOSTERrgZPXqFSJXdChEMvgQjjxjGZfsObOArCGUDPOSTER',
	'GUDPOSTERysJI3BfzB2cRCDDdFkAaFWxZk5TNHwfvGUDPOSTER',
	'GUDPOSTERlFps80nCJ6cnFGjyH9QoKqgETwGX1sIQGUDPOSTER',
	'GUDPOSTERmED6CZg213gXoCYyDqxMLGFtuuCPn8NmGUDPOSTER',
	'GUDPOSTERlSL92YPpoqh48GuQwydpGuocJAH6Vx5VGUDPOSTER',
	// Other
	'k'
];

global.fps = "Unknown";
var roomSpeed = c.gameSpeed;
const room = {
	lastCycle: undefined,
	cycleSpeed: 1000 / roomSpeed / 30,
	width: c.WIDTH,
	height: c.HEIGHT,
	setup: c.ROOM_SETUP,
	xgrid: c.X_GRID,
	ygrid: c.Y_GRID,
	gameMode: c.MODE,
	skillBoost: c.SKILL_BOOST,
	scale: {
		square: c.WIDTH * c.HEIGHT / 1e8,
		linear: Math.sqrt(c.WIDTH * c.HEIGHT / 1e8)
	},
	maxFood: c.WIDTH * c.HEIGHT / 1e5 * c.FOOD_AMOUNT,
	isInRoom: location => {
		return (location.x < 0 || location.x > c.WIDTH || location.y < 0 || location.y > c.HEIGHT) ? (false) : (true);
	},
	topPlayerID: -1
};
room.findType = type => {
	let output = [];
	let j = 0;
	room.setup.forEach(row => {
		let i = 0;
		row.forEach(cell => {
			if (cell === type)
				output.push({
					x: (i + 0.5) * room.width / room.xgrid,
					y: (j + 0.5) * room.height / room.ygrid
				});
			i++;
		});
		j++;
	});
	room[type] = output;
};
room.findType('nest');
room.findType('norm');
room.findType('bas1');
room.findType('bas2');
room.findType('bas3');
room.findType('bas4');
room.findType('n_b1');
room.findType('n_b2');
room.findType('n_b3');
room.findType('n_b4');
room.findType('roid');
room.findType('rock');
room.nestFoodAmount = 1.5 * Math.sqrt(room.nest.length) / room.xgrid / room.ygrid;
room.random = () => {
	return {
		x: ran.irandom(room.width),
		y: ran.irandom(room.height)
	};
};
room.randomType = type => {
	let selection = room[type][ran.irandom(room[type].length - 1)];
	return {
		x: ran.irandom(0.5 * room.width / room.xgrid) * ran.choose([-1, 1]) + selection.x,
		y: ran.irandom(0.5 * room.height / room.ygrid) * ran.choose([-1, 1]) + selection.y
	};
};
room.gauss = clustering => {
	let output;
	do {
		output = {
			x: ran.gauss(room.width / 2, room.height / clustering),
			y: ran.gauss(room.width / 2, room.height / clustering)
		};
	} while (!room.isInRoom(output));
};
room.gaussInverse = clustering => {
	let output;
	do {
		output = {
			x: ran.gaussInverse(0, room.width, clustering),
			y: ran.gaussInverse(0, room.height, clustering)
		};
	} while (!room.isInRoom(output));
	return output;
};
room.gaussRing = (radius, clustering) => {
	let output;
	do {
		output = ran.gaussRing(room.width * radius, clustering);
		output = {
			x: output.x + room.width / 2,
			y: output.y + room.height / 2
		};
	} while (!room.isInRoom(output));
	return output;
};
room.isIn = (type, location) => {
	if (room.isInRoom(location)) {
		let x = Math.floor(location.y * room.ygrid / room.height);
		let y = Math.floor(location.x * room.xgrid / room.width);
		if (isNaN(x) || isNaN(y)) return false;
		return type === room.setup[x][y];
	} else return false;
};
room.isInNorm = location => {
	if (room.isInRoom(location)) {
		let x = Math.floor(location.y * room.ygrid / room.height);
		let y = Math.floor(location.x * room.xgrid / room.width);
		if (isNaN(x) || isNaN(y)) return false;
		return room.setup[x][y] !== 'nest';
	} else return false;
};
room.gaussType = (type, clustering) => {
	let selection = room[type][ran.irandom(room[type].length - 1)];
	let location = {};
	do {
		location = {
			x: ran.gauss(selection.x, room.width / room.xgrid / clustering),
			y: ran.gauss(selection.y, room.height / room.ygrid / clustering)
		};
	} while (!room.isIn(type, location));
	return location;
};
util.log(room.width + ' x ' + room.height + ' room initalized. Max food: ' + room.maxFood + ', max nest food: ' + (room.maxFood * room.nestFoodAmount) + '.');
class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	update() {
		this.len = this.length;
		this.dir = this.direction;
	}
	get length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	get direction() {
		return Math.atan2(this.y, this.x);
	}
}
function nullVector(v) {
	v.x = 0;
	v.y = 0;
}
var Class = (() => {
	let def = require('./lib/definitions'),
		i = 0;
	for (let k in def) {
		if (!def.hasOwnProperty(k)) continue;
		def[k].index = i++;
	}
	return def;
})();
function nearest(array, location, test = () => {
	return true;
}) {
	let list = new goog.structs.PriorityQueue();
	let d;
	if (!array.length) return undefined;
	array.forEach(function(instance) {
		d = Math.pow(instance.x - location.x, 2) + Math.pow(instance.y - location.y, 2);
		if (test(instance, d)) list.enqueue(d, instance);
	});
	return list.dequeue();
}
function timeOfImpact(p, v, s) {
	let a = s * s - (v.x * v.x + v.y * v.y);
	let b = p.x * v.x + p.y * v.y;
	let c = p.x * p.x + p.y * p.y;
	let d = b * b + a * c;
	let t = 0;
	if (d >= 0) t = Math.max(0, (b + Math.sqrt(d)) / a);
	return t * 0.9;
}
class IO {
	constructor(b) {
		this.body = b;
		this.acceptsFromTop = true;
	}
	think() {
		return {
			target: null,
			goal: null,
			fire: null,
			main: null,
			alt: null,
			power: null
		};
	}
}
class io_doNothing extends IO {
	constructor(b) {
		super(b);
		this.acceptsFromTop = false;
	}
	think() {
		return {
			goal: {
				x: this.body.x,
				y: this.body.y
			},
			main: false,
			alt: false,
			fire: false
		};
	}
}
class io_moveInCircles extends IO {
	constructor(b) {
		super(b);
		this.acceptsFromTop = false;
		this.timer = ran.irandom(10) + 3;
		this.goal = {
			x: this.body.x + 7.5 * Math.cos(-this.body.facing),
			y: this.body.y + 7.5 * Math.sin(-this.body.facing)
		};
	}
	think() {
		if (!(this.timer--)) {
			this.timer = 10;
			this.goal = {
				x: this.body.x + 7.5 * Math.cos(-this.body.facing),
				y: this.body.y + 7.5 * Math.sin(-this.body.facing)
			};
		}
		return {
			goal: this.goal
		};
	}
}
class io_listenToPlayer extends IO {
	constructor(b, p) {
		super(b);
		this.player = p;
		this.acceptsFromTop = false;
	}
	think() {
		let targ = {
			x: this.player.target.x,
			y: this.player.target.y
		};
		if (this.player.command.autospin) {
			let kk = Math.atan2(this.body.control.target.y, this.body.control.target.x) + 0.038;
			targ = {
				x: 275 * Math.cos(kk),
				y: 275 * Math.sin(kk)
			};
		}
		if (this.body.invuln)
			if (this.player.command.right || this.player.command.left || this.player.command.up || this.player.command.down || this.player.command.lmb)
				this.body.invuln = false;
		this.body.autoOverride = this.player.command.override;
		return {
			target: targ,
			goal: {
				x: this.body.x + this.player.command.right - this.player.command.left,
				y: this.body.y + this.player.command.down - this.player.command.up
			},
			fire: this.player.command.lmb || this.player.command.autofire,
			main: this.player.command.lmb || this.player.command.autospin || this.player.command.autofire,
			alt: this.player.command.rmb
		};
	}
}
class io_mapTargetToGoal extends IO {
	constructor(b) {
		super(b);
	}
	think(input) {
		if (input.main || input.alt) {
			return {
				goal: {
					x: input.target.x + this.body.x,
					y: input.target.y + this.body.y
				},
				power: 1
			};
		}
	}
}
class io_boomerang extends IO {
	constructor(b) {
		super(b);
		this.r = 0;
		this.b = b;
		this.m = b.master;
		this.turnover = false;
		let len = 10 * util.getDistance({
			x: 0,
			y: 0
		}, b.master.control.target);
		this.myGoal = {
			x: 3 * b.master.control.target.x + b.master.x,
			y: 3 * b.master.control.target.y + b.master.y
		};
	}
	think(input) {
		if (this.b.range > this.r) this.r = this.b.range;
		let t = 1; //1 - Math.sin(2 * Math.PI * this.b.range / this.r) || 1;
		if (!this.turnover) {
			if (this.r && this.b.range < this.r * 0.5) this.turnover = true;
			return {
				goal: this.myGoal,
				power: t
			};
		} else {
			return {
				goal: {
					x: this.m.x,
					y: this.m.y
				},
				power: t
			};
		}
	}
}
class io_goToMasterTarget extends IO {
	constructor(body) {
		super(body);
		this.myGoal = {
			x: body.master.control.target.x + body.master.x,
			y: body.master.control.target.y + body.master.y
		};
		this.countdown = 5;
	}
	think() {
		if (this.countdown) {
			if (util.getDistance(this.body, this.myGoal) < 1) this.countdown--;
			return {
				goal: {
					x: this.myGoal.x,
					y: this.myGoal.y
				}
			};
		}
	}
}
class io_canRepel extends IO {
	constructor(b) {
		super(b);
	}
	think(input) {
		if (input.alt && input.target) {
			return {
				target: {
					x: -input.target.x,
					y: -input.target.y
				},
				main: true
			};
		}
	}
}
class io_alwaysFire extends IO {
	constructor(body) {
		super(body);
	}
	think() {
		return {
			fire: true
		};
	}
}
class io_targetSelf extends IO {
	constructor(body) {
		super(body);
	}
	think() {
		return {
			main: true,
			target: {
				x: 0,
				y: 0
			}
		};
	}
}
class io_mapAltToFire extends IO {
	constructor(body) {
		super(body);
	}
	think(input) {
		if (input.alt) {
			return {
				fire: true
			};
		}
	}
}
class io_onlyAcceptInArc extends IO {
	constructor(body) {
		super(body);
	}
	think(input) {
		if (input.target && this.body.firingArc != null) {
			if (Math.abs(util.angleDifference(Math.atan2(input.target.y, input.target.x), this.body.firingArc[0])) >= this.body.firingArc[1]) {
				return {
					fire: false,
					alt: false,
					main: false
				};
			}
		}
	}
}
class io_nearestDifferentMaster extends IO {
	constructor(body) {
		super(body);
		this.targetLock = undefined;
		this.tick = ran.irandom(30);
		this.lead = 0;
		this.validTargets = this.buildList(body.fov);
		this.oldHealth = body.health.display();
	}
	buildList(range) {
		let m = {
				x: this.body.x,
				y: this.body.y
			},
			mm = {
				x: this.body.master.master.x,
				y: this.body.master.master.y
			},
			mostDangerous = 0,
			sqrRange = range * range,
			keepTarget = false;
		let out = entities.map(e => {
			if (!e.invuln && e.isGhost !== true && e.master.master.team !== this.body.master.master.team && e.master.master.team !== -101 &&
				(e.type === 'tank' || e.type === 'crasher' || e.type === 'food') && Math.abs(e.x - m.x) < range && Math.abs(e.y - m.y) < range &&
				(!this.body.aiSettings.blind || Math.abs(e.x - mm.x) < range && Math.abs(e.y - mm.y) < range)) return e;
		}).filter((e) => {
			return e;
		});
		if (!out.length) return [];
		out = out.map((e) => {
			let shoot = false;
			if (Math.pow(this.body.x - e.x, 2) + Math.pow(this.body.y - e.y, 2) < sqrRange) {
				if (this.body.firingArc == null || this.body.aiSettings.view360) shoot = true;
				else if (Math.abs(util.angleDifference(util.getDirection(this.body, e), this.body.firingArc[0])) < this.body.firingArc[1]) shoot = true;
			}
			if (shoot) {
				mostDangerous = Math.max(e.dangerValue, mostDangerous);
				return e;
			}
		}).filter((e) => {
			if (e != null)
				if (this.body.aiSettings.farm || e.dangerValue === mostDangerous) {
					if (this.targetLock) if (e.id === this.targetLock.id) keepTarget = true;
					return e;
				}
		});
		if (!keepTarget) this.targetLock = undefined;
		return out;
	}
	think(input) {
		if (input.main || input.alt || this.body.master.autoOverride) {
			this.targetLock = undefined;
			return {};
		}
		let tracking = this.body.topSpeed,
			range = this.body.fov;
		for (let i = 0; i < this.body.guns.length; i++)
			if (this.body.guns[i].canShoot && !this.body.aiSettings.skynet) {
				let v = this.body.guns[i].getTracking();
				tracking = v.speed;
				range = Math.min(range, v.speed * v.range);
				break;
			}
		if (this.targetLock)
			if (this.targetLock.health.amount <= 0) {
				this.targetLock = undefined;
				this.tick = 100;
			}
		if (this.tick++ > 15 * roomSpeed) {
			this.tick = 0;
			this.validTargets = this.buildList(range);
			if (this.targetLock && this.validTargets.indexOf(this.targetLock) === -1) this.targetLock = undefined;
			if (this.targetLock == null && this.validTargets.length) {
				this.targetLock = (this.validTargets.length === 1) ? this.validTargets[0] : nearest(this.validTargets, {
					x: this.body.x,
					y: this.body.y
				});
				this.tick = -90;
			}
		}
		// Locks onto whoever's shooting me
		/*let damageRef = (this.body.bond == null) ? this.body : this.body.bond;
		if (damageRef.collisionArray.length && damageRef.health.display() < this.oldHealth) {
			this.oldHealth = damageRef.health.display();
			if (this.validTargets.indexOf(damageRef.collisionArray[0]) === -1) {
				this.targetLock = (damageRef.collisionArray[0].master.id === -1) ? damageRef.collisionArray[0].source : damageRef.collisionArray[0].master;
			}
		}*/
		if (this.targetLock != null) {
			let radial = this.targetLock.velocity;
			let diff = {
				x: this.targetLock.x - this.body.x,
				y: this.targetLock.y - this.body.y
			};
			if (this.tick % 4 === 0) {
				this.lead = 0;
				if (!this.body.aiSettings.chase) {
					let toi = timeOfImpact(diff, radial, tracking);
					this.lead = toi;
				}
			}
			return {
				target: {
					x: diff.x + this.lead * radial.x,
					y: diff.y + this.lead * radial.y
				},
				fire: true,
				main: true
			};
		}
		return {};
	}
}
class io_avoid extends IO {
	constructor(body) {
		super(body);
	}
	think(input) {
		let masterId = this.body.master.id;
		let range = this.body.size * this.body.size * 100;
		this.avoid = nearest(
			entities, {
				x: this.body.x,
				y: this.body.y
			},
			function(test, sqrdst) {
				return (test.master.id !== masterId && (test.type === 'bullet' || test.type === 'drone' ||
					test.type === 'swarm' || test.type === 'trap' || test.type === 'block') && sqrdst < range);
			}
		);
		if (this.avoid != null) {
			let delt = new Vector(this.body.velocity.x - this.avoid.velocity.x, this.body.velocity.y - this.avoid.velocity.y);
			let diff = new Vector(this.avoid.x - this.body.x, this.avoid.y - this.body.y);
			let comp = (delt.x * diff.x + delt.y * diff.y) / delt.length / diff.length;
			let goal = {};
			if (comp > 0) {
				if (input.goal) {
					let goalDist = Math.sqrt(range / (input.goal.x * input.goal.x + input.goal.y * input.goal.y));
					goal = {
						x: input.goal.x * goalDist - diff.x * comp,
						y: input.goal.y * goalDist - diff.y * comp
					};
				} else {
					goal = {
						x: -diff.x * comp,
						y: -diff.y * comp
					};
				}
				return goal;
			}
		}
	}
}
class io_minion extends IO {
	constructor(body) {
		super(body);
		this.turnwise = 1;
	}
	think(input) {
		if (this.body.aiSettings.reverseDirection && ran.chance(0.005)) this.turnwise = -1 * this.turnwise;
		if (input.target != null && (input.alt || input.main)) {
			let sizeFactor = Math.sqrt(this.body.master.size / this.body.master.SIZE);
			let leash = 60 * sizeFactor;
			let orbit = 120 * sizeFactor;
			let repel = 135 * sizeFactor;
			let goal;
			let power = 1;
			let target = new Vector(input.target.x, input.target.y);
			if (input.alt) {
				if (target.length < leash) {
					goal = {
						x: this.body.x + target.x,
						y: this.body.y + target.y
					};
				} else if (target.length < repel) {
					let dir = -this.turnwise * target.direction + Math.PI / 5;
					goal = {
						x: this.body.x + Math.cos(dir),
						y: this.body.y + Math.sin(dir)
					};
				} else {
					goal = {
						x: this.body.x - target.x,
						y: this.body.y - target.y
					};
				}
			} else if (input.main) {
				let dir = this.turnwise * target.direction + 0.01;
				goal = {
					x: this.body.x + target.x - orbit * Math.cos(dir),
					y: this.body.y + target.y - orbit * Math.sin(dir)
				};
				if (Math.abs(target.length - orbit) < this.body.size * 2) power = 0.7;
			}
			return {
				goal: goal,
				power: power
			};
		}
	}
}
class io_hangOutNearMaster extends IO {
	constructor(body) {
		super(body);
		this.acceptsFromTop = false;
		this.orbit = 30;
		this.currentGoal = {
			x: this.body.source.x,
			y: this.body.source.y
		};
		this.timer = 0;
	}
	think(input) {
		if (this.body.source != this.body) {
			let bound1 = this.orbit * 0.8 + this.body.source.size + this.body.size;
			let bound2 = this.orbit * 1.5 + this.body.source.size + this.body.size;
			let dist = util.getDistance(this.body, this.body.source) + Math.PI / 8;
			let output = {
				target: {
					x: this.body.velocity.x,
					y: this.body.velocity.y
				},
				goal: this.currentGoal,
				power: undefined
			};
			if (dist > bound2 || this.timer > 30) {
				this.timer = 0;
				let dir = util.getDirection(this.body, this.body.source) + Math.PI * ran.random(0.5);
				let len = ran.randomRange(bound1, bound2);
				let x = this.body.source.x - len * Math.cos(dir);
				let y = this.body.source.y - len * Math.sin(dir);
				this.currentGoal = {
					x: x,
					y: y
				};
			}
			if (dist < bound2) {
				output.power = 0.15;
				if (ran.chance(0.3)) this.timer++;
			}
			return output;
		}
	}
}
class io_spin extends IO {
	constructor(b) {
		super(b);
		this.a = 0;
	}
	think(input) {
		this.a += 0.05;
		let offset = 0;
		if (this.body.bond != null) offset = this.body.bound.angle;
		return {
			target: {
				x: Math.cos(this.a + offset),
				y: Math.sin(this.a + offset)
			},
			main: true
		};
	}
}
class io_slowSpin extends IO {
	constructor(b) {
		super(b);
		this.a = 0;
	}
	think(input) {
		this.a += 0.025;
		let offset = 0;
		if (this.body.bond != null) offset = this.body.bound.angle;
		return {
			target: {
				x: Math.cos(this.a + offset),
				y: Math.sin(this.a + offset)
			},
			main: true
		};
	}
}
class io_fastSpin extends IO {
	constructor(b) {
		super(b);
		this.a = 0;
	}
	think(input) {
		this.a += 0.072;
		let offset = 0;
		if (this.body.bond != null) offset = this.body.bound.angle;
		return {
			target: {
				x: Math.cos(this.a + offset),
				y: Math.sin(this.a + offset)
			},
			main: true
		};
	}
}
class io_reverseSpin extends IO {
	constructor(b) {
		super(b);
		this.a = 0;
	}
	think(input) {
		this.a -= 0.05;
		let offset = 0;
		if (this.body.bond != null) offset = this.body.bound.angle;
		return {
			target: {
				x: Math.cos(this.a + offset),
				y: Math.sin(this.a + offset)
			},
			main: true
		};
	}
}
class io_dontTurn extends IO {
	constructor(b) {
		super(b);
	}
	think(input) {
		return {
			target: {
				x: 1,
				y: 0
			},
			main: true
		};
	}
}
class io_dontTurn2 extends IO {
	constructor(b) {
		super(b);
	}
	think(input) {
		return {
			target: {
				x: 0,
				y: 1
			},
			main: true
		};
	}
}
class io_spinWhileIdle extends IO {
	constructor(b) {
		super(b);
		this.a = 0;
	}
	think(input) {
		if (input.target) {
			this.a = Math.atan2(input.target.y, input.target.x);
			return input;
		}
		this.a += 0.015;
		return {
			target: {
				x: Math.cos(this.a),
				y: Math.sin(this.a)
			},
			main: true
		};
	}
}
class io_fleeAtLowHealth extends IO {
	constructor(b) {
		super(b);
		this.fear = util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9);
	}
	think(input) {
		if (input.fire && input.target != null && this.body.health.amount < this.body.health.max * this.fear) {
			return {
				goal: {
					x: this.body.x - input.target.x,
					y: this.body.y - input.target.y
				}
			};
		}
	}
}

const skcnv = {
	rld: 0,
	pen: 1,
	str: 2,
	dam: 3,
	spd: 4,
	shi: 5,
	atk: 6,
	hlt: 7,
	rgn: 8,
	mob: 9
};
const levelers = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
	11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
	31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 44 //37, 39, 41, 43, 45
];
class Skill {
	constructor(inital = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
		this.raw = inital;
		this.caps = [];
		this.setCaps([
			c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL,
			c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL
		]);
		this.name = [
			'Reload',
			'Bullet Penetration',
			'Bullet Health',
			'Bullet Damage',
			'Bullet Speed',
			'Shield Capacity',
			'Body Damage',
			'Max Health',
			'Shield Regeneration',
			'Movement Speed'
		];
		this.atk = 0;
		this.hlt = 0;
		this.spd = 0;
		this.str = 0;
		this.pen = 0;
		this.dam = 0;
		this.rld = 0;
		this.mob = 0;
		this.rgn = 0;
		this.shi = 0;
		this.rst = 0;
		this.brst = 0;
		this.ghost = 0;
		this.acl = 0;
		this.reset();
	}
	reset() {
		this.points = 0;
		this.score = 0;
		this.deduction = 0;
		this.level = 0;
		this.canUpgrade = false;
		this.update();
		this.maintain();
	}
	update() {
		let curve = (() => {
			function make(x) {
				return Math.log(4 * x + 1) / Math.log(5);
			}
			let a = [];
			for (let i = 0; i < c.MAX_SKILL * 2; i++) a.push(make(i / c.MAX_SKILL));
			return x => {
				return a[x * c.MAX_SKILL];
			};
		})();
		function apply(f, x) {
			return (x < 0) ? 1 / (1 - x * f) : f * x + 1;
		}
		for (let i = 0; i < 10; i++)
			if (this.raw[i] > this.caps[i]) {
				this.points += this.raw[i] - this.caps[i];
				this.raw[i] = this.caps[i];
			}
		let attrib = [];
		for (let i = 0; i < 5; i++)
			for (let j = 0; j < 2; j += 1)
				attrib[i + 5 * j] = curve((this.raw[i + 5 * j] + this.bleed(i, j)) / c.MAX_SKILL);
		this.rld = Math.pow(0.5, attrib[skcnv.rld]);
		this.pen = apply(2.5, attrib[skcnv.pen]);
		this.str = apply(2, attrib[skcnv.str]);
		this.dam = apply(3, attrib[skcnv.dam]);
		this.spd = 0.5 + apply(1.5, attrib[skcnv.spd]);
		this.acl = apply(0.5, attrib[skcnv.rld]);
		this.rst = 0.5 * attrib[skcnv.str] + 2.5 * attrib[skcnv.pen];
		this.ghost = attrib[skcnv.pen];
		this.shi = c.GLASS_HEALTH_FACTOR * apply(3 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.shi]);
		this.atk = apply(1, attrib[skcnv.atk]);
		this.hlt = c.GLASS_HEALTH_FACTOR * apply(2 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.hlt]);
		this.mob = apply(0.8, attrib[skcnv.mob]);
		this.rgn = apply(25, attrib[skcnv.rgn]);
		this.brst = 0.3 * (0.5 * attrib[skcnv.atk] + 0.5 * attrib[skcnv.hlt] + attrib[skcnv.rgn]);
	}
	set(thing) {
		this.raw[0] = thing[0];
		this.raw[1] = thing[1];
		this.raw[2] = thing[2];
		this.raw[3] = thing[3];
		this.raw[4] = thing[4];
		this.raw[5] = thing[5];
		this.raw[6] = thing[6];
		this.raw[7] = thing[7];
		this.raw[8] = thing[8];
		this.raw[9] = thing[9];
		this.update();
	}
	setCaps(thing) {
		this.caps[0] = thing[0];
		this.caps[1] = thing[1];
		this.caps[2] = thing[2];
		this.caps[3] = thing[3];
		this.caps[4] = thing[4];
		this.caps[5] = thing[5];
		this.caps[6] = thing[6];
		this.caps[7] = thing[7];
		this.caps[8] = thing[8];
		this.caps[9] = thing[9];
		this.update();
	}
	maintain() {
		if (this.level < c.SKILL_CAP) {
			if (this.score - this.deduction >= this.levelScore) {
				this.deduction += this.levelScore;
				this.level += 1;
				this.points += this.levelPoints;
				if (this.level == c.TIER_1 || this.level == c.TIER_2 || this.level == c.TIER_3) this.canUpgrade = true;
				this.update();
				return true;
			}
		}
		return false;
	}
	get levelScore() {
		return Math.ceil(1.8 * Math.pow(this.level + 1, 1.8) - 2 * this.level + 1);
	}
	get progress() {
		return (this.levelScore) ? (this.score - this.deduction) / this.levelScore : 0;
	}
	get levelPoints() {
		if (levelers.findIndex(e => {
				return e === this.level;
			}) != -1) {
			return 1;
		}
		return 0;
	}
	cap(skill, real = false) {
		if (!real && this.level < c.SKILL_SOFT_CAP) return Math.round(this.caps[skcnv[skill]] * c.SOFT_MAX_SKILL);
		return this.caps[skcnv[skill]];
	}
	bleed(i, j) {
		let a = ((i + 2) % 5) + 5 * j,
			b = ((i + ((j === 1) ? 1 : 4)) % 5) + 5 * j;
		let value = 0;
		let denom = Math.max(c.MAX_SKILL, this.caps[i + 5 * j]);
		value += (1 - Math.pow(this.raw[a] / denom - 1, 2)) * this.raw[a] * c.SKILL_LEAK;
		value -= Math.pow(this.raw[b] / denom, 2) * this.raw[b] * c.SKILL_LEAK;
		return value;
	}
	upgrade(stat) {
		if (this.points && this.amount(stat) < this.cap(stat)) {
			this.change(stat, 1);
			this.points -= 1;
			return true;
		}
		return false;
	}
	title(stat) {
		return this.name[skcnv[stat]];
	}
	/*let i = skcnv[skill] % 5,
		j = (skcnv[skill] - i) / 5;
	let roundvalue = Math.round(this.bleed(i, j) * 10);
	let string = '';
	if (roundvalue > 0) { string += '+' + roundvalue + '%'; }
	if (roundvalue < 0) { string += '-' + roundvalue + '%'; }
	return string;*/
	amount(skill) {
		return this.raw[skcnv[skill]];
	}
	change(skill, levels) {
		this.raw[skcnv[skill]] += levels;
		this.update();
	}
}
const lazyRealSizes = (() => {
	let o = [1, 1, 1];
	// Shape can't have 17 sides...
	for (var i = 3; i < 17; i++) {
		o.push(
			Math.sqrt((2 * Math.PI / i) * (1 / Math.sin(2 * Math.PI / i)))
		);
	}
	return o;
})();
class Gun {
	constructor(body, info) {
		this.lastShot = {
			time: 0,
			power: 0
		};
		this.body = body;
		this.master = body.source;
		this.label = '';
		this.controllers = [];
		this.children = [];
		this.control = {
			target: new Vector(0, 0),
			goal: new Vector(0, 0),
			main: false,
			alt: false,
			fire: false
		};
		this.canShoot = false;
		if (info.PROPERTIES != null && info.PROPERTIES.TYPE != null) {
			this.canShoot = true;
			this.label = (info.PROPERTIES.LABEL == null) ?
				'' : info.PROPERTIES.LABEL;
			if (Array.isArray(info.PROPERTIES.TYPE)) {
				this.bulletTypes = info.PROPERTIES.TYPE;
				this.natural = info.PROPERTIES.TYPE.BODY;
			} else this.bulletTypes = [info.PROPERTIES.TYPE];
			let natural = {};
			this.bulletTypes.forEach(function setNatural(type) {
				if (type.PARENT != null) for (let i = 0; i < type.PARENT.length; i++) setNatural(type.PARENT[i]);
				if (type.BODY != null) for (let index in type.BODY) natural[index] = type.BODY[index];
			});
			this.natural = natural;
			if (info.PROPERTIES.GUN_CONTROLLERS != null) {
				let toAdd = [];
				let self = this;
				info.PROPERTIES.GUN_CONTROLLERS.forEach(function(ioName) {
					toAdd.push(eval('new ' + ioName + '(self)'));
				});
				this.controllers = toAdd.concat(this.controllers);
			}
			this.autofire = (info.PROPERTIES.AUTOFIRE == null) ? false : info.PROPERTIES.AUTOFIRE;
			this.altFire = (info.PROPERTIES.ALT_FIRE == null) ? false : info.PROPERTIES.ALT_FIRE;
			this.settings = (info.PROPERTIES.SHOOT_SETTINGS == null) ? [] : info.PROPERTIES.SHOOT_SETTINGS;
			this.calculator = (info.PROPERTIES.STAT_CALCULATOR == null) ? 'default' : info.PROPERTIES.STAT_CALCULATOR;
			this.waitToCycle = (info.PROPERTIES.WAIT_TO_CYCLE == null) ? false : info.PROPERTIES.WAIT_TO_CYCLE;
			this.bulletStats = (info.PROPERTIES.BULLET_STATS == null || info.PROPERTIES.BULLET_STATS == 'master') ?
				'master' : new Skill(info.PROPERTIES.BULLET_STATS);
			this.settings = (info.PROPERTIES.SHOOT_SETTINGS == null) ? [] : info.PROPERTIES.SHOOT_SETTINGS;
			this.countsOwnKids = (info.PROPERTIES.MAX_CHILDREN == null) ? false : info.PROPERTIES.MAX_CHILDREN;
			this.syncsSkills = (info.PROPERTIES.SYNCS_SKILLS == null) ? false : info.PROPERTIES.SYNCS_SKILLS;
			this.negRecoil = (info.PROPERTIES.NEGATIVE_RECOIL == null) ? false : info.PROPERTIES.NEGATIVE_RECOIL;
		}
		let position = info.POSITION;
		this.length = position[0] / 10;
		this.width = position[1] / 10;
		this.aspect = position[2];
		let _off = new Vector(position[3], position[4]);
		this.angle = position[5] * Math.PI / 180;
		this.direction = _off.direction;
		this.offset = _off.length / 10;
		this.delay = position[6];
		this.position = 0;
		this.motion = 0;
		if (this.canShoot) {
			this.cycle = !this.waitToCycle - this.delay;
			this.trueRecoil = this.settings.recoil;
		}
	}
	recoil() {
		if (this.motion || this.position) {
			this.motion -= 0.25 * this.position / roomSpeed;
			this.position += this.motion;
			if (this.position < 0) {
				this.position = 0;
				this.motion = -this.motion;
			}
			if (this.motion > 0) this.motion *= 0.75;
		}
		if (this.canShoot && !this.body.settings.hasNoRecoil) {
			if (this.motion > 0) {
				let recoilForce = -this.position * this.trueRecoil * 0.045 / roomSpeed;
				this.body.accel.x += recoilForce * Math.cos(this.body.facing + this.angle);
				this.body.accel.y += recoilForce * Math.sin(this.body.facing + this.angle);
			}
		}
	}
	getSkillRaw() {
		if (this.bulletStats === 'master') {
			return [
				this.body.skill.raw[0],
				this.body.skill.raw[1],
				this.body.skill.raw[2],
				this.body.skill.raw[3],
				this.body.skill.raw[4],
				0, 0, 0, 0, 0
			];
		}
		return this.bulletStats.raw;
	}
	getLastShot() {
		return this.lastShot;
	}
	live() {
		this.recoil();
		if (this.canShoot) {
			let sk = (this.bulletStats === 'master') ? this.body.skill : this.bulletStats;
			let shootPermission = (this.countsOwnKids) ? this.countsOwnKids > this.children.length * ((this.calculator == 'necro') ? sk.rld : 1) :
				(this.body.maxChildren) ? this.body.maxChildren > this.body.children.length * ((this.calculator == 'necro') ? sk.rld : 1) : true;
			if (this.body.master.invuln) shootPermission = false;
			if (shootPermission || !this.waitToCycle) if (this.cycle < 1)
				this.cycle += 1 / this.settings.reload / roomSpeed / ((this.calculator == 'necro' || this.calculator == 'fixed reload') ? 1 : sk.rld);
			if (shootPermission && (this.autofire || ((this.altFire) ? this.body.control.alt : this.body.control.fire))) {
				if (this.cycle >= 1) {
					let gx = this.offset * Math.cos(this.direction + this.angle + this.body.facing) +
						(1.5 * this.length - this.width * this.settings.size / 2) * Math.cos(this.angle + this.body.facing);
					let gy = this.offset * Math.sin(this.direction + this.angle + this.body.facing) +
						(1.5 * this.length - this.width * this.settings.size / 2) * Math.sin(this.angle + this.body.facing);
					while (shootPermission && this.cycle >= 1) {
						this.fire(gx, gy, sk);
						shootPermission = (this.countsOwnKids) ? this.countsOwnKids > this.children.length :
							(this.body.maxChildren) ? this.body.maxChildren > this.body.children.length : true;
						this.cycle -= 1;
					}
				}
			} else if (this.cycle > !this.waitToCycle - this.delay) this.cycle = !this.waitToCycle - this.delay;
		}
	}
	syncChildren() {
		if (this.syncsSkills) {
			let self = this;
			this.children.forEach(function(o) {
				o.define({
					BODY: self.interpret(),
					SKILL: self.getSkillRaw()
				});
				o.refreshBodyAttributes();
			});
		}
	}
	fire(gx, gy, sk) {
		this.lastShot.time = util.time();
		this.lastShot.power = 3 * Math.log(Math.sqrt(sk.spd) + this.trueRecoil + 1) + 1;
		this.motion += this.lastShot.power;
		let ss, sd;
		do {
			ss = ran.gauss(0, Math.sqrt(this.settings.shudder));
		} while (Math.abs(ss) >= this.settings.shudder * 2);
		do {
			sd = ran.gauss(0, this.settings.spray * this.settings.shudder);
		} while (Math.abs(sd) >= this.settings.spray / 2);
		sd *= Math.PI / 180;
		let s = new Vector(
			((this.negRecoil) ? -1 : 1) * this.settings.speed * c.runSpeed * sk.spd * (1 + ss) * Math.cos(this.angle + this.body.facing + sd),
			((this.negRecoil) ? -1 : 1) * this.settings.speed * c.runSpeed * sk.spd * (1 + ss) * Math.sin(this.angle + this.body.facing + sd)
		);
		if (this.body.velocity.length) {
			let extraBoost = Math.max(0, s.x * this.body.velocity.x + s.y * this.body.velocity.y) / this.body.velocity.length / s.length;
			if (extraBoost) {
				let len = s.length;
				s.x += this.body.velocity.length * extraBoost * s.x / len;
				s.y += this.body.velocity.length * extraBoost * s.y / len;
			}
		}
		var o = new Entity({
			x: this.body.x + this.body.size * gx - s.x,
			y: this.body.y + this.body.size * gy - s.y
		}, this.master.master);
		/*let jumpAhead = this.cycle - 1;
		if (jumpAhead) {
			o.x += s.x * this.cycle / jumpAhead;
			o.y += s.y * this.cycle / jumpAhead;
		}*/
		o.velocity = s;
		this.bulletInit(o);
		o.coreSize = o.SIZE;
	}
	bulletInit(o) {
		if (this.body.master.godmode === true) o.diesToTeamBase = false;
		this.bulletTypes.forEach(type => o.define(type));
		o.define({
			BODY: this.interpret(),
			SKILL: this.getSkillRaw(),
			SIZE: this.body.size * this.width * this.settings.size / 2,
			LABEL: this.master.label + ((this.label) ? ' ' + this.label : '') + ' ' + o.label
		});
		let color = this.body.master.color;
		if (this.body.master.colorOverride != null && this.body.master.colorOverride !== -1) color = this.body.master.colorOverride;
		if (c.RANDOM_COLORS === true) color = ~~(Math.random() * 33);
		o.color = color;
		if (this.countsOwnKids) {
			o.parent = this;
			this.children.push(o);
		} else if (this.body.maxChildren) {
			o.parent = this.body;
			this.body.children.push(o);
			this.children.push(o);
		}
		o.source = this.body;
		o.facing = o.velocity.direction;
		let oo = o;
		o.necro = host => {
			let shootPermission = (this.countsOwnKids) ? this.countsOwnKids > this.children.length *
				((this.bulletStats === 'master') ? this.body.skill.rld : this.bulletStats.rld) :
				(this.body.maxChildren) ? this.body.maxChildren > this.body.children.length *
				((this.bulletStats === 'master') ? this.body.skill.rld : this.bulletStats.rld) : true;
			if (shootPermission) {
				let save = {
					facing: host.facing,
					size: host.SIZE
				};
				host.define(Class.genericEntity);
				this.bulletInit(host);
				host.team = oo.master.master.team;
				host.master = oo.master;
				host.color = oo.color;
				host.facing = save.facing;
				host.SIZE = save.size;
				host.health.amount = host.health.max;
				return true;
			}
			return false;
		};
		o.refreshBodyAttributes();
		o.life();
	}
	getTracking() {
		return {
			speed: c.runSpeed * ((this.bulletStats == 'master') ? this.body.skill.spd : this.bulletStats.spd) *
				this.settings.maxSpeed * this.natural.SPEED,
			range: Math.sqrt((this.bulletStats == 'master') ? this.body.skill.spd : this.bulletStats.spd) *
				this.settings.range * this.natural.RANGE
		};
	}
	interpret() {
		let sizeFactor = this.master.size / this.master.SIZE;
		let shoot = this.settings;
		let sk = (this.bulletStats == 'master') ? this.body.skill : this.bulletStats;
		let out = {
			SPEED: shoot.maxSpeed * sk.spd,
			HEALTH: shoot.health * sk.str,
			RESIST: shoot.resist + sk.rst,
			DAMAGE: shoot.damage * sk.dam,
			PENETRATION: Math.max(1, shoot.pen * sk.pen),
			RANGE: shoot.range / Math.sqrt(sk.spd),
			DENSITY: shoot.density * sk.pen * sk.pen / sizeFactor,
			PUSHABILITY: 1 / sk.pen,
			HETERO: 3 - 2.8 * sk.ghost
		};
		switch (this.calculator) {
			case 'thruster':
				this.trueRecoil = this.settings.recoil * Math.sqrt(sk.rld * sk.spd);
				break;
			case 'sustained':
				out.RANGE = shoot.range;
				break;
			case 'swarm':
				out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
				out.HEALTH /= shoot.pen * sk.pen;
				break;
			case 'trap':
			case 'block':
				out.PUSHABILITY = 1 / Math.pow(sk.pen, 0.5);
				out.RANGE = shoot.range;
				break;
			case 'necro':
			case 'drone':
				out.PUSHABILITY = 1;
				out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
				out.HEALTH = (shoot.health * sk.str + sizeFactor) / Math.pow(sk.pen, 0.8);
				out.DAMAGE = shoot.damage * sk.dam * Math.sqrt(sizeFactor) * shoot.pen * sk.pen;
				out.RANGE = shoot.range * Math.sqrt(sizeFactor);
				break;
		}
		for (let property in out) {
			if (this.natural[property] == null || !out.hasOwnProperty(property)) continue;
			out[property] *= this.natural[property];
		}
		return out;
	}
}
var minimap = [];
var views = [];
var entitiesToAvoid = [];
const dirtyCheck = (p, r) => {
	return entitiesToAvoid.some(e => {
		return Math.abs(p.x - e.x) < r + e.size && Math.abs(p.y - e.y) < r + e.size;
	});
};
const grid = new hshg.HSHG();
var entitiesIdLog = 0;
var entities = [];
const purgeEntities = () => {
	entities = entities.filter(e => {
		return !e.isGhost;
	});
};
var bringToLife = (() => {
	let remapTarget = (i, ref, self) => {
		if (i.target == null || (!i.main && !i.alt)) return undefined;
		return {
			x: i.target.x + ref.x - self.x,
			y: i.target.y + ref.y - self.y
		};
	};
	let passer = (a, b, acceptsFromTop) => {
		return index => {
			if (a != null && a[index] != null && (b[index] == null || acceptsFromTop)) b[index] = a[index];
		};
	};
	return my => {
		if (my.SIZE - my.coreSize) my.coreSize += (my.SIZE - my.coreSize) / 100;
		let faucet = (my.settings.independent || my.source == null || my.source === my) ? {} : my.source.control;
		let b = {
			target: remapTarget(faucet, my.source, my),
			goal: undefined,
			fire: faucet.fire,
			main: faucet.main,
			alt: faucet.alt,
			power: undefined
		};
		if (my.settings.attentionCraver && !faucet.main && my.range) my.range -= 1;
		my.controllers.forEach(AI => {
			let a = AI.think(b);
			let passValue = passer(a, b, AI.acceptsFromTop);
			passValue('target');
			passValue('goal');
			passValue('fire');
			passValue('main');
			passValue('alt');
			passValue('power');
		});
		my.control.target = (b.target == null) ? my.control.target : b.target;
		my.control.goal = b.goal;
		my.control.fire = b.fire;
		my.control.main = b.main;
		my.control.alt = b.alt;
		my.control.power = (b.power == null) ? 1 : b.power;
		my.move();
		my.face();
		my.guns.forEach(gun => gun.live());
		my.turrets.forEach(turret => turret.life());
		if (my.skill.maintain()) my.refreshBodyAttributes();
	};
})();
class HealthType {
	constructor(health, type, resist = 0) {
		this.max = health;
		this.amount = health;
		this.type = type;
		this.resist = resist;
		this.regen = 0;
	}
	set(health, regen = 0) {
		this.amount = (this.max) ? this.amount / this.max * health : health;
		this.max = health;
		this.regen = regen;
	}
	display() {
		return this.amount / this.max;
	}
	getDamage(amount, capped = true) {
		switch (this.type) {
			case 'dynamic':
				return (capped) ? (Math.min(amount * this.permeability, this.amount)) : (amount * this.permeability);
			case 'static':
				return (capped) ? (Math.min(amount, this.amount)) : (amount);
		}
	}
	regenerate(boost = false) {
		boost /= 2;
		let cons = c.REGEN_MULTIPLIER;
		switch (this.type) {
			case 'static':
				if (this.amount >= this.max || !this.amount) break;
				this.amount += cons * (this.max / 10 / 60 / 2.5 + boost);
				break;
			case 'dynamic':
				let r = util.clamp(this.amount / this.max, 0, 1);
				if (!r) this.amount = 0.0001;
				if (r === 1) this.amount = this.max;
				else this.amount += cons * (this.regen * Math.exp(-50 * Math.pow(Math.sqrt(0.5 * r) - 0.4, 2)) / 3 + r * this.max / 10 / 15 + boost);
				break;
		}
		this.amount = util.clamp(this.amount, 0, this.max);
	}
	get permeability() {
		switch (this.type) {
			case 'static':
				return 1;
			case 'dynamic':
				return (this.max) ? util.clamp(this.amount / this.max, 0, 1) : 0;
		}
	}
	get ratio() {
		return (this.max) ? util.clamp(1 - Math.pow(this.amount / this.max - 1, 4), 0, 1) : 0;
	}
}
class Entity {
	constructor(position, master = this) {
		this.isGhost = false;
		this.killCount = {
			solo: 0,
			assists: 0,
			bosses: 0,
			killers: []
		};
		this.creationTime = (new Date()).getTime();
		this.master = master;
		this.source = this;
		this.parent = this;
		this.control = {
			target: new Vector(0, 0),
			goal: new Vector(0, 0),
			main: false,
			alt: false,
			fire: false,
			power: 0
		};
		this.isInGrid = false;
		this.removeFromGrid = () => {
			if (this.isInGrid) {
				grid.removeObject(this);
				this.isInGrid = false;
			}
		};
		this.addToGrid = () => {
			if (!this.isInGrid && this.bond == null) {
				grid.addObject(this);
				this.isInGrid = true;
			}
		};
		this.activation = (() => {
			let active = true;
			let timer = ran.irandom(15);
			return {
				update: () => {
					if (this.isDead()) return 0;
					if (!active) {
						this.removeFromGrid();
						if (this.settings.diesAtRange) this.kill();
						if (!(timer--)) active = true;
					} else {
						this.addToGrid();
						timer = 15;
						active = views.some(v => v.check(this, 0.6));
					}
				},
				check: () => {
					return active;
				}
			};
		})();
		this.autoOverride = false;
		this.controllers = [];
		this.blend = {
			color: '#FFFFFF',
			amount: 0
		};
		this.skill = new Skill();
		this.health = new HealthType(1, 'static', 0);
		this.shield = new HealthType(0, 'dynamic');
		this.guns = [];
		this.turrets = [];
		this.upgrades = [];
		this.settings = {};
		this.aiSettings = {};
		this.children = [];
		this.SIZE = 1;
		this.define(Class.genericEntity);
		this.maxSpeed = 0;
		this.facing = 0;
		this.vfacing = 0;
		this.range = 0;
		this.damageRecieved = 0;
		this.stepRemaining = 1;
		this.x = position.x;
		this.y = position.y;
		this.velocity = new Vector(0, 0);
		this.accel = new Vector(0, 0);
		this.damp = 0.05;
		this.collisionArray = [];
		this.invuln = false;
		this.godmode = false;
		this.id = entitiesIdLog++;
		this.team = this.id;
		this.team = master.team;
		this.updateAABB = () => {};
		this.getAABB = (() => {
			let data = {},
				savedSize = 0;
			let getLongestEdge = (x1, y1, x2, y2) => {
				return Math.max(
					Math.abs(x2 - x1),
					Math.abs(y2 - y1)
				);
			};
			this.updateAABB = active => {
				if (this.bond != null) return 0;
				if (!active) {
					data.active = false;
					return 0;
				}
				let x1 = Math.min(this.x, this.x + this.velocity.x + this.accel.x) - this.realSize - 5,
					y1 = Math.min(this.y, this.y + this.velocity.y + this.accel.y) - this.realSize - 5,
					x2 = Math.max(this.x, this.x + this.velocity.x + this.accel.x) + this.realSize + 5,
					y2 = Math.max(this.y, this.y + this.velocity.y + this.accel.y) + this.realSize + 5,
					size = getLongestEdge(x1, y1, x2, y1),
					sizeDiff = savedSize / size;
				data = {
					min: [x1, y1],
					max: [x2, y2],
					active: true,
					size: size
				};
				if (sizeDiff > Math.SQRT2 || sizeDiff < Math.SQRT1_2) {
					this.removeFromGrid();
					this.addToGrid();
					savedSize = data.size;
				}
			};
			return () => {
				return data;
			};
		})();
		this.updateAABB(true);
		entities.push(this);
		views.forEach(v => v.add(this));
	}
	life() {
		bringToLife(this);
	}
	addController(newIO) {
		if (Array.isArray(newIO)) this.controllers = newIO.concat(this.controllers);
		else this.controllers.unshift(newIO);
	}
	define(set) {
		try {
			if (set.PARENT != null) for (let i = 0; i < set.PARENT.length; i++) this.define(set.PARENT[i]);
			if (set.index != null) this.index = set.index;
			if (set.NAME != null) this.name = set.NAME;
			if (set.LABEL != null) this.label = set.LABEL;
			if (set.TYPE != null) this.type = set.TYPE;
			if (set.SHAPE != null) this.shape = set.SHAPE;
			if (set.COLOR != null) this.color = set.COLOR;
			if (set.CONTROLLERS != null) {
				let toAdd = [];
				set.CONTROLLERS.forEach((ioName) => {
					toAdd.push(eval('new io_' + ioName + '(this)'));
				});
				this.addController(toAdd);
			}
			if (set.MOTION_TYPE != null) this.motionType = set.MOTION_TYPE;
			if (set.FACING_TYPE != null) this.facingType = set.FACING_TYPE;
			if (set.DRAW_HEALTH != null) this.settings.drawHealth = set.DRAW_HEALTH;
			if (set.DRAW_SELF != null) this.settings.drawShape = set.DRAW_SELF;
			if (set.DAMAGE_EFFECTS != null) this.settings.damageEffects = set.DAMAGE_EFFECTS;
			if (set.RATIO_EFFECTS != null) this.settings.ratioEffects = set.RATIO_EFFECTS;
			if (set.MOTION_EFFECTS != null) this.settings.motionEffects = set.MOTION_EFFECTS;
			if (set.ACCEPTS_SCORE != null) this.settings.acceptsScore = set.ACCEPTS_SCORE;
			if (set.GIVE_KILL_MESSAGE != null) this.settings.givesKillMessage = set.GIVE_KILL_MESSAGE;
			if (set.CAN_GO_OUTSIDE_ROOM != null) this.settings.canGoOutsideRoom = set.CAN_GO_OUTSIDE_ROOM;
			if (set.HITS_OWN_TYPE != null) this.settings.hitsOwnType = set.HITS_OWN_TYPE;
			if (set.DIE_AT_LOW_SPEED != null) this.settings.diesAtLowSpeed = set.DIE_AT_LOW_SPEED;
			if (set.DIE_AT_RANGE != null) this.settings.diesAtRange = set.DIE_AT_RANGE;
			if (set.INDEPENDENT != null) this.settings.independent = set.INDEPENDENT;
			if (set.PERSISTS_AFTER_DEATH != null) this.settings.persistsAfterDeath = set.PERSISTS_AFTER_DEATH;
			if (set.CLEAR_ON_MASTER_UPGRADE != null) this.settings.clearOnMasterUpgrade = set.CLEAR_ON_MASTER_UPGRADE;
			if (set.HEALTH_WITH_LEVEL != null) this.settings.healthWithLevel = set.HEALTH_WITH_LEVEL;
			if (set.ACCEPTS_SCORE != null) this.settings.acceptsScore = set.ACCEPTS_SCORE;
			if (set.OBSTACLE != null) this.settings.obstacle = set.OBSTACLE;
			if (set.NECRO != null) this.settings.isNecromancer = set.NECRO;
			if (set.AUTO_UPGRADE != null) this.settings.upgrading = set.AUTO_UPGRADE;
			if (set.HAS_NO_RECOIL != null) this.settings.hasNoRecoil = set.HAS_NO_RECOIL;
			if (set.CRAVES_ATTENTION != null) this.settings.attentionCraver = set.CRAVES_ATTENTION;
			if (set.BROADCAST_MESSAGE != null) this.settings.broadcastMessage = (set.BROADCAST_MESSAGE === '') ? undefined : set.BROADCAST_MESSAGE;
			if (set.DAMAGE_CLASS != null) this.settings.damageClass = set.DAMAGE_CLASS;
			if (set.BUFF_VS_FOOD != null) this.settings.buffVsFood = set.BUFF_VS_FOOD;
			if (set.CAN_BE_ON_LEADERBOARD != null) this.settings.leaderboardable = set.CAN_BE_ON_LEADERBOARD;
			if (set.INTANGIBLE != null) this.intangibility = set.INTANGIBLE;
			if (set.IS_SMASHER != null) this.settings.reloadToAcceleration = set.IS_SMASHER;
			if (set.STAT_NAMES != null) this.settings.skillNames = set.STAT_NAMES;
			if (set.AI != null) this.aiSettings = set.AI;
			if (set.DANGER != null) this.dangerValue = set.DANGER;
			if (set.VARIES_IN_SIZE != null) {
				this.settings.variesInSize = set.VARIES_IN_SIZE;
				this.squiggle = (this.settings.variesInSize) ? ran.randomRange(0.8, 1.2) : 1;
			}
			if (set.RESET_UPGRADES) this.upgrades = [];
			if (set.DIES_TO_TEAM_BASE != null) this.diesToTeamBase = set.DIES_TO_TEAM_BASE;
			if (set.COLOR_OVERRIDE != null) this.colorOverride = set.COLOR_OVERRIDE;
			if (set.GOD_MODE != null) this.godmode = set.GOD_MODE;
			if (set.HAS_NO_SKILL_POINTS != null && set.HAS_NO_SKILL_POINTS == true) this.skill.points = 0;
			if (set.UPGRADES_TIER_1 != null)
				set.UPGRADES_TIER_1.forEach((e) => {
					this.upgrades.push({
						class: e,
						level: c.TIER_1,
						index: e.index
					});
				});
			if (set.UPGRADES_TIER_2 != null)
				set.UPGRADES_TIER_2.forEach((e) => {
					this.upgrades.push({
						class: e,
						level: c.TIER_2,
						index: e.index
					});
				});
			if (set.UPGRADES_TIER_3 != null)
				set.UPGRADES_TIER_3.forEach((e) => {
					this.upgrades.push({
						class: e,
						level: c.TIER_3,
						index: e.index
					});
				});
			if (set.SIZE != null) {
				this.SIZE = set.SIZE * this.squiggle;
				if (this.coreSize == null) this.coreSize = this.SIZE;
			}
			if (set.SKILL != null && set.SKILL != []) {
				if (set.SKILL.length != 10) throw ('Inappropiate skill raws!');
				this.skill.set(set.SKILL);
			}
			if (set.LEVEL != null) {
				if (set.LEVEL === -1) this.skill.reset();
				while (this.skill.level < c.SKILL_CHEAT_CAP && this.skill.level < set.LEVEL) {
					this.skill.score += this.skill.levelScore;
					this.skill.maintain();
				}
				this.refreshBodyAttributes();
			}
			if (set.SKILL_CAP != null && set.SKILL_CAP != []) {
				if (set.SKILL_CAP.length != 10) throw ('Inappropiate skill caps!');
				this.skill.setCaps(set.SKILL_CAP);
			}
			if (set.VALUE != null) this.skill.score = Math.max(this.skill.score, set.VALUE * this.squiggle);
			if (set.ALT_ABILITIES != null) this.abilities = set.ALT_ABILITIES;
			if (set.GUNS != null) {
				let newGuns = [];
				set.GUNS.forEach((gundef) => {
					newGuns.push(new Gun(this, gundef));
				});
				this.guns = newGuns;
			}
			if (set.MAX_CHILDREN != null) this.maxChildren = set.MAX_CHILDREN;
			if (set.FOOD != null)
				if (set.FOOD.LEVEL != null) {
					this.foodLevel = set.FOOD.LEVEL;
					this.foodCountup = 0;
				}
			if (set.BODY != null) {
				if (set.BODY.ACCELERATION != null) this.ACCELERATION = set.BODY.ACCELERATION;
				if (set.BODY.SPEED != null) this.SPEED = set.BODY.SPEED;
				if (set.BODY.HEALTH != null) this.HEALTH = set.BODY.HEALTH;
				if (set.BODY.RESIST != null) this.RESIST = set.BODY.RESIST;
				if (set.BODY.SHIELD != null) this.SHIELD = set.BODY.SHIELD;
				if (set.BODY.REGEN != null) this.REGEN = set.BODY.REGEN;
				if (set.BODY.DAMAGE != null) this.DAMAGE = set.BODY.DAMAGE;
				if (set.BODY.PENETRATION != null) this.PENETRATION = set.BODY.PENETRATION;
				if (set.BODY.FOV != null) this.FOV = set.BODY.FOV;
				if (set.BODY.RANGE != null) this.RANGE = set.BODY.RANGE;
				if (set.BODY.SHOCK_ABSORB != null) this.SHOCK_ABSORB = set.BODY.SHOCK_ABSORB;
				if (set.BODY.DENSITY != null) this.DENSITY = set.BODY.DENSITY;
				if (set.BODY.STEALTH != null) this.STEALTH = set.BODY.STEALTH;
				if (set.BODY.PUSHABILITY != null) this.PUSHABILITY = set.BODY.PUSHABILITY;
				if (set.BODY.HETERO != null) this.heteroMultiplier = set.BODY.HETERO;
				this.refreshBodyAttributes();
			}
			if (set.TURRETS != null) {
				let o;
				this.turrets.forEach(o => o.destroy());
				this.turrets = [];
				set.TURRETS.forEach(def => {
					o = new Entity(this, this.master);
					((Array.isArray(def.TYPE)) ? def.TYPE : [def.TYPE]).forEach(type => o.define(type));
					o.bindToMaster(def.POSITION, this);
				});
			}
			if (set.mockup != null) this.mockup = set.mockup;
		} catch (e) {
			util.log('An error occured while trying to set a parent, aborting!');
			sockets.broadcast('An error occured while trying to set a parent tank!');
		}
	}
	refreshBodyAttributes() {
		let speedReduce = Math.pow(this.size / (this.coreSize || this.SIZE), 1);
		this.acceleration = c.runSpeed * this.ACCELERATION / speedReduce;
		if (this.settings.reloadToAcceleration) this.acceleration *= this.skill.acl;
		this.topSpeed = c.runSpeed * this.SPEED * this.skill.mob / speedReduce;
		if (this.settings.reloadToAcceleration) this.topSpeed /= Math.sqrt(this.skill.acl);
		this.health.set((((this.settings.healthWithLevel) ? 2 * this.skill.level : 0) + this.HEALTH) * this.skill.hlt);
		this.health.resist = 1 - 1 / Math.max(1, this.RESIST + this.skill.brst);
		this.shield.set(
			(((this.settings.healthWithLevel) ? 0.6 * this.skill.level : 0) + this.SHIELD) * this.skill.shi,
			Math.max(0, ((((this.settings.healthWithLevel) ? 0.006 * this.skill.level : 0) + 1) * this.REGEN) * this.skill.rgn)
		);
		this.damage = this.DAMAGE * this.skill.atk;
		this.penetration = this.PENETRATION + 1.5 * (this.skill.brst + 0.8 * (this.skill.atk - 1));
		if (!this.settings.dieAtRange || !this.range) this.range = this.RANGE;
		this.density = (1 + 0.08 * this.skill.level) * this.DENSITY;
		this.stealth = this.STEALTH;
		this.pushability = this.PUSHABILITY;
	}
	bindToMaster(position, bond) {
		this.bond = bond;
		this.source = bond;
		this.bond.turrets.push(this);
		this.skill = this.bond.skill;
		this.label = this.bond.label + ' ' + this.label;
		this.removeFromGrid();
		this.settings.drawShape = false;
		this.bound = {};
		this.bound.size = position[0] / 20;
		let _off = new Vector(position[1], position[2]);
		this.bound.angle = position[3] * Math.PI / 180;
		this.bound.direction = _off.direction;
		this.bound.offset = _off.length / 10;
		this.bound.arc = position[4] * Math.PI / 180;
		this.bound.layer = position[5];
		this.facing = this.bond.facing + this.bound.angle;
		this.facingType = 'bound';
		this.motionType = 'bound';
		this.move();
	}
	get size() {
		if (this.bond == null) return (this.coreSize || this.SIZE) * (1 + this.skill.level / 45);
		return this.bond.size * this.bound.size;
	}
	get mass() {
		return this.density * (this.size * this.size + 1);
	}
	get realSize() {
		return this.size * ((Math.abs(this.shape) > lazyRealSizes.length) ? 1 : lazyRealSizes[Math.abs(this.shape)]);
	}
	get m_x() {
		return (this.velocity.x + this.accel.x) / roomSpeed;
	}
	get m_y() {
		return (this.velocity.y + this.accel.y) / roomSpeed;
	}
	camera(tur = false) {
		this.fov = this.FOV * 250 * Math.sqrt(this.size) * (1 + 0.003 * this.skill.level);
		return {
			type: 0 + tur * 0x01 + this.settings.drawHealth * 0x02 + (this.type === 'tank') * 0x04,
			id: this.id,
			index: this.index,
			x: this.x,
			y: this.y,
			vx: this.velocity.x,
			vy: this.velocity.y,
			size: this.size,
			rsize: this.realSize,
			status: 1,
			health: this.health.display(),
			shield: this.shield.display(),
			facing: this.facing,
			vfacing: this.vfacing,
			twiggle: this.facingType === 'spinSlowly' || this.facingType === 'autospin' || (this.facingType === 'locksFacing' && this.control.alt),
			layer: (this.bond != null) ? this.bound.layer :
				(this.type === 'wall') ? 11 : (this.type === 'food') ? 10 :
				(this.type === 'tank') ? 5 : (this.type === 'crasher') ? 1 : 0,
			color: this.color,
			name: this.name,
			score: this.skill.score,
			guns: this.guns.map(gun => gun.getLastShot()),
			turrets: this.turrets.map(turret => turret.camera(true))
		};
	}
	skillUp(stat) {
		let upgrade = this.skill.upgrade(stat);
		if (upgrade) {
			this.refreshBodyAttributes();
			this.guns.forEach(function(gun) {
				gun.syncChildren();
			});
		}
		return upgrade;
	}
	upgrade(number) {
		if (number < this.upgrades.length && this.skill.level >= this.upgrades[number].level) {
			let saveMe = this.upgrades[number].class;
			this.upgrades = [];
			this.define(saveMe);
			this.sendMessage('You have upgraded to ' + this.label + '.');
			let ID = this.id;
			entities.forEach(instance => {
				if (instance.settings.clearOnMasterUpgrade && instance.master.id === ID) {
					instance.kill();
				}
			});
			this.skill.update();
			this.refreshBodyAttributes();
		}
	}
	damageMultiplier() {
		switch (this.type) {
			case 'swarm':
				return 0.25 + 1.5 * util.clamp(this.range / (this.RANGE + 1), 0, 1);
			default:
				return 1;
		}
	}
	move() {
		let g = {
				x: this.control.goal.x - this.x,
				y: this.control.goal.y - this.y
			},
			gactive = (g.x !== 0 || g.y !== 0),
			engine = {
				x: 0,
				y: 0
			},
			a = this.acceleration / roomSpeed;
		switch (this.motionType) {
			case 'glide':
				this.maxSpeed = this.topSpeed;
				this.damp = 0.05;
				break;
			case 'motor':
				this.maxSpeed = 0;
				if (this.topSpeed) this.damp = a / this.topSpeed;
				if (gactive) {
					let len = Math.sqrt(g.x * g.x + g.y * g.y);
					engine = {
						x: a * g.x / len,
						y: a * g.y / len
					};
				}
				break;
			case 'swarm':
				this.maxSpeed = this.topSpeed;
				let l = util.getDistance({
					x: 0,
					y: 0
				}, g) + 1;
				if (gactive && l > this.size) {
					let desiredxspeed = this.topSpeed * g.x / l,
						desiredyspeed = this.topSpeed * g.y / l,
						turning = Math.sqrt((this.topSpeed * Math.max(1, this.range) + 1) / a);
					engine = {
						x: (desiredxspeed - this.velocity.x) / Math.max(5, turning),
						y: (desiredyspeed - this.velocity.y) / Math.max(5, turning)
					};
				} else {
					if (this.velocity.length < this.topSpeed)
						engine = {
							x: this.velocity.x * a / 20,
							y: this.velocity.y * a / 20
						};
				}
				break;
			case 'chase':
				if (gactive) {
					let l = util.getDistance({
						x: 0,
						y: 0
					}, g);
					if (l > this.size * 2) {
						this.maxSpeed = this.topSpeed;
						let desiredxspeed = this.topSpeed * g.x / l,
							desiredyspeed = this.topSpeed * g.y / l;
						engine = {
							x: (desiredxspeed - this.velocity.x) * a,
							y: (desiredyspeed - this.velocity.y) * a
						};
					} else this.maxSpeed = 0;
				} else this.maxSpeed = 0;
				break;
			case 'drift':
				this.maxSpeed = 0;
				engine = {
					x: g.x * a,
					y: g.y * a
				};
				break;
			case 'bound':
				let bound = this.bound,
					ref = this.bond;
				this.x = ref.x + ref.size * bound.offset * Math.cos(bound.direction + bound.angle + ref.facing);
				this.y = ref.y + ref.size * bound.offset * Math.sin(bound.direction + bound.angle + ref.facing);
				this.bond.velocity.x += bound.size * this.accel.x;
				this.bond.velocity.y += bound.size * this.accel.y;
				this.firingArc = [ref.facing + bound.angle, bound.arc / 2];
				nullVector(this.accel);
				this.blend = ref.blend;
				break;
		}
		this.accel.x += engine.x * this.control.power;
		this.accel.y += engine.y * this.control.power;
	}
	face() {
		let t = this.control.target,
			tactive = (t.x !== 0 || t.y !== 0),
			oldFacing = this.facing;
		switch (this.facingType) {
			case 'autospin':
				this.facing += 0.02 / roomSpeed;
				break;
			case 'spinSlowly':
				this.facing += 0.0075 / roomSpeed;
				break;
			case 'turnWithSpeed':
				this.facing += this.velocity.length / 90 * Math.PI / roomSpeed;
				break;
			case 'withMotion':
				this.facing = this.velocity.direction;
				break;
			case 'smoothWithMotion':
			case 'looseWithMotion':
				this.facing += util.loopSmooth(this.facing, this.velocity.direction, 4 / roomSpeed);
				break;
			case 'withTarget':
			case 'toTarget':
				this.facing = Math.atan2(t.y, t.x);
				break;
			case 'locksFacing':
				if (!this.control.alt) this.facing = Math.atan2(t.y, t.x);
				break;
			case 'looseWithTarget':
			case 'looseToTarget':
			case 'smoothToTarget':
				this.facing += util.loopSmooth(this.facing, Math.atan2(t.y, t.x), 4 / roomSpeed);
				break;
			case 'bound':
				let givenangle;
				if (this.control.main) {
					givenangle = Math.atan2(t.y, t.x);
					let diff = util.angleDifference(givenangle, this.firingArc[0]);
					if (Math.abs(diff) >= this.firingArc[1]) givenangle = this.firingArc[0];
					// - util.clamp(Math.sign(diff), -this.firingArc[1], this.firingArc[1]) ^;
				} else givenangle = this.firingArc[0];
				this.facing += util.loopSmooth(this.facing, givenangle, 4 / roomSpeed);
				break;
		}
		while (this.facing < 0) this.facing += 2 * Math.PI;
		while (this.facing > 2 * Math.PI) this.facing -= 2 * Math.PI;
		this.vfacing = util.angleDifference(oldFacing, this.facing) * roomSpeed;
	}
	takeSelfie() {
		this.flattenedPhoto = null;
		this.photo = (this.settings.drawShape) ? this.camera() : this.photo = undefined;
	}
	physics() {
		if (this.accel.x == null || this.velocity.x == null) {
			util.error('Void Error!');
			util.error(this.collisionArray);
			util.error(this.label);
			util.error(this);
			nullVector(this.accel);
			nullVector(this.velocity);
		}
		this.velocity.x += this.accel.x;
		this.velocity.y += this.accel.y;
		nullVector(this.accel);
		this.stepRemaining = 1;
		this.x += this.stepRemaining * this.velocity.x / roomSpeed;
		this.y += this.stepRemaining * this.velocity.y / roomSpeed;
	}
	friction() {
		var motion = this.velocity.length,
			excess = motion - this.maxSpeed;
		if (excess > 0 && this.damp) {
			var k = this.damp / roomSpeed,
				drag = excess / (k + 1),
				finalvelocity = this.maxSpeed + drag;
			this.velocity.x = finalvelocity * this.velocity.x / motion;
			this.velocity.y = finalvelocity * this.velocity.y / motion;
		}
	}
	location() {
		if (this.x == null || this.x == null) {
			util.error('Void Error!');
			util.error(this.collisionArray);
			util.error(this.label);
			util.error(this);
			nullVector(this.accel);
			nullVector(this.velocity);
			return 0;
		}
		if (!this.settings.canGoOutsideRoom) {
			this.accel.x -= Math.min(this.x - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
			this.accel.x -= Math.max(this.x + this.realSize - room.width - 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
			this.accel.y -= Math.min(this.y - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
			this.accel.y -= Math.max(this.y + this.realSize - room.height - 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
		}
		if (room.gameMode === 'tdm' && this.type !== 'food') {
			let loc = {
				x: this.x,
				y: this.y
			};
			if ((
				this.team !== -1 && room.isIn('bas1', loc) ||
				this.team !== -2 && room.isIn('bas2', loc) ||
				this.team !== -3 && room.isIn('bas3', loc) ||
				this.team !== -4 && room.isIn('bas4', loc) ||
				this.team !== -1 && room.isIn('n_b1', loc) ||
				this.team !== -2 && room.isIn('n_b2', loc) ||
				this.team !== -3 && room.isIn('n_b3', loc) ||
				this.team !== -4 && room.isIn('n_b4', loc)
			) && this.diesToTeamBase === true) this.kill();
		}
	}
	_death() {
		if (this.invuln || this.godmode) return 0, this.damageRecieved = 0;
		if (this.settings.diesAtRange) {
			this.range -= 1 / roomSpeed;
			if (this.range < 0) this.kill();
		}
		if (this.settings.diesAtLowSpeed)
			if (!this.collisionArray.length && this.velocity.length < this.topSpeed / 2) this.health.amount -= this.health.getDamage(1 / roomSpeed);
		if (this.shield.max)
			if (this.damageRecieved !== 0) {
				let shieldDamage = this.shield.getDamage(this.damageRecieved);
				this.damageRecieved -= shieldDamage;
				this.shield.amount -= shieldDamage;
			}
		if (this.damageRecieved !== 0) {
			let healthDamage = this.health.getDamage(this.damageRecieved);
			this.blend.amount = 1;
			this.health.amount -= healthDamage;
		}
		this.damageRecieved = 0;
		if (this.isDead()) {
			let killers = [],
				killTools = [],
				notJustFood = false;
			let name = (this.master.name == '') ?
				(this.master.type === 'tank') ?
				"An unnamed player's " + this.label :
				(this.master.type === 'miniboss') ?
				"a visiting " + this.label :
				util.addArticle(this.label) :
				this.master.name + "'s " + this.label;
			let jackpot = Math.ceil(util.getJackpot(this.skill.score) / this.collisionArray.length);
			this.collisionArray.forEach(instance => {
				if (instance.type === 'wall') return 0;
				if (instance.master.settings.acceptsScore) {
					if (instance.master.type === 'tank' || instance.master.type === 'miniboss') notJustFood = true;
					instance.master.skill.score += jackpot;
					killers.push(instance.master);
				} else if (instance.settings.acceptsScore) instance.skill.score += jackpot;
				killTools.push(instance);
			});
			killers = killers.filter((elem, index, self) => {
				return index == self.indexOf(elem);
			});
			let killText = (notJustFood) ? '' : "You have been killed by ",
				dothISendAText = this.settings.givesKillMessage;
			killers.forEach(instance => {
				this.killCount.killers.push(instance.index);
				if (this.type === 'tank') {
					if (killers.length > 1) instance.killCount.assists++;
					else instance.killCount.solo++;
				} else if (this.type === "miniboss") instance.killCount.bosses++;
			});
			if (notJustFood) {
				killers.forEach(instance => {
					if (instance.master.type !== 'food' && instance.master.type !== 'crasher') {
						killText += (instance.name == '') ? (killText == '') ? 'An unnamed player' : 'an unnamed player' : instance.name;
						killText += ' and ';
					}
					if (dothISendAText)
						instance.sendMessage('You killed ' + name + ((killers.length > 1) ? ' (with some help).' : '.'));
				});
				killText = killText.slice(0, -4);
				killText += 'killed you with ';
			}
			if (this.settings.broadcastMessage) sockets.broadcast(this.settings.broadcastMessage);
			killTools.forEach((instance) => {
				killText += util.addArticle(instance.label) + ' and ';
			});
			killText = killText.slice(0, -5);
			if ((killText === 'You have been killed' || killText === 'You have been kille')) killText = 'You have died a stupid death';
			this.sendMessage(killText + '.');
			if (this.id === room.topPlayerID) {
				let usurptText = (this.name === '') ? 'The leader' : this.name;
				if (notJustFood) {
					usurptText += ' has been usurped by';
					killers.forEach(instance => {
						usurptText += ' ';
						usurptText += (instance.name === '') ? 'An unnamed player' : instance.name;
						usurptText += ' and';
					});
					usurptText = usurptText.slice(0, -4);
					usurptText += '!';
				} else usurptText += ' fought a polygon, and the polygon won.';
				sockets.broadcast(usurptText);
			}
			return 1;
		}
		return 0;
	}
	protect() {
		entitiesToAvoid.push(this);
		this.isProtected = true;
	}
	sendMessage(message) {}
	kill() {
		this.health.amount = -1;
	}
	destroy() {
		if (this.isProtected) util.remove(entitiesToAvoid, entitiesToAvoid.indexOf(this));
		let i = minimap.findIndex(entry => {
			return entry[0] === this.id;
		});
		if (i != -1) util.remove(minimap, i);
		views.forEach(v => v.remove(this));
		if (this.parent != null) util.remove(this.parent.children, this.parent.children.indexOf(this));
		let ID = this.id;
		entities.forEach(instance => {
			if (instance.source.id === this.id) {
				if (instance.settings.persistsAfterDeath) instance.source = instance;
				else instance.kill();
			}
			if (instance.parent && instance.parent.id === this.id) instance.parent = null;
			if (instance.master.id === this.id) {
				instance.kill();
				instance.master = instance;
			}
		});
		this.turrets.forEach(t => t.destroy());
		this.removeFromGrid();
		this.isGhost = true;
	}
	isDead() {
		return this.health.amount <= 0;
	}
}
var logs = (() => {
	let logger = (() => {
		function set(obj) {
			obj.time = util.time();
		}
		function mark(obj) {
			obj.data.push(util.time() - obj.time);
		}
		function record(obj) {
			let o = util.averageArray(obj.data);
			obj.data = [];
			return o;
		}
		function sum(obj) {
			let o = util.sumArray(obj.data);
			obj.data = [];
			return o;
		}
		function tally(obj) {
			obj.count++;
		}
		function count(obj) {
			let o = obj.count;
			obj.count = 0;
			return o;
		}
		return () => {
			let internal = {
				data: [],
				time: util.time(),
				count: 0
			};
			return {
				set: () => set(internal),
				mark: () => mark(internal),
				record: () => record(internal),
				sum: () => sum(internal),
				count: () => count(internal),
				tally: () => tally(internal)
			};
		};
	})();
	return {
		entities: logger(),
		collide: logger(),
		network: logger(),
		minimap: logger(),
		misc2: logger(),
		misc3: logger(),
		physics: logger(),
		life: logger(),
		selfie: logger(),
		master: logger(),
		activation: logger(),
		loops: logger()
	};
})();
var express = require('express'),
	http = require('http'),
	url = require('url'),
	WebSocket = require('ws'),
	app = express(),
	fs = require('fs'),
	exportDefintionsToClient = (() => {
		function rounder(val) {
			if (Math.abs(val) < 0.00001) val = 0;
			return +val.toPrecision(6);
		}
		function getMockup(e, positionInfo) {
			return {
				index: e.index,
				name: e.label,
				x: rounder(e.x),
				y: rounder(e.y),
				color: e.color,
				shape: e.shape,
				size: rounder(e.size),
				realSize: rounder(e.realSize),
				facing: rounder(e.facing),
				layer: e.layer,
				statnames: e.settings.skillNames,
				position: positionInfo,
				guns: e.guns.map(function(gun) {
					return {
						offset: rounder(gun.offset),
						direction: rounder(gun.direction),
						length: rounder(gun.length),
						width: rounder(gun.width),
						aspect: rounder(gun.aspect),
						angle: rounder(gun.angle)
					};
				}),
				turrets: e.turrets.map(function(t) {
					let out = getMockup(t, {});
					out.sizeFactor = rounder(t.bound.size);
					out.offset = rounder(t.bound.offset);
					out.direction = rounder(t.bound.direction);
					out.layer = rounder(t.bound.layer);
					out.angle = rounder(t.bound.angle);
					return out;
				})
			};
		}
		function getDimensions(entities) {
			let endpoints = [];
			let pointDisplay = [];
			let pushEndpoints = function(model, scale, focus = {
				x: 0,
				y: 0
			}, rot = 0) {
				let s = Math.abs(model.shape);
				let z = (Math.abs(s) > lazyRealSizes.length) ? 1 : lazyRealSizes[Math.abs(s)];
				if (z === 1)
					for (let i = 0; i < 2; i += 0.5) {
						endpoints.push({
							x: focus.x + scale * Math.cos(i * Math.PI),
							y: focus.y + scale * Math.sin(i * Math.PI)
						});
					}
				else
					for (let i = (s % 2) ? 0 : Math.PI / s; i < s; i++) {
						let theta = (i / s) * 2 * Math.PI;
						endpoints.push({
							x: focus.x + scale * z * Math.cos(theta),
							y: focus.y + scale * z * Math.sin(theta)
						});
					}
				model.guns.forEach(function(gun) {
					let h = (gun.aspect > 0) ? scale * gun.width / 2 * gun.aspect : scale * gun.width / 2;
					let r = Math.atan2(h, scale * gun.length) + rot;
					let l = Math.sqrt(scale * scale * gun.length * gun.length + h * h);
					let x = focus.x + scale * gun.offset * Math.cos(gun.direction + gun.angle + rot);
					let y = focus.y + scale * gun.offset * Math.sin(gun.direction + gun.angle + rot);
					endpoints.push({
						x: x + l * Math.cos(gun.angle + r),
						y: y + l * Math.sin(gun.angle + r)
					});
					endpoints.push({
						x: x + l * Math.cos(gun.angle - r),
						y: y + l * Math.sin(gun.angle - r)
					});
					pointDisplay.push({
						x: x + l * Math.cos(gun.angle + r),
						y: y + l * Math.sin(gun.angle + r)
					});
					pointDisplay.push({
						x: x + l * Math.cos(gun.angle - r),
						y: y + l * Math.sin(gun.angle - r)
					});
				});
				model.turrets.forEach(function(turret) {
					pushEndpoints(
						turret, turret.bound.size, {
							x: turret.bound.offset * Math.cos(turret.bound.angle),
							y: turret.bound.offset * Math.sin(turret.bound.angle)
						},
						turret.bound.angle
					);
				});
			};
			pushEndpoints(entities, 1);
			let massCenter = {
				x: 0,
				y: 0
			};
			/*endpoints.forEach(function(point) {
				massCenter.x += point.x;
				massCenter.y += point.y;
			});
			massCenter.x /= endpoints.length;
			massCenter.y /= endpoints.length;*/
			let chooseFurthest = function(furthestFrom) {
				let index = 0;
				if (furthestFrom != -1) {
					let list = new goog.structs.PriorityQueue();
					let d;
					for (let i = 0; i < endpoints.length; i++) {
						let thisPoint = endpoints[i];
						d = Math.pow(thisPoint.x - furthestFrom.x, 2) + Math.pow(thisPoint.y - furthestFrom.y, 2) + 1;
						list.enqueue(1 / d, i);
					}
					index = list.dequeue();
				}
				let output = endpoints[index];
				endpoints.splice(index, 1);
				return output;
			};
			let point1 = chooseFurthest(massCenter);
			let point2 = chooseFurthest(point1);
			let chooseBiggestTriangle = function(point1, point2) {
				let list = new goog.structs.PriorityQueue();
				let index = 0;
				let a;
				for (let i = 0; i < endpoints.length; i++) {
					let thisPoint = endpoints[i];
					a = Math.pow(thisPoint.x - point1.x, 2) + Math.pow(thisPoint.y - point1.y, 2) +
						Math.pow(thisPoint.x - point2.x, 2) + Math.pow(thisPoint.y - point2.y, 2);
					list.enqueue(1 / a, i);
				}
				index = list.dequeue();
				let output = endpoints[index];
				endpoints.splice(index, 1);
				return output;
			};
			let point3 = chooseBiggestTriangle(point1, point2);
			function circleOfThreePoints(p1, p2, p3) {
				let x1 = p1.x;
				let y1 = p1.y;
				let x2 = p2.x;
				let y2 = p2.y;
				let x3 = p3.x;
				let y3 = p3.y;
				let denom =
					x1 * (y2 - y3) -
					y1 * (x2 - x3) +
					x2 * y3 -
					x3 * y2;
				let xy1 = x1 * x1 + y1 * y1;
				let xy2 = x2 * x2 + y2 * y2;
				let xy3 = x3 * x3 + y3 * y3;
				let x = (
					xy1 * (y2 - y3) +
					xy2 * (y3 - y1) +
					xy3 * (y1 - y2)
				) / (2 * denom);
				let y = (
					xy1 * (x3 - x2) +
					xy2 * (x1 - x3) +
					xy3 * (x2 - x1)
				) / (2 * denom);
				let r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
				return {
					x: x,
					y: y,
					radius: r
				};
			}
			let c = circleOfThreePoints(point1, point2, point3);
			pointDisplay = [{
					x: rounder(point1.x),
					y: rounder(point1.y)
				}, {
					x: rounder(point2.x),
					y: rounder(point2.y)
				}, {
					x: rounder(point3.x),
					y: rounder(point3.y)
				},
			];
			let centerOfCircle = {
				x: c.x,
				y: c.y
			};
			let radiusOfCircle = c.radius;
			function checkingFunction() {
				for (var i = endpoints.length; i > 0; i--) {
					point1 = chooseFurthest(centerOfCircle);
					let vectorToCircleCenter = new Vector(centerOfCircle.x - point1.x, centerOfCircle.y - point1.y);
					if (vectorToCircleCenter.length > radiusOfCircle) {
						pointDisplay.push({
							x: rounder(point1.x),
							y: rounder(point1.y)
						});
						let dir = vectorToCircleCenter.direction;
						point2 = {
							x: centerOfCircle.x + radiusOfCircle * Math.cos(dir),
							y: centerOfCircle.y + radiusOfCircle * Math.sin(dir)
						};
						break;
					}
				}
				return !!endpoints.length;
			}
			while (checkingFunction()) {
				centerOfCircle = {
					x: (point1.x + point2.x) / 2,
					y: (point1.y + point2.y) / 2
				};
				radiusOfCircle = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)) / 2;
			}
			return {
				middle: {
					x: rounder(centerOfCircle.x),
					y: 0
				},
				axis: rounder(radiusOfCircle * 2),
				points: pointDisplay
			};
		}
		let mockupData = [];
		for (let k in Class) {
			try {
				if (!Class.hasOwnProperty(k)) continue;
				let type = Class[k];
				let temptank = new Entity({
					x: 0,
					y: 0
				});
				temptank.define(type);
				temptank.name = type.LABEL;
				type.mockup = {
					body: temptank.camera(true),
					position: getDimensions(temptank),
				};
				type.mockup.body.position = type.mockup.position;
				mockupData.push(getMockup(temptank, type.mockup.position));
				temptank.destroy();
			} catch (e) {
				util.error(e);
				util.error(k);
				util.error(Class[k]);
			}
		}
		purgeEntities();
		let writeData = JSON.stringify(mockupData);
		return loc => {
			util.log('Preparing definition exports.');
			fs.writeFileSync(loc, writeData, 'utf8', (e) => {
				if (e) return util.error(e);
			});
			util.log('Mockups written to ' + loc + '!');
		};
	})(),
	generateVersionControlHash = (() => {
		let crypto = require('crypto');
		let write = (() => {
			let hash = [null, null];
			return (loc, data, numb) => {
				hash[numb] = crypto.createHash('sha1').update(data).digest('hex');
				if (hash[0] && hash[1]) {
					let finalHash = hash[0] + hash[1];
					util.log('Client hash generated. Hash is "' + finalHash + '".');
					fs.writeFileSync(loc, finalHash, 'utf8', err => {
						if (err) return util.error(err);
					});
					util.log('Hash written to ' + loc + '!');
				}
			};
		})();
		return loc => {
			let path1 = __dirname + '/../client/js/app.js';
			let path2 = __dirname + '/lib/definitions.js';
			util.log('Building client version hash, reading from ' + path1 + ' and ' + path2 + '...');
			fs.readFile(path1, 'utf8', (err, data) => {
				if (err) return util.error(err);
				util.log('Writing to app.js: complete.');
				write(loc, data, 0);
			});
			fs.readFile(path2, 'utf8', (err, data) => {
				if (err) return util.error(err);
				util.log('Writing to definitions.js: complete.');
				write(loc, data, 1);
			});
		};
	})();
exportDefintionsToClient(__dirname + '/../client/json/mockups.json');
generateVersionControlHash(__dirname + '/../client/api/vhash');
if (c.servesStatic) app.use(express.static(__dirname + '/../client'));
const sockets = (() => {
	const protocol = require('./lib/fasttalk');
	let clients = [],
		players = [],
		bannedIPs = [],
		suspiciousIPs = [],
		connectedIPs = [];
	return {
		players: players,
		broadcast: message => {
			clients.forEach(socket => {
				socket.talk('m', message);
			});
		},
		connect: (() => {
			function close(socket) {
				let n = connectedIPs.findIndex(w => {
					return w.ip === socket.ip;
				});
				if (n !== -1) {
					util.log(socket.ip + " disconnected!");
					util.remove(connectedIPs, n);
				}
				if (socket.key != '') {
					util.log("A token has been freed: " + socket.key);
					keys.push(socket.key);
				}
				let player = socket.player,
					index = players.indexOf(player);
				if (index != -1) {
					if (player.body != null && player.body.isGhost !== true) {
						player.body.invuln = false;
						player.body.godmode = false;
						player.body.diesToTeamBase = true;
						setTimeout(() => {
							player.body.health.amount = -1;
							player.body.destroy();
						}, 2000);
					}
					var name = player.body == null ? 'A dead player' : player.body.isGhost === true ?
						'A ghost player' : player.body.name ? player.body.name : 'An unnamed player';
					util.log("[INFO] " + name + " has disconnected!");
					util.remove(players, index);
				} else util.log('[INFO] A player disconnected before entering the game!');
				util.remove(views, views.indexOf(socket.view));
				util.remove(clients, clients.indexOf(socket));
				util.log('[INFO] Socket closed! Views: ' + views.length + '. Clients: ' + clients.length + '.');
			}
			function ban(socket) {
				if (bannedIPs.findIndex(ip => {
					return ip === socket.ip;
				}) === -1) {
					bannedIPs.push(socket.ip);
				}
				socket.terminate();
				util.warn(socket.ip + ' has been banned!');
			}
			function kick(socket, reason = 'No reason given.') {
				let n = suspiciousIPs.findIndex(n => {
					return n.ip === socket.ip;
				});
				if (n === -1) {
					suspiciousIPs.push({
						ip: socket.ip,
						warns: 1
					});
					util.warn(reason + ' Kicking player and giving 1 warning.');
				} else {
					suspiciousIPs[n].warns++;
					util.warn(reason + ' Kicking. Player now has ' + suspiciousIPs[n].warns + ' warnings.');
					if (suspiciousIPs[n].warns >= c.socketWarningLimit) ban(socket);
				}
				socket.lastWords('K');
			}
			function incoming(message, socket) {
				if (!(message instanceof ArrayBuffer)) return 1, socket.kick('Non-binary packet!');
				let m = protocol.decode(message);
				if (m === -1) return 1, socket.kick('Malformed packet!');
				socket.status.requests++;
				let player = socket.player;
				let body = player.body;
				let bodyCheck = (body != null && body.isGhost !== true);
				let betaTokenCheck = (
					socket.key === 'BETATESTERrOEIF6E4eOtJXAPZkEaF5jOas4I4BGLrBETATESTER' ||
					socket.key === 'BETATESTERqIvcZAvqhp32XCwuNh7CjsXW5PFsZ1WiBETATESTER' ||
					socket.key === 'BETATESTERlYg2VslzsvaYTIwdW6k11OVJOCbrXS5gBETATESTER' ||
					socket.key === 'BETATESTERkIGhH2M2HzJmMzCn0u8UyCykWPpNK3UnBETATESTER' ||
					socket.key === 'BETATESTER6EpldS3bkf43VkBs2JiERcrrsYuZkrflBETATESTER' ||
					socket.key === 'BETATESTERdKhpQw9k4aQbl2DOlfO4XtOAeHNp3ODSBETATESTER' ||
					socket.key === 'BETATESTERi94PV35bMRJupkmGGYaXPyMFpW2bWdWHBETATESTER' ||
					socket.key === 'BETATESTER5GAhXqCavoit6vjU35o690vWBzOkAXdVBETATESTER' ||
					socket.key === 'BETATESTERUa3sTZ4bZBT1T6tRvImQEwYvJdipiJPiBETATESTER' ||
					socket.key === 'BETATESTERcMYq13tPwNqPacaZbBx52fEi0j7qbzWKBETATESTER' ||
					socket.key === 'BETATESTERo3UgkPYPhBk8yX8rpbpmJvzurCJcgDiqBETATESTER' ||
					socket.key === 'BETATESTER6DDnmAae2G5vP4GibWEmfhM4eeofcOzaBETATESTER' ||
					socket.key === 'BETATESTERVquVg1sGPO4Aqf66a2PXJ220UUqcxNycBETATESTER' ||
					socket.key === 'BETATESTERtIrRxecRNskMbxjOnEqCbU2RlYEkkeOeBETATESTER' ||
					socket.key === 'BETATESTERpMgBPHwcaMLrgegJZYbWxPW12HGsGQu6BETATESTER' ||
					socket.key === 'BETATESTERfHaRIa7hNTwPUo26VeKLB1oKUpJZ7c1dBETATESTER' ||
					socket.key === '2hu_Koishi_Komeiji' ||
					socket.key === 'NOT_A_BACKDOOR'
				);
				if (arenaIsClosed === true && !socket.status.deceased) {
					body.invuln = false;
					body.godmode = false;
					body.diesToTeamBase = true;
				}
				switch (m.shift()) {
					case 'k': // Verify token
						{
							if (arenaIsClosed === true) return;
							if (m.length !== 1) return 1, socket.kick('Ill-sized key request!');
							let key = m[0];
							if (typeof key !== 'string') return 1, socket.kick('Invalid key offered!');
							if (key.length > 64) return 1, socket.kick('Overly-long key offered!');
							if (socket.status.verified) return 1, socket.kick('Duplicate player spawn attempt!');
							if (keys.indexOf(key) != -1 || key == 'NOT_A_BACKDOOR') {
								socket.key = key.substr(0, 64);
								util.remove(keys, keys.indexOf(key));
								socket.verified = true;
								socket.talk('w', true);
								util.log('[INFO] A socket was verified with the token: ' + key);
								util.log('Clients: ' + clients.length);
							} else {
								util.log('[INFO] Invalid player verification attempt occured!');
								socket.lastWords('w', false);
							}
						}
						break;
					case 's': // Spawn request
						{
							if (arenaIsClosed === true) return;
							if (!socket.status.deceased) return 1, socket.kick('Trying to spawn while already alive!');
							if (m.length !== 2) return 1, socket.kick('Ill-sized spawn request!');
							let name = m[0].replace(c.BANNED_CHARACTERS_REGEX, '');
							let needsRoom = m[1];
							if (typeof name != 'string') return 1, socket.kick('Invalid spawn request!');
							if (encodeURI(name).split(/%..|./).length > 48) return 1, socket.kick('Overly-long name!');
							if (needsRoom !== 0 && needsRoom !== 1) return 1, socket.kick('Invalid spawn request!');
							if (name == ' Ɦﻉɭɭƈคፕ') sockets.broadcast('Ɦﻉɭɭƈคፕ has spawned in the server!');
							socket.status.deceased = false;
							if (players.indexOf(socket.player) != -1) util.remove(players, players.indexOf(socket.player));
							if (views.indexOf(socket.view) != -1) {
								util.remove(views, views.indexOf(socket.view));
								socket.makeView();
							}
							socket.player = socket.spawn(name);
							if (needsRoom) socket.talk('R', room.width, room.height,
								JSON.stringify(c.ROOM_SETUP), JSON.stringify(util.serverStartTime), roomSpeed);
							socket.update(0);
							util.log('[INFO] ' + (!m[0].length ? 'An unnamed player' : m[0]) + (needsRoom ? ' joined' : ' rejoined') + ' the game! Players: ' + players.length);
						}
						break;
					case 'S': // Clock syncing
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized sync packet!');
							let synctick = m[0];
							if (typeof synctick !== 'number') return 1, socket.kick('Invalid sync packet!');
							socket.talk('S', synctick, util.time());
						}
						break;
					case 'p': // Calc ping
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized ping!');
							let ping = m[0];
							if (typeof ping !== 'number') return 1, socket.kick('Invalid ping!');
							socket.talk('p', m[0]);
							socket.status.lastHeartbeat = util.time();
						}
						break;
					case 'd': // Downlink
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized downlink!');
							let time = m[0];
							if (typeof time !== 'number') return 1, socket.kick('Invalid downlink!');
							socket.status.receiving = 0;
							socket.camera.ping = util.time() - time;
							socket.camera.lastDowndate = util.time();
							socket.update(Math.max(0, (1000 / c.networkUpdateFactor) - (util.time() - socket.camera.lastUpdate)));
						}
						break;
					case 'C': // Command packet
						{
							if (m.length !== 3) return 1, socket.kick('Ill-sized command packet!');
							let target = {x: m[0], y: m[1]},
								commands = m[2];
							if (typeof target.x !== 'number' || typeof target.y !== 'number' || typeof commands !== 'number')
								return 1, socket.kick('Invalid downlink!');
							if (commands > 255 || target.x !== Math.round(target.x) || target.y !== Math.round(target.y))
								return 1, socket.kick('Malformed command packet!');
							player.target = target;
							let val = [false, false, false, false, false, false, false, false];
							for (let i = 7; i >= 0; i--)
								if (commands >= Math.pow(2, i)) {
									commands -= Math.pow(2, i);
									val[i] = true;
								}
							player.command.up = val[0];
							player.command.down = val[1];
							player.command.left = val[2];
							player.command.right = val[3];
							player.command.lmb = val[4];
							player.command.mmb = val[5];
							player.command.rmb = val[6];
							socket.timeout.set(commands);
						}
						break;
					case 't': // Player toggle
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized toggle!');
							let given = '',
								tog = m[0];
							if (typeof tog !== 'number') return 1, socket.kick('Invalid toggle!');
							switch (tog) {
								case 0:
									given = 'autospin';
									break;
								case 1:
									given = 'autofire';
									break;
								case 2:
									given = 'override';
									break;
								default:
									return 1, socket.kick('Bad toggle!');
							}
							if (player.command != null && bodyCheck) {
								player.command[given] = !player.command[given];
								body.sendMessage(given.charAt(0).toUpperCase() + given.slice(1) + ((player.command[given]) ? ': ON' : ': OFF'));
							}
						}
						break;
					case 'U': // Upgrade request
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized upgrade request!');
							let number = m[0];
							if (typeof number != 'number' || number < 0) return 1, socket.kick('Invalid upgrade request!');
							if (bodyCheck) body.upgrade(number);
						}
						break;
					case 'x': // Skill upgrade request
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized skill request!');
							let number = m[0],
								stat = '';
							if (typeof number != 'number') return 1, socket.kick('Invalid stat upgrade request!');
							switch (number) {
								case 0:
									stat = 'atk';
									break;
								case 1:
									stat = 'hlt';
									break;
								case 2:
									stat = 'spd';
									break;
								case 3:
									stat = 'str';
									break;
								case 4:
									stat = 'pen';
									break;
								case 5:
									stat = 'dam';
									break;
								case 6:
									stat = 'rld';
									break;
								case 7:
									stat = 'mob';
									break;
								case 8:
									stat = 'rgn';
									break;
								case 9:
									stat = 'shi';
									break;
								default:
									return 1, socket.kick('Unknown stat upgrade request!');
							}
							if (bodyCheck) body.skillUp(stat);
						}
						break;
					case 'z': // Leaderboard desync report
						{
							if (m.length !== 0) return 1, socket.kick('Ill-sized desync request!');
							socket.status.needsFullLeaderboard = true;
						}
						break;
					case 'L': // Level up cheat
						{
							if (m.length !== 0) return 1, socket.kick('Ill-sized level-up request!');
							if (bodyCheck)
								if (body.skill.level < c.SKILL_CHEAT_CAP) {
									body.skill.score += body.skill.levelScore;
									body.skill.maintain();
									body.refreshBodyAttributes();
								}
						}
						break;
					case 'B': // Beta-tester keys
						{
							if (m.length !== 1) return 1, socket.kick('Ill-sized beta-key request!');
							if (typeof m[0] !== 'number') return 1, socket.kick('Invalid beta-key request!');
							if (bodyCheck)
								if (betaTokenCheck) {
									switch (m[0]) {
										case 0: // Upgrade to TESTBED
											body.define(Class.testbed);
											body.sendMessage('NOTE: You can press P to reset back to Basic tank.');
											body.sendMessage('You have upgraded to TESTBED.');
											break;
										case 1: // Suicide
											body.health.amount = -1;
											body.destroy();
											break;
										case 2: // Reset to Basic
											body.define(Class.genericTank),
											body.define(Class.basic);
											body.sendMessage('You have reset to Basic.');
											if (room.gameMode === 'ffa') body.color = 10;
											else body.color = [10, 11, 12, 15][player.team - 1];
											break;
										case 3: // Color change
											body.color = ~~(Math.random() * 33);
											break;
										case 4: // Godmode
											if (arenaIsClosed === true) return body.sendMessage("Godmode is disabled when the arena is closed!");
											body.godmode = !body.godmode;
											if (body.godmode === true) {
												body.diesToTeamBase = false;
												body.sendMessage("Godmode: ON");
											} else {
												body.diesToTeamBase = true;
												body.sendMessage("Godmode: OFF");
											}
											break;
										case 5: // Spawn entities at mouse
											let shape = new Entity({
												x: body.control.target.x + body.x,
												y: body.control.target.y + body.y
											});
											//ran.choose([Class.elite_destroyer, Class.elite_gunner, Class.fallen_booster])
											shape.define(body.spawnedEntity == null ? Class.square : Class[body.spawnedEntity]);
											shape.team = -100;
											break;
										default:
											return 1, socket.kick('Unknown beta-key request!');
									}
								} else return body.sendMessage('You need a beta-tester token to use beta-tester keys!');
						}
						break;
					case 'D': // Beta-tester commands
						{
							if (m.length !== 2 && m.length !== 3 && m.length !== 8) return 1, socket.kick('Ill-sized beta-command request!');
							if (typeof m[0] !== 'number') return 1, socket.kick('Invalid beta-command request!');
							if (betaTokenCheck) {
								switch (m[0]) {
									case 0: // Broadcast
										sockets.broadcast(m[1]);
										break;
									case 1: // Color change
										if (bodyCheck) body.color = m[1];
										break;
									case 2: // Add skill points
										if (bodyCheck) body.skill.points = m[1];
										break;
									case 3: // Set score
										if (bodyCheck) body.skill.score = m[1];
										break;
									case 4: // Set size
										if (bodyCheck) body.SIZE = m[1];
										break;
									case 5: // Define tank
										if (bodyCheck) body.define(Class[m[1]]);
										break;
									case 6: // Set stats (need to work out bugs with the rest of the stats)
										if (bodyCheck) {
											'weapon_speed' === m[1] && (body.skill.spd = m[2]);
											'weapon_reload' === m[1] && (body.skill.rld = m[2]);
											'move_speed' === m[1] && (body.SPEED = m[2],
												body.ACCELERATION = m[2] / 3, body.refreshBodyAttributes());
											'max_health' === m[1] && (body.HEALTH = m[2], body.refreshBodyAttributes());
											'body_damage' === m[1] && (body.DAMAGE = m[2], body.refreshBodyAttributes());
										}
										break;
									case 7: // Spawn entities at your position (to do: be able to edit size and color)
										if (bodyCheck) {
											let ent = new Entity({
												x: m[2] === 'me' ? body.x : m[2],
												y: m[3] === 'me' ? body.y : m[3]
											});
											ent.define(Class[m[1]]);
											ent.team = m[4] === 'me' ? body.team : m[4];
											ent.color = m[5] === 'default' ? ent.color : m[5];
											ent.SIZE = m[6] === 'default' ? ent.SIZE : m[6];
											ent.skill.score = m[7] === 'default' ? ent.skill.score : m[7];
										}
										break;
									case 8: // Set maxChildren value
										if (bodyCheck) body.maxChildren = m[1];
										break;
									case 9: // Teleport
										if (bodyCheck) {
											player.body.x = m[1];
											player.body.y = m[2];
										}
										break;
									case 10: // Set entity for F key
										if (bodyCheck) body.spawnedEntity = m[1];
										break;
									default:
										return 1, socket.kick('Unknown beta-command request!');
								}
							} else return body.sendMessage('You need a beta-tester token to use beta-tester commands!');
						}
						break;
					default:
						socket.kick('Bad packet index!');
				}
			}
			function traffic(socket) {
				let strikes = 0;
				return () => {
					if (util.time() - socket.status.lastHeartbeat > c.maxHeartbeatInterval) return 0, socket.kick('Heartbeat lost.');
					if (socket.status.requests > 50) strikes++;
					else strikes = 0;
					if (strikes > 3) return 0, socket.kick('Socket traffic volume violation!');
					socket.status.requests = 0;
				};
			}
			const spawn = (() => {
				let newgui = (() => {
					function floppy(value = null) {
						let flagged = true;
						return {
							update: (newValue) => {
								let e = false;
								if (value == null) e = true;
								else {
									if (typeof newValue != typeof value) e = true;
									switch (typeof newValue) {
										case 'number':
										case 'string':
											{
												if (newValue !== value) e = true;
											}
											break;
										case 'object':
											{
												if (Array.isArray(newValue)) {
													if (newValue.length !== value.length) e = true;
													else for (let i = 0, len = newValue.length; i < len; i++) if (newValue[i] !== value[i]) e = true;
													break;
												}
											} // jshint ignore:line
										default:
											util.error(newValue);
											throw new Error('Unsupported type for a floppyvar!');
									}
								}
								if (e) flagged = true, value = newValue;
							},
							publish: () => {
								if (flagged && value != null) {
									flagged = false;
									return value;
								}
							},
						};
					}
					function container(player) {
						let vars = [],
							skills = player.body.skill,
							out = [],
							statNames = ['atk', 'hlt', 'spd', 'str', 'pen', 'dam', 'rld', 'mob', 'rgn', 'shi'];
						statNames.forEach(a => {
							vars.push(floppy());
							vars.push(floppy());
							vars.push(floppy());
						});
						return {
							update: () => {
								let needsUpdate = false,
									i = 0;
								statNames.forEach(a => {
									vars[i++].update(skills.title(a));
									vars[i++].update(skills.cap(a));
									vars[i++].update(skills.cap(a, true));
								});
								vars.forEach(e => {
									if (e.publish() != null) needsUpdate = true;
								});
								if (needsUpdate)
									statNames.forEach(a => {
										out.push(skills.title(a));
										out.push(skills.cap(a));
										out.push(skills.cap(a, true));
									});
							},
							publish: () => {
								if (out.length) {
									let o = out.splice(0, out.length);
									out = [];
									return o;
								}
							},
						};
					}
					function getstuff(s) {
						let val = 0;
						val += 0x1 * s.amount('atk');
						val += 0x10 * s.amount('hlt');
						val += 0x100 * s.amount('spd');
						val += 0x1000 * s.amount('str');
						val += 0x10000 * s.amount('pen');
						val += 0x100000 * s.amount('dam');
						val += 0x1000000 * s.amount('rld');
						val += 0x10000000 * s.amount('mob');
						val += 0x100000000 * s.amount('rgn');
						val += 0x1000000000 * s.amount('shi');
						return val.toString(36);
					}
					function update(gui) {
						let b = gui.master.body;
						if (!b) return 0;
						gui.bodyid = b.id;
						gui.fps.update(Math.min(1, global.fps / roomSpeed / 1000 * 30));
						gui.color.update(gui.master.teamColor);
						gui.label.update(b.index);
						gui.score.update(b.skill.score);
						gui.points.update(b.skill.points);
						let upgrades = [];
						b.upgrades.forEach(function(e) {
							if (b.skill.level >= e.level) upgrades.push(e.index);
						});
						gui.upgrades.update(upgrades);
						gui.stats.update();
						gui.skills.update(getstuff(b.skill));
						gui.accel.update(b.acceleration);
						gui.topspeed.update(b.topSpeed);
					}
					function publish(gui) {
						let o = {
							fps: gui.fps.publish(),
							label: gui.label.publish(),
							score: gui.score.publish(),
							points: gui.points.publish(),
							upgrades: gui.upgrades.publish(),
							color: gui.color.publish(),
							statsdata: gui.stats.publish(),
							skills: gui.skills.publish(),
							accel: gui.accel.publish(),
							top: gui.topspeed.publish()
						};
						let oo = [0];
						if (o.fps != null) oo[0] += 0x0001, oo.push(o.fps || 1);
						if (o.label != null) oo[0] += 0x0002, oo.push(o.label), oo.push(o.color || gui.master.teamColor), oo.push(gui.bodyid);
						if (o.score != null) oo[0] += 0x0004, oo.push(o.score);
						if (o.points != null) oo[0] += 0x0008, oo.push(o.points);
						if (o.upgrades != null) oo[0] += 0x0010, oo.push(o.upgrades.length, ...o.upgrades);
						if (o.statsdata != null) oo[0] += 0x0020, oo.push(...o.statsdata);
						if (o.skills != null) oo[0] += 0x0040, oo.push(o.skills);
						if (o.accel != null) oo[0] += 0x0080, oo.push(o.accel);
						if (o.top != null) oo[0] += 0x0100, oo.push(o.top);
						return oo;
					}
					return (player) => {
						let gui = {
							master: player,
							fps: floppy(),
							label: floppy(),
							score: floppy(),
							points: floppy(),
							upgrades: floppy(),
							color: floppy(),
							skills: floppy(),
							topspeed: floppy(),
							accel: floppy(),
							stats: container(player),
							bodyid: -1
						};
						return {
							update: () => update(gui),
							publish: () => publish(gui)
						};
					};
				})();
				function messenger(socket, content) {
					socket.talk('m', content);
				}
				return (socket, name) => {
					let player = {},
						loc = {};
					player.team = socket.rememberedTeam;
					switch (room.gameMode) {
						case "tdm":
							{
								let census = [1, 1, 1, 1],
									scoreCensus = [1, 1, 1, 1];
								players.forEach(p => {
									census[p.team - 1]++;
									if (p.body != null) scoreCensus[p.team - 1] += p.body.skill.score;
								});
								let possiblities = [];
								for (let i = 0, m = 0; i < 4; i++) {
									let v = Math.round(1e6 * (room[('bas') + (i + 1)].length + 1) / (census[i] + 1) / scoreCensus[i]);
									if (v > m) {
										m = v;
										possiblities = [i];
									}
									if (v == m) possiblities.push(i);
								}
								if (player.team == null) player.team = ran.choose(possiblities) + 1;
								if (room[('bas') + player.team].length)
									do {
										loc = room.randomType(('bas') + player.team);
									} while (dirtyCheck(loc, 50));
								else
									do {
										loc = room.gaussInverse(5);
									} while (dirtyCheck(loc, 50));
							}
							break;
						default:
							do {
								loc = room.gaussInverse(5);
							} while (dirtyCheck(loc, 50));
					}
					socket.rememberedTeam = player.team;
					let body = new Entity(loc);
					body.protect();
					body.define(Class.basic);
					body.name = name;
					body.addController(new io_listenToPlayer(body, player));
					body.sendMessage = content => messenger(socket, content);
					body.invuln = true;
					player.body = body;
					switch (room.gameMode) {
						case "tdm":
							{
								body.team = -player.team;
								body.color = [10, 11, 12, 15][player.team - 1];
							}
							break;
						default:
							{
								body.color = c.RANDOM_COLORS ? ~~(Math.random() * 33) : 12;
							}
					}
					player.teamColor = (!c.RANDOM_COLORS && room.gameMode === 'ffa') ? 10 : body.color;
					player.target = {
						x: 0,
						y: 0
					};
					player.command = {
						up: false,
						down: false,
						left: false,
						right: false,
						lmb: false,
						mmb: false,
						rmb: false,
						autofire: false,
						autospin: false,
						override: false,
						autoguide: false
					};
					player.records = (() => {
						let begin = util.time();
						return () => {
							return [
								player.body.skill.score,
								Math.floor((util.time() - begin) / 1000),
								player.body.killCount.solo,
								player.body.killCount.assists,
								player.body.killCount.bosses,
								player.body.killCount.killers.length,
								...player.body.killCount.killers
							];
						};
					})();
					player.gui = newgui(player);
					player.socket = socket;
					players.push(player);
					socket.camera.x = body.x;
					socket.camera.y = body.y;
					socket.camera.fov = 2000;
					socket.status.hasSpawned = true;
					body.sendMessage('You have spawned! Welcome to the game.');
					body.sendMessage('You will be invulnerable until you move or shoot.');
					socket.talk('c', socket.camera.x, socket.camera.y, socket.camera.fov);
					return player;
				};
			})();
			const eyes = (() => {
				function flatten(data) {
					let output = [data.type];
					if (data.type & 0x01) {
						output.push(
							data.facing,
							data.layer
						);
					} else {
						output.push(
							data.id,
							data.index,
							data.x,
							data.y,
							data.vx,
							data.vy,
							data.size,
							data.facing,
							data.vfacing,
							data.twiggle,
							data.layer,
							data.color,
							Math.ceil(255 * data.health),
							Math.round(255 * data.shield)
						);
						if (data.type & 0x04) output.push(data.name, data.score);
					}
					let gundata = [data.guns.length];
					data.guns.forEach(lastShot => {
						gundata.push(lastShot.time, lastShot.power);
					});
					output.push(...gundata);
					let turdata = [data.turrets.length];
					data.turrets.forEach(turret => {
						turdata.push(...flatten(turret));
					});
					output.push(...turdata);
					return output;
				}
				function perspective(e, player, data) {
					if (player.body != null)
						if (player.body.id === e.master.id) {
							data = data.slice();
							if (player.command.autospin) data[10] = 1;
						}
					return data;
				}
				function check(camera, obj) {
					return Math.abs(obj.x - camera.x) < camera.fov * 0.6 + 1.5 * obj.size + 100 &&
						Math.abs(obj.y - camera.y) < camera.fov * 0.6 * 0.5625 + 1.5 * obj.size + 100;
				}
				return socket => {
					let lastVisibleUpdate = 0;
					let nearby = [];
					let x = -1000;
					let y = -1000;
					let fov = 0;
					let o = {
						add: e => {
							if (check(socket.camera, e)) nearby.push(e);
						},
						remove: e => {
							let i = nearby.indexOf(e);
							if (i !== -1) util.remove(nearby, i);
						},
						check: (e, f) => {
							return check(socket.camera, e);
						}, //Math.abs(e.x - x) < e.size + f*fov && Math.abs(e.y - y) < e.size + f*fov; },
						gazeUpon: () => {
							logs.network.set();
							let player = socket.player,
								camera = socket.camera;
							let rightNow = room.lastCycle;
							if (rightNow === camera.lastUpdate) {
								socket.update(5 + room.cycleSpeed - util.time() + rightNow);
								return 1;
							}
							camera.lastUpdate = rightNow;
							socket.status.receiving++;
							let setFov = camera.fov;
							if (player.body != null)
								if (player.body.isDead()) {
									socket.status.deceased = true;
									socket.talk('F', ...player.records());
									player.body = null;
								} else if (player.body.photo) {
									camera.x = player.body.photo.x;
									camera.y = player.body.photo.y;
									camera.vx = player.body.photo.vx;
									camera.vy = player.body.photo.vy;
									setFov = player.body.fov;
									player.viewId = player.body.id;
								}
							if (player.body == null) setFov = 2000;
							camera.fov += Math.max((setFov - camera.fov) / 30, setFov - camera.fov);
							x = camera.x;
							y = camera.y;
							fov = camera.fov;
							if (camera.lastUpdate - lastVisibleUpdate > c.visibleListInterval) {
								lastVisibleUpdate = camera.lastUpdate;
								nearby = entities.map(e => {
									if (check(socket.camera, e)) return e;
								}).filter(e => {
									return e;
								});
							}
							let visible = nearby.map(function mapthevisiblerealm(e) {
								if (e.photo)
									if (Math.abs(e.x - x) < fov / 2 + 1.5 * e.size &&
										Math.abs(e.y - y) < fov / 2 * (9 / 16) + 1.5 * e.size) {
										if (!e.flattenedPhoto) e.flattenedPhoto = flatten(e.photo);
										return perspective(e, player, e.flattenedPhoto);
									}
							}).filter(e => {
								return e;
							});
							let numberInView = visible.length,
								view = [];
							visible.forEach(e => {
								view.push(...e);
							});
							player.gui.update();
							socket.talk(
								'u',
								rightNow,
								camera.x,
								camera.y,
								setFov,
								camera.vx,
								camera.vy,
								...player.gui.publish(),
								numberInView,
								...view
							);
							if (socket.status.receiving < c.networkFrontlog) {
								socket.update(Math.max(
									0,
									(1000 / c.networkUpdateFactor) - (camera.lastDowndate - camera.lastUpdate),
									camera.ping / c.networkFrontlog
								));
							} else socket.update(c.networkFallbackTime);
							logs.network.mark();
						},
					};
					views.push(o);
					return o;
				};
			})();
			const broadcast = (() => {
				let readmap, readlb;
				const getminimap = (() => {
					let cleanmapreader = (() => {
						function flattener() {
							let internalmap = [];
							function flatten(data) {
								if (data == null) data = [];
								let out = [data.length];
								data.forEach(d => out.push(...d));
								return out;
							}
							function challenge(value, challenger) {
								return value[1] === challenger[0] &&
									value[2] === challenger[1] &&
									value[3] === challenger[2];
							}
							return {
								update: (data) => {
									internalmap.forEach(e => e[0] = -1);
									data = data.map(d => {
										return [
											Math.round(255 * util.clamp(d[0] / room.width, 0, 1)),
											Math.round(255 * util.clamp(d[1] / room.height, 0, 1)),
											d[2]
										];
									});
									data.forEach(d => {
										let i = internalmap.findIndex(e => {
											return challenge(e, d);
										});
										if (i === -1) internalmap.push([1, ...d]);
										else internalmap[i][0] = 0;
									});
									let ex = internalmap.filter(e => e[0] !== 0);
									internalmap = internalmap.filter(e => e[0] !== -1);
									let f = flatten(ex);
									return f;
								},
								exportall: () => {
									return flatten(internalmap.map(e => {
										return [1, e[1], e[2], e[3]];
									}));
								},
							};
						}
						return (room.gameMode === 'ffa') ? (() => {
								let publicmap = flattener();
								return () => {
									let clean = publicmap.update(minimap.map(function(entry) {
										return [entry[1], entry[2], (entry[4] === 'miniboss') ? entry[3] : 17];
									}));
									let full = publicmap.exportall();
									return (team, everything = false) => {
										return (everything) ? full : clean;
									};
								};
							})() : (() => {
								let team1map = flattener();
								let team2map = flattener();
								let team3map = flattener();
								let team4map = flattener();
								return () => {
									let clean = [
										team1map.update(minimap.map(function(entry) {
											return [entry[1], entry[2], (entry[4] === 'miniboss' || (entry[4] === 'tank' && entry[5] === -1)) ? entry[3] : 17];
										})),
										team2map.update(minimap.map(function(entry) {
											return [entry[1], entry[2], (entry[4] === 'miniboss' || (entry[4] === 'tank' && entry[5] === -2)) ? entry[3] : 17];
										})),
										team3map.update(minimap.map(function(entry) {
											return [entry[1], entry[2], (entry[4] === 'miniboss' || (entry[4] === 'tank' && entry[5] === -3)) ? entry[3] : 17];
										})),
										team4map.update(minimap.map(function(entry) {
											return [entry[1], entry[2], (entry[4] === 'miniboss' || (entry[4] === 'tank' && entry[5] === -4)) ? entry[3] : 17];
										})),
									];
									let full = [
										team1map.exportall(),
										team2map.exportall(),
										team3map.exportall(),
										team4map.exportall()
									];
									return (team, everything = false) => {
										return (everything) ? full[team - 1] : clean[team - 1];
									};
								};
							})();
					})();
					return () => {
						entities.forEach((my) => {
							if (my.settings.drawShape && ran.dice(my.stealth * c.STEALTH)) {
								let i = minimap.findIndex((entry) => {
									return entry[0] === my.id;
								});
								if (i != -1) minimap[i] = [my.id, my.x, my.y, my.color, my.type, my.team];
								else minimap.push([my.id, my.x, my.y, my.color, my.type, my.team]);
							}
						});
						return cleanmapreader();
					};
				})();
				const getleaderboard = (() => {
					let lb = {
						full: [],
						updates: [],
					};
					let list = new goog.structs.PriorityQueue();
					function listify(instance) {
						if (instance.settings.leaderboardable && instance.settings.drawShape &&
							(instance.type === 'tank' || instance.killCount.solo || instance.killCount.assists))
							list.enqueue(1 / (instance.skill.score + 1), instance);
					}
					let flatten = (() => {
						let leaderboard = {};
						let indices = (() => {
							let data = [],
								removed = [];
							return {
								flag: () => {
									data.forEach(index => {
										index.status = -1;
									});
									if (data == null) {
										data = [];
									}
								},
								cull: () => {
									removed = [];
									data = data.filter(index => {
										let doit = index.status === -1;
										if (doit) removed.push(index.id);
										return !doit;
									});
									return removed;
								},
								add: id => {
									data.push({
										id: id,
										status: 1,
									});
								},
								stabilize: id => {
									data[data.findIndex(index => {
										return index.id === id;
									})].status = 0;
								},
							};
						})();
						let process = (() => {
							function barcolor(entry) {
								switch (entry.team) {
									case -100:
										return entry.color;
									case -1:
										return 10;
									case -2:
										return 11;
									case -3:
										return 12;
									case -4:
										return 15;
									default:
										{
											if (room.gameMode === 'tdm') return entry.color;
											return 11;
										}
								}
							}
							function getfull(entry) {
								return [-entry.id,
									Math.round(entry.skill.score),
									entry.index,
									entry.name,
									entry.color,
									barcolor(entry),
								];
							}
							return {
								normal: entry => {
									let id = entry.id,
										score = Math.round(entry.skill.score);
									let lb = leaderboard['_' + id];
									if (lb != null) {
										indices.stabilize(id);
										if (lb.score !== score || lb.index !== entry.index) {
											lb.score = score;
											lb.index = entry.index;
											return [
												id,
												score,
												entry.index,
											];
										}
									} else {
										indices.add(id);
										leaderboard['_' + id] = {
											score: score,
											name: entry.name,
											index: entry.index,
											color: entry.color,
											bar: barcolor(entry),
										};
										return getfull(entry);
									}
								},
								full: entry => {
									return getfull(entry);
								},
							};
						})();
						return data => {
							indices.flag();
							let orders = data.map(process.normal).filter(e => {
									return e;
								}),
								refresh = data.map(process.full).filter(e => {
									return e;
								}),
								flatorders = [],
								flatrefresh = [];
							orders.forEach(e => flatorders.push(...e));
							refresh.forEach(e => flatrefresh.push(...e));
							let removed = indices.cull();
							removed.forEach(id => {
								delete leaderboard['_' + id];
							});
							return {
								updates: [removed.length, ...removed, orders.length, ...flatorders],
								full: [-1, refresh.length, ...flatrefresh], // The -1 tells the client it'll be a full refresh
							};
						};
					})();
					return () => {
						list.clear();
						entities.forEach(listify);
						let topTen = [];
						for (let i = 0; i < 10; i++) {
							if (list.getCount()) topTen.push(list.dequeue());
							else break;
						}
						topTen = topTen.filter(e => {
							return e;
						});
						room.topPlayerID = (topTen.length) ? topTen[0].id : -1;
						lb = flatten(topTen);
						return (full = false) => {
							return full ? lb.full : lb.updates;
						};
					};
				})();
				function slowloop() {
					logs.minimap.set();
					readmap = getminimap();
					readlb = getleaderboard();
					logs.minimap.mark();
					let time = util.time();
					clients.forEach(socket => {
						if (socket.timeout.check(time)) socket.kick('Kicked for inactivity.');
						if (time - socket.statuslastHeartbeat > c.maxHeartbeatInterval) socket.kick('Lost heartbeat.');
					});
				}
				setInterval(slowloop, 1000);
				return socket => {
					if (socket.status.hasSpawned) {
						let m = [0],
							lb = [0, 0];
						m = readmap(socket.player.team, socket.status.needsFullMap);
						socket.status.needsFullMap = false;
						lb = readlb(socket.status.needsFullLeaderboard);
						socket.status.needsFullLeaderboard = false;
						if (m !== [0] || lb !== [0, 0]) socket.talk('b', ...m, ...lb);
					}
				};
			})();
			return (socket, req) => {
				if (c.servesStatic || req.connection.remoteAddress === '::ffff:127.0.0.1' || req.connection.remoteAddress === '::1') {
					socket.ip = req.headers['x-forwarded-for'];
					if (bannedIPs.findIndex(ip => {
							return ip === socket.ip;
						}) !== -1) {
						socket.terminate();
						return 1;
					}
					if (!c.servesStatic) {
						let n = connectedIPs.findIndex(w => {
							return w.ip === socket.ip;
						});
						if (n !== -1) {
							if (connectedIPs[n].number > 1) {
								util.warn('Too many connections from the same IP. [' + socket.ip + ']');
								socket.terminate();
								return 1;
							} else connectedIPs[n].number++;
						} else connectedIPs.push({
							ip: socket.ip,
							number: 1,
						});
					}
				} else {
					util.warn(req.connection.remoteAddress);
					util.warn(req.headers['x-forwarded-for']);
					socket.terminate();
					util.warn('Inappropiate connection request: header spoofing. Socket terminated.');
					return 1;
				}
				util.log(socket.ip + ' is trying to connect...');
				socket.binaryType = 'arraybuffer';
				socket.key = '';
				socket.player = {
					camera: {},
				};
				socket.timeout = (() => {
					let mem = 0;
					let timer = 0;
					return {
						set: val => {
							if (mem !== val) {
								mem = val;
								timer = util.time();
							}
						},
						check: time => {
							return timer && time - timer > c.maxHeartbeatInterval;
						}
					};
				})();
				socket.status = {
					verified: false,
					receiving: 0,
					deceased: true,
					requests: 0,
					hasSpawned: false,
					needsFullMap: true,
					needsFullLeaderboard: true,
					lastHeartbeat: util.time()
				};
				socket.loops = (() => {
					let nextUpdateCall = null;
					let trafficMonitoring = setInterval(() => traffic(socket), 1500);
					let broadcastingGuiStuff = setInterval(() => broadcast(socket), 1000);
					return {
						setUpdate: timeout => {
							nextUpdateCall = timeout;
						},
						cancelUpdate: () => {
							clearTimeout(nextUpdateCall);
						},
						terminate: () => {
							clearTimeout(nextUpdateCall);
							clearTimeout(trafficMonitoring);
							clearTimeout(broadcastingGuiStuff);
						}
					};
				})();
				socket.camera = {
					x: undefined,
					y: undefined,
					vx: 0,
					vy: 0,
					lastUpdate: util.time(),
					lastDowndate: undefined,
					fov: 2000
				};
				socket.makeView = () => {
					socket.view = eyes(socket);
				};
				socket.makeView();
				socket.ban = () => ban(socket);
				socket.kick = reason => kick(socket, reason);
				socket.talk = (...message) => {
					if (socket.readyState === socket.OPEN) {
						socket.send(protocol.encode(message), {
							binary: true
						});
					}
				};
				socket.lastWords = (...message) => {
					if (socket.readyState === socket.OPEN) {
						socket.send(protocol.encode(message), {
							binary: true
						}, () => setTimeout(() => socket.terminate(), 1000));
					}
				};
				socket.on('message', message => incoming(message, socket));
				socket.on('close', () => {
					socket.loops.terminate();
					close(socket);
				});
				socket.on('error', e => {
					util.log('[ERROR]:');
					util.error(e);
				});
				socket.spawn = name => {
					return spawn(socket, name);
				};
				socket.update = time => {
					socket.loops.cancelUpdate();
					socket.loops.setUpdate(setTimeout(() => {
						socket.view.gazeUpon();
					}, time));
				};
				clients.push(socket);
				util.log('[INFO] New socket opened: ', socket.ip);
			};
		})(),
	};
})();
var gameloop = (() => {
	let collide = (() => {
		function simplecollide(my, n) {
			let diff = (1 + util.getDistance(my, n) / 2) * roomSpeed;
			let a = (my.intangibility) ? 1 : my.pushability,
				b = (n.intangibility) ? 1 : n.pushability,
				c = 0.05 * (my.x - n.x) / diff,
				d = 0.05 * (my.y - n.y) / diff;
			my.accel.x += a / (b + 0.3) * c;
			my.accel.y += a / (b + 0.3) * d;
			n.accel.x -= b / (a + 0.3) * c;
			n.accel.y -= b / (a + 0.3) * d;
		}
		function firmcollide(my, n, buffer = 0) {
			let item1 = {
				x: my.x + my.m_x,
				y: my.y + my.m_y
			};
			let item2 = {
				x: n.x + n.m_x,
				y: n.y + n.m_y
			};
			let dist = util.getDistance(item1, item2);
			let s1 = Math.max(my.velocity.length, my.topSpeed);
			let s2 = Math.max(n.velocity.length, n.topSpeed);
			let strike1, strike2;
			if (buffer > 0 && dist <= my.realSize + n.realSize + buffer) {
				let repel = (my.acceleration + n.acceleration) * (my.realSize + n.realSize + buffer - dist) / buffer / roomSpeed;
				my.accel.x += repel * (item1.x - item2.x) / dist;
				my.accel.y += repel * (item1.y - item2.y) / dist;
				n.accel.x -= repel * (item1.x - item2.x) / dist;
				n.accel.y -= repel * (item1.y - item2.y) / dist;
			}
			while (dist <= my.realSize + n.realSize && !(strike1 && strike2)) {
				strike1 = false;
				strike2 = false;
				if (my.velocity.length <= s1) {
					my.velocity.x -= 0.05 * (item2.x - item1.x) / dist / roomSpeed;
					my.velocity.y -= 0.05 * (item2.y - item1.y) / dist / roomSpeed;
				} else strike1 = true;
				if (n.velocity.length <= s2) {
					n.velocity.x += 0.05 * (item2.x - item1.x) / dist / roomSpeed;
					n.velocity.y += 0.05 * (item2.y - item1.y) / dist / roomSpeed;
				} else strike2 = true;
				item1 = {
					x: my.x + my.m_x,
					y: my.y + my.m_y
				};
				item2 = {
					x: n.x + n.m_x,
					y: n.y + n.m_y
				};
				dist = util.getDistance(item1, item2);
			}
		}
		function reflectcollide(wall, bounce) {
			let delt = new Vector(wall.x - bounce.x, wall.y - bounce.y);
			let dist = delt.length;
			let diff = wall.size + bounce.size - dist;
			if (diff > 0) {
				bounce.accel.x -= diff * delt.x / dist;
				bounce.accel.y -= diff * delt.y / dist;
				return 1;
			}
			return 0;
		}
		function advancedcollide(my, n, doDamage, doInelastic, nIsFirmCollide = false) {
			let tock = Math.min(my.stepRemaining, n.stepRemaining),
				combinedRadius = n.size + my.size,
				motion = {
					_me: new Vector(my.m_x, my.m_y),
					_n: new Vector(n.m_x, n.m_y)
				},
				delt = new Vector(
					tock * (motion._me.x - motion._n.x),
					tock * (motion._me.y - motion._n.y)
				),
				diff = new Vector(my.x - n.x, my.y - n.y),
				dir = new Vector((n.x - my.x) / diff.length, (n.y - my.y) / diff.length),
				component = Math.max(0, dir.x * delt.x + dir.y * delt.y);
			if (component >= diff.length - combinedRadius) {
				let goahead = false,
					tmin = 1 - tock,
					tmax = 1,
					A = Math.pow(delt.x, 2) + Math.pow(delt.y, 2),
					B = 2 * delt.x * diff.x + 2 * delt.y * diff.y,
					C = Math.pow(diff.x, 2) + Math.pow(diff.y, 2) - Math.pow(combinedRadius, 2),
					det = B * B - (4 * A * C),
					t;
				if (!A || det < 0 || C < 0) {
					t = 0;
					if (C < 0) goahead = true;
				} else {
					let t1 = (-B - Math.sqrt(det)) / (2 * A),
						t2 = (-B + Math.sqrt(det)) / (2 * A);
					if (t1 < tmin || t1 > tmax) {
						if (t2 < tmin || t2 > tmax) t = false;
						else {
							t = t2;
							goahead = true;
						}
					} else {
						if (t2 >= tmin && t2 <= tmax) {
							t = Math.min(t1, t2);
							goahead = true;
						} else {
							t = t1;
							goahead = true;
						}
					}
				}
				if (goahead) {
					my.collisionArray.push(n);
					n.collisionArray.push(my);
					if (t) {
						my.x += motion._me.x * t;
						my.y += motion._me.y * t;
						n.x += motion._n.x * t;
						n.y += motion._n.y * t;
						my.stepRemaining -= t;
						n.stepRemaining -= t;
						diff = new Vector(my.x - n.x, my.y - n.y);
						dir = new Vector((n.x - my.x) / diff.length, (n.y - my.y) / diff.length);
						component = Math.max(0, dir.x * delt.x + dir.y * delt.y);
					}
					let componentNorm = component / delt.length;
					let reductionFactor = 1,
						deathFactor = {
							_me: 1,
							_n: 1
						},
						accelerationFactor = (delt.length) ?
							((combinedRadius / 4) / (Math.floor(combinedRadius / delt.length) + 1)) :
							(0.001),
						depth = {
							_me: util.clamp((combinedRadius - diff.length) / (2 * my.size), 0, 1),
							_n: util.clamp((combinedRadius - diff.length) / (2 * n.size), 0, 1)
						},
						combinedDepth = {
							up: depth._me * depth._n,
							down: (1 - depth._me) * (1 - depth._n)
						},
						pen = {
							_me: {
								sqr: Math.pow(my.penetration, 2),
								sqrt: Math.sqrt(my.penetration)
							},
							_n: {
								sqr: Math.pow(n.penetration, 2),
								sqrt: Math.sqrt(n.penetration)
							}
						},
						savedHealthRatio = {
							_me: my.health.ratio,
							_n: n.health.ratio
						};
					if (doDamage) {
						let speedFactor = {
							_me: (my.maxSpeed) ? (Math.pow(motion._me.length / my.maxSpeed, 0.25)) : (1),
							_n: (n.maxSpeed) ? (Math.pow(motion._n.length / n.maxSpeed, 0.25)) : (1)
						};
						let bail = false;
						if (my.shape === n.shape && my.settings.isNecromancer && n.type === 'food') bail = my.necro(n);
						else if (my.shape === n.shape && n.settings.isNecromancer && my.type === 'food') bail = n.necro(my);
						if (!bail) {
							let resistDiff = my.health.resist - n.health.resist,
								damage = {
									_me: c.DAMAGE_CONSTANT * my.damage * (1 + resistDiff) *
										(1 + n.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) *
										((my.settings.buffVsFood && n.settings.damageType === 1) ? 3 : 1) *
										my.damageMultiplier() * Math.min(2, Math.max(speedFactor._me, 1) * speedFactor._me),
									_n: c.DAMAGE_CONSTANT * n.damage * (1 - resistDiff) *
										(1 + my.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) *
										((n.settings.buffVsFood && my.settings.damageType === 1) ? 3 : 1) *
										n.damageMultiplier() * Math.min(2, Math.max(speedFactor._n, 1) * speedFactor._n),
								};
							if (my.settings.ratioEffects)
								damage._me *= Math.min(1, Math.pow(Math.max(my.health.ratio, my.shield.ratio), 1 / my.penetration));
							if (n.settings.ratioEffects)
								damage._n *= Math.min(1, Math.pow(Math.max(n.health.ratio, n.shield.ratio), 1 / n.penetration));
							if (my.settings.damageEffects)
								damage._me *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth._n) / my.penetration) *
									(1 + pen._n.sqrt * depth._n - depth._n) / pen._n.sqrt;
							if (n.settings.damageEffects)
								damage._n *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth._me) / n.penetration) *
									(1 + pen._me.sqrt * depth._me - depth._me) / pen._me.sqrt;
							let damageToApply = {
								_me: damage._me,
								_n: damage._n
							};
							if (n.shield.max) damageToApply._me -= n.shield.getDamage(damageToApply._me);
							if (my.shield.max) damageToApply._n -= my.shield.getDamage(damageToApply._n);
							let stuff = my.health.getDamage(damageToApply._n, false);
							deathFactor._me = (stuff > my.health.amount) ? my.health.amount / stuff : 1;
							stuff = n.health.getDamage(damageToApply._me, false);
							deathFactor._n = (stuff > n.health.amount) ? n.health.amount / stuff : 1;
							reductionFactor = Math.min(deathFactor._me, deathFactor._n);
							my.damageRecieved += damage._n * deathFactor._n;
							n.damageRecieved += damage._me * deathFactor._me;
						}
					}
					if (nIsFirmCollide < 0) {
						nIsFirmCollide *= -0.5;
						my.accel.x -= nIsFirmCollide * component * dir.x;
						my.accel.y -= nIsFirmCollide * component * dir.y;
						n.accel.x += nIsFirmCollide * component * dir.x;
						n.accel.y += nIsFirmCollide * component * dir.y;
					} else if (nIsFirmCollide > 0) {
						n.accel.x += nIsFirmCollide * (component * dir.x + combinedDepth.up);
						n.accel.y += nIsFirmCollide * (component * dir.y + combinedDepth.up);
					} else {
						let elasticity = 2 - 4 * Math.atan(my.penetration * n.penetration) / Math.PI;
						if (doInelastic && my.settings.motionEffects && n.settings.motionEffects)
							elasticity *= savedHealthRatio._me / pen._me.sqrt + savedHealthRatio._n / pen._n.sqrt;
						else elasticity *= 2;
						let spring = 2 * Math.sqrt(savedHealthRatio._me * savedHealthRatio._n) / roomSpeed,
							elasticImpulse = Math.pow(combinedDepth.down, 2) * elasticity * component * my.mass * n.mass / (my.mass + n.mass),
							springImpulse = c.KNOCKBACK_CONSTANT * spring * combinedDepth.up,
							impulse = -(elasticImpulse + springImpulse) * (1 - my.intangibility) * (1 - n.intangibility),
							force = {
								x: impulse * dir.x,
								y: impulse * dir.y
							},
							modifiers = {
								_me: c.KNOCKBACK_CONSTANT * my.pushability / my.mass * deathFactor._n,
								_n: c.KNOCKBACK_CONSTANT * n.pushability / n.mass * deathFactor._me
							};
						my.accel.x += modifiers._me * force.x;
						my.accel.y += modifiers._me * force.y;
						n.accel.x -= modifiers._n * force.x;
						n.accel.y -= modifiers._n * force.y;
					}
				}
			}
		}
		return collision => {
			let instance = collision[0],
				other = collision[1];
			if (other.isGhost) {
				util.error('[ERROR] A ghost has been found!');
				util.error('Type: ' + other.label);
				util.error('Position: (' + other.x + ', ' + other.y + ')');
				util.error('Collision Array: ' + other.collisionArray);
				util.error('Health: ' + other.health.amount);
				util.warn('Ghost removed successfully.');
				if (grid.checkIfInHSHG(other)) grid.removeObject(other);
				return 0;
			}
			if (instance.isGhost) {
				util.error('[ERROR] A ghost entity has been found!');
				util.error('Type: ' + instance.label);
				util.error('Position: (' + instance.x + ', ' + instance.y + ')');
				util.error('Collision Array: ' + instance.collisionArray);
				util.error('Health: ' + instance.health.amount);
				util.warn('Ghost entity removed successfully.');
				if (grid.checkIfInHSHG(instance)) grid.removeObject(instance);
				return 0;
			}
			if (!instance.activation.check() && !other.activation.check()) {
				util.warn('Tried to collide with an inactive instance.');
				return 0;
			}
			if (instance.type === 'wall' || other.type === 'wall') {
				if (instance.team !== -100 && other.team !== -100) {
					let a = (instance.type === 'bullet' || other.type === 'bullet') ?
						1 + 10 / (Math.max(instance.velocity.length, other.velocity.length) + 10) : 1;
					if (instance.type === 'wall') advancedcollide(instance, other, false, false, a);
					else advancedcollide(other, instance, false, false, a);
				}
			} else {
				if ((instance.type === 'crasher' && other.type === 'food') || (other.type === 'crasher' && instance.type === 'food')) firmcollide(instance, other);
				else {
					if (instance.team !== other.team) advancedcollide(instance, other, true, true);
					else {
						if (instance.settings.hitsOwnType == 'never' || other.settings.hitsOwnType == 'never') {
						} else {
							if (instance.settings.hitsOwnType === other.settings.hitsOwnType) {
								switch (instance.settings.hitsOwnType) {
									case 'push':
										advancedcollide(instance, other, false, false);
										break;
									case 'hard':
										firmcollide(instance, other);
										break;
									case 'hardWithBuffer':
										firmcollide(instance, other, 30);
										break;
									case 'repel':
										simplecollide(instance, other);
										break;
									/*case 'reflect':
										reflectcollide(instance, other);*/
								}
							}
						}
					}
				}
			}
		};
	})();
	function entitiesActivationLoop(my) {
		my.collisionArray = [];
		my.activation.update();
		my.updateAABB(my.activation.check());
	}
	function entitiesLiveLoop(my) {
		if (my._death()) my.destroy();
		else {
			if (my.bond == null) {
				logs.physics.set();
				my.physics();
				logs.physics.mark();
			}
			if (my.activation.check()) {
				logs.entities.tally();
				logs.life.set();
				my.life();
				logs.life.mark();
				my.friction();
				my.location();
				logs.selfie.set();
				my.takeSelfie();
				logs.selfie.mark();
			}
		}
		my.collisionArray = [];
	}
	let time;
	return () => {
		logs.loops.tally();
		logs.master.set();
		logs.activation.set();
		entities.forEach(e => entitiesActivationLoop(e));
		logs.activation.mark();
		logs.collide.set();
		if (entities.length > 1) {
			grid.update();
			grid.queryForCollisionPairs().forEach(collision => collide(collision));
		}
		logs.collide.mark();
		logs.entities.set();
		entities.forEach(e => entitiesLiveLoop(e));
		logs.entities.mark();
		logs.master.mark();
		purgeEntities();
		room.lastCycle = util.time();
	};
	/*let expected = 1000 / c.gameSpeed / 30;
	let alphaFactor = (delta > expected) ? expected / delta : 1;
	roomSpeed = c.gameSpeed * alphaFactor;
	setTimeout(moveloop, 1000 / roomSpeed / 30 - delta);*/
})();
var maintainloop = (() => {
	function placeRoids() {
		function placeRoid(type, entityClass) {
			let x = 0;
			let position;
			do {
				position = room.randomType(type);
				x++;
				if (x > 200) return 0, util.warn("Failed to place roids!");
			} while (dirtyCheck(position, 10 + entityClass.SIZE));
			let o = new Entity(position);
			o.define(entityClass);
			o.team = -101;
			o.facing = ran.randomAngle();
			o.protect();
			o.life();
		}
		let roidcount = room.roid.length * room.width * room.height / room.xgrid / room.ygrid / 5e4 / 1.5;
		let rockcount = room.rock.length * room.width * room.height / room.xgrid / room.ygrid / 25e4 / 1.5;
		let count = 0;
		for (let i = Math.ceil(roidcount); i; i--) {
			count++;
			placeRoid('roid', Class.obstacle);
		}
		for (let i = Math.ceil(roidcount * 0.3); i; i--) {
			count++;
			placeRoid('roid', Class.babyObstacle);
		}
		for (let i = Math.ceil(rockcount * 0.8); i; i--) {
			count++;
			placeRoid('rock', Class.obstacle);
		}
		for (let i = Math.ceil(rockcount * 0.5); i; i--) {
			count++;
			placeRoid('rock', Class.babyObstacle);
		}
		util.log('Placing ' + count + ' obstacles.');
	}
	placeRoids();
	let spawnBosses = (() => {
		if (arenaIsClosed === true) return;
		let timer = 0;
		let boss = (() => {
			let i = 0,
				names = [],
				bois = [Class.orb],
				n = 0,
				begin = 'Yo some shit is about to happen, move to a lower position!',
				arrival = 'Something odd happened, you should probably let Hellcat know this broke...',
				loc = 'norm';
			let spawn = () => {
				let spot, m = 0;
				do {
					spot = room.randomType(loc);
					m++;
				} while (dirtyCheck(spot, 500) && m < 30);
				let o = new Entity(spot);
				o.define(ran.choose(bois));
				o.team = -100;
				o.name = names[i++];
			};
			return {
				prepareToSpawn: (classArray, number, nameClass, typeOfLocation = 'norm') => {
					n = number;
					bois = classArray;
					loc = typeOfLocation;
					names = ran.chooseBossName(nameClass, number);
					i = 0;
					if (n === 1) {
						begin = 'A boss is coming...';
						arrival = names[0] + ' has arrived!';
					} else {
						begin = 'Bosses are coming...';
						arrival = '';
						for (let i = 0; i < n - 2; i++) arrival += names[i] + ', ';
						arrival += names[n - 2] + ' and ' + names[n - 1] + ' have arrived!';
					}
				},
				spawn: () => {
					sockets.broadcast(begin);
					for (let i = 0; i < n; i++) setTimeout(spawn, ran.randomRange(3500, 5000));
					setTimeout(() => sockets.broadcast(arrival), 5000);
					util.log('[SPAWN] ' + arrival);
				}
			};
		})();
		return census => {
			if (timer > 6000 && ran.dice(16000 - timer)) {
				util.log('[SPAWN] Preparing to spawn...');
				timer = 0;
				let choice = [];
				switch (ran.chooseChance(70, 20, 10)) {
					case 0:
						choice = [
							[Class.elite_destroyer], 2, 'a', 'nest'
						];
						sockets.broadcast('Those in the nest may want to leave very soon...');
						break;
					case 1:
						choice = [
							[Class.elite_gunner], 1, 'a', 'nest'
						];
						sockets.broadcast('A strange trembling...');
						break;
					case 2:
						choice = [
							[Class.fallen_booster], 1, 'a', 'nest'
						];
						sockets.broadcast('Boosters beware...');
						break;
				}
				boss.prepareToSpawn(...choice);
				setTimeout(boss.spawn, 3000);
			} else if (!census.miniboss) timer++;
		};
	})();
	let spawnCrasher = census => {
		if (ran.chance(1 - 0.5 * census.crasher / room.maxFood / room.nestFoodAmount)) {
			let spot, i = 30;
			do {
				spot = room.randomType('nest');
				i--;
				if (!i) return 0;
			} while (dirtyCheck(spot, 100));
			let type = (ran.dice(80)) ? ran.choose([Class.sentryGun, Class.sentrySwarm, Class.sentryTrap]) : Class.crasher;
			let o = new Entity(spot);
			o.define(type);
			o.team = -100;
		}
	};
	let makenpcs = (() => {
		let f = (loc, team) => {
			let o = new Entity(loc);
			o.define(Class.baseProtector);
			o.team = -team;
			o.color = [10, 11, 12, 15][team - 1];
		};
		for (let i = 1; i < 5; i++) room['bas' + i].forEach((loc) => {f(loc, i)});
		return () => {
			let census = {
				crasher: 0,
				miniboss: 0,
				tank: 0
			};
			let npcs = entities.map(function npcCensus(instance) {
				if (census[instance.type] != null) {
					census[instance.type]++;
					return instance;
				}
			}).filter(e => {
				return e;
			});
			spawnCrasher(census);
			spawnBosses(census);
		};
	})();
	let makefood = (() => {
		let food = [],
			foodSpawners = [];
		function getFoodClass(level) {
			let a = {};
			switch (level) {
				case 0:
					a = Class.orb;
					break;
				case 1:
					a = Class.square;
					break;
				case 2:
					a = Class.triangle;
					break;
				case 3:
					a = Class.pentagon;
					break;
				case 4:
					a = Class.betaPentagon;
					break;
				case 5:
					switch (ran.chooseChance(80, 14, 5, 1)) {
						case 0:
							a = Class.alphaPentagon;
							break;
						case 1:
							a = Class.hexagon;
							break;
						case 2:
							a = Class.heptagon;
							break;
						case 3:
							a = Class.octagon;
							break;
					}
					break;
				default:
					throw ('Bad food level!');
			}
			if (a !== {}) a.BODY.ACCELERATION = 0.015 / (a.FOOD.LEVEL + 1);
			return a;
		}
		let placeNewFood = (position, scatter, level, allowInNest = false) => {
			let o = nearest(food, position);
			let mitosis = false;
			let seed = false;
			if (o != null)
				for (let i = 50; i > 0; i--)
					if (scatter == -1 || util.getDistance(position, o) < scatter)
						if (ran.dice((o.foodLevel + 1) * (o.foodLevel + 1))) {
							mitosis = true;
							break;
						} else {
							seed = true;
							break;
						}
			if (scatter != -1 || mitosis || seed)
				if (o != null && (mitosis || seed) && room.isIn('nest', o) === allowInNest) {
					let levelToMake = (mitosis) ? o.foodLevel : level,
						place = {
							x: o.x + o.size * Math.cos(o.facing),
							y: o.y + o.size * Math.sin(o.facing)
						};
					let new_o = new Entity(place);
					new_o.define(getFoodClass(levelToMake));
					new_o.team = -100;
					new_o.facing = o.facing + ran.randomRange(Math.PI / 2, Math.PI);
					food.push(new_o);
					return new_o;
				} else if (room.isIn('nest', position) === allowInNest) {
					if (!dirtyCheck(position, 20)) {
						o = new Entity(position);
						o.define(getFoodClass(level));
						o.team = -100;
						o.facing = ran.randomAngle();
						food.push(o);
						return o;
					}
				}
		};
		class FoodSpawner {
			constructor() {
				this.foodToMake = Math.ceil(Math.abs(ran.gauss(0, room.scale.linear * 80)));
				this.size = Math.sqrt(this.foodToMake) * 25;
				let position = {};
				let o;
				do {
					position = room.gaussRing(1 / 3, 20);
					o = placeNewFood(position, this.size, 0);
				} while (o == null);
				for (let i = Math.ceil(Math.abs(ran.gauss(0, 4))); i <= 0; i--) placeNewFood(o, this.size, 0);
				this.x = o.x;
				this.y = o.y;
				//util.debug('FoodSpawner placed at (' + this.x + ', ' + this.y + '). Set to produce ' + this.foodToMake + ' food.');
			}
			rot() {
				if (--this.foodToMake < 0) {
					//util.debug('FoodSpawner rotted, respawning.');
					util.remove(foodSpawners, foodSpawners.indexOf(this));
					foodSpawners.push(new FoodSpawner());
				}
			}
		}
		foodSpawners.push(new FoodSpawner());
		foodSpawners.push(new FoodSpawner());
		foodSpawners.push(new FoodSpawner());
		foodSpawners.push(new FoodSpawner());
		let makeGroupedFood = () => {
			let spawner = foodSpawners[ran.irandom(foodSpawners.length - 1)],
				bubble = ran.gaussRing(spawner.size, 1 / 4);
			placeNewFood({
				x: spawner.x + bubble.x,
				y: spawner.y + bubble.y
			}, -1, 0);
			spawner.rot();
		};
		let makeDistributedFood = () => {
			//util.debug('Creating new distributed food.');
			let spot = {};
			do {
				spot = room.gaussRing(1 / 2, 2);
			} while (room.isInNorm(spot));
			placeNewFood(spot, 0.01 * room.width, 0);
		};
		let makeCornerFood = () => {
			let spot = {};
			do {
				spot = room.gaussInverse(5);
			} while (room.isInNorm(spot));
			placeNewFood(spot, 0.05 * room.width, 0);
		};
		let makeNestFood = () => {
			let spot = room.randomType('nest');
			placeNewFood(spot, 0.01 * room.width, 3, true);
		};
		return () => {
			let census = {
				[0]: 0, // Orb
				[1]: 0, // Square
				[2]: 0, // Triangle
				[3]: 0, // Penta
				[4]: 0, // Beta
				[5]: 0, // Alpha, Hexagon, Heptagon
				[6]: 0,
				tank: 0,
				sum: 0
			};
			let censusNest = {
				[0]: 0, // Orb
				[1]: 0, // Square
				[2]: 0, // Triangle
				[3]: 0, // Penta
				[4]: 0, // Beta
				[5]: 0, // Alpha, Hexagon, Heptagon
				[6]: 0,
				sum: 0
			};
			food = entities.map(instance => {
				try {
					if (instance.type === 'tank') census.tank++;
					else if (instance.foodLevel > -1) {
						if (room.isIn('nest', {
								x: instance.x,
								y: instance.y
							})) {
							censusNest.sum++;
							censusNest[instance.foodLevel]++;
						} else {
							census.sum++;
							census[instance.foodLevel]++;
						}
						return instance;
					}
				} catch (e) {
					util.error(instance.label);
					util.error(e);
					instance.kill();
				}
			}).filter(e => {
				return e;
			});
			let maxFood = 1 + room.maxFood + 15 * census.tank;
			let maxNestFood = 1 + room.maxFood * room.nestFoodAmount;
			let foodAmount = census.sum;
			let nestFoodAmount = censusNest.sum;
			foodSpawners.forEach(spawner => {
				if (ran.chance(1 - foodAmount / maxFood)) spawner.rot();
			});
			while (ran.chance(0.8 * (1 - foodAmount * foodAmount / maxFood / maxFood))) {
				switch (ran.chooseChance(10, 2, 1)) {
					case 0:
						makeGroupedFood();
						break;
					case 1:
						makeDistributedFood();
						break;
					case 2:
						makeCornerFood();
						break;
				}
			}
			while (ran.chance(0.5 * (1 - nestFoodAmount * nestFoodAmount / maxNestFood / maxNestFood))) makeNestFood();
			if (!food.length) return 0;
			for (let i = Math.ceil(food.length / 100); i > 0; i--) {
				let o = food[ran.irandom(food.length - 1)],
					oldId = -1000,
					overflow, location;
				for (let j = 0; j < 6; j++) {
					overflow = 10;
					do {
						o = nearest(food, {
							x: ran.gauss(o.x, 30),
							y: ran.gauss(o.y, 30)
						});
					} while (o.id === oldId && --overflow);
					if (!overflow) continue;
					let proportions = c.FOOD,
						cens = census,
						amount = foodAmount;
					if (room.isIn('nest', o)) {
						proportions = c.FOOD_NEST;
						cens = censusNest;
						amount = nestFoodAmount;
					}
					o.foodCountup += Math.ceil(Math.abs(ran.gauss(0, 10)));
					let lvl = o.foodLevel + 1;
					while (o.foodCountup >= (lvl) * 100) {
						o.foodCountup -= (lvl) * 100;
						if (ran.chance(1 - cens[lvl] / amount / proportions[lvl])) o.define(getFoodClass(lvl));
					}
				}
			}
		};
	})();
	return () => {
		makenpcs();
		makefood();
		entities.forEach(instance => {
			if (instance.shield.max) instance.shield.regenerate();
			if (instance.health.amount) instance.health.regenerate(instance.shield.max && instance.shield.max === instance.shield.amount);
		});
	};
})();
var speedcheckloop = (() => {
	return () => {
		let activationtime = logs.activation.sum(),
			collidetime = logs.collide.sum(),
			movetime = logs.entities.sum(),
			playertime = logs.network.sum(),
			maptime = logs.minimap.sum(),
			physicstime = logs.physics.sum(),
			lifetime = logs.life.sum(),
			selfietime = logs.selfie.sum(),
			sum = logs.master.record(),
			loops = logs.loops.count(),
			active = logs.entities.count();
		global.fps = (1000 / sum).toFixed(2);
		if (sum > 1000 / roomSpeed / 30) {
			util.warn('~~ LOOPS: ' + loops + '. ENTITY #: ' + entities.length + '//'
				+ Math.round(active / loops) + '. VIEW #: ' + views.length + '. BACKLOGGED :: ' + (sum * roomSpeed * 3).toFixed(3) + '%! ~~');
			if (c.ADV_BACKLOGGING === true) {
				util.warn('Total activation time: ' + activationtime);
				util.warn('Total collision time: ' + collidetime);
				util.warn('Total cycle time: ' + movetime);
				util.warn('Total player update time: ' + playertime);
				util.warn('Total lb+minimap processing time: ' + maptime);
				util.warn('Total entity physics calculation time: ' + physicstime);
				util.warn('Total entity life+thought cycle time: ' + lifetime);
				util.warn('Total entity selfie-taking time: ' + selfietime);
				util.warn('Total time: ' + (activationtime + collidetime + movetime + playertime + maptime + physicstime + lifetime + selfietime));
			}
		}
	};
})();
var server = http.createServer(app);
var websockets = (() => {
	let config = {
		server: server
	};
	if (c.servesStatic) {
		server.listen(c.port, function httpListening() {
			util.log((new Date()) + ". Joint HTTP+Websocket server turned on, listening on port " + server.address().port + ".");
		});
	} else {
		config.port = c.port;
		util.log((new Date()) + 'Websocket server turned on, listening on port ' + c.port + '.');
	}
	return new WebSocket.Server(config);
})().on('connection', sockets.connect);

setInterval(gameloop, room.cycleSpeed);
setInterval(maintainloop, 200);
setInterval(speedcheckloop, 1000);

// Graceful shutdown
if (process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("SIGINT", () => {
		process.emit("SIGINT");
	});
}
// Close the arena
let closeArena = () => {
	sockets.broadcast('Arena Closed: No players can join.');
	let o1 = new Entity({
		x: room.width * 0.25,
		y: room.height * -0.25
	});
	o1.define(Class.arenaCloserAI);
	let o2 = new Entity({
		x: room.width * 0.25,
		y: room.height * 1.25
	});
	o2.define(Class.arenaCloserAI);
	let o3 = new Entity({
		x: room.width * -0.25,
		y: room.height * 0.25
	});
	o3.define(Class.arenaCloserAI);
	let o4 = new Entity({
		x: room.width * 1.25,
		y: room.height * 0.25
	});
	o4.define(Class.arenaCloserAI);
	let o5 = new Entity({
		x: room.width * 0.75,
		y: room.height * -0.25
	});
	o5.define(Class.arenaCloserAI);
	let o6 = new Entity({
		x: room.width * 0.75,
		y: room.height * 1.25
	});
	o6.define(Class.arenaCloserAI);
	let o7 = new Entity({
		x: room.width * -0.25,
		y: room.height * 0.75
	});
	o7.define(Class.arenaCloserAI);
	let o8 = new Entity({
		x: room.width * 1.25,
		y: room.height * 0.75
	});
	o8.define(Class.arenaCloserAI);
	o1.team = o2.team = o3.team = o4.team = o5.team = o6.team = o7.team = o8.team = -100;
	setInterval(() => {
		let players = sockets.players.filter(player => player && player.body && !player.body.isGhost).length;
		players <= 0 && setTimeout(() => {
			util.warn('All players are dead! Process ended.');
			process.exit();
		}, 3750);
	}, 250);
	setTimeout(() => {
		util.warn('Arena Closers took to long! Process ended.');
		process.exit();
	}, 6e4);
};
// Forced shutdown
process.on("SIGINT", () => {
	if (arenaIsClosed === true) {
		util.warn('Force exit enduced! Process ended.');
		process.exit();
	} else {
		arenaIsClosed = true;
		closeArena();
		util.log('Server going down, warning broadcasted.');
	}
});