let targetScore = 0;
let playerScore = 0;
let playerWins = 0;
let playerLosses = 0;
let valArray = [1,2,3,4,5,6,7,8,9,10,11,12];
let imageArray = [{image: "assets/images/amber.PNG"}, {image: "assets/images/amethyst.PNG"}, {image: "assets/images/diamond.PNG"}, {image: "assets/images/emerald.PNG"}, {image: "assets/images/ruby.PNG"}, {image: "assets/images/saphire.PNG"}, {image: "assets/images/topaz.PNG"}]
let npcArray = [{image:"assets/images/npcguide.png"}, {image:"assets/images/npcmerchant.png"}, {image:"assets/images/npcnurse.png"}, {image:"assets/images/npcdemolitionist.png"}, {image:"assets/images/npcdyetrader.png"}, {image:"assets/images/npcdryad.png"}, {image:"assets/images/npcbarkeep.png"}, {image:"assets/images/npcarmsdealer.png"}, {image:"assets/images/npcstylist.png"}, {image:"assets/images/npcpainter.png"}, {image:"assets/images/npcangler.png"}, {image:"assets/images/npctinkerer.png"}, {image:"assets/images/npcwitchdoctor.png"}, {image:"assets/images/npcclothier.png"}, {image:"assets/images/npcmechanic.png"}, {image:"assets/images/npcpartygirl.png"}, {image:"assets/images/npcwizard.png"}, {image:"assets/images/npctaxcollector.png"}, {image:"assets/images/npctruffle.png"}, {image:"assets/images/npcpirate.png"}, {image:"assets/images/npcsteampunker.png"}, {image:"assets/images/npccyborg.png"}, {image:"assets/images/npcsantaclaus.png"}, {image:"assets/images/npctraveler.png"}, {image:"assets/images/npcoldman.png"}, {image:"assets/images/npcskeleton.png"}]

$(document).ready(function() {

	$("html").addClass("touch-mode-grab");

	$("#gem-mine").on('mousedown', function(e) {
		e.preventDefault();
		$("html").removeClass("touch-mode-grab").addClass("touch-mode-grabbing");
	});

	$("#gem-mine").on('mouseup mouseleave', function(e) {
		$("html").removeClass("touch-mode-grabbing").addClass("touch-mode-grab");
	})

	function shuffle(array){
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex){
			randomIndex = Math.floor(Math.random()*currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array [randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	//  Set the game function
	function game () {
		//  Generate Random Number between 19-120 for the Target Score
		targetScore = Math.floor((Math.random()*102)+19);
		$("#targetScore").text(targetScore)
		valArray = shuffle(valArray);
		imageArray = shuffle(imageArray);
		$('#gem1').attr("data-gem-value", valArray[0]).attr("src", imageArray[0].image)
		$('#gem2').attr("data-gem-value", valArray[1]).attr("src", imageArray[1].image)
		$('#gem3').attr("data-gem-value", valArray[2]).attr("src", imageArray[2].image)
		$('#gem4').attr("data-gem-value", valArray[3]).attr("src", imageArray[3].image)
	}

	// Set the game reset function
	function reset () {
		playerScore = 0;
		$("#playerScore").text(0)
		game ();
	}

	// Set the win/lose conditions
	function gameWin() {
		if (playerScore === targetScore && playerWins < npcArray.length) {
			// add npc to farm on game win
			if (playerWins === 0) {
				$("#npc-farm").empty();
			}
			let npcImage = $("<img>");
			npcImage.addClass("npc");
			npcImage.attr("src", npcArray[playerWins].image);
			$("#npc-farm").append(npcImage);
			playerWins += 1;
			$("#playerWins").text(playerWins);
			reset();
		} else if (playerScore === targetScore && playerWins >= npcArray.length) {
			// no more npcs to save, just add 1 to win count
			playerWins += 1;
			$("#playerWins").text(playerWins);
			reset();
		} else if (playerScore > targetScore) {
			playerLosses += 1;
			$("#playerLosses").text(playerLosses)
			reset();
		}
	}

	// Increase playerScore when player selects gem
	$(".gem").click(function() {
		let gemValue = parseInt($(this).attr("data-gem-value"));
		playerScore += gemValue;
		$("#playerScore").text(playerScore)
		gameWin();
	});

	// // Allows for game rules section to be collapsed/expanded
	// var coll = document.getElementsByClassName("collapsible");
	// 	for ( let i = 0; i < coll.length; i++) {
	// 	coll[i].addEventListener("click", function() {
	// 		this.classList.toggle("active");
	// 		let content = this.nextElementSibling;
	// 		if (content.style.display === "block") {
	// 			content.style.display = "none";
	// 		} else {
	// 			content.style.display = "block";
	// 		}
	// 	});
	// }

	// Run the game
	game ();

});
