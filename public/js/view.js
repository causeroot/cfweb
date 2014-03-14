var View = function() {
  var props = Array();
  var challenges = null;

  props['deadline'] = false;
  props['post_date'] = false;
  props['award'] = false;

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
}  

View.prototype.render_challenge = function(challenge) {
  console.log('Rendering challenge ' + challenge.title);
  var source   = $("#challenge").html();
  var template = Handlebars.compile(source);
  var results = template(challenge);
  $("#content").html(results)
}

View.prototype.render_challenges = function() {
  var source   = $("#index").html();
  var template = Handlebars.compile(source);
  var results = template({challenges: challenges});
  $("#content").html(results)
}



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


