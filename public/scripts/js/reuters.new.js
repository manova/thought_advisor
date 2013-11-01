var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://96.242.87.141:8983/solr/collection1/'
    });
    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));
    Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        $('#pager-header').html($('<span></span>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
      }
    }));
    Manager.addWidget(new AjaxSolr.ContentTypeWidget({
      id: 'contenter',
      target: '#contenter',
      contentTypes: {'web':['html', 'xhtml+xml'], 'pdf':['pdf'], 'doc':['doc']}//['pdf', 'xhtml+xml', 'html'],
    }));
    Manager.addWidget(new AjaxSolr.UrlQueryWidget({
      id: 'urls',
      target: '#urls',
      field: 'url'
    }));
    Manager.addWidget(new AjaxSolr.TextWidget({
      id: 'text',
      target: '#search'
    }));
    Manager.init();
    Manager.store.addByValue('q', '*:*');
    var params = {
      facet: true,
      //'facet.query': ['url:www.fticonsulting.com', 'url:www.efficioconsulting.com', 'url:www.buckconsultants.com'],
      'facet.field': ['url'],
      'facet.limit': 20,
      'json.nl': 'map'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
    Manager.doRequest();
  });

})(jQuery);

