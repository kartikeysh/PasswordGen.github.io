//password
let passwordDisplay = document.querySelector("[data-pasword]");

//copy message ka system
let copy = document.querySelector("[copy]");
let message = document.querySelector("[data-copy-message]");

//length of password
let range = document.querySelector("[data-length-number]");
let slider = document.querySelector("[data-length-slider]"); //*to access custom attribute use -> []

//check box 
let upper = document.querySelector("#upper");
let lower = document.querySelector("#lower");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");
let allcheckBox = document.querySelectorAll("input[type=checkbox]");

//strength indicator
let indicator = document.querySelector("[strength-indicator]");

//generate button
let generate = document.querySelector(".generate");
//*its is use to store password then give it to passworddisplay
let password ="";
//*use in funciton
let passwordlength = 10;
//*use to check which are checked during password generation
let checkcount = 1;
//* slider handle password length ko UI pr reflect 
sliderhandle();
function sliderhandle()
{
    slider.value = passwordlength;
    range.innerText = passwordlength;
    let max = slider.max;
    slider.style.backgroundSize = `${(passwordlength/max)*100}%`;

}

//*add event listener to the slider ka value live update 
slider.addEventListener('input', () => {
    passwordlength = parseInt(slider.value);
    sliderhandle();
})

//*set krega color ko to show strength
setIndicator("white");
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
}

//*randomiinterger
function getRndint(min,max)
{
     return Math.floor(Math.random()*(max-min)) +min; //* abb max-min ke beech me ayega //floor to round of
   
}
//*funciton 1
function getrandnumber()
{
    return getRndint(0,9);

}

function getlower()
{
    return  String.fromCharCode(getRndint(97,123)) ;
    
}
getlower();
function getupper()
{
   return String.fromCharCode(getRndint(65,91))
}
function getsymbol(){
    var symbols = "!@#$%^&*()_+{}:\<>?";
    return symbols[getRndint(0,symbols.length)]

}

//*!checkbox
//*step 2
function count(){
checkcount =0;
allcheckBox.forEach((checkbox)=>
{
if(checkbox.checked)
checkcount++;
}


)
if(passwordlength < checkcount)
{
    passwordlength = checkcount;
 
    sliderhandle();
}
}
//*step 1
allcheckBox.forEach((checkbox)=>{
checkbox.addEventListener('change',count)
})
upper.checked = true;


//calculate the strength
function calculate_strength()
{
    let upperch = false;
    let lowerch = false;
    let numberch = false;
    let symbolch = false;
    if(upper.checked) upperch = true;
    if(lower.checked) lowerch = true;
    if(number.checked) numberch = true;
    if(symbol.checked) symbolch = true;
    if(upperch && lowerch && (numberch||symbolch) && passwordlength >=8)
    {
        setIndicator("#0f0")
    }
    else if((upperch || lowerch) &&(numberch||symbolch) && passwordlength >=6 )
    {
        setIndicator("yellow");
    }
    else{
        setIndicator("red");
    }

}





//copy content
async function clipboard()
{
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    message.innerText = "copied";
    
}
    catch(e)
    {
        alert("Error in copying to clipboard");
    }
    message.classList.add("active");

    setTimeout( () => {
        message.classList.remove("active");
    },2000);
    

}
copy.addEventListener('click',()=>{
    if(passwordDisplay.value)
    clipboard();
    
})
generate.addEventListener('click',()=>{
    if(checkcount <= 0) return;


    if(passwordlength<checkcount)//*phele to 4 krdia lekin usne alg se jake dubara km krdia 
    {
        passwordlength = checkcount;
        sliderhandle();
        
    }
    password ="";
    let funcarr = [];
    if(upper.checked)
    funcarr.push(getupper);
    if(lower.checked)
    funcarr.push(getlower);
    if(number.checked)
    funcarr.push(getrandnumber);
    if(symbol.checked)
    funcarr.push(getsymbol);
    for(let i = 0; i< funcarr.length;i++)
    {
        password += funcarr[i]();
    }
     console.log(funcarr,password);
     for(let i =0;i<passwordlength-funcarr.length;i++)
     {
        let index = getRndint(0,funcarr.length);
        console.log(index);
        password += funcarr[index]();//*this is array of function call
     }
     password = passwordShuf(password);
     passwordDisplay.value = password;
     calculate_strength()
     
})
function passwordShuf(password)
{
    //fisher yets meethod
    let passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
         let temp = passwordArray[j];
          passwordArray[j] = passwordArray[i];
          passwordArray[i] = temp;
    }
   let str ="";
   passwordArray.forEach((el)=>{str+=el})
   return str;


}

