document.getElementById('csvFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        renderTable(rows);
    };
    reader.readAsText(file);
}

function renderTable(data) {
    const table = document.createElement('table');
    data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const td = document.createElement('td');
            td.textContent = formatCell(cell);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(table);
    registerClicks();
}

function formatCell(cell) {
    if (cell.trim().startsWith('971') && !isNaN(parseFloat(cell.trim()))) {
        return '0' + cell.trim().substring(3);
    }
    return cell;
}

function registerClicks() {
    const table = document.querySelector('#tableContainer table');
    table.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'TD' && !isNaN(parseFloat(target.textContent))) {
            target.classList.toggle('clicked');
        }
    });
}