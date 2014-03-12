var controller = null;
var view = null;
var challenges = null;

// Gardner was here
(function(){
    console.log("ready()");
    console.log(JSON.stringify(challenges, null, 4));
    
    $.getJSON("js/data.json").then(function(data) {
        view = new View();
        controller = new Controller();
        challenges = new Challenges(data);
        view.route_request(location.hash);

        var lastHash = location.hash;
        $(window).bind('hashchange', function() {
          console.log(location.hash);
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

        
    });

})()

