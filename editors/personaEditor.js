var heroArrayGlobal;
var currentHero;

function loadHeros(onLoadHeros) {
	$.ajax({
		url: "./../api/heroes",
		type: "GET",
		contentType: "application/json",
		success: onLoadHeros
	});
}

function onLoadHerosHendler(heroArray) {
	heroArrayGlobal = heroArray;
	const heroArrayElement = document.getElementById("heroArray");
	heroArrayElement.addEventListener('change', function (e) {
		updateHeroInfo(e.target.value);
	});
	heroArray.forEach(function (item, index, array) {
		var option = document.createElement('option');
		option.appendChild(document.createTextNode(item.name));
		option.value = item.name;
		heroArrayElement.appendChild(option);
	});
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", false, true);
	heroArrayElement.dispatchEvent(evt);
}

function updateHeroInfo(heroId) {
	heroArrayGlobal.forEach(function (item, index, array) {
		if (item.name === heroId) {
			console.log('ok');
			currentHero = item;
			updateStatusHero(item);
		}
	});
}

function updateStatusHero(hero) {
	get('hero-name').innerHTML = hero.name;
	get('hero-health').innerHTML = hero.health;
	get('hero-damage').innerHTML = hero.damage;
	get('hero-armor').innerHTML = hero.armor;
	get('hero-money').innerHTML = hero.money;
	const heroElement = get('hero');
	heroElement.style.backgroundImage = 'url(../' + hero.imageUrl + ')';
	const options = currentHero.animationOptions;
	heroElement.style.backgroundPosition = options.backgroundPositionX + 'px ' + options.backgroundPositionY + 'px';
	heroElement.style.width = options.width;
	heroElement.style.height = options.height;
}

get('fight').onclick = animateHeroFight;

function animateHeroFight() {
	const options = currentHero.animationOptions;
	let position = Number(options.backgroundPositionX);
	const frameLenght = Number(options.frameLenght);
	const diff = Number(options.diff);
	get('hero').style.transform = 'translate(-300px, 0px)';

	intervalHeroFight = setInterval(() => {
		console.log('position:',position);
		get('hero').style.backgroundPosition = '-' + position + 'px ' + options.backgroundPositionY + 'px';
		if (position < frameLenght) {
			position += diff;
			console.log('next');
		} else {
			position = options.backgroundPositionX;
			get('hero').style.backgroundPosition = '-' + position + 'px ' + options.backgroundPositionY + 'px';
			get('hero').style.transform = 'translate(0px, 0px)';
			stopAnimation(intervalHeroFight);
			console.log('stop');
		};
	}, options.interval);

	function stopAnimation(stopInteval) {
		clearInterval(stopInteval);
	}
}

function get(id) {
	return document.getElementById(id);
}

function loadChangeHandlers() {
	debugger;
	get('backgroundPositionX').onkeyup = function (e) {
		var numbers = /^[0-9]+$/;
		if (e.value) {
			//alert('Your Registration number has accepted....');
			//document.form1.text1.focus();
			return true;
		}
		e.preventDefault()
		return false;
		// else {
		// 	alert('Please input numeric characters only');
		// 	document.form1.text1.focus();
		// 	return false;
		// }
	};
}

function init() {
	loadHeros(onLoadHerosHendler);
	//loadChangeHandlers()
}

window.onload = function () {
	init();
}