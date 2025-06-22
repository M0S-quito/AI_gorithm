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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startVisualization() {
    stopSort = true;
    await sleep(0); // allow any running sort to terminate
    stopSort = false;
    const algorithm = document.getElementById('algorithm-select').value;
    currentArray = generateArray();
    renderArray(currentArray);
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
    const val = e.target.value;
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
    // do not automatically start sorting
});

// Initial state
currentArray = generateArray();
renderArray(currentArray);
displayCode(bubbleSort);
