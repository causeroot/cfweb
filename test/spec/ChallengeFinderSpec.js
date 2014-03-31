describe("Challenge Model", function() {

//  beforeEach(function() {
//    player = new Challenge();
//  });

  it('should be able to create its application test objects', function() {
    var challenge = new Challenge();
    challenge.url = 'fixtures/single_challenge.json';
    expect(challenge).toBeDefined();

    challenge = new Challenge();
    challenge.url = 'fixtures/single_challenge_with_multiple_awards.json';
    expect(challenge).toBeDefined();
  });
  
  it('should trigger change event after loading json', function() {
    var spy = sinon.spy();
    
    var challenge = new Challenge();
    challenge.url = 'fixtures/single_challenge.json';
    challenge.on('change', spy);
    
    challenge.fetch({
      success: function(){
        expect(challenge).toBeDefined();
        expect(spy.called).toBeTruthy();
      }
    });
    
  });

  it('should call parse before loading json', function() {
    var challenge = new Challenge();
    challenge.url = 'fixtures/single_challenge.json';
    var spy = sinon.spy(challenge, 'parse');
    
    challenge.fetch({
      success: function(){
        expect(challenge).toBeDefined();
        expect(spy.called).toBeTruthy();
      }
    });
    
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

  it('should sort collection by deadline', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_deadline(false);
        var previousChallenge = null;
        
        // expect the previous challenge to have an equal or greater date
        challenges.each(function(currentChallenge) {
          if (null == previousChallenge) {
            previousChallenge = currentChallenge;
            return;
          } else {
            var last = new Date(previousChallenge.get('deadlines')[0].date);
            var current = new Date(currentChallenge.get('deadlines')[0].date);
            expect(last.getTime() >= current.getTime()).toBeTruthy();
          }
        });
        done();
      },
      error: function() {
        fail();
      }
    });  
  });
  
  it('should sort collection by posted date', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_posted_date(false); // descending
        var previousChallenge = null;
        challenges.each(function(currentChallenge) {
          if (null == previousChallenge) {
            previousChallenge = currentChallenge;
            return;
          } else {
            var last = new Date(previousChallenge.get('post_date'));
            var current = new Date(currentChallenge.get('post_date'));
            expect(last.getTime() >= current.getTime()).toBeTruthy();
          }
        });
        var topDate = new Date(challenges.at(0).get('post_date'));
        var secondDate = new Date(challenges.at(1).get('post_date'));
        expect(topDate).toBeGreaterThan(secondDate);
        done();
      },
      error: function() {
        fail();
      }
    });  
  });

  it('should sort collection by award', function(done) {
    var challenges = new Challenges();
    challenges.url = 'fixtures/data.json';
    challenges.fetch({
      success: function(){
        challenges.sort_by_award(true); // ascending
        var previousChallenge = null;
        challenges.each(function(currentChallenge) {
          if (null == previousChallenge) {
            previousChallenge = currentChallenge;
            return;
          } else {
            var previousAward = Number(previousChallenge.get('awards')[0].value.replace(/[^0-9\.]+/g,""));
            var currentAward = Number(currentChallenge.get('awards')[0].value.replace(/[^0-9\.]+/g,""));
            expect(previousAward >= currentAward).toBeTruthy();
          }
        });
        done();
      },
      error: function() {
        fail();
      }
    });  
  });
});
