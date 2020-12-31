alert("Hello there! Today you will be playing the card game of war against the computer. Good Luck!!");




class Card {
    constructor (suit, rank, score) {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
    }   
}

class Deck {
    constructor() {
        this.cards = this.createDeck()
        this.shuffle()
    }

    createDeck() {
        //Creating arrays for the different suits and ranks
        let suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
        let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

        // Merging suits and ranks arrays to create a deck of 52 cards and assign each card a score.
        let cardList = [];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                let card = new Card(suits[i], ranks[j], j);
                cardList.push(card);

            }
        }
        return cardList;
    }

    //Shuffle cards
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let randomNumber = Math.floor(Math.random() * i);
            let randomCard = this.cards[i];
            this.cards[i] = this.cards[randomNumber];
            this.cards[randomNumber] = randomCard;
        }
    }
}

deck = new Deck();
//console.log(deck.cards.length);


//creating an array for each of the players to hold their cards
let player1Hand = [];
let player2Hand = [];

//splitting suffled deck into two hands
player1Hand = deck.cards.slice(0,26);
//console.log(player1Hand.length);
player2Hand = deck.cards.slice(26,52);
//console.log(player2Hand.length);

//logic to compare cards
function compareCards(player1Card, player2Card) {
   if (player1Card.score > player2Card.score) {
       player1Hand.unshift(player1Card,player2Card);
       console.log("You played a " + player1Card.rank + " of " + player1Card.suit + " and the computer played a " + player2Card.rank + " of " + player2Card.suit);
       console.log("You win the round. You now have " + player1Hand.length + " cards and the computer has " + player2Hand.length + " cards.")
   }
   else if (player1Card.score < player2Card.score) {
       player2Hand.unshift(player1Card, player2Card)
 //      console.log("2 " + player2Card.score);
       console.log("You played a " + player1Card.rank + " of " + player2Card.suit + " and the computer played a " + player2Card.rank + " of " + player2Card.suit);
       console.log("The computer wins the round. You now have " + player1Hand.length + " cards and the computer has " + player2Hand.length + " cards.")
   }
} 

//Decide which hand has fewest cards to determine how many compairs can happen in each round
let smallestHand = Math.min(player1Hand.length, player2Hand.length);
console.log(smallestHand);


for(let i = player1Hand.length; i > 0; i--) {
    let player1Card = player1Hand.pop();
 //   console.log(player1Card);
    let player2Card = player2Hand.pop();
 //   console.log(player2Card);
    compareCards(player1Card, player2Card);
}
console.log(player1Hand);
console.log(player2Hand);










