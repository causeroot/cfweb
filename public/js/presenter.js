var Controller = function() {
  // constructor
  var _props = Array();
  var _challenges = null;
  var props = [];
  props['deadline'] = false;
  props['post_date'] = false;
  props['award'] = false;
}

Controller.prototype.set_cookie = function(name, value) {
  var CookieDate = new Date;
  CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
  document.cookie = name + '=' + value + '; expires=' + CookieDate.toGMTString() + ';';
}

Controller.prototype.set_cookie = function(name, value) {
  var CookieDate = new Date;
  CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
  document.cookie = name + '=' + value + '; expires=' + CookieDate.toGMTString() + ';';
}




Controller.prototype.render_challenge = function(challenge) {
  console.log('Rendering challenge ' + challenge.title);
  var source   = $("#challenge").html();
  var template = Handlebars.compile(source);
  var results = template(challenge);
  $("#content").html(results)
}

Controller.prototype.render_challenges = function() {
  var source   = $("#index").html();
  var template = Handlebars.compile(source);
  var results = template({challenges: challenges});
  $("#content").html(results)
}

