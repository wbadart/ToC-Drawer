/**
 * toc.js
 *
 * Driver for the Table of Contents widget.
 *
 * Will Badart <wbadart@live.com>
 * created: OCT 2017
 **/

var TOC_STATES = {shown: 0, hidden: 1};


function ToC(usr_config) {

    //==========================
    // Apply user configuration
    //==========================

    var config = Object.assign({
        // Default settings
        start_state: TOC_STATES.shown,
        header: 'Table of Contents',
        title_selector: 'h2',
        position: 'bottom',
    }, usr_config);


    //====================
    // Create DOM outline
    //====================

    this.handle =
    this.container = document.createElement('aside');
    this.main      = document.createElement('div');
    this.title     = document.createElement('h6');
    this.ul        = document.createElement('ul');
    this.tab       = document.createElement('div');
    this.icon      = document.createElement('i');

    this.container.appendChild(this.main);
    this.container.appendChild(this.tab);
    if(config.header)
        this.main.appendChild(this.title);
    this.main.appendChild(this.ul);
    this.tab.appendChild(this.icon);


    //==============================
    // Apply classes, populate text
    //==============================

    this.container.classList.add('toc-box');
    this.main.classList.add('toc-main');
    this.tab.classList.add('toc-tab');
    this.icon.classList.add('fa', 'fa-list');
    this.title.textContent = config.header;


    //=========================================
    // Scan articles for headers, populate ToC
    //=========================================

    var text_getter = get('textContent');
    this.articles = Array.from(
        document.getElementsByClassName('toc-article'));

    this.articles.forEach((function(article, i, articles) {
        var this_class = 'toc-article' + i;
        article.classList.add(this_class);

        Array.from(document.querySelectorAll(
                '.' + this_class + ' ' + config.title_selector))
            .map(add_ids.bind(null, text_getter))
            .map(text_getter)
            .map(li)
            .concat(!last(i, articles)
                ? [document.createElement('hr')]
                : [])
            .forEach(this.ul.appendChild.bind(this.ul));
    }).bind(this));


    //======================================
    // Some initial config, computed styles
    //======================================

    this.state = config.start_state;
    this.tab.onclick = toggle.bind(this);
    this.container.style.left = get_css_left(
        this.state, this.main.clientWidth);

    this.container.style[config.position] = '2em';
    this.tab.style[config.position] = '0';


    //==================
    // Helper functions
    //==================

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
        e.appendChild(t);
        e.onclick = function() {
            document.querySelector('#' + text_to_id(text))
                .scrollIntoView({behavior: 'smooth'})
        };
        return e;
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

    function capitalize(w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() }
    function get(attr) { return function(obj) { return obj[attr] } }
    function last(index, arr) { return index === arr.length - 1 }
}
