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

var Challenges = function(data) {
  this.data = typeof data !== 'undefined' ? data : null;
  this.challenges = data;

  if (this.challenges.length > 0) {
    this.set_challenges(data)
  }
}

Challenges.prototype.set_challenges = function(data) {
  this.data = typeof data !== 'undefined' ? data : null;  
  
  // loop through each challenge and sort the awards and
  // deadlines so the largest/closest are at the top.
  for (i = 0; i < challenges.length; i++) {
    challenges[i].awards = this.sort_awards(challenges[i].awards);
    if (challenges[i].awards[0]) challenges[i].top_award = challenges[i].awards[0].value;
      challenges[i].deadlines = this.sort_deadlines(challenges[i].deadlines);
    if (challenges[i].deadlines[0]) challenges[i].top_deadline = challenges[i].deadlines[0].date;
  }
}

Challenges.prototype.sort_awards = function(awards) {
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

Challenges.prototype.sort_deadlines = function(deadlines) {
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

Object.defineProperty(Challenges.prototype, 'length', {get: function() {
   return this.challenges.length;
}});

Challenges.prototype.get_challenge_at = function (index) {
  return this.challenges[index];
}

Challenges.prototype.cf_sort = function (c, prop) {
  props[prop] = !props[prop];
  if (props[prop]) {
    console.log('true');
    } else {
      console.log('false');
    }
  
  
  if ('deadline' == prop) {
    return sort_by_deadline(c, props[prop])
  } else if ('award' == prop) {
    return sort_by_award(c, props[prop]);
  } else if ('post_date' == prop) {
    return sort_by_date(c, props[prop]);
  }
}

Challenges.prototype.sort_by_award = function() {
  return sort();
}

Challenges.prototype.sort_by_deadline = function(c, asc) {
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

Challenges.prototype.sort_by_award = function(c, asc) {
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

Challenges.prototype.sort_by_date = function(c, asc){
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

Challenges.prototype.find_challenge = function(id) {
  console.log("Finding challenge with id " + id + " from " + challenges.length + " challenges.");
  for (i = 0; i < challenges.length; i++) {
      console.log(challenges[i].id + " == " + id);
      if(challenges[i].id == id) {
        return challenges[i];
      }
  }
}

