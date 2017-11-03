# ToC-Drawer

Simple, togglable, flexible table of contents widget. ToC-Drawer is extremely lightweight; its only dependency is [Font Awesome][font-awesome] and the driver JS file *unminified* is only 4K.

## Usage

Include [`toc.css`][css-raw] and [`toc.js`][js-raw] in your HTML file. In another script, create your `ToC` and append it to the page by its handle:

```
var toc = new ToC();
document.body.appendChild(toc.handle);
```

Your `ToC` will scan all containers labeled with the `toc-article` class for titles to populate the listing. By default, it will simply find all the `h2`s within the container, but you can configure it to allow any element's `textContent` to become a title. Simple pass your custom selector to the `ToC` constructor. For example, you can select all `h1`s that have the class `my-toc-header`:

```
var toc = new ToC({title_selector: 'h1.my-toc-header'});
document.body.appendChild(toc.handle);
```

## Configuration

The `ToC` constructor accepts up to one argument, a configuration object. Below are all the configuration options and their default values:

```
{
    // Determines if the drawer should start open or closed. Must be TOC_STATES.hidden or TOC_STATES.shown
    start_state: TOC_STATES.shown,

    // Position of the widget along the left edge of the page. Must be TOC_POSITIONS.top or TOC_POSITIONS.bottom
    position: TOC_POSITIONS.bottom,

    // Text to disaply above the listing. If blank, none will be displayed
    header: 'Table of Contents',

    // CSS selector for which children of `.toc-article's should yield a header
    title_selector: 'h2',

    // Whether to use ordered or unordered lists in the widget
    ordered: false,
}
```

## Suggested Polyfills

The most modern features ToC-Drawer uses are [promises][promise] and the [`Object.assign`][assign] method. I suggest using Modernizr's [polyfill library][modernizr], where you can find many polyfills, including one for [promises][promise-poly] and [`Object.assign`][assign-poly].

## Future Plans

In the future, I plan to provide more configuration options, particularly for styling. For the time being, the "style API" can be pretty well approximated by the provided CSS file (i.e. you can customize your widget by overriding the rules found in `toc.css`). For instance, to lighten the border color:

```
.toc-main { border-color: rgb(221, 221, 221) }
.toc-tab { border-color: rgb(221, 221, 221) }
```

## License

It's an MIT license (see `LICENSE`) so you can pretty much do whatever you want with this. That said a little attribution never hurt anyone ;)

[font-awesome]: http://fontawesome.io/get-started/
[css-raw]: https://raw.githubusercontent.com/wbadart/ToC-Drawer/master/toc.css
[js-raw]: https://raw.githubusercontent.com/wbadart/ToC-Drawer/master/toc.js

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[assign]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[modernizr]: https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills
[promise-poly]: https://github.com/stefanpenner/es6-promise
[assign-poly]: https://github.com/msn0/object-assign-mdn
