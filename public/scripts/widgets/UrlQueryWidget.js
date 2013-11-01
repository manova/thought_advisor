(function ($) {

AjaxSolr.UrlQueryWidget = AjaxSolr.AbstractFacetQueryWidget.extend({
  afterRequest: function () {
    var self = this;

    if (!this.manager.store.find('fq', new RegExp('^-?url:'))){
      $(this.target).empty();


      var maxCount = 0;
      var urls = [];
      var url_count = {};
      for (var facet in this.manager.response.facet_counts.facet_queries) { 
        var domain = facet.split(':')[1];     
        var count = this.manager.response.facet_counts.facet_queries[facet];
        if (count > maxCount) {
          maxCount = count;
        }
        if (count > 0){
          urls.push(domain);
          url_count[domain] = count;
        }
      }
      console.log("urls: ", urls);
      var self = this;
      $.ajax({
        type:"get",
        data:{urls:urls},
        url:'/company_names',
        success: function (response) {
          var options = { '': '--select--' };
          console.log(response);
          var json_data = JSON.parse(response);
          for (var entry in json_data) {
            var name = json_data[entry].name;
            options[name] = name + ' (' + url_count[json_data[entry].url] + ')';
          }
          $(self.target).append("<h4>Filter By Company<h4>");
          $(self.target).append(self.template('url', options));
        }
      });   
    }
    console.log(this.target);
    $(document).on('change', '#url', function () {
      var value = $(this).val();
      if (value) {
        $.get(
          "/company",
          {name: value}, 
          function(response){
            var data = JSON.parse(response);
            self.add(data.url);
            self.doRequest(); 
            $('#company_profile').empty();
            $('#company_profile').append("<ul class='company-name'><li id='company-name'><b>"+ data.name + "</b></li><li class='pull-right'><a id = 'remove-filter' class = 'btn btn-danger'><i class=icon-remove-sign> remove company filter</i></a></li></ul>");
            $('#company_profile').append("<div>" + data.description + "</div>");
            $('#company_profile').append("<a href='http://"+data.url+"' target='_blank'><h5>view website!</h5></a>");
            if (data.address_street_1) {
              $('#company_profile').append("<div>" + data.address_street_1+ " " + data.address_street_2 + "</div>"); 
              $('#company_profile').append("<div>" + data.city+" "+data.state+" "+data.zip_code+"</div>");                             
            }
            $('#company_profile').append("<div>" + data.country+"</div>"); 
            $('#company_profile').append("<ul class = 'company_social'></ul>");
            if (data.twitter) {
              $('.company_social').append("<li class='socials'><a href='"+data.twitter+"' class='btn btn-twitter'><i class='icon-twitter'> | Follow</i></a></li>");     
            }
            if (data.linkedin) {
              $('.company_social').append("<li class='socials'><a href='"+data.linkedin+"' class='btn btn-linkedin'><i class='icon-linkedin'> | Connect</i></a></li>");              
            }
            if (data.blog) {
              $('.company_social').append("<li class='socials'><a href='"+data.blog+"' class='btn btn-rss'><i class='icon-rss'> | view blog</i></a></li>");     
            }
            $('#remove-filter').click(function(e){
              $('#company_profile').empty();
              self.manager.store.removeByValue('fq', new RegExp('^-?' + self.field + ':'));
              self.doRequest();
            }); 
          },
          "text"
        );
      }

    });
    /*
    $(document).on('change','#url',function(){
      alert('Change Happened');
    });*/
  },



  afterChangeSelection: function () {
    $(this.target).empty();
    /*
    $(this.target).append($('<a href="/solr">remove company filter<a>').click(function(){
      console.log("make updated request");
    }));
    */  
  },

  template: function (name, container) {
    var options = [];
    for (var value in container) {
      options.push('<option value="' + value +'">' + container[value] + '</option>');
    }
    return '<select id="' + name + '" name="' + name + '">' + options.join('\n') + '</select>';
  }
});

})(jQuery);
