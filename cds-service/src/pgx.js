/*jslint node: true */
"use strict";

var ingredients = require('../data/ingredients.json');
var rules = require('../data/rules.json');

function getRecommendation (condition, rxnorm) {
    //console.log(condition,rxnorm);
    var ingredient = ingredients[rxnorm] && ingredients[rxnorm].ingredient;
    var rec = rules["problem-snomed-code"][condition];
    var message = ingredient && rec && rec.rxnorm_interactions[ingredient].message;
    if (message) {
      return {title: rec.description, message: message};
    } else {
      return null;
    }
}

function getConditionCodes () {
    return Object.keys(rules["problem-snomed-code"]);
}

module.exports = {
    getRecommendation: getRecommendation,
    getConditionCodes: getConditionCodes
};
