/*jslint node: true */
"use strict";

var ingredients = require('../data/ingredients.json');
var recommendations = require('../data/recommendations.json');

function pgxRecommendation (condition, rxnorm) {
    //console.log(condition,rxnorm);
    var ingredient = ingredients[rxnorm] && ingredients[rxnorm].ingredient;
    var rec = recommendations["problem-snomed-code"][condition];
    var message = ingredient && rec && rec.rxnorm_interactions[ingredient].message;
    if (message) {
      return {title: rec.description, message: message};
    } else {
      return null;
    }
}

module.exports = {
    pgxRecommendation: pgxRecommendation
};
