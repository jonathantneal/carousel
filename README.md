# Carousel

[Carousel] is a tiny, highly accessible, easily customizable carousel.

```sh
npm install jonathantneal/carousel --save
```

## Usage

Import and create a new carousel.

```js
// import the Carousel class
import Carousel from 'carousel';

// create a new Carousel
const carousel = new Carousel('#carousel');
```

[Carousel] is easily controlled with a pointer or keyboard, and all of its
controls are properly wired with ARIA.

[Carousel] gives you total control over integration. You have the ability
to override the CSS classname prefixed to all of its elements using the
`prefix` option. You can override the names of its controls using the `lang`
option. You can set the target element directly or with a selector. You can set
the slides with a selector or an array-like object. You can decide which slide
is current, whether slides autoplay, and how long each slide plays for.

```js
new Carousel(
  document.querySelector('#carousel'),
  {
    prefix: 'my-carousel',
    lang: {
      next: 'Next',         // Used for “Next Slide”
      previous: 'Previous', // Used for "Previous Slide”
      slide: 'Slide'        // Used for "Slide 1, "Slide 2", “Next Slide”, etc.
    },
    slides: ':scope > li',
    currentIndex: 3,
    autoplay: true,
    duration: 9000
  }
);
```

## Demos

- [A Standard Experience](https://jonathantneal.github.io/carousel/)

---

[Carousel] compiles as 1.65 kB of JS (gzipped).

[Carousel]: https://github.com/jonathantneal/carousel
