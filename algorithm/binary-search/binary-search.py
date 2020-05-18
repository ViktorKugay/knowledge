def binarySearchCount(arr, n, key): 
  
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

arr = [1, 2, 3, 4, 4, 4, 5, 6];

res = binarySearchCount(arr, len(arr), 4);

print(res)