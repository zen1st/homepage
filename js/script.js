// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("navbar");
    
    var navbarLinks = document.querySelectorAll("#navbar a");
    var index = 0, length = navbarLinks.length;
	
    if(document.documentElement.clientWidth >= 769)
	{
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			navbar.classList.remove("w3-transparent");
			index = 0;
			for ( ; index < length; index++){
				navbarLinks[index].style.color = "black";
			}
			
		} else {
			navbar.classList.add("w3-transparent");
			index = 0;
			for ( ; index < length; index++){
				navbarLinks[index].style.color = "white";
			}
		}
	}
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}

function myMap()
{
  myCenter=new google.maps.LatLng(43.6532, -79.3832);
  var mapOptions= {
    center:myCenter,
    zoom:12, scrollwheel: true, draggable: true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}

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
		$("#navbar").addClass("w3-transparent");
		$("#navbar a").css("color","white");
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