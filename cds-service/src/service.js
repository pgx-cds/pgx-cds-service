/*jslint node: true */
"use strict";

var Q = require('q');
var router = require("express").Router();
var bodyParser = require("body-parser");
var config = require('./config');
var pgxRecommendation = require('./pgx').pgxRecommendation;

module.exports = router;

router.post("/pgx", bodyParser.json({}), function(req, res) {
    var data = req.body || [];
    var cards = [];
    var pid = data.patient;
    var def = Q.defer();
    def.resolve();
    def = def.promise;

    //console.log(JSON.stringify(data,null,"  "));

    data.context.filter(function(e){
        return e.resourceType === "MedicationOrder" && e.medicationCodeableConcept;
    }).forEach(function (med){
        var rxnorm = med.medicationCodeableConcept.coding.find(function(e){
                return e.system === "http://www.nlm.nih.gov/research/umls/rxnorm";
            }).code;
        def = def.then(function(){
            var deferred = Q.defer();
            pgxRecommendation(pid, rxnorm).then(function (recommendation) {
                if (recommendation) {
                    cards.push ({
                        summary: "PGX Recommendation",
                        detail: recommendation,
                        indicator: "info"
                    });
                }
                deferred.resolve();
            });
            return deferred.promise;
        });
    });

    def.then(function(){
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
