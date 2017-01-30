var blank = '<div class="letter"></div>';
var hangman = {
  word: [],
  letter: "",
  length: 0,
  wordlength: function(){
    this.length = this.word.length;
  },
  blanks: [],
  turns: 0,
  wincount: 0,
};

// var zIndex0 = "z-index", 0;
// zIndex1 = '"z-index", "1"'; zIndex2 = '"z-index", "2"';


$("#setword").click(function(){
  event.preventDefault();
  hangman.word = $("#answer").val().split("");
  $("#answer").val("");
  hangman.wordlength();
  buildBlanks();
  console.log(hangman.word)
  $(".two-player").css("z-index", 0);
})


$(".keyboard button").click(function(){
  if ($(this).hasClass("x")) {
    return;
  } else {
    $(this).addClass("x");
    hangman.letter = $(this).html().toLowerCase();
    hangmanCheck(hangman.letter);
  }
})

function hangmanCheck(letter) {
  if (hangman.word.indexOf(letter) === -1) {
    // wrong answer
    hangman.turns++;
    var turnId = "#turn" + hangman.turns;
    $(turnId).fadeIn("slow");
    console.log("wrong!");
    if (hangman.turns == 11) {
      setTimeout(function() {
        $("#result").html("You lose!");
        $(".result-screen").css("z-index", 2);
      },
      2000);
    }
  } else {
    for (var i=0; i < hangman.length; i++) {
      if (letter == hangman.word[i]) {
        // insert into blank area
        hangman.blanks.eq(i).html(letter);
        // add to wincount to check if game has been won yet
        hangman.wincount++;
        if (hangman.wincount == hangman.length) {
          $("#result").html("You win!");
          $(".result-screen").css("z-index", 2);
        }
      }
    }
  }
}

// Function that builds the blanks for the word that is entered by player
function buildBlanks() {
  for (var i=0; i < hangman.length; i++) {
      $("#word-area").append(blank);
  }
  hangman.blanks = $("#word-area").children();
}

// Resetting game instead of refreshing, called by play again button
function reset() {
  var keyArray = $(".keyboard").children()
  for (var i = 0;i < 25; i++){
    keyArray.eq(i).removeClass("x");
    // removes hangman body parts
    var turnId = "#turn" + i;
    $(turnId).css("display","none");
  }
  $("#word-area").html("");
  $(".result-screen").css("z-index", 0)
  $(".two-player").css("z-index", 2)
  hangman.turns = 0;
  hangman.wincount = 0;
}

$("#play-again").click(reset);
