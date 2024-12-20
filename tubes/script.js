// Array to store transactions
let transactions = [];

// Function to update the displayed list of transactions
function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = transactions
        .map(({ id, price }) => `<li>ID: ${id}, Price: ${price}</li>`)
        .join('');
}

// Recursive Insertion Sort Algorithm
function recursiveInsertionSort(arr, n = arr.length) {
    if (n <= 1) return;

    recursiveInsertionSort(arr, n - 1);

    const last = arr[n - 1];
    let j = n - 2;

    while (j >= 0 && arr[j].price > last.price) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}

// Cocktail Sort Algorithm
function cocktailSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end - 1; i++) {
            if (arr[i].price > arr[i + 1].price) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (arr[i].price > arr[i + 1].price) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        start++;
    }
}

// Function to generate random transactions
function generateRandomTransactions(count) {
    transactions = Array.from({ length: count }, () => ({
        id: Math.floor(Math.random() * 100) + 1,
        price: parseFloat((Math.random() * 10000000).toFixed(2)),
    }));
    updateTransactionList();
}

// Event: Add transaction to the list
document.getElementById('addTransactionBtn').addEventListener('click', () => {
    const idInput = document.getElementById('idInput');
    const priceInput = document.getElementById('priceInput');
    const id = parseInt(idInput.value, 10);
    const price = parseFloat(priceInput.value);

    if (!isNaN(id) && id > 0 && !isNaN(price) && price >= 0) {
        transactions.push({ id, price });
        updateTransactionList();
        idInput.value = '';
        priceInput.value = '';
        idInput.focus();
    } else {
        alert('Please enter a valid transaction ID and price!');
    }
});

// Event: Generate random transactions
document.getElementById('generateTransactionsBtn').addEventListener('click', () => {
    const countInput = document.getElementById('countInput');
    const count = parseInt(countInput.value, 10);

    if (!isNaN(count) && count > 0) {
        generateRandomTransactions(count);
    } else {
        alert('Please enter a valid number of transactions to generate!');
    }
});

// Event: Sort transactions and display results
document.getElementById('sortBtn').addEventListener('click', () => {
    if (transactions.length === 0) {
        alert('No transactions to sort. Please add some transactions first.');
        return;
    }

    const resultsDiv = document.getElementById('results');

    // Measure Recursive Insertion Sort time
    const startInsertion = performance.now();
    const sortedInsertion = [...transactions];
    recursiveInsertionSort(sortedInsertion);
    const endInsertion = performance.now();
    const timeInsertion = (endInsertion - startInsertion).toFixed(2);

    // Measure Cocktail Sort time
    const startCocktail = performance.now();
    const sortedCocktail = [...transactions];
    cocktailSort(sortedCocktail);
    const endCocktail = performance.now();
    const timeCocktail = (endCocktail - startCocktail).toFixed(2);

    // Display results
    const maxLength = Math.max(sortedInsertion.length, sortedCocktail.length);
    const combinedResults = Array.from({ length: maxLength }, (_, i) => {
        const left = sortedInsertion[i]
            ? `ID: ${sortedInsertion[i].id}, Price: ${sortedInsertion[i].price}`
            : '';
        const right = sortedCocktail[i]
            ? `ID: ${sortedCocktail[i].id}, Price: ${sortedCocktail[i].price}`
            : '';
        return `<tr><td>${left}</td><td>${right}</td></tr>`;
    }).join('');

    resultsDiv.innerHTML = `
        <h3>Sorted Results</h3>
        <table border="1">
            <thead>
                <tr><th>Insertion Sort</th><th>Cocktail Sort</th></tr>
            </thead>
            <tbody>
                ${combinedResults}
            </tbody>
        </table>
        <p>Insertion Sort Time: ${timeInsertion} ms</p>
        <p>Cocktail Sort Time: ${timeCocktail} ms</p>
    `;
});
