#!/bin/bash

python rxprocess.py ../cds-service/data/recommendations.json > ../cds-service/data/ingredients.json
echo Read data from recommendations.json
echo Wrote output to ingredients.json
