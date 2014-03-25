/*
 *
 * Data Model
 *
 */
var Challenge = Backbone.Model.extend({});

var Challenges = Backbone.Collection.extend({
    model: Challenge,
    url: "js/data.json",
    
    // default sort for Challenges collection
    comparator: function (model) { 
      return model.get('title');
    },

    initialize: function () {
        // somthing
    }
});

/*
 *
 * View
 *
 */
var ChallengeView = Backbone.View.extend({
  // el - stands for element. Every view has a element associate in with HTML 
  //      content will be rendered.
  el: '#challenges',
  // It's the first function called when this view it's instantiated.
  initialize: function(options) {
    this.registerHandebarsHelpers();
    this.listenTo(this.collection, 'sync', this.render);
    this.$el.html("Loading...");
  },
  // $el - it's a cached jQuery object (el), in which you can use jQuery functions 
  //       to push content. Like the Hello World in this case.
  render: function(){
    var source   = $("#index").html();
    var template = Handlebars.compile(source);
    var results  = template({challenges: this.collection});
    console.log(this.collection.toJSON());
    $("#challenges").html(results);
  },

  renderChallenges: function() {
  },

  render_challenge: function(challenge) {
    console.log('Rendering challenge ' + challenge.title);
    var source   = $("#challenge").html();
    var template = Handlebars.compile(source);
    var results = template(challenge.models);
    $("#content").html(results)
  },
  
  registerHandebarsHelpers: function() {
    Handlebars.registerHelper('to_html', function(str) {
    //  var re = /[\n|\s]+(\w+)[\n]+/g;
    //  str = str.replace(re, "<br /><strong>$1</strong><br />");
      str = str.replace(/\n/g, "<br />");
      return new Handlebars.SafeString(str);
    });

    Handlebars.registerHelper('date_str', function(d) {
      return new Handlebars.SafeString(
//        moment(d).format('ll')
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
  } // registerHandebarsHelpers
});

/*
 *
 * Routes
 *
 */
var ChallengeFinderRoutes = Backbone.Router.extend({

  routes: {
    "about":                 "about",      // #about
    "legal":                 "legal",      // #legal
    "challenges":            "challenges", // #legal
    "search/:query(/p:page)":  "search"    // #search/kiwis/p7
  },

  help: function() {
      
  },

  search: function(query, page) {
    
  }

});

var challenges = null;
var view = null;

// challenges.on("all", function(eventName) {
//   console.log('ALL_EVENTS: ' + eventName);
// });

$(document).ready(function() {
  challenges = new Challenges();
  view = new ChallengeView({collection: challenges});
  
  challenges.fetch({
    success: function(collection, response, options) {
      console.log("Success from collection.fetch()");
    },
    error: function(collection, response, options) {
      console.log("Error from collection.fetch()");
    }
  });
});

