var PlaceCollection = Backbone.Collection.extend({

	// Override the reset function so that it triggers a remove event
	reset: function(models, options) {
		models  || (models = []);
		options || (options = {});

		for (var i = 0, l = this.models.length; i < l; i++) {
		  this._removeReference(this.models[i]);
		  // trigger the remove event for the model manually
		  this.models[i].trigger('remove', this.models[i], this);
		}

		this._reset();
		this.add(models, _.extend({silent: true}, options));
		if (!options.silent) this.trigger('reset', this, options);
		return this;
	},

	model: PlaceModel,

	initialize: function(){
		//listen for added models to the collection
		this.on('add', this.placeAdded, this);
	},

	// When a new model is added to the collection, we create a view for it
	placeAdded: function(place){
		var placeView = new PlaceView({model: place});
	},

	// Convert the collection to a csv and download it from the browser
	saveFile: function(){
		var csv = this.JSON2CSV(this.toJSON());
		window.open("data:text/csv;charset=utf-8," + escape(csv));
	},

	// JSON to CSV converter
	// http://jsfiddle.net/sturtevant/vUnF9/
	JSON2CSV: function(objArray) {
	    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

	    var str = '';
	    var line = '';

	    if ($("#labels").is(':checked')) {
	        var head = array[0];
	        if ($("#quote").is(':checked')) {
	            for (var index in array[0]) {
	                var value = index + "";
	                line += '"' + value.replace(/"/g, '""') + '",';
	            }
	        } else {
	            for (var index in array[0]) {
	                line += index + ',';
	            }
	        }

	        line = line.slice(0, -1);
	        str += line + '\r\n';
	    }

	    for (var i = 0; i < array.length; i++) {
	        var line = '';

	        if ($("#quote").is(':checked')) {
	            for (var index in array[i]) {
	                var value = array[i][index] + "";
	                line += '"' + value.replace(/"/g, '""') + '",';
	            }
	        } else {
	            for (var index in array[i]) {
	                line += array[i][index] + ',';
	            }
	        }

	        line = line.slice(0, -1);
	        str += line + '\r\n';
	    }
	    return str;
	}

});
