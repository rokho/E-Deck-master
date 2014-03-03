ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.levels.demo',
    'game.levels.minerva'
)
.defines(function(){

MyGame = ig.Game.extend({

    // Load a font
    font: new ig.Font( 'media/04b03.font.png' ),
    
    //over all progress through the game
    voyageCounter : 50,
    
    //the current time in the event
    eventTime : 0,

    //the primary victory condition of the event.
    eventVictory : false,
    
    //0 = no change, 1 = win, 2 = lose
    gameStatus: 0, 
    
    primarySystem: 'one',

    //this is the time allocated by the event
    timeAllocated : 50,
    
    //reward for suceeding in an event.
    reward : 50,
    
    //penalty for failing to complete an event.
    penalty : -50,


    init: function() {

        // Bind keys.
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.W, 'up');
        ig.input.bind(ig.KEY.S, 'down');
        ig.input.bind(ig.KEY.A, 'left');
        ig.input.bind(ig.KEY.D, 'right');
        ig.input.bind(ig.KEY.E, 'act');
        ig.input.bind(ig.KEY.SPACE, 'act');

        // Load level.
        this.loadLevel(LevelMinerva);
    },


    //this camera is fixed with the level centered
    draw: function() {
        this.parent();
        this.screen.x = 16; //MAGIC NUMBERS
        this.screen.y = 40; //AUUUUGH
        
        var player = this.getEntitiesByType( EntityPlayer )[0];
        
        //var mission = this.getEntitiesByType( EntityMission ) [0];
        
        this.font.draw( 'Has Fuel: ' + player.hasFuel + ' | Has Coolant: ' + player.hasCool
            + ' | Steps: ' + player.steps,
            6, 6, ig.Font.ALIGN.LEFT );

        if(player.hasMoved){
            console.log("player has moved");
            this.checkingEv(); //itterates event time, and such
            if(this.gameStatus == 1){
                console.log("YOU WIN THE GAME!!!! Voyage Counter: " + this.voyageCounter);
            }else if(this.gameStatus == 2){
                console.log("YOU LOSE THE GAME!!! GOOD DAY SIR! Voyage Counter: " + this.voyageCounter);
            }
            player.hasMoved = false;
        }
    },

    checkingEv : function() {
           
            var system = this.getEntityByName(this.primarySystem);
            
            if(this.eventTime > this.timeAllocated){
                var system = this.getEntityByName(this.primarySystem);
                
                //this checks the primary system of the event to see if it has been fueled.
                //this check should only happen once per event at the very end.
                if(system.isFueled){
                    this.eventVictory = true; //sets event victory to true
                    system.isFueled = false; //resets the system for next event
                }

                if(this.eventVictory){
                    console.log("Event Success! Reward: " + this.reward);
                    this.voyageCounter += this.reward;
                    console.log("Voyage Counter : " + this.voyageCounter);
                    if(this.voyageCounter > 100){
                        this.gameStatus = 1;
                    }
                }else{
                    console.log("Event Failure! Penalty: " + this.penalty);
                    this.voyageCounter += this.penalty;
                    console.log("Voyage Counter : " + this.voyageCounter);
                    if(this.voyageCounter <= 0){
                        this.gameStatus = 2;
                    }
                }
            }else{
                this.eventTime ++; 
                if(system.isHeating){
                    system.heat++;
                    console.log('heat increases to : ' + system.heat);
                }
            }
        }

    //this camera follows the player
    /*draw: function() {
        var player = this.getEntitiesByType( EntityPlayer )[0];
        if(player) {
            this.screen.x = player.pos.x - ig.system.width/2;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
        this.parent();
    }*/
});

ig.main( '#canvas', MyGame, 60, 288, 304, 3 );

});
