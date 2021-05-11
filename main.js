const input=document.querySelector("input");
const liElements=document.querySelectorAll("li");



const searchDog= (e) => {
    const text=e.target.value.toLowerCase();
    

    liElements.forEach(li=> {
        const dog= li.textContent
        if (dog.toLowerCase().indexOf(text) !== -1){
                li.style.display="block";
        }
        else{
            li.style.display="none";
        }
    })
 }

 input.addEventListener("input", searchDog)
