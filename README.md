# ToC-Drawer

Simple, togglable, flexible table of contents widget. ToC-Drawer is extremely lightweight; it has no dependencies and the driver JS file *unminified* is only 4K.

## Usage

Include [`toc.css`][css-raw] and [`toc.js`][js-raw] in your HTML file. In another script, create your `ToC` and append it to the page by its handle:

```
var toc = new ToC();
document.body.appendChild(toc.handle);
```

Your `ToC` will scan all containers labeled with the `toc-article` class for titles to populate the listing. By default, it will simply find all the `h2`s within the container, but you can configure it to allow any element's `textContent` to become a title. Simple pass your custom predicate to the `ToC` constructor. For example, you can select all `h1`s that have the class `my-toc-header`:

```
function header_test(e) {
    return e.tagName === 'H1' && e.classList.contains('my-toc-header');
}

var toc = new ToC({title_predicate: header_test});
document.body.appendChild(toc.handle);
```

## Configuration

The `ToC` constructor accepts up to one argument, a configuration object. Below are all the configuration options and their default values:

```
{
    // Function to test if an element should be included in the header listing
    title_predicate: function(e) { return e.tagName === 'H2' },

    // Text to disaply above the listing. If blank, none will be displayed
    header: 'Table of Contents',

    // Determines if the drawer should start open or closed. Must be TOC_STATES.hidden or TOC_STATES.shown
    start_state: TOC_STATES.shown,
}
```

## Future Plans

In the future, I plan to provide more configuration options, particularly for styling. For the time being, the "style API" can be pretty well approximated by the provided CSS file (i.e. you can customize your widget by overriding the rules found in `toc.css`).

## License

It's an MIT license (see `LICENSE`) so you can pretty much do whatever you want with this. That said a little attribution never hurt anyone ;)

[css-raw]: https://raw.githubusercontent.com/wbadart/ToC-Drawer/master/toc.css
[js-raw]: https://raw.githubusercontent.com/wbadart/ToC-Drawer/master/toc.js
