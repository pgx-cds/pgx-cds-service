/*jslint node: true */
"use strict";

var Q = require('q');
var fhir_js = require("../lib/fhir-node");
var ingredients = require('../data/ingredients.json');
var recommendations = require('../data/recommendations.json');
var config = require('./config');

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

// Converts sample patient ID to HAPI-compliant ID (hack)
function convertID (id) {
    return "smart-" + id;
}

function pgxRecommendation (pid, rxnorm) {
  var deferred = Q.defer();
  var conf = {
    baseUrl: config.FHIRBase,
    patient: convertID(pid)
  };
  var fhir = fhir_js(conf);
  fhir.search({type: 'Observation', query: {code: 'http://snomed.info/sct|363779003'}})
    .then(function(bundle){
      var e = bundle.data.entry.find(match);
      var diplotype = e && e.resource.valueString;
      var cardinality = occurrences(diplotype, "*1");
      var ingredient = ingredients[rxnorm].ingredient ;
      var result = ingredient && recommendations.rxnorm_interactions[ingredient].normal_alleles[cardinality];
      deferred.resolve(result);
    }, function(err) {
      deferred.reject(new Error(err));
    });
  return deferred.promise;
}

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
