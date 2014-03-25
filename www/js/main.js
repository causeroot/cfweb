
var Challenge = Backbone.Model.extend({});

var Challenges = Backbone.Collection.extend({
    model: Challenge,
    url: "https://raw.github.com/causeroot/cfweb/gardner/public/js/data.json",
    
    // default sort for Challenges collection
    comparator: function (model) { 
      return model.get('title');
    }

    initialize: function () {
        // somthing
    }
});

var ChallengeView = Backbone.View.extend({
  // el - stands for element. Every view has a element associate in with HTML 
  //      content will be rendered.
  el: '#container',
  // It's the first function called when this view it's instantiated.
  initialize: function(){
    this.render();
  },
  // $el - it's a cached jQuery object (el), in which you can use jQuery functions 
  //       to push content. Like the Hello World in this case.
  render: function(){
    this.$el.html("Hello World");
  }
});

appView = new AppView();

var ChallengeFinderRoutes = Backbone.Router.extend({

  routes: {
    "about":                 "about",      // #about
    "legal":                 "legal",      // #legal
    "challenges",            "challenges", // #legal
    "search/:query(/p:page)":  "search"    // #search/kiwis/p7
  },

  help: function() {
      
  },

  search: function(query, page) {
    
  }

});

// Register Handlebars View
Handlebars.registerHelper('to_html', function(str) {
//  var re = /[\n|\s]+(\w+)[\n]+/g;
//  str = str.replace(re, "<br /><strong>$1</strong><br />");
  str = str.replace(/\n/g, "<br />");
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('date_str', function(d) {
  return new Handlebars.SafeString(
    moment(d).format('ll')
  );
});

Handlebars.registerHelper('link', function(challenge, target) {
  if (null != target) {
    return new Handlebars.SafeString(
      "<a href='#/challenge/" + challenge.id + "' target='" + target + "'>" + challenge.title + "</a>"
    );
  } else {
    return new Handlebars.SafeString(
      "<a href='#/challenge/" + challenge.id + "'>" + challenge.title + "</a>"
    );
  }  
});

