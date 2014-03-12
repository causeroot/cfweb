// QUnit test case
test("it sorts by deadline.", function() {
  // helper waiting the application is idle before running the callback
  expect(0);
  var cs = new Challenges(challenges);
  console.log(cs.length);
  var last = 999999999;
  for (var i = 0; i < cs.length; i++){
    a = cs.get_challenge_at(i).awards;
    for (var j = 0; j < a.length; j++){
      if (last < a.value) {
        console.log(last + " < " + a.value);
      }
    }
  }
  console.log("inside test");
});
