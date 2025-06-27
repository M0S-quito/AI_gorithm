function generateArray(size = 20) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

let currentMode = 'sort';

function renderArray(arr, activeIndices=[], foundIndex=null) {
    const container = document.getElementById('visualization');
    container.className = 'visualization';
    container.innerHTML = '';
    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = value * 2 + 'px';
        if (currentMode === 'search') {
            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = value;
            bar.appendChild(label);
        }
        if (activeIndices.includes(index)) {
            bar.classList.add('active');
        }
        if (foundIndex !== null && index === foundIndex) {
            bar.classList.add('found');
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

let currentTree = [];
const treeOptions = {
    bfs: 'BFS Traversal',
    dfs: 'DFS Preorder'
};

function generateTree(size = 7) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

function buildTree(arr, index, activeIndices, foundIndex) {
    if (index >= arr.length) return null;
    const li = document.createElement('li');
    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = arr[index];
    if (activeIndices.includes(index)) node.classList.add('active');
    if (foundIndex !== null && index === foundIndex) node.classList.add('found');
    li.appendChild(node);
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < arr.length || right < arr.length) {
        const ul = document.createElement('ul');
        const leftChild = buildTree(arr, left, activeIndices, foundIndex);
        if (leftChild) ul.appendChild(leftChild);
        const rightChild = buildTree(arr, right, activeIndices, foundIndex);
        if (rightChild) ul.appendChild(rightChild);
        li.appendChild(ul);
    }
    return li;
}

function renderTree(arr, activeIndices = [], foundIndex = null) {
    const container = document.getElementById('visualization');
    container.className = 'visualization tree';
    container.innerHTML = '';
    if (arr.length === 0) return;
    const ul = document.createElement('ul');
    ul.appendChild(buildTree(arr, 0, activeIndices, foundIndex));
    container.appendChild(ul);
}

async function bfsTraversal(tree) {
    const queue = [0];
    while (queue.length > 0) {
        if (stopSort) return;
        const index = queue.shift();
        renderTree(tree, [index]);
        await sleep(500);
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        if (left < tree.length) queue.push(left);
        if (right < tree.length) queue.push(right);
    }
    renderTree(tree);
}

async function dfsPreorder(tree, index = 0) {
    if (stopSort || index >= tree.length) return;
    renderTree(tree, [index]);
    await sleep(500);
    await dfsPreorder(tree, 2 * index + 1);
    await dfsPreorder(tree, 2 * index + 2);
    if (index === 0) renderTree(tree);
}

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
            renderArray(arr, [], i);
            showResult(`Found at index ${i}`);
            return i;
        }
    }
    showResult('Not found');
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
            renderArray(arr, [], mid);
            showResult(`Found at index ${mid}`);
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    showResult('Not found');
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
    currentMode = mode;
    const algorithm = document.getElementById('algorithm-select').value;
    showResult('');
    currentArray = generateArray();
    if (mode === 'search' && algorithm === 'binary') {
        currentArray.sort((a, b) => a - b);
    }
    if (mode === 'tree') {
        currentTree = generateTree();
        renderTree(currentTree);
    } else {
        renderArray(currentArray);
    }
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
    } else if (mode === 'tree') {
        if (algorithm === 'bfs') {
            bfsTraversal(currentTree);
            displayCode(bfsTraversal);
        } else if (algorithm === 'dfs') {
            dfsPreorder(currentTree);
            displayCode(dfsPreorder);
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

function showResult(message) {
    const div = document.getElementById('result');
    if (div) {
        div.textContent = message;
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
    } else if (mode === 'tree') {
        if (val === 'bfs') {
            displayCode(bfsTraversal);
        } else if (val === 'dfs') {
            displayCode(dfsPreorder);
        }
    }
    // do not automatically start sorting
});

function updateAlgorithmOptions(mode) {
    currentMode = mode;
    const select = document.getElementById('algorithm-select');
    select.innerHTML = '';
    const options = mode === 'sort' ? sortOptions : mode === 'search' ? searchOptions : treeOptions;
    Object.entries(options).forEach(([value, text]) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    });
    if (mode === 'sort') {
        displayCode(bubbleSort);
    } else if (mode === 'search') {
        displayCode(linearSearch);
    } else {
        displayCode(bfsTraversal);
    }
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
