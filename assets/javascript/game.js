$(document).ready(function() {

function Character(name, healthPoints, basePower, counterAttack) {
	this.name = name,
	this.healthPoints = healthPoints,
	this.basePower = basePower,
	this.attackPower = function() {
		return attackPower += basePower
	},
	this.counterAttack = counterAttack
}

var character1 = new Character("Obi-Wan Kenobi", 120, 5, 10);
var character2 = new Character("Luke Skywalker", 100, 5, 10);
var character3 = new Character("Darth Sidious", 150, 5, 10);
var character4 = new Character("Darth Maul", 180, 5, 10);




console.log($(".characters"));



function startGame() {

	var locked = false;

	$("#character1 > .healthPoints").html(character1.healthPoints);
	$("#character2 > .healthPoints").html(character2.healthPoints);
	$("#character3 > .healthPoints").html(character3.healthPoints);
	$("#character4 > .healthPoints").html(character4.healthPoints);

	$(".characters").on("click", function() {
		if (locked === false) {
			$(this).appendTo("#yourCharacter");
			if ($("#yourCharacter > div").hasClass("characters")) {
				$("#characterList").appendTo("#enemiesAvailable");
			}
			locked = true;
		}
		else if ((locked === true) && !($("#defender > div").hasClass("characters"))) {
			$(this).appendTo("#defender");
		}
	})

	function attack() {
		
	}

	$("#attackButton").on("click", function() {
		if ($("#defender > div").hasClass("characters")) {
			console.log("attack");
		}
		else {
			$("#gameProgress").html("No enemy here.");
		}

})


}

startGame();


	
})