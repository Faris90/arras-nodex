// Tank Definitions
// TO DO: Finish the Punt Gunner branch (exports.puntGunner)

const combineStats = function(array) {
	try {
		let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		array.forEach(function(component) {
			for (let i = 0; i < data.length; i++) data[i] = data[i] * component[i];
		});
		return {
			reload: data[0],
			recoil: data[1],
			shudder: data[2],
			size: data[3],
			health: data[4],
			damage: data[5],
			pen: data[6],
			speed: data[7],
			maxSpeed: data[8],
			range: data[9],
			density: data[10],
			spray: data[11],
			resist: data[12]
		};
	} catch (e) {
		console.log(e);
		console.log(JSON.stringify(array));
	}
};
const skillSet = (() => {
	let c = require('../../../config.json');
	let skcnv = {
		rld: 0, // Weapon Reload
		pen: 1, // Weapon Penetration
		str: 2, // Weapon Health
		dam: 3, // Weapon Damage
		spd: 4, // Weapon Speed
		shi: 5, // Body Shield
		atk: 6, // Body Damage
		hlt: 7, // Body Health
		rgn: 8, // Shield Regen
		mob: 9  // Move Speed
	};
	return args => {
		let skillCap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let i in args) {
			if (!args.hasOwnProperty(i)) continue;
			skillCap[skcnv[i]] = Math.round(c.MAX_SKILL * args[i]);
		}
		return skillCap;
	};
})();
const g = {
	/*RELOAD, RECOIL, SHUDDER, SIZE, HEALTH, DAMAGE, PEN, SPEED, MAX, RANGE, DENSITY, SPRAY, RESIST*/
	blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	trap: [36, 1, 0.25, 0.6, 1, 0.75, 1, 5, 1, 1, 1, 15, 3],
	swarm: [18, 0.25, 0.05, 0.4, 1, 0.725, 1, 4, 1, 1, 1, 5, 1],
	drone: [50, 0.25, 0.1, 0.6, 1, 1, 1, 2, 1, 1, 1, 0.1, 1],
	factory: [60, 1, 0.1, 0.7, 1, 0.75, 1, 3, 1, 1, 1, 0.1, 1],
	basic: [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
	command: [1.75, 1.5, 0.1, 1.25, 1, 0.75, 0.85, 1, 1, 1, 1, 1, 1],
	spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, 0.9, 0.7, 1, 1, 1, 1.05],
	minion: [1, 1, 2, 1, 0.4, 0.4, 1.2, 1, 1, 0.75, 1, 2, 1],
	single: [0.95, 1.05, 1, 1, 1, 1.05, 1.05, 1.05, 1, 1, 1, 1.15, 1],
	sniper: [1.35, 1, 0.25, 1, 1, 0.8, 1.1, 1.5, 1.5, 1, 1.5, 0.2, 1.15],
	rifle: [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1],
	assassin: [1.65, 1, 0.25, 1, 1.1, 0.85, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
	hunter: [1.5, 0.7, 1, 0.95, 1, 0.9, 1, 1.1, 0.8, 1, 1.2, 1, 1.15],
	hunter2: [1, 1, 1, 0.9, 2, 0.5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
	preda: [1.4, 1, 1, 0.8, 1.5, 0.9, 1.2, 0.9, 0.9, 1, 1, 1, 1],
	snake: [0.4, 1, 4, 1, 1.5, 0.9, 1.2, 0.2, 0.35, 1, 3, 6, 0.5],
	sidewind: [2, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
	snake_skin: [0.6, 1, 2, 1, 0.5, 0.5, 1, 1, 0.2, 0.4, 1, 5, 1],
	mach: [0.5, 0.8, 1.7, 1, 0.7, 0.7, 1, 1, 0.8, 1, 1, 2.5, 1],
	blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, 0.6, 0.8, 0.33, 0.6, 0.5, 1.5, 0.8],
	chain: [1.25, 1.33, 0.8, 1, 0.8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, 0.5, 1.1],
	mini: [1.25, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
	mini_trap: [0.75, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
	stream: [1.1, 0.6, 1, 1, 1, 0.65, 1, 1.24, 1, 1, 1, 1, 1],
	sgun: [8, 0.4, 1, 1.5, 1, 0.4, 0.8, 1.8, 0.6, 1, 1.2, 1.2, 1],
	flank: [1, 1.2, 1, 1, 1.02, 0.81, 0.9, 1, 0.85, 1, 1.2, 1, 1],
	tri: [1, 0.9, 1, 1, 0.9, 1, 1, 0.8, 0.8, 0.6, 1, 1, 1],
	tri_front: [1, 0.2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
	thruster: [1, 1.5, 1.75, 1, 0.25, 0.25, 0.5, 1, 1, 1, 1, 0.5, 0.75],
	auto: [1.8, 0.75, 0.5, 0.8, 0.9, 0.6, 1.2, 1.1, 1, 0.8, 1.3, 1, 1.25],
	super_auto: [3.5, 0, 0.65, 0.9, 0.85, 0.75, 1.15, 1.1, 1.1, 0.875, 1.3, 1.1, 1.25],
	five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
	defend_auto: [1.25, 1, 1, 1, 1, 1, 1, 1.25, 1.1, 1.15, 2, 1.1, 1],
	levi_five: [1.45, 0, 1, 1, 0.95, 0.95, 0.95, 1.125, 1.1, 1.15, 2, 1.1, 1],
	levi: [2, 0, 1.25, 1, 1, 1, 1, 0.65, 1, 0.75, 1, 1, 1],
	snipe3: [1, 1, 1, 1.35, 1.45, 1.15, 1.1, 0.75, 1, 1, 1, 1, 1],
	pound: [2, 1.6, 1, 1, 1, 2, 1, 0.85, 0.8, 1, 1.5, 1, 1.15],
	destroy: [2.2, 1.5, 0.25, 1, 2, 2, 1.2, 0.85, 0.5, 1, 2, 1, 3],
	anni: [0.85, 1.75, 0.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	op_anni: [0.5, 0, 0.25, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
	hive: [1.5, 0.8, 1, 0.8, 0.7, 0.3, 1, 1, 0.6, 1, 1, 1, 1],
	arti: [1.2, 0.7, 1, 0.9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
	mortar: [1.2, 1, 1, 1, 1.1, 1, 1, 0.8, 0.8, 1, 1, 1, 1],
	spread_main: [0.78, 0.25, 0.5, 1, 0.75, 1, 1, 1.925, 1.154, 1, 1, 1, 1],
	spread: [1.5, 1, 0.25, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 0.25, 1],
	skim: [1.33, 0.8, 0.8, 0.9, 1.35, 0.8, 2, 0.3, 0.3, 1, 1, 1, 1.1],
	twin: [1, 0.5, 0.9, 1, 0.9, 0.7, 1, 1, 1, 1, 1, 1.2, 1],
	bent: [1.1, 1, 0.8, 1, 0.9, 1, 0.8, 1, 1, 1, 0.8, 0.5, 1],
	triple: [1.2, 0.66667, 0.9, 1, 0.85, 0.85, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
	quint: [1.5, 0.66667, 0.9, 1, 1, 1, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
	dual: [3, 1, 0.8, 1, 1.3, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
	double: [1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1],
	hewn: [1.25, 1.5, 1, 1, 0.9, 0.85, 1, 1, 0.9, 1, 1, 1, 1],
	pure_gunner: [1, 0.25, 1.5, 1.2, 1.35, 0.25, 1.25, 0.8, 0.65, 1, 1.5, 1.5, 1.2],
	machgun: [0.66, 0.8, 2, 1, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.5, 1],
	gunner: [1.25, 0.25, 1.5, 1.1, 1, 0.35, 1.35, 0.9, 0.8, 1, 1.5, 1.5, 1.2],
	power: [1, 1, 0.6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, 0.5, 1.5],
	nail: [0.85, 2.5, 1, 0.8, 1, 0.7, 1, 0.75, 1, 1, 2, 1, 1],
	fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
	turret: [2, 1, 1, 1, 0.8, 0.6, 0.7, 1, 1, 1, 0.1, 1, 1],
	auto_turret: [2, 1, 1, 0.85, 0.85, 0.8, 0.85, 0.65, 1, 1, 0.1, 1, 1],
	battle: [1.65, 1, 1, 1, 1.1, 1.1, 1, 1, 0.85, 1, 1, 1, 1.1],
	bees: [1.3, 1, 1, 1.4, 1, 1.5, 0.5, 3, 1.5, 1, 0.25, 1, 1],
	carrier: [1.5, 1, 1, 1, 1, 0.8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
	hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, 0.8, 1, 0.5, 1, 1, 1],
	octogeddon: [1.25, 0, 0.25, 1.45, 1, 1, 1, 0.6, 1, 1.1, 1, 1, 1],
	defend: [1.25, 1, 0.25, 0.85, 1.1, 1.1, 1.1, 0.85, 1, 2.25, 1, 1, 1],
	block: [1.1, 2, 0.1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
	construct: [1.3, 1, 1, 0.9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
	boomerang: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.33333, 1, 1, 1],
	over: [1.25, 1, 1, 0.85, 0.7, 0.95, 1, 1, 0.9, 1, 2, 1, 1],
	meta: [1.33333, 1, 1, 1, 1, 0.66667, 1, 1, 1, 1, 1, 1, 1],
	weak: [2, 1, 1, 1, 0.6, 0.6, 0.8, 0.6, 0.75, 0.25, 0.3, 1, 1],
	master: [3, 1, 1, 0.7, 0.45, 0.9, 1, 1, 1, 0.1, 0.5, 1, 1],
	sunchip: [5, 1, 1, 1.4, 0.4, 0.35, 0.5, 0.975, 1, 1, 0.8, 1, 1],
	baby_factory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
	low_power: [1, 1, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
	no_recoil: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	half_recoil: [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	more_recoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	much_more_recoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	lots_more_recoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	tons_more_recoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	double_reload: [0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	more_reload: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	one_third_reload: [1.33333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	less_reload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	half_reload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	true_spam: [0.375, 1, 1, 1, 1, 1, 1, 0.3, 0.25, 0.25, 1, 1, 1],
	dominator: [6.5, 0, 1, 0.975, 6.25, 6.25, 6.25, 0.5, 1, 1, 1, 0.5, 1],
	gun_dominator: [1, 0, 1, 0.5, 0.5, 0.5, 1.25, 1.15, 1, 1, 1, 1.25, 1],
	trap_dominator: [1.275, 0, 0.25, 1, 1.75, 1.5, 1.75, 0.5, 2, 0.75, 1, 0.5, 1],
	dem_trap: [1.35, 0, 0.5, 1.25, 1.05, 1, 1.25, 0.5, 1.55, 1, 1, 0.5, 1],
	dem_mach: [2.85, 0, 1, 0.55, 0.75, 0.75, 0.75, 1.15, 1, 1, 1, 1.25, 1],
	dem_factory: [175, 0, 0.25, 0.315, 0.5, 0.5, 0.5, 2.45, 1, 1, 1, 0.5, 1],
	dem_minion: [1.35, 0.95, 1.85, 0.9, 0.4, 0.35, 0.4, 0.5, 1, 0.75, 1, 1.85, 1],
	more_speed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
	slow: [1, 1, 1, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 1, 1],
	not_dense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1, 1],
	half_range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1],
	fake: [1, 1, 1, 0.00001, 0.0001, 1, 1, 0.00001, 2, 0, 1, 1, 1],
	testbed: [1.2, 0.75, 1, 1, 1.75, 1.75, 1.75, 1.15, 2, 1.25, 4, 1.45, 1],
	closer: [1.25, 1, 1, 1, 25, 50, 50, 2, 2, 1.4, 4, 1, 1],
	closer_ai: [1.25, 1, 1, 1.1, 1e5, 1e5, 1e5, 5.25, 2, 1.4, 4, 0.1, 1],
	protector_swarm: [4.5, 0, 1, 1.5, 100, 2.5, 2.5, 1, 1, 0.55, 5, 1, 10],
	dread: [0.85, 0.25, 0.75, 0.95, 1.25, 1.05, 1.05, 1.05, 1, 1, 1, 1.25, 1],
	dread_trap: [1.15, 0.5, 0.25, 0.975, 1.05, 1.05, 1.05, 1.1, 1, 1, 1, 1, 3],
	half_speed: [1, 0, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1],
	smaller: [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	stronger: [0.85, 1, 1.25, 1, 1.15, 1.15, 1.15, 1.15, 1, 1, 1, 1, 1],
};
const DEFAULT_SKILL = 9;
const statNames = {
	smasher: 1,
	drone: 2,
	necro: 3,
	swarm: 4,
	trap: 5,
	generic: 6,
	autosmash: 7
};
const gunCalcNames = {
	default: 0,
	bullet: 1,
	drone: 2,
	swarm: 3,
	fixedReload: 4,
	thruster: 5,
	sustained: 6,
	necro: 7,
	trap: 8
};
function makeAuto(type, name = -1, options = {}) {
	let turret = {
		type: exports.autoTurret,
		size: 10,
		independent: true
	};
	if (options.type != null) turret.type = options.type;
	if (options.size != null) turret.size = options.size;
	if (options.independent != null) turret.independent = options.independent;
	let output = JSON.parse(JSON.stringify(type));
	let autogun = {
		POSITION: [turret.size, 0, 0, 180, 360, 1],
		TYPE: [turret.type, {
			CONTROLLERS: ['nearestDifferentMaster'],
			INDEPENDENT: turret.independent
		}]
	};
	if (type.GUNS != null) output.GUNS = type.GUNS;
	if (type.TURRETS == null) output.TURRETS = [autogun];
	else output.TURRETS = [...type.TURRETS, autogun];
	if (name == -1) output.LABEL = 'Auto-' + type.LABEL;
	else output.LABEL = name;
	output.DANGER = type.DANGER + 1;
	return output;
}
function makeHybrid(type, name = -1) {
	let output = JSON.parse(JSON.stringify(type));
	let spawner = {
		POSITION: [7, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
			TYPE: [exports.drone, {
				INDEPENDENT: true
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 3
		}
	};
	if (type.TURRETS != null) output.TURRETS = type.TURRETS;
	if (type.GUNS == null) output.GUNS = [spawner];
	else output.GUNS = [...type.GUNS, spawner];
	if (name == -1) output.LABEL = 'Hybrid ' + type.LABEL;
	else output.LABEL = name;
	return output;
}

// ENTITY DEFINITIONS
exports.genericEntity = {
	NAME: '',
	LABEL: 'Generic Entity',
	TYPE: 'unknown',
	DAMAGE_CLASS: 0, // 0: default, 1: food, 2: tanks, 3: obstacles
	DANGER: 0,
	VALUE: 0,
	SHAPE: 0,
	COLOR: 16,
	INDEPENDENT: false,
	CONTROLLERS: ['doNothing'],
	HAS_NO_MASTER: false,
	MOTION_TYPE: 'glide', // motor, swarm, chase, glide
	FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
	DRAW_HEALTH: false,
	DRAW_SELF: true,
	DAMAGE_EFFECTS: true,
	RATEFFECTS: true,
	MOTION_EFFECTS: true,
	INTANGIBLE: false,
	ACCEPTS_SCORE: true,
	GIVE_KILL_MESSAGE: false,
	CAN_GO_OUTSIDE_ROOM: false,
	HAS_NO_SKILL_POINTS: false,
	HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer, normal
	DIE_AT_LOW_SPEED: false,
	DIE_AT_RANGE: false,
	CLEAR_ON_MASTER_UPGRADE: false,
	PERSISTS_AFTER_DEATH: false,
	VARIES_IN_SIZE: false,
	HEALTH_WITH_LEVEL: true,
	CAN_BE_ON_LEADERBOARD: true,
	HAS_NO_RECOIL: false,
	AUTO_UPGRADE: 'none',
	BUFF_VS_FOOD: false,
	OBSTACLE: false,
	CRAVES_ATTENTION: false,
	NECRO: false,
	UPGRADES_TIER_1: [],
	UPGRADES_TIER_2: [],
	UPGRADES_TIER_3: [],
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	LEVEL: 0,
	SKILL_CAP: [
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL
	],
	GUNS: [],
	TURRETS: [],
	MAX_CHILDREN: 0,
	BODY: {
		ACCELERATION: 1,
		SPEED: 0,
		HEALTH: 1,
		RESIST: 1,
		SHIELD: 0,
		REGEN: 0,
		DAMAGE: 1,
		PENETRATION: 1,
		RANGE: 0,
		FOV: 1,
		DENSITY: 1,
		STEALTH: 1,
		PUSHABILITY: 1,
		HETERO: 2
	},
	FOOD: {
		LEVEL: -1
	},
	DIES_TO_TEAM_BASE: true,
	GOD_MODE: false,
	COLOR_OVERRIDE: -1
};

// FOOD
exports.food = {
	TYPE: 'food',
	DAMAGE_CLASS: 1,
	CONTROLLERS: ['moveInCircles'],
	HITS_OWN_TYPE: 'repel',
	MOTION_TYPE: 'drift',
	FACING_TYPE: 'turnWithSpeed',
	VARIES_IN_SIZE: true,
	BODY: {
		STEALTH: 30,
		PUSHABILITY: 1
	},
	DAMAGE_EFFECTS: false,
	RATEFFECTS: false,
	HEALTH_WITH_LEVEL: false,
	CAN_BE_ON_LEADERBOARD: false,
	//ACCEPTS_SCORE: false,
};
exports.octagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Octagon',
	VALUE: 15000,
	SHAPE: -8,
	SIZE: 70,
	COLOR: 0,
	BODY: {
		DAMAGE: 3.25,
		DENSITY: 85,
		HEALTH: 850,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 110,
		REGEN: 0.5
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.heptagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Heptagon',
	VALUE: 12500,
	SHAPE: -7,
	SIZE: 66,
	COLOR: 24,
	BODY: {
		DAMAGE: 3,
		DENSITY: 80,
		HEALTH: 800,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 100,
		REGEN: 0.5
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.hexagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Hexagon',
	VALUE: 10000,
	SHAPE: -6,
	SIZE: 62,
	COLOR: 22,
	BODY: {
		DAMAGE: 2.5,
		DENSITY: 80,
		HEALTH: 700,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 90,
		REGEN: 0.5
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.alphaPentagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Alpha Pentagon',
	VALUE: 7500,
	SHAPE: -5,
	SIZE: 58,
	COLOR: 14,
	BODY: {
		DAMAGE: 2,
		DENSITY: 75,
		HEALTH: 600,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 80,
		REGEN: 0.6
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.betaPentagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 4
	},
	LABEL: 'Beta Pentagon',
	VALUE: 2500,
	SHAPE: 5,
	SIZE: 30,
	COLOR: 14,
	BODY: {
		DAMAGE: 2,
		DENSITY: 30,
		HEALTH: 100,
		RESIST: Math.pow(1.25, 2),
		SHIELD: 40,
		REGEN: 0.25
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.pentagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 3
	},
	LABEL: 'Pentagon',
	VALUE: 500,
	SHAPE: 5,
	SIZE: 16,
	COLOR: 14,
	BODY: {
		DAMAGE: 1.5,
		DENSITY: 8,
		HEALTH: 20,
		RESIST: 1.25,
		PENETRATION: 1.1
	},
	DRAW_HEALTH: true
};
exports.triangle = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 2
	},
	LABEL: 'Triangle',
	VALUE: 150,
	SHAPE: 3,
	SIZE: 9,
	COLOR: 2,
	BODY: {
		DAMAGE: 1,
		DENSITY: 6,
		HEALTH: 6,
		RESIST: 1.15,
		PENETRATION: 1.5
	},
	DRAW_HEALTH: true
};
exports.square = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 1
	},
	LABEL: 'Square',
	VALUE: 30,
	SHAPE: 4,
	SIZE: 10,
	COLOR: 13,
	BODY: {
		DAMAGE: 1,
		DENSITY: 4,
		HEALTH: 2,
		PENETRATION: 2
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false
};
exports.orb = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 0
	},
	LABEL: 'Orb',
	VALUE: 10,
	SHAPE: 0,
	SIZE: 5,
	COLOR: 6,
	INTANGIBLE: true,
	BODY: {
		DAMAGE: 0,
		DENSITY: 2,
		HEALTH: 0.0011,
		PUSHABILITY: 0
	},
	DRAW_HEALTH: false
};
exports.obstacle = {
	LABEL: 'Obstacle',
	TYPE: 'wall',
	DAMAGE_CLASS: 1,
	FACING_TYPE: 'turnWithSpeed',
	SHAPE: -9,
	BODY: {
		PUSHABILITY: 0,
		HEALTH: 1e4,
		SHIELD: 1e4,
		REGEN: 1000,
		DAMAGE: 1,
		RESIST: 100,
		STEALTH: 1
	},
	VALUE: 0,
	SIZE: 60,
	COLOR: 16,
	VARIES_IN_SIZE: true,
	GIVE_KILL_MESSAGE: true,
	ACCEPTS_SCORE: false,
	GUNS: [],
	TURRETS: []
};
exports.babyObstacle = {
	PARENT: [exports.obstacle],
	LABEL: 'Obstacle',
	SIZE: 25,
	SHAPE: -7
};
exports.bullet = {
	LABEL: 'Bullet',
	TYPE: 'bullet',
	ACCEPTS_SCORE: false,
	BODY: {
		PENETRATION: 1,
		SPEED: 3.75,
		RANGE: 90,
		DENSITY: 1.25,
		HEALTH: 0.165,
		DAMAGE: 6,
		PUSHABILITY: 0.3
	},
	FACING_TYPE: 'smoothWithMotion',
	CAN_GO_OUTSIDE_ROOM: true,
	HITS_OWN_TYPE: 'never',
	DIE_AT_RANGE: true
};
exports.casing = {
	PARENT: [exports.bullet],
	LABEL: 'Shell',
	TYPE: 'swarm'
};
exports.swarm = {
	LABEL: 'Swarm Drone',
	TYPE: 'swarm',
	ACCEPTS_SCORE: false,
	SHAPE: 3,
	MOTION_TYPE: 'swarm',
	FACING_TYPE: 'smoothWithMotion',
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	CRAVES_ATTENTION: true,
	BODY: {
		ACCELERATION: 3,
		PENETRATION: 1.5,
		HEALTH: 0.175,
		DAMAGE: 2.25,
		SPEED: 4.5,
		RESIST: 1.6,
		RANGE: 225,
		DENSITY: 12,
		PUSHABILITY: 0.5,
		FOV: 1.5
	},
	DIE_AT_RANGE: true,
	BUFF_VS_FOOD: true
};
exports.bee = {
	PARENT: [exports.swarm],
	LABEL: 'Bee',
	PERSISTS_AFTER_DEATH: true,
	SHAPE: 4,
	HITS_OWN_TYPE: 'hardWithBuffer'
};
exports.autoSwarm = {
	PARENT: [exports.swarm],
	AI: {
		FARMER: true
	},
	INDEPENDENT: true
};
exports.protectSwarm = {
	PARENT: [exports.autoSwarm],
	AI: {
		FARMER: false
	},
	HITS_OWN_TYPE: 'never'
};
exports.trap = {
	LABEL: 'Trap',
	TYPE: 'trap',
	ACCEPTS_SCORE: false,
	SHAPE: -3,
	MOTION_TYPE: 'glide',
	FACING_TYPE: 'turnWithSpeed',
	HITS_OWN_TYPE: 'push',
	DIE_AT_RANGE: true,
	BODY: {
		HEALTH: 0.5,
		DAMAGE: 3,
		RANGE: 450,
		DENSITY: 2.5,
		RESIST: 2.5,
		SPEED: 0
	}
};
exports.pentaTrap = {
	PARENT: [exports.trap],
	SHAPE: -5
};
exports.block = {
	PARENT: [exports.trap],
	LABEL: 'Trap',
	SHAPE: -4,
	MOTION_TYPE: 'motor',
	CONTROLLERS: ['goToMasterTarget'],
	BODY: {
		SPEED: 1,
		DENSITY: 5
	}
};
exports.boomerang = {
	PARENT: [exports.trap],
	LABEL: 'Boomerang',
	CONTROLLERS: ['boomerang'],
	MOTION_TYPE: 'motor',
	HITS_OWN_TYPE: 'never',
	SHAPE: -5,
	BODY: {
		SPEED: 1.25,
		RANGE: 120
	}
};
exports.drone = {
	LABEL: 'Drone',
	TYPE: 'drone',
	ACCEPTS_SCORE: false,
	DANGER: 2,
	CONTROL_RANGE: 0,
	SHAPE: 3,
	MOTION_TYPE: 'chase',
	FACING_TYPE: 'smoothToTarget',
	CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster'],
	AI: {
		BLIND: true
	},
	BODY: {
		PENETRATION: 1.2,
		PUSHABILITY: 0.6,
		ACCELERATION: 0.05,
		HEALTH: 0.3,
		DAMAGE: 3.375,
		SPEED: 3.8,
		RANGE: 200,
		DENSITY: 0.03,
		RESIST: 1.5,
		FOV: 0.8
	},
	HITS_OWN_TYPE: 'hard',
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	BUFF_VS_FOOD: true
};
exports.mothership_drone = {
	PARENT: [exports.drone],
	BODY: {
		PENETRATION: 1.25,
		PUSHABILITY: 0.5,
		ACCELERATION: 0.03,
		HEALTH: 1,
		DAMAGE: 3.5,
		SPEED: 3.95,
		RANGE: 100,
		RESIST: 1.25,
		FOV: 0.75,
		DENSITY: 0.05
	}
};
exports.sunchip = {
	PARENT: [exports.drone],
	SHAPE: 4,
	NECRO: true,
	HITS_OWN_TYPE: 'hard',
	BODY: {
		FOV: 0.5
	},
	AI: {
		BLIND: true,
		FARMER: true
	},
	DRAW_HEALTH: false
};
exports.missile = {
	PARENT: [exports.bullet],
	LABEL: 'Missile',
	INDEPENDENT: true,
	BODY: {
		RANGE: 120
	},
	GUNS: [{
		POSITION: [14, 6, 1, 0, -2, 130, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 6, 1, 0, 2, 230, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}]
};
exports.snake = {
	PARENT: [exports.bullet],
	LABEL: 'Snake',
	INDEPENDENT: true,
	BODY: {
		RANGE: 120
	},
	GUNS: [{
		POSITION: [6, 12, 1.4, 8, 0, 180, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			STAT_CALCULATOR: gunCalcNames.thruster,
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snake_skin]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}]
		}
	}, {
		POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
		PROPERTIES: {
			AUTOFIRE: true,
			NEGATIVE_RECOIL: true,
			STAT_CALCULATOR: gunCalcNames.thruster,
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.snake]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}]
		}
	}]
};
exports.hive = {
	PARENT: [exports.bullet],
	LABEL: 'Hive',
	BODY: {
		RANGE: 90,
		FOV: 0.5
	},
	FACING_TYPE: 'turnWithSpeed',
	INDEPENDENT: true,
	CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
	AI: {
		NO_LEAD: true
	},
	GUNS: [{
		POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};

const base = {
	ACCEL: 1.6,
	SPEED: 5.25,
	HEALTH: 20,
	DAMAGE: 3,
	RESIST: 1,
	PENETRATION: 1.05,
	SHIELD: 8,
	REGEN: 0.025,
	FOV: 1,
	DENSITY: 0.5
};

exports.genericTank = {
	LABEL: 'Unknown Class',
	TYPE: 'tank',
	DAMAGE_CLASS: 2,
	DANGER: 5,
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'toTarget',
	SIZE: 12,
	MAX_CHILDREN: 0,
	DAMAGE_EFFECTS: false,
	BODY: {
		ACCELERATION: base.ACCEL,
		SPEED: base.SPEED,
		HEALTH: base.HEALTH,
		DAMAGE: base.DAMAGE,
		PENETRATION: base.PENETRATION,
		SHIELD: base.SHIELD,
		REGEN: base.REGEN,
		FOV: base.FOV,
		DENSITY: base.DENSITY,
		PUSHABILITY: 0.9,
		HETERO: 3
	},
	GUNS: [],
	TURRETS: [],
	GIVE_KILL_MESSAGE: true,
	DRAW_HEALTH: true,
	HAS_NO_SKILL_POINTS: false,
	COLOR_OVERRIDE: -1
};
exports.autoTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Turret',
	BODY: {
		FOV: 0.75
	},
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.more_recoil, g.auto_turret]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMatonGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [26, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 12, 1, 0, 0, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.75
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto5gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.75
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [24, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
			TYPE: exports.bullet
		}
	}]
};
exports.defenderGun = {
	PARENT: [exports.auto3gun],
	BODY: {
		FOV: 1.5
	},
	GUNS: [{
		POSITION: [24, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.defend_auto]),
			TYPE: exports.bullet
		}
	}]
};
exports.levi5gun = {
	PARENT: [exports.auto3gun],
	GUNS: [{
		POSITION: [22, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.levi_five]),
			TYPE: exports.bullet
		}
	}]
};
exports.heavy3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2,
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
			TYPE: exports.bullet
		}
	}]
};
exports.superHeavyGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 1
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [4.5, 14, 1, 10, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.super_auto]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 14, -1.35, 0, 0, 0, 0]
	}]
};
exports.superHeavyMach = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.25
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [14.25, 5, 1, 3, -3.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.25, 5, 1, 3, 3.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15.85, 5, 1, 3, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12.25, 14, -1.35, 0, 0, 0, 0]
	}]
};
exports.machine3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 2.5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [14, 11, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.more_recoil, g.turret, g.mach, g.slow, g.smaller]),
			TYPE: exports.bullet
		}
	}]
};
exports.trishot3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 2.5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.heavyGunSentry = {
	PARENT: [exports.heavy3gun],
	HAS_NO_RECOIL: true
};
exports.trapTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 0.5
	},
	INDEPENDENT: true,
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	AI: {
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [16, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 14, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};
exports.octogeddonTurret = {
	PARENT: [exports.trapTurret],
	GUNS: [{
		POSITION: [16, 9, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 9, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload, g.octogeddon]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}]
};
exports.crasherSpawner = {
	PARENT: [exports.genericTank],
	LABEL: '',  
	STAT_NAMES: statNames.drone,
	CONTROLLERS: ['nearestDifferentMaster'], 
	AI: {
		chase: true
	},
	MAX_CHILDREN: 4,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0], 
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
			TYPE: [exports.drone, {
				LABEL: 'Crasher',
				VARIES_IN_SIZE: true,
				DRAW_HEALTH: false
			}],
			SYNCS_SKILLS: true,
			AUTOFIRE: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.crasherSpawner2 = {
	PARENT: [exports.crasherSpawner],
	COLOR: 5,
	INDEPENDENT: true
};
exports.masterGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	AI: {
		NO_LEAD: true,
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [8, 14, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.master]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.sniper3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [27, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assassin, g.snipe3]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 9, -1.5, 8, 0, 0, 0]
	}]
};
exports.bansheegun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	INDEPENDENT: true,
	GUNS: [{
		POSITION: [26, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.less_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto4gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [16, 4, 1, 0, -3.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
			TYPE: exports.bullet
		}
	}]
};
exports.bigAuto3Gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [14, 5, 1, 0, -4.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 5, 1, 0, 4.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.triTrapGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 0.5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [20, 16, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 16, 1.1, 20, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
			TYPE: exports.block
		}
	}]
};
exports.smasherBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true
};
exports.spikeBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: -4,
	INDEPENDENT: true
};
exports.megaSmashBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: -6,
	INDEPENDENT: true
};
exports.baseProtectBody = {
	LABEL: '',
	CONTROLLERS: ['dontTurn'],
	COLOR: 9,
	SHAPE: 8,
	INDEPENDENT: true
};
exports.dominationBody = {
	LABEL: '',
	CONTROLLERS: ['dontTurn2'],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true
};
exports.demolishBody = {
	LABEL: '',
	COLOR: 9,
	SHAPE: 6
};
exports.baseSwarmTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 0.75
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	AI: {
		NO_LEAD: true
	},
	INDEPENDENT: true,
	GUNS: [{
		POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: exports.protectSwarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: exports.protectSwarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: exports.protectSwarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.baseGunTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Base Protector',
	BODY: {
		FOV: 5
	},
	ACCEPTS_SCORE: false,
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: [{
		POSITION: [12, 12, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 13, 1, 6, 0, 0, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [7, 13, -1.3, 6, 0, 0, 0]
	}]
};
exports.baseProtector = {
	PARENT: [exports.genericTank],
	LABEL: 'Base Protector',
	TYPE: 'wall',
	HITS_OWN_TYPE: 'hard',
	DANGER: 0,
	SIZE: 45,
	DAMAGE_CLASS: 0,
	ACCEPTS_SCORE: false,
	CAN_BE_ON_LEADERBOARD: false,
	GIVE_KILL_MESSAGE: false,
	SKILL: skillSet({
		rld: 1,
		dam: 1,
		pen: 1,
		spd: 1,
		str: 1
	}),
	BODY: {
		SPEED: 0,
		HEALTH: 1e8,
		DAMAGE: 10,
		SHIELD: 1e8,
		REGEN: 1e8,
		FOV: 1,
		PUSHABILITY: 0,
		HETERO: 0
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [25, 0, 0, 0, 360, 0],
		TYPE: exports.baseProtectBody
	}, {
		POSITION: [12, 7, 0, 45, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 135, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 225, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 315, 100, 0],
		TYPE: exports.baseSwarmTurret
	}],
	GUNS: [{
		POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0]
	}],
	BROADCAST_MESSAGE: 'A base protector died? lol I think something broke...'
};
exports.minion = {
	PARENT: [exports.genericTank],
	LABEL: 'Minion',
	TYPE: 'minion',
	DAMAGE_CLASS: 0,
	HITS_OWN_TYPE: 'hardWithBuffer',
	FACING_TYPE: 'smoothToTarget',
	BODY: {
		FOV: 0.5,
		SPEED: 3,
		ACCELERATION: 0.4,
		HEALTH: 5,
		SHIELD: 0,
		DAMAGE: 1.2,
		RESIST: 1,
		PENETRATION: 1,
		DENSITY: 0.4
	},
	AI: {
		BLIND: true
	},
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	GIVE_KILL_MESSAGE: false,
	CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
	GUNS: [{
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
			WAIT_TO_CYCLE: true,
			TYPE: exports.bullet
		}
	}]
};
exports.demolishMinion = {
	PARENT: [exports.minion],
	GUNS: [{
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_minion]),
			WAIT_TO_CYCLE: true,
			TYPE: exports.bullet
		}
	}]
};
exports.demolishFactory = {
	PARENT: [exports.genericTank],
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	MAX_CHILDREN: 3,
	AI: {
		NO_LEAD: true,
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [2, 12.65, 1.1, 11.25, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.dem_factory]),
			TYPE: exports.demolishMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}]
};
exports.demolishProp = {
	PARENT: [exports.genericTank],
	GUNS: [{
		POSITION: [17.5, 107.5, 1.4, 86.5, -80, -60, 0]
	}]
};
exports.pillboxTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 2
	},
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [22, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.not_dense]),
			TYPE: exports.bullet
		}
	}]
};
exports.pillbox = {
	LABEL: 'Engineer Trap',
	PARENT: [exports.trap],
	SHAPE: -4,
	MOTION_TYPE: 'motor',
	CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
	INDEPENDENT: true,
	BODY: {
		SPEED: 1,
		DENSITY: 5
	},
	DIE_AT_RANGE: true,
	TURRETS: [{
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: exports.pillboxTurret
	}]
};
exports.skimTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: base.FOV * 2
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [10, 14, -0.5, 9, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arti, g.arti, g.skim]),
			TYPE: exports.missile
		}
	}, {
		POSITION: [17, 15, 1, 0, 0, 0, 0]
	}]
};
exports.basic = {
	PARENT: [exports.genericTank],
	LABEL: 'Basic',
	DANGER: 4,
	FACING_TYPE: 'locksFacing',
	LEVEL: -1,
	RESET_UPGRADES: true,
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	SKILL_CAP: [
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL
	],
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic]),
			TYPE: exports.bullet,
			LABEL: '',
			STAT_CALCULATOR: 0,
			WAIT_TO_CYCLE: false,
			AUTOFIRE: false,
			SYNCS_SKILLS: false,
			MAX_CHILDREN: 0,
			ALT_FIRE: false,
			NEGATIVE_RECOIL: false
		}
	}],
	DAMAGE_CLASS: 2,
	CAN_BE_ON_LEADERBOARD: true,
	DIES_TO_TEAM_BASE: true,
	GOD_MODE: false
};
exports.single = {
	PARENT: [exports.genericTank],
	LABEL: 'Single',
	DANGER: 6,
	GUNS: [{
		POSITION: [19, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.single]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
	}]
};

let SMASHER_SKILL = 12;

exports.smash = {
	PARENT: [exports.genericTank],
	LABEL: 'Smasher',
	DANGER: 6,
	BODY: {
		FOV: base.FOV * 1.05,
		DENSITY: base.DENSITY * 2,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	TURRETS: [{
		POSITION: [21.5, 0, 0, 0, 360, 0],
		TYPE: exports.smasherBody
	}],
	IS_SMASHER: true,
	SKILL_CAP: [SMASHER_SKILL, 0, 0, 0, 0, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL],
	STAT_NAMES: statNames.smasher
};
exports.megaSmash = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega-Smasher',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		FOV: base.FOV * 1.1,
		DENSITY: base.DENSITY * 4,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	IS_SMASHER: true,
	SKILL_CAP: [SMASHER_SKILL, 0, 0, 0, 0, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [24, 0, 0, 0, 360, 0],
		TYPE: exports.megaSmashBody
	}]
};
exports.spike = {
	PARENT: [exports.genericTank],
	LABEL: 'Spike',
	DANGER: 7,
	BODY: {
		DAMAGE: base.DAMAGE * 1.1,
		FOV: base.FOV * 1.05,
		DENSITY: base.DENSITY * 2,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	IS_SMASHER: true,
	SKILL_CAP: [SMASHER_SKILL, 0, 0, 0, 0, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 120, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 240, 360, 0],
		TYPE: exports.spikeBody
	}]
};
exports.autoSmash = makeAuto(exports.smash, 'Auto Smasher', {
	type: exports.autoSmashTurret,
	size: 11
});
exports.autoSmash.SKILL_CAP = [
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL,
	SMASHER_SKILL
];
exports.autoSmash.STAT_NAMES = statNames.autosmash;
exports.twin = {
	PARENT: [exports.genericTank],
	LABEL: 'Twin',
	DANGER: 6,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}]
};
exports.gunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Gunner',
	DANGER: 6,
	GUNS: [{
		POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}]
};
exports.machineGunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine Gunner',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 0.9,
		ACCELERATION: base.ACCEL * 0.9,
		FOV: base.FOV * 1.05
	},
	GUNS: [{
		POSITION: [14, 3, 4.0, -3, 5, 0, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, -3, -5, 0, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 0, 2.5, 0, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 0, -2.5, 0, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 3, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}]
};
exports.autogunner = makeAuto(exports.gunner);
exports.nailgun = {
	PARENT: [exports.genericTank],
	LABEL: 'Nailgun',
	DANGER: 7,
	BODY: {
		FOV: base.FOV * 1.1,
		SPEED: base.SPEED * 0.9,
		ACCELERATION: base.ACCEL * 0.9
	},
	GUNS: [{
		POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 2, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
	}]
};
exports.double = {
	PARENT: [exports.genericTank],
	LABEL: 'Twin Flank',
	DANGER: 6,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoDouble = makeAuto(exports.double, 'Auto-Double');
exports.tripletwin = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple Twin',
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.hewnDouble = {
	PARENT: [exports.genericTank],
	LABEL: 'Hewn Double',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -5.5, -25, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
			TYPE: exports.bullet
		}
	}]
};
exports.bent = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple Shot',
	DANGER: 6,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}]
};
exports.bentDouble = {
	PARENT: [exports.genericTank],
	LABEL: 'Bent Double',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -1, -25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 1, 25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -1, 155, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 1, -155, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.penta = {
	PARENT: [exports.genericTank],
	LABEL: 'Penta Shot',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.9,
		ACCELERATION: base.ACCEL * 0.9
	},
	GUNS: [{
		POSITION: [16, 8, 1, 0, -3, -30, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, 3, 30, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -2, -15, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 15, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}]
};
exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');
exports.triple = {
	PARENT: [exports.genericTank],
	LABEL: 'Triplet',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 0.95,
		ACCELERATION: base.ACCEL * 0.95,
		FOV: base.FOV * 1.05
	},
	GUNS: [{
		POSITION: [18, 10, 1, 0, 5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 10, 1, 0, -5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}]
};
exports.quint = {
	PARENT: [exports.genericTank],
	LABEL: 'Quintuplet',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.05
	},
	GUNS: [{
		POSITION: [16, 10, 1, 0, -5, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple/*, g.quint*/]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 10, 1, 0, 5, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple/*, g.quint*/]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 10, 1, 0, -3, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple/*, g.quint*/]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 10, 1, 0, 3, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple/*, g.quint*/]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple/*, g.quint*/]),
			TYPE: exports.bullet
		}
	}]
};
exports.dual = {
	PARENT: [exports.genericTank],
	LABEL: 'Dual',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.85,
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [18, 7, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.low_power]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 7, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.low_power]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8.5, 1, 0, 5.5, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8.5, 1, 0, -5.5, 0, 0.65],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
			TYPE: exports.bullet
		}
	}]
};
exports.sniper = {
	PARENT: [exports.genericTank],
	LABEL: 'Sniper',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.2
	},
	GUNS: [{
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
			TYPE: exports.bullet
		}
	}]
};
exports.rifle = {
	PARENT: [exports.genericTank],
	LABEL: 'Rifle',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.225
	},
	GUNS: [{
		POSITION: [24, 6.85, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 6.85, -1.6, 8, 0, 0, 0]
	}]
};
exports.assassin = {
	PARENT: [exports.genericTank],
	LABEL: 'Assassin',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.6,
		SPEED: base.SPEED * 0.7,
		FOV: base.FOV * 1.4
	},
	GUNS: [{
		POSITION: [27, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};
exports.autoAssassin = makeAuto(exports.assassin, 'Auto Assassin');
exports.ranger = {
	PARENT: [exports.genericTank],
	LABEL: 'Ranger',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.65,
		FOV: base.FOV * 1.5
	},
	GUNS: [{
		POSITION: [32, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};
exports.observer = {
	PARENT: [exports.genericTank],
	LABEL: 'Observer',
	DANGER: 7,
	BODY: {
		FOV: 2.25,
		SPEED: 16,
		ACCELERATION: 3.75,
		HEALTH: 1e6,
		SHIELD: 1e6,
		REGEN: 1e6,
		RESIST: 1e6,
		DAMAGE: 0,
		PUSHABILITY: 0
	},
	HAS_NO_SKILL_POINTS: true,
	SKILL: skillSet({
		mob: 1
	}),
	DIES_TO_TEAM_BASE: false
};
exports.hunter = {
	PARENT: [exports.genericTank],
	LABEL: 'Hunter',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.7,
		FOV: base.FOV * 1.25
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
			TYPE: exports.bullet
		}
	}]
};
exports.predator = {
	PARENT: [exports.genericTank],
	LABEL: 'Predator',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.7,
		FOV: base.FOV * 1.3
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 16, 1, 0, 0, 0, 0.3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
			TYPE: exports.bullet
		}
	}]
};
exports.poach = makeHybrid(exports.hunter, 'Poacher');
exports.sidewind = {
	PARENT: [exports.genericTank],
	LABEL: 'Rocketeer',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.7,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.25
	},
	GUNS: [{
		POSITION: [6, 12, -0.5, 13.75, 0, 0, 0]
	}, {
		POSITION: [17.5, 12, -1.1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
			TYPE: exports.snake,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};
exports.director = {
	PARENT: [exports.genericTank],
	LABEL: 'Director',
	STAT_NAMES: statNames.drone,
	DANGER: 5,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: base.FOV * 1.1
	},
	MAX_CHILDREN: 6,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.overseer = {
	PARENT: [exports.genericTank],
	LABEL: 'Overseer',
	DANGER: 6,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: base.FOV * 1.1
	},
	MAX_CHILDREN: 8,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.overlord = {
	PARENT: [exports.genericTank],
	LABEL: 'Overlord',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.1
	},
	MAX_CHILDREN: 8,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.master = {
	PARENT: [exports.genericTank],
	LABEL: 'Master',
	STAT_NAMES: statNames.drone,
	DANGER: 7,
	MAX_CHILDREN: 18,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: base.FOV * 1.1
	},
	FACING_TYPE: 'autospin',
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.master]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 120, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.master]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 240, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.master]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.overtrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Overtrapper',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 125, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 235, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [14, 8, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 8, 1.5, 14, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.banshee = {
	PARENT: [exports.genericTank],
	LABEL: 'Banshee',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.15
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [10, 8, 0, 0, 80, 0],
		TYPE: exports.bansheegun
	}, {
		POSITION: [10, 8, 0, 120, 80, 0],
		TYPE: exports.bansheegun
	}, {
		POSITION: [10, 8, 0, 240, 80, 0],
		TYPE: exports.bansheegun
	}],
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}]
};
exports.autoOverseer = makeAuto(exports.overseer, 'Auto Overseer');
exports.overgunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Overgunner',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 125, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 235, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [19, 2, 1, 0, -2.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.much_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.much_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 11, 1, 0, 0, 0, 0]
	}]
};
exports.cruiser = {
	PARENT: [exports.genericTank],
	LABEL: 'Cruiser',
	DANGER: 6,
	FACING_TYPE: 'locksFacing',
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: base.FOV * 1.2
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.autoCruiser = makeAuto(exports.cruiser, 'Auto Cruiser');
exports.battleship = {
	PARENT: [exports.genericTank],
	LABEL: 'Battleship',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		ACCELARATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: [exports.swarm, {
				AI: {
					FARMER: true
				},
				INDEPENDENT: true
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: [exports.swarm, {
				AI: {
					FARMER: true
				},
				INDEPENDENT: true
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
		}
	}]
};
exports.carrier = {
	PARENT: [exports.genericTank],
	LABEL: 'Carrier',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		ACCELARATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.fortress = {
	PARENT: [exports.genericTank],
	LABEL: 'Fortress',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELARATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.half_reload]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 120, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.half_reload]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 240, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.half_reload]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 60, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 300, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.underseer = {
	PARENT: [exports.genericTank],
	LABEL: 'Underseer',
	DANGER: 6,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: base.FOV * 1.1
	},
	SHAPE: 4,
	MAX_CHILDREN: 14,
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
exports.autoUnderseer = makeAuto(exports.underseer, 'Auto Underseer');
exports.necromancer = {
	PARENT: [exports.genericTank],
	LABEL: 'Necromancer',
	DANGER: 7,
	STAT_NAMES: statNames.necro,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.1
	},
	SHAPE: 4,
	FACING_TYPE: 'autospin',
	MAX_CHILDREN: 14,
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.double_reload]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 4,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.double_reload]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 4,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
exports.factory = {
	PARENT: [exports.genericTank],
	LABEL: 'Factory',
	DANGER: 7,
	//SHAPE: 4,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.1
	},
	MAX_CHILDREN: 6,
	GUNS: [{
		POSITION: [5, 11, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1, 15.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory]),
			TYPE: exports.minion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [4, 14, 1, 8, 0, 0, 0]
	}]
};
exports.machine = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine Gun',
	DANGER: 6,
	GUNS: [{
		POSITION: [12, 10, 1.4, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMachine = makeAuto(exports.machine, 'Machine-Auto');
exports.spray = {
	PARENT: [exports.genericTank],
	LABEL: 'Sprayer',
	GUNS: [{
		POSITION: [23, 7, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.low_power, g.mach, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 10, 1.4, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
			TYPE: exports.bullet
		}
	}]
};
exports.mini = {
	PARENT: [exports.genericTank],
	LABEL: 'Minigun',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 0.95,
		ACCELERATION: base.ACCEL * 0.95,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 0, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMini = makeAuto(exports.mini, 'Auto Minigun');
exports.stream = {
	PARENT: [exports.genericTank],
	LABEL: 'Streamliner',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		ACCELERATION: base.ACCEL * 0.95,
		FOV: 1.3
	},
	GUNS: [{
		POSITION: [25, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [23, 8, 1, 0, 0, 0, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 8, 1, 0, 0, 0, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 0, 0, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 8, 1, 0, 0, 0, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}]
};
exports.hybridMini = makeHybrid(exports.mini, 'Mini-Hybrid');
exports.minitrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Barricade',
	DANGER: 6,
	STAT_NAMES: statNames.trap,
	BODY: {
		FOV: 1.15,
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 8, 1.3, 22, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini_trap, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [4, 8, 1.3, 18, 0, 0, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini_trap, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [4, 8, 1.3, 14, 0, 0, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini_trap, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.destroy = {
	PARENT: [exports.genericTank],
	LABEL: 'Destroyer',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75
	},
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoDestroy = makeAuto(exports.destroy, 'Auto Destroyer');
exports.annihilator = {
	PARENT: [exports.genericTank],
	LABEL: 'Annihilator',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
			TYPE: exports.bullet
		}
	}]
};
exports.hiveShooter = {
	PARENT: [exports.genericTank],
	LABEL: 'Swarmer',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75
	},
	GUNS: [{
		POSITION: [14, 14, -1.2, 5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
			TYPE: exports.hive
		}
	}, {
		POSITION: [15, 12, 1, 5, 0, 0, 0]
	}]
};
exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
exports.shotgun = {
	PARENT: [exports.genericTank],
	LABEL: 'Shotgun',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75
	},
	GUNS: [{
		POSITION: [4, 3, 1, 11, -3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 3, 1, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 4, 1, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 12, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 11, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 3, 1, 13, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 3, 1, 13, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 2, 1, 13, 2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 2, 1, 13, -2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [15, 14, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun, g.fake]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [8, 14, -1.3, 4, 0, 0, 0]
	}]
};
exports.builder = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.8,
		ACCELERATION: base.ACCEL * 0.6,
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [18, 12, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}]
};
exports.engineer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Engineer',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.5,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [5, 11, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [3, 14, 1, 15.5, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			MAX_CHILDREN: 6,
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.pillbox,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [4, 14, 1, 8, 0, 0, 0]
	}]
};
exports.construct = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Trapper',
	STAT_NAMES: statNames.trap,
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [18, 18, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 18, 1.2, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}]
};
exports.autoBuilder = makeAuto(exports.builder);
exports.boomer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Boomer',
	STAT_NAMES: statNames.trap,
	FACING_TYPE: 'locksFacing',
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELARATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [5, 10, 1, 14, 0, 0, 0]
	}, {
		POSITION: [6, 10, -1.5, 7, 0, 0, 0]
	}/*, {
		POSITION: [12, 15, 1, 0, 0, 0, 0],
	}*/, {
		POSITION: [2, 10, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
			TYPE: exports.boomerang
		}
	}]
};
exports.artillery = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Artillery',
	GUNS: [{
		POSITION: [17, 3, 1, 0, -6, -7, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [17, 3, 1, 0, 6, 7, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arti]),
			TYPE: exports.bullet,
			LABEL: 'Heavy'
		}
	}]
};
exports.autoArtillery = makeAuto(exports.artillery, 'Auto Artillery');
exports.mortar = {
	PARENT: [exports.genericTank],
	LABEL: 'Mortar',
	DANGER: 7,
	GUNS: [{
		POSITION: [13, 3, 1, 0, -8, -7, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [13, 3, 1, 0, 8, 7, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [17, 3, 1, 0, -6, -7, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [17, 3, 1, 0, 6, 7, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin]),
			TYPE: exports.bullet,
			LABEL: 'Secondary'
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arti]),
			TYPE: exports.bullet,
			LABEL: 'Heavy'
		}
	}]
};
exports.skimmer = {
	PARENT: [exports.genericTank],
	LABEL: 'Skimmer',
	DANGER: 7,
	BODY: {
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [10, 14, -0.5, 9, 0, 0, 0]
	}, {
		POSITION: [17, 15, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arti, g.arti, g.skim]),
			TYPE: exports.missile,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};
exports.spread = {
	PARENT: [exports.genericTank],
	LABEL: 'Spreadshot',
	DANGER: 7,
	GUNS: [{
		POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arti, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spread_main, g.spread]),
			TYPE: exports.bullet
		}
	}]
};
exports.flank = {
	PARENT: [exports.genericTank],
	LABEL: 'Flank Guard',
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet
		}
	}]
};
exports.hexa = {
	PARENT: [exports.genericTank],
	LABEL: 'Hexa Tank',
	DANGER: 6,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 60, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 300, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}]
};
exports.autohexa = makeAuto(exports.hexa, 'Auto-Hexa');
exports.octo = {
	PARENT: [exports.genericTank],
	LABEL: 'Octo Tank',
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 45, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 315, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet
		}
	}]
};
exports.hexaTrap = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELARATION: base.ACCEL * 0.75
	},
	STAT_NAMES: statNames.trap,
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [15, 7, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 60, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 60, 0.16666],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 120, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 120, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 180, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 240, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 240, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 300, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 300, 0.83333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
}, 'Hexa Trapper');
exports.tri = {
	PARENT: [exports.genericTank],
	LABEL: 'Tri-Angle',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25
	},
	DANGER: 6,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.tons_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front'
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.booster = {
	PARENT: [exports.genericTank],
	LABEL: 'Booster',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.lots_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front'
		}
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.fighter = {
	PARENT: [exports.genericTank],
	LABEL: 'Fighter',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Front'
		}
	}, {
		POSITION: [16, 8, 1, 0, -1, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: 'Side'
		}
	}, {
		POSITION: [16, 8, 1, 0, 1, -90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: 'Side'
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.surfer = {
	PARENT: [exports.genericTank],
	LABEL: 'Surfer',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0.5 ],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.one_third_reload]),
			TYPE: exports.autoSwarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.one_third_reload]),
			TYPE: exports.autoSwarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.bomber = {
	PARENT: [exports.genericTank],
	LABEL: 'Bomber',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 130, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
			TYPE: exports.bullet,
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 230, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
			TYPE: exports.bullet,
		}
	}, {
		POSITION: [14, 8, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8, 1.5, 14, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.more_recoil]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.autotri = makeAuto(exports.tri, 'Auto Tri-Angle');
exports.falcon = {
	PARENT: [exports.genericTank],
	LABEL: 'Falcon',
	DANGER: 7,
	BODY: {
		HEALTH: base.HEALTH * 0.65,
		SHIELD: base.SHIELD * 0.65,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25,
		FOV: base.FOV * 1.3
	},
	GUNS: [{
		POSITION: [27, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.less_reload]),
			TYPE: exports.bullet,
			LABEL: 'Assassin',
			ALT_FIRE: true
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.auto3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Auto-3',
	DANGER: 6,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.auto3gun
	}, {
		POSITION: [11, 8, 0, 120, 190, 0],
		TYPE: exports.auto3gun
	}, {
		POSITION: [11, 8, 0, 240, 190, 0],
		TYPE: exports.auto3gun
	}]
};
exports.auto5 = {
	PARENT: [exports.genericTank],
	LABEL: 'Auto-5',
	DANGER: 7,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.auto5gun
	}, {
		POSITION: [11, 8, 0, 72, 190, 0],
		TYPE: exports.auto5gun
	}, {
		POSITION: [11, 8, 0, 144, 190, 0],
		TYPE: exports.auto5gun
	}, {
		POSITION: [11, 8, 0, 216, 190, 0],
		TYPE: exports.auto5gun
	}, {
		POSITION: [11, 8, 0, 288, 190, 0],
		TYPE: exports.auto5gun
	}]
};
exports.heavy3 = {
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.05
	},
	PARENT: [exports.genericTank],
	LABEL: 'Mega-3',
	DANGER: 7,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [14, 8, 0, 0, 190, 0],
		TYPE: exports.heavy3gun
	}, {
		POSITION: [14, 8, 0, 120, 190, 0],
		TYPE: exports.heavy3gun
	}, {
		POSITION: [14, 8, 0, 240, 190, 0],
		TYPE: exports.heavy3gun
	}]
};
exports.triTrap = {
	LABEL: 'Tri-Trapper',
	BODY: {
		SPEED: base.SPEED * 1.1
	},
	PARENT: [exports.genericTank],
	DANGER: 6,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [12, 8, 0, 0, 190, 0],
		TYPE: exports.triTrapGun
	}, {
		POSITION: [12, 8, 0, 120, 190, 0],
		TYPE: exports.triTrapGun
	}, {
		POSITION: [12, 8, 0, 240, 190, 0],
		TYPE: exports.triTrapGun
	}]
};
exports.sniper3 = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Auto Sniper',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.125
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.sniper3gun
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.sniper3gun
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.sniper3gun
	}]
};
exports.machine3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine-3',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.machine3gun
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.machine3gun
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.machine3gun
	}]
};
exports.trishot3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple-Shot-3',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.trishot3gun
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.trishot3gun
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.trishot3gun
	}]
};
exports.auto4 = {
	PARENT: [exports.genericTank],
	DANGER: 5,
	LABEL: 'Auto-4',
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 6, 0, 45, 160, 0],
		TYPE: exports.auto4gun
	}, {
		POSITION: [13, 6, 0, 135, 160, 0],
		TYPE: exports.auto4gun
	}, {
		POSITION: [13, 6, 0, 225, 160, 0],
		TYPE: exports.auto4gun
	}, {
		POSITION: [13, 6, 0, 315, 160, 0],
		TYPE: exports.auto4gun
	}]
};
exports.flankTrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Trap Guard',
	STAT_NAMES: statNames.generic,
	DANGER: 6,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.guntrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Gunner Trapper',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		FOV: base.FOV * 1.25
	},
	GUNS: [{
		POSITION: [16.5, 2, 1, 0, -2.75, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tons_more_recoil, g.lots_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16.5, 2, 1, 0, 2.75, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tons_more_recoil, g.lots_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 11, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 11, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.half_recoil]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.snipeGuard = {
	PARENT: [exports.genericTank],
	LABEL: 'Snipe Guard',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.2
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8.5, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.twinTrapper = {
	PARENT: [exports.genericTank],
	DANGER: 10,
	LABEL: 'Twin Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.95,
		FOV: base.FOV * 1.1
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 5.5, 0, 0]
	}, {
		POSITION: [2, 8, 1.1, 18, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}, {
		POSITION: [18, 8, 1, 0, -5.5, 0, 0.5]
	}, {
		POSITION: [2, 8, 1.1, 18, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}]
};
exports.mothership = {
	PARENT: [exports.genericTank],
	LABEL: 'Mothership',
	DANGER: 7,
	SHAPE: 16,
	SIZE: 30,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.25,
		HEALTH: 7008,
		REGEN: base.REGEN * 0.75,
		PUSHABILITY: 0.15,
		DAMAGE: 1.5,
		DENSITY: base.DENSITY * 0.5
	},
	MAX_CHILDREN: 32,
	GUNS: [{
		POSITION: [4.3, 3.1, 1.2, 8, 0, 22.5, 1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 45, 0.0625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 67.5, 0.9375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 90, 0.125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 112.5, 0.875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 135, 0.1875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 157.5, 0.8125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 180, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 202.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 225, 0.3125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 247.5, 0.6875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 270, 0.375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 292.5, 0.625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 315, 0.4375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 337.5, 0.5625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 360, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.arenaCloser = {
	PARENT: [exports.genericTank],
	LABEL: 'Arena Closer',
	DANGER: 10,
	SIZE: 34,
	COLOR: 13,
	BODY: {
		SHIELD: 1e6,
		REGEN: 1e6,
		HEALTH: 1e6,
		DENSITY: 30,
		DAMAGE: 1e4,
		FOV: base.FOV * 1.15,
		SPEED: 8
	},
	GUNS: [{
		POSITION: [14, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
			TYPE: [exports.bullet, {
				DIES_TO_TEAM_BASE: false
			}]
		}
	}],
	DIES_TO_TEAM_BASE: false,
	DRAW_HEALTH: false
};
exports.destroyerDominator = {
	PARENT: [exports.genericTank],
	LABEL: 'Dominator',
	DANGER: 10,
	SIZE: 30,
	BODY: {
		RESIST: 50,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		HEALTH: 250,
		DAMAGE: 10, 
		PENETRATION: 0.25, 
		PUSHABILITY: 0,
		HETERO: 0,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.15
	},
	GUNS: [{
		POSITION: [15.25, 6.75, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dominator]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 6.75, -1.6, 6.75, 0, 0, 0]
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody
	}],
	GIVE_KILL_MESSAGE: true
};
exports.gunnerDominator = {
	PARENT: [exports.genericTank],
	LABEL: 'Dominator',
	DANGER: 10,
	SIZE: 30,
	BODY: {
		RESIST: 50,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		HEALTH: 250, 
		DAMAGE: 10, 
		PENETRATION: 0.25, 
		PUSHABILITY: 0,
		HETERO: 0,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.15
	},
	GUNS: [{
		POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15.85, 3, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0]
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody
	}],
	GIVE_KILL_MESSAGE: true
};
exports.trapperDominator = {
	PARENT: [exports.genericTank],
	LABEL: 'Dominator',
	FACING_TYPE: 'autospin',
	DANGER: 10,
	SIZE: 30,
	BODY: {
		RESIST: 50,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		HEALTH: 250, 
		DAMAGE: 10, 
		PENETRATION: 0.25, 
		PUSHABILITY: 0,
		HETERO: 0,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.15
	},
	GUNS: [{
		POSITION: [3.5, 3.75, 1, 8, 0, 0, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 45, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 90, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 135, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 180, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 225, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 270, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 315, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody
	}],
	GIVE_KILL_MESSAGE: true
};
exports.sentryParent = {
	PARENT: [exports.genericTank],
	LABEL: 'Sentry',
	DANGER: 5,
	SHAPE: 3,
	BODY: {
		FOV: base.FOV * 1.05,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'locksFacing',
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.sentrySwarmControlled = {
	PARENT: [exports.sentryParent],
	LABEL: 'Sentry',
	GUNS: [{
		POSITION: [7, 14, 0.6, 7, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.sentryGunControlled = makeAuto(exports.sentryParent, 'Sentry', {
	type: exports.heavyGunSentry,
	size: 12
});
exports.sentryTrapControlled = makeAuto(exports.sentryParent, 'Sentry', {
	type: exports.trapTurret,
	size: 12
});
exports.eliteSprayerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Sprayer',
	SHAPE: 3,
	SIZE: 20,
	DANGER: 10,
	BODY: {
		FOV: base.FOV * 1.15,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75,
		HEALTH: 1250,
		DAMAGE: base.DAMAGE * 1.75
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [14, 6, 0, 180, 190, 0],
		TYPE: exports.spray
	}, {
		POSITION: [14, 6, 0, 60, 190, 0],
		TYPE: exports.spray
	}, {
		POSITION: [14, 6, 0, -60, 190, 0],
		TYPE: exports.spray
	}]
};
exports.eliteDestroyerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Destroyer',
	SHAPE: 3,
	SIZE: 20,
	DANGER: 10,
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: 2500,
		DAMAGE: base.DAMAGE * 1.5,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [5, 16, 1, 6, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, -60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}],
	TURRETS: [{
		POSITION: [11, 0, 0, 180, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, 60, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, -60, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: exports.bigAuto3Gun
	}]
};
exports.palisadeControlled = {
	PARENT: [exports.genericTank],
	SHAPE: 6,
	SIZE: 30,
	LABEL: 'Palisade',
	FACING_TYPE: 'autospin',
	DANGER: 10,
	BODY: {
		FOV: base.FOV * 1.15,
		RESIST: 50,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		HEALTH: 250, 
		DAMAGE: 10, 
		PENETRATION: 0.25, 
		PUSHABILITY: 0,
		HETERO: 0,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.15
	},
	GUNS: [{
		POSITION: [4, 6, -1.6, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}],
	TURRETS: [{
		POSITION: [5, 10, 0, 30, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 90, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 150, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 210, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 270, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 330, 110, 0],
		TYPE: exports.trapTurret
	}]
};
exports.eliteGunnerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Gunner',
	SHAPE: 3,
	SIZE: 20,
	DANGER: 10,
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: base.HEALTH * 15,
		SHIELD: base.SHIELD * 1.5,
		DAMAGE: base.DAMAGE * 1.5,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [14, 16, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 16, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: [exports.pillbox, {
				INDEPENDENT: true
			}]
		}
	}, {
		POSITION: [6, 14, -2, 2, 0, 60, 0]
	}, {
		POSITION: [6, 14, -2, 2, 0, 300, 0]
	}],
	AI: {
		NO_LEAD: false
	},
	TURRETS: [{
		POSITION: [14, 8, 0, 60, 180, 0],
		TYPE: exports.auto4gun
	}, {
		POSITION: [14, 8, 0, 300, 180, 0],
		TYPE: exports.auto4gun
	}]
};
exports.testbed_parent = {
	PARENT: [exports.genericTank],
	LABEL: 'Testbed Parent',
	DANGER: 8,
	BODY: {
		SHIELD: 15,
		REGEN: 5,
		HEALTH: 15,
		DAMAGE: 5,
		DENSITY: 15,
		FOV: 1.25,
		SPEED: base.SPEED * 1.15
	},
	GUNS: [{
		POSITION: [18, 10, -1.4, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.testbed]),
			TYPE: [exports.bullet, {
				SHAPE: 5
			}]
		}
	}]
};
exports.testbed = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Developer Tank',
	RESET_UPGRADES: true,
	SKILL_CAP: [
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL,
		DEFAULT_SKILL
	],
	IS_SMASHER: false,
	HAS_NO_SKILL_POINTS: false,
	GIVE_KILL_MESSAGE: true,
	DRAW_HEALTH: true,
	DAMAGE_CLASS: 2,
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'locksFacing',
	MAX_CHILDREN: 0,
	DAMAGE_EFFECTS: false,
	CAN_BE_ON_LEADERBOARD: true,
	DIES_TO_TEAM_BASE: true,
	GOD_MODE: false,
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	LEVEL: -1
};
exports.testbed_boss = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Bosses'
};
exports.testbed_boss_2 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 2'
};
exports.testbed_dominator = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Dominators'
};
exports.testbed_sentry = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Sentries'
};
exports.testbed_misc = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Miscellaneous'
};
exports.testbed_misc_2 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 2'
};
exports.testbed_misc_3 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 3'
};
exports.dreadnoughtControlled = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 8,
	SHAPE: 3,
	COLOR: 19,
	BODY: {
		FOV: base.FOV * 1.25,
		HEALTH: 750,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 1.25,
		SPEED: base.SPEED * 0.5,
		ACCELERATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [15, 7, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dread_trap]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [12, 4, 1, 0, -23, 15, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 4, 1, 0, 23, -15, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 4, 1, 0, -18, 15, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 4, 1, 0, 18, -15, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [24, 6, 1, 1, 3.5, 75, 0]
	}, {
		POSITION: [24, 6, 1, 1, -3.5, -75, 0]
	}]
}, 'Dreadnought', {
	type: exports.bigAuto3Gun,
	size: 10
});
exports.commander = {
	PARENT: [exports.genericTank],
	LABEL: 'Commander',
	MAX_CHILDREN: 2,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.1
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [5, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.command]),
			TYPE: [exports.booster, {
				HITS_OWN_TYPE: 'hardWithBuffer',
				FACING_TYPE: 'smoothToTarget',
				BODY: {
					FOV: 0.4,
					SPEED: 1,
					ACCELERATION: 0.4,
					HEALTH: 3,
					SHIELD: 0,
					DAMAGE: 1,
					RESIST: 1,
					PENETRATION: 1,
					DENSITY: 0.4
				},
				AI: {
					blind: true
				},
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster'],
				//CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
			}],
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [18.1, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.6]
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.6]
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.1]
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.1]
	}]
};
exports.defenderControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Defender',
	SIZE: 20,
	SHAPE: 3,
	COLOR: 2,
	COLOR_OVERRIDE: 13,
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: 1000,
		DAMAGE: base.DAMAGE * 1.25,
		REGEN: base.REGEN * 0.75,
		SPEED: base.SPEED * 0.4,
		ACCELARATION: base.ACCEL * 0.25
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [4.85, 6.7, 0, 0, 360, 1],
		TYPE: exports.defenderGun
	}, {
		POSITION: [4.85, 6.7, 0, 120, 360, 1],
		TYPE: exports.defenderGun
	}, {
		POSITION: [4.85, 6.7, 0, 240, 360, 1],
		TYPE: exports.defenderGun
	}],
	GUNS: [{
		POSITION: [15, 7, 1, -2, 0, 60, 0]
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, -2, 0, 180, 0]
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, -2, 0, 300, 0]
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.leviathan = makeAuto({
	PARENT: [exports.genericTank],
	SHAPE: 5,
	COLOR: 14,
	SIZE: 30,
	FACING_TYPE: 'autospin',
	DANGER: 8,
	BODY: {
		FOV: base.FOV * 1.125,
		HEALTH: 2250,
		SHIELD: base.SHIELD * 1.3,
		DAMAGE: base.DAMAGE * 1.5,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5
	},
	DRAW_HEALTH: true,
	GUNS: [{
		POSITION: [3, 8.9, 1.05, 8, 0, 36, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.pentaTrap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 108, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.pentaTrap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 180, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.pentaTrap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 252, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.pentaTrap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 324, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.pentaTrap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}],
	TURRETS: [{
		POSITION: [3.25, 9.85, 0, 0, 190, 1],
		TYPE: exports.levi5gun
	}, {
		POSITION: [3.25, 9.85, 0, 72, 190, 1],
		TYPE: exports.levi5gun
	}, {
		POSITION: [3.25, 9.85, 0, 144, 190, 1],
		TYPE: exports.levi5gun
	}, {
		POSITION: [3.25, 9.85, 0, 216, 190, 1],
		TYPE: exports.levi5gun
	}, {
		POSITION: [3.25, 9.85, 0, 288, 190, 1],
		TYPE: exports.levi5gun
	}]
}, 'Leviathan', {
	type: exports.superHeavyGun,
	size: 7,
	independent: true
});
exports.hurricane = {
	PARENT: [exports.genericTank],
	LABEL: 'Hurricane',
	DANGER: 6,
	FACING_TYPE: 'autospin',
	BODY: {
		SPEED: base.SPEED * 0.85,
		ACCELERATION: base.ACCEL * 0.85
	},
	GUNS: [{
		POSITION: [15, 3.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 30, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 60, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 120, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 150, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 210, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 240, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 300, 0.33333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 3.5, 1, 0, 0, 330, 0.66667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.octogeddon = {
	PARENT: [exports.genericTank],
	LABEL: 'Octogeddon',
	SIZE: 22,
	SHAPE: 8,
	DANGER: 8,
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: 2750,
		DAMAGE: base.DAMAGE * 1.25,
		REGEN: base.REGEN * 0.75,
		SPEED: base.SPEED * 0.3,
		ACCELARATION: base.ACCEL * 0.5
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [6, 4.7, 0, 0, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 4.7, 0, 120, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 4.7, 0, 240, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 9.75, 0, 0, 160, 0],
		TYPE: exports.octogeddonTurret,
	}, {
		POSITION: [6, 9.75, 0, 45, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 90, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 135, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 180, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 225, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 270, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 315, 160, 0],
		TYPE: exports.octogeddonTurret
	}]
};
exports.demolisher = {
	PARENT: [exports.genericTank],
	LABEL: 'Demolisher',
	SHAPE: 6,
	COLOR: 21,
	SIZE: 40,
	DANGER: 8,
	FACING_TYPE: 'spinSlowly',
	BODY: {
		SPEED: base.SPEED * 0.25,
		ACCELERATION: base.ACCEL * 0.25,
		HEALTH: 400,
		REGEN: base.REGEN * 0.75,
		PUSHABILITY: 0.05
	},
	HAS_NO_SKILL_POINTS: true,
	SKILL: skillSet({
		rld: 1,
		dam: 0.8,
		pen: 0.8,
		str: 0.8,
		spd: 1, 
		atk: 0.8,
		hlt: 0.8,
		shi: 0.5,
		rgn: 0.5,
		mob: 1
	}),
	GUNS: [{
		POSITION: [3.65, 2.5, 1, 7, 3, 0, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.65, 2.5, 1, 7, -3, 0, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.65, 2.5, 1, 7, 3, 120, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.65, 2.5, 1, 7, -3, 120, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 120, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.65, 2.5, 1, 7, 3, 240, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}, {
		POSITION: [3.65, 2.5, 1, 7, -3, 240, 0]
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 240, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true
		}
	}],
	TURRETS: [{
		POSITION: [1.3, 6, 0, 0, 0, 1],
		TYPE: exports.demolishProp
	}, {
		POSITION: [1.3, 6, 0, 120, 0, 1],
		TYPE: exports.demolishProp
	}, {
		POSITION: [1.3, 6, 0, 240, 0, 1],
		TYPE: exports.demolishProp
	}, {
		POSITION: [5, 6, 0, 0, 144, 1],
		TYPE: exports.superHeavyMach
	}, {
		POSITION: [5, 6, 0, 120, 144, 1],
		TYPE: exports.superHeavyMach
	}, {
		POSITION: [5, 6, 0, 240, 144, 1],
		TYPE: exports.superHeavyMach
	}, {
		POSITION: [21.15, 0, 0, 0, 0, 0],
		TYPE: exports.demolishBody
	}, {
		POSITION: [16, 1, 0, 60, 0, 0],
		TYPE: exports.demolishFactory
	}, {
		POSITION: [16, 1, 0, 180, 0, 0],
		TYPE: exports.demolishFactory
	}, {
		POSITION: [16, 1, 0, 300, 0, 0],
		TYPE: exports.demolishFactory
	}]
};
exports.weirdSpikeBody1 = {
	LABEL: '',
	CONTROLLERS: ['fastSpin'],
	COLOR: 9,
	SHAPE: 3,
	INDEPENDENT: true
};
exports.weirdSpikeBody2 = {
	LABEL: '',
	CONTROLLERS: ['reverseSpin'],
	COLOR: 9,
	SHAPE: 3,
	INDEPENDENT: true
};
exports.weirdSpike = {
	PARENT: [exports.genericTank],
	LABEL: 'Weird Spike',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		DAMAGE: base.DAMAGE * 1.15,
		FOV: base.FOV * 1.05,
		DENSITY: base.DENSITY * 1.5,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	IS_SMASHER: true,
	SKILL_CAP: [SMASHER_SKILL, 0, 0, 0, 0, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL, SMASHER_SKILL],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.weirdSpikeBody1
	}, {
		POSITION: [20.5, 0, 0, 180, 360, 0],
		TYPE: exports.weirdSpikeBody2
	}]
};
exports.conq = {
	PARENT: [exports.genericTank],
	LABEL: 'Conqueror',
	DANGER: 7,
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.8
	},
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}]
};
exports.quadTrapper = {
	PARENT: [exports.genericTank],
	LABEL: 'Quad Trapper',
	DANGER: 7,
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [14, 6, 1, 0, 0, 45, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 135, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 225, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 315, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 315, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}]
};
exports.bentBoomer = {
	PARENT: [exports.genericTank],
	LABEL: 'Bent Boomer',
	DANGER: 7,
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [8, 10, 1, 8, -2, -35, 0]
	}, {
		POSITION: [8, 10, 1, 8, 2, 35, 0]
	}, {
		POSITION: [2, 10, 1.3, 16, -2, -35, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
			TYPE: exports.boomerang
		}
	}, {
		POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
			TYPE: exports.boomerang
		}
	}]
};
exports.ball = {
	PARENT: [exports.genericEntity],
	LABEL: 'Ball',
	COLOR: 2,
	SIZE: 50,
	DAMAGE_EFFECTS: false,
	GIVE_KILL_MESSAGE: false,
	DRAW_HEALTH: false,
	ACCEPTS_SCORE: false,
	CAN_BE_ON_LEADERBOARD: false,
	HAS_NO_SKILL_POINTS: true,
	DIES_TO_TEAM_BASE: false,
	BODY: {
		SHIELD: 1e6,
		REGEN: 1e6,
		HEALTH: 1e6,
		DAMAGE: 0,
		DENSITY: 0.1,
		FOV: 1,
		SPEED: base.SPEED,
		PUSHABILITY: 1
	}
};
exports.skimBoss = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Skimmer',
	SIZE: 20,
	BODY: {
		HEALTH: 300,
		DAMAGE: 2,
		SPEED: base.SPEED * 0.25,
		ACCELERATION: base.ACCEL * 0.5
	},
	SHAPE: 3,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [15, 5, 0, 60, 170, 0],
		TYPE: exports.skimTurret
	}, {
		POSITION: [15, 5, 0, 180, 170, 0],
		TYPE: exports.skimTurret
	}, {
		POSITION: [15, 5, 0, 300, 170, 0],
		TYPE: exports.skimTurret
	}]
};
exports.op_annihilator = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 8,
	GUNS: [{
		POSITION: [18.25, 19.5, 1, 0, 0, -30, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.op_anni]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18.25, 19.5, 1, 0, 0, 30, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.op_anni]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.op_anni]),
			TYPE: exports.bullet
		}
	}]
}, 'OP Annihilator', {
	type: exports.machine3gun
});

// NPCS:
exports.crasher = {
	TYPE: 'crasher',
	LABEL: 'Crasher',
	VALUE: 5,
	COLOR: 5,
	SHAPE: 3,
	SIZE: 5,
	VARIES_IN_SIZE: true,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true
	},
	BODY: {
		SPEED: 6,
		ACCELERATION: 0.75,
		HEALTH: 0.5,
		DAMAGE: 4,
		PENETRATION: 2,
		PUSHABILITY: 0.5,
		DENSITY: 10,
		RESIST: 2
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'smoothWithMotion',
	HITS_OWN_TYPE: 'hard',
	HAS_NO_MASTER: true,
	DRAW_HEALTH: true,
	CAN_BE_ON_LEADERBOARD: false
};
exports.sentry = {
	PARENT: [exports.genericTank],
	TYPE: 'crasher',
	LABEL: 'Sentry',
	DANGER: 4,
	COLOR: 5,
	SHAPE: 3,
	SIZE: 10,
	SKILL: skillSet({
		rld: 0.5,
		dam: 0.8,
		pen: 0.8,
		str: 0.1,
		spd: 1,
		atk: 0.5,
		hlt: 0,
		shi: 0,
		rgn: 0.7,
		mob: 0
	}),
	VALUE: 1500,
	VARIES_IN_SIZE: true,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true
	},
	BODY: {
		FOV: 0.5,
		ACCELERATION: 0.75,
		SPEED: base.SPEED * 0.5
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'smoothToTarget',
	HITS_OWN_TYPE: 'hard',
	HAS_NO_MASTER: true,
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true,
	CAN_BE_ON_LEADERBOARD: false
};
exports.sentrySwarm = {
	PARENT: [exports.sentry],
	GUNS: [{
		POSITION: [7, 14, 0.6, 7, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', {
	type: exports.heavyGunSentry,
	size: 12
});
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', {
	type: exports.trapTurret,
	size: 12
});
exports.miniboss = {
	PARENT: [exports.genericTank],
	TYPE: 'miniboss',
	DANGER: 6,
	SKILL: skillSet({
		rld: 0.7,
		dam: 0.5,
		pen: 0.8,
		str: 0.8,
		spd: 0.2,
		atk: 0.3,
		hlt: 1,
		shi: 0.7,
		rgn: 0.7,
		mob: 0
	}),
	LEVEL: 45,
	CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
	AI: {
		NO_LEAD: true
	},
	FACING_TYPE: 'autospin',
	HITS_OWN_TYPE: 'hard',
	CAN_BE_ON_LEADERBOARD: false
};
exports.elite = {
	PARENT: [exports.miniboss],
	LABEL: 'Elite',
	COLOR: 5,
	SHAPE: 3,
	SIZE: 20,
	VARIES_IN_SIZE: true,
	VALUE: 15e4,
	BODY: {
		FOV: 1.3,
		SPEED: base.SPEED * 0.25,
		HEALTH: base.HEALTH * 1.5,
		SHIELD: base.SHIELD * 1.25,
		DAMAGE: base.DAMAGE * 2.5
	},
	CAN_BE_ON_LEADERBOARD: false,
	BROADCAST_MESSAGE: 'A boss has been killed!'
};
exports.elite_destroyer = {
	PARENT: [exports.elite],
	LABEL: 'Elite Destroyer',
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: base.HEALTH * 25,
		SHIELD: base.SHIELD * 1.5,
		DAMAGE: base.DAMAGE * 2,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [5, 16, 1, 6, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, -60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}],
	TURRETS: [{
		POSITION: [11, 0, 0, 180, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, 60, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, -60, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: [exports.bigAuto3Gun, {
			INDEPENDENT: true,
			COLOR: 5
		}]
	}],
	BROADCAST_MESSAGE: 'An Elite Destroyer has been killed!'
};
exports.elite_gunner = {
	PARENT: [exports.elite],
	LABEL: 'Elite Gunner',
	BODY: {
		FOV: base.FOV * 1.15,
		HEALTH: base.HEALTH * 15,
		SHIELD: base.SHIELD * 1.5,
		DAMAGE: base.DAMAGE * 1.5,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75
	},
	FACING_TYPE: 'smoothTotarget',
	GUNS: [{
		POSITION: [14, 16, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 16, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: [exports.pillbox, {
				INDEPENDENT: true
			}]
		}
	}, {
		POSITION: [6, 14, -2, 2, 0, 60, 0]
	}, {
		POSITION: [6, 14, -2, 2, 0, 300, 0]
	}],
	AI: {
		NO_LEAD: false
	},
	TURRETS: [{
		POSITION: [14, 8, 0, 60, 180, 0],
		TYPE: exports.auto4gun
	}, {
		POSITION: [14, 8, 0, 300, 180, 0],
		TYPE: exports.auto4gun
	}],
	BROADCAST_MESSAGE: 'An Elite Gunner has been killed!',
};
exports.bot = {
	AUTO_UPGRADE: 'random',
	FACING_TYPE: 'looseToTarget',
	BODY: {
		SIZE: 10
	},
	NAME: 'ai_',
	CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
	AI: {
		STRAFE: true
	},
};
exports.arenaCloserAI = {
	PARENT: [exports.genericTank],
	LABEL: 'Arena Closer',
	NAME: 'Arena Closer',
	HITS_OWN_TYPE: 'hard',
	DANGER: 20,
	SIZE: 70,
	COLOR: 3,
	SKILL: skillSet({
		dam: 1,
		pen: 1,
		str: 1
	}),
	BODY: {
		SHIELD: 1e6,
		REGEN: 1e6,
		HEALTH: 1e6,
		DENSITY: 30,
		DAMAGE: 1e6,
		FOV: 50,
		SPEED: 8
	},
	AI: {
		skynet: true
	},
	GUNS: [{
		POSITION: [14, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.closer_ai, g.double_reload]),
			TYPE: [exports.bullet, {
				DIES_TO_TEAM_BASE: false
			}]
		}
	}],
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'spinWhileIdle'],
	DRAW_HEALTH: false,
	CAN_GO_OUTSIDE_ROOM: true,
	CAN_BE_ON_LEADERBOARD: false,
	ACCEPTS_SCORE: false,
	DIES_TO_TEAM_BASE: false
};
exports.fallenBoosterControlled = {
	PARENT: [exports.booster],
	LABEL: 'Fallen Booster',
	COLOR: 18,
	SIZE: 22,
	BODY: {
		HEALTH: 1500,
		REGEN: base.REGEN * 0.5,
		ACCELARATION: base.ACCEL * 0.75,
		DENSITY: 0.15
	},
	DANGER: 8,
	SKILL: skillSet({
		rld: 1,
		dam: 0.3,
		pen: 0.2,
		str: 0.2,
		spd: 0.5,
		mob: 0.2
	}),
	HAS_NO_SKILL_POINTS: true
};
exports.fallen_booster = {
	PARENT: [exports.fallenBoosterControlled],
	TYPE: 'miniboss',
	FACING_TYPE: 'smoothToTarget',
	LEVEL: 45,
	VALUE: 3e4,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		skynet: true
	},
	CAN_BE_ON_LEADERBOARD: false,
	BROADCAST_MESSAGE: 'The Fallen Booster has been killed!'
};
exports.heavyQuad = {
	PARENT: [exports.genericTank],
	LABEL: 'Terminator',
	DANGER: 6,
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 14, 1, 0, 0, 90, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 14, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 14, 1, 0, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.sent = {
	PARENT: [exports.genericTank],
	LABEL: 'Sentinel',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: base.FOV * 1.1
	},
	SHAPE: 4,
	GUNS: [{
		POSITION: [32, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro,
			MAX_CHILDREN: 10
		}
	}]
};
exports.seek = {
	PARENT: [exports.genericTank],
	LABEL: 'Seeker',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
			TYPE: exports.bullet
		}
	}]
};
exports.chimera = {
	PARENT: [exports.genericTank],
	LABEL: 'Chimera',
	STAT_NAMES: statNames.generic,
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
			TYPE: [exports.drone, {
				INDEPENDENT: true
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.autoMaton = {
	PARENT: [exports.genericTank],
	LABEL: 'Automaton',
	DANGER: 6,
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 50, 0],
		TYPE: exports.autoMatonGun
	}]
};
exports.puntGunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Punt Gunner',
	DANGER: 6,
	GUNS: [{
		POSITION: [19, 2, 1, 0, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast, g.stronger]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 2, 1, 0, -3, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast, g.stronger]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};

// TESTBED UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [exports.testbed_boss, exports.testbed_dominator, exports.testbed_misc, exports.testbed_sentry];
exports.testbed_boss.UPGRADES_TIER_2 = [exports.eliteSprayerControlled, exports.eliteGunnerControlled,
	exports.eliteDestroyerControlled, exports.palisadeControlled, exports.dreadnoughtControlled, exports.defenderControlled,
	exports.leviathan, exports.testbed_boss_2];
exports.testbed_boss_2.UPGRADES_TIER_3 = [exports.octogeddon, exports.demolisher, exports.skimBoss, exports.fallenBoosterControlled];
exports.testbed_dominator.UPGRADES_TIER_2 = [exports.destroyerDominator, exports.gunnerDominator, exports.trapperDominator];
exports.testbed_sentry.UPGRADES_TIER_2 = [exports.sentrySwarmControlled, exports.sentryTrapControlled, exports.sentryGunControlled];
exports.testbed_misc.UPGRADES_TIER_2 = [exports.banshee, exports.mothership,
	exports.arenaCloser, exports.commander, exports.quint, exports.minitrap, exports.observer, exports.testbed_misc_2];
exports.testbed_misc_2.UPGRADES_TIER_3 = [exports.weirdSpike, exports.quadTrapper,
	exports.conq, exports.bentBoomer, exports.ball, exports.op_annihilator, exports.trishot3, exports.testbed_misc_3];
exports.testbed_misc_3.UPGRADES_TIER_3 = [exports.seek, exports.sent, exports.chimera, exports.obstacle];
// OTHER UPGRADE PATHS
// TO DO: make a tank with the name 'Liberator' (if I ever get to it lol)
exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director];
exports.basic.UPGRADES_TIER_2 = [exports.smash];
exports.basic.UPGRADES_TIER_3 = [exports.single];
exports.smash.UPGRADES_TIER_3 = [exports.megaSmash, exports.spike, exports.autoSmash];
exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa];
exports.twin.UPGRADES_TIER_3 = [exports.dual, exports.twinTrapper];
exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.hewnDouble, exports.autoDouble, exports.bentDouble];
exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentDouble, exports.triple];
exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machineGunner, exports.guntrap, exports.hurricane];
exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.builder];
exports.sniper.UPGRADES_TIER_3 = [exports.snipeGuard, exports.rifle];
exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.autoAssassin];
exports.hunter.UPGRADES_TIER_3 = [exports.predator, exports.poach, exports.sidewind, exports.skimmer];
exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autoBuilder, exports.engineer,
	exports.boomer, exports.guntrap, exports.twinTrapper];
exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner];
exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.autoMachine];
exports.destroy.UPGRADES_TIER_3 = [exports.annihilator, exports.hybrid, exports.construct,
	exports.shotgun, exports.autoDestroy, exports.sidewind, exports.hiveShooter];
exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.autoArtillery, exports.spread, exports.skimmer];
exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridMini, exports.autoMini, exports.autoMaton];
exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flankTrap];
exports.flank.UPGRADES_TIER_3 = [exports.master];
exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.surfer];
exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexaTrap, exports.autohexa, exports.hurricane, exports.heavyQuad];
exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3,
	exports.auto4, exports.sniper3, exports.triTrap, exports.machine3, exports.autoMaton];
exports.flankTrap.UPGRADES_TIER_3 = [exports.snipeGuard, exports.guntrap, exports.fortress, exports.bomber];
exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer];
exports.director.UPGRADES_TIER_3 = [exports.factory];
exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.autoOverseer, exports.master];
exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.autoUnderseer];
exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.autoCruiser];