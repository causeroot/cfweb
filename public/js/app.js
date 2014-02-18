var challenges = null;

var props = Array();
props['deadline'] = false;
props['post_date'] = false;
props['award'] = false;

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
    c[i].deadlines = sort_deadlines(c[i].deadlines);
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
  $.map(challenges, function(challenge) {
      if(challenge.id == id) {
        console.log("returning challenge");
        console.log(challenge);
        return challenge;
      }
  });
}
      
