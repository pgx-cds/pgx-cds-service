/*jslint node: true */
"use strict";

var request = require('request');
var data = require('./data');
//var diplotypes = data.diplotypes;
var ingredients_map = data.ingredients_map;
var recommendations = data.recommendations;

function match (e) {
    try {
        var res = e.resource.component[0];
        var code = res.code.coding[0].code;
        var value = res.valueCodeableConcept.coding[0].code;
        return code === "67271001" && value ===  "HGNC:12014";
    }   catch (err) {
       return false;
    }
 }

function pgxRecommendation (pid, rxnorm, callback) {
  var base ='http://pgx-fhir.smarthealthit.org:8080/baseDstu2';
  var url = base + '/Observation?patient=smart-' + pid + '&code=http%3A%2F%2Fsnomed.info%2Fsct%7C363779003';
  request({url:url, headers:{'accept':'application/json+fhir'}},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var e = data.entry.find(match);
            var diplotype = e && e.resource.valueString;
            //console.log("Diplotype", diplotype);
            //var diplotype = diplotypes[pid] && diplotypes[pid].tpmt;
            var cardinality = occurrences(diplotype, "*1");
            var ingredient = ingredients_map[rxnorm];
            callback(ingredient && recommendations[ingredient][cardinality]);
        }
    });
}

// used by NodeJS
module.exports = {
    pgxRecommendation: pgxRecommendation
};

// based on http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
