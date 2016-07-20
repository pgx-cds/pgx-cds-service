/*jslint node: true */
"use strict";

var router = require("express").Router();
var bodyParser = require("body-parser");
var config = require('./config');
var pgxRecommendation = require('./pgx').pgxRecommendation;

module.exports = router;

router.post("/pgx", bodyParser.json({}), function(req, res) {
    var data = req.body || [];

    // TODO: Make this more robust (multiple contexts, multiple meds, coding systems, etc)
    var pid = data.patient;
    //console.log(JSON.stringify(data,null,"  "));
    var rxnorm = data.context[0].medicationCodeableConcept && data.context[0].medicationCodeableConcept.coding[0].code;

    pgxRecommendation(pid, rxnorm, function (recommendation) {
        var cards = [];
        if (recommendation) {
            cards.push ({
                summary: "PGX Recommendation",
                detail: recommendation,
                indicator: "info"
            });
        }
        res.json({
           cards: cards
        });
    });
});

router.get("/", function(req, res) {
    res.json({
        services: [{
            hook: "medication-prescribe",
            name: "PGX Service",
            description: "CDS service that displays pharmacogenomics recommendations",
            id: "pgx"
        }]
    });
});
