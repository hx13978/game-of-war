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


class Game {
    constructor() {
        this.deck = new Deck();

        //creating an array for each of the players to hold their cards
        this.player1Hand = [];
        this.player2Hand = [];

        //splitting suffled deck into two hands
        this.player1Hand = this.deck.cards.slice(0, 26);
        //console.log(player1Hand.length);
        this.player2Hand = this.deck.cards.slice(26, 52);
        //console.log(player2Hand.length);
    }
    //logic to compare cards
    compareCards(player1Card, player2Card) {
        if (player1Card.score > player2Card.score) {
            this.player1Hand.unshift(player1Card);
            this.player1Hand.unshift(player2Card);
            console.log("You played a " + player1Card.rank + " of " + player1Card.suit + " and the computer played a " + player2Card.rank + " of " + player2Card.suit);
            console.log("You win the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
        }
        else if (player1Card.score < player2Card.score) {
            this.player2Hand.unshift(player2Card);
            this.player2Hand.unshift(player1Card);
            console.log("You played a " + player1Card.rank + " of " + player1Card.suit + " and the computer played a " + player2Card.rank + " of " + player2Card.suit);
            console.log("The computer wins the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
        }
        else if (player1Card.score = player2Card.score) {
            console.log("You played a " + player1Card.rank + " of " + player1Card.suit + " and the computer played a " + player2Card.rank + " of " + player2Card.suit + ". It's a tie, let's see who wins the war!");
            let player1Pile = [player1Card];
            let player2Pile = [player2Card];
            this.tieBreaker(player1Pile, player2Pile);
        }
    }
    tieBreaker(player1Pile, player2Pile) {
        if (this.player1Hand.length < 4) {
            this.player2Hand = this.player2Hand.concat(player1Pile);
            this.player2Hand = this.player2Hand.concat(player2Pile);

            this.player2Hand = this.player2Hand.concat(this.player1Hand);
            this.player1Hand = [];
            player1Pile = [];
            player2Pile = [];
            
            console.log("You don't have enough cards to play the tiebreaker.");
            console.log("The computer wins the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
        }
        else if (this.player2Hand.length < 4) {
            this.player1Hand = this.player1Hand.concat(player2Pile);
            this.player1Hand = this.player1Hand.concat(player1Pile);

            this.player1Hand = this.player1Hand.concat(this.player2Hand);
            this.player2Hand = [];
            player1Pile = [];
            player2Pile = [];

            console.log("The computer does not have enough cards to play the tiebreaker.");
            console.log("You win the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
        }
        else {
            console.log(this.player1Hand);
            console.log(player1Pile);
            console.log(this.player2Hand);
            console.log(player2Pile);

            let player1Index = this.player1Hand.length - 5;
            let player1Tie = this.player1Hand[player1Index];
            //console.log(player1Tie);
            let player2Index = this.player2Hand.length - 5;
            let player2Tie = this.player2Hand[player2Index];
            //console.log(player2Tie);
            if (player1Tie.score > player2Tie.score) {
                this.player1Hand = this.player1Hand.concat(player2Pile);
                this.player1Hand = this.player1Hand.concat(player1Pile);
                this.player1Hand = this.player1Hand.concat(this.player2Hand.splice(player2Index, 4));
                player1Pile = [];
                player2Pile = [];

                console.log("You played a " + player1Tie.rank + " of " + player1Tie.suit + " and the computer played a " + player2Tie.rank + " of " + player2Tie.suit);
                console.log("You win the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
            }
            else if (player1Tie.score < player2Tie.score) {
                this.player2Hand = this.player2Hand.concat(player1Pile);
                this.player2Hand = this.player2Hand.concat(player2Pile);
                this.player2Hand = this.player2Hand.concat(this.player1Hand.splice(player1Index, 4));
                player1Pile = [];
                player2Pile = [];

                console.log("You played a " + player1Tie.rank + " of " + player1Tie.suit + " and the computer played a " + player2Tie.rank + " of " + player2Tie.suit);
                console.log("The computer wins the round. You now have " + this.player1Hand.length + " cards and the computer has " + this.player2Hand.length + " cards.");
            }
            else if (player1Tie.score = player2Tie.score) {
                player1Pile = player1Pile.concat(this.player1Hand.splice(player1Index, 4));
                player2Pile = player2Pile.concat(this.player2Hand.splice(player2Index, 4));
                this.tieBreaker(player1Pile, player2Pile);
            }
        }
    }
    play() {
            while (this.player1Hand.length > 0 && this.player2Hand.length > 0) {
                let player1Card = this.player1Hand.pop();
                //   console.log(player1Card);
                let player2Card = this.player2Hand.pop();
                //   console.log(player2Card);
                this.compareCards(player1Card, player2Card);
            }
    } 

 }

game = new Game();
game.play();

console.log(game.player1Hand);
console.log(game.player2Hand);










