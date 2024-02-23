document.querySelector("#encBtn").addEventListener("click",encode);
document.querySelector("#decBtn").addEventListener("click",decode);
const inputFeld = document.querySelector("#input");
const inputFeldZwei = document.querySelector("#input2");
const outputFeld = document.querySelector("#output");
                     
async function encode(){
  const dict = await getDict();
  enteredText = inputFeld.value.split("");
  let result = "";
  for (i=0;i<enteredText.length;i++){
    if (enteredText[i] in dict){
      result += dict[enteredText[i]];
    }
  }
  outputFeld.innerHTML = result;
}

async function decode(){
  const dict = await getDict();
  let string = inputFeldZwei.value.split(/\s|(?=[/])|(?<=[/])/g);
  let result = "";
  for (let i=0; i<string.length; i++){
    if (Object.values(dict).includes(string[i] + " ")){
      await getKeyByValue(dict,string[i] + " ").then(
        (key)=>{
        result += key;
        },
      );
    }
  }
  outputFeld.innerHTML = result;
}

async function getDict(){
  const response = await fetch("JSON/Code.json");
  const dictObject = await response.json();
  return dictObject[0];

}

async function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
