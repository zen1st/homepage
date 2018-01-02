var navbar = document.getElementById("navbar");
var navbarLinks = document.querySelectorAll("#navbar a");
	
if(document.documentElement.scrollTop > 100){
	navbar.classList.remove("w3-transparent");
	for (var index = 0 ; index < navbarLinks.length; index++){
		navbarLinks[index].style.color = "black";
	}
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
	
    if(document.documentElement.clientWidth >= 769)
	{
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			navbar.classList.remove("w3-transparent");
			for (var index = 0 ; index < navbarLinks.length; index++){
				navbarLinks[index].style.color = "black";
			}
			
		} else {
			navbar.classList.add("w3-transparent");
			index = 0;
			for (var index = 0 ; index < navbarLinks.length; index++){
				navbarLinks[index].style.color = "white";
			}
		}
	}
}

window.sr = ScrollReveal({reset: true, distance: '200px'});
sr.reveal('.scrollRevealLeft', {origin: 'left'});
sr.reveal('.scrollRevealRight', {origin: 'right'});

window.addEventListener('load', () => {

	var carousels = document.querySelectorAll('.carousel');
	
    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});

function carousel(root) {
    var figure = root.querySelector('figure'),
        nav = root.querySelector('nav'),
        images = figure.children,
        n = images.length,
        gap = root.dataset.gap || 0,
        bfc = 'bfc' in root.dataset,
        theta =  2 * Math.PI / n,
        currImage = 0 ;
    
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener('resize', () => { 
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width)) 
    });

    setupNavigation();

    function setupCarousel(n, s) {
	
		var apothem = s / (2 * Math.tan(Math.PI / n));
        
        figure.style.transformOrigin = `50% 50% ${- apothem}px`;

        for (var i = 0; i < n; i++)
            images[i].style.padding = `${gap}px`;
        for (i = 1; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        if (bfc)
            for (i = 0; i < n; i++)
                 images[i].style.backfaceVisibility = 'hidden';
        
        rotateCarousel(currImage);
    }

    function setupNavigation() {
        nav.addEventListener('click', onClick, true);
        
        function onClick(e) {
            e.stopPropagation();
            
            var t = e.target;
            if (t.tagName.toUpperCase() != 'BUTTON')
                return;
            
            if (t.classList.contains('next')) {
                currImage++;
            }
            else {
                currImage--;
            }
            
            rotateCarousel(currImage);
        }
            
    }

    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
    
}

//Google map
var myCenter = new google.maps.LatLng(43.6532, -79.3832);

function initialize() {
var mapProp = {
  center: myCenter,
  zoom: 12,
  //scrollwheel: false,
  //draggable: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker = new google.maps.Marker({
  position: myCenter,
});

marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
//Google map end

$(document).ready(function() {

//console.log($(window).width());
//console.log(document.documentElement.clientWidth);

if($(window).width() < 769) {
	$("#home").removeClass('bgvid-1').addClass('bgimg-1');
}
else {
	$("#home").addClass('bgvid-1').removeClass('bgimg-1');
}

$(window).resize(function(){
	if($(window).width() < 769) {
		$("#home").removeClass('bgvid-1').addClass('bgimg-1');
		$("#navbar").removeClass("w3-transparent");
		$("#navbar a").css("color","black");
	}
	else {
		$("#home").addClass('bgvid-1').removeClass('bgimg-1');
		if(document.documentElement.scrollTop < 100)
		{
			$("#navbar").addClass("w3-transparent");
			$("#navbar a").css("color","white");
		}
	}
});

  // Add smooth scrolling on all links inside the navbar
  $(".navbar a, footer a[href='#home']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
  
	$(".navbar-toggle").on('click', function(event) {
		$("#navbar").removeClass("w3-transparent");
		$("#navbar a").css("color","black");
	});

    $(window).on('load scroll', function () {
        var scrolled = $(this).scrollTop();
        $('#title').css({
            'transform': 'translate3d(0, ' + -(scrolled * 0.2) + 'px, 0)', // parallax (20% scroll rate)
            'opacity': 1 - scrolled / 400 // fade out at 400px from top
        });
        $('#hero-vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
    });
    
    // video controls
    $('#state').on('click', function () {
        var video = $('#hero-vid').get(0);
        var icons = $('#state > span');
        //$('#overlay').toggleClass('fade');
        if (video.paused) {
            video.play();
            icons.removeClass('fa-play').addClass('fa-pause');
        } else {
            video.pause();
            icons.removeClass('fa-pause').addClass('fa-play');
        }
    });

});