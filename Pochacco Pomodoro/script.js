// ==========================================
// 1. BAGIAN ATAS: AMBIL ELEMEN HTML
// ==========================================
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Ambil elemen baru untuk tombol mode & input custom
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBtn = document.getElementById('short-btn');
const longBtn = document.getElementById('long-btn');
const customInput = document.getElementById('custom-input');
const setTimeBtn = document.getElementById('set-time-btn');

// ==========================================
// 2. BAGIAN TENGAH: VARIABEL STATUS & DISPLAY
// ==========================================
let timerId = null;
let timeLeft = 50 * 60; // Waktu awal (50 menit)
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ==========================================
// 3. BAGIAN LOGIKA TOMBOL (START, RESET, MODES)
// ==========================================

// Tombol Start/Pause
startBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'start';
        isRunning = false;
    } else {
        isRunning = true;
        startBtn.textContent = 'pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                alert('Waktu habis! Istirahat dulu bareng Pochacco 🐶');
                resetTimer();
            }
        }, 1000);
    }
});

// Tombol Reset
function resetTimer() {
    clearInterval(timerId);
    timeLeft = 50 * 60;
    isRunning = false;
    startBtn.textContent = 'start';
    updateDisplay();
}
resetBtn.addEventListener('click', resetTimer);

// Tombol Pomodoro (50 Menit)
pomodoroBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'start';
    timeLeft = 50 * 60;
    updateDisplay();
    pomodoroBtn.classList.add('active');
    shortBtn.classList.remove('active');
    longBtn.classList.remove('active');
});

// Tombol Short Break (5 Menit)
shortBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'start';
    timeLeft = 5 * 60;
    updateDisplay();
    shortBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    longBtn.classList.remove('active');
});

// Tombol Long Break (15 Menit)
longBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'start';
    timeLeft = 15 * 60;
    updateDisplay();
    longBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    shortBtn.classList.remove('active');
});

// ==========================================
// 4. BAGIAN PALING BAWAH: FITUR CUSTOMIZE WAKTU
// ==========================================
setTimeBtn.addEventListener('click', () => {
    const inputMinutes = parseInt(customInput.value); 
    if (inputMinutes > 0) {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'start';
        timeLeft = inputMinutes * 60; 
        updateDisplay();
        
        // Matikan semua warna kuning di tombol mode biasa
        pomodoroBtn.classList.remove('active');
        shortBtn.classList.remove('active');
        longBtn.classList.remove('active');
        
        customInput.value = ''; // Kosongkan kotak teks
    } else {
        alert('Masukkan jumlah menit yang valid dulu ya! 🐶');
    }
});

// Jalankan display pertama kali
updateDisplay();