// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	
  if(mCurrentIndex >= mImages.length)
  {
    mCurrentIndex = 0;
  }

  if(mCurrentIndex < 0) {
    mCurrentIndex = mImages.length-1;
  }

	var slideShow = document.getElementbyId("slideShow");
	var imgElement = slideShow.querySelector('img');
	imgElement.src = mImages[mCurrentIndex];
	console.log('swap photo');

	
  mLastFrameTime = 0;
  mCurrentIndex +=1;
  
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = images.JSON;


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function galleryImage(location, description, date, URL) {
	var location;
	var description;
	var date;
	var img;
}

function fetchJSON(){
	mRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Typical action to be performed when the document is ready:
		  mJson = JSON.parse(mRequest.responseText);
		 jsonData.forEach(function (item) {
            var galleryImage = new GalleryImage(item.location, item.description, item.date, item.img);
            mImages.push(galleryImage);
		}
	};
	mRequest.open("GET", mUrl, true);
	mRequest.send();
}
	// Click handler for moreIndicator
$('.moreIndicator').click(function () {
    // Toggle rotation class
    if ($(this).hasClass('rot90')) {
        $(this).addClass('rot270').removeClass('rot90');
    } else {
        $(this).addClass('rot90').removeClass('rot270');
    }

    // Slide down/up div.details
    $('#details').fadeToggle();
});

// Hover handlers for nextPhoto and prevPhoto
$('#nextPhoto, #prevPhoto').hover(function () {
    $(this).css('opacity', '0.8');
}, function () {
    $(this).css('opacity', '1');
});

// Click handlers for next and previous photos
$('#nextPhoto').click(function () {
    // Implement logic to go to the next photo
    mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
    swapPhoto();
});

$('#prevPhoto').click(function () {
    // Implement logic to go to the previous photo
    mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
    swapPhoto();
});
