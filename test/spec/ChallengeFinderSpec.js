describe("Challenge Model", function() {

//  beforeEach(function() {
//    player = new Challenge();
//  });

  it('should be able to create its application test objects', function() {
    var challenge = new Challenge({url:'fixtures/single_challenge.json'});
    expect(challenge).toBeDefined();

    challenge = new Challenge({url:'fixtures/single_challenge_with_multiple_awards.json'});
    expect(challenge).toBeDefined();
    
  });  

  it('should sort awards after parsing json', function(done) {
    var challenge = new Challenge({url:'fixtures/single_challenge_with_multiple_awards.json'});
    challenge.url = 'fixtures/single_challenge_with_multiple_awards.json';
    challenge.fetch({
      success: function(){
        expect(challenge).toBeDefined();
        var awards = challenge.get("awards");
        expect(awards).toBeDefined();
        expect(awards[0]).toBeDefined();
        expect(awards[1]).toBeDefined();
        expect(awards[0].value).toBeGreaterThan(awards[1].value);
        done();
      }
    });
  });
  
  it('should sort deadlines after parsing json', function(done) {
    var challenge = new Challenge({url:'fixtures/single_challenge_with_multiple_awards.json'});
    challenge.url = 'fixtures/single_challenge_with_multiple_awards.json';
    challenge.fetch({
      success: function(){
        expect(challenge).toBeDefined();
        var deadlines = challenge.get("deadlines");
        expect(deadlines).toBeDefined();
        expect(deadlines[1]).toBeDefined();
        expect(deadlines[0]).toBeDefined();
        expect(deadlines[0].date).toBeGreaterThan(deadlines[1].date);
        done();
      },
      error: function() {
        fail();
      }
    });
  });
  
});

describe("Challenges Collection", function() {
  it('should evaluate dates properly', function() {
    var d = new Date("2004-01-01T00:00:00Z");
    expect(d.getTime()).toBe(1072915200000);
    d = new Date("");
    expect(d.getTime()).toBeNaN();
  });

  it('should sort by deadline', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_deadline(false);
        var topDeadlines = challenges.at(1).get('deadlines')[0];
        var secondDeadlines = challenges.at(0).get('deadlines')[0];
        expect(topDeadlines.date).toBeGreaterThan(secondDeadlines.date);
        done();
      },
      error: function() {
        fail();
      }
    });  
  });
  
  it('should sort by posted date', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_posted_date(false);
        var topDate = challenges.at(0).get('post_date');
        console.log(topDate);
        var secondDate = challenges.at(1).get('post_date');
        console.log(secondDate);
        expect(topDate).toBeGreaterThan(secondDate);
        done();
      },
      error: function() {
        fail();
      }
    });  
  });

  

  it('should sort by award', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_award(false);
        var topAward = challenges.at(1).get('awards')[0];
        var secondAward = challenges.at(0).get('awards')[0];
        expect(topAward.value).toBeGreaterThan(secondAward.value);
        done();
      },
      error: function() {
        fail();
      }
    });  
  });

});
