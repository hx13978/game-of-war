alert("Hello there! Today you will be playing the card game of war against the computer. Good Luck!!");




class Card {
    constructor (suit, rank, score) {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
    }   
}

//Creating arrays for the different suits and ranks
let suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

// Merging suits and ranks arrays to create a deck of 52 cards and assign each card a score.
let createDeck = [];
for(let i = 0; i < suits.length; i++) {
    for(let j = 0; j < ranks.length; j++) {
    let card = new Card(suits[i], ranks[j], j);
    createDeck.push(card);
    }   
}
//View created deck
//console.log(createDeck)

//Shuffle cards
for(let i = createDeck.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * i);
    let randomCard = createDeck[i];
    createDeck[i] = createDeck[randomNumber];
    createDeck[randomNumber] = randomCard;
}
//creating an array for each of the players to hold their cards
let player1Hand = [];
let player2Hand = [];

//splitting suffled deck into two hands
player1Hand = createDeck.slice(0,26);
console.log(player1Hand);
player2Hand = createDeck.slice(26,52);
console.log(player2Hand);


