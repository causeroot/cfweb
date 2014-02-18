// QUnit test case
test("test sort", function() {
  // helper waiting the application is idle before running the callback
  var challenge = findChallenge(7);
  console.log(challenge);
  ok(challenge['id'] == 7);
  console.log("inside test");
});
