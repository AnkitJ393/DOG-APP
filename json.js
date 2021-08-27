// fetch("https://dog.ceo/api/breeds/list/all").then(function(response){
//   return response.json();
// }).then(function(data){
// return data;
// })
const select=document.querySelector('.list');
const slideshowdiv=document.querySelector('.slideshow');
let timer=0;
let deleteFirstDelay=0;



function slideshow(image){
    clearInterval(timer);
    clearTimeout(deleteFirstDelay);

    if(image.length>1){
    let currPos=0;
    document.getElementById('slideshow').innerHTML=`
        <div class="slide" style="background-image:url('${image[0]}')"</div>
        <div class="slide" style="background-image:url('${image[1]}')"</div>
    
    `
    currPos +=2;
    if (image.length == 2) currentPosition = 0
    timer=setInterval(nextSlide,2000);
    
    
    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML('beforeend', `<div class="slide" style="background-image:url('${image[currPos]}')"</div>`)

        deleteFirstDelay=
        setTimeout(()=>{
            document.querySelector('.slide').remove()
        },2000)

        if(currPos+1> image.length){currPos=0;}
        else{currPos++;}
    }
    
    }
    else{
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
    }



}

async function fetchimage(e){
    if(e.target.value==="Choose Dog Breed"){
        return;
    }
    else{
        const api=await fetch(`https://dog.ceo/api/breed/${e.target.value}/images`);
        const response=await api.json();
        
        slideshow(response.message);
    }
    // if(slideshowdiv)
    // slideshowdiv.remove(div);

}
select.addEventListener('change',(e)=>{fetchimage(e)});


function createList(data){
    let option;
    Object.keys(data).map(function(breed){
        option=document.createElement('option');
        option.classList.add("option");
        // let text=document.createElement('span');
        // text.append(breed);
        option.append(breed);
        select.append(option);
        
    }).join("");
    
}

async function start(){


    try{
        
        const response=await fetch('https://dog.ceo/api/breeds/list/all');
        const data=await response.json();
        console.log(data);
        createList(data.message);
    }
    catch(error){
        console.log('There was a problem loading the dogs list'+e);
    }
}

start();

