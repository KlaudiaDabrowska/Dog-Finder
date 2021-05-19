const input=document.querySelector("input");
const liElements=document.getElementsByTagName("li");
// const breedBtn= document.querySelector("button");

const ul=document.querySelector("ul");



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
        console.log(text)
    }

    // liElements.forEach(li=> {
    //     const dog= li.textContent
    //     if (dog.toLowerCase().indexOf(text) !== -1){
    //             li.style.display="block";
    //     }
    //     else{
    //         li.style.display="none";
    //     }
    // })
 }

 input.addEventListener("input", searchDog)


 const dog=()=>{
    fetch(`https://dog.ceo/api/breeds/list`)
    .then(res => res.json())
    .then(data => {
        const names= data.message;
        names.forEach(name =>{
            const li= document.createElement('li')
            ul.appendChild(li);
            const breedBtn=document.createElement("button");
            breedBtn.className="breed";
            li.appendChild(breedBtn);
            breedBtn.textContent=name.charAt(0).toUpperCase() + name.slice(1);
        })

 })
}

dog()
