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
    }
    // do not automatically start sorting
});

// Initial state
currentArray = generateArray();
renderArray(currentArray);
displayCode(bubbleSort);
