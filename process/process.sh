#!/bin/bash
python rxprocess.py recommendations.json > ingredients.json
echo Read data from recommendations.json
echo Wrote output to ingredients.json
