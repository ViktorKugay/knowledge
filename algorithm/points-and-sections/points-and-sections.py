# В первой строке задано два целых числа n и m количество отрезков и точек на прямой, соответственно. Следующие n строк содержат по два целых числа — координаты концов отрезков. Последняя строка содержит mm целых чисел — координаты точек.
# Точка считается принадлежащей отрезку, если она находится внутри него или на границе. Для каждой точки в порядке появления во вводе выведите, скольким отрезкам она принадлежит.

import sys
from bisect import bisect 
from bisect import bisect_right

def func0(i): 
    return i[0]

def func1(i): 
    return i[1]

def main():
    reader = (list(map(int, line.split())) for line in sys.stdin)
    [sectionsCount, pointsCount] = next(reader)
    l = list(reader)
    sections = l[:sectionsCount]
    points = l[sectionsCount]
    res = [None] * len(points)
    
    x = sorted(list(map(func0, sections)))
    y = sorted(list(map(func1, sections)))
    
    index = 0
    for point in points:
        n = binarySearchCount1(x, len(x), int(point))
        m = binarySearchCount2(y, len(y), int(point))
        res[index] = n - m
        index += 1
    
    print(" ".join(map(str, res)))
    

def binarySearchCount1(arr, n, key): 
  
    left = 0
    right = n - 1
  
    count = 0
  
    while (left <= right):  
        mid = int((right + left) / 2) 
  
        # Check if middle element is 
        # less than or equal to key 
        if (arr[mid] <= key):  
  
            # At least (mid + 1) elements are there 
            # whose values are less than 
            # or equal to key 
            count = mid + 1
            left = mid + 1
          
        # If key is smaller, ignore right half 
        else: 
            right = mid - 1
      
    return count 

def binarySearchCount2(arr, n, key): 
  
    left = 0
    right = n - 1
  
    count = 0
  
    while (left <= right):  
        mid = int((right + left) / 2) 
  
        # Check if middle element is 
        # less than or equal to key 
        if (arr[mid] < key):  
  
            # At least (mid + 1) elements are there 
            # whose values are less than 
            # or equal to key 
            count = mid + 1
            left = mid + 1
          
        # If key is smaller, ignore right half 
        else: 
            right = mid - 1
      
    return count 
    
main()