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

$("#1player").click(function(){
  getRandomWord();
  $(".two-player").css("z-index", 0);
  $(".welcome").css("z-index", -1);

});

$("#2player").click(function(){
  $(".welcome").css("z-index", -1);
});


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
    // wrong answer increments game counter which adds a hangman part
    hangman.turns++;
    var turnId = "#turn" + hangman.turns;
    $(turnId).fadeIn("slow");
    console.log("wrong!");
    if (hangman.turns == 11) {
      setTimeout(function() {
        $("#result").html("You lose!");
        $("#play-again").before('<h3 id="correctword">The correct word was <strong>' + hangman.word.join("") + "</strong></h3>");
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
  for (var i = 0;i < 26; i++){
    keyArray.eq(i).removeClass("x");
    // removes hangman body parts
    var turnId = "#turn" + i;
    $(turnId).css("display","none");
  }
  //  Reset z-index ordering and game counters
  $("#word-area").html("");
  $(".result-screen").css("z-index", 0);
  $(".two-player").css("z-index", 2);
  $(".welcome").css("z-index", 3);
  $("#correctword").remove();
  hangman.turns = 0;
  hangman.wincount = 0;
}

$("#play-again").click(reset);

// Random word getting function using Wordnik API http://developer.wordnik.com/docs.html#!/words/getRandomWords_get_3

function getRandomWord() {
  $.ajax({
    url: "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=12&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    dataType: "json",
    success: function(response) {
      // fetches word from API, splits to array and assigns to the word
      // some words contain hyphens, so this loop filters those out
      console.log(response[0].word);
      for (var i = 0; i < 10; i++) {
        if (response[i].word.indexOf("-") == -1) {
          hangman.word = response[i].word.toLowerCase().split("");
          break;
        }
      }
      hangman.wordlength();
      buildBlanks();
    }
  })
}
