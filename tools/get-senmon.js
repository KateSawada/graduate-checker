//情報学部電子シラバスに対応(2020で動作確認済み)

///////適宜変更///////////////////
var seme = "q";
var type = "専門科目";
//contは廃止予定
var cont = false;
//////////////////////////////////

/*漏れが無いか確認する
var tableElem = document.getElementById("ichiran").children[0];
var trCount = tableElem.childElementCount;
for (var i = 1; i < trCount; i++){
    var found = false;
    for(let semes in lectureData){
        for(let days in lectureData[semes]){
            for(let times in lectureData[semes][days]){
                lectureData[semes][days][times].forEach((lectelem, index) => {
                    if (lectelem.name == tableElem.children[i].children[3].children[0].textContent){
                        found = true;
                    }
                })
            }
        }
    }
    spLect.forEach(lectelem => {
        if (lectelem.name == tableElem.children[i].children[3].children[0].textContent){
            found = true;
        }
    })

    if(!found){
        console.log(tableElem.children[i].children[3].children[0].textContent)
    }
}
*/

var tableElem = document.getElementById("ichiran").children[0];
var trCount = tableElem.childElementCount;
let objCode = "";
var timeDict = {};
const notyet = [
    "アカデミック・イングリッシュ",
    "アカデミック・ライティング",
    "マネジメント",
    "情報倫理と法",
    "PBL1",
    "PBL2",
    "PBL3",
    "情報と職業1",
    "情報と職業2"];

for (var i = 1; i < trCount; i++) {
    //children[]の数字はhtml要素を確認して適宜変更
    //if(notyet.includes(tableElem.children[i].children[3].children[0].textContent)){

        if (!(tableElem.children[i].children[5].textContent in timeDict)) {
            timeDict[tableElem.children[i].children[5].textContent] = [];   
        }
        if (tableElem.children[i].children[5].textContent.match(/-?[0-9]+\.?[0-9]*/g) != null && tableElem.children[i].children[5].textContent.match(/-?[0-9]+\.?[0-9]*/g).length == 1){
            timeDict[tableElem.children[i].children[5].textContent].push(
                {
                    name: tableElem.children[i].children[3].children[0].textContent,
                    type: type,
                    seme: seme,
                    cont: false,
                    cred: Number(tableElem.children[i].children[7].textContent.replace(/[^0-9^\.]/g,"")) //https://qiita.com/simiraaaa/items/2fc2c10e041963fc34fc
                });
            } else {
                timeDict[tableElem.children[i].children[5].textContent].push(
                    {
                name: tableElem.children[i].children[3].children[0].textContent,
                type: type,
                seme: seme,
                cont: true,
                cred: Number(tableElem.children[i].children[7].textContent.replace(/[^0-9^\.]/g,"")) //https://qiita.com/simiraaaa/items/2fc2c10e041963fc34fc
            });
        }
    //}
}

Object.keys(timeDict).forEach(key =>{
    objCode += "---------" + key + "---------\n";
    timeDict[key].forEach((elem, index) => {
        objCode += createLectText(elem.name, elem.type, elem.seme, elem.cont, elem.cred);
    })
})

//DL
blob = URL.createObjectURL(new Blob([objCode], {type: "text/plain"}));
downloadLink = document.createElement('a')
downloadLink.setAttribute("href",blob);
downloadLink.setAttribute("download", "gs.txt")
downloadLink.click()


function createLectText(name, type, seme, cont, cred){
    let text = "{\n    name: \"" + name + "\",\n    type: \"" + type + "\",\n    seme: \"" + seme + "\",\n    cont: " + cont + ",\n    cred: " + cred + "\n},\n";
    return text;
}