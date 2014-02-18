var attr = Ember.attr, hasMany = Ember.hasMany;

var challenges = null;

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('challenge', function() {
    this.resource('challenge', { path: ':id' });
  });
});

App.IndexRoute = Ember.Route.extend({
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
              return challenge;
            }
        });
      });
    }
    Ember.$.map(challenges, function(challenge) {
        if(challenge.id == params.id) {
          return challenge;
        }
    });
  }
});
