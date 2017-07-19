// component
export default class Carousel {
	constructor(id, rawopts) {
		/* Set Options
		/* ================================================================== */

		const opts = Object(rawopts);

		// set the options from Carousel defaults
		for (let key in Carousel.defaults) {
			this[key] = key in opts ? opts[key] : Carousel.defaults[key];
		}

		/* Initialize the Target Element
		/* ================================================================== */

		const $target = this.target = id instanceof Element ? id : document.querySelector(id);

		// set the prefix as the root class
		$target.classList.add(this.prefix);

		// set the prefix as the fallback id (needed for aria-labelledby)
		$target.id = $target.id || this.prefix;

		/* Initialize the Previous and Next Immediate Controls
		/* ================================================================== */

		const initImmediateControl = (variation, offset) => {
			const $control = this[variation + 'Control'] = document.createElement('button');

			$control.className = `${ this.prefix }-immediate-control ${ this.prefix }-${ variation }-control`;

			$control.addEventListener('click', () => {
				this.setSlideByIndex(this.currentIndex + offset);
			});

			// create label for immediate control
			$control.appendChild(
				document.createElement('span')
			).appendChild(
				document.createTextNode(`${ this.lang[variation] } ${ this.lang.slide }`)
			);
		};

		// create previous and next immediate controls
		initImmediateControl('previous', -1);
		initImmediateControl('next', 1);

		// prepend the previous control to the target
		$target.insertBefore(this.previousControl, $target.firstElementChild);

		// append the next control to the target
		$target.appendChild(this.nextControl);

		/* Initialize Pagination Controls
		/* ================================================================== */

		const $pagination = this.paginationControls = document.createElement('nav');

		$pagination.className = `${ this.prefix }-pagination-controls`;

		$pagination.setAttribute('role', 'navigation');
		$pagination.setAttribute('aria-labelledby', $target.id);

		// append the pagination controls to the target
		$target.appendChild($pagination);

		/* Initialize Slides
		/* ================================================================== */

		this.paginationControl = [];

		this.slides = [].map.call(
			// get slides from an array-like object or a selector string
			Object(this.slides) === this.slides && 'number' === typeof this.slides.length
				? this.slides
				: $target.querySelectorAll(this.slides),
			($slide, index) => {
				$slide.id = $slide.id || `${ this.prefix }-slide-${ index }`;

				$slide.classList.add(`${ this.prefix }-slide`);
				$slide.classList.add(`${ this.prefix }-slide-${ index }`);
				$slide.classList.add(`${ this.prefix }-inactive-slide`);

				$slide.setAttribute('aria-hidden', true);

				// create the pagination control for the slide
				const $control = this.paginationControl[index] = $pagination.appendChild(
					document.createElement('button')
				);

				$control.className = `${ this.prefix }-pagination-control ${ this.prefix }-inactive-control`;

				$control.addEventListener('click', () => {
					this.setSlideByIndex(index);
				});

				// create the label for pagination control for the slide
				$control.appendChild(
					document.createElement('span')
				).appendChild(
					document.createTextNode(`${ this.lang.slide } ${ index + 1 }`)
				);

				// return the slide and its pagination control
				return {
					target:   $slide,
					control:  $control
				};
			}
		);

		/* Manage Interactive States
		/* ================================================================== */

		this.isVisible = true;
		this.isMouseInteractive = false;
		this.isFocusInteractive = false;
		this.isInputInteractive = false;

		// manage interactive changes
		const oninteractivechange = (event) => {
			// update the visibility state
			const isVisibleNow = 'visibilitychange' === event.type ? 'visible' === $target.ownerDocument.visibilityState : this.isVisible;

			// update the input states
			const isMouseInteractiveNow = 'mouseenter' === event.type ? true : 'mouseleave' === event.type ? false : this.isMouseInteractive;
			const isFocusInteractiveNow =    'focusin' === event.type ? true :   'focusout' === event.type ? false : this.isFocusInteractive;

			// update the interactive state
			const isInputInteractiveNow = isMouseInteractiveNow || isFocusInteractiveNow;

			// if the visibility state has changed
			if (isVisibleNow !== this.isVisible) {
				// dispatch a change event when the document changes visibility
				this.isVisible = isVisibleNow;

				if (this.autoplay) {
					this[isVisibleNow ? 'play' : 'pause']();
				}

				this.dispatch(isVisibleNow ? 'visibilityvisible' : 'visibilityhidden', event.target);
				this.dispatch('visibilitychange', event.target);
			}

			// if the mouse state has changed
			if (isMouseInteractiveNow !== this.isMouseInteractive) {
				// dispatch a change event when a mouse is entering or leaving the carousel
				this.isMouseInteractive = isMouseInteractiveNow;

				this.dispatch(isMouseInteractiveNow ? 'mouseenter' : 'mouseleave', event.target);
				this.dispatch('mousechange', event.target);
			}

			// if the focus state has changed
			if (isFocusInteractiveNow !== this.isFocusInteractive) {
				// dispatch a change event when a keyboard is entering or leaving the carousel
				this.isFocusInteractive = isFocusInteractiveNow;

				if (this.autoplay) {
					this[isFocusInteractiveNow ? 'pause' : 'play']();
				}

				this.dispatch(isFocusInteractiveNow ? 'focusenter' : 'focusleave', event.target);
				this.dispatch('focuschange', event.target);
			}

			// if the interactive state has changed
			if (isInputInteractiveNow !== this.isInputInteractive) {
				// dispatch a change event when a mouse or keyboard is entering or leaving the carousel
				this.isInputInteractive = isInputInteractiveNow;

				this.dispatch(isInputInteractiveNow ? 'inputenter' : 'inputleave', event.target);
				this.dispatch('inputchange', event.target);
			}
		}

		// listen for visibility changes
		$target.ownerDocument.addEventListener('visibilitychange', oninteractivechange);

		// listen for input events
		$target.addEventListener('mouseenter', oninteractivechange);
		$target.addEventListener('mouseleave', oninteractivechange);
		$target.addEventListener('focusout',   onfocuschange);
		$target.addEventListener('focusin',    onfocuschange);

		// manage the focus event (using a slight delay)
		let focusTimeout;

		function onfocuschange() {
			clearTimeout(focusTimeout);

			focusTimeout = setTimeout(oninteractivechange, 0, event);
		}

		/* Initialize the Current Slide
		/* ================================================================== */

		const cachedIndex = this.currentIndex || 0;

		this.currentIndex = null;

		this.setSlideByIndex(cachedIndex);

		/* Dispatch the Loaded Event
		/* ================================================================== */

		this.dispatch('loaded', $target);

		/* Start Autoplay
		/* ================================================================== */

		if (this.autoplay) {
			this.play();
		}
	}

	/* Set Slide By Index
	/* ================================================================== */

	setSlideByIndex(index) {
		if (this.currentIndex !== index) {
			// set the length using the total number of slides
			const length   = this.slides.length;

			// set the old and new indexes and slides using a modulus
			const oldIndex = this.lastIndex = this.currentIndex;
			const newIndex = this.currentIndex = (length + index % length) % length;

			const oldSlide = this.slides[oldIndex];
			const newSlide = this.slides[newIndex];

			if (oldSlide) {
				// update the old slide
				oldSlide.target.classList.remove(`${ this.prefix }-active-slide`);
				oldSlide.target.classList.add(`${ this.prefix }-inactive-slide`);
				oldSlide.target.setAttribute('aria-hidden', true);

				// update the old slide control
				oldSlide.control.classList.remove(`${ this.prefix }-active-control`);
				oldSlide.control.classList.add(`${ this.prefix }-inactive-control`);
				oldSlide.control.removeAttribute('aria-current');
				oldSlide.control.removeAttribute('aria-controls');

				// dispatch the slideleave event from the old slide target
				this.dispatch('slideleave', oldSlide.target);
			}

			// update the new slide
			newSlide.target.classList.add(`${ this.prefix }-active-slide`);
			newSlide.target.classList.remove(`${ this.prefix }-inactive-slide`);
			newSlide.target.removeAttribute('aria-hidden');

			// update the new slide control
			newSlide.control.classList.add(`${ this.prefix }-active-control`);
			newSlide.control.classList.remove(`${ this.prefix }-inactive-control`);
			newSlide.control.setAttribute('aria-current', true);
			newSlide.control.setAttribute('aria-controls', newSlide.target.id);

			// dispatch slideenter and slidechange events from the new slide target
			this.dispatch('slideenter', newSlide.target);
			this.dispatch('slidechange', newSlide.target);
		}
	}

	/* Dispatch a Prefixed Custom Event bound to the instance
	/* ================================================================== */

	dispatch(type, target) {
		const event = document.createEvent('CustomEvent');

		event.initCustomEvent(`${ this.prefix }:${ type }`, true, false, this);

		target.dispatchEvent(event);
	}

	/* Start automatic Slide progression (using Durations)
	/* ================================================================== */

	play() {
		const onplay = () => {
			const duration = this.slides[this.currentIndex].duration || this.duration;

			this._interval = setTimeout(
				() => {
					this.setSlideByIndex(this.currentIndex + 1);

					if (this._interval) {
						this._interval = clearTimeout(this._interval);

						onplay();
					}
				},
				duration
			);
		};

		if (!this._interval) {
			onplay();

			this.dispatch('play', this.target);
			this.dispatch('playpause', this.target);
		}
	}

	/* Pause automatic Slide progression
	/* ================================================================== */

	pause() {
		if (this._interval) {
			this._interval = clearTimeout(this._interval);

			this.dispatch('pause', this.target);
			this.dispatch('playpause', this.target);
		}
	}
}

// default options
Carousel.defaults = {
	prefix: 'carousel',
	slides: 'li',
	currentIndex: 0,
	duration: 8000,
	autoplay: false,
	lang: {
		next: 'Next',
		previous: 'Previous',
		slide: 'Slide'
	}
};
