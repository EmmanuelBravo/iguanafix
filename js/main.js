
var Site = {
	gallery: {},
	
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
			that.buildSelects();	
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
			that.gallery = response;
			that.buildGallery()
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
	},
	
	buildSelects: function () {
		$.each(this.selects, function(index, val) {
			var temp = "<option value='"+ val.id +"'>"+ val.description +"</option>";
			$(".fgSelector").append(temp);
		});	
			
	},
	
	buildGallery: function () {
		$.each(this.gallery, function(index, val) {
			var temp = "<a href='"+val.id+"'><img src='"+val.url+"' alt=''></a>";
			$(".miniatures").append(temp);
		});	

		var bigImg = "<a href='"+this.gallery[0].id+"'><img src='"+this.gallery[0].url+"' alt=''></a>";
		$(".mainPic").append(bigImg);
	},
	
	buildRelated: function () {

	}
};

jQuery(document).ready(function($) {
	Site.init();
	
});

