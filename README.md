# Project 1 - Hangman
## By Andy Flickinger

- Game repo: https://github.com/atflick/hangman
- Hosted game site: https://atflick.github.io/hangman/

## Goal
I wanted to create a hangman game that could be played by yourself or with a friend.  The game should be aesthetically pleasing and execute smoothly.

## User Stories
1. A user should be able to select preference on how they want to play game (single or two player).
2. If single player is chosen, the game should fetch a random word that the player will guess.
3. If two player is chosen, a user should be able to enter a word for the game that the other user will guess.
4. On either game type, the user will have a set amount of tries to guess the missing letters to complete the word.
5. If the player does not guess all of the missing letters in the allotted amount of tries they lose. If they complete the missing word they win.

## Build Process
I first wanted to create a general layout for the game and how I wanted it to look.  I thought about how I wanted the pieces of the hangman for each turn to display.  I decided I wanted to build it out in CSS rather than using an image.  I started mocking up the CSS in Codepen which I then transferred to my repository and made my first commit.  Once I had it looking somewhat decent, I started working on the Javascript.  
I chose to use the jQuery JS library for ease since I am pretty comfortable with vanilla JS.  I first started working on how to take input from the user for the two player game.  I needed to have them provide a word for the game and then have the game write it out in blanks on the page.  Essentially taking the string from the user and then converting into an array, which I could then check each letter input from the user against.  
I built one main function that could be used for both single player and two player game modes. The function uses a couple different counters which increment up and are checked to see if the game has been won/lost.  Once I got the game working I went back and made it pretty and added more functionality that improves the user experience.
For the single player version of the game I found a free API for random words.  It feeds random words to the game for the user to play alone, although it includes some tough words plus proper nouns/names.

## Outstanding Items
-The API for the single game sends words with hyphens, spaces and apostrophes sometimes.  I am trying to find a good way to filter those out or find a more customizable API.  If a user gets one of these words they cannot win.
