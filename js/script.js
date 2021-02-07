$(window).resize(function (event) {
   adaptive_function();
});
function adaptive_header(w, h) {
   var headerMenu = $('.header-menu');    //переменные
   var headerLang = $('.language');
   if (w < 769) {
      if (!headerLang.hasClass('done')) {
         headerLang.addClass('done').appendTo(headerMenu);
      }
   } else {
      if (headerLang.hasClass('done')) {
         headerLang.removeClass('done').prependTo($('.header-top'));
      }
   }
   if (w < 769) {
      if (!$('.header-bottom-menu').hasClass('done')) {
         $('.header-bottom-menu').addClass('done').appendTo(headerMenu);
      }
   } else {
      $.each($('.header-bottom-menu'), function (index, val) {
         if ($(this).hasClass('header-bottom-menu-right')) {
            if ($(this).hasClass('done')) {
               $(this).removeClass('done').prependTo($('.header-bottom-column').eq(2));
            }
         } else {
            if ($(this).hasClass('done')) {
               $(this).removeClass('done').prependTo($('.header-bottom-column').eq(0));
            }
         }
      });
   }
}

function adaptive_function() {
      var w = $(window).outerWidth();
      var h = $(window).outerHeight();
   adaptive_header(w, h);
}
adaptive_function();

$('.header-menu-icon').click(function(event) {
   $(this).toggleClass('active');
   $('.header-menu').toggleClass('active');
   if ($(this).hasClass('active')) {
      $('body').data('scroll', $(window).scrollTop());
   }
      $('body').toggleClass('lock');
   if (!$(this).hasClass('active')) {
      $('body,html').scrollTop(parseInt($('body').data('scroll')));
   }  
});

function ibg() {
   $.each($('.ibg'), function (index, val) {
      if ($(this).find('img').length > 0) {
         $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
      }
   });
}
ibg();

function map(n){
   google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
      var map = this;
      var ov = new google.maps.OverlayView();
      ov.onAdd = function () {
         var proj = this.getProjection();
         var aPoint = proj.fromLatLngToContainerPixel(latlng);
         aPoint.x = aPoint.x + offsetX;
         aPoint.y = aPoint.y + offsetY;
         map.panTo(proj.fromContainerPixelToLatLng(aPoint));
      }
      ov.draw = function () {};
      ov.setMap(this);
   };
   var markers = new Array();
   var infowindow = new google.maps.InfoWindow({
   });
   var locations = [
      [new google.maps.LatLng(53.819055,27.8813694)]
   ]
   var options = {
      zoom: 10,
      panControl: false,
      center: locations[0][0],
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(document.getElementById('map'), options);
   var icon = {
      url: 'img/map.png',
      scaledSize: new google.maps.Size(18, 20),
      anchor: new google.maps.Point(9, 10)
   }
   for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
         position: locations[i][0],
         map: map,
      });
      markers.push(marker);
   }
}
if ($("#map").length > 0) {
   map();
}
//================================================================================================
// //FORMS
// function forms(){
// 	$('input[data-value], textarea[data-value]').each(function() {
// 		if (this.value == '' || this.value == $(this).attr('data-value')) {
// 			this.value = $(this).attr('data-value');
// 			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
// 				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
// 			}
// 		}
// 		if(this.value!=$(this).attr('data-value') && this.value!=''){
// 			$(this).addClass('focus');
// 			$(this).parent().addClass('focus');
// 			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
// 				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
// 			}
// 		}

// 		$(this).click(function() {
// 			if (this.value == $(this).attr('data-value')) {
// 				if($(this).attr('data-type')=='pass'){
// 					$(this).attr('type','password');
// 				};
// 				this.value = '';
// 			};
// 		});
// 		$(this).blur(function() {
// 			if (this.value == '') {
// 				this.value = $(this).attr('data-value');
// 					$(this).removeClass('focus');
// 					$(this).parent().removeClass('focus');
// 				if($(this).attr('data-type')=='pass'){
// 					$(this).attr('type','text');
// 				};
// 			};
// 		});
// 	});
// }
// forms();

// //=====================================================================================
// $('form button[type=submit]').click(function(){
// 		var er=0;
// 		var form=$(this).parents('form');
// 		var ms=form.data('ms');
// 	$.each(form.find('.req'), function(index, val) {
// 		er+=formValidate($(this));
// 	});
// 	if(er==0){
// 		removeFormError(form);
// 		if(ms!=null && ms!=''){
// 			showMessageByClass(ms);
// 			return false;
// 		}
// 	}else{
// 		return false;
// 	}
// });

// //=====================================================================================
// function formValidate(input){
// 		var er=0;
// 		var form=input.parents('form');
// 	if(input.attr('name')=='email' || input.hasClass('email')){
// 		if(input.val()!=input.attr('data-value')){
// 			var em=input.val().replace(" ","");
// 			input.val(em);
// 		}
// 		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val()==input.attr('data-value')){
// 				er++;
// 			addError(input);
// 		}else{
// 			removeError(input);
// 		}
// 	}else{
// 		if(input.val()=='' || input.val()==input.attr('data-value')){
// 			er++;
// 			addError(input);
// 		}else{
// 			removeError(input);
// 		}
// 	}
// 	if(input.attr('type')=='checkbox'){
// 		if(input.prop('checked') == true){
// 			input.removeClass('err').parent().removeClass('err');
// 		}else{
// 			er++;
// 			input.addClass('err').parent().addClass('err');
// 		}
// 	}
// 	if(input.hasClass('name')){
// 		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
// 				er++;
// 			addError(input);
// 		}
// 	}
// 	if(input.hasClass('pass-2')){
// 		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
// 			addError(input);
// 		}else{
// 			removeError(input);
// 		}
// 	}
// 		return er;
// }





// //======================================================================================
// function addError(input){
// 		input.addClass('err');
// 		input.parent().addClass('err');
// 		input.parent().find('.form__error').remove();
// 	if(input.hasClass('email')){
// 			var error='';
// 		if(input.val()=='' || input.val()==input.attr('data-value')){
// 			error=input.data('error');
// 		}else{
// 			error=input.data('error');
// 		}
// 		if(error!=null){
// 			input.parent().append('<div class="form__error">'+error+'</div>');
// 		}
// 	}else{
// 		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
// 			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
// 		}
// 	}
// 	if(input.parents('.select-block').length>0){
// 		input.parents('.select-block').parent().addClass('err');
// 		input.parents('.select-block').find('.select').addClass('err');
// 	}
// }





	



