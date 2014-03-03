ig.module( 'game.entities.mission' )
.requires( 'impact.entity' )
.defines(function() {
	EntityMission = ig.Entity.extend({
	
	//over all progress through the game
	voyageCounter : 50,
    
    //the current time in the event
    eventTime : 0,
    
    //if the voyage counter = 100
    gameVictory: false,	
    
    //if the voyage counter = 0
	gameFailure: false,

	timeAllocated : 100,
	
	reward : 50,
	
	penalty : -50,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

		
		},

		
		//event rewards/penalties are checked here. 
		update: function() {
			this.parent();
			//checkingEv();
			
			
		},
/*
		checkingEv : function() {
			this.parent;

			if(eventTime > timeAllocated){
				if(events.sucess){
					console.log("Sucess!");
					voyageCounter += reward;
					if(voyageCounter > 100){
						gameVictory = true;
					}
				}else{
					console.log("Failure!");
					voyageCounter += penalty;
					if(voyageCounter <= 0){
						gameFailure = true;
					}
				}
			}else{
				console.log("Continue the Mission... " + eventTimer + " / " + events.timeAllocated);
				eventTime ++; 
			}
		},
*/
	});
});