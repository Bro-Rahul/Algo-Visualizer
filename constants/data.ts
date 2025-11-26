
export const ArraysAlgorithmsPsudoCodes = {
    BubbleSort: `for i from 0 to Array.length - 1
    set swapped to false
    for j from 0 to Array.length - i - 1
      if Array[j] > Array[j + 1]
        swap Array[j] and Array[j + 1]
        set swapped to true
    if not swapped
        break // Array is sorted`,

    InsertionSort: `for i = 1 to N - 1
        insert_val = array[i]
        freePosition = i
        while freePosition > 0 and array[freePosition - 1] > insert_val
            array[freePosition] = array[freePosition - 1]
            freePosition = freePosition - 1
        array[freePosition] = insert_val`,

    SelectionSort: `for i = 0 to n - 2:
        min_index = i
        for j = i + 1 to n - 1:
            if array[j] < array[min_index]:
                min_index = j
        swap(array[i], array[min_index])   `
}

export const ArraysElementsDimentions = {
    width: 50,
    height: 50,
    gap: 5,
    roundedEdge: 8,
    strokeColor: "white",
    strokeWidth: 2,
    totalWidth: 55
};
