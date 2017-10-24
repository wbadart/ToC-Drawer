/**
 * toc.js
 *
 * Driver for the Table of Contents widget.
 *
 * Will Badart <wbadart@live.com>
 * created: OCT 2017
 **/

var STATES = {shown: 0, hidden: 1};


function ToC() {
    this.state = STATES.shown;

    this.handle =
    this.container = document.createElement('aside');
    this.main      = document.createElement('div');
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
    this.main.appendChild(this.ul);
    this.tab.appendChild(this.icon);
    this.spacer.innerHTML = '&nbsp;';

    this.articles = Array.from(document.getElementsByClassName('toc-article'));
    this.articles.forEach((function(article) {
        Array.from(article.children)
            .filter(sections)
            .map(title)
            .map(li)
            .forEach(this.ul.appendChild.bind(this.ul));
    }).bind(this));

    this.tab.onclick = toggle.bind(this);


    function toggle() {
        this.state = this.state === STATES.shown
            ? STATES.hidden
            : STATES.shown;
        this.container.style.left = (this.state === STATES.shown
            ? 0
            : -this.main.clientWidth) + 'px';
    }

    function sections(element) {
        return element.tagName === 'SECTION';
    }

    function title(section) {
        return section.children[0].textContent.trim();
    }

    function li(text) {
        var e = document.createElement('li');
        e.textContent = text;
        return e;
    }

    function compose() {
        var args = Array.from(arguments);
        return function(a) {
            return args.reduce(function(acc, f){ return f(acc) }, a);
        };
    }
}

window.onload = function() {
    var toc = new ToC();
    document.body.appendChild(toc.handle);
    // Uncomment below line if console access to `toc' required for debugging.
    // window.toc = toc;
}
