// --- UPDATE CONFIGURATION ---
// Reemplaza esta URL con la ruta cruda de tu archivo en GitHub:
// ej: "https://raw.githubusercontent.com/TU_USUARIO/Ciserli-control/main/update.json"
const UPDATE_CONFIG_URL = "https://raw.githubusercontent.com/sergiodhernandez/Ciserli-control/main/update.json";

// --- STATE MANAGEMENT ---
let appState = {
    settings: {
        cycleLength: 28,
        periodLength: 5
    },
    logs: {},      // Format: { "YYYY-MM-DD": { flow: 'light'|'medium'|'heavy'|'none', symptoms: [], mood: '', notes: '' } }
    cycles: []     // Format: [ { startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD", manual: boolean } ]
};

// Current view state
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0-11
let selectedDateStr = "";

// UI Elements
const els = {
    tabs: document.querySelectorAll('.nav-tab'),
    sections: document.querySelectorAll('.app-section'),
    cycleDayLabel: document.getElementById('cycle-day-label'),
    cyclePhaseLabel: document.getElementById('cycle-phase-label'),
    countdownText: document.getElementById('countdown-text'),
    fertilityStatus: document.getElementById('fertility-status'),
    statusRing: document.querySelector('.status-ring'),
    ringFill: document.querySelector('.ring-fill'),
    btnTogglePeriod: document.getElementById('btn-toggle-period'),
    togglePeriodText: document.getElementById('toggle-period-text'),
    btnLogSymptoms: document.getElementById('btn-log-symptoms'),
    summaryAvgCycle: document.getElementById('summary-avg-cycle'),
    summaryAvgPeriod: document.getElementById('summary-avg-period'),
    summaryNextDate: document.getElementById('summary-next-date'),
    
    // Calendar
    calendarTitle: document.getElementById('calendar-title'),
    calendarDays: document.getElementById('calendar-days'),
    btnPrevMonth: document.getElementById('btn-prev-month'),
    btnNextMonth: document.getElementById('btn-next-month'),
    
    // History
    historyList: document.getElementById('history-list'),
    
    // Settings
    inputCycleLength: document.getElementById('input-cycle-length'),
    inputPeriodLength: document.getElementById('input-period-length'),
    btnSaveSettings: document.getElementById('btn-save-settings'),
    btnExport: document.getElementById('btn-export'),
    fileImport: document.getElementById('file-import'),
    btnResetData: document.getElementById('btn-reset-data'),
    btnCheckUpdate: document.getElementById('btn-check-update'),
    
    // Log Modal
    logModal: document.getElementById('log-modal'),
    modalDatePicker: document.getElementById('modal-date-picker'),
    flowButtons: document.querySelectorAll('.flow-btn'),
    symptomCheckboxes: document.querySelectorAll('input[name="symptom"]'),
    moodRadios: document.querySelectorAll('input[name="mood"]'),
    modalNotes: document.getElementById('modal-notes'),
    btnSaveLog: document.getElementById('btn-save-log'),
    btnDeleteLog: document.getElementById('btn-delete-log'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    
    // Toast
    toast: document.getElementById('toast-notification'),

    // Mirror
    mirrorVideo: document.getElementById('mirror-video'),
    mirrorPlaceholder: document.getElementById('mirror-placeholder'),
    btnToggleMirror: document.getElementById('btn-toggle-mirror'),
    mirrorRingLight: document.getElementById('mirror-ring-light'),
    ringButtons: document.querySelectorAll('.ring-btn')
};

// --- TIMEZONE-SAFE DATE UTILITIES ---
function getTodayLocalDateStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function formatLocalDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function addDays(dateStr, days) {
    const date = parseLocalDate(dateStr);
    date.setDate(date.getDate() + days);
    return formatLocalDate(date);
}

function diffDays(dateStr1, dateStr2) {
    const d1 = parseLocalDate(dateStr1);
    const d2 = parseLocalDate(dateStr2);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function getMonthName(monthIndex) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthIndex];
}

function formatDateSpanish(dateStr) {
    const date = parseLocalDate(dateStr);
    const day = date.getDate();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    return `${day} de ${month}, ${year}`;
}

function isPeriodActiveOnDate(dateStr) {
    if (appState.cycles.length === 0) return false;
    const lastCycle = appState.cycles[0];
    const daysSinceStart = diffDays(lastCycle.startDate, dateStr);
    
    if (daysSinceStart < 0) return false;
    
    if (dateStr <= lastCycle.endDate) {
        return true;
    }
    
    const defaultLength = appState.settings.periodLength;
    if (daysSinceStart < defaultLength) {
        for (let i = 1; i <= daysSinceStart; i++) {
            const checkDate = addDays(lastCycle.startDate, i);
            if (appState.logs[checkDate] && appState.logs[checkDate].flow === 'none') {
                return false;
            }
        }
        return true;
    }
    
    return false;
}

// --- LOCAL STORAGE & DATA STATE ---
function loadState() {
    try {
        const savedSettings = localStorage.getItem('luna_settings');
        const savedLogs = localStorage.getItem('luna_logs');
        const savedCycles = localStorage.getItem('luna_cycles');
        
        if (savedSettings) appState.settings = JSON.parse(savedSettings);
        if (savedLogs) appState.logs = JSON.parse(savedLogs);
        if (savedCycles) appState.cycles = JSON.parse(savedCycles);
    } catch (e) {
        console.error("localStorage reading failed:", e);
    }
    
    // Auto-update cycles based on logged flow if clean
    try {
        rebuildCyclesFromLogs(false);
    } catch (e) {
        console.error("rebuildCyclesFromLogs failed:", e);
    }
}

function saveState() {
    try {
        localStorage.setItem('luna_settings', JSON.stringify(appState.settings));
        localStorage.setItem('luna_logs', JSON.stringify(appState.logs));
        localStorage.setItem('luna_cycles', JSON.stringify(appState.cycles));
    } catch (e) {
        console.error("localStorage writing failed:", e);
    }
}// Rebuild cycles list from symptom logs where flow is registered
function rebuildCyclesFromLogs(triggerSave = true) {
    // 1. Gather all logged dates with active flow
    const flowDates = Object.keys(appState.logs)
        .filter(dateStr => appState.logs[dateStr].flow && appState.logs[dateStr].flow !== 'none')
        .sort();
        
    if (flowDates.length === 0) {
        if (triggerSave) {
            appState.cycles = [];
            saveState();
        }
        return;
    }
    
    // 2. Group contiguous dates (allow a gap of up to 3 days for light spotting / uneven flow)
    const newCycles = [];
    let currentCycle = null;
    
    for (let i = 0; i < flowDates.length; i++) {
        const dateStr = flowDates[i];
        if (!currentCycle) {
            currentCycle = { startDate: dateStr, endDate: dateStr };
        } else {
            const gap = diffDays(currentCycle.endDate, dateStr);
            if (gap <= 4) { // within 3 days (e.g. diff is 4 days means 3 days empty between them)
                currentCycle.endDate = dateStr;
            } else {
                newCycles.push(currentCycle);
                currentCycle = { startDate: dateStr, endDate: dateStr };
            }
        }
    }
    if (currentCycle) {
        newCycles.push(currentCycle);
    }
    
    // Update cycles in state
    appState.cycles = newCycles.sort((a, b) => b.startDate.localeCompare(a.startDate)); // Newest first
    
    if (triggerSave) {
        saveState();
    }
}

// --- CYCLE PREDICTION MATHEMATICS ---
function getAverages() {
    let cycleLength = appState.settings.cycleLength;
    let periodLength = appState.settings.periodLength;
    
    // Calculate actual average cycle lengths from history
    // We need at least 2 cycles to calculate the gap between start dates
    if (appState.cycles.length >= 2) {
        let cycleSum = 0;
        let count = 0;
        // Cycles are sorted newest first
        for (let i = 0; i < appState.cycles.length - 1; i++) {
            const daysBetween = diffDays(appState.cycles[i+1].startDate, appState.cycles[i].startDate);
            // Ignore outliers (e.g., missed period gap > 60 days, or double log < 15 days)
            if (daysBetween >= 15 && daysBetween <= 60) {
                cycleSum += daysBetween;
                count++;
            }
        }
        if (count > 0) {
            cycleLength = Math.round(cycleSum / count);
        }
    }
    
    // Calculate average duration of period flow
    if (appState.cycles.length >= 1) {
        let periodSum = 0;
        let count = 0;
        for (const cycle of appState.cycles) {
            const duration = diffDays(cycle.startDate, cycle.endDate) + 1;
            if (duration >= 1 && duration <= 12) {
                periodSum += duration;
                count++;
            }
        }
        if (count > 0) {
            periodLength = Math.round(periodSum / count);
        }
    }
    
    return { cycleLength, periodLength };
}

// Predicts dates for future periods, fertile windows and ovulation days.
function getCalculatedWindows() {
    const { cycleLength, periodLength } = getAverages();
    const predictions = {
        periods: [],        // ranges { start, end }
        fertileWindows: [], // ranges { start, end }
        ovulations: [],     // exact dates
        avgCycle: cycleLength,
        avgPeriod: periodLength,
        nextPeriodStartDate: null
    };
    
    if (appState.cycles.length === 0) return predictions;
    
    // Start predictions from the most recent period start date
    const lastStart = appState.cycles[0].startDate;
    
    // Predict next 4 cycles
    for (let i = 1; i <= 4; i++) {
        const nextStart = addDays(lastStart, cycleLength * i);
        const nextEnd = addDays(nextStart, periodLength - 1);
        
        // Ovulation is usually 14 days before the next cycle starts
        const ovulation = addDays(nextStart, -14);
        // Fertile window is 5 days before ovulation plus the ovulation day itself (6 days total)
        const fertileStart = addDays(ovulation, -5);
        const fertileEnd = ovulation;
        
        predictions.periods.push({ start: nextStart, end: nextEnd });
        predictions.ovulations.push(ovulation);
        predictions.fertileWindows.push({ start: fertileStart, end: fertileEnd });
        
        if (i === 1) {
            predictions.nextPeriodStartDate = nextStart;
        }
    }
    
    return predictions;
}

// --- TOAST NOTIFICATION ---
function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    setTimeout(() => {
        els.toast.classList.remove('show');
    }, 2500);
}

// --- TABS & NAVIGATION ---
function setupNavigation() {
    els.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Toggle tab active class
            els.tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Toggle sections active class
            els.sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) {
                    sec.classList.add('active');
                }
            });
            
            // Stop mirror if switching away from mirror section
            if (target !== 'section-mirror') {
                stopMirror();
            }
            
            // Section-specific re-render
            if (target === 'section-calendar') {
                renderCalendar();
            } else if (target === 'section-history') {
                renderHistory();
            } else if (target === 'section-dashboard') {
                updateDashboard();
            }
        });
    });
}

// --- MIRROR SYSTEM ---
let mirrorStream = null;
let isMirrorOn = false;

function startMirror() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
            .then(stream => {
                mirrorStream = stream;
                els.mirrorVideo.srcObject = stream;
                els.mirrorVideo.style.display = "block";
                els.mirrorPlaceholder.style.display = "none";
                isMirrorOn = true;
                els.btnToggleMirror.innerHTML = "<span>🛑 Apagar Espejo</span>";
                els.btnToggleMirror.className = "action-btn danger";
            })
            .catch(err => {
                console.error("Error al acceder a la cámara:", err);
                alert("No se pudo acceder a la cámara. Asegúrate de otorgar los permisos necesarios.");
            });
    } else {
        alert("Tu dispositivo no soporta el acceso a la cámara en esta versión.");
    }
}

function stopMirror() {
    if (mirrorStream) {
        mirrorStream.getTracks().forEach(track => track.stop());
        mirrorStream = null;
    }
    els.mirrorVideo.srcObject = null;
    els.mirrorVideo.style.display = "none";
    els.mirrorPlaceholder.style.display = "flex";
    isMirrorOn = false;
    els.btnToggleMirror.innerHTML = "<span>📹 Encender Espejo</span>";
    els.btnToggleMirror.className = "action-btn gold-full";
}

function setupMirror() {
    if (!els.btnToggleMirror) return;
    
    els.btnToggleMirror.addEventListener('click', () => {
        if (isMirrorOn) {
            stopMirror();
        } else {
            startMirror();
        }
    });

    els.ringButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            els.ringButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const mode = btn.getAttribute('data-mode');
            els.mirrorRingLight.className = "mirror-ring-light"; // reset
            if (mode === 'white') {
                els.mirrorRingLight.classList.add('mode-white');
            } else if (mode === 'warm') {
                els.mirrorRingLight.classList.add('mode-warm');
            }
        });
    });
}

// --- DASHBOARD DISPLAY ---
function updateDashboard() {
    const todayStr = getTodayLocalDateStr();
    const averages = getAverages();
    
    // Update summary values
    els.summaryAvgCycle.textContent = `${averages.cycleLength} días`;
    els.summaryAvgPeriod.textContent = `${averages.periodLength} días`;
    
    const predictions = getCalculatedWindows();
    if (predictions.nextPeriodStartDate) {
        const dateParts = predictions.nextPeriodStartDate.split('-');
        els.summaryNextDate.textContent = `${dateParts[2]}/${dateParts[1]}`;
    } else {
        els.summaryNextDate.textContent = '--/--';
    }
    
    // Handle status ring display
    if (appState.cycles.length === 0) {
        // No logs
        els.cycleDayLabel.textContent = "Día --";
        els.cyclePhaseLabel.textContent = "Sin Registros";
        els.countdownText.innerHTML = "Presiona abajo para iniciar tu primer período.";
        els.fertilityStatus.textContent = "Fase Desconocida";
        els.fertilityStatus.className = "fertility-pill";
        els.statusRing.className = "status-ring";
        els.ringFill.style.strokeDashoffset = "534"; // Empty progress
        
        els.btnTogglePeriod.className = "action-btn";
        els.togglePeriodText.textContent = "Iniciar Período Hoy";
        return;
    }
    
    // Check if period is active today
    const lastCycle = appState.cycles[0];
    const isPeriodActive = isPeriodActiveOnDate(todayStr);
    
    // Calculate current cycle day
    // A cycle starts on cycleStartDate. Day 1 is cycleStartDate.
    const daysSinceStart = diffDays(lastCycle.startDate, todayStr);
    
    let cycleDayNum = daysSinceStart + 1;
    let cyclePhase = "Fase Folicular";
    let countdownText = "";
    let fertilityPillText = "Fertilidad Baja";
    let fertilityClass = "";
    let ringColorClass = "";
    
    // Ring progress calculation
    let progressPercent = 0;
    
    if (isPeriodActive) {
        // 1. Period Phase
        cyclePhase = "Período";
        countdownText = `Día ${cycleDayNum} del período. ¡Cuídate mucho! ❤️`;
        fertilityPillText = "Fertilidad Muy Baja";
        fertilityClass = "period";
        ringColorClass = "period-active";
        progressPercent = Math.min(1, cycleDayNum / Math.max(averages.periodLength, appState.settings.periodLength));
    } else {
        // Calculate phases and countdown based on cycle rules
        progressPercent = (daysSinceStart % averages.cycleLength) / averages.cycleLength;
        if (progressPercent < 0) progressPercent = 0;
        
        // Find if today lies in predicted fertile window or ovulation day
        const predictedOvulation = addDays(lastCycle.startDate, averages.cycleLength - 14);
        const fertileStart = addDays(predictedOvulation, -5);
        const fertileEnd = predictedOvulation;
        
        if (todayStr === predictedOvulation) {
            cyclePhase = "Ovulación";
            countdownText = "Día de ovulación estimado. Fertilidad al máximo. ✨";
            fertilityPillText = "Ovulación Hoy";
            fertilityClass = "ovulation";
            ringColorClass = "fertile-active";
        } else if (todayStr >= fertileStart && todayStr <= fertileEnd) {
            cyclePhase = "Fase Fértil";
            const daysToOv = diffDays(todayStr, predictedOvulation);
            countdownText = `Ventana fértil. Ovulación estimada en ${daysToOv} ${daysToOv === 1 ? 'día' : 'días'}. 🌸`;
            fertilityPillText = "Fertilidad Alta";
            fertilityClass = "fertile";
            ringColorClass = "fertile-active";
        } else if (todayStr > predictedOvulation) {
            cyclePhase = "Fase Lútea";
            const nextStart = addDays(lastCycle.startDate, averages.cycleLength);
            const daysToNext = diffDays(todayStr, nextStart);
            countdownText = `Faltan ${daysToNext} ${daysToNext === 1 ? 'día' : 'días'} para tu próximo período.`;
            fertilityPillText = "Fertilidad Baja";
            fertilityClass = "";
            ringColorClass = "";
        } else {
            cyclePhase = "Fase Folicular";
            const predictedOv = addDays(lastCycle.startDate, averages.cycleLength - 14);
            const daysToFertile = diffDays(todayStr, addDays(predictedOv, -5));
            countdownText = `Fase folicular. Ventana fértil inicia en ${daysToFertile} ${daysToFertile === 1 ? 'día' : 'días'}.`;
            fertilityPillText = "Fertilidad Baja";
            fertilityClass = "";
            ringColorClass = "";
        }
    }
    
    // Update labels
    els.cycleDayLabel.textContent = `Día ${cycleDayNum}`;
    els.cyclePhaseLabel.textContent = cyclePhase;
    els.countdownText.textContent = countdownText;
    
    els.fertilityStatus.textContent = fertilityPillText;
    els.fertilityStatus.className = `fertility-pill ${fertilityClass}`;
    els.statusRing.className = `status-ring ${ringColorClass}`;
    
    // Update progress ring stroke-dashoffset (circumference = 2 * Math.PI * 85 = 534)
    const dashoffset = Math.max(0, Math.min(534, 534 - (534 * progressPercent)));
    els.ringFill.style.strokeDashoffset = dashoffset;
    
    // Update Quick Action button text
    if (isPeriodActive) {
        els.btnTogglePeriod.className = "action-btn period-active";
        els.togglePeriodText.textContent = "Terminar Período Hoy";
    } else {
        els.btnTogglePeriod.className = "action-btn";
        els.togglePeriodText.textContent = "Iniciar Período Hoy";
    }
}

// Quick action: start/end period today
els.btnTogglePeriod.addEventListener('click', () => {
    const todayStr = getTodayLocalDateStr();
    
    if (appState.cycles.length > 0) {
        const lastCycle = appState.cycles[0];
        const isPeriodActive = isPeriodActiveOnDate(todayStr);
        
        if (isPeriodActive) {
            // End period: fill in flow for all days from lastCycle.startDate to todayStr
            const daysCount = diffDays(lastCycle.startDate, todayStr);
            for (let i = 0; i <= daysCount; i++) {
                const date = addDays(lastCycle.startDate, i);
                if (!appState.logs[date]) {
                    appState.logs[date] = { flow: 'medium', symptoms: [], mood: '', notes: '' };
                } else if (!appState.logs[date].flow || appState.logs[date].flow === 'none') {
                    appState.logs[date].flow = 'medium';
                }
            }
            // Mark tomorrow as flow: 'none' to stop auto-extension
            const tomorrowStr = addDays(todayStr, 1);
            if (!appState.logs[tomorrowStr]) {
                appState.logs[tomorrowStr] = { flow: 'none', symptoms: [], mood: '', notes: '' };
            } else {
                appState.logs[tomorrowStr].flow = 'none';
            }
            showToast("Período finalizado.");
            rebuildCyclesFromLogs();
            updateDashboard();
            return;
        }
    }
    
    // Start period: log medium flow for today
    if (!appState.logs[todayStr]) {
        appState.logs[todayStr] = { flow: 'none', symptoms: [], mood: '', notes: '' };
    }
    appState.logs[todayStr].flow = 'medium';
    
    showToast("¡Período iniciado hoy!");
    rebuildCyclesFromLogs();
    updateDashboard();
});

els.btnLogSymptoms.addEventListener('click', () => {
    openLogModal(getTodayLocalDateStr());
});

// --- CALENDAR RENDERING ---
function renderCalendar() {
    // Clean days grid
    els.calendarDays.innerHTML = "";
    
    // Display Title
    els.calendarTitle.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    
    // Calculate calendar dates
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Day of week (0-6)
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days in this month
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    
    const todayStr = getTodayLocalDateStr();
    const predictions = getCalculatedWindows();
    
    // Render Previous Month's trailing days
    for (let i = firstDayIndex; i > 0; i--) {
        const dayNum = prevMonthTotalDays - i + 1;
        const cell = document.createElement('div');
        cell.className = "calendar-day-cell other-month";
        cell.textContent = dayNum;
        els.calendarDays.appendChild(cell);
    }
    
    // Render Current Month days
    for (let day = 1; day <= totalDays; day++) {
        const cellMonth = String(currentMonth + 1).padStart(2, '0');
        const cellDay = String(day).padStart(2, '0');
        const dateStr = `${currentYear}-${cellMonth}-${cellDay}`;
        
        const cell = document.createElement('div');
        cell.className = "calendar-day-cell";
        cell.textContent = day;
        
        // Highlight states
        
        // 1. Check if today
        if (dateStr === todayStr) {
            cell.classList.add('today');
        }
        
        // 2. Check if logged period day (symptom flow is registered)
        const dayLog = appState.logs[dateStr];
        const hasLoggedFlow = dayLog && dayLog.flow && dayLog.flow !== 'none';
        
        if (hasLoggedFlow) {
            cell.classList.add('period');
        }
        
        // 3. If no logged period, check if predicted period day
        if (!hasLoggedFlow) {
            const isPredicted = predictions.periods.some(p => dateStr >= p.start && dateStr <= p.end);
            if (isPredicted) {
                cell.classList.add('predicted-period');
            }
        }
        
        // 4. Check if ovulation day prediction
        const isOvulation = predictions.ovulations.includes(dateStr);
        if (isOvulation) {
            cell.classList.add('ovulation');
        }
        
        // 5. Check if fertile window prediction (excluding ovulation day to differentiate)
        if (!isOvulation) {
            const isFertile = predictions.fertileWindows.some(fw => dateStr >= fw.start && dateStr <= fw.end);
            if (isFertile) {
                cell.classList.add('fertile');
            }
        }
        
        // 6. Dot indicator for logged symptoms/moods/notes
        const hasExtraLogs = dayLog && (
            (dayLog.symptoms && dayLog.symptoms.length > 0) || 
            dayLog.mood || 
            (dayLog.notes && dayLog.notes.trim() !== "")
        );
        if (hasExtraLogs) {
            cell.classList.add('has-log');
        }
        
        // Click action: open modal
        cell.addEventListener('click', () => {
            openLogModal(dateStr);
        });
        
        els.calendarDays.appendChild(cell);
    }
}

// Calendar Month Navigation
els.btnPrevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

els.btnNextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});


// --- MODAL SYMPTOMS LOGGER ---
function openLogModal(dateStr) {
    selectedDateStr = dateStr;
    els.modalDatePicker.value = dateStr;
    
    // Reset inputs
    els.flowButtons.forEach(btn => btn.classList.remove('active'));
    els.symptomCheckboxes.forEach(cb => cb.checked = false);
    els.moodRadios.forEach(r => r.checked = false);
    els.modalNotes.value = "";
    
    // Load existing data if available
    const dayLog = appState.logs[dateStr];
    if (dayLog) {
        // Flow
        const activeFlow = dayLog.flow || 'none';
        const flowBtn = document.querySelector(`.flow-btn[data-flow="${activeFlow}"]`);
        if (flowBtn) flowBtn.classList.add('active');
        
        // Symptoms
        if (dayLog.symptoms) {
            dayLog.symptoms.forEach(sym => {
                const cb = document.querySelector(`input[name="symptom"][value="${sym}"]`);
                if (cb) cb.checked = true;
            });
        }
        
        // Mood
        if (dayLog.mood) {
            const radio = document.querySelector(`input[name="mood"][value="${dayLog.mood}"]`);
            if (radio) radio.checked = true;
        }
        
        // Notes
        els.modalNotes.value = dayLog.notes || "";
        
        // Show delete button
        els.btnDeleteLog.style.display = "block";
    } else {
        // Select 'none' flow by default
        const defaultBtn = document.querySelector('.flow-btn[data-flow="none"]');
        if (defaultBtn) defaultBtn.classList.add('active');
        
        // Hide delete button
        els.btnDeleteLog.style.display = "none";
    }
    
    // Open modal backdrop
    els.logModal.classList.add('active');
}

// Close Modal
function closeModal() {
    els.logModal.classList.remove('active');
}

els.btnCloseModal.addEventListener('click', closeModal);
els.logModal.addEventListener('click', (e) => {
    if (e.target === els.logModal) closeModal();
});

// Date picker change listener
els.modalDatePicker.addEventListener('change', (e) => {
    if (e.target.value) {
        openLogModal(e.target.value);
    }
});

// Flow selector click
els.flowButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        els.flowButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Save Log
els.btnSaveLog.addEventListener('click', () => {
    const activeFlowBtn = document.querySelector('.flow-btn.active');
    const flowVal = activeFlowBtn ? activeFlowBtn.getAttribute('data-flow') : 'none';
    
    const loggedSymptoms = [];
    els.symptomCheckboxes.forEach(cb => {
        if (cb.checked) loggedSymptoms.push(cb.value);
    });
    
    const activeMoodRadio = document.querySelector('input[name="mood"]:checked');
    const moodVal = activeMoodRadio ? activeMoodRadio.value : '';
    
    const notesVal = els.modalNotes.value;
    
    // Save to state
    appState.logs[selectedDateStr] = {
        flow: flowVal,
        symptoms: loggedSymptoms,
        mood: moodVal,
        notes: notesVal
    };
    
    rebuildCyclesFromLogs();
    closeModal();
    showToast("¡Registro guardado!");
    
    // Re-render
    updateDashboard();
    if (els.sections[1].classList.contains('active')) { // Calendar tab
        renderCalendar();
    }
});

// Delete Log
els.btnDeleteLog.addEventListener('click', () => {
    if (confirm("¿Seguro que deseas eliminar el registro de este día?")) {
        if (appState.logs[selectedDateStr]) {
            delete appState.logs[selectedDateStr];
            rebuildCyclesFromLogs();
            closeModal();
            showToast("Registro eliminado.");
            
            // Re-render
            updateDashboard();
            if (els.sections[1].classList.contains('active')) {
                renderCalendar();
            }
        }
    }
});


// --- CYCLE HISTORY LIST ---
function renderHistory() {
    els.historyList.innerHTML = "";
    
    if (appState.cycles.length === 0) {
        els.historyList.innerHTML = `<div class="empty-state">No hay períodos registrados aún. Usa el botón "Iniciar Período Hoy" o toca un día en el calendario para registrar.</div>`;
        return;
    }
    
    // Cycles list is sorted newest first. Let's render them.
    for (let i = 0; i < appState.cycles.length; i++) {
        const cycle = appState.cycles[i];
        
        // Calculate cycle length if we have a next (chronologically prior, meaning index i-1) cycle
        let cycleDurationText = "Calculando...";
        if (i > 0) {
            const nextCycleStart = appState.cycles[i-1].startDate;
            const daysCount = diffDays(cycle.startDate, nextCycleStart);
            cycleDurationText = `${daysCount} días`;
        } else if (appState.cycles.length === 1) {
            cycleDurationText = `${appState.settings.cycleLength} días (estimado)`;
        } else {
            cycleDurationText = `Ciclo actual`;
        }
        
        const periodDuration = diffDays(cycle.startDate, cycle.endDate) + 1;
        
        const card = document.createElement('div');
        card.className = "history-item-card";
        
        card.innerHTML = `
            <div class="history-header">
                <div class="history-dates">
                    <span>${formatDateShort(cycle.startDate)}</span>
                    <span class="arrow">&rarr;</span>
                    <span>${formatDateShort(cycle.endDate)}</span>
                </div>
                <div class="history-badge">${periodDuration} ${periodDuration === 1 ? 'día' : 'días'}</div>
            </div>
            <div class="history-stats">
                <span>Duración del ciclo: <strong>${cycleDurationText}</strong></span>
            </div>
        `;
        els.historyList.appendChild(card);
    }
}

function formatDateShort(dateStr) {
    const d = parseLocalDate(dateStr);
    return `${d.getDate()} ${getMonthName(d.getMonth()).substring(0, 3)}.`;
}


// --- CONFIGURACIÓN & SETTINGS ---
els.btnSaveSettings.addEventListener('click', () => {
    const cycleL = parseInt(els.inputCycleLength.value);
    const periodL = parseInt(els.inputPeriodLength.value);
    
    if (isNaN(cycleL) || cycleL < 20 || cycleL > 45) {
        alert("La duración del ciclo debe estar entre 20 y 45 días.");
        return;
    }
    if (isNaN(periodL) || periodL < 2 || periodL > 12) {
        alert("La duración del período debe estar entre 2 y 12 días.");
        return;
    }
    
    appState.settings.cycleLength = cycleL;
    appState.settings.periodLength = periodL;
    
    saveState();
    showToast("Configuración guardada.");
    updateDashboard();
});

// Load Settings UI on startup
function loadSettingsUI() {
    els.inputCycleLength.value = appState.settings.cycleLength;
    els.inputPeriodLength.value = appState.settings.periodLength;
}

// Data Export
els.btnExport.addEventListener('click', () => {
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `luna-backup-${getTodayLocalDateStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Copia de seguridad descargada.");
});

// Data Import
els.fileImport.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const imported = JSON.parse(evt.target.result);
            if (imported.settings && imported.logs && imported.cycles) {
                appState = imported;
                saveState();
                loadSettingsUI();
                updateDashboard();
                showToast("¡Datos importados con éxito!");
                
                // Clear input
                els.fileImport.value = "";
            } else {
                alert("El archivo no tiene el formato correcto.");
            }
        } catch (err) {
            alert("Error al leer el archivo JSON.");
        }
    };
    reader.readAsText(file);
});

// Reset Data
els.btnResetData.addEventListener('click', () => {
    if (confirm("⚠️ ¿Estás absolutamente seguro de que quieres borrar todos los datos registrados? Esta acción no se puede deshacer.")) {
        try {
            localStorage.removeItem('luna_settings');
            localStorage.removeItem('luna_logs');
            localStorage.removeItem('luna_cycles');
        } catch (e) {
            console.error("localStorage cleaning failed:", e);
        }
        
        appState = {
            settings: { cycleLength: 28, periodLength: 5 },
            logs: {},
            cycles: []
        };
        
        loadSettingsUI();
        updateDashboard();
        showToast("Todos los datos han sido borrados.");
    }
});

// Check Updates manual trigger
els.btnCheckUpdate.addEventListener('click', () => {
    checkForUpdates(true);
});


// --- UPDATE SYSTEM ---
function checkForUpdates(isManual = false) {
    if (window.AndroidApp) {
        const localVersionCode = window.AndroidApp.getAppVersionCode();
        const localVersionName = window.AndroidApp.getAppVersionName();
        console.log("Versión local (Code):", localVersionCode);
        
        fetch(UPDATE_CONFIG_URL)
            .then(res => {
                if (!res.ok) throw new Error("Error al consultar actualizaciones");
                return res.json();
            })
            .then(data => {
                if (data && data.versionCode > localVersionCode) {
                    showUpdateModal(data);
                } else {
                    if (isManual) {
                        showToast(`¡Estás al día! Versión: v${localVersionName}`);
                    }
                }
            })
            .catch(err => {
                console.log("No se pudo verificar actualización (sin internet o URL inválida):", err);
                if (isManual) {
                    alert("No se pudo verificar la actualización. Revisa tu conexión a internet.");
                }
            });
    } else {
        if (isManual) {
            showToast("Buscar actualizaciones solo funciona dentro de la app Android.");
        }
    }
}

function showUpdateModal(updateData) {
    const updateModal = document.getElementById('update-modal');
    const updateVersionLabel = document.getElementById('update-version-label');
    const updateWhatsnewLabel = document.getElementById('update-whatsnew-label');
    const btnDownloadUpdate = document.getElementById('btn-download-update');
    const btnCloseUpdateModal = document.getElementById('btn-close-update-modal');
    const btnCloseUpdateAction = document.getElementById('btn-close-update-action');
    
    if (!updateModal || !updateVersionLabel || !updateWhatsnewLabel || !btnDownloadUpdate) return;
    
    updateVersionLabel.textContent = `v${updateData.versionName} (Build ${updateData.versionCode})`;
    updateWhatsnewLabel.textContent = updateData.whatsNew || "Mejoras generales y correcciones de errores.";
    
    btnDownloadUpdate.onclick = () => {
        window.open(updateData.apkUrl, "_blank");
        updateModal.classList.remove('active');
    };
    
    const closeHandlers = [btnCloseUpdateModal, btnCloseUpdateAction];
    closeHandlers.forEach(btn => {
        if (btn) {
            btn.onclick = () => {
                updateModal.classList.remove('active');
            };
        }
    });
    
    updateModal.classList.add('active');
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    loadSettingsUI();
    setupNavigation();
    updateDashboard();
    checkForUpdates();
    setupMirror();
    
    // Unregister any active Service Worker inside the APK to prevent caching bugs
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }
    
    // Clear caches to force loading fresh asset files
    if ('caches' in window) {
        caches.keys().then(names => {
            for (let name of names) {
                caches.delete(name);
            }
        });
    }
});
