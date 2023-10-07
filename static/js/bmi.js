document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById('weight');
    let heightInput = document.getElementById('height');

    let bmiResult = document.getElementById('bmi-result');
    
    let bmiTable = document.getElementById('bmi-table');

    function calculateBMI(weight, height) {
        return weight / (height * height);
    }

    function createBMITableView() {
        let table = document.createElement('table');
        table.classList.add('p-article__table__bmi2');

        let bmiRanges = [
            { min: -Infinity, max: 15.99, description: 'Severe thinness' },
            { min: 16.00, max: 16.99, description: 'Moderate thinness' },
            { min: 17.00, max: 18.49, description: 'Mild thinness' },
            { min: 18.50, max: 24.99, description: 'Normal range' },
            { min: 25.00, max: 29.99, description: 'Pre-obese' },
            { min: 30.00, max: 34.99, description: 'Obese class1' },
            { min: 35.00, max: 39.99, description: 'Obese class2' },
            { min: 40.00, max: Infinity, description: 'Obese class3' }
        ];

        let thead = document.createElement('thead');
        let trHead = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.innerHTML = '<strong>Classification</strong>';
        let th2 = document.createElement('th');
        th2.innerHTML = '<strong>BMI（kg/m<sup>2</sup>）</strong>';
        trHead.appendChild(th1);
        trHead.appendChild(th2);
        thead.appendChild(trHead);
        table.appendChild(thead);

        let tbody = document.createElement('tbody');
        for (let i = 0; i < bmiRanges.length; i++) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.innerHTML = `<span>${bmiRanges[i].description}</span>`;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            if (bmiRanges[i].min === -Infinity) {
                td2.innerHTML = `<span>- ${bmiRanges[i].max}</span>`;
            } else if (bmiRanges[i].max === Infinity) {
                td2.innerHTML = `<span>${bmiRanges[i].min} -</span>`;
            } else {
                td2.innerHTML = `<span>${bmiRanges[i].min} - ${bmiRanges[i].max}</span>`;
            }
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        bmiTable.appendChild(table);
    }

    function updateBMITableView(bmi) {
        let rows = bmiTable.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].rows;

        for (let i = 0; i < rows.length; i++) {
            let range = rows[i].cells[1].innerText.split(' - ');
            let min, max;
            if (range[0] === '-') {
                min = -Infinity;
                max = parseFloat(range[1]);
            } else if (range[1] === '') {
                min = parseFloat(range[0]);
                max = Infinity;
            } else {
                min = parseFloat(range[0]);
                max = parseFloat(range[1]);
            }

            if (bmi >= min && bmi < max) {
                rows[i].style.backgroundColor = '#edcaff';
            } else if (bmi >= 40 && rows[i].cells[0].innerText.includes('Obese class3')) {
                rows[i].style.backgroundColor = '#edcaff';
            } else if (bmi <= 15.99 && rows[i].cells[0].innerText.includes('Severe thinness')) {
                rows[i].style.backgroundColor = '#edcaff';
            } else {
                rows[i].style.backgroundColor = '';
            }
            
        }
    }

    createBMITableView();

    document.getElementById('calculate-bmi').addEventListener('click', () => {

        let weight = weightInput.value;
        let height = heightInput.value / 100;

        let bmi = calculateBMI(weight, height);

        bmiResult.innerHTML = bmi.toFixed(2);

        updateBMITableView(bmi);
    });

});
