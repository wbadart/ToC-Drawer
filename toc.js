/**
 * toc.js
 *
 * Driver for the Table of Contents widget.
 *
 * Will Badart <wbadart@live.com>
 * created: OCT 2017
 **/


function ToC(title_predicate) {
    title_predicate = title_predicate || function(e) { return e.tagName === 'H2' };
    var STATES = {shown: 0, hidden: 1};
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
    this.articles.forEach((function(article, i, articles) {
        flattree(article)
            .filter(title_predicate)
            .map(get('textContent'))
            .map(li)
            .forEach(this.ul.appendChild.bind(this.ul));
        if(i < articles.length - 1)
            this.ul.appendChild(document.createElement('hr'));
    }).bind(this));

    this.container.style.left = this.main.clientWidth;
    this.tab.onclick = toggle.bind(this);


    function toggle() {
        this.state = this.state === STATES.shown
            ? STATES.hidden
            : STATES.shown;
        this.container.style.left = (this.state === STATES.shown
            ? 0
            : -this.main.clientWidth) + 'px';
    }

    function li(text) {
        var e = document.createElement('li');
        e.textContent = text;
        return e;
    }

    function flattree(e) {
        return Array.from(e.children).reduce(function(result, child) {
            return result.concat(haschildren(child) ? flattree(child) : [child]);
        }, []).concat([e])
        function haschildren(e) { return e.children.length !== 0 }
    }

    function get(attr) {
        return function(obj) { return obj[attr] };
    }
}
