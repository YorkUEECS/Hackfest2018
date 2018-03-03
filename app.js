function myFunction() {
    let field = document.getElementById("copiedGradeReport")
    console.log(field.value);
}
function extractSession() {
    let rx = /FW[0-9][0-9]/;
    let lgString = document.getElementById("copiedGradeReport").value;
    let sessions = lgString.match(/[A-z]{2}\d{2}/g);
    let courseCodes = lgString.match(/[A-z]{2}\s[A-z]{2,4}\s+\d{4}/g);
    let courseCredit = lgString.match(/\d*\.\d{2}/g);
    let courseTitle = lgString.match(/\t[\D\u002C?\u003A?\u002E?\u0020*]+\t/g);
    let courseGrade = lgString.match(/\t[A-F]{1,4}\+?\-?\n|\t[A-F]{1,4}\+?\-?$|in progress|\t[A-F]\+?\-?\u0020+NCR|\t[A-F]\+?\-?\u0020+NGR/g);
    for (let i = 0; i < courseTitle.length; ++i){
        courseTitle[i] = courseTitle[i].replace(/\t|\n/g,'');
    }
    for (let i = 0; i < courseGrade.length; ++i){
        courseGrade[i] = courseGrade[i].replace(/\t|\n/g,'');
    }
    let x = document.getElementById('gpaTable').tBodies[0];

    let j = ((sessions.length + 1)- x.rows.length);
    for (let i = 0; i < j; i++){
        insertRow();
    }

    for (let i = 0; i < sessions.length; ++i){
        x.rows[i].getElementsByTagName('input')[0].value = sessions[i];
        x.rows[i].getElementsByTagName('input')[1].value = courseCodes[i];
        x.rows[i].getElementsByTagName('input')[2].value = courseCredit[i];
        x.rows[i].getElementsByTagName('input')[3].value = courseTitle[i];
        x.rows[i].getElementsByTagName('input')[4].value = courseGrade[i]
        x.rows[i].getElementsByTagName('input')[5].value = calcNine(courseGrade[i]);
        x.rows[i].getElementsByTagName('input')[6].value = calcFour(courseGrade[i]);
    }
    // console.log(sessions.length + " Sessions are as follows:\n" + sessions.join("\n"));
    // console.log(courseCodes.length + " Course codes are as follows\n" + courseCodes.join("\n"));
    // console.log(courseCredit.length + " Course credits are as follows\n" + courseCredit.join("\n"));
    // console.log(courseTitle.length + " Course titles are as follows\n" + courseTitle.join("\n"));
    // console.log(courseGrade.length + " Course grades are as follows\n" + courseGrade.join("\n"));
}
function insertRow() {
    let x = document.getElementById('gpaTable').tBodies[0];
    let new_row = x.rows[0].cloneNode(true);
    let len = x.rows.length;
    let inp0 = new_row.cells[0].getElementsByTagName('input')[0];
    inp0.id += len;
    inp0.value = '';
    let inp1 = new_row.cells[1].getElementsByTagName('input')[0];
    inp1.id += len;
    inp1.value = '';
    let inp2 = new_row.cells[2].getElementsByTagName('input')[0];
    inp2.id += len;
    inp2.value = '';
    let inp3 = new_row.cells[3].getElementsByTagName('input')[0];
    inp3.id += len;
    inp3.value = '';
    let inp4 = new_row.cells[4].getElementsByTagName('input')[0];
    inp4.id += len;
    inp4.value = '';
    x.appendChild(new_row);
    let inp5 = new_row.cells[5].getElementsByTagName('input')[0];
    inp5.id += len;
    inp5.value = '';
    x.appendChild(new_row);
    let inp6 = new_row.cells[6].getElementsByTagName('input')[0];
    inp6.id += len;
    inp6.value = '';
    x.appendChild(new_row);
}

function calcNine(letterG) {
    letterG = letterG.replace(/\s|NGR/g, "").toUpperCase();

    const numberGrade = {
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C+': 5,
        'C': 4,
        'D+': 3,
        'D': 2,
        'E': 1,
        'F': 0
    };

    return numberGrade.hasOwnProperty(letterG) ? numberGrade[letterG] : 'N/A';
}

function calcFour(letterG) {
    letterG = letterG.replace(/\s|NGR/g, "").toUpperCase();

    const numberGrade = {
        'A+': 4,
        'A': 3.8,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1,
        'D-': 0.7,
        'E': 0,
        'F': 0
    };

    return numberGrade.hasOwnProperty(letterG) ? numberGrade[letterG] : 'N/A';
}

function inputChecksAndUpdates (x) {
    isRowOfInputsPopulated(x);
    updateScales(x);
}

function isRowOfInputsPopulated(x) {
    let row = x.parentNode.parentNode;
    let numberOfRows = document.getElementById("gpaTable").getElementsByTagName('tr').length - 1;
    let numberOfInputs = document.getElementById("gpaTable").rows[numberOfRows].getElementsByTagName('input').length;
    let arr;
    let isInputFilled = false;
    for( let i = 0; i < numberOfInputs; i++) {
        let inputValue = document.getElementById("gpaTable").rows[numberOfRows].getElementsByTagName('input')[i].value
        if (!(inputValue == "" || inputValue == null)) {
            isInputFilled = true;
            break
        }
    }
    if (isInputFilled){
        insertRow();
    }
}

function updateScales(x) {
    updateFourScale(x);
    updateNineScale(x);
}

function updateNineScale(x) {
    let row = x.parentNode.parentNode;
    let i = row.rowIndex;
    document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value = calcNine(row.getElementsByTagName('input')[4].value);
}
function updateFourScale(x) {
    let row = x.parentNode.parentNode;
    let i = row.rowIndex;
    document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value = calcFour(row.getElementsByTagName('input')[4].value);
}
function calcGPAFourScale() {
    let x = document.getElementById("gpaTable").rows.length;
    // console.log(document.getElementById("gpaTable").rows[1].getElementsByTagName('input')[5].value);
    let sumProd = 0;
    let sumCred = 0;
    let gpaScale = 0;
    for(let i = 1; i <= x - 1; i++) {
        document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value = calcNine(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[4].value);
        document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value = calcFour(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[4].value);
        let checkIfInt = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value == parseInt(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value);
        let checkIfloat = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value == parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value);

        if ( checkIfInt || checkIfloat) {
            sumCred = sumCred + parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value);
            sumProd = sumProd + (parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value)*parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value));
            gpaScale = sumProd / sumCred;

        }
    }
    // console.log(sumCred);
    // console.log(sumProd);
    // console.log(gpaScale);
    return gpaScale;
}
function calcGPA() {
    calcGPAFourScale();
}

function calcGPANineScale() {
    let x = document.getElementById("gpaTable").rows.length;
    // console.log(document.getElementById("gpaTable").rows[1].getElementsByTagName('input')[5].value);
    let sumProd = 0;
    let sumCred = 0;
    let gpaScale = 0;
    for(let i = 1; i <= x - 1; i++) {
        let checkIfInt = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value == parseInt(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value);
        let checkIfloat = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value == parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value);

        if ( checkIfInt || checkIfloat) {
            sumCred = sumCred + parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value);
            sumProd = sumProd + (parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value)*parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value));
            gpaScale = sumProd / sumCred;
        }
    }
    // console.log(sumCred);
    // console.log(sumProd);
    // console.log(gpaFourScale);
    return gpaScale;
}

function calcGPA() {
    swal(`${calcGPANineScale().toFixed(2)}`, "GPA in YorkU Scale: " + calcGPANineScale().toFixed(2), "success");
    swal(`${calcGPAFourScale().toFixed(2)}`, "GPA in 4.0 Scale: " + calcGPAFourScale().toFixed(2), "success");
    swal({
        title: "GPA Calculated!",
        text: `YorkU Scale: ${calcGPANineScale().toFixed(2)} \n 4.0 Scale: ${calcGPAFourScale().toFixed(2)}`,
        icon: "success"
    });
}
