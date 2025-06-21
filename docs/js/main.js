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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startVisualization() {
    const algorithm = document.getElementById('algorithm-select').value;
    const arr = generateArray();
    renderArray(arr);
    if (algorithm === 'bubble') {
        bubbleSort(arr);
    }
}

document.getElementById('start-btn').addEventListener('click', startVisualization);

// Initial state
renderArray(generateArray());
