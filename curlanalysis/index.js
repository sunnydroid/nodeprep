var request = require('request');

var MAX_TIME = 100;
var MAX_CALLS = 1000;

var configUrls =  {
    ycs: 'http://l.yimg.com/ep/blendr/lc/td-app-functest.json',
    mobstor: 'http://epsolution.zenfs.com/blendr/lc/td-app-functest.json'
};

var queue = [];
var responseTimes = [];

var stats = {};

/**
 * Make HTTP request to 
 * @param  {Function} callback [description]
 * @param  {[type]}   url      [description]
 * @return {[type]}            [description]
 */
function makeRequest(url, cb) {
    var requestOptions = {
        url: url
    };

    var start = new Date();
    request.get(requestOptions, function(error, response, body) {
        var end = new Date();
        var result = {
            responseTime: end - start
        };

        if(error) {
            var resultError = {};
            if(error.connect) {
                resultError.connectTimeout = true;
            } else {
                resultError.readTimeout = true;
            }
            result.error = resultError;
        }

        cb(result, url);
    });
}

function makeRequestRecursive(url, count) {
    var requestOptions = {
        url: url
    };

    var start = new Date();
    request.get(requestOptions, function(error, response, body) {
        var end = new Date();
        var responseTime =  end - start;

        if(error) {
            if(error.connect) {
                console.log('********* error fetching url: ', url, ' => connection timeout');
            } else {
                console.log('********* error fetching url: ', url, ' => read timeout');
            }
        } else {
            if(responseTime > MAX_TIME) {
                console.log('call # ', count, ' exceeded ', MAX_TIME, ' ms');
                addToPriorityQueue(responseTime);
            }
            console.log('call to : ', url, ' => response time: ', responseTime);
        }

        responseTimes.push(responseTime);

        if(count > 0) {
            makeRequestRecursive(url, --count);
        } else {
            console.log('Total number of times response exceeding 100 ms: ', queue.length);
            console.log('max response time: ', getMax());

            var combinedResponseTimes = responseTimes.reduce(function(a, b) {
                return a+b;
            });

            console.log('average response time: ', combinedResponseTimes/MAX_CALLS);
        }

    });
}

function addToPriorityQueue(responseTime) {
    if(responseTime > getMax()) {
        queue.unshift(responseTime);
    } else {
        queue.push(responseTime);
    }
}

function getMax() {
    return queue[0];
}

function analyzeResult(result, url) {
    console.log('call to :', url, ' => responseTime: ' , result.responseTime);
    if(result && result.error) {
        if(result.error.connectTimeout) {            
            console.log('********* error fetching url: ', url, ' => connection timeout');
        }
        if(result.error.readTimeout) {
            console.log('********* error fetching url: ', url, ' => read timeout');

        }
    }
}

function runTest() {

    makeRequestRecursive(configUrls.ycs, MAX_CALLS);

    // for(var i = 0; i < MAX_CALLS; i++) {
    //     makeRequest(configUrls.mobstor, analyzeResult);
    // }
}

runTest();