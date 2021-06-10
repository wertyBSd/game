let ork = {
	name: 'ork',
	armor: 10,
	agi: 10,
	health: 100,
	type: 'ork',
	money: 100,
	damage: 25,
	imageUrl: './assets/img/persons/ork.png'
};
let skeleton = {
	name: 'skeleton',
	armor: 10,
	agi: 10,
	health: 100,
	type: 'skeleton',
	money: 100,
	damage: 25,
	imageUrl: './assets/img/persons/skeleton.png'
};

let heroArray;
let enemyArray;

let intervalHeroFight;

function loadHeros(onLoadHeros) {
	$.ajax({
		url: "./api/heroes",
		type: "GET",
		contentType: "application/json",
		success: onLoadHeros
	});
}

function onLoadHerosHendler(heroArray) {
	let hero = heroArray[0];
	document.getElementById('hero').style.backgroundImage = 'url(' + hero.imageUrl + ')';
	updateStatusHero(hero);
}

function init() {
	loadHeros(onLoadHerosHendler);
	enemyArray = [ork, skeleton];
	let enemy = enemyArray[random(enemyArray.length)];
	document.getElementById('enemy').style.backgroundImage = 'url(' + enemy.imageUrl + ')';
	updateStatusEnemy(enemy);
	get('fight').onclick = animateHeroFight;
}

function updateStatusHero(hero) {
	get('hero-name').innerHTML = ' name: ' + hero.name;
	get('hero-health').innerHTML = ' health: ' + hero.health;
	get('hero-damage').innerHTML = ' damage: ' + hero.damage;
	get('hero-armor').innerHTML = ' armor: ' + hero.armor;
	get('hero-money').innerHTML = ' money: ' + hero.money;
}

function updateStatusEnemy(enemy) {
	get('enemy-name').innerHTML = ' name: ' + enemy.name;
	get('enemy-health').innerHTML = ' health: ' + enemy.health;
	get('enemy-damage').innerHTML = ' damage: ' + enemy.damage;
	get('enemy-armor').innerHTML = ' armor: ' + enemy.armor;
}

function get(id) {
	return document.getElementById(id);
}

function random(max) {
	let randomMin = Math.floor(Math.random() * max);  
	return Math.round(randomMin)
}

function animateHeroFight() {
	let position = 0;
	const interval = 100;
	const diff = 150;

	get('hero').style.transform = 'translate(-300px, 0px)';

	intervalHeroFight = setInterval(() => {
		get('hero').style.backgroundPosition = '-' + position + 'px -2000px';
		if(position < 800) {
			position += diff;
		} else {
			position = 0;
			get('hero').style.backgroundPosition = '-' + position + 'px -2000px';
			get('hero').style.transform = 'translate(0px, 0px)';
			stopAnimation(intervalHeroFight);
		};
	}, interval);

	function stopAnimation(stopInteval) {
		clearInterval(stopInteval);
		animateEnemyFight();
	}
}

function animateEnemyFight() {
	let position = -15;
	const interval = 100;
	const diff = 150;

	get('enemy').style.transform = 'translate(300px, 0px)';

	intervalHeroFight = setInterval(() => {
		get('enemy').style.backgroundPosition = position + 'px -1085px';
		if(position > -800) {
			position -= diff;
		} else {
			position = -15;
			get('enemy').style.backgroundPosition = position + 'px -1085px';
			get('enemy').style.transform = 'translate(0px, 0px)';
			stopAnimation(intervalHeroFight);
		};
	}, interval);

	function stopAnimation(stopInteval) {
		clearInterval(stopInteval);
	}
}

function animationHit(hero, container, damage) {
	let position = 100;
	const interval = 100;
	const diff = 150;

	intervalHit = setInterval(() => {
		get(hero).style.backgroundPosition = position + 'px -1085px';
		if(position > -800) {
			position -= diff;
		} else {
			position = -15;
			get('enemy').style.backgroundPosition = position + 'px -1085px';
			get('enemy').style.transform = 'translate(0px, 0px)';
			stopAnimation(intervalHeroFight);
		};
	}, interval);
}

window.onload = function() {
	init();
}