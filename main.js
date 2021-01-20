/*
    メモ
    [問題なかった]専門基礎の関連専門が分けれてない
    [済]selectの幅をピクセル数じゃなくて%で指定する
    単位集計結果を上に固定(フロート)
    ↑そこに各学年の表にジャンプするボタン

    [未]各種処理を関数化

    バグ
    連続講義を選ぶ時にセメスター制講義と干渉する部分
        例）月 春1 2限が微積 & 春2 3限がオートマトン
        [済]春2に対する春1の割り込み
        [済]春1に対する春2の割り込み (微積が埋まっているところにオートマトンを3or4限で選択)
    [済]春1/秋1でsを選んでいるコマが強制的に上書きされたときに,そのコマがs/qに対応したcolspanにならない
        ↑例) 月 春1 3限が地学→4限に離散
    [済]連続講義の判定からきせみを除外
*/

/*
var elem = document.getElementById("select-1-1-1-1-1");
var option = document.createElement("option");
option.text = "created";
elem.appendChild(option);

var option2 = document.createElement("option");
option2.text = "created2";
elem.appendChild(option2);
*/

//fixedの対応
var headerbarHeight = document.getElementById("headerbar").clientHeight;
document.getElementById("tablearea").style.paddingTop = (headerbarHeight + 10) + "px";

const gradDict = ["-1", "-2", "-3", "-4"];
const termDict = ["-1-1", "-1-2", "-2-1", "-2-2"];
const daysDict = ["-1", "-2", "-3", "-4", "-5"];
const timeDict = ["-1", "-2", "-3", "-4", "-5"];
const termDataDict = ["spring1", "spring2", "autumn1", "autumn2"];
const daysDataDict = ["mon", "tue", "wed", "thu", "fri"]
const timeDataDict = ["time1", "time2", "time3", "time4", "time5"];

//選択中の連続講義を格納する
let continuousLectures = [];

//学科選択に対応
//0: 自然 1: 人社 2:cs
const courses = {0: "自然情報", 1: "人間・社会情報", 2: "コンピュータ科"};
let majorIn = 2;
let notMajorIn = [0, 1];

//userTable[学期][曜日(各曜日2つずつ)][時限]
let userTable = Array.from(new Array(8), () => {
    return Array.from(new Array(10), () => new Array(5).fill("未選択"))
})

for(let i = 0; i < 1; i++){ //grade
    for(let j = 0; j < 2; j++){ //term
        for(let k = 0; k < 5; k++){ //day
            for(let l = 0; l < 5; l++){ //time
                var selectelem = document.getElementById("select" + gradDict[i] + termDict[j] + daysDict[k] + timeDict[l]);
                selectelem.addEventListener('change', {params: [i, j, k, l], handleEvent: changedSelectListenerWrapper});
                lectureData[termDataDict[j]][daysDataDict[k]][timeDataDict[l]].forEach(obj => {
                    var option = document.createElement("option");
                    option.text = obj.name;
                    switch (obj.type){
                        case "理系基礎(理系)":
                            option.style = "background-color:#b7ffbd";
                            break;
                        case "専門基礎科目":
                            option.style = "background-color:#9ae7ff";
                            break;
                        case "文系教養科目":
                        case "文系基礎科目":
                            option.style = "background-color:#e9ff9a";
                            break;
                        case "専門科目(" + courses[notMajorIn[0]] + ")":
                        case "専門科目(" + courses[notMajorIn[1]] + ")":
                            option.style = "background-color:#ff9a9a";
                            break;
                        case "全学教養科目":
                            option.style = "background-color:#edb1ff";
                            break;
                        case "理系教養科目":
                            option.style = "background-color:#ffb1b1";
                            break;
                        case "専門科目(" + courses[majorIn] + ")":
                        case "専門科目":
                            option.style = "background-color:#f7ffb1";
                            break;
                        default:
                            option.style = "background-color:#ffffff";
                            break;
                    }
                    selectelem.appendChild(option);
                });
            }
        }
    }
}

function updatedTable(){
    
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
                return true; //break の代わり
            }
        })
    } else {
        changedLectObj = {name: "未選択", cred: 0, seme: "q"}
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
        //右の講義を未選択にする→非表示&colspanを2に
        document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).selectedIndex = 0;
        document.getElementById("select" + gradDict[params[0]] + termDict[params[1] + 1] + daysDict[params[2]] + timeDict[params[3]]).parentNode.parentNode.hidden = true;

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
                    break;
                }
            }
        }
    }



    
}



/*
function changedSelect(lectName, params){
    console.log(lectName, params);
}
*/