/*jslint node: true */
"use strict";

var data = require('./data');

var diplotypes = data.diplotypes;
var ingredients_map = data.ingredients_map;
var recommendations = data.recommendations;

function getPgxRecommendation (pid, rxnorm) {
  var diplotype = diplotypes[pid] && diplotypes[pid].tpmt;
  var cardinality = occurrences(diplotype, "*1");
  var ingredient = ingredients_map[rxnorm];
  return ingredient && recommendations[ingredient][cardinality];
}

// used by NodeJS
module.exports = {
    getPgxRecommendation: getPgxRecommendation
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
