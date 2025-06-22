function generateArray(size = 20) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

function renderArray(arr, activeIndices=[]) {
    const container = document.getElementById('visualization');
    container.innerHTML = '';
    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = value * 2 + 'px';
        if (activeIndices.includes(index)) {
            bar.classList.add('active');
        }
        container.appendChild(bar);
    });
}

let stopSort = false;
let currentArray = [];
const sortOptions = {
    bubble: 'Bubble Sort',
    insertion: 'Insertion Sort',
    selection: 'Selection Sort',
    quick: 'Quick Sort',
    merge: 'Merge Sort',
    heap: 'Heap Sort'
};

const searchOptions = {
    linear: 'Linear Search',
    binary: 'Binary Search'
};

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (stopSort) return;
            renderArray(arr, [j, j + 1]);
            await sleep(200);
            if (stopSort) return;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    if (!stopSort) {
        renderArray(arr);
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            if (stopSort) return;
            arr[j + 1] = arr[j];
            renderArray(arr, [j, i]);
            await sleep(200);
            if (stopSort) return;
            j--;
        }
        arr[j + 1] = key;
    }
    if (!stopSort) {
        renderArray(arr);
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (stopSort) return;
            renderArray(arr, [minIndex, j]);
            await sleep(200);
            if (stopSort) return;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    if (!stopSort) {
        renderArray(arr);
    }
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (stopSort) return;
    if (left >= right) {
        return;
    }
    const pivotIndex = await partition(arr, left, right);
    await quickSort(arr, left, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, right);
    if (!stopSort && left === 0 && right === arr.length - 1) {
        renderArray(arr);
    }
}

async function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (stopSort) return;
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
        renderArray(arr, [k - 1]);
        await sleep(200);
    }
    while (i < leftArr.length) {
        if (stopSort) return;
        arr[k++] = leftArr[i++];
        renderArray(arr, [k - 1]);
        await sleep(200);
    }
    while (j < rightArr.length) {
        if (stopSort) return;
        arr[k++] = rightArr[j++];
        renderArray(arr, [k - 1]);
        await sleep(200);
    }
}

async function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (stopSort) return;
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
    if (!stopSort && left === 0 && right === arr.length - 1) {
        renderArray(arr);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        if (stopSort) return;
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        renderArray(arr, [i, largest]);
        await sleep(200);
        await heapify(arr, n, largest);
    }
}

async function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
        if (stopSort) return;
    }
    for (let i = n - 1; i > 0; i--) {
        if (stopSort) return;
        [arr[0], arr[i]] = [arr[i], arr[0]];
        renderArray(arr, [0, i]);
        await sleep(200);
        await heapify(arr, i, 0);
    }
    if (!stopSort) {
        renderArray(arr);
    }
}

async function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (stopSort) return i;
        renderArray(arr, [j, right, i]);
        await sleep(200);
        if (stopSort) return i;
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    renderArray(arr);
    await sleep(200);
    return i;
}

async function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (stopSort) return -1;
        renderArray(arr, [i]);
        await sleep(200);
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

async function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        if (stopSort) return -1;
        const mid = Math.floor((left + right) / 2);
        renderArray(arr, [mid]);
        await sleep(200);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startVisualization() {
    stopSort = true;
    await sleep(0); // allow any running sort to terminate
    stopSort = false;
    const mode = document.getElementById('mode-select').value;
    const algorithm = document.getElementById('algorithm-select').value;
    currentArray = generateArray();
    if (mode === 'search' && algorithm === 'binary') {
        currentArray.sort((a, b) => a - b);
    }
    renderArray(currentArray);
    if (mode === 'sort') {
        if (algorithm === 'bubble') {
            bubbleSort(currentArray);
            displayCode(bubbleSort);
        } else if (algorithm === 'insertion') {
            insertionSort(currentArray);
            displayCode(insertionSort);
        } else if (algorithm === 'selection') {
            selectionSort(currentArray);
            displayCode(selectionSort);
        } else if (algorithm === 'quick') {
            quickSort(currentArray);
            displayCode(quickSort);
        } else if (algorithm === 'merge') {
            mergeSort(currentArray);
            displayCode(mergeSort);
        } else if (algorithm === 'heap') {
            heapSort(currentArray);
            displayCode(heapSort);
        }
    } else if (mode === 'search') {
        const target = parseInt(document.getElementById('search-target').value, 10);
        if (isNaN(target)) {
            alert('Enter a target value');
            return;
        }
        if (algorithm === 'linear') {
            linearSearch(currentArray, target);
            displayCode(linearSearch);
        } else if (algorithm === 'binary') {
            binarySearch(currentArray, target);
            displayCode(binarySearch);
        }
    }
}

document.getElementById('start-btn').addEventListener('click', startVisualization);

function displayCode(fn) {
    const pre = document.getElementById('code-display');
    if (pre) {
        pre.textContent = fn.toString();
    }
}

document.getElementById('algorithm-select').addEventListener('change', (e) => {
    stopSort = true; // stop any running sort
    const mode = document.getElementById('mode-select').value;
    const val = e.target.value;
    if (mode === 'sort') {
        if (val === 'bubble') {
            displayCode(bubbleSort);
        } else if (val === 'insertion') {
            displayCode(insertionSort);
        } else if (val === 'selection') {
            displayCode(selectionSort);
        } else if (val === 'quick') {
            displayCode(quickSort);
        } else if (val === 'merge') {
            displayCode(mergeSort);
        } else if (val === 'heap') {
            displayCode(heapSort);
        }
    } else if (mode === 'search') {
        if (val === 'linear') {
            displayCode(linearSearch);
        } else if (val === 'binary') {
            displayCode(binarySearch);
        }
    }
    // do not automatically start sorting
});

function updateAlgorithmOptions(mode) {
    const select = document.getElementById('algorithm-select');
    select.innerHTML = '';
    const options = mode === 'sort' ? sortOptions : searchOptions;
    Object.entries(options).forEach(([value, text]) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    });
    displayCode(mode === 'sort' ? bubbleSort : linearSearch);
    document.getElementById('search-target').style.display = mode === 'search' ? 'inline-block' : 'none';
}

document.getElementById('mode-select').addEventListener('change', (e) => {
    stopSort = true;
    updateAlgorithmOptions(e.target.value);
});

// Initial state
updateAlgorithmOptions('sort');
currentArray = generateArray();
renderArray(currentArray);
