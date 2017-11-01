/**
 * toc.js
 *
 * Driver for the Table of Contents widget.
 *
 * Will Badart <wbadart@live.com>
 * created: OCT 2017
 **/

var TOC_STATES = {shown: 0, hidden: 1};


function ToC(config) {
    config = config || {};
    this.state = config.start_state || TOC_STATES.shown;

    this.handle =
    this.container = document.createElement('aside');
    this.main      = document.createElement('div');
    this.title     = document.createElement('h6');
    this.ul        = document.createElement('ul');
    this.spacer    = document.createElement('div');
    this.tab       = document.createElement('div');
    this.icon      = document.createElement('i');

    this.container.classList.add('toc-box');
    this.main.classList.add('toc-main');
    this.spacer.classList.add('toc-spacer');
    this.tab.classList.add('toc-tab');
    this.icon.classList.add('fa', 'fa-list');

    this.container.appendChild(this.main);
    this.container.appendChild(this.spacer);
    this.container.appendChild(this.tab);
    this.main.appendChild(this.title);
    this.main.appendChild(this.ul);
    this.tab.appendChild(this.icon);
    this.title.textContent = config.header || 'Table of Contents';
    this.spacer.innerHTML = '&nbsp;';

    var text_getter = get('textContent');
    this.articles = Array.from(document.getElementsByClassName('toc-article'));
    this.articles.forEach((function(article, i, articles) {
        flattree(article)
            .filter(config.title_predicate || default_title_predicate)
            .map(add_ids.bind(null, text_getter))
            .map(text_getter)
            .map(li)
            .concat(!last(i, articles) ? [document.createElement('hr')] : [])
            .forEach(this.ul.appendChild.bind(this.ul));
    }).bind(this));

    this.container.style.left = this.main.clientWidth;
    this.tab.onclick = toggle.bind(this);


    function toggle() {
        this.state = this.state === TOC_STATES.shown
            ? TOC_STATES.hidden
            : TOC_STATES.shown;
        this.container.style.left = (this.state === TOC_STATES.shown
            ? 0
            : -this.main.clientWidth) + 'px';
    }

    function add_ids(text_getter, e) {
        e.id = text_to_id(text_getter(e));
        return e;
    }

    function li(text) {
        var e = document.createElement('li')
          , t = document.createElement('span');
        t.textContent = text;
        e.appendChild(t);
        e.onclick = function() {
            document.querySelector('#' + text_to_id(text)).scrollIntoView({behavior: 'smooth'}) };
        return e;
    }

    function flattree(e) {
        return Array.from(e.children).reduce(function(result, child) {
            return result.concat(haschildren(child) ? flattree(child) : [child]);
        }, []).concat([e])
        function haschildren(e) { return e.children.length !== 0 }
    }

    function text_to_id(text) {
        return text
            .replace(/[']/g, '')
            .replace(/\W/g, ' ')
            .split(/\s/)
            .map(capitalize)
            .join('');
    }

    function capitalize(w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() }
    function get(attr) { return function(obj) { return obj[attr] } }
    function last(index, arr) { return index === arr.length - 1 }
    function default_title_predicate (e) { return e.tagName === 'H2' };
}
