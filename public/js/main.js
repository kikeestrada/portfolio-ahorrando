(function($){
	var APP = {
		init: function(){
			this.initializeMenu();
		},

		home: function(){

			$('#materiales-tabs a').on('click',function (e) {
			  e.preventDefault();
			  $(this).tab('show');
			});

			$('.panel-heading').on('click', function(){
				setTimeout(function(){
					var panel = $(this).next('.panel-collapse');

					$('.panel-heading').removeClass('open');

					if($(panel).hasClass('in')){
						$(this).addClass('open');
					}
				}.bind(this), 500);
			});

			this.initializeMasonry();
			this.setFlagsBg();
			this.initializeSliders('home');
		},

		trabajoConEscuelas: function(){
			var isOpen = false;
			$('.item').on('click', function(){
				if(!isOpen){
					$('.item').each(function(i, e){
						$(e).css({top: (i*40) + 'px'});
					});
					$('.dropdown-wrapper').addClass('open');
					isOpen = true;
				}else{
					$('.item').removeClass('selected');
					$(this).addClass('selected');
					$('.item').each(function(i, e){
						$(e).css({top: 0});
					});
					$('.dropdown-wrapper').removeClass('open');
					isOpen = false;
				}
			});

			this.initializeSliders('trabajoConEscuelas');
		},

		escuelasRegistradas: function(){
			this.initializeSliders('escuelasRegistradas');
			this.initializeMapbox();
			this.searchCountries();
		},

		initializeMapbox: function(){
			L.mapbox.accessToken = 'pk.eyJ1IjoiemVyY2hhbiIsImEiOiJjaWd2N3pncnUwazBid3ltMDNtOWg5OTZqIn0.-PfXAXLqLhnM6DmZoO-6tQ';
			
			var map = L.mapbox.map('map', 'mapbox.streets', {zoomControl: false}).setView([16, -91], 6);
			var iSize = [40, 80];
			var mapMarkerPN = L.divIcon({className: 'map-marker-pn',iconSize: iSize});
			var mapMarkerCR = L.divIcon({className: 'map-marker-cr',iconSize: iSize});
			var mapMarkerNI = L.divIcon({className: 'map-marker-ni',iconSize: iSize});
			var mapMarkerHO = L.divIcon({className: 'map-marker-ho',iconSize: iSize});
			var mapMarkerES = L.divIcon({className: 'map-marker-es',iconSize: iSize});
			var mapMarkerGU = L.divIcon({className: 'map-marker-gu',iconSize: iSize});
			var mapMarkerBE = L.divIcon({className: 'map-marker-be',iconSize: iSize});
			var mapMarkerMX = L.divIcon({className: 'map-marker-mx',iconSize: iSize});

			//map.dragging.disable();
			map.touchZoom.disable();
			map.doubleClickZoom.disable();
			map.scrollWheelZoom.disable();

			// Disable tap handler, if present.
			//if (map.tap) map.tap.disable();

			L.marker([9.10, -81.5], {icon: mapMarkerPN}).addTo(map);//Panama
			L.marker([10.50, -83.40], {icon: mapMarkerCR}).addTo(map);//Costa Rica
			L.marker([12.85, -84.55], {icon: mapMarkerNI}).addTo(map);//Nicaragua
			L.marker([15.03, -86.30], {icon: mapMarkerHO}).addTo(map);//Honduras
			L.marker([14.50, -88.61], {icon: mapMarkerES}).addTo(map);//El Salvador
			L.marker([15.67, -90.50], {icon: mapMarkerGU}).addTo(map);//Guatemala
			L.marker([17.58, -88.60], {icon: mapMarkerBE}).addTo(map);//Bélice
			L.marker([21.10, -101.30], {icon: mapMarkerMX}).addTo(map);//México

			enquire.register("screen and (max-width:992px)", {
				match: function(){
					map.setZoom(5);
				},
				unmatch: function(){
					map.setZoom(6);
				}
			});
		},

		searchCountries: function(){
			$('.countries li').on('click', function(){
				$(this).toggleClass('selected');
			});
		},

		initializeMenu: function(){
			$('.sidr-toggle').sidr({
				displace: false
			});

			$('.menu-title a').on('click', function(e){ 
				var subMenu = $(this).next('.sub-menu');

				if(subMenu && subMenu.hasClass('sub-menu')){
					e.preventDefault();
					$(subMenu).toggleClass('open');
				}else{
					$('#side-menu').toggleClass('open');
				}

				$('.sub-menu').each(function(index, el){
					if(!subMenu.is(el)){
						$(el).removeClass('open');
					}
				});
			});
		},

		initializeSliders: function(section){

			if(section === 'home'){

				$('.slider-wrapper').slick({
					dots: true,
					arrows: false,
					autoplay: true,
					fade: true,
					pauseOnHover: true,
					customPaging : function(slider, i) {
				        return '<a class="slide-dot"></a>';
				    }
				});

				$('.accordion-container .slider').slick({
					dots: true,
					arrows: false,
					autoplay: true,
					pauseOnHover: true,
					customPaging : function(slider, i) {
				        return '<a class="slide-dot"></a>';
				    }
				});

				$('.slider-aprende').slick({
					dots: true,
					arrows: false,
					autoplay: true,
					pauseOnHover: true,
					slidesToShow: 2,
					slidesToScroll: 2,
					customPaging : function(slider, i) {
				        return '<a class="slide-dot"></a>';
				 	},
				    responsive: [
						{
					      breakpoint: 480,
					      settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1,
					      }
					    }
					]
				});

				$('.flags-slider').slick({
					dots: false,
					arrows: true,
					autoplay: true,
					pauseOnHover: true,
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 4,

					responsive: [
						{
					      breakpoint: 480,
					      settings: {
					        slidesToShow: 2,
					        slidesToScroll: 2
					      }
					    }
					]
				});		
			}
			else if(section === 'trabajoConEscuelas'){

				var ongSliderSettings = {
					dots: true,
					arrows: false,
					autoplay: true,
					pauseOnHover: true,
					infinite: true,
					slidesToShow: 6,
					slidesToScroll: 6,
					customPaging : function(slider, i) {
				        return '<a class="slide-dot"></a>';
				 	},
					responsive: [
						{
					      breakpoint: 992,
					      settings: {
					        slidesToShow: 4,
					        slidesToScroll: 4
					      }
					    },{
					      breakpoint: 700,
					      settings: {
					        slidesToShow: 3,
					        slidesToScroll: 3
					      }
					    },{
					      breakpoint: 550,
					      settings: {
					        slidesToShow: 2,
					        slidesToScroll: 2
					      }
					    }
					]
				}

				$('.ongs-slider').slick(ongSliderSettings);

				enquire.register("screen and (max-width:992px)", {
					match : function() {
						$('.slide-participantes').slick({
							dots: true,
							arrows: false,
							autoplay: true,
							pauseOnHover: true,
							infinite: true,
							slidesToShow: 2,
							slidesToScroll: 2,
							customPaging : function(slider, i) {
						        return '<a class="slide-dot"></a>';
						 	},
							responsive: [
								{
							      breakpoint: 480,
							      settings: {
							        slidesToShow: 1,
							        slidesToScroll: 1
							      }
							    }
							]
						});
					},

					unmatch: function(){
						$('.slide-participantes').slick('unslick');
						$('.ongs-slider').slick('unslick');
						setTimeout(function(){
							$('.ongs-slider').slick(ongSliderSettings);
						}, 200);
					}
				});
			}else if(section === 'escuelasRegistradas'){
				$('.slider-testimonios').slick({
					dots: true,
					arrows: false,
					autoplay: true,
					fade: true,
					pauseOnHover: true,
					customPaging : function(slider, i) {
				        return '<a class="slide-dot"></a>';
				    }
				});
			}
		},

		initializeMasonry: function(){
			var gItem = $('.item');
			gItem.each(function() {
				var bgImage = $(this).data('bgimage');
				$(this).css('background-image', 'url('+bgImage+')');
			});
			
			$('.grid').masonry({
			  itemSelector: '.grid-item',
			  columnWidth: 236,
			  gutter: 18,
			  isFitWidth: true
			});
		},

		initializeInstafeed: function(){
		    var feed = new Instafeed({
		        get: 'user',
		        clientId:'89bec7e1824f4d60b3a68cd8a3f0a7d1',
		        userId: '1272179543',
		        limit: 6,
		        template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
		    });
		    feed.run();
		},

		setFlagsBg: function(){
			$('.flag-stat .desc-container').each(function(){
				$(this).css({
					'background-image': 'url('+$(this).data('flagBg')+')'
				});
			});
		}
	}

	APP.init();

	if($('body').hasClass('home')){
		APP.home();
	}else if($('body').hasClass('trabajoConEscuelas')){
		APP.trabajoConEscuelas();
	}else if($('body').hasClass('escuelasRegistradas')){
		APP.escuelasRegistradas();
	}
})(jQuery);