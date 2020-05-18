from math import log

soot = [[2, 2, 1], 
        [5, 4, 1], 
        [1, 2, 0], 
        [3, 2, 1], 
        [5, 2, 1], 
        [5, 4, 2], 
        [6, 4, 3], 
        [9, 3, 2], 
        [2, 3, 0]]


def comp(x):
    n = int(10e100)
    ab = log(x[0], x[1])
    d = x[2]
    
    if d > ab:
        return n ** x[2]
    elif d == ab:
        return n ** x[2] * log(n)
    else:
        return n ** ab
        
          
res = sorted(soot, key=comp)
print(res)
