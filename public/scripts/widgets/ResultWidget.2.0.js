(function ($) {

AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
  start: 0,

  beforeRequest: function () {
    $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
  },

  afterRequest: function () {
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));
    }
  },

  template: function (doc) {
    var snippet = '';
    if (doc.content[0].length > 300) {
      //snippet += doc.dateline + ' ' + doc.text.substring(0, 300);
      //snippet += String(doc.content[0]).substring(0,300);
      snippet += doc.tstamp + ' ' + doc.content[0].substr(0,300);
      snippet += '<span style="display:none;">' + doc.content[0].substr(300);
      snippet += '</span> <a href="#" class="more">more</a>';
    }
    else {
      //snippet += doc.dateline + ' ' + doc.text;
      snippet += doc.tstamp + ' ' + doc.content[0];
    }
    var output = '' 
    if (doc.url.slice(-3) == "pdf"){
      output = '<div><h4><a href="'+doc.url+'" target="_blank">' + doc.content[0].slice(0,80) + '....</a></h4>'; 
      output += '<div class="link-data">' + doc.url + '</div>';

    } else{
      output = '<div><h4><a href="'+doc.url+'" target="_blank">' + doc.content[0].slice(0,80) + '....</a></h4>'; 
      //output = '<div><h2>' + doc.title[0] + '</h2>'; 
      output += '<div class="link-data">' + doc.url + '</div>'; 
    }
    //output += '<p id="links_' + doc.id + '" class="links"></p>';
    output += '<p>' + snippet + '</p></div>';
    return output;
  },

  init: function () {
    $(document).on('click', 'a.more', function () {
      var $this = $(this),
          span = $this.parent().find('span');

      if (span.is(':visible')) {
        span.hide();
        $this.text('more');
      }
      else {
        span.show();
        $this.text('less');
      }

      return false;
    });
  }

});

})(jQuery);