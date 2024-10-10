const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    // Pastikan jika displayNumber adalah '' (kosong), kita atur ke '0'
    if (calculator.displayNumber === '') {
        calculator.displayNumber = '0';
    }
    document.querySelector(".calc-typed").innerText = calculator.displayNumber;
}
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function deleteLastCharacter() {
    if (calculator.displayNumber.length === 1) {
        calculator.displayNumber = '0'; // Jika hanya ada satu karakter, setel kembali ke '0'
    } else {
        calculator.displayNumber = calculator.displayNumber.slice(0, -1); // Hapus karakter terakhir
    }
}

// Tambahkan event listener untuk tombol backspace
document.querySelector('.button.backspace').addEventListener('click', function() {
    deleteLastCharacter();
    updateDisplay();
});


function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        // Jika tombol clear ditekan
        if (target.innerText === 'C') {
            clearCalculator();
            updateDisplay();
            return;
        }

        // Input digit angka
        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// Tambahkan event listener untuk tombol inverse atau negatif
document.querySelector('.button.inverse').addEventListener('click', function() {
    inverseNumber();
    updateDisplay();
});

function updateOperationDisplay() {
    // Update tampilan operasi yang sedang berjalan
    document.querySelector(".calc-operation").innerText = 
        `${calculator.firstNumber || ''} ${calculator.operator || ''} ${calculator.waitingForSecondNumber ? '' : calculator.displayNumber || ''}`;
}

function handleOperator(operator) {
    // Cegah pengguna memasukkan operator lagi jika sudah ada
    if (calculator.operator !== null && calculator.waitingForSecondNumber) {
        alert('Operator sudah ditetapkan');
        return;
    }

    // Set operator dan angka pertama
    calculator.operator = operator;
    calculator.firstNumber = calculator.displayNumber; // Ini adalah angka pertama yang disimpan
    calculator.waitingForSecondNumber = true;
    calculator.displayNumber = '0'; // Reset tampilan untuk angka kedua
}


document.querySelectorAll('.button.operator').forEach(button => {
    button.addEventListener('click', function(event) {
        handleOperator(event.target.innerText);
        updateDisplay();
    });
});

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        return;
    }

    let result = 0;
    const firstNumber = parseFloat(calculator.firstNumber); // Konversi ke angka
    const secondNumber = parseFloat(calculator.displayNumber); // Konversi ke angka

    if (calculator.operator === '+') {
        result = firstNumber + secondNumber;
    } else if (calculator.operator === '−') {
        result = firstNumber - secondNumber;
    } else if (calculator.operator === 'x') {
        result = firstNumber * secondNumber;
    } else if (calculator.operator === '/') {
        result = firstNumber / secondNumber;
    }

    // Simpan riwayat perhitungan dengan nilai numerik
    const history = {
        firstNumber: firstNumber, // Pastikan ini adalah angka
        secondNumber: secondNumber, // Pastikan ini adalah angka
        operator: calculator.operator,
        result: result // Hasil juga harus angka
    };

    putHistory(history);  // Simpan riwayat ke local storage
    renderHistory();  // Tampilkan riwayat di tabel

    calculator.displayNumber = result.toString();
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
    calculator.firstNumber = null;

    updateOperationDisplay();  // Update tampilan operasi setelah perhitungan selesai
}

document.querySelector('.button.equals').addEventListener('click', function() {
    performCalculation();
    updateDisplay();
    updateOperationDisplay();  
});
