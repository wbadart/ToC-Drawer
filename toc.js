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

    var container = document.createElement('aside')
      , main      = document.createElement('div')
      , ul        = document.createElement('ul')
      , spacer    = document.createElement('div')
      , tab       = document.createElement('div')
      , icon      = document.createElement('i');

    container.classList.add('toc-box');
    main.classList.add('toc-main');
    spacer.classList.add('toc-spacer');
    tab.classList.add('toc-tab');
    icon.classList.add('fa', 'fa-list');

    container.appendChild(main);
    container.appendChild(spacer);
    container.appendChild(tab);
    tab.appendChild(icon);
    spacer.textContent = '&nbsp;';
}

window.onload = function() {



}
