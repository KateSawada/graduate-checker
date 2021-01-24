/*
    大部分を深夜に脳死で書いていたので，クソ汚い実装になっています．ご容赦ください．

    メモ
    [済 問題なかった]専門基礎の関連専門が分けれてない
    [済]selectの幅をピクセル数じゃなくて%で指定する
    単位集計結果を上に固定(フロート)
    ↑そこに各学年の表にジャンプするボタン

    [済]jsによる時間割のhtml要素tableの生成
    [未]時間割データのエクスポート/インポート
    [未]各種処理を関数化

    [未]各所のfor文ぶん回しのゴリ押しを解消したい(データ構造の見直しが必要？)

    [未]人社の教養科目のdata.jsへの追加(誰かに頼みたい)


    バグ
    連続講義を選ぶ時にセメスター制講義と干渉する部分
        例）月 春1 2限が微積 & 春2 3限がオートマトン
        [済]春2に対する春1の割り込み
        [済]春1に対する春2の割り込み (微積が埋まっているところにオートマトンを3or4限で選択)
    [済]春1/秋1でsを選んでいるコマが強制的に上書きされたときに,そのコマがs/qに対応したcolspanにならない
        ↑例) 月 春1 3限が地学→4限に離散
    [済]連続講義の判定からきせみを除外
    [未]currentTableの連続講義による上書きをしていない
*/



const gradDict = ["-1", "-2", "-3", "-4"];
const termDict = ["-1-1", "-1-2", "-2-1", "-2-2"];
const daysDict = ["-1", "-2", "-3", "-4", "-5"];
const timeDict = ["-1", "-2", "-3", "-4", "-5"];
const termDataDict = ["spring1", "spring2", "autumn1", "autumn2"];
const daysDataDict = ["mon", "tue", "wed", "thu", "fri"]
const timeDataDict = ["time1", "time2", "time3", "time4", "time5"];

//学科選択に対応する時に使うやつ
//0: 自然 1: 人社 2:cs
const courses = {0: "自然情報", 1: "人間・社会情報", 2: "コンピュータ科"};
let majorIn = 2;
let notMajorIn = [0, 1];
//同じ名前の講義を複数回履修しても，単位は1回分しか出ない(基セミを除く)
//計算済の講義を格納する配列
let calcedLect = [];
let subCourses = 0;
document.getElementById("select-sub-course").addEventListener("change", changedSubCourse);
function changedSubCourse(){
    subCourses = document.getElementById("select-sub-course").selectedIndex;   
    calcCred();
    showResult(); 
}

let isFinishedResearch = 0;
//卒業研究の選択ボタン
document.getElementById("researchFinished").addEventListener("change", changedResearchFinished);
function changedResearchFinished() {
    switch(document.getElementById("researchFinished").selectedIndex){
        case 0:
            isFinishedResearch = 0;
            break;
        case 1:
            isFinishedResearch = 6; //卒業研究の単位数
            break;
        default:
            isFinishedResearch = 0;
            break;
    }
    calcCred();
    showResult();
}


//fixedの対応
function changeTablePadding(){
    var headerbarHeight = document.getElementById("headerbar").clientHeight;
    document.getElementById("tablearea").style.paddingTop = (headerbarHeight + 20) + "px";
}
window.onresize = changeTablePadding();



//表のhtmlの生成
function createTable(){
    let SpringorAutumn = ["春", "秋"];
    for(let i = 0; i < 8; i++){
        let parentDiv = document.createElement('div');
        parentDiv.innerText = String(Math.floor((i + 2)/2)) + "年" + String(SpringorAutumn[i % 2]);
        let tableElemWrapper = document.createElement('table');
        tableElemWrapper.className = "main-table";
        let tableElem = document.createElement('tbody');

        //見出し行の作成
        tableElem.innerHTML += `<tr><td rowspan="2">時<br>限<\/td>
        <td class="table-elem week-day" colspan="2">月</td>
        <td class="table-elem week-day" colspan="2">火</td>
        <td class="table-elem week-day" colspan="2">水</td>
        <td class="table-elem week-day" colspan="2">木</td>
        <td class="table-elem week-day" colspan="2">金</td><\/tr>`;
        let termIndex = ""
        for (let j = 0; j < 10; j++) {
            termIndex += `<td class="table-elem half-term">${String(SpringorAutumn[i % 2])}${(j % 2 + 1)}</td>`
        }
        tableElem.innerHTML += `<tr>` + termIndex + `<\/tr>`;

        for (let j = 0; j < 5; j++) { //時限について
            let timeRow = "";
            timeRow += `<td class="time-index">${(j + 1)}<br>限</td>`;
            for (let k = 0; k < 5; k++) { //曜日について
                for (let l = 0; l < 2; l++) { //クオーター制の期について
                    timeRow += `<td class="table-elem"> <div> <select id="select${gradDict[Math.floor((i)/2)]}${termDict[(i % 2) * 2 + l]}${daysDict[k]}${timeDict[j]}" class="lect-select" name=""> <option value="未選択">未選択</option> </select> </td>`;
                }
            }
            tableElem.innerHTML += `<tr>` + timeRow + `</tr>`;
        }

        tableElemWrapper.appendChild(tableElem);
        parentDiv.appendChild(tableElemWrapper);
        parentDiv.style.margin = "5px";
        document.getElementById("tablearea").appendChild(parentDiv);
    }
}
createTable();


const senmonORkanrensenmonDict = {
    0: [ //自然の場合
        "senmonkamoku", "kanrensenmon", "kanrensenmon"
    ],
    1: [ //人社の場合
        "kanrensenmon", "senmonkamoku", "kanrensenmon"
    ],
    2: [ //CSの場合
        "kanrensenmon", "kanrensenmon", "senmonkamoku"
    ],
    3: [ //自然の場合
        "専門科目(自然情報)",
        ["専門科目(コンピュータ科)", "専門科目(人間・社会情報)"]
    ],
    4: [ //人社の場合
        "専門科目(人間・社会情報)",
        ["専門科目(コンピュータ科)", "専門科目(自然情報)"]
    ],
    5: [ //CSの場合
        "専門科目(コンピュータ科)",
        ["専門科目(自然情報)", "専門科目(人間・社会情報)"]
    ]
}

//時間割データを保存する
let currentTable = {};

//単位集計用
function copyDict(dict) {
    return JSON.parse(JSON.stringify(dict));
}
const currentCredEmpty = {
    "基礎セミナー": 0,
    "言語文化1英": 0,
    "言語文化1二": 0,
    "健康スポーツ科学": 0, 
    "文系基礎科目": 0,
    "文系教養科目": 0,
    "理系教養科目": 0,
    "全学教養科目": 0,
    "理系基礎(理系)": 0,
    "専門基礎科目": 0,
    "専門科目(コンピュータ科)": 0,
    "専門科目(自然情報)": 0,
    "専門科目(人間・社会情報)": 0
}
let currentCred = copyDict(currentCredEmpty);

//htmlのid, 卒業要件データと結びつけるために作成
const typeTranslate = { 
    "基礎セミナー": "kisemi",
    "言語文化1英": "eigo",
    "言語文化1二": "nigai",
    "健康スポーツ科学": "kensupo",
    "文系基礎科目": "bunkei",
    "文系教養科目": "bunkei",
    "理系教養科目": "rikeikyouyou",
    "全学教養科目": "zengakukyouyou",
    "理系基礎(理系)": "rikeikiso",
    "専門基礎科目": "senmonkiso",
    "専門科目(自然情報)": senmonORkanrensenmonDict[majorIn][0],
    "専門科目(人間・社会情報)": senmonORkanrensenmonDict[majorIn][1],
    "専門科目(コンピュータ科)": senmonORkanrensenmonDict[majorIn][2],
    "kisemi": "基礎セミナー",
    "eigo": "言語文化1英",
    "nigai": "言語文化1二",
    "kensupo": "健康スポーツ科学",
    "bunkei": "文系基礎科目",
    "bunkei": "文系教養科目",
    "rikeikyouyou": "理系教養科目",
    "zengakukyouyou": "全学教養科目",
    "rikeikiso": "理系基礎(理系)",
    "senmonkiso": "専門基礎科目",
    "senmonkamoku": "専門科目",
    "senmon": "専門系科目",
    "kanrensenmon": "関連専門科目",
    "bunkeikamoku": "文系教養&文系基礎", 
    "kisokyouyou": "文系科目,理系教養,全学教養", 
    "zengakukiso": "全学基礎", 
    "zengakukyouiku": "全学教育科目"
}
//未選択で初期化
for (let i = 0; i < 4; i++){
    let gradTableF = {};
    for (let j = 0; j < 4; j++){
        let termTableF = {};
        for (let k = 0; k < 5; k++){
            let daysTableF = {};
            for (let l = 0; l < 5; l++){
                daysTableF[l] = {name: "未選択", type: "未選択", cred: 0, seme: "q"};
            }
            termTableF[k] = daysTableF
        }
        gradTableF[j] = termTableF;
    }
    currentTable[i] = gradTableF;
}

//選択中の連続講義を格納する
let continuousLectures = [];


//userTable[学期][曜日(各曜日2つずつ)][時限]
let userTable = Array.from(new Array(8), () => {
    return Array.from(new Array(10), () => new Array(5).fill("未選択"))
})

//時間割表(選択肢)の初期化
for(let i = 0; i < 4; i++){ //grade
    for(let j = 0; j < 4; j++){ //term
        for(let k = 0; k < 5; k++){ //day
            for(let l = 0; l < 5; l++){ //time
                let selectelem = document.getElementById("select" + gradDict[i] + termDict[j] + daysDict[k] + timeDict[l]);
                selectelem.addEventListener('change', {params: [i, j, k, l], handleEvent: changedSelectListenerWrapper});
                lectureData[termDataDict[j]][daysDataDict[k]][timeDataDict[l]].forEach(obj => {
                    var option = document.createElement("option");
                    option.text = obj.name;
                    switch (obj.type){
                        case "基礎セミナー":
                        case "言語文化1英":
                        case "言語文化1二":
                        case "健康スポーツ科学":
                            option.style.backgroundColor = "#ffce8f";
                            break;
                        case "理系基礎(理系)":
                            option.style.backgroundColor = "#b7ffbd";
                            break;
                        case "専門基礎科目":
                            option.style.backgroundColor = "#9ae7ff";
                            break;
                        case "文系教養科目":
                        case "文系基礎科目":
                            option.style.backgroundColor = "#e9ff9a";
                            break;
                        case "専門科目(" + courses[notMajorIn[0]] + ")":
                        case "専門科目(" + courses[notMajorIn[1]] + ")":
                            option.style.backgroundColor = "#ff9a9a";
                            break;
                        case "全学教養科目":
                            option.style.backgroundColor = "#edb1ff";
                            break;
                        case "理系教養科目":
                            option.style.backgroundColor = "#ffb1b1";
                            break;
                        case "専門科目(" + courses[majorIn] + ")":
                        case "専門科目":
                            option.style.backgroundColor = "#f7ffb1";
                            break;
                        default:
                            option.style.backgroundColor = "#ffffff";
                            break;
                    }
                    selectelem.appendChild(option);
                });
            }
        }
    }
}



function calcCred() {
    //一旦単位の集計をリセット
    currentCred = copyDict(currentCredEmpty);
    calcedLect = [];
    for (let i = 0; i < 4; i++){ //学年
        for (let j = 0; j < 4; j++){ //期
            for (let k = 0; k < 5; k++){ //曜日
                for (let l = 0; l < 5; l++){ //時限
                    //currentTableに基づいて計算する
                    let selectElem = document.getElementById("select" + gradDict[i] + termDict[j] + daysDict[k] + timeDict[l]);
                    /*
                    //デバッグ用
                    console.log(gradDict[i] + termDict[j] + daysDict[k] + timeDict[l]);
                    console.log(selectElem.value);
                    console.log("");
                    */
                   
                    if ((selectElem.value != "未選択" && calcedLect.indexOf(selectElem.value) == -1) || selectElem.value == "基礎セミナーA" || selectElem.value == "基礎セミナーB"){
                        let lectObj;
                        lectureData[termDataDict[j]][daysDataDict[k]][timeDataDict[l]].forEach(obj => {
                            if(obj.name == selectElem.value){ //ToDo:基礎セミナーの扱いを追加
                                lectObj = obj;
                                //return true; //break の代わり
                            }
                        });
                        currentCred[lectObj.type] += lectObj.cred;
                        //計算した講義はcalcedLectに追加
                        calcedLect.push(lectObj.name);
                    }
                }
            }
        }
    }
}


const requiredSpanId = ["rikeikiso", "senmonkiso", "kisemi", "senmonkamoku", "eigo", "rikeikyouyou", "kanrensenmon", "nigai", "zengakukyouyou", "kensupo", "senmon", "bunkeikamoku", "kisokyouyou", "zengakukiso", "zengakukyouiku"];
function showResult() {
    let canGuraduate = true;
    //エラーの枠に表示するhtml
    let errorInner = "";
    requiredSpanId.forEach(spanId => {
        let targetSpan = document.getElementById(spanId + "-total");
        if (spanId == "kanrensenmon"){
            setCredValue(targetSpan, Math.min(document.getElementById(spanId + "-max").innerHTML, currentCred[senmonORkanrensenmonDict[3 + majorIn][1][0]] + currentCred[senmonORkanrensenmonDict[3 + majorIn][1][1]]));
        } else if (spanId == "senmonkamoku"){
            setCredValue(targetSpan, Math.min(document.getElementById(spanId + "-max").innerHTML, currentCred[senmonORkanrensenmonDict[3 + majorIn][0]] + isFinishedResearch));
        } else if (spanId == "senmon"){
            setCredValue(targetSpan, Number(document.getElementById("kanrensenmon-total").innerHTML) + Number(document.getElementById("senmonkamoku-total").innerHTML) + Number(document.getElementById("senmonkiso-total").innerHTML));
        } else if (spanId == "zengakukiso"){
            setCredValue(targetSpan, Number(document.getElementById("kisemi-total").innerHTML) + Number(document.getElementById("eigo-total").innerHTML) + Number(document.getElementById("nigai-total").innerHTML) + Number(document.getElementById("kensupo-total").innerHTML));
        } else if (spanId == "bunkeikamoku"){
            setCredValue(targetSpan, currentCred["文系基礎科目"] + currentCred["文系教養科目"]);
        } else if (spanId == "kisokyouyou"){
            setCredValue(targetSpan, Number(document.getElementById("bunkeikamoku-total").innerHTML) + Number(document.getElementById("rikeikyouyou-total").innerHTML) + Number(document.getElementById("zengakukyouyou-total").innerHTML));
        } else if (spanId == "zengakukyouiku"){
            setCredValue(targetSpan, Number(document.getElementById("zengakukiso-total").innerHTML) + Number(document.getElementById("kisokyouyou-total").innerHTML) + Number(document.getElementById("rikeikiso-total").innerHTML));
        } else {
            setCredValue(targetSpan,currentCred[typeTranslate[spanId]]);
        }

        if (Number(targetSpan.innerHTML) < document.getElementById(spanId + "-min").innerHTML) {
            errorInner += `<li>${typeTranslate[spanId]}の単位が足りません</li>`
            canGuraduate = false;
        }
    });
    //卒業要件を満たしているかチェック
    let mustLects = [];
    for(let i in requiredCred[subCourses]["zengakukyouiku"]["rikeikiso"]["lect"]){
        mustLects.push(requiredCred[subCourses]["zengakukyouiku"]["rikeikiso"]["lect"][i]);
    }
    for(let i in requiredCred[subCourses]["senmon"]["senmonkiso"]["lect"]){
        mustLects.push(requiredCred[subCourses]["senmon"]["senmonkiso"]["lect"][i]);
    }
    for(let i in requiredCred[subCourses]["senmon"]["senmonkamoku"]["lect"]){
        mustLects.push(requiredCred[subCourses]["senmon"]["senmonkamoku"]["lect"][i]);
    }
    
    for(let i in calcedLect){
        let idx = mustLects.indexOf(calcedLect[i])
        if(idx != -1){
            mustLects.splice(idx, 1);
        }
    }
    mustLects.forEach(lect =>{
        errorInner += `<li>${lect}を履修していません</li>`;
        canGuraduate = false;
    });
    if (isFinishedResearch == 0){
        errorInner += `<li>卒業研究が終わっていません</li>`;
        canGuraduate = false;
    }
    document.getElementById("error-list").innerHTML = errorInner;

    switch(canGuraduate){
        case true:
            document.getElementById("can-graduate-result").innerHTML = "卒業できるよ！";
            break;
        case false:
            document.getElementById("can-graduate-result").innerHTML = "まだ卒業できないよ";
            break;
        default:
            document.getElementById("can-graduate-result").innerHTML = "まだ卒業できないよ";
            break;
    }
}

function showRequired() {
    requiredSpanId.forEach(spanId => {
        let minSpan = document.getElementById(spanId + "-min");
        let maxSpan = document.getElementById(spanId + "-max");
        if (spanId == "zengakukyouiku" || spanId == "senmon"){
            setCredValue(minSpan, requiredCred[subCourses][spanId]["total"][0]);
            setCredValue(maxSpan, requiredCred[subCourses][spanId]["total"][1]);
        } else if (spanId in requiredCred[subCourses]["zengakukyouiku"]) {
            setCredValue(minSpan, requiredCred[subCourses]["zengakukyouiku"][spanId]["total"][0]);
            setCredValue(maxSpan, requiredCred[subCourses]["zengakukyouiku"][spanId]["total"][1]);
        } else if (spanId in requiredCred[subCourses]["senmon"]) {
            setCredValue(minSpan, requiredCred[subCourses]["senmon"][spanId]["total"][0]);
            setCredValue(maxSpan, requiredCred[subCourses]["senmon"][spanId]["total"][1]);
        } else if (spanId in requiredCred[subCourses]["zengakukyouiku"]["zengakukiso"]){
            setCredValue(minSpan, requiredCred[subCourses]["zengakukyouiku"]["zengakukiso"][spanId][0]);
            setCredValue(maxSpan, requiredCred[subCourses]["zengakukyouiku"]["zengakukiso"][spanId][1]);
        } else if (spanId in requiredCred[subCourses]["zengakukyouiku"]["kisokyouyou"]){
            setCredValue(minSpan, requiredCred[subCourses]["zengakukyouiku"]["kisokyouyou"][spanId][0]);
            setCredValue(maxSpan, requiredCred[subCourses]["zengakukyouiku"]["kisokyouyou"][spanId][1]);
        }
        
    });

}

function setCredValue(elem, value){
    if (value < 1000){
        elem.innerText = String(value);
    }
}

function changeParentBGColor(elem, lect) {
    let targetElem = elem.parentNode.parentNode;
    switch (lect.type){
        case "基礎セミナー":
        case "言語文化1英":
        case "言語文化1二":
        case "健康スポーツ科学":
            targetElem.style.backgroundColor = "#ffce8f";
            break;
        case "理系基礎(理系)":
            targetElem.style.backgroundColor = "#b7ffbd";
            break;
        case "専門基礎科目":
            targetElem.style.backgroundColor = "#9ae7ff";
            break;
        case "文系教養科目":
        case "文系基礎科目":
            targetElem.style.backgroundColor = "#e9ff9a";
            break;
        case "専門科目(" + courses[notMajorIn[0]] + ")":
        case "専門科目(" + courses[notMajorIn[1]] + ")":
            targetElem.style.backgroundColor = "#ff9a9a";
            break;
        case "全学教養科目":
            targetElem.style.backgroundColor = "#edb1ff";
            break;
        case "理系教養科目":
            targetElem.style.backgroundColor = "#ffb1b1";
            break;
        case "専門科目(" + courses[majorIn] + ")":
        case "専門科目":
            targetElem.style.backgroundColor = "#f7ffb1";
            break;
        default:
            targetElem.style.backgroundColor = "#ffffff";
            break;
    }
}


function changedSelectListenerWrapper(e){
    changedSelect(this.params);
}

function changedSelect(params){
    console.log(params);
    //講義データのオブジェクト
    let changedLectObj;
    //値が変わったselect要素
    let changedSelect = document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[params[3]]);
    console.log(changedSelect.value);
    if (changedSelect.value != "未選択"){
        lectureData[termDataDict[params[1]]][daysDataDict[params[2]]][timeDataDict[params[3]]].forEach(obj => {
            if(obj.name == changedSelect.value){
                changedLectObj = obj;
                //return true; //break の代わり
            }
        });
    } else {
        changedLectObj = {name: "未選択", type: "未選択", cred: 0, seme: "q"};
    }
    //連続講義の競合回避
    //春1に対する春2の割り込み
    
    if (changedLectObj.seme == "s"){ //セメスター制の講義だったら
        //春2に対する春1の割り込み
        if (document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).disabled || continuousLectures[[params[0], params[1] + 1, params[2], params[3], params[4]]]){
            alert("クオーター制の講義との競合");
            changedSelect.selectedIndex = 0;
            return;
        }
        //右の講義を未選択にする&テーブルに反映→非表示&colspanを2に
        document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).selectedIndex = 0;
        document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).parentNode.parentNode.hidden = true;
        currentTable[params[0]][params[1] + 1][params[2]][params[3]] = {name: "未選択", type: "未選択", cred: 0, seme: "q"};
        //背景色を白に
        changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]), {name: "未選択", type: "未選択", cred: 0, seme: "q"});
        changedSelect.parentNode.parentNode.setAttribute("colSpan", "2");
        
    } else  if (changedLectObj.seme == "q" && [0, 2].includes(params[1])){
        //春1or秋1だったら右の講義のhiddenを解除する→colspanを2に
        document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).parentNode.parentNode.hidden = false;
        
        changedSelect.parentNode.parentNode.setAttribute("colSpan", "1");
    }

    //連続講義からそれ以外の講義になった場合，disabledを解除する
    if (continuousLectures[[params[0], params[1], params[2], params[3], params[4]]]){
        continuousLectures[[params[0], params[1], params[2], params[3], params[4]]].forEach(i => {
            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).selectedIndex = 0;
            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).disabled = false;
            //背景色を白に
            //背景色の変更
            changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]), changedLectObj);
            //もしセメスター制だったら
            if(params[1] == 0 || params[1] == 2){
                //colSpanを1に変更
                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.setAttribute("colSpan", "1");
                //右の講義を表示する
                document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden = false;
            }
        });
        delete continuousLectures[[params[0], params[1], params[2], params[3], params[4]]];
    }
    

    let continueCheck = true;
    //下に講義が続くか確認する
    if (changedSelect.value != "未選択" && changedSelect.value.indexOf("基礎セミナー") == -1){
        //選ばれた要素より後のコマについて
        for (let i = params[3] + 1; i < 5 && continueCheck; i++){ 
            continueCheck = false;
            //データの該当のコマの講義を検索して
            for(let k = 0; k < lectureData[termDataDict[params[1]]][daysDataDict[params[2]]][timeDataDict[i]].length; k++){
                //講義が次のコマも続くようならば
                if (lectureData[termDataDict[params[1]]][daysDataDict[params[2]]][timeDataDict[i]][k].name == changedSelect.value){
                    //春1 秋1と競合していないか確認
                    if (document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden == true){
                        alert("セメスター制講義との競合");
                        if (continuousLectures[[params[0], params[1], params[2], params[3], params[4]]]){
                            continuousLectures[[params[0], params[1], params[2], params[3], params[4]]].forEach(i => {
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).selectedIndex = 0;
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).disabled = false;
                                changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]),  {name: "未選択", type: "未選択", cred: 0, seme: "q"});
                                changeParentBGColor(changedSelect,  {name: "未選択", type: "未選択", cred: 0, seme: "q"});
                            });
                            delete continuousLectures[[params[0], params[1], params[2], params[3], params[4]]];
                        }
                        changedSelect.selectedIndex = 0;
                        return;
                    }
                    
                    //optionを調べて
                    for(let j = 0; j < document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).childElementCount; j++){
                        //該当講義を選択
                        if (document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).children[j].textContent == changedSelect.value){
                            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).selectedIndex = j;
                            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).disabled = true;
                            //背景色の変更
                            changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]), changedLectObj);
                            //春1/秋1のクオーター制の場合，右の枠を表示
                            if(params[1] == 0 || params[1] == 2){
                                if(changedLectObj.seme == "q"){
                                    document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden = false;
                                }
                            }
                            //セメスター制だったらcolspanを2に設定
                            if (changedLectObj.seme == "s"){
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.setAttribute("colSpan", "2");
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden  =true;
                            } else {
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.setAttribute("colSpan", "1");
                            }
                            if (!continuousLectures[[params[0], params[1], params[2], params[3], params[4]]]){
                                continuousLectures[[params[0], params[1], params[2], params[3], params[4]]] = [];
                            }
                            continuousLectures[[params[0], params[1], params[2], params[3], params[4]]].push(i);
                            continueCheck = true;
                            break;
                        }
                    }
                    currentTable[params[0]][params[1]][params[2]][params[i]] = {name: "未選択", type: "未選択", cred: 0, seme: "q"};
                    break;
                }
            }
        }
    }
    //上方向も同様にチェック
    continueCheck = true;
    if (changedSelect.value != "未選択" && changedSelect.value.indexOf("基礎セミナー") == -1){
        //選ばれた要素より後のコマについて
        for (let i = params[3] - 1; i >= 0 && continueCheck; i--){ 
            continueCheck = false;
            //データの該当のコマの講義を検索して
            for(let k = 0; k < lectureData[termDataDict[params[1]]][daysDataDict[params[2]]][timeDataDict[i]].length; k++){
                //講義が次のコマも続くようならば
                if (lectureData[termDataDict[params[1]]][daysDataDict[params[2]]][timeDataDict[i]][k].name == changedSelect.value){
                    //春1 秋1と競合していないか確認
                    if (document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden == true){
                        alert("セメスター制講義との競合");
                        if (continuousLectures[[params[0], params[1], params[2], params[3], params[4]]]){
                            continuousLectures[[params[0], params[1], params[2], params[3], params[4]]].forEach(i => {
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).selectedIndex = 0;
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).disabled = false;
                                changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]),  {name: "未選択", type: "未選択", cred: 0, seme: "q"});
                                changeParentBGColor(changedSelect,  {name: "未選択", type: "未選択", cred: 0, seme: "q"});
                            });
                            delete continuousLectures[[params[0], params[1], params[2], params[3], params[4]]];
                        }
                        changedSelect.selectedIndex = 0;
                        return;
                    }
                    //optionを調べて
                    for(let j = 0; j < document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).childElementCount; j++){
                        //該当講義を選択
                        if (document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).children[j].textContent == changedSelect.value){
                            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).selectedIndex = j;
                            document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).disabled = true;
                            //背景色の変更
                            changeParentBGColor(document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]), changedLectObj);
                            //春1/秋1のクオーター制の場合，右の枠を表示
                            if(params[1] == 0 || params[1] == 2){
                                if(changedLectObj.seme == "q"){
                                    document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden = false;
                                }
                            }
                            //セメスター制だったらcolspanを2に設定
                            if (changedLectObj.seme == "s"){
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.setAttribute("colSpan", "2");
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.hidden  =true;
                            } else {
                                document.getElementById("select" + gradDict[params[0]] + termDict[params[1]] + daysDict[params[2]] + timeDict[i]).parentNode.parentNode.setAttribute("colSpan", "1");
                            }
                            if (!continuousLectures[[params[0], params[1], params[2], params[3], params[4]]]){
                                continuousLectures[[params[0], params[1], params[2], params[3], params[4]]] = [];
                            }
                            continuousLectures[[params[0], params[1], params[2], params[3], params[4]]].push(i);
                            continueCheck = true;
                            break;
                        }
                    }
                    currentTable[params[0]][params[1]][params[2]][params[i]] = {name: "未選択", type: "未選択", cred: 0, seme: "q"};
                    break;
                }
            }
        }
    }

    currentTable[params[0]][params[1]][params[2]][params[3]] = changedLectObj;
    //セレクタの値が変わったマスの色の変更
    changeParentBGColor(changedSelect, changedLectObj);
    calcCred();
    showResult();
}


showRequired();
showResult();