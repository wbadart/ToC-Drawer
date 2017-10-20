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
    this.tab.appendChild(this.icon);
    this.spacer.textContent = '&nbsp;';

    this.tab.onclick = toggle.bind(this);


    function toggle() {
        this.state = STATES.shown
            ? STATES.hidden
            : STATES.shown;

        this.container.style.display = this.state === STATES.shown
            ? 'default'
            : 'none';

        console.log('TOGGLING');
    }
}

window.onload = function() {
    var toc = new ToC();
    document.body.appendChild(toc.container);
}
