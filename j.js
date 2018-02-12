// Setting up the default env.
var playerScore = 0;
var cpuScore = 0;
var bet = 0;
var money = 100;
var brokeCounter = 1;


(function () {
  $('#player').html("<b>" + "0" + "</b>");
  $("#bet").html("0");
  $("#cpu").html("0");
  $("#money").html(money);
  $("#playerStays").prop("disabled", true);
  hideRefill();
  $("#winner").html("Óakveðið");


})();



function playerLost() {
  document.getElementById("player").style.color = 'red';
}

function cpuLost() {
  document.getElementById("cpu").style.color = 'red';
}


function playerReset() {
  document.getElementById("player").style.color = 'black';
  playerScore = 0;
  updatePlayer(playerScore);
}

function cpuReset() {
  document.getElementById("cpu").style.color = 'black';
  cpuScore = 0;
  updateCpu(cpuScore);

}





// Silly display in console.log;
var welcomeScreen = function () {
  console.log("######################################");
  console.log("Hello, and welcome to the automatic 21");
  console.log("######################################");
}






// Returns a random number between 1 - 11
var drawCard = function () {
  return Math.floor((Math.random() * 11) + 1);
  // return playerScore+=7;
}


// Updates the player's score.

var updatePlayer = function (score) {


  if (score < 22) {
    $('#player').html("<b>" + score + "</b>");
  } else {
    $('#player').html("<b>" + score + " BUST" + "</b>");
    playerLost();
    playerLostBet();
    updateMoney();
    $('#winner').html("Dealer");
    $("#playerDrawCard").prop("disabled", true);
    $("#playerStays").prop("disabled", true);

  }
  if (score === 21) {

    $("#playerDrawCard").prop("disabled", true);
    $("#playerStays").prop("disabled", true);
    $('#winner').html("player");
    $('#player').html("<b>" + score + " BLACKJACK!!! 2X REWARD!!" + "</b>");
    playerWonBet();
    playerWonBet();

    updateMoney();

  }

}
$("#playerStays").click(function () {

  while (cpuScore <= 17) {
    cpuScore += drawCard();
    $("#playerDrawCard").prop("disabled", true);
    $("#playerStays").prop("disabled", true);

  }
  updateCpu(cpuScore);


  if (cpuScore > 21) {
    cpuLost();
    $('#cpu').html("<b>" + cpuScore + " BUST" + "</b>");
    $('#winner').html("Player");
    playerWonBet();
    updateMoney();


  }
  if (cpuScore >= playerScore && cpuScore < 22) {
    $('#winner').html("Dealer");
    playerLostBet();
    updateMoney();


  }
  if (cpuScore < playerScore) {
    $('#winner').html("Player");
    playerWonBet();
    updateMoney();

  }



});

// Show's the welcome screen in the console log.
welcomeScreen();


// User actions below here.

// Player asks for another card. 
$('#playerDrawCard').click(function () {
  if (bet == 0) {
    alert("þú verður að leggja undir!!!")
  } else {

    $("#playerReset").prop("disabled", true);



    if (bet <= money) {

      // runs the drawCard function and adds the results from the function to the
      // playerScore variable.
      playerScore += drawCard();

      // runs the updatePlayer function and passes the score as paramenter.
      // updateplayer function changes the score visible to the player on
      // the site.
      updatePlayer(playerScore);
      if (playerScore > 0) {

        $("#playerStays").prop("disabled", false);

      }
      if (playerScore >= 21) {
        $("#playerStays").prop("disabled", true);

      }
    } else {
      alert("Þú att ekki efni á þessu!")
    }
  }


});


var updateCpu = function (cpuScore) {
  $('#cpu').html("<b>" + cpuScore + "</b>");

}
$("#playerBetMore").click(function () {


  if (playerScore <= 0 && bet < money) {
    bet = betMore();
    updateBet(bet);

  }


});
var updateBet = function (betAmount) {

  $("#bet").html(betAmount);

}
var betMore = function () {

  return bet + 10;

}
var betLess = function () {
  return bet - 10;
}

$("#playerBetLess").click(function () {

  if (bet > 0 && playerScore <= 0) {
    bet = betLess();
    updateBet(bet);
  }
});

$("#playerClearBet").click(function () {
  if (playerScore <= 0) {

    bet = 0;
    updateBet(bet);
  }
});
$("#playerReset").click(function () {
  if (bet > money) {
    bet = money;
    updateBet(bet);

  }
  updateMoney();
  playerReset();
  cpuReset();
  $('#winner').html("Óákveðið");
  $("#playerDrawCard").prop("disabled", false);
  $("#playerStays").prop("disabled", true);

});



function playerWonBet() {
  $("#playerReset").prop("disabled", false);

  money = money + bet;
}

function playerWonBlackJack() {
  money = money + (bet * 2);
}

function playerLostBet() {
  $("#playerReset").prop("disabled", false);


  money = money - bet;
  if (money <= 0) {
    showRefill();
    brokeCounter++;
  }

}


var updateMoney = function () {
  $('#money').html(money);

}

function hideRefill() {

  var x = document.getElementById("refill");
  x.style.display = "none";

}

function showRefill() {

  var x = document.getElementById("refill");
  x.style.display = "block";
  $('#brokeCounter').html(brokeCounter + ".");


}
$("#btnRefill").click(function () {
  money += 100;
  updateMoney();
  hideRefill();

})