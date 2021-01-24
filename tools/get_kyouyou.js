//~2020春学期の電子シラバスに対応 全選択してブラウザのコンソールに貼り付けて実行

///////適宜変更///////////////////
var seme = "s";
var cont = "false";
var cred = 2;
var type = "全学教養科目";
//////////////////////////////////

var tableElem = document.getElementsByTagName("table")[0].children[0];
var trCount = tableElem.childElementCount;
let objCodeSpring = "";
let objCodeAutumun = "";
var prevdaytimes = "";
var prevdaytimea = "";

for (var i = 1; i < trCount; i++) {
    if(tableElem.children[i].children[6].textContent.indexOf("コン") != -1 || tableElem.children[i].children[6].textContent.indexOf("全学部") != -1){   
        if(tableElem.children[i].children[1].textContent == "Ⅰ期" || tableElem.children[i].children[1].textContent == "Ⅲ期" || tableElem.children[i].children[1].textContent == "前期"){
            if(prevdaytimes != tableElem.children[i].children[2].textContent){
                objCodeSpring += "\n------------------------\n";
            }
            objCodeSpring += createLectText(tableElem.children[i].children[4].textContent, type, seme, cont, cred);
            prevdaytimes = tableElem.children[i].children[2].textContent;
        } else if(tableElem.children[i].children[1].textContent == "Ⅱ期" || tableElem.children[i].children[1].textContent == "Ⅳ期" || tableElem.children[i].children[1].textContent == "後期"){
            if(prevdaytimea != tableElem.children[i].children[2].textContent){
                objCodeAutumun += "\n------------------------\n";
            }
            objCodeAutumun += createLectText(tableElem.children[i].children[4].textContent, type, seme, cont, cred);
            prevdaytimea = tableElem.children[i].children[2].textContent;
        }
    }
}
blob = URL.createObjectURL(new Blob([objCodeSpring], {type: "text/plain"}));


    
downloadLink = document.createElement('a')

downloadLink.setAttribute("href",blob);
downloadLink.setAttribute("download", "gks.txt")

downloadLink.click()

blob = URL.createObjectURL(new Blob([objCodeAutumun], {type: "text/plain"}));
downloadLink.setAttribute("href",blob);
downloadLink.setAttribute("download", "gka.txt")

downloadLink.click()
    


function createLectText(name, type, seme, cont, cred){
    let text = "{\n    name: \"" + name + "\",\n    type: \"" + type + "\",\n    seme: \"" + seme + "\",\n    cont: " + cont + ",\n    cred: " + cred + "\n},\n";
    return text;
}