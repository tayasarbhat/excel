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
    const headers = data[0]; // Assuming first row is headers
    const dncrFlagIndex = headers.indexOf('DNCR_FLAG'); // Find the index of DNCR_FLAG in the headers
    const table = document.createElement('table');

    // Create a header row for serial numbering
    const headerRow = document.createElement('tr');
    const snHeader = document.createElement('th');
    snHeader.textContent = 'S/N';
    headerRow.appendChild(snHeader);

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let count = 1; // Initialize serial number count
    data.slice(1).forEach((row, rowIndex) => { // Skip header row for data processing
        if (row[dncrFlagIndex] && row[dncrFlagIndex].trim() === 'N') {
            const tr = document.createElement('tr');
            const snCell = document.createElement('td'); // Serial number cell
            snCell.textContent = count++;
            tr.appendChild(snCell);

            row.forEach((cell, cellIndex) => {
                const td = document.createElement('td');
                td.textContent = formatCell(cell);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        }
    });

    document.getElementById('tableContainer').innerHTML = ''; // Clear previous table
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