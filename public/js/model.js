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

var Model = function(data) {
  this.data = typeof data !== 'undefined' ? data : null;
  this.challenges = [];

  if (data != null) {
    console.log("Setting data");
//    console.log(JSON.stringify(data, null, 4));
    this.set_challenges(data)
  }
}

Object.defineProperty(Model.prototype, 'length', {length: function() {
   return this.challenges.length;
}});

Model.prototype.set_challenges = function(data) {
  this.data = typeof data !== 'undefined' ? data : null;  
  
  // loop through each challenge and sort the awards and
  // deadlines so the largest/closest are at the top.
  for (i = 0; i < this.challenges.length; i++) {
    this.challenges[i].awards = this.sort_awards(challenges[i].awards);
    if (challenges[i].awards[0]) this.challenges[i].top_award = this.challenges[i].awards[0].value;
      this.challenges[i].deadlines = this.sort_deadlines(challenges[i].deadlines);
    if (challenges[i].deadlines[0]) this.challenges[i].top_deadline = this.challenges[i].deadlines[0].date;
  }
}

Model.prototype.sort_awards = function(awards) {
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

Model.prototype.sort_deadlines = function(deadlines) {
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

Model.prototype.get_challenge_at = function (index) {
  return this.challenges[index];
}

Model.prototype.cf_sort = function (c, prop) {
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

Model.prototype.sort_by_award = function() {
  return sort();
}

Model.prototype.sort_by_deadline = function(c, asc) {
  this.challenges = this.challenges.sort(function(a, b) {
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

Model.prototype.sort_by_award = function(c, asc) {
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

Model.prototype.sort_by_date = function(c, asc){
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

Model.prototype.find_challenge = function(id) {
  console.log("Finding challenge with id " + id + " from " + this.challenges.length + " this.challenges.");
  for (i = 0; i < this.challenges.length; i++) {
      console.log(challenges[i].id + " == " + id);
      if(challenges[i].id == id) {
        return this.challenges[i];
      }
  }
}

