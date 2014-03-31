/*
 *
 * Data Model
 *
 */
var Challenge = Backbone.Model.extend({
  
  // this method is called each time a model is created
  parse: function(response, options){
    // sort the incoming awards and deadlines
    response.awards = this.sort_awards(response.awards);
    response.deadlines = this.sort_deadlines(response.deadlines);

    // set a value for the template
    if (response.awards[0]) response.top_award = response.awards[0].value;
    if (response.deadlines[0]) response.top_deadline = response.deadlines[0].date;
    
    // return the challenge with sorted awards and deadlines to be used in the model
    return response;
  },
  
  sort_deadlines: function(deadlines) {
    return deadlines.sort(function(a, b) {
      if (a.date && b.date) {
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        if (date1.getTime() == date2.getTime()) {
          console.log(a.date + ' is same a ' + b.date);
          return 0;
        }
        if (date1.getTime() > date2.getTime()) {
          return -1;
          console.log(a.date + ' is larger than ' + b.date);
        } else {
          console.log(a.date + ' is less than ' + b.date);
          return 1;
        }
      } else {
        console.log(a.date + ' is error in relation to ' + b.date);
      }
    });
  },
  
  sort_awards: function(awards) {
    return awards.sort(function(a, b) {
      if (a.value && b.value) {
        var aval = Number(a.value.replace(/[^0-9\.]+/g,""));
        var bval = Number(b.value.replace(/[^0-9\.]+/g,""));
        if (aval == bval) return 0;
        if (a.value > b.value) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }
  
});


var Challenges = Backbone.Collection.extend({
    model: Challenge,
    
    // default sort for Challenges collection
    comparator: function (model) { 
//      console.log("Comparing: " + model.get('title'));
  //    console.debug(model);
      return model.get('title');
    },
    
    sort_by_thing: function(thing) {
      switch(thing) {
      case "deadline_d":
        this.sort_by_deadline();
        break;
      case "posted_d":
        this.sort_by_posted_date();
        break;
      case "award_d":
        this.sort_by_award();
        break;
      default:
        console.log("ERROR: unknown thing: " + thing);
      }        
    },
    
    sort_by_award: function(asc) {
      this.asc = asc;
      this.comparator = this.comparator_award;
      this.sort();
    },

    sort_by_posted_date: function(asc) {
      this.asc = asc;
      this.comparator = this.comparator_post_date;
      this.sort();
    },

    sort_by_deadline: function(asc) {
      this.asc = asc;
      this.comparator = this.comparator_deadline;
      this.sort();
    },
    
    comparator_deadline: function(a, b) {
      var date1 = new Date(a.get('deadlines')[0].date);
      var date2 = new Date(b.get('deadlines')[0].date);
      if (date1.getTime() == date2.getTime()) {
        return 0;
      }
      if (date1.getTime() == date2.getTime()) return 0;
      if (date1.getTime() > date2.getTime()) {
        return (this.asc) ? 1 : -1;
      } else {
        return (this.asc) ? -1 : 1;
      }
    },

    comparator_post_date: function(a, b) {
      date1 = new Date(a.get('post_date'));
      date2 = new Date(b.get('post_date'));
//      console.log(date1.getTime + ' : ' + date2.)
      if (date1.getTime() > date2.getTime()) {
        return (this.asc) ? 1 : -1;
      } else {
        return (this.asc) ? -1 : 1;
      }
    },

    comparator_award: function(a, b) {
      awardsA = a.get('awards');
      awardsB = b.get('awards');
      if ((awardsA != undefined && awardsB != undefined) && (awardsA[0].value && awardsB[0].value)) {
        var award1 = Number(awardsA[0].value.replace(/[^0-9\.]+/g,""));
        var award2 = Number(awardsB[0].value.replace(/[^0-9\.]+/g,""));
        if (award1 == award2) {
          if (a.id > b.id) {
            return (this.asc) ? -1 : 1;
          } else {
            return (this.asc) ? 1 : -1;
          }
        }
        if (award1 > award2) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (a.id < b.id) {
          return (this.asc) ? -1 : 1;
        } else {
          return (this.asc) ? 1 : -1;
        }
      }
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
  
/*  // use a default sort order
  getSortOrder: function() {
    if (this.asc == null || this.asc == undefined) {
      if ($.cookie('asc') == undefined) {
        // set a default
        console.debug('this.asc is undefined');
        $.cookie('asc', true);
      }
      this.asc = $.cookie('asc');
    }
    return this.asc;
  },
  
  setSortOrder: function(order) {
    this.asc = order;
    $.cookie('asc', order, { expires : 30 });
  },
  */
  
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
    var results  = template({challenges: this.collection.toJSON()});
    $("#challenges").html(results);
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
      var d = moment(d).format('ll');
      if ('Invalid date' == d) d = 'No Deadline';
      return new Handlebars.SafeString(
        d
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
    "sort/:sortBy(/:asc)":            "sort", // #legal
    "search/:query(/p:page)":  "search"    // #search/kiwis/p7
  },

  help: function() {
      
  },
  
  search: function(query, page) {
    
  }

});

var challenges = null;
var view = null;
var router = null;

function CFWeb(url) {
  // set default value for json url
  url = typeof url !== 'undefined' ? url : "js/data.json";
  challenges = new Challenges({ url: url });
  view = new ChallengeView({collection: challenges});
  router = new ChallengeFinderRoutes();
  Backbone.history.start();
  
  router.on("route:sort", function(thing) {
    challenges.sort_by_thing(thing);
  });
  
  challenges.fetch({
    success: function(collection, response, options) {
      console.log("Success from collection.fetch()");
    },
    error: function(collection, response, options) {
      console.log("Error from collection.fetch()");
    }
  });
}
