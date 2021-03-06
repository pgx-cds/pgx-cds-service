// Generated by CoffeeScript 1.9.3
(function() {
    var request = require('request');
    var mkFhir = require('./fhir');
    var Q = require('q');

    var adapter = {
        defer: Q.defer,
        http: function(args) {
            var deff = Q.defer();
            args.body = args.data;
            args.json = true;
            if(args.debug){
                console.log('DEBUG[node]: (request)', args);
            }
            var options = {
                        headers: args.headers,
                        method: args.method,
                        url: args.url,
                        params: args.params,
                        body: args.body,
                        json: args.json };

            request(options, function(err, response, body) {
                if (err || response.statusCode > 399) {deff.reject(err || resp); return;}
                var headers = function(x) {return response.headers[x.toLowerCase()];};
                var resp = {data: body, status: response.statusCode, headers: headers, config: args};
                if(args.debug){
                    console.log('DEBUG[node]: (response)', resp);
                }
                deff.resolve(resp);
            }) ;
            return deff.promise;
        }
    };

    module.exports = function(config) {
        return mkFhir(config, adapter);
    };

}).call(this);
