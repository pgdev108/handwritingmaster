function addInputList(rowCount = 10) {
    let stringDiv = '';
    let numberOfRows = fetchRowCount() || rowCount;
    let inputDivStr = "<li class='inputRow'> " +
        "<input type='text' class='inputText' maxlength='28' />" +
        "<hr class='textInputHR1' />" +
        "<hr class='textInputHR2' />" +
        "<hr class='textInputHR3' />" +
        "</li>";
    for (let count = 0; count < numberOfRows; count++) {
        stringDiv = stringDiv + inputDivStr;
    }
    document.getElementById('inputList').innerHTML = stringDiv;
    resetCharCount();
}

function updateCharCount() {
    let config = fetchCurrentConfig();
    let rowCount = config.rowCount || 8;
    let rowCharCount = config.rowCharCount || 20;
    var cs = [(parseInt(rowCount) * parseInt(rowCharCount)) - $(this).val().length];
    $('#charLeftDiv').text(cs);      
    copyTexttoWorksheet(document.getElementById("textAreaInput").value);
}

function resetCharCount() {
    let config = fetchCurrentConfig();
    let rowCount = config.rowCount || 8;
    let rowCharCount = config.rowCharCount || 20;
    $('#charLeftDiv').text(parseInt(rowCount) * parseInt(rowCharCount));
    $('#charRemainingText').text(parseInt(rowCount) * parseInt(rowCharCount));
}

function copyTexttoWorksheet(textValue) {
    
    let config = fetchCurrentConfig();
    let numberOfRows = config.rowCount;
    let rowLength = config.rowCharLength;
    console.log ('row char length ', rowLength);
    let rowCount = 0;
    let workSheetTextArr = [];    
    if (textValue.trim() !== '') {
        let textValueArr = textValue.split(' ');
        let testString = '';
        for (let element of textValueArr) {
            if (element.length > rowLength) {
                console.log('Error! Word length greated than ' + rowLength + ' is not allowed');
                return;
            }
            if (!workSheetTextArr[rowCount]) {
                workSheetTextArr[rowCount] = element;
            } else if (workSheetTextArr[rowCount].length + element.length < rowLength) {
                workSheetTextArr[rowCount] = workSheetTextArr[rowCount] + ' ' + element;
            } else {
                rowCount++;
                workSheetTextArr[rowCount] = element;
            }
        }
    }
    for (let count = 0; count < workSheetTextArr.length; count++) {
        let elementArray = document.getElementsByClassName("inputText");
        elementArray[count].value = workSheetTextArr[count];
    }

}

function printWorksheet() {
    window.print();
}

function clearWorksheet() {
    let elementArray = document.getElementsByClassName("inputText");
    for (let element of elementArray) {
        element.value = '';
    }
}

function updateTextColor() {
    $(".inputText").css("color", document.getElementById("selectTextColor").value);
}

function updateFontFamily() {
    $(".inputText").css("font-family", document.getElementById("selectTextStyleDropdown").value);
}

function updateTextSize() {
    let textSize = document.getElementById("selectTextSize").value;
    if (textSize === 'large') {
        $(".inputText").css("fontSize", "100px");
        $(".textInputHR1").css("top", "5px");
        $(".textInputHR2").css("top", "33px");
        $(".textInputHR3").css("top", "67px");
    } else if (textSize === 'small') {
        $(".inputText").css("fontSize", "60px");
        $(".textInputHR1").css("top", "0");
        $(".textInputHR2").css("top", "16px");
        $(".textInputHR3").css("top", "37px");
    } else {
        $(".inputText").css("fontSize", "80px");
        $(".textInputHR1").css("top", "2px");
        $(".textInputHR2").css("top", "26px");
        $(".textInputHR3").css("top", "52px");
    }
}

function updateWorksheetSetting() {
    // fetch existing values from worksheet.
    let currentTextInputValues = fetchCurrentTextInputValues();    
    let config = fetchCurrentConfig();
    addInputList();
    copyTexttoWorksheet(currentTextInputValues);
    updateWorksheet(config);
    resetCharCount();
}

function fetchCurrentTextInputValues () {
    let textInputArr = document.getElementsByClassName('inputText');
    let textInputValue = '';
    for (let element of textInputArr) {
        if (element.value.trim() !== '') {
            textInputValue = textInputValue + ' ' + element.value;
        }        
    }    
    return textInputValue.trim();
}

function fetchCurrentConfig() {
    let language = 'english';
    let textSize = document.getElementById("selectTextSize").value;
    let textStyle = document.getElementById("selectTextStyleDropdown").value;        
    return worksheetConfig[language][textStyle][textSize];
}

function fetchRowCount() {
    return fetchCurrentConfig().rowCount;
}
function updateWorksheet(config) {
    updateFontFamily();    
    $(".inputText").css("fontSize", config.rowFontSize);
    $(".inputText").css("text-indent", config.textIndent);
    $(".inputText").css("maxLength", config.rowCharLength);    
    $(".textInputHR1").css("top", config.topHR);
    $(".textInputHR2").css("top", config.middleHR);
    $(".textInputHR3").css("top", config.bottomHR);

    // 'rowCount' : '10', 'rowCharLength' : '20',
}

$('textarea').keyup(updateCharCount);
$('textarea').keydown(updateCharCount);

addInputList();

