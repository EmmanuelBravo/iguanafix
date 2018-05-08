
var Site = {
	gallery: [],
	
	related:{},

	selects: {},
	
	init: function () {
		this.loadSelects();
		this.loadRelated();
	},
	
	loadSelects: function () {
		var options = {};
		var that = this;
		$.ajax({
			url: 'https://private-70cb45-aobara.apiary-mock.com/product/list',
			type: 'GET',
			dataType: 'JSON'
		})
		.done(function(response) {
			that.selects = response;

			that.loadGallery(response[0].id);			
		})
		.fail(function() {
			console.log("error in get");
		})
		.always(function() {
			console.log("complete select");
		});
		
	},
	loadGallery: function (id) {
		var that = this;
		$.ajax({
			url: 'https://private-70cb45-aobara.apiary-mock.com/product/'+ id +'/photos',
			type: 'GET',
			dataType: 'JSON'
		})
		.done(function(response) {
			that.gallery.push(response);
			
		})
		.fail(function() {
			console.log("error in get");
		})
		.always(function() {
			console.log("complete gallery");
		});

		
	},
	loadRelated: function () {
		var that = this;
		$.ajax({
			url: 'https://private-70cb45-aobara.apiary-mock.com/related-product/list',
			type: 'GET',
			dataType: 'JSON'
		})
		.done(function(response) {
			that.related = response;
			
		})
		.fail(function() {
			console.log("error in get");
		})
		.always(function() {
			console.log("complete related");
		});
	}
};

jQuery(document).ready(function($) {
	Site.init();
	
});

