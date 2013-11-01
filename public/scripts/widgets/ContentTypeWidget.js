(function (callback) {
  if (typeof define === 'function' && define.amd) {
    define(['core/AbstractWidget'], callback);
  }
  else {
    callback();
  }
}(function () {

(function ($) {

/**
 * A pager widget for jQuery.
 *
 * <p>Heavily inspired by the Ruby on Rails will_paginate gem.</p>
 *
 * @expects this.target to be a list.
 * @class PagerWidget
 * @augments AjaxSolr.AbstractWidget
 * @todo Don't use the manager to send the request. Request only the results,
 * not the facets. Update only itself and the results widget.
 */
AjaxSolr.ContentTypeWidget = AjaxSolr.AbstractWidget.extend(
  /** @lends AjaxSolr.PagerWidget.prototype */
  {
  /**
   * @param {Object} [attributes]
   * @param {Number} [attributes.innerWindow] How many links are shown around
   *   the current page. Defaults to 4.
   * @param {Number} [attributes.outerWindow] How many links are around the
   *   first and the last page. Defaults to 1.
   * @param {String} [attributes.prevLabel] The previous page link label.
   *   Defaults to "&laquo; Previous".
   * @param {String} [attributes.nextLabel] The next page link label. Defaults
   *   to "Next &raquo;".
   * @param {String} [attributes.separator] Separator between pagination links.
   *   Defaults to " ".
   */
  constructor: function (attributes) {
    AjaxSolr.ContentTypeWidget.__super__.constructor.apply(this, arguments);
    AjaxSolr.extend(this, {
      separator: '| ',
      // The current content_type.
      currentContentType: null,
      contentTypes: {'web':['html', 'xhtml+xml'], 'pdf':['pdf'], 'doc':['doc']}
    }, attributes);
  },

  /**
   * @param {Number} page A page number.
   * @param {String} classnames CSS classes to add to the page link.
   * @param {String} text The inner HTML of the page link (optional).
   * @returns The link or span for the given page.
   */
  contentTypeLinkOrSpan: function (contentType, text) {
    text = text || contentType;

    if (contentType && contentType != this.currentContentType) {
      return $('<a href="#"></a>').html(text).addClass('content-active').click(this.clickHandler(contentType));
    }
    else {
      return $('<span></span>').html(text).addClass('content-disabled');
    }
  },

  /**
   * @param {Number} page A page number.
   * @returns {Function} The click handler for the page link.
   */
  clickHandler: function (contentType) {
    var self = this;
    return function () {
      if (self.currentContentType){
        var query_arr = [];
        $.each(self.contentTypes[self.currentContentType], function (index, value){
          query_arr.push("content_type:" + value);
        });
        var query_string = query_arr.join(" OR ");
        self.manager.store.removeByValue('fq', '(' + query_string + ')');
      }
      var query_arr = [];
      $.each(self.contentTypes[contentType], function (index, value){
        query_arr.push("content_type:" + value);
      });
      var query_string = query_arr.join(" OR ");
      self.manager.store.addByValue('fq', '(' + query_string + ')');
      self.currentContentType = contentType;
      self.doRequest();
      return false;
    }
  },

  /**
   * Render the pagination links.
   *
   * @param {Array} links The links for the visible page numbers.
   */
  renderLinks: function (links) {
    if (this.contentTypes) {

      var $target = $(this.target);
      $target.empty();

      for (var type in this.contentTypes) {
        var link = this.contentTypeLinkOrSpan(type, type);
        var $li = $('<li></li>');
        if (this.separator) {
          $li.append(this.separator);
        }
        $target.append($li.append(link));
      }
    }
  },

  afterRequest: function () {
    this.renderLinks();
  }
});

})(jQuery);

}));
