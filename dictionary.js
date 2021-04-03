let apiKey = 'b7f62919-ab19-40d7-8ac4-ce23bb6a970b';



let input = document.querySelector("#input");

let notFound = document.querySelector("#notFound");

let def = document.querySelector("#def");

let loading = document.querySelector("#loading");

let audio = document.querySelector("#audio");


/**************************************************************************************************************/


document.getElementById("search").addEventListener("click",function(e){
    e.preventDefault();

    input.innerText = "";
    def.innerText = "";
    audio.innerHTML = "";


/***************************************get input data**********************************************/

    let word = input.value;

    if(word===""){
        alert("Word Is Required");
    }

    getData(word);
    
})



/********************************************** fetch api*************************************************************/

async function getData(word){

    loading.style.display = "block";

    let response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    let data = await response.json();

    console.log(data);




    /**************************** if result not found ******************************************************** */

    if(!data.length){
        loading.style.display = "none";
        notFound.innerText = "No Result Found";
    }




    /******************************* cretate suggestions *********************************************** */

    if(typeof data[0] === 'string'){

        loading.style.display = "none";

        let heading = document.createElement("h3");
        heading.innerText = "Did You Mean?";
        notFound.appendChild(heading);


        data.forEach(element=>{
            let suggestion = document.createElement("span");
            suggestion.classList.add("suggested");
            suggestion.innerText = element;
            notFound.appendChild(suggestion);



            /********************* select suggestions*********************************************** */

            suggestion.addEventListener("click",function(){
                input.value = element;
                getData(element);
            })
        })
      
    }

    /****************************** display defination of word******************************** */


    let defination = data[0].shortdef[0];  // we get this in data's path from console
    notFound.innerText = defination;
    loading.style.display = "none";



    /******************************* sound ********************************************* */


    let soundName = data[0].hwi.prs[0].sound.audio; //we get this in data's path from console

    if(soundName){
        renderSound(soundName);
    }

    function renderSound(soundName){

        let subFolder = soundName.charAt(0);  // takes words first letter

        let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;   
        let aud = document.createElement('audio');
        aud.src = soundSrc;
        aud.controls=true;
        audio.appendChild(aud);
        loading.style.display = "none";

    }

}


window.onload = function (){

    setInterval(function(){
        document.getElementById("heart").classList.toggle("beat");
  
    },600)
  }