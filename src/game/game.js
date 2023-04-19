let game = {

    lockMode: false,
    firstCard: null,
    secondCard:null,

    teams: [ "atletico-mg",
    "america",
    "cruzeiro",
    "flamengo",
    "fluminense",
    "gremio",
    "palmeiras",
    "santos",
    "inter",
    "vasco"
    ],

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0]

        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch : function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unFlipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    cards : null,

    createCardsFromTeams: function (){
        this.cards = []
    
        this.teams.forEach((team) => {
        this.cards.push(this.createPairFromTeam(team))
        })
    
        this.cards =  this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },
    
    createPairFromTeam: function (team){
    
        return [{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped: false,
        },{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped: false,
        }]
    },
    
    createIdWithTeam: function (team){
        return team + parseInt(Math.random() *1000)
    },

    shuffleCards: function (cards){
        let currentIndex = this.cards.length
        let randomIndex = 0;
    
         while(currentIndex !== 0){
    
             randomIndex = Math.floor(Math.random() * currentIndex)
             currentIndex--
    
             [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    flipCard: function(cardId, gameOverCallBack, noMatchCallback){
        if(this.setCard(cardId)) {

            if(game.secondCard){
                if(this.checkMatch()) {
                    this.clearCards();
                    if(this.checkGameOver()){
                        //Game over
                        gameOverCallBack()
                    }
                }else {
                    setTimeout(()=>{
                        // no Match
                        this.unFlipCards()
                        noMatchCallback()
                    }, 1000)
                }
            }
        }
    }
}

export default game