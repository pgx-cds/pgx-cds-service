import sys
import json

from umls.rxnorm import RxNorm, RxNormLookup

RxNorm.check_database()

filename = sys.argv[1] if len(sys.argv) == 2 else None
if filename is None:
  print('Provide filename as arguments on the command line')
  sys.exit(0)

with open(filename) as data_file:
    data = json.load(data_file)

rxcuis = data['rxnorm_interactions'].keys()

look = RxNormLookup()
res = {}

for rxcui in rxcuis:
  name = look.lookup_rxcui_name(rxcui, preferred=False)
  related = look.lookup_related(rxcui)

  for rrxcui, rrela in sorted(related, key=lambda x: x[1]):
    rname, rtty, a, b = look.lookup_rxcui(rrxcui)
    if rrela == "inverse_isa" and rtty == "SCD":
      res[rrxcui] = {'name':rname, 'ingredient':rxcui}

print (json.dumps(res, sort_keys=True, indent=4))
