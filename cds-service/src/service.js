/*jslint node: true */
"use strict";

var router = require("express").Router();
var bodyParser = require("body-parser");
var config = require('./config');
var pgx = require('./pgx');
var conditionCodes = pgx.getConditionCodes();
var nunjucks = require('nunjucks');

module.exports = router;

function getPatientName (pt) {
    if (pt.name) {
        var names = pt.name.map(function(name) {
            return name.given.join(" ") + " " + name.family.join(" ");
        });
        return names.join(" / ");
    } else {
        return "anonymous";
    }
}

router.post("/pgx", bodyParser.json({}), function(req, res) {
    var data = req.body || [];
    var cards = [];
    var problems = data.prefetch.problems.resource.entry;
    var patient = {name: getPatientName(data.prefetch.patient.resource)};

    //console.log(JSON.stringify(problems,null,"  "));

    var problemCodes = [];
    if (problems) {
        problemCodes = [].concat.apply([], problems.map(function (problem) {
            return problem.resource.code.coding.filter(function(coding){
                    return coding.system === "http://snomed.info/sct";
                }).map(function (coding) {
                    return coding.code;
                });
        }));
    }

    var medCodes = [].concat.apply([], data.context.filter(function(e){
            return e.resourceType === "MedicationOrder" && e.medicationCodeableConcept;
        }).map(function (med){
            return med.medicationCodeableConcept.coding.filter(function(e){
                    return e.system === "http://www.nlm.nih.gov/research/umls/rxnorm";
                }).map(function (coding) {
                    return coding.code;
                });
    }));

    problemCodes.forEach(function (problemCode){
        medCodes.forEach(function (medCode){
            var recommendation = pgx.getRecommendation(problemCode, medCode);
            if (recommendation) {
                cards.push ({
                    summary: recommendation.title,
                    detail: nunjucks.renderString(recommendation.message, {patient: patient}),
                    indicator: "warning"
                });
            }
        });
    });

    res.json({
       cards: cards
    });
});

router.get("/", function(req, res) {
    var patientQuery = "Patient/{{Patient.id}}";
    var problemsQuery = "Condition?patient={{Patient.id}}&code=";

    problemsQuery += encodeURIComponent(conditionCodes.map(function(code) {
        return "http://snomed.info/sct|" + code;
    }).join(","));

    res.json({
        services: [{
            hook: "medication-prescribe",
            name: "PGX Service",
            description: "CDS service that displays pharmacogenomics recommendations",
            id: "pgx",
            "prefetch": {
              "patient": patientQuery,
              "problems": problemsQuery
            }
        }]
    });
});
