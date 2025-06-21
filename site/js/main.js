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

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            renderArray(arr, [j, j + 1]);
            await sleep(200);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    renderArray(arr);
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            renderArray(arr, [j, i]);
            await sleep(200);
            j--;
        }
        arr[j + 1] = key;
    }
    renderArray(arr);
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            renderArray(arr, [minIndex, j]);
            await sleep(200);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    renderArray(arr);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startVisualization() {
    const algorithm = document.getElementById('algorithm-select').value;
    const arr = generateArray();
    renderArray(arr);
    if (algorithm === 'bubble') {
        bubbleSort(arr);
        displayCode(bubbleSort);
    } else if (algorithm === 'insertion') {
        insertionSort(arr);
        displayCode(insertionSort);
    } else if (algorithm === 'selection') {
        selectionSort(arr);
        displayCode(selectionSort);
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
    const val = e.target.value;
    if (val === 'bubble') {
        displayCode(bubbleSort);
    } else if (val === 'insertion') {
        displayCode(insertionSort);
    } else if (val === 'selection') {
        displayCode(selectionSort);
    }
});

// Initial state
renderArray(generateArray());
displayCode(bubbleSort);
