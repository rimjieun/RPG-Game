$(document).ready(function() {

function Character(name, healthPoints, basePower, counterAttack, attackPower) {
	this.name = name,
	this.healthPoints = healthPoints,
	this.basePower = basePower,
	this.counterAttack = counterAttack,
	this.attackPower = attackPower
}


function startGame() {		//study .wrapInner()

	//more efficient way to update characters?
	//HAVE TO USE JQUERY TO CREATE DIV FROM SCRATCH AND CREATE CHILDREN IN DIV T_T
	var character1 = new Character("Obi-Wan Kenobi", 120, 5, 10, 0);
	$("#character1 > .name").html(character1.name);
	$("#character1 > .name").after('<img src="assets/images/obi-wan-kenobi.jpg" alt="Obi-Wan Kenobi">');
	$("#character1 > .healthPoints").html(character1.healthPoints);
	$("#character1").attr("data-health-points", character1.healthPoints);
	$("#character1").attr("data-base-power", character1.basePower);
	$("#character1").attr("data-counter-attack", character1.counterAttack);
	$("#character1").attr("data-attack-power", character1.attackPower);

	var character2 = new Character("Luke Skywalker", 100, 5, 10, 0);
	$("#character2 > .name").html(character2.name);
	$("#character2 > .name").after('<img src="assets/images/luke-skywalker.jpg" alt="Luke Skywalker">');
	$("#character2 > .healthPoints").html(character2.healthPoints);
	$("#character2").attr("data-health-points", character2.healthPoints);
	$("#character2").attr("data-base-power", character2.basePower);
	$("#character2").attr("data-counter-attack", character2.counterAttack);
	$("#character2").attr("data-attack-power", character2.attackPower);

	var character3 = new Character("Darth Sidious", 150, 5, 10, 0);
	$("#character3 > .name").html(character3.name);
	$("#character3 > .name").after('<img src="assets/images/darth-sidious.png" alt="Darth Sidious">');
	$("#character3 > .healthPoints").html(character3.healthPoints);
	$("#character3").attr("data-health-points", character3.healthPoints);
	$("#character3").attr("data-base-power", character3.basePower);
	$("#character3").attr("data-counter-attack", character3.counterAttack);
	$("#character3").attr("data-attack-power", character3.attackPower);

	var character4 = new Character("Darth Maul", 180, 5, 25, 0);
	$("#character4 > .name").html(character4.name);
	$("#character4 > .name").after('<img src="assets/images/darth-maul.jpeg" alt="Darth Maul">');
	$("#character4 > .healthPoints").html(character4.healthPoints);
	$("#character4").attr("data-health-points", character4.healthPoints);
	$("#character4").attr("data-base-power", character4.basePower);
	$("#character4").attr("data-counter-attack", character4.counterAttack);
	$("#character4").attr("data-attack-power", character4.attackPower);


	var locked = false;

	function chooseCharacters() {
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
		});
	}

	chooseCharacters();

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

					$("#gameProgress1").html("You attacked " + defenderName + " for " + yourCharAttack + " damage.");
					$("#gameProgress2").html(defenderName + " attacked you back for " + defenderCounter + " damage.");

				}

				else if (yourCharHealth < 0) {
					$("#gameProgress1").html("You have been defeated...GAME OVER!");
					
					var button = $('<input type="button" value="Restart" />');

					$("#gameProgress2").html(button).on("click", function() {
						startGame(); //ERROR: APPENDS CHARACTERS INSTEAD OF RESETTING GAME
					});
				}

				else if (defenderHealth < 0) {
					defenderDiv.remove();
					$("#gameProgress1").html("You have defeated " + defenderName + ". You can choose to fight another enemy.");
					$("#gameProgress2").empty();
					chooseCharacters();
				}


			}
			attack();
		}
		else {
			$("#gameProgress1").html("No enemy here."); //appearing in wrong place
		}

	})


}

startGame();


	
})