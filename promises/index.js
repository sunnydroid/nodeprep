var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
// var request = require('request');

var urls = ['http://finance.yahoo.com', 'http://news.yahoo.com', 'http://sports.yahoo.com'];

/* iterate through each url and return response times */

var returnLoopedPromise = function(urls, responseTimes) {
    /* request returns promise, resolved value is updated response time */
    return urls.reduce(function(promise, currentUrl) {
        /* reduce array elements, initialize with a resolved promise */
            var requestOption = {
                url: currentUrl,
                time: true
            };

            console.log('Sending request for: ', currentUrl);
            
            return request(requestOption)
            .then(function successfulGet(response, error) {
                if(response.statusCode !== 200) {
                    console.log('Error fetch url: ', currentUrl);
                    Promise.reject();
                }
                console.log('Time elapsed for request ', currentUrl, '=> ', response.elapsedTime);
                responseTimes.push(response.elapsedTime);
                return responseTimes;
            });

        }, responseTimes);
};

var returnLoopedPromiseReduce = function(urls) {
    console.log('running promise reduce through: ', urls);

    return Promise.reduce(urls, function(responseTimes, currentUrl) {
        
        var requestOption = {
                url: currentUrl,
                time: true
        };

        console.log('current url => ', currentUrl);

        return request(requestOption)
        .then(function(response, error) {
            if(response.statusCode !== 200) {
                console.log('Error fetch url: ', currentUrl);
            }
            console.log('Time elapsed for request ', currentUrl, '=> ', response.elapsedTime);
            responseTimes.push(response.elapsedTime);

            return responseTimes;
        });
    }, []);
};


console.log('Running chained promises');

var responseTimes = [];
returnLoopedPromise(urls, responseTimes)
.then(function success(result) {
    console.log('Successfully chained promises');
    console.log(result);
})
.catch(function(error) {
    console.log('Failed to chain promises. Error=> ', error.stack);
});

