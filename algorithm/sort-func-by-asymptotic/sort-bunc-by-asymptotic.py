import math
import json

n=100000

fd = dict()

fd['log5n'] = math.log(n, 5);
fd['nlog2n'] = n * math.log(n, 2)
fd['?n'] = math.sqrt(n);
fd['n^3'] = n ** 3
fd['n^0.3'] = n ** 0.3
fd['4^n'] = 4 ** n
fd['n(log2n)3'] = n * (math.log(n, 2)) ** 3

def sort(d):
  res = sorted(d.items(), key=lambda x: x[1]);
  for x in res:
    print(x[0])

sort(fd);