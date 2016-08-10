/*jslint node: true */
"use strict";

/*
exports.recommendations = {
  // cardinality of *1 allele = [0, 1, 2]
  "1155002": { //Azathioprine
    "0": "Consider alternative agents. If using azathioprine start with drastically reduced doses (reduce daily dose by 10-fold and dose thrice weekly instead of daily) and adjust doses of azathioprine based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. Azathioprine is the likely cause of myelosuppression.",
    "1": 'If disease treatment normally starts at the "full dose", consider starting at 30-70% of target dose (e.g., 1-1.5 mg/kg/d), and titrate based on tolerance. Allow 2-4 weeks to reach steady state after each dose adjustment.',
    "2": "Start with normal starting dose (e.g., 2-3 mg/kg/d) and adjust doses of azathioprine based on disease-specific guidelines. Allow 2 weeks to reach steady state after each dose adjustment."
  },
  "1165711": { //mercaptopurine
    "0": "For malignancy, start with drastically reduced doses (reduce daily dose by 10-fold and reduce frequency to thrice weekly instead of daily, e.g., 10 mg/m2/d given just 3 days/week) and adjust doses of MP based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, emphasis should be on reducing mercaptopurine over other agents. For nonmalignant conditions, consider alternative nonthiopurine immunosuppressant therapy.",
    "1": "Start with reduced doses (start at 30-70% of full dose: e.g., at 50 mg/m2/d or 0.75 mg/kg/d) and adjust doses of MP based on degree of myelosuppression and disease-specific guidelines. Allow 2-4 weeks to reach steady state after each dose adjustment. In those who require a dosage reduction based on myelosuppression, the median dose may be ~40% lower (44 mg/m2) than that tolerated in wild-type patients (75 mg/m2). In setting of myelosuppression, and depending on other therapy, emphasis should be on reducing mercaptopurine over other agents.",
    "2": "Start with normal starting dose (e.g., 75 mg/m2/d or 1.5 mg/kg/d) and adjust doses of mercaptopurine (and of any other myelosuppressive therapy) without any special emphasis on mercaptopurine compared to other agents. Allow 2 weeks to reach steady state after each dose adjustment."
  },
  "1165527": { //Thioguanine
    "0": "Start with drastically reduced doses (reduce daily dose by 10-fold and dose thrice weekly instead of daily) and adjust doses of thioguanine based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, emphasis should be on reducing thioguanine over other agents. For nonmalignant conditions, consider alternative nonthiopurine immunosuppressant therapy.",
    "1": "Start with reduced doses (reduce by 30-50%) and adjust doses of thioguanine based on degree of myelosuppression and disease-specific guidelines. Allow 2-4 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, and depending on other therapy, emphasis should be on reducing thioguanine over other agents.",
    "2": "Start with normal starting dose. Adjust doses of thioguanine and of other myelosuppressive therapy without any special emphasis on thioguanine . Allow 2 weeks to reach steady state after each dose adjustment."
  }
};
*/

/*
var diplotypes = {
  // identifiers are patient IDs
  "1288992":{"tpmt":"*1/*1"},
  "1032702":{"tpmt":"*1/*2"},
  "1081332":{"tpmt":"*1/*3A"},
  "1098667":{"tpmt":"*1/*3B"},
  "1134281":{"tpmt":"*1/*3C"},
  "1137192":{"tpmt":"*1/*4"},
  "1157764":{"tpmt":"*2/*2"},
  "1186747":{"tpmt":"*2/*3A"},
  "1213208":{"tpmt":"*2/*3B"},
  "1272431":{"tpmt":"*2/*3C"},
  "1291938":{"tpmt":"*2/*4"},
  "1482713":{"tpmt":"*3A/*2"},
  "1520204":{"tpmt":"*3A/*3A"},
  "1540505":{"tpmt":"*3A/*3B"},
  "1551992":{"tpmt":"*3A/*3C"},
  "1557780":{"tpmt":"*3A/*4"},
  "1577780":{"tpmt":"*3B/*2"},
  "1614502":{"tpmt":"*3B/*3A"},
  "1627321":{"tpmt":"*3B/*3B"},
  "1642068":{"tpmt":"*3B/*3C"},
  "1685497":{"tpmt":"*3B/*4"},
  "1768562":{"tpmt":"*3C/*2"},
  "1796238":{"tpmt":"*3C/*3A"},
  "1869612":{"tpmt":"*3C/*3B"},
  "1951076":{"tpmt":"*3C/*3C"},
  "2004454":{"tpmt":"*3C/*4"},
  "2042917":{"tpmt":"*4/*2"},
  "2080416":{"tpmt":"*4/*3A"},
  "2081539":{"tpmt":"*4/*3B"},
  "2113340":{"tpmt":"*4/*3C"},
  "2169591":{"tpmt":"*4/*4"}
};

var ingredients = {
  // all identifiers are RXNorm codes
   "1155002": {
      "name": "Azathioprine",
      "variants": {
         "199310": "Azathioprine 25 MG",
         "197388": "Azathioprine 50 MG",
         "359229": "Azathioprine 75 MG",
         "359228": "Azathioprine 100 MG"
      }
   },
   "1165711": {
      "name": "mercaptopurine",
      "variants": {
         "199766": "mercaptopurine 10 MG",
         "197931": "mercaptopurine 50 MG"
      }
   },
   "1165527": {
      "name": "Thioguanine",
      "variants": {
         "198269": "Thioguanine 40 MG"
      }
   }
};

var ingredients_map = {
  // RXNorm codes
  "199310": "1155002",
  "197388": "1155002",
  "359229": "1155002",
  "359228": "1155002",
  "199766": "1165711",
  "197931": "1165711",
  "198269": "1165527"
};
*/
