var AppView = Backbone.View.extend({

	el: $('#app'),

	// Events for main app buttons
	events: {
		'click #btn-create' : 'newPlace',
		'click #btn-save' : 'saveList',
		'click #btn-clear' : 'clearList'
	},

	initialize: function(){
		// Create the models and collections
		this.places = new PlaceCollection();

		// Create references
		this.lngInput = $('#input-lat');
		this.latInput = $('#input-lng');
		this.descriptionInput = $('#input-description');
		this.inputButton = $('#btn-create');
		this.placeList = $('#place-list');

		// Create the map
		var mapOptions = {
			// It's focused on waterloo
			center: new google.maps.LatLng(43.47076747496938, -80.54476261138916),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        this.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        // Add listeners
        google.maps.event.addListener(this.map, 'click', function(e){
        	app.mapClicked(e);
        });

	},

	// When the map is clicked, the lag and lng data is auto-filled
	mapClicked: function(e){
		this.latInput.val(String(e.latLng.d));
		this.lngInput.val(String(e.latLng.e));
	},

	// create a new place model when the item
	newPlace: function(e){
		console.log('new!');
		this.places.add({
			'latitude': this.latInput.val(),
			'longitude': this.lngInput.val(),
			'description': this.descriptionInput.val()
		})
		this.latInput.val('');
		this.lngInput.val('');
		this.descriptionInput.val('');
	},

	// triggers the collection to save
	saveList: function(){
		this.places.saveFile();
	},

	// triggers the collection to clear
	clearList: function(){
		app.places.reset();
	}
});
