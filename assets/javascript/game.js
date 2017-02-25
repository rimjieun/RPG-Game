$(document).ready(function() {

function Character(name, healthPoints, basePower, counterAttack, attackPower) {
	this.name = name,
	this.healthPoints = healthPoints,
	this.basePower = basePower,
	this.counterAttack = counterAttack,
	this.attackPower = attackPower
}


//------------------------------------------START GAME--------------------------------------------------
function startGame() {		//study .wrapInner()

	$("#characterList").appendTo("#heading");
	$("input").remove();

//----------------------------------Creating First Character--------------------------------------------
	var character1 = new Character("Obi-Wan Kenobi", 120, 5, 10, 0);
	$("#character1 > .name").html(character1.name);
	$("#character1 > .image").html('<img src="assets/images/obi-wan-kenobi.jpg" alt="Obi-Wan Kenobi">');
	$("#character1 > .healthPoints").html(character1.healthPoints);
	$("#character1").attr("data-health-points", character1.healthPoints);
	$("#character1").attr("data-base-power", character1.basePower);
	$("#character1").attr("data-counter-attack", character1.counterAttack);
	$("#character1").attr("data-attack-power", character1.attackPower);

//----------------------------------Creating Second Character--------------------------------------------
	var character2 = new Character("Luke Skywalker", 100, 5, 10, 0);
	$("#character2 > .name").html(character2.name);
	$("#character2 > .image").html('<img src="assets/images/luke-skywalker.jpg" alt="Luke Skywalker">');
	$("#character2 > .healthPoints").html(character2.healthPoints);
	$("#character2").attr("data-health-points", character2.healthPoints);
	$("#character2").attr("data-base-power", character2.basePower);
	$("#character2").attr("data-counter-attack", character2.counterAttack);
	$("#character2").attr("data-attack-power", character2.attackPower);

//----------------------------------Creating Third Character--------------------------------------------
	var character3 = new Character("Darth Sidious", 150, 5, 10, 0);
	$("#character3 > .name").html(character3.name);
	$("#character3 > .image").html('<img src="assets/images/darth-sidious.png" alt="Darth Sidious">');
	$("#character3 > .healthPoints").html(character3.healthPoints);
	$("#character3").attr("data-health-points", character3.healthPoints);
	$("#character3").attr("data-base-power", character3.basePower);
	$("#character3").attr("data-counter-attack", character3.counterAttack);
	$("#character3").attr("data-attack-power", character3.attackPower);

//----------------------------------Creating Fourth Character--------------------------------------------
	var character4 = new Character("Darth Maul", 180, 5, 25, 0);
	$("#character4 > .name").html(character4.name);
	$("#character4 > .image").html('<img src="assets/images/darth-maul.jpeg" alt="Darth Maul">');
	$("#character4 > .healthPoints").html(character4.healthPoints);
	$("#character4").attr("data-health-points", character4.healthPoints);
	$("#character4").attr("data-base-power", character4.basePower);
	$("#character4").attr("data-counter-attack", character4.counterAttack);
	$("#character4").attr("data-attack-power", character4.attackPower);

	var characters = [character1, character2, character3, character4];

	var newChars = characters.map(doJQueryStuff)	// use map to create characters!

//----------------------------------Creating Characters using MAP----------------------------------------
	function doJQueryStuff(char, index) {
	 	$("#character" + index + " > .name").html(char.name);
	}

	var locked = false;

//----------------------------------------SELECT CHARACTERS----------------------------------------------
	function chooseCharacters() {
		$(".characters").on("click", function() {
			if (locked === false) {
				$(this).appendTo("#yourCharacter");
				if ($("#yourCharacter > div").hasClass("characters")) {
					var enemies = $("#characterList").toArray();
					$(enemies).appendTo("#enemiesAvailable");
				}
				locked = true;
			}
			else if ((locked === true) && !($("#defender > div").hasClass("characters"))) {
				$(this).appendTo("#defender");
			}
		});
	}

	chooseCharacters();


//--------------------------------------------ATTACK BUTTON------------------------------------------------
	$("#attackButton").on("click", function() {
		if ($("#defender > div").hasClass("characters")) {
			// console.log("attack");

			var yourCharDiv = $("#yourCharacter > div"); //move to global for onclick
			var yourCharHealth = yourCharDiv.attr("data-health-points");
			var yourCharBase = parseInt(yourCharDiv.attr("data-base-power"));
			var yourCharAttack = parseInt(yourCharDiv.attr("data-attack-power"));

			var defenderDiv = $("#defender > div"); //move to global
			var defenderName = ($("#defender > div > .name").text());
			var defenderHealth = defenderDiv.attr("data-health-points");
			var defenderCounter = defenderDiv.attr("data-counter-attack");

			function attack() {

				if ((yourCharHealth > 0) && (defenderHealth > 0)) {
				// console.log("char base: " + yourCharBase);
				
					yourCharAttack += yourCharBase; //why do I need parseInt for this and not for lines 92-93?
					// console.log("char attack: " + yourCharAttack);
					// console.log("def counter: " + defenderCounter);

					yourCharHealth -= defenderCounter;
					defenderHealth -= yourCharAttack;
					// console.log("char health: " + yourCharHealth);
					// console.log("def health: " + defenderHealth);

					yourCharDiv.attr("data-attack-power", yourCharAttack);
					yourCharDiv.attr("data-health-points", yourCharHealth);
					defenderDiv.attr("data-health-points", defenderHealth);

					$("#yourCharacter > div > .healthPoints").html(yourCharHealth);
					$("#defender > div > .healthPoints").html(defenderHealth);

					$("#line1").html("You attacked " + defenderName + " for " + yourCharAttack + " damage.");
					$("#line2").html(defenderName + " attacked you back for " + defenderCounter + " damage.");

				}

				if (yourCharHealth < 0) {
					$("#line1").html("You have been defeated...GAME OVER!");
					
					var button = $('<input type="button" value="Restart" />');

					button = $("#line2").html(button);

					button.attr("id", "button");

					$("#button").on("click", function() {
	$("#character1, #character2, #character3, #character4").appendTo($("#characterList"));
	startGame();
})
				}



				else if (defenderHealth < 0) {
					defenderDiv.remove();
					$("#line1").html("You have defeated " + defenderName + ". You can choose to fight another enemy.");
					$("#line2").empty();
					chooseCharacters();
				}


			}
			attack();
		}
		else {
			$("#line1").html("No enemy here.");
		}

	})



}

//------------------------------------------PLAY GAME-------------------------------------------------

startGame();




	
})