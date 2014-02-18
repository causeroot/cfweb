var attr = Ember.attr, hasMany = Ember.hasMany;

var challenges = null;

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('challenge', function() {
    this.resource('challenge', { path: ':id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  //
});

App.ChallengeController = Ember.ObjectController.extend({
  
});

App.ChallengesRoute = Ember.Route.extend({
  model: function(params) {
      console.log("model function.");
      return Ember.$.getJSON("js/data.json").then(function(data) {
        challenges = data;
        return data;
      });
    }
});

App.ChallengeRoute = Ember.Route.extend({
  model: function(params) {
    if (null == challenges) {
      return Ember.$.getJSON("js/data.json").then(function(data) {
        challenges = data;
        Ember.$.map(challenges, function(challenge) {
            if(challenge.id == params.id) {
              console.log("returning challenge");
              return challenge;
            }
        });
      });
    } else {
      Ember.$.map(challenges, function(challenge) {
          if(challenge.id == params.id) {
            console.log("returning challenge");
            console.log(challenge);
            return challenge;
          }
      });
    }
  }
});

Handlebars.registerHelper('maxAward', function(context, options) {
    var ret = 0;
    console.log(context);
    for (var i = 0; i < context.length; i++) {
      if (context[i].value) {
        val = Number(context[i].value.replace(/[^0-9\.]+/g,""));
        if (ret < val) {
          ret = val;
        }
      }
    }
    return ret;
});