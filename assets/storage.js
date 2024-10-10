const CACHE_KEY = 'calculation-history';

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
    if(checkForStorage()) {
        let historyData = null;
        if(localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if(historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));  // Perbaiki kesalahan pengetikan
    }
}


function showHistory() {
    if(checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];

    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector('#historyList');

    historyList.innerHTML = ''; // Kosongkan daftar riwayat sebelumnya

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${history.firstNumber}</td>
            <td>${history.operator}</td>
            <td>${history.secondNumber}</td>
            <td>${history.result}</td>
        `; // Tampilkan semua nilai sebagai angka

        historyList.appendChild(row); // Tambahkan baris ke tabel
    }
}



renderHistory();