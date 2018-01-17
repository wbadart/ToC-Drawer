/**
 * toc.js
 *
 * Driver for the Table of Contents widget.
 *
 * Will Badart <wbadart@live.com>
 * created: OCT 2017
 **/

var TOC_STATES = {shown: 0, hidden: 1}
  , TOC_POSITIONS = {top: 'top', bottom: 'bottom'};


function ToC(usr_config) {

    //==========================
    // Apply user configuration
    //==========================

    var config = Object.assign({
        // Default settings
        header:         'Table of Contents',
        link_top:       false,
        margin:         '2em',
        ordered:        false,
        position:       TOC_POSITIONS.bottom,
        start_state:    TOC_STATES.shown,
        title_selector: 'h2',
        hack:           undefined,
    }, usr_config);


    //====================
    // Create DOM outline
    //====================

    this.handle =
    this.container = document.createElement('aside');
    this.main      = document.createElement('div');
    this.title     = document.createElement('h6');
    this.listings  = document.createElement('div');
    this.tab       = document.createElement('div');
    this.icon      = document.createElement('i');

    this.toplink   = document.createElement('p');
    this.toplink_t = document.createElement('span');
    this.toplink_i = document.createElement('i');

    this.container.appendChild(this.main);
    this.container.appendChild(this.tab);
    if(config.header)
        this.main.appendChild(this.title);
    this.main.appendChild(this.listings);
    if(config.link_top)
        this.main.appendChild(this.toplink);
    this.toplink.appendChild(this.toplink_t);
    this.toplink_t.appendChild(this.toplink_i);
    this.tab.appendChild(this.icon);


    //==============================
    // Apply classes, populate text
    //==============================

    this.container.classList.add('toc-box');
    this.main.classList.add('toc-main');
    this.tab.classList.add('toc-tab');
    this.icon.classList.add('fa', 'fa-list');
    this.title.textContent = config.header;

    this.toplink.classList.add('toc-top');
    this.toplink.onclick = scrollToTop.bind(null, 100);

    this.toplink_t.classList.add('toc-link');
    this.toplink_i.classList.add('fa', 'fa-arrow-up');
    this.toplink_t.appendChild(document.createTextNode('Top'));


    //=========================================
    // Scan articles for headers, populate ToC
    //=========================================

    var text_getter = get('textContent');
    this.articles = Array.from(
        document.getElementsByClassName('toc-article'));

    // Wrap in promise so main.clientWidth is accurate (will
    // be 0 if read before listing populated)
    var render = Promise.all(
        this.articles.map(gen_listing.bind(this)));


    //======================================
    // Some initial config, computed styles
    //======================================

    this.state = config.start_state;
    this.tab.onclick = toggle.bind(this);

    this.container.style[config.position] = config.margin;
    this.main.style.borderRadius = gen_borders(config.position);
    this.tab.style[config.position] = '0';


    //============================
    // Hack to clear fixed navbar
    //============================

    if(config.hack && config.position === TOC_POSITIONS.top) {
        var navbar = document.querySelector(config.hack);
        this.container.style.top = navbar.clientHeight + 20 + 'px';
        console.log(this.container.style.top);
    }


    //============================
    // Post-render initialization
    //============================

    render.then((function() {
        this.container.style.left = get_css_left(
            this.state, this.main.clientWidth)
    }).bind(this));


    //==================
    // Helper functions
    //==================

    function gen_listing(article, i, articles) {
        // Scan page for headers and append to toc ul
        return new Promise((function(resolve, reject) {
            var this_class = 'toc-article' + i;
            article.classList.add(this_class);
            Array.from(document.querySelectorAll(
                    '.' + this_class + ' '
                        + config.title_selector))
                .map(add_ids.bind(null, text_getter))
                .map(text_getter)
                .map(li)
                .reduce(tolist, [document.createElement(
                    config.ordered ? 'ol' : 'ul')])
                .concat(!last(i, articles)
                    ? [document.createElement('hr')]
                    : [])
                .forEach(
                    this.listings.appendChild.bind(this.listings));
            resolve();
        }).bind(this));
    }

    function toggle() {
        // Switch this.state and move widget
        this.state = this.state === TOC_STATES.shown
            ? TOC_STATES.hidden
            : TOC_STATES.shown;
        this.container.style.left = get_css_left(
            this.state, this.main.clientWidth);
    }

    function get_css_left(state, box_width) {
        // Compute left position of widget based on state
        return (state == TOC_STATES.shown
            ? 0
            // Add 1 to hide this.main right border
            : -(box_width + 1)) + 'px';
    }

    function gen_borders(position) {
        // Compute the border radius values for the main box
        return [
            0,
            position === TOC_POSITIONS.top ? 0 : 4,
            position === TOC_POSITIONS.top ? 4 : 0,
            0
        ].map(function(n) { return n + 'px' }).join(' ');
    }

    function add_ids(text_getter, e) {
        // Apply an id to element e based on some text
        e.id = text_to_id(text_getter(e));
        return e;
    }

    function li(text) {
        // Wrap some text in a span and li
        var e = document.createElement('li')
          , t = document.createElement('span');
        t.textContent = text;
        t.classList.add('toc-link');
        e.appendChild(t);
        e.onclick = function() {
            document.querySelector('#' + text_to_id(text))
                .scrollIntoView({behavior: 'smooth'})
        };
        return e;
    }

    function tolist(list, li) {
        // Fold a series of li's into a list. List wrapped in array to
        // fit into get_listing pipeline.
        list[0].appendChild(li);
        return list;
    }

    function text_to_id(text) {
        // Turn a string into a friendly looking CSS id
        return text
            .replace(/[']/g, '')
            .replace(/\W/g, ' ')
            .split(/\s+/)
            .map(capitalize)
            .join('');
    }

    function get(attr) { return function(obj) { return obj[attr] } }
    function last(index, arr) { return index === arr.length - 1 }
    function capitalize(w) {
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() }
}

function scrollToTop(scrollDuration) {
    // See: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
    var scrollHeight = window.scrollY
      , scrollStep = Math.PI / ( scrollDuration / 15 )
      , cosParameter = scrollHeight / 2;

    var scrollCount = 0
      , scrollMargin;

    var scrollInterval = setInterval(function() {
        if (window.scrollY != 0) {
            scrollCount = scrollCount + 1;
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
            window.scrollTo(0, (scrollHeight - scrollMargin));
        } else clearInterval(scrollInterval);
    }, 15 );
}
