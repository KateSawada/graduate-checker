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
    console.log(this.params);
    console.log(document.getElementById("select" + gradDict[this.params[0]] + termDict[this.params[1]] + daysDict[this.params[2]] + timeDict[this.params[3]]).value);

}



/*
function changedSelect(lectName, params){
    console.log(lectName, params);
}
*/