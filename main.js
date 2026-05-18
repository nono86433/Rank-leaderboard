const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1bgy4owByRpPaw0VUzx6FIsYv_SR1Gdz0ys8asucBM24/export?format=csv&gid=0';

// 內建預設幣別資料 (以防同步失敗)
const DEFAULT_CURRENCIES = [
    {name: "CNY", ratio: "1", rate: 4.6},
    {name: "USD", ratio: "0.1", rate: 32.5},
    {name: "THB", ratio: "1", rate: 1},
    {name: "VND_t", ratio: "1000", rate: 0.0014},
    {name: "MMK", ratio: "100", rate: 0.023},
    {name: "INR", ratio: "1", rate: 0.43},
    {name: "IDR", ratio: "1000", rate: 0.0021},
    {name: "MYR", ratio: "1", rate: 7.5},
    {name: "VND", ratio: "1000", rate: 0.0014},
    {name: "IDR_t", ratio: "1000", rate: 0.0021},
    {name: "kVND", ratio: "1", rate: 1.4},
    {name: "kIDR", ratio: "1", rate: 2.1},
    {name: "JPY", ratio: "1", rate: 0.3},
    {name: "BND", ratio: "0.1", rate: 22.88},
    {name: "SGD", ratio: "0.1", rate: 22.89},
    {name: "HKD", ratio: "1", rate: 4.03},
    {name: "PHP", ratio: "1", rate: 0.64},
    {name: "RUB", ratio: "1", rate: 0.42},
    {name: "BDT", ratio: "1", rate: 0.37},
    {name: "AUD", ratio: "0.1", rate: 22.86},
    {name: "EUR", ratio: "0.1", rate: 39.2},
    {name: "USDT", ratio: "0.1", rate: 32.33},
    {name: "BRL", ratio: "0.1", rate: 5.75},
    {name: "MXN", ratio: "1", rate: 1.55},
    {name: "KRW", ratio: "100", rate: 0.031},
    {name: "GBP", ratio: "0.1", rate: 43.08},
    {name: "CAD", ratio: "0.1", rate: 26.5},
    {name: "TRY", ratio: "1", rate: 1.32}
    // ... 更多資料會在同步時載入
];

// State Management
let allCurrencies = [...DEFAULT_CURRENCIES];
let selectedCurrencies = JSON.parse(localStorage.getItem('selected_test_currencies') || '[]');

// DOM Elements
const syncBtn = document.getElementById('syncBtn');
const currencySelectionList = document.getElementById('currencySelectionList');
const searchInput = document.getElementById('searchInput');
const calcTableBody = document.getElementById('calcTableBody');
const tableHeaderRow2 = document.getElementById('tableHeaderRow2');
const leaderboardHeader = document.getElementById('leaderboardHeader');
const toast = document.getElementById('toast');
const csvDataInput = document.getElementById('csvDataInput');

// --- Initialization ---
function init() {
    renderSelectionList();
    renderMainTable();
    
    syncBtn.addEventListener('click', fetchData);
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allCurrencies.filter(c => c.name.toLowerCase().includes(term));
        renderSelectionList(filtered);
    });

    // 背景嘗試同步最新資料
    fetchData();
}

// --- Data Fetching ---
async function fetchData() {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '正在更新匯率...';
    try {
        const targetUrl = SHEET_URL + '&t=' + Date.now();
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.text();
        processCSV(result);
    } catch (error) {
        console.warn('Auto-sync failed, using default data', error);
    } finally {
        syncBtn.disabled = false;
        syncBtn.innerHTML = '同步最新資料';
    }
}

window.handleManualPaste = () => {
    const rawData = csvDataInput.value.trim();
    if (rawData) {
        processCSV(rawData);
        csvDataInput.value = '';
    }
};

function processCSV(csv) {
    const lines = csv.split(/\r?\n/);
    const parsedData = [];
    
    const parseLine = (text) => {
        const result = [];
        let col = '';
        let inQuote = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"' && text[i+1] === '"') {
                col += '"';
                i++;
            } else if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                result.push(col);
                col = '';
            } else {
                col += char;
            }
        }
        result.push(col);
        return result;
    };

    lines.forEach((line, index) => {
        if (index === 0 || !line.trim()) return;
        const cells = parseLine(line);
        if (cells.length >= 9) {
            const name = cells[2]?.trim();
            const ratio = cells[7]?.trim();
            const rate = cells[8]?.trim();
            if (name && name !== 'name' && (ratio || rate)) {
                parsedData.push({ name, ratio: ratio || '1', rate: parseFloat(rate) || 0 });
            }
        }
    });
    if (parsedData.length > 0) {
        allCurrencies = parsedData;
        renderSelectionList();
    }
}

// --- Rendering Selection List ---
function renderSelectionList(data = allCurrencies) {
    currencySelectionList.innerHTML = data.map(item => `
        <div class="currency-item" data-name="${item.name.replace(/"/g, '&quot;')}" onclick="addCurrencyToTable(this.getAttribute('data-name'))">
            <div class="currency-info">
                <span class="name">${item.name}</span>
                <span class="sub">Ratio: ${item.ratio} | Rate: ${item.rate}</span>
            </div>
            <span style="color: #8b5cf6; font-weight: bold; font-size: 1.2rem;">+</span>
        </div>
    `).join('');
}

// --- Main Table Management ---
window.addCurrencyToTable = (name) => {
    const currency = allCurrencies.find(c => c.name === name);
    if (!currency) return;
    
    if (selectedCurrencies.some(c => c.name === name)) {
        showToast(`${name} 已在表格中`);
        return;
    }
    
    const newIdx = selectedCurrencies.length;
    selectedCurrencies.push({
        ...currency,
        account: '',
        scores: [0, 0, 0, 0]
    });
    
    saveState();
    renderMainTable();

    // 自動聚焦到新一行的第一個分數輸入框
    setTimeout(() => {
        const inputs = document.querySelectorAll(`#row-${newIdx} .score-input-main`);
        if (inputs.length > 0) inputs[0].focus();
    }, 50);
};

window.removeCurrencyFromTable = (index) => {
    selectedCurrencies.splice(index, 1);
    saveState();
    renderMainTable();
};

function renderMainTable() {
    updateHeaders();
    
    const itemsWithValue = selectedCurrencies.map((item, idx) => {
        const totalScore = item.scores.reduce((a, b) => a + b, 0);
        const baseValue = totalScore * item.rate;
        return { originalIdx: idx, baseValue };
    });
    
    const sortedForRank = [...itemsWithValue].sort((a, b) => b.baseValue - a.baseValue);
    const rankMap = {};
    sortedForRank.forEach((item, index) => {
        rankMap[item.originalIdx] = index + 1;
    });

    calcTableBody.innerHTML = selectedCurrencies.map((item, rowIdx) => {
        const totalScore = item.scores.reduce((a, b) => a + b, 0);
        const baseValue = totalScore * item.rate;
        const rank = rankMap[rowIdx];
        
        let rankHtml = `<td style="color: #cbd5e1; font-weight: bold;">${rank}</td>`;
        if (rank === 1 && baseValue > 0) rankHtml = `<td style="color: #fbbf24; font-weight: bold;">🏆 1</td>`;
        else if (rank === 2 && baseValue > 0) rankHtml = `<td style="color: #94a3b8; font-weight: bold;">🥈 2</td>`;
        else if (rank === 3 && baseValue > 0) rankHtml = `<td style="color: #b45309; font-weight: bold;">🥉 3</td>`;
        
        const leaderboardCols = selectedCurrencies.map(target => {
            const converted = target.rate !== 0 ? (baseValue / target.rate).toFixed(3) : '0.000';
            return `<td>${converted}</td>`;
        }).join('');
        
        return `
            <tr id="row-${rowIdx}">
                ${rankHtml}
                <td><input type="text" class="score-input" style="width: 100px;" value="${item.account || ''}" placeholder="帳號..." onchange="updateAccount(${rowIdx}, this.value)"></td>
                <td style="background: #0f172a; position: relative; font-weight: 700;">
                    <span style="cursor: pointer; color: #ef4444; position: absolute; left: 5px; top: 50%; transform: translateY(-50%);" onclick="removeCurrencyFromTable(${rowIdx})">×</span>
                    ${item.name}
                </td>
                <td>${item.ratio}</td>
                <td>${item.rate}</td>
                ${item.scores.map((score, scoreIdx) => `
                    <td><input type="number" class="score-input score-input-main" value="${score || ''}" onchange="updateScore(${rowIdx}, ${scoreIdx}, this.value)" style="border: 1px solid #6366f1;"></td>
                `).join('')}
                <td style="font-weight: bold; color: #a855f7; font-size: 1.1rem;">${totalScore.toLocaleString()}</td>
                ${leaderboardCols}
            </tr>
        `;
    }).join('');
}

function updateHeaders() {
    const staticHeaderCount = 10;
    while (tableHeaderRow2.cells.length > staticHeaderCount) {
        tableHeaderRow2.deleteCell(staticHeaderCount);
    }
    
    selectedCurrencies.forEach(c => {
        const th = document.createElement('th');
        th.className = 'bg-green';
        th.innerText = `${c.name}榜`;
        tableHeaderRow2.appendChild(th);
    });
    
    leaderboardHeader.colSpan = selectedCurrencies.length || 1;
}

window.updateAccount = (rowIdx, value) => {
    selectedCurrencies[rowIdx].account = value;
    saveState();
};

window.updateScore = (rowIdx, scoreIdx, value) => {
    selectedCurrencies[rowIdx].scores[scoreIdx] = parseFloat(value) || 0;
    saveState();
    renderMainTable();
};

window.clearAllScores = () => {
    selectedCurrencies.forEach(item => { item.scores = [0, 0, 0, 0]; });
    saveState();
    renderMainTable();
    showToast('已清空所有贏分');
};

window.sortLeaderboard = () => {
    selectedCurrencies.sort((a, b) => {
        const valA = a.scores.reduce((sum, s) => sum + s, 0) * a.rate;
        const valB = b.scores.reduce((sum, s) => sum + s, 0) * b.rate;
        return valB - valA;
    });
    saveState();
    renderMainTable();
    showToast('已按總價值排序');
};

function saveState() {
    localStorage.setItem('selected_test_currencies', JSON.stringify(selectedCurrencies));
}

function showToast(msg) {
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

init();
