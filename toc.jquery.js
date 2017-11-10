/**
 * toc.jquery.js
 *
 * Provide ToC-Drawer as jQuery plugin.
 *
 * Will Badart <wbadart@nd.edu>
 * created: NOV 2017
 **/

var TOC_STATES = {shown: 0, hidden: 1}
  , TOC_POSITIONS = {top: 'top', bottom: 'bottom'};


(function($) {
$.fn.toc = function(options) {
    var articles = this;

    //==========================
    // Apply user configuration
    //==========================

    var config = $.extend({
        // Default settings
        start_state:    TOC_STATES.shown,
        position:       TOC_POSITIONS.bottom,
        header:         'Table of Contents',
        title_selector: 'h2',
        ordered:        false,
        link_top:       false,
    }, options);


    //====================
    // Create DOM outline
    //====================

    var $toc_drawer = $($.parseHTML(
        '<aside class="toc-box">' +
        '   <div class="toc-main">' +
        '       <h6 class="toc-header">' +
                    config.header +
        '       </h6>' +
        '       <div class="toc-listings">' +
        '           <ul class="toc-list"></ul>' +
        '       </div>' +
        '   </div>' +
        '   <div class="toc-tab">' +
        '       <i class="fa fa-list"></i>' +
        '   </div>' +
        '</aside>'))
      , $list = $toc_drawer.find('.toc-list')
      , titles = Array.from(articles).reduce(gen_listing, $list);


    function gen_listing($ul, article, i, articles) {
        var titles = Array.from($(config.title_selector, article))
            .map(function(e) { return $(e).text() })
            .map(function(t) { return $('<li>', {text: t}) })
            .concat(i < articles.length - 1 ? [$('<hr>')] : [])
        ;
        $ul.append(titles);
        return $ul;
    }

    console.log(titles);


};
})(jQuery);
