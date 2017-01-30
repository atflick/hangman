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
  hangman.letter = $(this).html().toLowerCase();
  console.log(hangman.letter);
  hangmanCheck(hangman.letter);
})

function hangmanCheck(letter) {
  if (hangman.word.indexOf(letter) === -1) {
    // wrong answer
    hangman.turns++;
    var turnId = "#turn" + hangman.turns;
    $(turnId).fadeIn("slow");
    console.log("wrong!");
  } else {
    for (var i=0; i < hangman.length; i++) {
      if (letter == hangman.word[i]) {
        // insert into blank area
        hangman.blanks.eq(i).html(letter);
        // add to wincount to check if game has been won yet
        hangman.wincount++;
        if (hangman.wincount == hangman.length) {
          console.log("You win!");
        }
      }
    }
  }
}

function buildBlanks() {
  for (var i=0; i < hangman.length; i++) {
      $("#word-area").append(blank);
  }
  hangman.blanks = $("#word-area").children();
}
