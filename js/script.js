$(document).ready(function () {
    $('.show-description').on('click', function () {
        var th = this,
            sib = th.nextElementSibling;
        th.classList.toggle('act');
        if (sib.style.maxHeight) {
            sib.style.maxHeight = null;
        } else {
            sib.style.maxHeight = sib.scrollHeight + 'px';
        }
    });


});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("scrollToTop").style.display = "block";
    } else {
        document.getElementById("scrollToTop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $(document.documentElement).animate({scrollTop: 0}, 800);
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
}

$(document).scroll(function () {
    var scrollPos = $(document).scrollTop() + 100;
    // changing padding of nav a on scroll
    if (scrollPos > 250) {
        $('header nav').addClass('small-nav');
        $('header nav ul li a').addClass('small-link');
        $('header .logo-soc-wr img').addClass('small-logo');
    } else {
        $('header nav').removeClass('small-nav');
        $('header nav ul li a').removeClass('small-link');
        $('header .logo-soc-wr img').removeClass('small-logo');
    }
});

// Select all links with hashes
$('nav ul li.nav-item a[href*="#"], #first .hsContent a[href*="#eighth"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top -100
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

// JS
var video = document.querySelector('video')
    , container = document.querySelector('#first');

var setVideoDimensions = function () {
    // Video's intrinsic dimensions
    var w = video.videoWidth
        , h = video.videoHeight;

    // Intrinsic Ratio
    // Will be more than 1 if W > H and less if W < H
    var videoRatio = (w / h).toFixed(2);

    // Get the container's computed styles
    //
    // Also calculate the min dimensions required (this will be
    // the container dimentions)
    var containerStyles = window.getComputedStyle(container)
        , minW = parseInt( containerStyles.getPropertyValue('width') )
        , minH = parseInt( containerStyles.getPropertyValue('height') );

    // What's the min:intrinsic dimensions
    //
    // The idea is to get which of the container dimension
    // has a higher value when compared with the equivalents
    // of the video. Imagine a 1200x700 container and
    // 1000x500 video. Then in order to find the right balance
    // and do minimum scaling, we have to find the dimension
    // with higher ratio.
    //
    // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
    // scale 500 to 700 and then calculate what should be the
    // right width. If we scale 1000 to 1200 then the height
    // will become 600 proportionately.
    var widthRatio = minW / w
        , heightRatio = minH / h;

    // Whichever ratio is more, the scaling
    // has to be done over that dimension
    if (widthRatio > heightRatio) {
        var newWidth = minW;
        var newHeight = Math.ceil( newWidth / videoRatio );
    }
    else {
        var newHeight = minH;
        var newWidth = Math.ceil( newHeight * videoRatio );
    }

    video.style.width = newWidth + 'px';
    video.style.height = newHeight + 'px';
};

video.addEventListener('loadedmetadata', setVideoDimensions, false);
window.addEventListener('resize', setVideoDimensions, false);