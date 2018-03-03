function myFunction() {
    var field = document.getElementById("copiedGradeReport")
    alert(field.value);
}
function extractSession() {
    var rx = /FW[0-9][0-9]/;
    var lgString = document.getElementById("copiedGradeReport").value;
    var sessions = lgString.match(/[A-z]{2}\d{2}/g);
    var courseCodes = lgString.match(/[A-z]{2}\s[A-z]{2,4}\s+\d{4}/g);
    var courseCredit = lgString.match(/\d*\.\d{2}/g);
    var courseTitle = lgString.match(/\t[\D\u002C?\u003A?\u002E?\u0020*]+\t/g);
    var courseGrade = lgString.match(/\t[A-F]{1,4}\+?\-?\n|\t[A-F]{1,4}\+?\-?$|in progress|\t[A-F]\+?\-?\u0020+NCR|\t[A-F]\+?\-?\u0020+NGR/g);
    for (var i = 0; i < courseTitle.length; ++i){
        courseTitle[i] = courseTitle[i].replace(/\t|\n/g,'');
    }
    for (var i = 0; i < courseGrade.length; ++i){
        courseGrade[i] = courseGrade[i].replace(/\t|\n/g,'');
    }
    var x = document.getElementById('gpaTable').tBodies[0];

    var j = ((sessions.length + 1)- x.rows.length);
    for (var i = 0; i < j; i++){
        insertRow();
    }

    for (var i = 0; i < sessions.length; ++i){
        x.rows[i].getElementsByTagName('input')[0].value = sessions[i];
        x.rows[i].getElementsByTagName('input')[1].value = courseCodes[i];
        x.rows[i].getElementsByTagName('input')[2].value = courseCredit[i];
        x.rows[i].getElementsByTagName('input')[3].value = courseTitle[i];
        x.rows[i].getElementsByTagName('input')[4].value = courseGrade[i]
        x.rows[i].getElementsByTagName('input')[5].value = calcNine(courseGrade[i]);
        x.rows[i].getElementsByTagName('input')[6].value = calcFour(courseGrade[i]);
    }
    // alert(sessions.length + " Sessions are as follows:\n" + sessions.join("\n"));
    // alert(courseCodes.length + " Course codes are as follows\n" + courseCodes.join("\n"));
    // alert(courseCredit.length + " Course credits are as follows\n" + courseCredit.join("\n"));
    // alert(courseTitle.length + " Course titles are as follows\n" + courseTitle.join("\n"));
    // alert(courseGrade.length + " Course grades are as follows\n" + courseGrade.join("\n"));
}
function insertRow() {
    var x = document.getElementById('gpaTable').tBodies[0];
    var new_row = x.rows[0].cloneNode(true);
    var len = x.rows.length;
    var inp0 = new_row.cells[0].getElementsByTagName('input')[0];
    inp0.id += len;
    inp0.value = '';
    var inp1 = new_row.cells[1].getElementsByTagName('input')[0];
    inp1.id += len;
    inp1.value = '';
    var inp2 = new_row.cells[2].getElementsByTagName('input')[0];
    inp2.id += len;
    inp2.value = '';
    var inp3 = new_row.cells[3].getElementsByTagName('input')[0];
    inp3.id += len;
    inp3.value = '';
    var inp4 = new_row.cells[4].getElementsByTagName('input')[0];
    inp4.id += len;
    inp4.value = '';
    x.appendChild(new_row);
    var inp5 = new_row.cells[5].getElementsByTagName('input')[0];
    inp5.id += len;
    inp5.value = '';
    x.appendChild(new_row);
    var inp6 = new_row.cells[6].getElementsByTagName('input')[0];
    inp6.id += len;
    inp6.value = '';
    x.appendChild(new_row);
}

function calcNine(letterG) {
    letterG = letterG.replace(/\s|NGR/g, "");
    letterG = letterG.toUpperCase();
    switch (letterG) {
        case "A+":
            numberG = 9;
            break;
        case "A":
            numberG = 8;
            break;
        case "B+":
            numberG = 7;
            break;
        case "B":
            numberG = 6;
            break;
        case "C+":
            numberG = 5;
            break;
        case "C":
            numberG = 4;
            break;
        case "D+":
            numberG = 3;
            break;
        case "D":
            numberG = 2;
            break;
        case "E":
            numberG = 1;
            break;
        case "F":
            numberG = 0;
            break;
        default:
            numberG = "N/A"
    }
    return numberG;
}
function calcFour(letterG) {
    letterG = letterG.replace(/\s|NGR/g, "");
    letterG = letterG.toUpperCase();
    switch (letterG) {
        case "A+":
            numberG = 4;
            break;
        case "A":
            numberG = 3.8;
            break;
        case "A-":
            numberG = 3.7;
            break;
        case "B+":
            numberG = 3.3;
            break;
        case "B":
            numberG = 3;
            break;
        case "B-":
            numberG = 2.7;
            break;
        case "C+":
            numberG = 2.3;
            break;
        case "C":
            numberG = 2;
            break;
        case "C-":
            numberG = 1.7;
            break;
        case "D+":
            numberG = 1.3;
            break;
        case "D":
            numberG = 1;
            break;
        case "D-":
            numberG = 0.7;
            break;
        case "E":
            numberG = 0;
            break;
        case "F":
            numberG = 0;
            break;
        default:
            numberG = "N/A";}
    return numberG;
}

function inputChecksAndUpdates (x) {
    isRowOfInputsPopulated(x);
    updateScales(x);
}

function isRowOfInputsPopulated(x) {
    var row = x.parentNode.parentNode;
    var numberOfRows = document.getElementById("gpaTable").getElementsByTagName('tr').length - 1;
    var numberOfInputs = document.getElementById("gpaTable").rows[numberOfRows].getElementsByTagName('input').length;
    var arr;
    var isInputFilled = false;
    for( var i = 0; i < numberOfInputs; i++) {
        var inputValue = document.getElementById("gpaTable").rows[numberOfRows].getElementsByTagName('input')[i].value
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
    var row = x.parentNode.parentNode;
    var i = row.rowIndex;
    document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value = calcNine(row.getElementsByTagName('input')[4].value);
}
function updateFourScale(x) {
    var row = x.parentNode.parentNode;
    var i = row.rowIndex;
    document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value = calcFour(row.getElementsByTagName('input')[4].value);
}
function calcGPAFourScale() {
    var x = document.getElementById("gpaTable").rows.length;
    // alert(document.getElementById("gpaTable").rows[1].getElementsByTagName('input')[5].value);
    var sumProd = 0;
    var sumCred = 0;
    var gpaScale = 0;
    for(var i = 1; i <= x - 1; i++) {
        document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value = calcNine(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[4].value);
        document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value = calcFour(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[4].value);
        var checkIfInt = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value == parseInt(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value);
        var checkIfloat = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value == parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value);

        if ( checkIfInt || checkIfloat) {
            sumCred = sumCred + parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value);
            sumProd = sumProd + (parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[6].value)*parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value));
            gpaScale = sumProd / sumCred;

        }
    }
    // alert(sumCred);
    // alert(sumProd);
    // alert(gpaScale);
    return gpaScale;
}
function calcGPA() {
    calcGPAFourScale();
}

function calcGPANineScale() {
    var x = document.getElementById("gpaTable").rows.length;
    // alert(document.getElementById("gpaTable").rows[1].getElementsByTagName('input')[5].value);
    var sumProd = 0;
    var sumCred = 0;
    var gpaScale = 0;
    for(var i = 1; i <= x - 1; i++) {
        var checkIfInt = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value == parseInt(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value);
        var checkIfloat = document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value == parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value);

        if ( checkIfInt || checkIfloat) {
            sumCred = sumCred + parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value);
            sumProd = sumProd + (parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[5].value)*parseFloat(document.getElementById("gpaTable").rows[i].getElementsByTagName('input')[2].value));
            gpaScale = sumProd / sumCred;
        }
    }
    // alert(sumCred);
    // alert(sumProd);
    // alert(gpaFourScale);
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
