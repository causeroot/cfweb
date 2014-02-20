var challenges = null;

var props = Array();

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

Handlebars.registerHelper('link', function(challenge) {
  return new Handlebars.SafeString(
    "<a href='#/challenge/" + challenge.id + "'>" + challenge.title + "</a>"
  );
});

function route_request(hash) {
	var CHALLENGE_ROUTE = '#/challenge/';
	var SORT_ROUTE = '#sort=';
	console.log('Routing for ' + hash);
	if (hash.substring(0, CHALLENGE_ROUTE.length) === CHALLENGE_ROUTE) {
		var id = hash.replace(CHALLENGE_ROUTE, '');
		var challenge = findChallenge(id);
        console.log(challenge);
		render_challenge(challenge);
	} else if (hash.substring(0, SORT_ROUTE.length) === SORT_ROUTE) {
		var sort_by = hash.replace(SORT_ROUTE, '');
		cf_sort(challenges, sort_by);
		render_challenges();
	} else {
        render_challenges();
	}
}

(function(){
    console.log("ready()");
    $.getJSON("js/data.json").then(function(data) {
        challenges = sort_challenges(data, 'deadlines');
		route_request(location.hash);
    });
	
	console.log(location.hash);
    var lastHash = location.hash;
    $(window).bind('hashchange', function() {
        var newHash = location.hash;
		route_request(newHash);
        // Do something
        var diff = compareHash(newHash, lastHash);

        //At the end of the func:
        lastHash = newHash;
    });

    function compareHash(current, previous){
        for(var i=0, len=Math.min(current.length, previous.length); i<len; i++){
            if(current.charAt(0) != previous.charAt(0)) break;
        }
        current = current.substr(i);
        previous = previous.substr(i);
        for(var i=0, len=Math.min(current.length, previous.length); i<len; i++){
            if(current.substr(-1) != previous.substr(-1)) break;
        }

        //Array: Current = New hash, previous = old hash
        return [current, previous];
    }
})()

function render_challenge(challenge) {
  console.log('Rendering challenge ' + challenge.title);
  var source   = $("#challenge").html();
  var template = Handlebars.compile(source);
  var results = template(challenge);
  $("#content").html(results)
}

function render_challenges() {
  var source   = $("#index").html();
  var template = Handlebars.compile(source);
  var results = template({challenges: challenges});
  $("#content").html(results)
}

function sort_challenges(c, prop) {
  challenges = c;
  for (i = 0; i < c.length; i++) {
    c[i].awards = sort_awards(c[i].awards);
	if (c[i].awards[0]) c[i].top_award = c[i].awards[0].value;
    c[i].deadlines = sort_deadlines(c[i].deadlines);
	if (c[i].deadlines[0]) c[i].top_deadline = c[i].deadlines[0].date;
  }
  cf_sort(c, prop);
  return c;
}

function sort_awards(awards) {
  return awards.sort(function(a, b) {
    if (a.value && b.value) {
      var aval = Number(a.value.replace(/[^0-9\.]+/g,""));
      var bval = Number(b.value.replace(/[^0-9\.]+/g,""));
      if (aval == bval) return 0;
      if (a.value > b.value) {
		  console.log(a.value + ' > ' + b.value);
        return -1;
      } else {
        return 1;
      }
    }
  });
}

function sort_deadlines(deadlines) {
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
        return 1;
      }
    } else {
      console.log(a.date + ' is error in relation to ' + b.date);
    }
  });
}

function cf_sort(c, prop) {
  var asc = !props[prop];
  props[prop] = asc;
  
  if ('deadline' == prop) {
    return sort_by_deadline(c, asc)
  } else if ('award' == prop) {
    return sort_by_award(c, asc);
  } else if ('post_date' == prop) {
    return sort_by_date(c, asc);
  }
}

function sort_by_deadline(c, asc) {
  challenges = challenges.sort(function(a, b) {
    if ((a.deadlines[0] && b.deadlines[0]) && (a.deadlines[0].date && b.deadlines[0].date)) {
      var date1 = new Date(a.deadlines[0].date);
      var date2 = new Date(b.deadlines[0].date);
      if (date1.getTime() == date2.getTime()) {
        if (a.id > b.id) {
          return (asc) ? -1 : 1;
        } else {
          return (asc) ? 1 : -1;
        }
      }
      if (date1.getTime() > date2.getTime()) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (a.id < b.id) {
        return (asc) ? -1 : 1;
      } else {
        return (asc) ? 1 : -1;
      }
    }
  });
}

function sort_by_award(c, asc) {
  return c.sort(function(a, b) {
    if (a.awards[0] && b.awards[0]) {
      if (a.awards[0].value && b.awards[0].value) {
        var aval = Number(a.awards[0].value.replace(/[^0-9\.]+/g,""));
        var bval = Number(b.awards[0].value.replace(/[^0-9\.]+/g,""));
        if (aval == bval) {
          if (a.id > b.id) {
            return (asc) ? -1 : 1;
          } else {
            return (asc) ? 1 : -1;
          }
        }
        if (aval > bval) {
          return (asc) ? -1 : 1;
        } else {
          return (asc) ? 1 : -1;
        }
      } else {
        return 0;
      }
    }
    });  
}

function sort_by_date(c, asc){
  return c.sort(function(a, b) {
    var date1 = new Date(a.post_date);
    var date2 = new Date(b.post_date);
    if (date1.getTime() == date2.getTime()) {
      console.log("dates are the same");
      if (a.id > b.id) {
        return (asc) ? -1 : 1;
      } else {
        return (asc) ? 1 : -1;
      }
    }
    if (date1.getTime() > date2.getTime()) {
      console.log("dates are bigger");
      return (asc) ? -1 : 1;
    } else {
      console.log("dates are smaller");
      return (asc) ? 1 : -1;
    }
  });
}

function findChallenge(id) {
  console.log("Finding challenge with id " + id + " from " + challenges.length + " challenges.");
  for (i = 0; i < challenges.length; i++) {
      console.log(challenges[i].id + " == " + id);
      if(challenges[i].id == id) {
        return challenges[i];
      }
  }
}
      
