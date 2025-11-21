export const ArraysPsudoCodes = {
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
        array[freePosition] = insert_val`
}