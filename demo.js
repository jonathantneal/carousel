/* global Carousel */

document.addEventListener('DOMContentLoaded', function () {
	// if the Carousel class is available
	if ('function' === typeof Carousel) {
		// create a Carousel from the 'ul' element
		var carousel = new Carousel('ul', {
			prefix: 'gallery',
			slides: 'li'
		});

		// log the Carousel instance
		console.log(carousel);
	}
});
