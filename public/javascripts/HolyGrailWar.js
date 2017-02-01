(function() {
	var host = window.location.hostname;
	var socket = io(host + ':8001');

	socket.on('script', function(data) {
		console.log(data);
		eval(data);
	});
	
	var servantData = {
		saber: {
			enabled: true,
			servant: [
				{
					name: '何珂',
					endurance: 15,
					attack: 2,
					defense: 0,
					speed: 5,
					freezed: false,
					skill: [
						{
							name: '断罪',
							enabled: true,
							func: function(diceValue, server) {
								if (server) {
									var attacker = servantData.saber.servant[0];
									var defender = attacker.lastFailure;
									if (diceValue === undefined) {
										diceValue = dice(attacker);
									}
									damage = Math.max(attacker.attack - defender.defense + diceValue, 0);
									if (damage === 0) {
										attacker.skill[0].enabled = false;
									} else {
										dealDamage(attacker, defender, damage);
									}
								} else {
									diceValue = dice(attacker);
									socket.emit('script', 'servantData.saber.servant[0].skill[0].func(' + diceValue + ', true);');
								}
							}
						}, {
							name: '幸运',
							enabled: false
						}
					]
				},
				{
					name: '穆投',
					endurance: 15,
					attack: 2,
					defense: 0,
					speed: 4,
					freezed: false,
					skill: [
						{
							name: '枯木为剑',
							enabled: true,
							func: function() {
								$('#mutouModal').modal('show');
							}
						}, {
							name: '树之庇护',
							enabled: true,
							func: function(diceValue) {
								var duel;
								for (i = 0; i < duelData.length; i++) {
									var mutou = servantData.saber.servant[1];
									if (duelData[i].defender === mutou) {
										if (diceValue === undefined) {
											diceValue = dice(duelData[i].attacker);
										}
										var damage = Math.max(duelData[i].attacker.attack - mutou.defense - 3 + diceValue, 0);
										dealDamage(duelData[i].attacker, mutou, damage);
										duelData.splice(i, 1);
									}
								}
							}
						}
					]
				},
				{
					name: '鸡护',
					endurance: 9,
					attack: 3,
					defense: 0,
					speed: 8,
					freezed: false,
					skill: [
						{
							name: '杀鸡焉用牛刀',
							enabled: false
						}, {
							name: '鸡护……再也不能斩杀了吗',
							enabled: false
						}
					]
				}
			]
		},
		lancer: {
			enabled: true,
				servant: [
				{
					name: '孟承',
					endurance: 12,
					attack: 2,
					defense: 0,
					speed: 9,
					freezed: false,
					skill: [
						{
							name: '永恒绽放之枪',
							enabled: true,
							func: function() {
								$('#mengchengModal').modal('show');
							}
						}, {
							name: '菜花回春',
							enabled: true,
							func: function() {
								
							}
						}
					]
				},
				{
					name: '般股',
					endurance: 6,
					attack: 0,
					defense: 0,
					speed: 7,
					freezed: false,
					skill: []
				},
				{
					name: '鲲',
					endurance: 15,
					attack: 0,
					defense: 0,
					speed: 4,
					freezed: false,
					skill: []
				}
			]
		},
		archer: {
			enabled: true,
			servant: [
				{
					name: '齐傲',
					endurance: 15,
					attack: 3,
					defense: -1,
					speed: 6,
					freezed: false,
					skill: []
				},
				{
					name: '冰兰丹',
					endurance: 15,
					attack: 2,
					defense: -1,
					speed: 5,
					freezed: false,
					skill: []
				},
				{
					name: '郐太太',
					endurance: 10,
					attack: 2,
					defense: -2,
					speed: 5,
					freezed: false,
					skill: []
				},
				{
					name: '鸟德',
					endurance: 12,
					attack: 3,
					defense: -2,
					speed: 9,
					freezed: false,
					skill: []
				}
			]
		},
		rider: {
			enabled: true,
			servant: [
				{
					name: '叶月图',
					endurance: 14,
					attack: 1,
					defense: -1,
					speed: 7,
					freezed: false,
					skill: []
				},
				{
					name: '龙骑士',
					endurance: 17,
					attack: 1,
					defense: 2,
					speed: 3,
					freezed: false,
					skill: []
				},
				{
					name: '福克斯',
					endurance: 15,
					attack: 2,
					defense: 0,
					speed: 10,
					freezed: false,
					skill: []
				},
				{
					name: '鸟德',
					endurance: 12,
					attack: 1,
					defense: -1,
					speed: 9,
					freezed: false,
					skill: []
				}
			]
		},
		berserker: {
			enabled: true,
			servant: [
				{
					name: '宁梦',
					endurance: 19,
					attack: 2,
					defense: 1,
					speed: 8,
					freezed: false,
					skill: []
				},
				{
					name: '金凯奇',
					endurance: 17,
					attack: 3,
					defense: 1,
					speed: 6,
					freezed: false,
					skill: []
				},
				{
					name: '哭笑',
					endurance: 17,
					attack: 2,
					defense: 2,
					speed: 7,
					freezed: false,
					skill: []
				}
			]
		},
		caster: {
			enabled: true,
			servant: [
				{
					name: '潘子华',
					endurance: 12,
					attack: 2,
					defense: -2,
					speed: 4,
					freezed: false,
					skill: []
				},
				{
					name: '戴泽',
					endurance: 15,
					attack: 0,
					defense: 2,
					speed: 2,
					freezed: false,
					skill: []
				},
				{
					name: '精灵',
					endurance: 1,
					attack: 0,
					defense: 0,
					speed: 999,
					freezed: false,
					skill: []
				}
			]
		},
		assassin: {
			enabled: true,
			servant: [
				{
					name: '姜姜',
					endurance: 15,
					attack: 1,
					defense: -1,
					speed: 10,
					freezed: false,
					skill: []
				},
				{
					name: '玲音',
					endurance: 12,
					attack: 1,
					defense: -1,
					speed: 9,
					freezed: false,
					skill: []
				},
				{
					name: '唤兽',
					endurance: 15,
					attack: 2,
					defense: -1,
					speed: 10,
					freezed: false,
					skill: []
				},
				{
					name: '死苦',
					endurance: 12,
					attack: 3,
					defense: -1,
					speed: 1,
					freezed: false,
					skill: []
				}
			]
		}
	};

	function setEndurance(servant, value) {
		servant.endurance = value;
		if (servant.scene === sceneData.hospital) {
			servant.endurance = Math.max(servant.endurance, 1);
		}
		if (servant.name === '鸡护') {
			if (servant.endurance <= 5) {
				servant.attack = 6;
				servant.defense = 3;
			}
		}
	}

	var sceneData = {
		default: {
			name: '未分配',
			playerList: [],
			func: function() {},
			destroyable: false,
			enabled: true,
			visable: false,
			vote: 0
		},
		school: {
			name: '学校',
			playerList: [],
			func: function() {},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		dinningHall: {
			name: '食堂',
			playerList: [],
			func: function() {
				if (this.playerList.length === 1) {
					this.playerList[0].servant.endurance += 2;
				}
			},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		hospital: {
			name: '医院',
			playerList: [],
			func: function() {},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		forrest: {
			name: '小树林',
			playerList: [],
			func: function() {
				if (this.playerList.length === 2) {
					var servantA = this.playerList[0].servant;
					var servantB = this.playerList[1].servant;
					if ((servantA.endurance + servantB.endurance) % 2 === 0) {
						setEndurance(servantA, (servantA.endurance + servantB.endurance) / 2);
						setEndurance(servantB, servantA.endurance);
					} else {
						$('#forrestModal').modal('show');
					}
				}
			},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		'septic-tank': {
			name: '化粪池',
			playerList: [],
			func: function() {
				for (var i = 0; i < this.playerList.length; i++) {
					dealDamage(null, this.playerList[i].servant, 1);
				}
			},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		volcano: {
			name: '死火山',
			playerList: [],
			func: function() {},
			destroyable: true,
			enabled: true,
			visable: true,
			vote: 0
		},
		church: {
			name: '麻婆教堂',
			playerList: [],
			func: function() {},
			destroyable: false,
			enabled: true,
			visable: true,
			vote: 0
		}
	};

	var duelData = [];

	function randomKey(obj) {
		var keys = Object.keys(obj);
		return keys[Math.floor(Math.random() * keys.length)];
	}

	function randomValue(obj) {
		var keys = Object.keys(obj);
		return obj[keys[Math.floor(Math.random() * keys.length)]];
	}

	function randomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function dice(servant) {
		var diceValue = 1 + Math.floor(Math.random() * 6);
		if (servant.name === '何珂' && diceValue < 3) {
			diceValue++;
		}
		if (servant.name === '穆投' && servant.scene === sceneData.forrest) {
			return 6;
		}
		return diceValue;
	}

	function dealDamage(source, servant, value) {
		setEndurance(servant, servant.endurance - value);
		if (servant.name === '鸡护' && servant.endurance <= 0) {
			setEndurance(source, source.endurance + 4);
		}
	}

	var playerList = new Vue({
		el: '#playerList',
		data: {
			players: [],
			sceneData: sceneData
		},
		methods: {
			deletePlayer: function(index, server) {
				if (server) {
					this.players.splice(index, 1);
				} else {
					socket.emit('script', 'playerList.deletePlayer(' + index + ', true);');
				}
			},
			confirmPlayer: function(index, name, server) {
				if (server) {
					this.players[index].name = name;
					this.players[index].confirmed = true;
				} else {
					socket.emit('script', 'playerList.confirmPlayer(' + index + ', "' + this.players[index].name + '", true);');
				}
			},
			addPlayer: function(servantClass, servantIndex, server) {
				if (server) {
					var newPlayer = {
						confirmed: false,
						name: '',
					};
					newPlayer.servant = servantData[servantClass].servant[servantIndex];
					classList.disableClass(servantClass);
					newPlayer.selectedScene = '';
					newPlayer.servant.scene = sceneData.default;
					this.players.push(newPlayer);
				} else {
					servantClass = randomKey(servantData);
					while (!servantData[servantClass].enabled) {
						servantClass = randomKey(servantData);
					}
					servantIndex = Math.floor(Math.random() * servantData[servantClass].servant.length);
					socket.emit('script', 'playerList.addPlayer("' + servantClass + '", ' + servantIndex + ', true);');
				}
			},
			changeScene: function(index, selectedScene, server) {
				var player = this.players[index];
				if (server) {
					for (var i = 0; i < player.servant.scene.playerList.length; i++) {
						if (player.servant.scene.playerList[i] === player) {
							player.servant.scene.playerList.splice(i, 1);
							break;
						}
					}
					player.servant.scene = sceneData[selectedScene];
					player.servant.scene.playerList.push(player);
				} else {
					socket.emit('script', 'playerList.changeScene(' + index + ', "' + player.selectedScene + '", true);');
				}
			},
			initDuel: function(index, targetName, server) {
				if (server) {
					var servant = this.players[index].servant;
					var targetServant;
					for (var i = 0; i < this.players.length; i++) {
						if (targetName === this.players[i].servant.name) {
							targetServant = this.players[i].servant;
						}
					}
					duelData.push({
						attacker: servant,
						defender: targetServant
					});
					console.log(duelData);
				} else {
					socket.emit('script', 'playerList.initDuel(' + index + ', "' + this.players[index].servant.duelTarget + '", true)');
				}
			}
		}
	});

	var classList = new Vue({
		el: '#classList',
		data: {
			servantData: servantData
		},
		methods: {
			enableClass: function(key) {
				servantData[key].enabled = true;
			},
			disableClass: function(key) {
				servantData[key].enabled = false;
			}
		}
	});

	var sceneList = new Vue({
		el: '#sceneList',
		data: {
			sceneData: sceneData
		},
		methods: {
			resetVote: function() {
				for (i in sceneData) {
					sceneData[i].vote = 0;
				}
			},
			boomScene: function() {
				var maxVoted = sceneData.default;
				for (i in sceneData) {
					if (sceneData[i].vote > maxVoted.vote) {
						maxVoted = sceneData[i];
					}
					if (sceneData[i].vote === maxVoted.vote && Math.random() < 0.5) {
						maxVoted = sceneData[i];
					}
				}
				if (maxVoted === sceneData.volcano) {
					for (var i = 0; i < playerList.players.length; i++) {
						if (playerList.players[i].servant.endurance < 3 &&
							playerList.players[i].servant.endurance > 0) {
							setEndurance(playerList.players[i], 1);
						} else if (playerList.players[i].servant.endurance >= 3) {
							dealDamage(null, playerList.players[i].servant, 2);
						}
					}
				}
				maxVoted.enabled = false;
				this.resetVote();
			},
			incVote: function(scene) {
				scene.vote++;
			},
			restoreScene: function(scene) {
				scene.enabled = true;
			}
		}
	});

	var duelList = new Vue({
		el: '#duelList',
		data: {
			duelData: duelData
		},
		methods: {
			executeDuel: function(index, dice1, dice2) {
				var attacker = this.duelData[index].attacker;
				var defender = this.duelData[index].defender;
				if (dice1 === undefined) {
					dice1 = dice(attacker);
				}
				if (dice2 === undefined) {
					dice2 = dice(defender);
				}
				var attackerDmg = Math.max(attacker.attack - defender.defense + dice1, 0);
				var defenderDmg = Math.max(defender.attack - attacker.defense + dice2, 0);
				if (attacker.name === '何珂' && attacker.skill[0].enabled && attackerDmg === 0) {
					attacker.lastFailure = defender;
				}
				if (defender.name === '何珂' && defender.skill[0].enabled && defenderDmg === 0) {
					defender.lastFailure = attacker;
				}
				dealDamage(attacker, defender, attackerDmg);
				dealDamage(defender, attacker, defenderDmg);
				this.duelData.splice(index, 1);
			},
			cancelDuel: function(index) {
				this.duelData.splice(index, 1);
			}
		}
	});

	var forrestModal = new Vue({
		el: "#forrestModal",
		data: {
			forrest: sceneData.forrest,
			chosen: '0'
		},
		methods: {
			averageEndurance: function() {
				var servantA = this.forrest.playerList[0].servant;
				var servantB = this.forrest.playerList[1].servant;
				if (this.chosen === '0') {
					setEndurance(servantA, (servantA.endurance + servantB.endurance + 1) / 2);
					setEndurance(servantB, servantA.endurance - 1);
				} else {
					setEndurance(servantB, (servantA.endurance + servantB.endurance + 1) / 2);
					setEndurance(servantA, servantB.endurance - 1);
				}
			}
		}
	});

	var mutouModal = new Vue({
		el: "#mutouModal",
		data: {
			forrest: sceneData.forrest,
			mutou: servantData.saber.servant[1]
		},
		methods: {
			initMutouDuel: function() {
				for (var i = 0; i < playerList.players.length; i++) {
					if (playerList.players[i].servant.name === '穆投') {
						playerList.initDuel(i);
					}
				}
			}
		}
	});

	var mengchengModal = new Vue({
		el: "#mengchengModal",
		data: {
			lancePhase: null,
			lanceTarget: null,
			players: playerList.players
		},
		methods: {
			castLance: function() {
				console.log(this.lancePhase);
				console.log(this.lanceTarget);
				switch (this.lancePhase) {
				case 'ice-cast':
					for (var i = 0; i < this.players.length; i++) {
						if (this.players[i].servant.name == this.lanceTarget) {
							this.players[i].servant.freezed = true;
						}
					}
					break;
				case 'ice-dispel':
					for (var i = 0; i < this.players.length; i++) {
						this.players[i].servant.freezed = false;
						if (!this.players[i].servant.scene.enabled) {
							dealDamage(servantData.lancer.servant[0], this.players[i].servant, 4);
						}
					}
					break;
				case 'fire':
					for (var i = 0; i < this.players.length; i++) {
						if (this.players[i].servant.name == this.lanceTarget) {
							dealDamage(servantData.lancer.servant[0], this.players[i].servant, 2);
						}
					}
					break;
				}
			}
		}
	});

	var restart = new Vue({
		el: '#restart',
		methods: {
			restartGame: function() {
				socket.emit('reset', {});
			}
		}
	});
})();
