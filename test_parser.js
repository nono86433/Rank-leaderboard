const fs = require('fs');

fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://docs.google.com/spreadsheets/d/1bgy4owByRpPaw0VUzx6FIsYv_SR1Gdz0ys8asucBM24/export?format=csv&gid=0&t=' + Date.now()))
.then(res => res.text())
.then(csv => {
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
        } else {
            console.log('Skipped line (too few cells):', line);
        }
    });
    console.log('Total parsed:', parsedData.length);
    console.log('First 5:', parsedData.slice(0, 5));
    console.log('Last 5:', parsedData.slice(-5));
});
