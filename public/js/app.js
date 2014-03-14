/*!
 * ChallengeFinder JS Web Front End v1.10.2
 * https://github.com/causeroot/cfweb
 *
 * Copyright 2014 ChallengeFinder, LLC.
 * Released under the MIT license
 * https://github.com/causeroot/cfweb/LICENSE
 *
 * Date: March 6th, 2014
 */

// declare the variable for the app object.
var app = null;

/**
 * The App class loads the data and instantiates the MVP classes
 * and handles the routing.
 * @constructor
 * @author Gardner <gardner@causeroot.org>
 */
function App() {
  this.presenter = null;
  this.view = null;
  this.model = null;
  this.routes = {};
  this.el = null;

  
  this.load_script("js/data.js", function(app) {
    app.load_script("js/model.js", function(app) {
      // create the model
      app.model = new Model();
      
      app.load_script("js/view.js", function(app) {
        app.view = new View();
        app.load_script("js/presenter.js", function(app) {
          app.presenter = new Presenter(this.view, this.model);
          app.route('/', 'home', this.presenter.home);
          app.route('/challenge', 'challenge', this.presenter.challenge);
          app.router();
        });
      });
    });
  });
};

// The route registering function:
App.prototype.route = function(path, templateId, controller) {  
  this.routes[path] = {templateId: templateId, controller: controller};
}

App.prototype.router = function() {  
    // Lazy load view element:
    this.el = this.el || document.getElementById('view');
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Do we have both a view and a route?
    if (el && route.controller) {
        // Render route template with John Resig's template engine:
        el.innerHTML = tmpl(route.templateId, new route.controller());
    }
}

App.prototype.route_request = function(hash) {
	var CHALLENGE_ROUTE = '#/challenge/';
	var SORT_ROUTE = '#sort=';
	console.log('Routing for ' + hash);
	if (hash.substring(0, CHALLENGE_ROUTE.length) === CHALLENGE_ROUTE) {
    var id = hash.replace(CHALLENGE_ROUTE, '');
    var challenge = findChallenge(id);
    console.log(challenge);
		view.render_challenge(challenge);
	} else if (hash.substring(0, SORT_ROUTE.length) === SORT_ROUTE) {
    var sort_by = hash.replace(SORT_ROUTE, '');
    view.render_challenges();
	} else {
    view.render_challenges();
	}
}

App.prototype.load_script = function(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback(this);
    script.onload = callback(this);

    // Fire the loading
    head.appendChild(script);
}
$(document).ready(function() {
  app = new App();
})
