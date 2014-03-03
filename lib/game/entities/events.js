
ig.module( 'game.entities.events' )
.requires( 'impact.entity' )
.defines(function() {
	EntityEvents = ig.Entity.extend({
	timeAllocated : 10,
	reward : 50,
	penalty : -50,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		},

		

		update: function() {
			this.parent();
		}

	});
});