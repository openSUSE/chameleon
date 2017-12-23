/**
 * Bootstrap Card Component MediaWiki Hack
 * 
 * @see /src/sass/bootstrap-mediawiki/_card.scss
 */

// Remove unwanted <p> tags
$('.card > p').each(function () {
    $(this).children().unwrap('p');
});

// Card image
$('.card > a:first-child > img, .card > img:first-child').addClass('card-img-top');
$('.card > a:last-child > img, .card > img:last-child').addClass('card-img-bottom');
