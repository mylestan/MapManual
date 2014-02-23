var PlaceView = Backbone.View.extend({

	// They're table rows
	tagName: 'tr',

	// Template for the list of places
	template: _.template("<td><%= description %><button id='list-item-close' type='button' class='close' aria-hidden='true'>&times;</button></td>"),

	// Events on the view
	events:{
		'click #list-item-close' : 'clear'
	},

	initialize: function(){
		// Model auto-passed

		// If the model is destroyed, we remove te view
		this.listenTo(this.model, 'remove', this.remove);

		this.render();
	},

	// Render the template and add them to the doc
	render: function(){
		this.$el.html(this.template({description: this.model.get('description')}));
		app.placeList.append(this.$el);

		return this;
	},


	// Destroy the model
	clear: function(){
		this.model.destroy();
	}
});
