def quickSort_inplace(array: list, begin: int, end: int) -> list:
    end = len(array) - 1

    def partition(array: list, begin: int, end: int) -> int:
        pivot = begin
        for i in range(begin + 1 , end + 1):
            if array[i] <= array[begin]:
                pivot += 1
                array[i], array[pivot] = array[pivot], array[i]
        array[pivot], array[begin] = array[begin], array[pivot]
        return pivot

    def _quickSort(array, begin, end):
        if begin >= end:
            return
        pivot = partition(array, begin, end)
        _quickSort(array, begin, pivot - 1)
        _quickSort(array, pivot + 1, end)
    
    return _quickSort(array,begin, end)


def quickSort(array: list, pivot: int) -> list:
    if len(array) <= 1:
        return array
        
    pivot_elem = array[pivot]
    if pivot != 0:
        array[pivot] = array[0]
        array[0] = pivot_elem

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