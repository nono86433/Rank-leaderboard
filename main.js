const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1bgy4owByRpPaw0VUzx6FIsYv_SR1Gdz0ys8asucBM24/export?format=csv&gid=0';

// 內建預設幣別資料 (以防同步失敗)
const DEFAULT_CURRENCIES = [
  {
    "name": "CNY",
    "ratio": "1",
    "rate": 4.6
  },
  {
    "name": "USD",
    "ratio": "0.1",
    "rate": 32.5
  },
  {
    "name": "THB",
    "ratio": "1",
    "rate": 1
  },
  {
    "name": "VND_t",
    "ratio": "1000",
    "rate": 0.0014
  },
  {
    "name": "MMK",
    "ratio": "100",
    "rate": 0.023
  },
  {
    "name": "INR",
    "ratio": "1",
    "rate": 0.43
  },
  {
    "name": "IDR",
    "ratio": "1000",
    "rate": 0.0021
  },
  {
    "name": "MYR",
    "ratio": "1",
    "rate": 7.5
  },
  {
    "name": "VND",
    "ratio": "1000",
    "rate": 0.0014
  },
  {
    "name": "IDR_t",
    "ratio": "1000",
    "rate": 0.0021
  },
  {
    "name": "kVND",
    "ratio": "1",
    "rate": 1.4
  },
  {
    "name": "kIDR",
    "ratio": "1",
    "rate": 2.1
  },
  {
    "name": "JPY",
    "ratio": "1",
    "rate": 0.3
  },
  {
    "name": "BND",
    "ratio": "0.1",
    "rate": 22.88
  },
  {
    "name": "SGD",
    "ratio": "0.1",
    "rate": 22.89
  },
  {
    "name": "HKD",
    "ratio": "1",
    "rate": 4.03
  },
  {
    "name": "PHP",
    "ratio": "1",
    "rate": 0.64
  },
  {
    "name": "RUB",
    "ratio": "1",
    "rate": 0.42
  },
  {
    "name": "THB01",
    "ratio": "0.1",
    "rate": 1
  },
  {
    "name": "MYR01",
    "ratio": "0.1",
    "rate": 7.5
  },
  {
    "name": "BDT",
    "ratio": "1",
    "rate": 0.37
  },
  {
    "name": "kMMK",
    "ratio": "0.1",
    "rate": 23
  },
  {
    "name": "AUD",
    "ratio": "0.1",
    "rate": 22.8622
  },
  {
    "name": "KZT",
    "ratio": "10",
    "rate": 0.07416
  },
  {
    "name": "CLP",
    "ratio": "10",
    "rate": 0.041
  },
  {
    "name": "mmyr",
    "ratio": "1",
    "rate": 0.075
  },
  {
    "name": "LKR",
    "ratio": "1",
    "rate": 0.16
  },
  {
    "name": "NGN",
    "ratio": "100",
    "rate": 0.022
  },
  {
    "name": "BRL",
    "ratio": "0.1",
    "rate": 5.75
  },
  {
    "name": "TND",
    "ratio": "0.1",
    "rate": 11.43
  },
  {
    "name": "MXN",
    "ratio": "1",
    "rate": 1.55
  },
  {
    "name": "cMMK",
    "ratio": "1",
    "rate": 2.3
  },
  {
    "name": "PKR",
    "ratio": "10",
    "rate": 0.2
  },
  {
    "name": "kVND_h",
    "ratio": "100",
    "rate": 0.014
  },
  {
    "name": "kKHR",
    "ratio": "0.1",
    "rate": 7.9
  },
  {
    "name": "kLAK",
    "ratio": "0.1",
    "rate": 3.4
  },
  {
    "name": "KRW",
    "ratio": "100",
    "rate": 0.031
  },
  {
    "name": "EUR",
    "ratio": "0.1",
    "rate": 39.2
  },
  {
    "name": "AMD",
    "ratio": "10",
    "rate": 0.071
  },
  {
    "name": "INR_115",
    "ratio": "100",
    "rate": 0.003739
  },
  {
    "name": "BDT_100",
    "ratio": "100",
    "rate": 0.0037
  },
  {
    "name": "USDT",
    "ratio": "0.1",
    "rate": 32.33
  },
  {
    "name": "Silver",
    "ratio": "100",
    "rate": 1e-8
  },
  {
    "name": "PEN",
    "ratio": "0.1",
    "rate": 8.94
  },
  {
    "name": "ARS",
    "ratio": "10",
    "rate": 0.0312
  },
  {
    "name": "CRC",
    "ratio": "10",
    "rate": 0.052
  },
  {
    "name": "NPR",
    "ratio": "1",
    "rate": 0.28
  },
  {
    "name": "GBP",
    "ratio": "0.1",
    "rate": 43.08
  },
  {
    "name": "SEK",
    "ratio": "1",
    "rate": 3.48
  },
  {
    "name": "CHF",
    "ratio": "0.1",
    "rate": 30
  },
  {
    "name": "RON",
    "ratio": "0.1",
    "rate": 6.3
  },
  {
    "name": "DKK",
    "ratio": "0.1",
    "rate": 4.19
  },
  {
    "name": "VES",
    "ratio": "10",
    "rate": 0.315
  },
  {
    "name": "BYN",
    "ratio": "0.1",
    "rate": 14.17
  },
  {
    "name": "PLN",
    "ratio": "0.1",
    "rate": 7.7
  },
  {
    "name": "CZK",
    "ratio": "1",
    "rate": 1.49
  },
  {
    "name": "NOK",
    "ratio": "1",
    "rate": 3.58
  },
  {
    "name": "NIO",
    "ratio": "1",
    "rate": 0.99
  },
  {
    "name": "PAB",
    "ratio": "0.1",
    "rate": 35.48
  },
  {
    "name": "HNL",
    "ratio": "1",
    "rate": 1.44
  },
  {
    "name": "GTQ",
    "ratio": "1",
    "rate": 4.58
  },
  {
    "name": "HUF",
    "ratio": "10",
    "rate": 0.093
  },
  {
    "name": "PYG",
    "ratio": "100",
    "rate": 0.0053
  },
  {
    "name": "COP",
    "ratio": "100",
    "rate": 0.007
  },
  {
    "name": "IDR01",
    "ratio": "100",
    "rate": 0.0021
  },
  {
    "name": "Coin",
    "ratio": "1000",
    "rate": 0.001083
  },
  {
    "name": "0.1mUSD",
    "ratio": "1000",
    "rate": 0.00325
  },
  {
    "name": "mUSD",
    "ratio": "1000",
    "rate": 0.0325
  },
  {
    "name": "ZAR",
    "ratio": "1",
    "rate": 1.86
  },
  {
    "name": "GHS",
    "ratio": "1",
    "rate": 3.13
  },
  {
    "name": "KES",
    "ratio": "1",
    "rate": 0.25
  },
  {
    "name": "CAD",
    "ratio": "0.1",
    "rate": 26.5
  },
  {
    "name": "BOB",
    "ratio": "1",
    "rate": 4.93
  },
  {
    "name": "USD_10000",
    "ratio": "10",
    "rate": 0.00325
  },
  {
    "name": "USD_1000",
    "ratio": "10",
    "rate": 0.0325
  },
  {
    "name": "PHP_1000",
    "ratio": "100",
    "rate": 0.00064
  },
  {
    "name": "PHP_100",
    "ratio": "100",
    "rate": 0.0064
  },
  {
    "name": "TRY",
    "ratio": "1",
    "rate": 1.32
  },
  {
    "name": "JPY10",
    "ratio": "1",
    "rate": 3
  },
  {
    "name": "SC",
    "ratio": "0.1",
    "rate": 32.51
  },
  {
    "name": "GC",
    "ratio": "500",
    "rate": 0.003251
  },
  {
    "name": "NZD",
    "ratio": "0.1",
    "rate": 21.3
  },
  {
    "name": "UAH",
    "ratio": "1",
    "rate": 1.2
  },
  {
    "name": "uBTC",
    "ratio": "1",
    "rate": 1.227
  },
  {
    "name": "mETH",
    "ratio": "0.1",
    "rate": 64.6
  },
  {
    "name": "mLTC",
    "ratio": "1",
    "rate": 2.447
  },
  {
    "name": "DOGE",
    "ratio": "1",
    "rate": 2.57
  },
  {
    "name": "BGN",
    "ratio": "0.1",
    "rate": 19.54
  },
  {
    "name": "UZS",
    "ratio": "100",
    "rate": 0.0029
  },
  {
    "name": "mBCH",
    "ratio": "1",
    "rate": 8.681
  },
  {
    "name": "GEL",
    "ratio": "0.1",
    "rate": 13.4
  },
  {
    "name": "MDL",
    "ratio": "1",
    "rate": 2.01
  },
  {
    "name": "MVR",
    "ratio": "1",
    "rate": 2.34
  },
  {
    "name": "BIF",
    "ratio": "100",
    "rate": 0.0127
  },
  {
    "name": "XOF",
    "ratio": "100",
    "rate": 0.058
  },
  {
    "name": "XAF",
    "ratio": "100",
    "rate": 0.057
  },
  {
    "name": "CDF",
    "ratio": "100",
    "rate": 0.015
  },
  {
    "name": "ZMW",
    "ratio": "1",
    "rate": 1.65
  },
  {
    "name": "MZN",
    "ratio": "10",
    "rate": 0.56
  },
  {
    "name": "AOA",
    "ratio": "100",
    "rate": 0.044
  },
  {
    "name": "ISK",
    "ratio": "10",
    "rate": 0.259
  },
  {
    "name": "MKD",
    "ratio": "10",
    "rate": 0.62
  },
  {
    "name": "AZN",
    "ratio": "0.1",
    "rate": 21.4
  },
  {
    "name": "TZS",
    "ratio": "100",
    "rate": 0.0139
  },
  {
    "name": "UYU",
    "ratio": "1",
    "rate": 0.888
  },
  {
    "name": "UGX",
    "ratio": "100",
    "rate": 0.0091
  },
  {
    "name": "HRK",
    "ratio": "1",
    "rate": 5.008
  },
  {
    "name": "EGP",
    "ratio": "1",
    "rate": 1.11
  },
  {
    "name": "AED",
    "ratio": "0.1",
    "rate": 9.39
  },
  {
    "name": "CUP",
    "ratio": "1",
    "rate": 1.43
  },
  {
    "name": "DZD",
    "ratio": "10",
    "rate": 0.262
  },
  {
    "name": "IQD",
    "ratio": "100",
    "rate": 0.026
  },
  {
    "name": "IRR",
    "ratio": "1000",
    "rate": 0.00082
  },
  {
    "name": "JOD",
    "ratio": "0.1",
    "rate": 48.53
  },
  {
    "name": "KGS",
    "ratio": "10",
    "rate": 0.39
  },
  {
    "name": "KWD",
    "ratio": "0.1",
    "rate": 116.27
  },
  {
    "name": "OMR",
    "ratio": "0.1",
    "rate": 92.92
  },
  {
    "name": "QAR",
    "ratio": "0.1",
    "rate": 9.82
  },
  {
    "name": "SOS",
    "ratio": "100",
    "rate": 0.0635
  },
  {
    "name": "TJS",
    "ratio": "1",
    "rate": 3.27
  },
  {
    "name": "TMT",
    "ratio": "0.1",
    "rate": 10.23
  },
  {
    "name": "XDR",
    "ratio": "0.1",
    "rate": 47.54
  },
  {
    "name": "CUR",
    "ratio": "10",
    "rate": 0.48
  },
  {
    "name": "SAR",
    "ratio": "0.1",
    "rate": 9.51
  },
  {
    "name": "HTG",
    "ratio": "10",
    "rate": 0.288
  },
  {
    "name": "MGA",
    "ratio": "100",
    "rate": 0.0083
  },
  {
    "name": "GMD",
    "ratio": "10",
    "rate": 0.544
  },
  {
    "name": "GNF",
    "ratio": "1000",
    "rate": 0.00433
  },
  {
    "name": "FTN",
    "ratio": "0.1",
    "rate": 81.52
  },
  {
    "name": "TBAL",
    "ratio": "0.1",
    "rate": 18.4
  },
  {
    "name": "SkynetP",
    "ratio": "0.1",
    "rate": 36.47
  },
  {
    "name": "ARSB",
    "ratio": "100",
    "rate": 0.0308
  },
  {
    "name": "mDASH",
    "ratio": "1",
    "rate": 0.926
  },
  {
    "name": "EOS",
    "ratio": "0.1",
    "rate": 17.42
  },
  {
    "name": "mSOL",
    "ratio": "1",
    "rate": 5.059
  },
  {
    "name": "XLM",
    "ratio": "1",
    "rate": 3.44
  },
  {
    "name": "ETB",
    "ratio": "10",
    "rate": 0.268
  },
  {
    "name": "SDG",
    "ratio": "10",
    "rate": 0.065
  },
  {
    "name": "RSD",
    "ratio": "10",
    "rate": 0.334
  },
  {
    "name": "ILS",
    "ratio": "1",
    "rate": 9.07
  },
  {
    "name": "MWK",
    "ratio": "100",
    "rate": 0.0191
  },
  {
    "name": "RWF",
    "ratio": "100",
    "rate": 0.024
  },
  {
    "name": "LSL",
    "ratio": "1",
    "rate": 1.851
  },
  {
    "name": "SLE",
    "ratio": "1",
    "rate": 1.488
  },
  {
    "name": "FC",
    "ratio": "10",
    "rate": 0.3251
  },
  {
    "name": "GC_100",
    "ratio": "5",
    "rate": 0.3251
  },
  {
    "name": "TON_100",
    "ratio": "1",
    "rate": 1.1223
  },
  {
    "name": "BHD",
    "ratio": "0.1",
    "rate": 84.22
  },
  {
    "name": "BWP",
    "ratio": "1",
    "rate": 2.223
  },
  {
    "name": "XRP",
    "ratio": "0.1",
    "rate": 87.12
  },
  {
    "name": "mBNB",
    "ratio": "0.1",
    "rate": 30.97
  },
  {
    "name": "TRX",
    "ratio": "0.1",
    "rate": 10.35
  },
  {
    "name": "ADA",
    "ratio": "0.1",
    "rate": 24.73
  },
  {
    "name": "SC_AED",
    "ratio": "0.1",
    "rate": 9.39
  },
  {
    "name": "BET",
    "ratio": "1000",
    "rate": 0.0073
  },
  {
    "name": "AUD_100",
    "ratio": "10",
    "rate": 0.2286
  },
  {
    "name": "DOP",
    "ratio": "10",
    "rate": 0.567
  },
  {
    "name": "LBP",
    "ratio": "1000",
    "rate": 0.00036
  },
  {
    "name": "NAD",
    "ratio": "1",
    "rate": 1.934
  },
  {
    "name": "LRD",
    "ratio": "10",
    "rate": 0.185
  },
  {
    "name": "BOBB",
    "ratio": "1",
    "rate": 3.49
  }
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

// Google Visualization API JSONP Callback
window.google = {
    visualization: {
        Query: {
            setResponse: function(response) {
                if(response.status !== 'ok') {
                    console.warn('Google Sheets API Error');
                    showToast('同步失敗，Google 試算表回傳錯誤');
                    syncBtn.disabled = false;
                    syncBtn.innerHTML = '同步最新資料';
                    return;
                }
                const parsedData = [];
                response.table.rows.forEach(row => {
                    if(!row.c) return;
                    const nameCell = row.c[2];
                    const ratioCell = row.c[7];
                    const rateCell = row.c[8];
                    
                    if (nameCell && nameCell.v && nameCell.v !== 'name' && nameCell.v !== 'NULL' && (ratioCell || rateCell)) {
                        const name = String(nameCell.v).trim();
                        const ratio = ratioCell && ratioCell.v !== null ? String(ratioCell.v).trim() : '1';
                        const rate = rateCell && rateCell.v !== null ? parseFloat(rateCell.v) : 0;
                        parsedData.push({ name, ratio, rate });
                    }
                });
                
                if (parsedData.length > 0) {
                    allCurrencies = parsedData;
                    renderSelectionList();
                    
                    let hasUpdates = false;
                    selectedCurrencies.forEach(selected => {
                        const latest = parsedData.find(c => c.name === selected.name);
                        if (latest) {
                            if (selected.ratio !== latest.ratio || selected.rate !== latest.rate) {
                                selected.ratio = latest.ratio;
                                selected.rate = latest.rate;
                                hasUpdates = true;
                            }
                        }
                    });
                    
                    if (hasUpdates) {
                        saveState();
                        renderMainTable();
                    }
                }
                showToast('資料同步成功！');
                syncBtn.disabled = false;
                syncBtn.innerHTML = '同步最新資料';
            }
        }
    }
};

// --- Data Fetching ---
function fetchData() {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '正在更新匯率...';
    
    // 移除舊的 script
    const oldScript = document.getElementById('gviz_script');
    if(oldScript) oldScript.remove();
    
    const script = document.createElement('script');
    script.id = 'gviz_script';
    // 將原本的 CSV export URL 轉換為 Google Visualization API URL (JSONP) 以繞過 CORS
    const jsonpUrl = SHEET_URL.replace('/export?format=csv', '/gviz/tq?tqx=out:json');
    script.src = jsonpUrl + '&t=' + Date.now();
    
    script.onerror = () => {
        showToast('同步失敗，可能遇到網路問題');
        syncBtn.disabled = false;
        syncBtn.innerHTML = '同步最新資料';
    };
    
    document.body.appendChild(script);
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
        
        // 更新目前已選取的幣別，讓右邊的計算表也能同步到最新匯率
        let hasUpdates = false;
        selectedCurrencies.forEach(selected => {
            const latest = parsedData.find(c => c.name === selected.name);
            if (latest) {
                if (selected.ratio !== latest.ratio || selected.rate !== latest.rate) {
                    selected.ratio = latest.ratio;
                    selected.rate = latest.rate;
                    hasUpdates = true;
                }
            }
        });
        
        if (hasUpdates) {
            saveState();
            renderMainTable();
        }
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
                ${leaderboardCols}
            </tr>
        `;
    }).join('');
}

function updateHeaders() {
    const staticHeaderCount = 9;
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

window.clearAllCurrencies = () => {
    if (confirm('確定要清空所有已加入的幣別嗎？這將會清除所有的帳號與分數紀錄。')) {
        selectedCurrencies = [];
        saveState();
        renderMainTable();
        showToast('已清空所有幣別');
    }
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
