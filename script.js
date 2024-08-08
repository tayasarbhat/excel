document.getElementById('excelFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const htmlString = XLSX.utils.sheet_to_html(worksheet);
        document.getElementById('tableContainer').innerHTML = htmlString;

        adjustNumbers(); // Adjust numbers that start with 971
        registerClicks();
    };
    reader.readAsArrayBuffer(file);
}

function adjustNumbers() {
    const cells = document.querySelectorAll('#tableContainer td');
    cells.forEach(cell => {
        if (cell.textContent.startsWith('971')) {
            cell.textContent = '0' + cell.textContent.slice(3);
        }
    });
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
