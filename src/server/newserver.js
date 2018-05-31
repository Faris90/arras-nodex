/*jslint node: true */
/* global goog */
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

const keys = [
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

const Class = (() => {
	const def = require('./lib/definitions');
	let i = 0;
	for (let k in def) {
		if (!def.hasOwnProperty(k)) continue;
		def[k].index = i++;
	}
	return def;
})();

const ROOMSPEED = 1;
const makeEntity = (() => {
	const __a = {
		int: [],
		float: [],
		str: [],
	};
	const getLength = (x, y) => {
		return Math.sqrt(x * x + y * y);
	};
	const getDirection = (x, y) => {
		return Math.atan2(y, x);
	};
	const DEGTORAD = Math.PI / 180;
	const load = (fallback, val) => {
		return (val == null) ? fallback : val;
	};
	const newStatusBox = (() => {
		const attribute = (status, id, index, inital) => {
			status[index] += id * inital;
			return {
				get: () => {
					return status[index] & id;
				},
				set: bool => {
					if (bool) status[index] = status[index] | id;
					else status[index] = status[index] & ~id;
				},
			};
		};
		return () => {
			let status = [0];
			return {
				ghost: attribute(status, 1, 0, false),
				inGrid: attribute(status, 2, 0, false),
				invuln: attribute(status, 4, 0, false)
			};
		};
	})();
	const newKillBox = () => {
		let data = [0, 0, 0];
		return {
			get: data.slice,
			addSolo: () => data[0]++,
			addAssist: () => data[1]++,
			addBoss: () => data[2]++
		};
	};
	const healthTypes = (() => {
		const regenerateStatic = (data, boost) => {
			const amount = data[0],
				max = data[1];
			data[0] += max / 10 / 60 / 2.5 + boost;
			data[0] = Math.min(data[0], max);
		};
		const getStaticDamage = (data, amount, capped) => {
			return capped ? Math.min(amount, data[0]) : amount;
		};
		const regenerateDynamic = (data, boost) => {
			const amount = data[0],
				max = data[1],
				regen = data[2];
			const r = util.clamp(amount / max, 0, 1);
			if (!r) data[0] = 0.0001;
			else if (r === 1) data[0] = max;
			else {
				data[0] += regen * Math.exp(-50 * Math.pow(Math.sqrt(0.5 * r) - 0.4, 2)) / 3 + r * max / 10 / 15 + boost;
				data[0] = Math.min(data[0], max);
			}
		};
		const getDynamicDamage = (data, amount, capped) => {
			const permeability = data[1] ? util.clamp(data[0] / data[1], 0, 1) : 0;
			return (capped) ?
				Math.min(amount * permeability, data[0]) :
				amount * permeability;
		};
		const getRatio = data => {
			return data[1] ? util.clamp(1 - Math.pow(data[0] / data[1] - 1, 4), 0, 1) : 0;
		};
		return {
			newStatic: () => {
				var data = [1.0, 0.0];
				return {
					dealDamage: amount => data[0] -= getStaticDamage(data, amount, 1),
					getAmount: () => {
						return data[0];
					},
					getDisplay: () => {
						return data[0] / data[1];
					},
					getRatio: () => {
						return getRatio(data);
					},
					getDamage: (amount, capped) => {
						return getStaticDamage(data, amount, capped);
					},
					regenerate: boost => regenerateStatic(data, boost)
				};
			},
			newDynamic: () => {
				var data = [0.0, 0.0, 0.0];
				return {
					dealDamage: amount => data[0] -= getDynamicDamage(data, amount, 1),
					getAmount: () => {
						return data[0];
					},
					getDisplay: () => {
						return data[0] / data[1];
					},
					getRatio: () => {
						return getRatio(data);
					},
					getDamage: (amount, capped) => {
						return getDynamicDamage(data, amount, capped);
					},
					regenerate: boost => regenerateDynamic(data, boost)
				};
			},
		};
	})();
	const skc = {
		rld: 0,
		pen: 1,
		str: 2,
		dam: 3,
		spd: 4,
		shi: 5,
		atk: 6,
		hlt: 7,
		rgn: 8,
		mob: 9,
		accel: 10,
		rst: 11,
		brst: 12,
		ghost: 13
	};
	const newSkills = (() => {
		const update = (() => {
			const apply = (f, x) => {
				return (x < 0) ? 1 / (1 - x * f) : f * x + 1;
			};
			const curves = (() => {
				const make = x => {
					return Math.log(4 * x + 1) / Math.log(5);
				};
				let length = c.MAX_SKILL * 2;
				let storedValues = new Array(length);
				for (let i = 0; i < length; i++) storedValues[i] = make(i / c.MAX_SKILL);
				return storedValues;
			})();
			return data => {
				for (let i = 0; i < 10; i++)
					if (data.raw[i] > data.caps[i]) {
						data.points += data.raw[i] - data.caps[i];
						data.raw[i] = data.caps[i];
					}
				data.real[skc.rld] = Math.pow(0.5, curves[data.raw[skc.rld]]);
				data.real[skc.pen] = apply(2.5, curves[data.raw[skc.pen]]);
				data.real[skc.str] = apply(2, curves[data.raw[skc.str]]);
				data.real[skc.dam] = apply(3, curves[data.raw[skc.dam]]);
				data.real[skc.spd] = 0.5 + apply(1.5, curves[data.raw[skc.spd]]);
				data.real[skc.accel] = apply(0.5, curves[data.raw[skc.rld]]);
				data.real[skc.rst] = 0.5 * curves[data.raw[skc.str]] + 2.5 * curves[data.raw[skc.pen]];
				data.real[skc.ghost] = curves[data.raw[skc.pen]];
				data.real[skc.shi] = c.GLASS_HEALTH_FACTOR * apply(3 / c.GLASS_HEALTH_FACTOR - 1, curves[data.raw[skc.shi]]);
				data.real[skc.atk] = apply(1, curves[data.raw[skc.atk]]);
				data.real[skc.hlt] = c.GLASS_HEALTH_FACTOR * apply(2 / c.GLASS_HEALTH_FACTOR - 1, curves[data.raw[skc.hlt]]);
				data.real[skc.mob] = apply(0.8, curves[data.raw[skc.mob]]);
				data.real[skc.rgn] = apply(25, curves[data.raw[skc.rgn]]);
				data.real[skc.brst] = 0.3 * (0.5 * curves[data.raw[skc.atk]] + 0.5 * curves[data.raw[skc.hlt]] + curves[data.raw[skc.rgn]]);
			};
		})();
		const change = (data, index, levels) => {
			if (data.points && data.raw[index] < data.caps[index]) {
				data.raw[index] += levels;
				update(data);
			}
		};
		const set = (data, values) => {
			for (let i = 0; i < 10; i++) data.raw[i] = values[i];
			update(data);
		};
		const setCaps = (data, values) => {
			for (let i = 0; i < 10; i++) data.caps[i] = values[i];
			update(data);
		};
		const maintain = (() => {
			const levelToPoint = (() => {
				const templevelers = [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
					11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 38, 40, 42, 44
				];
				const levelers = new Array(c.SKILL_CAP);
				for (let i = 0; i < c.SKILL_CAP; i++) levelers[i] = templevelers.indexOf(i) !== -1;
				return levelers;
			})();
			const levelToScore = (() => {
				let tempArray = [];
				for (let i = 0; i < c.SKILL_CAP; i++) tempArray[i] = Math.ceil(1.8 * Math.pow(i + 1, 1.8) - 2 * i + 1);
				return tempArray;
			})();
			return data => {
				if (data.level < c.SKILL_CAP) {
					let didStuff = false;
					while (data.score - data.deduction >= levelToScore[data.level]) {
						data.deduction += levelToScore[data.level];
						data.level++;
						data.points += levelToPoint[data.level];
						data.canUpgrade = data.canUpgrade || data.level == c.TIER_1 || data.level == c.TIER_2 || data.level == c.TIER_3;
						didStuff = true;
					}
					if (didStuff) {
						update(data);
						return 1;
					}
				}
				return false;
			};
		})();
		const returnSkills = data => {
			for (let i = 0; i < 10; i++) __a.int[i] = data.raw[i];
			return __a.int;
		};
		return () => {
			const data = {
				raw: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				caps: [
					c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL,
					c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL, c.MAX_SKILL
				],
				real: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
				points: 0,
				score: 0,
				deduction: 0,
				level: 0,
				canUpgrade: false
			};
			return {
				change: (index, levels) => change(data, index, levels),
				update: () => update(data),
				set: values => set(data, values),
				setCaps: values => setCaps(data, values),
				maintain: () => maintain(data),
				get: () => returnSkills(data)
			};
		};
	})();
	const newGun = (() => {
		const live = (() => {
			const doRecoil = gun => {
				let motion = gun.physics[0],
					position = gun.physics[1];
				if (motion || position) {
					position += motion;
					motion -= 0.25 * position / ROOMSPEED;
					if (motion > 0) motion *= 0.75;
				}
				if (gun.settings.canShoot.get() && gun.settings.hasNoRecoil.get())
					if (motion > 0) gun.body.accelerate(-position * gun.physics[2] /*trueRecoil*/ * 0.045 / ROOMSPEED,
						gun.body.facing + gun.mechanics.angle
					);
				gun.physics[0] = motion;
				gun.physics[1] = position;
			};
			const doLive = (() => {
				const fire = (() => {
					const bulletInit = (() => {
						const interpret = (() => {
							const out = {
								SPEED: 0.0,
								HEALTH: 0.0,
								RESIST: 0.0,
								DAMAGE: 0.0,
								PENETRATION: 0.0,
								RANGE: 0.0,
								DENSITY: 0.0,
								PUSHABILITY: 0.0,
								HETERO: 0.0
							};
							return gun => {
								const shoot = gun.properties.settings;
								const sk = gun.body.getSkills();
								out.SPEED = shoot.maxSpeed * sk[skc.spd];
								out.HEALTH = shoot.health * sk[skc.str];
								out.RESIST = shoot.resist + sk[skc.rst];
								out.DAMAGE = shoot.damage * sk[skc.dam];
								out.PENETRATION = Math.max(1, shoot.pen * sk[skc.pen]);
								out.RANGE = shoot.range / Math.sqrt(sk[skc.spd]);
								out.DENSITY = shoot.density * sk[skc.pen] * sk[skc.pen];
								out.PUSHABILITY = 1 / sk[skc.pen];
								out.HETERO = 3 - 2.8 * sk[skc.ghost];
								switch (gun.properties.calculator) {
									case 0:
										break;
									case 5:
										gun.physics[3] = shoot.recoil * Math.sqrt(sk[skc.rld] * sk[skc.spd]);
										break;
									case 6:
										out.RANGE = shoot.range;
										break;
									case 3:
										out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk[skc.pen] - 1) + 1));
										out.HEALTH /= shoot.pen * sk[skc.pen];
										break;
									case 8:
										out.PUSHABILITY = 1 / Math.pow(sk[skc.pen], 0.5);
										out.RANGE = shoot.range;
										break;
									case 7:
									case 2:
										out.PUSHABILITY = 1;
										out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk[skc.pen] - 1) + 1));
										out.HEALTH = (shoot.health * sk[skc.str]) / Math.pow(sk[skc.pen], 0.8);
										out.DAMAGE = shoot.damage * sk[skc.dam] * shoot.pen * sk[skc.pen];
										out.RANGE = shoot.range;
										break;
								}
								for (let property in out) {
									if (gun.properties.bullet.stat[property] == null || !out.hasOwnProperty(property)) continue;
									out[property] *= gun.properties.bullet.stat[property];
								}
								return out;
							};
						})();
						const necroFunction = (gun, mancer, host) => {
							const body = gun.body;
							const props = gun.properties;
							const reloadFactor = body.getSkills()[0];
							const permission = props.countsOwnKids ?
								props.countsOwnKids > gun.children.length * reloadFactor :
								body.getMaxChildren() ?
								body.getMaxChildren() > body.getKids() * reloadFactor :
								true;
							if (permission) {
								__a.float[0] = host.getFacing();
								__a.float[1] = host.getSize();
								host.define(Class.genericEntity);
								bulletInit(gun, host);
								host.setTeam(mancer.getTeam());
								host.setMaster(mancer.getMaster());
								host.setColor(mancer.getBulletColor());
								host.setFacing(__a.float[0]);
								host.setSize(__a.float[1]);
								host.fullHeal();
								return true;
							}
							return false;
						};
						return (gun, o) => {
							const body = gun.body,
								props = gun.properties;
							props.bullet.types.forEach(type => o.define(type));
							o.define({
								BODY: interpret(gun),
								SIZE: body.size * gun.mechanics.width * props.settings.size / 2,
								LABEL: this.master.label + (props.label === '' ? '' : ' ' + props.label) + ' ' + o.getLabel(),
							});
							o.setColor(body.getBulletColor());
							let skill = body.getSkills();
							skill[5] = skill[6] = skill[7] = skill[8] = skill[9] = 0;
							o.assignSkills(skill);
							gun.children.push(o);
							o.addDerefFunction(() => util.remove(gun.children, gun.children.indexOf(o)));
							if (body.getMaxChildren()) body.addChild(o);
							o.addDerefFunction((() => body.removeChild(o)));
							o.setSource(body);
							if (props.calculator === 7) o.necro = host => necroFunction(gun, o, host);
							o.refreshBodyAttributes();
							o.life();
						};
					})();
					return (gun, x, y, ddd) => {
						const body = gun.body,
							props = gun.properties,
							physics = gun.physics,
							mech = gun.mechanics;
						const sk = body.getSkills();
						gun.lastShot[0] = util.time();
						gun.lastShot[1] = 3 * Math.log(Math.sqrt(sk[skc.spd]) + physics[3] + 1) + 1;
						physics.motion += gun.lastShot[1];
						let ss, sd;
						do {
							ss = ran.gauss(0, Math.sqrt(props.settings.shudder));
						} while (Math.abs(ss) >= props.settings.shudder * 2);
						do {
							sd = ran.gauss(0, props.settings.spray * props.settings.shudder);
						} while (Math.abs(sd) >= props.settings.spray / 2);
						sd *= Math.PI / 180;
						const speed = (props.negRecoil ? -1 : 1) * props.settings.speed * c.runSpeed * sk[skc.spd] * (1 + ss);
						let sx = speed * Math.cos(mech.angle + body.facing + sd),
							sy = speed * Math.sin(mech.angle + body.facing + sd);
						let velocity = body.getVelocity();
						let vlen = getLength(velocity[0], velocity[1]);
						if (vlen) {
							let slen = getLength(sx, sy);
							let extraBoost = Math.max(0, sx * velocity[0] + sy * velocity[1]);
							if (extraBoost) {
								extraBoost /= slen * slen;
								sx += extraBoost * sx;
								sy += extraBoost * sy;
							}
						}
						const position = body.getPosition(),
							size = body.getSize();
						const o = makeEntity(
							position[0] + size * x - sx,
							position[1] + size * y - sy
						);
						o.shove(sx, sy);
						o.forceSizeUpdate();
						bulletInit(gun, o);
					};
				})();
				return gun => {
					const body = gun.body,
						props = gun.properties,
						physics = gun.physics,
						mech = gun.mechanics;
					const sk = body.getSkills();
					let permission = (props.countsOwnKids ?
						props.countsOwnKids > gun.children.length * (props.calculator === 7 ? sk[0] : 1) :
						body.getMaxChildren() ? body.getKids().length * (props.calculator === 7 ? sk[0] : 1) :
						true) && !body.isInvulnurable();
					if (permission || !props.waitToCycle && physics.cycle < 1)
						physics.cycle += 1 / props.settings.reload / ROOMSPEED / ((props.calculator === 7 || props.calculator === 4) ? 1 : sk[skc.rld]);
					if (permission && physics.cycle >= 1 && (props.autofire || (props.altFire ? body.controls.alt.get() : body.controls.fire.get()))) {
						const gx = mech.offset * Math.cos(mech.direction + mech.angle + body.facing) +
							(1.5 * mech.length - mech.width * props.settings.size / 2) * Math.cos(mech.angle + body.facing);
						const gy = mech.offset * Math.sin(mech.direction + mech.angle + body.facing) +
							(1.5 * mech.length - mech.width * props.settings.size / 2) * Math.sin(mech.angle + body.facing);
						while (permission && physics.cycle >= 1) {
							fire(gun, gx, gy, sk);
							permission = props.countsOwnKids ?
								props.countsOwnKids > gun.children.length * (props.calculator === 7 ? sk[0] : 1) :
								body.getMaxChildren() ? body.getKids().length * (props.calculator === 7 ? sk[0] : 1) :
								true;
							physics.cycle -= 1;
						}
					} else if (physics.cycle > !props.waitToCycle - mech.delay) physics.cycle = !props.waitToCycle - mech.delay;
				};
			})();
			return gun => {
				doRecoil(gun);
				doLive(gun);
			};
		})();
		const getTracking = gun => {
			const speed = gun.body.getSkills()[skc.spd];
			__a.float[0] = c.runSpeed * speed * gun.properties.settings.maxSpeed * gun.properties.bullet.stats.SPEED;
			__a.float[1] = speed * gun.properties.settings.range * gun.properties.bullet.stats.RANGE;
			return __a.float;
		};
		return (body, info) => {
			const isInert = info.PROPERTIES == null;
			const properties = isInert ? null : {
				settings: info.PROPERTIES.SHOOT_SETTINGS,
				label: load('', info.PROPERTIES.LABEL),
				autofire: load(false, info.PROPERTIES.AUTOFIRE),
				altFire: load(false, info.PROPERTIES.ALT_FIRE),
				calculator: load(0, info.PROPERTIES.STAT_CALCULATOR),
				waitToCycle: load(false, info.PROPERTIES.WAIT_TO_CYCLE),
				countsOwnKids: load(false, info.PROPERTIES.MAX_CHILDREN),
				syncsSkills: load(false, info.PROPERTIES.SYNCS_SKILLS),
				negRecoil: load(false, info.PROPERTIES.NEGATIVE_RECOIL),
				bullet: (() => {
					let types = (Array.isArray(info.PROPERTIES.TYPE)) ? info.PROPERTIES.TYPE.splice() : [info.PROPERTIES.TYPE];
					let stats = {};
					types.forEach(function setStats(type) {
						if (type.PARENT != null) for (let i = 0; i < type.PARENT.length; i++) setStats(type.PARENT[i]);
						if (type.BODY != null) for (let index in type.BODY) stats[index] = type.BODY[index];
					});
					return {
						types: types,
						stats: stats,
					};
				})()
			};
			const _position = info.POSITION;
			const gun = {
				body: body,
				mechanics: {
					length: _position[0] / 10,
					width: _position[1] / 10,
					aspect: _position[2],
					direction: getDirection(_position[3], _position[4]),
					offset: getLength(_position[3], _position[4]) / 10,
					angle: _position[5] * DEGTORAD,
					delay: _position[6]
				},
				properties: properties,
				lastShot: [0, 0.0],
				physics: isInert ? null : [
					0.0,
					0.0,
					!properties.waitToCycle - _position[6],
					properties.settings.recoil
				],
				children: []
			};
			return {
				getLastShot: gun.lastShot.slice,
				getTracking: isInert ? () => {} : () => getTracking(gun),
				live: isInert ? () => {} : () => live(gun)
			};
		};
	});
	const Attributes = () => {
		return {
			physical: {
				acceleration: 0,
				topSpeed: 0,
				penetration: 0,
				damage: 0,
				fov: 0,
				density: 0,
				stealth: 0,
				pushability: 0,
				range: 0
			},
			settings: {
				drawHealth: false,
				drawShape: false,
				damageEffects: false,
				ratioEffects: false,
				motionEffects: false,
				acceptsScore: false,
				givesKillMessage: false,
				canGoOutsideRoom: false,
				hitsOwnType: false,
				diesAtLowSpeed: false,
				diesAtRange: false,
				independent: false,
				persistsAfterDeath: false,
				clearOnMasterUpgrade: false,
				healthWithLevel: false,
				isObstacle: false,
				isNecromancer: false,
				hasNoRecoil: false,
				cravesAttention: false,
				buffVsFood: false,
				leaderboardable: false,
				reloadToAcceleration: false,
				variesInSize: false,
				isFood: false,
				isIntangable: false
			},
			body: {
				acceleration: 0,
				speed: 0,
				health: 0,
				resist: 0,
				shield: 0,
				regen: 0,
				damage: 0,
				penetration: 0,
				fov: 0,
				range: 0,
				density: 0,
				stealth: 0,
				pushability: 0,
				heteroMultiplier: 0
			},
			aiSettings: {
				farm: false,
				blind: false,
				chase: false,
				skynet: false,
				view360: false,
				reverseDirection: false
				//shapefriend: false,
			},
			index: -1,
			mockup: {},
			label: '',
			type: -1,
			shape: 0,
			color: 0,
			motionType: -1,
			facingType: -1,
			damageClass: 0,
			skillNames: 0,
			dangerValue: 1,
			squiggle: 1,
			upgrades: [],
			maxChildren: 0,
			creationMessage: ''
		};
	};
	const define = (() => {
		const check = val => {
			return val != null;
		};
		return (def) => {
			const obj = Attributes();
			if (def.PARENT != null) for (let i = 0; i < def.PARENT.length; i++) this.define(def.PARENT[i]);
			if (check(def.index)) obj.index = def.index;
			if (check(def.NAME)) obj.name = def.NAME;
			if (check(def.LABEL)) obj.label = def.LABEL;
			if (check(def.TYPE)) obj.type = def.TYPE;
			if (check(def.SHAPE)) obj.shape = def.SHAPE;
			if (check(def.COLOR)) obj.color = def.COLOR;
			if (def.CONTROLLERS != null) {
				let toAdd = [];
				def.CONTROLLERS.forEach((ioName) => {
					toAdd.push(eval('new io_' + ioName + '(this)'));
				});
				this.addController(toAdd);
			}
			if (check(def.MOTION_TYPE)) obj.motionType = def.MOTION_TYPE;
			if (check(def.FACING_TYPE)) obj.facingType = def.FACING_TYPE;
			if (check(def.BROADCAST_MESSAGE)) obj.creationMessage = def.BROADCAST_MESSAGE;
			if (check(def.DAMAGE_CLASS)) obj.damageClass = def.DAMAGE_CLASS;
			if (check(def.STAT_NAMES)) obj.skillNames = def.STAT_NAMES;
			if (check(def.DANGER)) obj.dangervalue = def.DANGER;
			if (check(def.DRAW_HEALTH)) obj.settings.drawHealth = def.DRAW_HEALTH;
			if (check(def.DRAW_SELF)) obj.settings.drawShape = def.DRAW_SELF;
			if (check(def.DAMAGE_EFFECTS)) obj.settings.damageEffects = def.DAMAGE_EFFECTS;
			if (check(def.RATIO_EFFECTS)) obj.settings.ratioEffects = def.RATIO_EFFECTS;
			if (check(def.MOTION_EFFECTS)) obj.settings.motionEffects = def.MOTION_EFFECTS;
			if (check(def.ACCEPTS_SCORE)) obj.settings.acceptsScore = def.ACCEPTS_SCORE;
			if (check(def.GIVE_KILL_MESSAGE)) obj.settings.givesKillMessage = def.GIVE_KILL_MESSAGE;
			if (check(def.CAN_GO_OUTSIDE_ROOM)) obj.settings.canGoOutsideRoom = def.CAN_GO_OUTSIDE_ROOM;
			if (check(def.HITS_OWN_TYPE)) obj.settings.hitsOwnType = def.HITS_OWN_TYPE;
			if (check(def.DIE_AT_LOW_SPEED)) obj.settings.diesAtLowSpeed = def.DIE_AT_LOW_SPEED;
			if (check(def.DIE_AT_RANGE)) obj.settings.diesAtRange = def.DIE_AT_RANGE;
			if (check(def.INDEPENDENT)) obj.settings.independent = def.INDEPENDENT;
			if (check(def.PERSISTS_AFTER_DEATH)) obj.settings.persistsAfterDeath = def.PERSISTS_AFTER_DEATH;
			if (check(def.CLEAR_ON_MASTER_UPGRADE)) obj.settings.clearOnMasterUpgrade = def.CLEAR_ON_MASTER_UPGRADE;
			if (check(def.HEALTH_WITH_LEVEL)) obj.settings.health = def.HEALTH_WITH_LEVEL;
			if (check(def.OBSTACLE)) obj.settings.isObstacle = def.OBSTACLE;
			if (check(def.NECRO)) obj.settings.isNecromancer = def.NECRO;
			if (check(def.HAS_NO_RECOIL)) obj.settings.hasNoRecoil = def.HAS_NO_RECOIL;
			if (check(def.CRAVES_ATTENTION)) obj.settings.cravesAttention = def.CRAVES_ATTENTION;
			if (check(def.BUFF_VS_FOOD)) obj.settings.buffVsFood = def.BUFF_VS_FOOD;
			if (check(def.CAN_BE_ON_LEADERBOARD)) obj.settings.leaderboardable = def.CAN_BE_ON_LEADERBOARD;
			if (check(def.IS_SMASHER)) obj.settings.reloadToAcceleration = def.IS_SMASHER;
			if (check(def.INTANGIBLE)) obj.settings.isIntangable = def.INTANGIBLE;
			if (check(def.VARIES_IN_SIZE)) obj.settings.variesInSize = def.VARIES_IN_SIZE;
			if (check(def.AI)) {
				if (check(def.AI.NO_LEAD)) obj.aiSettings.chase = def.AI.NO_LEAD;
				if (check(def.AI.SKYNET)) obj.aiSettings.skynet = def.AI.SKYNET;
				if (check(def.AI.BLIND)) obj.aiSettings.blind = def.AI.BLIND;
				if (check(def.AI.FARMER)) obj.aiSettings.farm = def.AI.FARMER;
				if (check(def.AI.FULL_VIEW)) obj.aiSettings.view360 = def.AI.FULL_VIEW;
				if (check(def.AI.STRAFE)) obj.aiSettings.reverseDirection = def.AI.STRAFE;
				//if (check(def.AI.LIKES_SHAPES)) obj.aiSettings.shapefriend = def.AI.LIKES_SHAPES;
			}
			if (def.RESET_UPGRADES) obj.upgrades = [];
			if (check(def.UPGRADES_TIER_1))
				def.UPGRADES_TIER_1.forEach(e => {
					obj.upgrades.push({
						class: e,
						level: c.TIER_1,
						index: e.index,
					});
				});
			if (check(def.UPGRADES_TIER_2))
				def.UPGRADES_TIER_2.forEach(e => {
					obj.upgrades.push({
						class: e,
						level: c.TIER_2,
						index: e.index,
					});
				});
			if (check(def.UPGRADES_TIER_3))
				def.UPGRADES_TIER_3.forEach(e => {
					obj.upgrades.push({
						class: e,
						level: c.TIER_3,
						index: e.index,
					});
				});
			if (def.SIZE != null) {
				this.SIZE = def.SIZE * this.squiggle;
				if (this.coreSize == null) this.coreSize = this.SIZE;
			}
			if (def.SKILL != null && def.SKILL != []) {
				if (def.SKILL.length != 10) throw ('Inappropiate skill raws!');
				this.skill.set(def.SKILL);
			}
			if (def.LEVEL != null) {
				if (def.LEVEL === -1) this.skill.reset();
				while (this.skill.level < c.SKILL_CHEAT_CAP && this.skill.level < def.LEVEL) {
					this.skill.score += this.skill.levelScore;
					this.skill.maintain();
				}
				this.refreshBodyAttributes();
			}
			if (def.SKILL_CAP != null && def.SKILL_CAP != []) {
				if (def.SKILL_CAP.length != 10) throw ('Inappropiate skill cap!');
				this.skill.setCaps(def.SKILL_CAP);
			}
			if (def.VALUE != null) this.skill.score = Math.max(this.skill.score, def.VALUE * this.squiggle);
			if (def.ALT_ABILITIES != null) this.abilities = def.ALT_ABILITIES;
			if (def.GUNS != null) {
				let newGuns = [];
				def.GUNS.forEach((gundef) => {
					newGuns.push(new Gun(this, gundef));
				});
				this.guns = newGuns;
			}
			if (def.MAX_CHILDREN != null) this.maxChildren = def.MAX_CHILDREN;
			if (def.FOOD != null)
				if (def.FOOD.LEVEL != null) {
					this.foodLevel = def.FOOD.LEVEL;
					this.foodCountup = 0;
				}
			if (def.BODY != null) {
				if (def.BODY.ACCELERATION != null) this.ACCELERATION = def.BODY.ACCELERATION;
				if (def.BODY.SPEED != null) this.SPEED = def.BODY.SPEED;
				if (def.BODY.HEALTH != null) this.HEALTH = def.BODY.HEALTH;
				if (def.BODY.RESIST != null) this.RESIST = def.BODY.RESIST;
				if (def.BODY.SHIELD != null) this.SHIELD = def.BODY.SHIELD;
				if (def.BODY.REGEN != null) this.REGEN = def.BODY.REGEN;
				if (def.BODY.DAMAGE != null) this.DAMAGE = def.BODY.DAMAGE;
				if (def.BODY.PENETRATION != null) this.PENETRATION = def.BODY.PENETRATION;
				if (def.BODY.FOV != null) this.FOV = def.BODY.FOV;
				if (def.BODY.RANGE != null) this.RANGE = def.BODY.RANGE;
				if (def.BODY.SHOCK_ABSORB != null) this.SHOCK_ABSORB = def.BODY.SHOCK_ABSORB;
				if (def.BODY.DENSITY != null) this.DENSITY = def.BODY.DENSITY;
				if (def.BODY.STEALTH != null) this.STEALTH = def.BODY.STEALTH;
				if (def.BODY.PUSHABILITY != null) this.PUSHABILITY = def.BODY.PUSHABILITY;
				if (def.BODY.HETERO != null) this.heteroMultiplier = def.BODY.HETERO;
				this.refreshBodyAttributes();
			}
			if (def.TURRETS != null) {
				let o;
				this.turrets.forEach(o => o.destroy());
				this.turrets = [];
				def.TURRETS.forEach(def => {
					o = new Entity(this, this.master);
					((Array.isArray(def.TYPE)) ? def.TYPE : [def.TYPE]).forEach(type => o.define(type));
					o.bindToMaster(def.POSITION, this);
				});
			}
			if (def.mockup != null) this.mockup = def.mockup;
		};
	})();
	return (x, y) => {
		const creationTime = util.time();
		const status = newStatusBox();
		const kills = newKillBox();
		const skills = newSkills();
		let family = {
			master: null,
			source: null,
			parent: null,
		};
		const health = healthTypes.newStatic();
		const shield = healthTypes.newDynamic();
		return {
			life: () => {},
			getSkills: () => {
				return skills.get();
			},
			refreshBodyAttributes: () => {},
			define: type => {},
			setTeam: team => {},
			getTeam: () => {},
			setMaster: master => {},
			getMaster: () => {},
			setColor: col => {},
			setFacing: dir => {},
			setSize: size => {},
			getFacing: () => {},
			getSize: () => {},
			getLabel: () => {},
			getMaxChildren: () => {},
			addChild: newlyborn => {},
			removeChild: deadkid => {},
			addDerefFunction: func => {},
			isInvulnurable: () => {},
			getVelocity: () => {
				return [0, 0];
			},
			getPosition: () => {
				return [0, 0];
			},
			accelerate: (amount, direction) => {},
			shove: (x, y) => {},
			forceSizeUpdate: () => {},
			getBulletColor: () => {},
			assignSkills: assignment => skills.set(assignment),
			necro: () => {},
			fullHeal: () => {},
		};
	};
});