/*
var elem = document.getElementById("select-1-1-1-1-1");
var option = document.createElement("option");
option.text = "created";
elem.appendChild(option);

var option2 = document.createElement("option");
option2.text = "created2";
elem.appendChild(option2);
*/

const gradDict = ["-1", "-2", "-3", "-4"];
const termDict = ["-1-1", "-1-2", "-2-1", "-2-2"];
const daysDict = ["-1", "-2", "-3", "-4", "-5"];
const timeDict = ["-1", "-2", "-3", "-4", "-5"];
const termDataDict = ["spring1", "spring2", "autumn1", "autumn2"];
const daysDataDict = ["mon", "tue", "wed", "thu", "fri"]
const timeDataDict = ["time1", "time2", "time3", "time4", "time5"];

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
                selectelem.addEventListener('change', {params: [i, j, k, l], handleEvent: changedSelect});
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
function changedSelect(e){
    //講義データのオブジェクト
    let changedLectObj;
    //値が変わったselect要素
    let changedSelect = document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1]] + daysDict[this.params[2]] + timeDict[this.params[3]]);
    console.log(this.params);
    console.log(changedSelect.value);
    if (changedSelect.value != "未選択"){
        lectureData[termDataDict[this.params[1]]][daysDataDict[this.params[2]]][timeDataDict[this.params[3]]].forEach(obj => {
            if(obj.name == changedSelect.value){
                changedLectObj = obj;
                return true; //break の代わり
            }
        })
    } else {
        changedLectObj = {name: "未選択", cred: 0, seme: "q"}
    }
    if (changedLectObj.seme == "s"){ //セメスター制の講義だったら
        //右の講義を未選択にする→非表示&colspanを2に
        document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1] + 1] + daysDict[this.params[2]] + timeDict[this.params[3]]).selectedIndex = 0;
        document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1] + 1] + daysDict[this.params[2]] + timeDict[this.params[3]]).parentNode.parentNode.hidden = true;

        changedSelect.parentNode.parentNode.setAttribute("colSpan", "2");
        
    } else  if (changedLectObj.seme == "q" && [0, 2].includes(this.params[1])){
        //春1or秋1だったら右の講義のhiddenを解除する→colspanを2に
        document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1] + 1] + daysDict[this.params[2]] + timeDict[this.params[3]]).parentNode.parentNode.hidden = false;
        changedSelect.parentNode.parentNode.setAttribute("colSpan", "1");
    }
    
    //下に講義が続くか確認する
    if (changedSelect.value != "未選択"){
        //選ばれた要素より後のコマについて  ---------出現しなくなったら終わる処理
        for (let i = this.params[3] + 1; i < 5; i++){ 
            //データの該当のコマの講義を検索して
            for(let k = 0; k < lectureData[termDataDict[this.params[1]]][daysDataDict[this.params[2]]][timeDataDict[i]].length; k++){
                //講義が次のコマも続くようならば
                if (lectureData[termDataDict[this.params[1]]][daysDataDict[this.params[2]]][timeDataDict[i]][k].name == changedSelect.value){
                    //optionを調べて
                    for(let j = 0; j < document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1]] + daysDict[this.params[2]] + timeDict[i]).childElementCount; j++){
                        //該当講義を選択
                        if (document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1]] + daysDict[this.params[2]] + timeDict[i]).children[j].textContent == changedSelect.value){
                            document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1]] + daysDict[this.params[2]] + timeDict[i]).selectedIndex = j;
                        }
                    }
                }
            }
        }
    }
    //上も同様にチェック

    
}



/*
function changedSelect(lectName, params){
    console.log(lectName, params);
}
*/