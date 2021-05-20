const input=document.querySelector("input");
const liElements=document.getElementsByTagName("li");
const shadow= document.querySelector(".shadow-dog");
const breedBtn=document.getElementsByClassName("breed");
const img=document.querySelector(".img");
const temperament=document.querySelector(".temperament");
const height=document.querySelector(".height");
const weight=document.querySelector(".weight");
const pTemperament=document.querySelector(".tempero");
const nameBreed=document.querySelector(".name");


const dog=()=>{
        fetch(`https://api.TheDogAPI.com/v1/breeds`)
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<data.length; i++){
             const li= document.createElement('li')
             document.querySelector("ul").appendChild(li);
             const breedBtn=document.createElement("button");
             breedBtn.className="breed";
             li.appendChild(breedBtn);
             breedBtn.textContent=data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);
        }})}

dog()


const searchDog= (e) => {
    const text=e.target.value.toLowerCase();
    
    for(let i=0; i<liElements.length; i++){
        const dog= liElements[i].innerText;
        if (dog.toLowerCase().indexOf(text) !== -1){
                liElements[i].style.display="block";
        }
        else{
            liElements[i].style.display="none";
        }
    }
}

input.addEventListener("input", searchDog)


const openInfo=()=>{
    shadow.style.display="flex";
}


document.body.addEventListener("click", function(e){
    if(e.target.className === "breed"){
        openInfo();
        fetch(`https://api.TheDogAPI.com/v1/breeds`)
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<data.length; i++){
                if(e.target.textContent===data[i].name){
                    nameBreed.textContent=data[i].name;
                    if(data[i].image.height>data[i].image.width){
                        img.style.backgroundImage=`url(${data[i].image.url})`;
                        img.style.backgroundSize="contain";
                    }
                    else{
                    img.style.backgroundImage=`url(${data[i].image.url})`;
                    }
                    img.alt=data[i].name;
                    if(!data[i].temperament){
                        pTemperament.style.display="none";
                    }
                    else{
                        pTemperament.style.display="block";
                        temperament.textContent=data[i].temperament;
                    }
                    height.textContent=`${data[i].height.metric} cm`;
                    weight.textContent=`${data[i].weight.metric} kg`;
                }
            }
        })
    }
})
        
const closeInfo=()=>{
    shadow.style.display="none";
    img.src="";
}

window.addEventListener("click", (e)=>{
    e.target===shadow ? closeInfo() : false
});
