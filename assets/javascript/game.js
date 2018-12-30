//  Set the initial variables on page load
    var targetScore = 0;
    var playerScore = 0;
    var playerWins = 0;
    var playerLosses = 0;
    var valArray = [1,2,3,4,5,6,7,8,9,10,11,12]
    var imageArray= [{image: "assets/images/amber.PNG"}, {image: "assets/images/amethyst.PNG"}, {image: "assets/images/diamond.PNG"}, {image: "assets/images/emerald.PNG"}, {image: "assets/images/ruby.PNG"}, {image: "assets/images/saphire.PNG"}, {image: "assets/images/topaz.PNG"}]
    var val1 = valArray[0];
    var val2 = valArray[1];
    var val3 = valArray[2];
    var val4 = valArray[3];



$(document).ready(function() {



//  Set the game function
    function game () {
    //  Generate Random Number between 19-120 for the Target Score
        targetScore = Math.floor((Math.random()*102)+19);
        $("#targetScore").text(targetScore)
            console.log(targetScore);
    //  Shuffle valArray to assign unique random number to each random gem
        function shuffle(array){
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex){
                randomIndex = Math.floor(Math.random()*currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array [randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        valArray = shuffle(valArray);
        imageArray = shuffle(imageArray);
        val1 = valArray[0];
        img1 = imageArray[0];
        $('#gem1').attr("data-gem-value", val1).attr("src", imageArray[0].image)
        val2 = valArray[1];
        $('#gem2').attr("data-gem-value", val2).attr("src", imageArray[1].image)
        val3 = valArray[2];
        $('#gem3').attr("data-gem-value", val3).attr("src", imageArray[2].image)
        val4 = valArray[3];
        $('#gem4').attr("data-gem-value", val4).attr("src", imageArray[3].image)
            console.log(valArray);
            console.log(imageArray);
            console.log(val1, val2, val3, val4);
    }



// Set the game reset function
    function reset () {
        playerScore = 0;
        $("#playerScore").text(0)
        game ();
    }



// Set the win/lose conditions
    function gameWin() {
        if (playerScore === targetScore) {
            playerWins += 1;
            $("#playerWins").text(playerWins)
            reset();
        } else if (playerScore > targetScore) {
            playerLosses += 1;
            $("#playerLosses").text(playerLosses)
            reset();
        }}



// Run the game
    game ();



// Increase playerScore when player selects gem
    $(".gem").click(function() {
        var gemValue = ($(this).attr("data-gem-value"));
            console.log(gemValue);
        playerScore += parseInt(gemValue);
        $("#playerScore").text(playerScore)
            console.log (playerScore);
        gameWin();
    });



// Allows for game rules to be collapsed/expanded
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }



});