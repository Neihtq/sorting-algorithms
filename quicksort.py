def quickSort_inPlace(array: list):
    def _quickSort(array, fst, lst):
        if fst >= lst:
            return
        pivot = array[lst]
        i, j = fst, lst
        while i <= j:
            while array[i] < pivot: i += 1
            while array[j] > pivot: j -= 1
            if i <= j:
                array[i], array[j] = array[j], array[i]
                i += 1
                j -= 1
        _quickSort(array, fst, j)
        _quickSort(array, i, lst)
    _quickSort(array, 0, len(array)-1)

def quickSort(array: list) -> list:
    if len(array) <= 1:
        return array
        
    pivot_elem = array[0]
    less = []
    equal = []
    greater = []

    for elem in array:
        if elem < pivot_elem:
            less.append(elem)
        if elem == pivot_elem:
            equal.append(elem)
        if elem > pivot_elem:
            greater.append(elem)
    
    return quickSort(less) + equal + quickSort(greater)

