// --- UPDATE CONFIGURATION ---
// Reemplaza esta URL con la ruta cruda de tu archivo en GitHub:
const UPDATE_CONFIG_URL = "https://raw.githubusercontent.com/sergiodhernandez/Ciserli-control/main/update.json";

// --- GOOGLE SHEETS SYNC CONFIGURATION ---
// Reemplaza esta URL con la URL de tu aplicación web publicada en Google Apps Script
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxdYsr2NLAnbORnGuwrbw99r45x5KMvlYSePau17WaXnKM0VKsUfrJ5HAc-1KJz_hAL/exec";

// --- CITAS ROMÁNTICAS PARA CITLALI ---
const BEAUTIFUL_QUOTES = [
    "Eres la casualidad más hermosa que ha llegado a mi vida, Citlali.",
    "En cada fase de la luna, y en cada latido de mi corazón, te elijo a ti.",
    "Tu sonrisa es mi parte favorita de cada uno de mis días.",
    "Haces que mi mundo sea infinitamente más bello con solo existir.",
    "Te amo no solo por lo que eres, sino por lo feliz que me haces al estar a tu lado.",
    "Eres mi sol, mi luna y cada una de las estrellas en mi cielo.",
    "Cada segundo a tu lado es un regalo que agradezco con toda el alma.",
    "No hay distancia, ni tiempo, ni espacio que pueda medir cuánto te amo.",
    "A tu lado, Citlali, cualquier rincón del mundo se siente como estar en casa.",
    "Eres el amor de mi vida y el sueño más hermoso del que no quiero despertar.",
    "Amarte es la decisión más fácil y maravillosa que he tomado.",
    "Mi lugar favorito en el universo entero siempre será a tu lado.",
    "Eres mi presente más brillante, mi futuro y mi felicidad entera.",
    "Gracias por colmar mis días de tanta luz, ternura y alegría infinita.",
    "De todas las maravillas creadas en este planeta, tú siempre serás mi favorita.",
    "Tu amor es el faro que ilumina mis días más oscuros.",
    "Cada vez que te miro, confirmo que eres todo lo que siempre soñé.",
    "Eres la melodía que hace que mi vida suene perfecta.",
    "Mi amor por ti crece con cada respiración, Citlali.",
    "Eres mi refugio seguro, mi paz y mi eterna felicidad.",
    "No hay nada más hermoso en este mundo que ver tu sonrisa iluminando el día.",
    "Eres el motivo de mis mejores pensamientos y de mis suspiros más profundos.",
    "A tu lado aprendí el verdadero significado de la palabra felicidad.",
    "Eres mi hoy, mi mañana y el amor de todas mis vidas.",
    "Tu ternura y dulzura son el alimento de mi alma.",
    "Eres la luz que disipa toda la neblina en mi mente.",
    "Caminar de tu mano es el viaje más hermoso que he emprendido.",
    "En tu mirada encuentro toda la calma que mi corazón necesita.",
    "Te amo con una fuerza que no conoce límites ni fronteras.",
    "Eres la pieza que faltaba para completar el rompecabezas de mi vida.",
    "Agradezco a la vida cada día por haberte puesto en mi camino.",
    "Tu voz es la canción más hermosa que mis oídos podrían escuchar.",
    "Eres mi inspiración diaria, el motor que me impulsa a ser mejor.",
    "Estar contigo es como vivir en una eterna primavera.",
    "Tu amor me da la fuerza para enfrentar cualquier tormenta.",
    "En tus abrazos encuentro el único lugar donde quiero quedarme para siempre.",
    "Eres mi compañera, mi cómplice y mi amor eterno.",
    "Tu presencia llena de magia y color cada rincón de mi existencia.",
    "Eres mi deseo cumplido en cada estrella fugaz.",
    "Cada día te amo un poco más de lo que te amaba ayer.",
    "Eres el tesoro más valioso que la vida me ha regalado.",
    "A tu lado, el tiempo vuela pero los recuerdos se quedan para siempre.",
    "Tu dulzura hace que la vida sea infinitamente más bella.",
    "Eres mi hogar, el lugar al que siempre quiero regresar.",
    "En tu corazón encontré el refugio perfecto para el mío.",
    "Tu amor es el mejor regalo que jamás he recibido.",
    "Eres la razón por la que mi corazón late con tanta alegría.",
    "A tu lado cada instante se convierte en una obra de arte.",
    "Eres mi sueño hecho realidad, Citlali.",
    "Te amo con todo mi ser, con cada fibra de mi corazón.",
    "Tu amor me envuelve y me llena de una paz incomparable.",
    "Eres la casualidad más bonita y el acierto más grande de mi vida.",
    "En el cielo de mi vida, tú eres la estrella que más brilla.",
    "No hay palabras suficientes para expresar cuánto te amo y te admiro.",
    "Eres el latido constante que le da ritmo a mi vida.",
    "A tu lado he descubierto lo hermoso que es el amor verdadero.",
    "Eres el calor que abriga mi alma en los días más fríos.",
    "Tu mirada tiene el poder de sanar cualquier tristeza en mí.",
    "Te elegiría a ti una y mil veces en esta y en cualquier otra vida.",
    "Eres la inspiración detrás de cada una de mis sonrisas.",
    "Tu amor me hace sentir que puedo lograr lo imposible.",
    "Eres mi felicidad de todos los días, mi amor eterno.",
    "En el libro de mi vida, tú eres el capítulo más hermoso.",
    "Cada beso tuyo es un poema escrito en mis labios.",
    "Eres el rayo de sol que ilumina mi mañana cada día.",
    "A tu lado el mundo entero se ve más brillante y hermoso.",
    "Tu amor es la magia que transforma la rutina en poesía.",
    "Eres el pensamiento más dulce de todos mis días.",
    "En tus brazos el mundo exterior deja de existir.",
    "Te amo por cómo eres cuando estás conmigo y por cómo me haces sentir.",
    "Eres mi amor platónico hecho realidad en el mundo real.",
    "Tu presencia le da un sentido único a mi vida.",
    "Eres mi norte, mi guía y mi destino final.",
    "A tu lado cada día es una nueva aventura llena de amor.",
    "Eres la persona que llena mi alma de felicidad absoluta.",
    "Tu amor es el faro que me guía a puerto seguro.",
    "Eres el sueño del que nunca quiero despertar.",
    "Te amo más de lo que las palabras pueden llegar a describir.",
    "A tu lado el silencio es cómodo y las palabras son música.",
    "Eres mi complemento perfecto, mi alma gemela.",
    "Tu amor es el motor que le da fuerza a mis días.",
    "Eres mi persona favorita en todo el universo.",
    "A tu lado he aprendido a ver la belleza en los detalles más pequeños.",
    "Eres la melodía de fondo que acompaña mis días más felices.",
    "Tu sonrisa es el sol que derrite cualquier hielo en mi corazón.",
    "Te amo de una forma tan pura que el tiempo no podrá marchitar.",
    "Eres mi compañera de camino, mi amor y mi vida entera.",
    "A tu lado he encontrado mi verdadero hogar.",
    "Eres la poesía más bella que el destino ha escrito para mí.",
    "Tu amor llena mi vida de un aroma de felicidad eterna.",
    "Eres la luz que guía mis pasos en los caminos más difíciles.",
    "Te amo con la locura de un niño y la certeza de un adulto.",
    "A tu lado la vida es un viaje lleno de magia y sonrisas.",
    "Eres el refugio donde mi corazón descansa en paz.",
    "Tu mirada es la ventana por la que asomo a mi felicidad.",
    "Eres el regalo más hermoso que el universo me ha concedido.",
    "Te amo en cada detalle, en cada mirada y en cada palabra.",
    "A tu lado el amor se siente fácil, natural y eterno.",
    "Eres mi sol en días nublados y mi estrella en noches oscuras.",
    "Mi amor por ti es un viaje que comienza en el 'para siempre'.",
    "Eres la casualidad más linda que el destino planeó para mí.",
    "En tu mirada se refleja el universo entero que quiero explorar contigo.",
    "A tu lado he descubierto que la felicidad no es un destino, sino un camino que recorro contigo.",
    "Tu amor es la música que hace bailar a mi corazón todos los días.",
    "Eres mi principio, mi fin y el amor más grande de toda mi vida."
];

// --- ROMANTIC QUOTES & SPLASH SCREEN SYSTEM ---
function displayRandomQuotes() {
    const dashboardQuoteEl = document.getElementById('dashboard-love-quote');
    if (!dashboardQuoteEl) return;
    const quotesSource = (appState.quotes && appState.quotes.length > 0) ? appState.quotes : BEAUTIFUL_QUOTES;
    if (quotesSource.length === 0) return;
    const randomIdx = Math.floor(Math.random() * quotesSource.length);
    dashboardQuoteEl.textContent = quotesSource[randomIdx];
}

function initQuotesAndSplash() {
    const splashQuoteEl = document.getElementById('splash-quote');
    const splashScreenEl = document.getElementById('splash-screen');
    
    const quotesSource = (appState.quotes && appState.quotes.length > 0) ? appState.quotes : BEAUTIFUL_QUOTES;
    if (quotesSource.length > 0) {
        const randomIdx1 = Math.floor(Math.random() * quotesSource.length);
        if (splashQuoteEl) {
            splashQuoteEl.textContent = quotesSource[randomIdx1];
        }
    }
    
    displayRandomQuotes();
    
    if (splashScreenEl) {
        setTimeout(() => {
            splashScreenEl.classList.add('fade-out');
        }, 3500);
    }
}

// --- STATE MANAGEMENT ---
let appState = {
    settings: {
        cycleLength: 28,
        periodLength: 5
    },
    logs: {},      // Format: { "YYYY-MM-DD": { flow: 'light'|'medium'|'heavy'|'none', symptoms: [], mood: '', notes: '' } }
    cycles: [],    // Format: [ { startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD", manual: boolean } ]
    quotes: []     // Frases dinámicas obtenidas desde Google Sheets
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
    ringButtons: document.querySelectorAll('.ring-btn'),

    // Google Sheets Sync
    syncStatus: document.getElementById('sync-status'),
    syncText: document.getElementById('sync-text'),

    // Optimizer
    optimizePermissionCard: document.getElementById('optimize-permission-card'),
    btnRequestOptimizePermission: document.getElementById('btn-request-optimize-permission'),
    optimizeScore: document.getElementById('optimize-score'),
    optimizeStatus: document.getElementById('optimize-status'),
    optimizeRingFill: document.getElementById('optimize-ring-fill'),
    btnStartOptimize: document.getElementById('btn-start-optimize'),
    btnOptimizeText: document.getElementById('btn-optimize-text'),
    btnRescanOptimize: document.getElementById('btn-rescan-optimize'),
    optimizeScanLoading: document.getElementById('optimize-scan-loading'),
    optimizeScanCurrent: document.getElementById('optimize-scan-current'),
    optimizeResultsCard: document.getElementById('optimize-results-card'),
    optimizeTotalCache: document.getElementById('optimize-total-cache'),
    optimizeTotalApps: document.getElementById('optimize-total-apps'),
    optimizeLastTime: document.getElementById('optimize-last-time'),
    optimizeAppsList: document.getElementById('optimize-apps-list')
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
        const savedQuotes = localStorage.getItem('luna_quotes');
        
        if (savedSettings) appState.settings = JSON.parse(savedSettings);
        if (savedLogs) appState.logs = JSON.parse(savedLogs);
        if (savedCycles) appState.cycles = JSON.parse(savedCycles);
        if (savedQuotes) appState.quotes = JSON.parse(savedQuotes);
    } catch (e) {
        console.error("localStorage reading failed:", e);
    }
    
    if (!appState.quotes) {
        appState.quotes = [];
    }
    
    // Verify virtual cat settings
    if (!appState.settings.cat) {
        appState.settings.cat = {
            enabled: true,
            overlayEnabled: false,
            skin: 'patched',
            size: 'medium'
        };
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
        localStorage.setItem('luna_quotes', JSON.stringify(appState.quotes || []));
    } catch (e) {
        console.error("localStorage writing failed:", e);
    }
    
    syncQuotesToAndroid();
    saveToGoogleSheet();
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
            } else if (target === 'section-mirror') {
                updateBackgroundLight();
            } else if (target === 'section-optimize') {
                initOptimizeView();
            }
        });
    });
}

// --- MIRROR SYSTEM ---
let mirrorStream = null;
let isMirrorOn = false;

function updateBackgroundLight() {
    const body = document.body;
    if (!body) return;

    body.classList.remove('ring-active-white', 'ring-active-warm');

    const mirrorSection = document.getElementById('section-mirror');
    const isMirrorTabActive = mirrorSection && mirrorSection.classList.contains('active');

    if (isMirrorTabActive) {
        const activeBtn = document.querySelector('.ring-btn.active');
        const mode = activeBtn ? activeBtn.getAttribute('data-mode') : 'off';
        
        if (mode === 'white') {
            body.classList.add('ring-active-white');
        } else if (mode === 'warm') {
            body.classList.add('ring-active-warm');
        }
    }
}

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
                updateBackgroundLight();
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
    updateBackgroundLight();
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
            updateBackgroundLight();
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
        
        fetch(UPDATE_CONFIG_URL + "?t=" + Date.now())
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
        if (window.AndroidApp && window.AndroidApp.downloadApk) {
            window.AndroidApp.downloadApk(updateData.apkUrl);
        } else if (window.AndroidApp && window.AndroidApp.openInBrowser) {
            window.AndroidApp.openInBrowser(updateData.apkUrl);
        } else {
            window.open(updateData.apkUrl, "_blank");
        }
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


// --- GOOGLE SHEETS SYNC SYSTEM ---
function updateSyncStatus(status, text) {
    if (!els.syncStatus || !els.syncText) return;
    els.syncStatus.className = "sync-status-badge " + status;
    els.syncText.textContent = text;
}

function fetchFromGoogleSheet() {
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "TU_URL_DE_GOOGLE_SHEETS_AQUI") {
        updateSyncStatus("error", "URL sin configurar");
        return;
    }
    
    updateSyncStatus("loading", "Sincronizando...");
    
    fetch(GOOGLE_SHEET_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta de red");
            return response.json();
        })
        .then(data => {
            if (data && data.appState) {
                // Actualizar estado local
                const previousCat = appState.settings.cat;
                appState.settings = data.appState.settings || appState.settings;
                if (previousCat) {
                    appState.settings.cat = previousCat;
                } else if (!appState.settings.cat) {
                    appState.settings.cat = {
                        enabled: true,
                        overlayEnabled: false,
                        skin: 'patched',
                        size: 'medium'
                    };
                }
                appState.logs = data.appState.logs || appState.logs;
                appState.cycles = data.appState.cycles || appState.cycles;
                appState.quotes = data.quotes || [];
                
                // Guardar copia local en caché
                try {
                    localStorage.setItem('luna_settings', JSON.stringify(appState.settings));
                    localStorage.setItem('luna_logs', JSON.stringify(appState.logs));
                    localStorage.setItem('luna_cycles', JSON.stringify(appState.cycles));
                    localStorage.setItem('luna_quotes', JSON.stringify(appState.quotes));
                } catch (e) {
                    console.error("localStorage writing failed:", e);
                }
                syncQuotesToAndroid();
                
                // Reconstruir ciclos y actualizar UI
                rebuildCyclesFromLogs(false);
                updateDashboard();
                loadSettingsUI();
                displayRandomQuotes();
                
                const calendarActive = document.getElementById('section-calendar').classList.contains('active');
                const historyActive = document.getElementById('section-history').classList.contains('active');
                if (calendarActive) renderCalendar();
                if (historyActive) renderHistory();
                
                updateSyncStatus("success", "Sincronizado");
            } else {
                throw new Error("Formato de respuesta incorrecto");
            }
        })
        .catch(err => {
            console.error("Error al sincronizar con Google Sheets:", err);
            updateSyncStatus("error", "Error de conexión");
        });
}

function saveToGoogleSheet() {
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "TU_URL_DE_GOOGLE_SHEETS_AQUI") {
        return;
    }
    
    updateSyncStatus("loading", "Guardando...");
    
    const payload = {
        action: "saveState",
        state: {
            settings: appState.settings,
            logs: appState.logs,
            cycles: appState.cycles
        }
    };
    
    // Enviamos el contenido como text/plain para evitar solicitudes preflight OPTIONS de CORS en Google Sheets
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al guardar");
        return response.json();
    })
    .then(data => {
        if (data && data.status === "success") {
            updateSyncStatus("success", "Sincronizado");
        } else {
            throw new Error(data.message || "Guardado fallido");
        }
    })
    .catch(err => {
        console.error("Error al guardar en Google Sheets:", err);
        updateSyncStatus("error", "Error de guardado");
    });
}

// --- VIRTUAL CAT SYSTEM (IN-APP & NATIVE OVERLAY) ---
class CatAudio {
    static playMeow() {
        try {
            const audio = new Audio('meow.ogg');
            audio.play().catch(e => {
                console.warn("Failed to play local meow.ogg, falling back to Web Audio synthesis:", e);
                this.playSynthesizedMeow();
            });
        } catch (e) {
            console.warn("Audio constructor failed, falling back to Web Audio synthesis:", e);
            this.playSynthesizedMeow();
        }
    }

    static playPurr(duration = 3.0) {
        try {
            if (this.currentPurr) {
                try { this.currentPurr.pause(); } catch(err) {}
            }
            const audio = new Audio('purr.ogg');
            this.currentPurr = audio;
            audio.loop = true;
            audio.play().then(() => {
                const fadeTime = 500;
                const stopTime = duration * 1000;
                setTimeout(() => {
                    if (this.currentPurr !== audio) return;
                    let volume = 1.0;
                    const fadeInterval = setInterval(() => {
                        if (this.currentPurr !== audio) {
                            clearInterval(fadeInterval);
                            return;
                        }
                        volume -= 0.1;
                        if (volume <= 0) {
                            clearInterval(fadeInterval);
                            audio.pause();
                            if (this.currentPurr === audio) {
                                this.currentPurr = null;
                            }
                        } else {
                            audio.volume = volume;
                        }
                    }, fadeTime / 10);
                }, stopTime - fadeTime);
            }).catch(e => {
                console.warn("Failed to play local purr.ogg, falling back to Web Audio synthesis:", e);
                this.playSynthesizedPurr(duration);
            });
        } catch (e) {
            console.warn("Audio constructor failed, falling back to Web Audio synthesis:", e);
            this.playSynthesizedPurr(duration);
        }
    }

    static getContext() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    static playSynthesizedMeow() {
        try {
            const ctx = this.getContext();
            const now = ctx.currentTime;
            
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(320, now);
            osc1.frequency.exponentialRampToValueAtTime(750, now + 0.15);
            osc1.frequency.exponentialRampToValueAtTime(450, now + 0.4);
            osc1.frequency.exponentialRampToValueAtTime(280, now + 0.7);
            
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(640, now);
            osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.15);
            osc2.frequency.exponentialRampToValueAtTime(900, now + 0.4);
            osc2.frequency.exponentialRampToValueAtTime(560, now + 0.7);
            
            filter.type = 'bandpass';
            filter.Q.value = 2.0;
            filter.frequency.setValueAtTime(900, now);
            filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);
            filter.frequency.exponentialRampToValueAtTime(1000, now + 0.4);
            filter.frequency.exponentialRampToValueAtTime(500, now + 0.7);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.08);
            gainNode.gain.setValueAtTime(0.15, now + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.10, now + 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
            
            const oscGain2 = ctx.createGain();
            oscGain2.gain.value = 0.35;
            
            osc1.connect(filter);
            osc2.connect(oscGain2);
            oscGain2.connect(filter);
            
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc1.start(now);
            osc2.start(now);
            
            osc1.stop(now + 0.75);
            osc2.stop(now + 0.75);
        } catch (e) {
            console.error("Web Audio Meow error:", e);
        }
    }

    static playSynthesizedPurr(duration = 3.0) {
        try {
            const ctx = this.getContext();
            const now = ctx.currentTime;
            
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const mainGain = ctx.createGain();
            const outputGain = ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.value = 85;
            
            filter.type = 'lowpass';
            filter.frequency.value = 250;
            
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = 3.8;
            lfoGain.gain.value = 0.22;
            
            mainGain.gain.value = 0.35;
            
            lfo.connect(lfoGain);
            lfoGain.connect(mainGain.gain);
            
            outputGain.gain.setValueAtTime(0, now);
            outputGain.gain.linearRampToValueAtTime(1.0, now + 0.2);
            outputGain.gain.setValueAtTime(1.0, now + duration - 0.25);
            outputGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            osc.connect(filter);
            filter.connect(mainGain);
            mainGain.connect(outputGain);
            outputGain.connect(ctx.destination);
            
            lfo.start(now);
            osc.start(now);
            
            lfo.stop(now + duration);
            osc.stop(now + duration);
        } catch (e) {
            console.error("Web Audio Purr error:", e);
        }
    }
}

let localCatState = {
    x: 20,
    y: 80,
    isWalking: false,
    walkTimeout: null,
    bubbleTimeout: null,
    zzzInterval: null
};

function syncQuotesToAndroid() {
    if (window.AndroidApp && window.AndroidApp.saveQuotes) {
        const quotesSource = (appState.quotes && appState.quotes.length > 0) ? appState.quotes : BEAUTIFUL_QUOTES;
        window.AndroidApp.saveQuotes(JSON.stringify(quotesSource));
    }
}

function initVirtualCat() {
    const localContainer = document.getElementById('local-cat-container');
    const localWrapper = document.getElementById('local-cat-wrapper');
    const localBubble = document.getElementById('local-cat-bubble');
    
    if (!localContainer || !localWrapper || !localBubble) return;

    // Ensure settings object is initialized
    if (!appState.settings.cat) {
        appState.settings.cat = {
            enabled: true,
            overlayEnabled: false,
            skin: 'patched',
            size: 'medium',
            hideInGames: false
        };
    } else if (appState.settings.cat.hideInGames === undefined) {
        appState.settings.cat.hideInGames = false;
    }

    // Apply settings to UI inputs
    const swLocal = document.getElementById('switch-cat-local');
    const swOverlay = document.getElementById('switch-cat-overlay');
    const swHideGames = document.getElementById('switch-cat-hide-games');
    const selSkin = document.getElementById('select-cat-skin');
    const selSize = document.getElementById('select-cat-size');

    if (swLocal) swLocal.checked = appState.settings.cat.enabled;
    if (swOverlay) swOverlay.checked = appState.settings.cat.overlayEnabled;
    if (swHideGames) swHideGames.checked = appState.settings.cat.hideInGames;
    if (selSkin) selSkin.value = appState.settings.cat.skin;
    if (selSize) selSize.value = appState.settings.cat.size;

    // Update Cat presentation
    function applyCatVisualSettings() {
        const catSettings = appState.settings.cat;
        
        // Local Cat visibility
        if (catSettings.enabled) {
            localContainer.classList.remove('hidden');
        } else {
            localContainer.classList.add('hidden');
        }

        // Apply skin & size classes to container
        localContainer.className = `local-cat-container skin-${catSettings.skin} size-${catSettings.size}`;
        if (!catSettings.enabled) {
            localContainer.classList.add('hidden');
        }
    }

    applyCatVisualSettings();
    syncOverlayCatNative();

    // Trigger local movement loop if enabled
    let movementInterval = null;
    
    function startLocalMovement() {
        clearInterval(movementInterval);
        movementInterval = setInterval(() => {
            if (!appState.settings.cat.enabled || localCatState.isWalking || (localBubble && localBubble.classList.contains('visible'))) return;

            // Random action: walk=50%, idle=30%, sleep=20%
            const roll = Math.floor(Math.random() * 100);
            
            // Random meow chance (15%) when transitioning to active states
            if (roll < 80 && Math.random() < 0.15) {
                if (!localBubble.classList.contains('visible')) {
                    CatAudio.playMeow();
                    showLocalCatBubble(Math.random() < 0.5 ? "¡Miau! ❤️" : "¡Miau! 🐾", 2000);
                }
            }

            if (roll < 50) {
                walkLocalCat();
            } else if (roll < 80) {
                setLocalCatAnimation('idle');
            } else {
                setLocalCatAnimation('sleep');
            }
        }, 7000);
    }

    function setLocalCatAnimation(state, direction) {
        localWrapper.className = `state-${state}`;
        if (direction === -1) {
            localWrapper.style.transform = 'scaleX(-1)';
        } else if (direction === 1) {
            localWrapper.style.transform = 'scaleX(1)';
        }

        // Handle Zzz particles
        clearInterval(localCatState.zzzInterval);
        if (state === 'sleep') {
            localCatState.zzzInterval = setInterval(() => {
                const zzz = document.createElement('div');
                zzz.className = 'local-zzz';
                zzz.textContent = 'z';
                zzz.style.left = '64px';
                zzz.style.top = '15px';
                localContainer.appendChild(zzz);
                setTimeout(() => zzz.remove(), 2500);
            }, 1500);
        }
    }

    function walkLocalCat() {
        if (localCatState.isWalking) return;
        localCatState.isWalking = true;

        const appContainer = document.querySelector('.app-container');
        if (!appContainer) return;

        const appWidth = appContainer.clientWidth;
        const appHeight = appContainer.clientHeight;

        let catSize = 80;
        if (appState.settings.cat.size === 'small') catSize = 60;
        if (appState.settings.cat.size === 'large') catSize = 100;

        // X bounds: 0 to width - size
        const targetX = Math.floor(Math.random() * (appWidth - catSize));
        // Y bounds: 65 (above menu) to height - size - 90 (below header)
        const targetY = 65 + Math.floor(Math.random() * (appHeight - catSize - 155));

        const startX = localCatState.x;
        const startY = localCatState.y;

        const distance = Math.hypot(targetX - startX, targetY - startY);
        const speed = 40; // pixels per second
        const duration = Math.max(1.5, distance / speed);

        const direction = (targetX > startX) ? 1 : -1;
        setLocalCatAnimation('walk', direction);

        // Apply smooth transition
        localContainer.style.transition = `left ${duration}s linear, bottom ${duration}s linear`;
        localContainer.style.left = `${targetX}px`;
        localContainer.style.bottom = `${targetY}px`;

        localCatState.x = targetX;
        localCatState.y = targetY;

        clearTimeout(localCatState.walkTimeout);
        localCatState.walkTimeout = setTimeout(() => {
            localCatState.isWalking = false;
            setLocalCatAnimation('idle');
        }, duration * 1000);
    }

    function showLocalCatBubble(text, duration = 4000) {
        const appContainer = document.querySelector('.app-container');
        const appWidth = appContainer ? appContainer.clientWidth : 360;

        let catSize = 80;
        if (appState.settings.cat.size === 'small') catSize = 60;
        if (appState.settings.cat.size === 'large') catSize = 100;

        const centerX = localCatState.x + catSize / 2;
        let bubbleLeft = centerX - 85;
        bubbleLeft = Math.max(5, Math.min(appWidth - 175, bubbleLeft));

        localBubble.style.left = `${bubbleLeft - localCatState.x}px`;
        localBubble.style.marginLeft = '0px';
        localBubble.style.setProperty('--arrow-left', `${centerX - bubbleLeft}px`);

        localBubble.textContent = text;
        localBubble.classList.add('visible');

        clearTimeout(localCatState.bubbleTimeout);
        localCatState.bubbleTimeout = setTimeout(() => {
            localBubble.classList.remove('visible');
            setLocalCatAnimation('idle');
        }, duration);
    }

    let isLocalDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let containerStartX = 0;
    let containerStartY = 0;
    let dragHasMoved = false;

    localWrapper.addEventListener('pointerdown', (e) => {
        // Cancel ongoing movement/walk
        clearTimeout(localCatState.walkTimeout);
        localCatState.isWalking = false;
        
        // Wake up if sleeping
        if (localWrapper.classList.contains('state-sleep')) {
            setLocalCatAnimation('idle');
        }
        
        // Disable transitions during dragging
        localContainer.style.transition = 'none';

        isLocalDragging = true;
        dragHasMoved = false;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        containerStartX = localCatState.x;
        containerStartY = localCatState.y;
        
        localWrapper.setPointerCapture(e.pointerId);
        e.stopPropagation();
    });

    localWrapper.addEventListener('pointermove', (e) => {
        if (!isLocalDragging) return;
        
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        if (Math.hypot(dx, dy) > 8) {
            dragHasMoved = true;
        }

        let targetX = containerStartX + dx;
        // bottom increases upwards, clientY increases downwards
        let targetY = containerStartY - dy;

        const appContainer = document.querySelector('.app-container');
        if (!appContainer) return;
        const appWidth = appContainer.clientWidth;
        const appHeight = appContainer.clientHeight;

        let catSize = 80;
        if (appState.settings.cat.size === 'small') catSize = 60;
        if (appState.settings.cat.size === 'large') catSize = 100;

        // Bound within container
        targetX = Math.max(0, Math.min(appWidth - catSize, targetX));
        targetY = Math.max(65, Math.min(appHeight - catSize - 155, targetY));

        localContainer.style.left = `${targetX}px`;
        localContainer.style.bottom = `${targetY}px`;

        localCatState.x = targetX;
        localCatState.y = targetY;
        
        e.stopPropagation();
    });

    localWrapper.addEventListener('pointerup', (e) => {
        if (!isLocalDragging) return;
        isLocalDragging = false;
        
        localWrapper.releasePointerCapture(e.pointerId);
        e.stopPropagation();
    });

    // Tap/Click local cat interaction
    localWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dragHasMoved) {
            // Dragged, don't show bubble or play purr
            return;
        }
        
        // Play purr sound
        CatAudio.playPurr(4.0);

        // Spawn hearts
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'local-heart';
                heart.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
                heart.style.left = `${35 + Math.random() * 20}px`;
                heart.style.top = '25px';
                heart.style.setProperty('--dx', `${-15 + Math.random() * 30}px`);
                localContainer.appendChild(heart);
                setTimeout(() => heart.remove(), 1000);
            }, i * 150);
        }

        // Show happy animation
        setLocalCatAnimation('happy');

        // Show quote
        const quotesSource = (appState.quotes && appState.quotes.length > 0) ? appState.quotes : BEAUTIFUL_QUOTES;
        const randomQuote = quotesSource[Math.floor(Math.random() * quotesSource.length)];
        
        showLocalCatBubble(randomQuote, 4000);
    });

    if (appState.settings.cat.enabled) {
        startLocalMovement();
    }

    // Settings listeners
    if (swLocal) {
        swLocal.addEventListener('change', () => {
            appState.settings.cat.enabled = swLocal.checked;
            saveState();
            applyCatVisualSettings();
            if (swLocal.checked) {
                startLocalMovement();
            } else {
                clearInterval(movementInterval);
                clearTimeout(localCatState.walkTimeout);
                localCatState.isWalking = false;
                setLocalCatAnimation('idle');
            }
        });
    }

    if (swOverlay) {
        swOverlay.addEventListener('change', () => {
            const requested = swOverlay.checked;
            if (requested) {
                // Check permissions first!
                if (window.AndroidApp && window.AndroidApp.checkOverlayPermission) {
                    const hasPermission = window.AndroidApp.checkOverlayPermission();
                    if (!hasPermission) {
                        alert("Para mostrar al gatito fuera de la app, necesitas conceder el permiso de superposición (Dibujar sobre otras apps) en la siguiente pantalla.");
                        window.AndroidApp.requestOverlayPermission();
                        // Uncheck toggle until permission is granted
                        swOverlay.checked = false;
                        return;
                    }
                } else {
                    alert("La superposición fuera de la pantalla de la app solo está soportada en dispositivos Android.");
                    swOverlay.checked = false;
                    return;
                }
            }

            appState.settings.cat.overlayEnabled = requested;
            saveState();
            syncOverlayCatNative();
        });
    }

    if (swHideGames) {
        swHideGames.addEventListener('change', () => {
            const requested = swHideGames.checked;
            if (requested) {
                if (window.AndroidApp && window.AndroidApp.checkUsageStatsPermission) {
                    const hasPermission = window.AndroidApp.checkUsageStatsPermission();
                    if (!hasPermission) {
                        alert("Para ocultar al gatito en los juegos, necesitas conceder el permiso de acceso de uso en la siguiente pantalla.");
                        window.AndroidApp.requestUsageStatsPermission();
                    }
                } else {
                    alert("Esta opción solo está disponible en dispositivos Android.");
                    swHideGames.checked = false;
                    return;
                }
            }

            appState.settings.cat.hideInGames = requested;
            saveState();
            
            // Sync immediately to Android preferences
            if (window.AndroidApp && window.AndroidApp.saveSetting) {
                window.AndroidApp.saveSetting("hideInGames", requested);
            }
            syncOverlayCatNative();
        });
    }

    if (selSkin) {
        selSkin.addEventListener('change', () => {
            appState.settings.cat.skin = selSkin.value;
            saveState();
            applyCatVisualSettings();
            syncOverlayCatNative();
        });
    }

    if (selSize) {
        selSize.addEventListener('change', () => {
            appState.settings.cat.size = selSize.value;
            saveState();
            applyCatVisualSettings();
            syncOverlayCatNative();
        });
    }

    // Sync state changes with native service
    function syncOverlayCatNative() {
        if (window.AndroidApp && window.AndroidApp.toggleOverlayCat) {
            const catSettings = appState.settings.cat;
            // First save latest quotes to Android shared prefs
            syncQuotesToAndroid();
            
            if (window.AndroidApp.saveSetting) {
                window.AndroidApp.saveSetting("hideInGames", catSettings.hideInGames || false);
            }

            window.AndroidApp.toggleOverlayCat(
                catSettings.overlayEnabled,
                catSettings.skin,
                catSettings.size
            );
        }
    }
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initQuotesAndSplash();
    loadSettingsUI();
    setupNavigation();
    updateDashboard();
    checkForUpdates();
    setupMirror();
    initVirtualCat();
    
    // Iniciar sincronización de segundo plano con Google Sheets
    fetchFromGoogleSheet();
    
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

// --- DEVICE OPTIMIZER SYSTEM ---
let scannedApps = [];
let lastScanTime = null;

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function initOptimizeView() {
    // Event listeners registration (guarded to avoid duplicates)
    if (!window.optimizeEventsRegistered) {
        if (els.btnRequestOptimizePermission) {
            els.btnRequestOptimizePermission.addEventListener('click', () => {
                if (window.AndroidApp && window.AndroidApp.requestUsageStatsPermission) {
                    window.AndroidApp.requestUsageStatsPermission();
                } else {
                    alert("Esta opción solo está disponible en dispositivos Android.");
                }
            });
        }

        if (els.btnRescanOptimize) {
            els.btnRescanOptimize.addEventListener('click', () => {
                startOptimizeScan();
            });
        }

        if (els.btnStartOptimize) {
            els.btnStartOptimize.addEventListener('click', () => {
                optimizeDevice();
            });
        }

        window.optimizeEventsRegistered = true;
    }

    // Check permissions
    let hasPermission = false;
    const isAndroid = !!(window.AndroidApp);
    
    if (isAndroid && window.AndroidApp.checkUsageStatsPermission) {
        hasPermission = window.AndroidApp.checkUsageStatsPermission();
    } else {
        // Safe fallback for web testing/desktop browser: simulate having permission
        hasPermission = true;
    }

    if (!hasPermission) {
        els.optimizePermissionCard.classList.remove('hidden');
        els.optimizeResultsCard.classList.add('hidden');
        els.btnStartOptimize.disabled = true;
        
        // Update dashboard score to warn permission is missing
        els.optimizeScore.textContent = "🔒";
        els.optimizeStatus.textContent = "Sin Permiso";
        els.optimizeRingFill.style.strokeDashoffset = "534";
    } else {
        els.optimizePermissionCard.classList.add('hidden');
        els.optimizeResultsCard.classList.remove('hidden');
        
        // Auto-scan if never done or last scan was long ago
        if (scannedApps.length === 0) {
            startOptimizeScan();
        } else {
            renderScanResults();
        }
    }
}

function startOptimizeScan() {
    els.optimizeScanLoading.classList.remove('hidden');
    els.optimizeResultsCard.classList.add('hidden');
    els.btnStartOptimize.disabled = true;
    
    // Animate score status
    els.optimizeScore.textContent = "--";
    els.optimizeStatus.textContent = "Escaneando...";
    els.optimizeRingFill.style.strokeDashoffset = "534";
    els.optimizeRingFill.classList.add('optimize-active');
    
    if (window.AndroidApp && window.AndroidApp.startAppScan) {
        window.AndroidApp.startAppScan();
    } else {
        // Simulated scan for browser debug
        setTimeout(() => {
            const mockApps = [
                { name: "WhatsApp", packageName: "com.whatsapp", cacheSize: 425987120, isSystem: false, icon: "" },
                { name: "Chrome", packageName: "com.android.chrome", cacheSize: 289123400, isSystem: true, icon: "" },
                { name: "Instagram", packageName: "com.instagram.android", cacheSize: 521876500, isSystem: false, icon: "" },
                { name: "YouTube", packageName: "com.google.android.youtube", cacheSize: 312000000, isSystem: true, icon: "" },
                { name: "Luna (Ciserli)", packageName: "com.example.luna", cacheSize: 1543000, isSystem: false, icon: "" }
            ];
            window.onScanComplete(JSON.stringify(mockApps));
        }, 1500);
    }
}

// Global callback triggered by Android java interface
window.onScanComplete = function(appsJson) {
    try {
        scannedApps = JSON.parse(appsJson);
        lastScanTime = new Date();
        renderScanResults();
    } catch (e) {
        console.error("Error parsing scan results:", e);
        window.onScanError("Error de formato de datos.");
    }
};

window.onScanError = function(errorMsg) {
    els.optimizeScanLoading.classList.add('hidden');
    els.optimizeResultsCard.classList.remove('hidden');
    
    els.optimizeScore.textContent = "❌";
    els.optimizeStatus.textContent = "Error";
    els.optimizeRingFill.classList.remove('optimize-active');
    
    alert("Error de escaneo: " + errorMsg);
};

function renderScanResults() {
    els.optimizeScanLoading.classList.add('hidden');
    els.optimizeResultsCard.classList.remove('hidden');
    els.optimizeRingFill.classList.remove('optimize-active');
    
    // Sort applications: user apps with cache first, then by size descending
    scannedApps.sort((a, b) => b.cacheSize - a.cacheSize);
    
    // Calculate total cache size
    let totalCacheBytes = 0;
    scannedApps.forEach(app => {
        totalCacheBytes += app.cacheSize;
    });
    
    els.optimizeTotalCache.textContent = formatBytes(totalCacheBytes);
    els.optimizeTotalApps.textContent = scannedApps.length;
    
    if (lastScanTime) {
        const timeStr = lastScanTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        els.optimizeLastTime.textContent = timeStr;
    } else {
        els.optimizeLastTime.textContent = "Ahora";
    }
    
    // Determine Score & Health status based on cache size
    let score = 100;
    let statusText = "Excelente";
    let scoreColor = "var(--gold-primary)";
    
    if (totalCacheBytes > 1024 * 1024 * 1024) { // > 1 GB
        score = 50;
        statusText = "Crítico";
        scoreColor = "var(--crimson-period)";
    } else if (totalCacheBytes > 500 * 1024 * 1024) { // > 500 MB
        score = 75;
        statusText = "Regular";
    } else if (totalCacheBytes > 100 * 1024 * 1024) { // > 100 MB
        score = 90;
        statusText = "Bueno";
    }
    
    els.optimizeScore.textContent = score;
    els.optimizeStatus.textContent = statusText;
    els.optimizeScore.style.color = scoreColor;
    
    // Draw ring progress
    const progressPercent = score / 100;
    const dashoffset = Math.max(0, Math.min(534, 534 - (534 * progressPercent)));
    els.optimizeRingFill.style.strokeDashoffset = dashoffset;
    
    // Enable optimizing button if we have apps or cache
    els.btnStartOptimize.disabled = false;
    els.btnOptimizeText.textContent = "Optimizar Dispositivo";
    
    // Build list
    els.optimizeAppsList.innerHTML = "";
    if (scannedApps.length === 0) {
        els.optimizeAppsList.innerHTML = '<div class="empty-state">No se detectó caché en ninguna aplicación. ¡Tu cel está limpio!</div>';
        return;
    }
    
    scannedApps.forEach(app => {
        const row = document.createElement('div');
        row.className = "optimize-app-item";
        
        // Icon base64
        const iconSrc = app.icon ? `data:image/png;base64,${app.icon}` : 'icon.svg';
        const formattedCache = formatBytes(app.cacheSize);
        
        row.innerHTML = `
            <div class="optimize-app-info">
                <img class="optimize-app-icon" src="${iconSrc}" onerror="this.src='icon.svg'">
                <div class="optimize-app-meta">
                    <span class="optimize-app-name">${app.name}</span>
                    <span class="optimize-app-pkg">${app.packageName}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="optimize-app-size">${formattedCache}</span>
                <input type="checkbox" class="optimize-app-checkbox" data-package="${app.packageName}" checked>
            </div>
        `;
        
        // Clicking on the item opens settings to clear cache manually
        row.addEventListener('click', (e) => {
            // Prevent trigger if clicking the checkbox
            if (e.target.classList.contains('optimize-app-checkbox')) {
                return;
            }
            
            if (confirm(`¿Quieres abrir la configuración de ${app.name} para borrar su caché manualmente?`)) {
                if (window.AndroidApp && window.AndroidApp.openAppSettings) {
                    window.AndroidApp.openAppSettings(app.packageName);
                } else {
                    alert(`Redirección simulada a Ajustes de ${app.packageName}`);
                }
            }
        });
        
        els.optimizeAppsList.appendChild(row);
    });
}

function optimizeDevice() {
    // Get checked apps to close processes
    const checkboxes = document.querySelectorAll('.optimize-app-checkbox:checked');
    const selectedPackages = [];
    checkboxes.forEach(cb => {
        selectedPackages.push(cb.getAttribute('data-package'));
    });
    
    els.btnStartOptimize.disabled = true;
    els.btnOptimizeText.textContent = "Optimizando...";
    els.optimizeRingFill.classList.add('optimize-active');
    
    if (window.AndroidApp && window.AndroidApp.optimizeApps) {
        setTimeout(() => {
            try {
                const resultStr = window.AndroidApp.optimizeApps(JSON.stringify(selectedPackages));
                const result = JSON.parse(resultStr);
                
                if (result.success) {
                    const ramFormatted = formatBytes(result.ramFreed);
                    const ownCacheFormatted = formatBytes(result.ownCacheFreed);
                    const systemCleanedFormatted = formatBytes(result.systemCleaned);
                    
                    alert(`✨ ¡Celular Optimizado! ✨\n\n- Memoria RAM liberada: ${ramFormatted}\n- Caché propia de Ciserli eliminada: ${ownCacheFormatted}\n- Petición de limpieza de caché al sistema Android completada exitosamente.`);
                    
                    // Rescan to update the sizes
                    startScanAfterOptimization();
                } else {
                    alert("Error al optimizar: " + (result.error || "Desconocido"));
                    els.btnStartOptimize.disabled = false;
                    els.btnOptimizeText.textContent = "Optimizar Dispositivo";
                    els.optimizeRingFill.classList.remove('optimize-active');
                }
            } catch (err) {
                alert("Error durante la optimización: " + err.message);
                els.btnStartOptimize.disabled = false;
                els.btnOptimizeText.textContent = "Optimizar Dispositivo";
                els.optimizeRingFill.classList.remove('optimize-active');
            }
        }, 1200);
    } else {
        // simulated optimization for desktop browser testing
        setTimeout(() => {
            alert(`✨ ¡Celular Optimizado (Simulado)! ✨\n\n- Memoria RAM liberada: 250 MB\n- Caché de apps limpiada por el sistema: 520 MB`);
            
            // Clear simulated cache sizes
            scannedApps.forEach(app => {
                if (selectedPackages.includes(app.packageName)) {
                    app.cacheSize = 0;
                }
            });
            
            renderScanResults();
        }, 2000);
    }
}

function startScanAfterOptimization() {
    // Slight timeout before scanning to allow OS processes to finish closing
    setTimeout(() => {
        startOptimizeScan();
    }, 1500);
}

