const input = document.querySelector("input");
const liElements = document.getElementsByTagName("li");
const shadow = document.querySelector(".shadow-dog");
const breedBtn = document.getElementsByClassName("breed");
const img = document.querySelector(".img");
const temperament = document.querySelector(".temperament");
const height = document.querySelector(".height");
const weight = document.querySelector(".weight");
const pTemperament = document.querySelector(".tempero");
const nameBreed = document.querySelector(".name");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const closeBtn = document.querySelector(".close");
const randomBtn=document.querySelector(".random");
let dogs;
let currentDogIndex;

const findDogById = (id) => {
    const dogIndex = dogs.indexOf(dogs.find((dog) => dog.id === id));
    currentDogIndex = dogIndex;
    return dogs[dogIndex];
}

const fetchDogs = () => {
    fetch(`https://api.TheDogAPI.com/v1/breeds`)
        .then(res => res.json())
        .then(res => {
            dogs = res
            return res
        })
        .then(dogs => renderDogList(dogs))
}

fetchDogs();

const renderDogList = (dogs) => {
    for (let i = 0; i < dogs.length; i++) {
        const li = document.createElement('li')
        document.querySelector("ul").appendChild(li);
        const breedBtn = document.createElement("button");
        breedBtn.className = "breed";
        li.appendChild(breedBtn);
        breedBtn.textContent = dogs[i].name.charAt(0).toUpperCase() + dogs[i].name.slice(1);
        breedBtn.id = dogs[i].id
    }
}

const searchDog = (e) => {
    const text = e.target.value.toLowerCase();

    for (let i = 0; i < liElements.length; i++) {
        const dog = liElements[i].innerText;
        if (dog.toLowerCase().indexOf(text) !== -1) {
            liElements[i].style.display = "block";
        } else {
            liElements[i].style.display = "none";
        }
    }
}

input.addEventListener("input", searchDog)


const openInfo = () => {
    shadow.style.display = "flex";
}


document.body.addEventListener("click", function (e) {
    if (e.target.className === "breed") {
        openInfo();
        const dog = findDogById(Number(e.target.id))
        nameBreed.textContent = dog.name;
        if (dog.image.height > dog.image.width) {
            img.style.backgroundImage = `url(${dog.image.url})`;
            img.style.backgroundSize = "contain";
        } else {
            img.style.backgroundImage = `url(${dog.image.url})`;
        }
        img.alt = dog.name;
        if (!dog.temperament) {
            pTemperament.style.display = "none";
        } else {
            pTemperament.style.display = "block";
            temperament.textContent = dog.temperament;
        }
        height.textContent = `${dog.height.metric} cm`;
        weight.textContent = `${dog.weight.metric} kg`;
        displayOrHideArrows()
    }
}
)


const closeInfo = () => {
    shadow.style.display = "none";
    img.style.backgroundImage = "";
    nameBreed.textContent = "";
    temperament.textContent = "";
    height.textContent = "";
    weight.textContent = "";
}

window.addEventListener("click", (e) => {
    e.target === shadow ? closeInfo() : false
});

const displayOrHideArrows = () => {
    //hide
    if(currentDogIndex === dogs.length - 1) {
        rightBtn.style.display = "none";
    }
    if(currentDogIndex === 0) {
        leftBtn.style.display = "none";
    }

    //restore
    if(currentDogIndex !== dogs.length - 1) {
        rightBtn.style.display = "block";
    }
    if(currentDogIndex !== 0) {
        leftBtn.style.display = "block";
    }
}

const canGoNext = () => {
    return currentDogIndex !== dogs.length - 1;
}

const canGoBack = () => {
    return currentDogIndex !== 0;
}

const changeDog = (dog) => {
    nameBreed.textContent = dog.name;
    if (dog.image.height > dog.image.width) {
        img.style.backgroundImage = `url(${dog.image.url})`;
        img.style.backgroundSize = "contain";
    } else {
        img.style.backgroundImage = `url(${dog.image.url})`;
    }
    img.alt = dog.name;
    if (!dog.temperament) {
        pTemperament.style.display = "none";
    } else {
        pTemperament.style.display = "block";
        temperament.textContent = dog.temperament;
    }
    height.textContent = `${dog.height.metric} cm`;
    weight.textContent = `${dog.weight.metric} kg`;
    displayOrHideArrows()
}


const goLeft = () => {
    if(!canGoBack()) {
        return;
    } 
    const dog = dogs[currentDogIndex - 1]
    currentDogIndex = currentDogIndex - 1

    changeDog(dog);
}

const goRight = () => {
    if(!canGoNext()) {
        return;
    }
    const dog = dogs[currentDogIndex + 1]
    currentDogIndex = currentDogIndex + 1

    changeDog(dog);
}


const showRandomDog=()=>{
    openInfo();
    const random= dogs[Math.floor(Math.random() * dogs.length)];
    nameBreed.textContent=random.name;
    if (random.image.height > random.image.width) {
        img.style.backgroundImage = `url(${random.image.url})`;
        img.style.backgroundSize = "contain";
    } else {
        img.style.backgroundImage = `url(${random.image.url})`;
    }
    img.alt = random.name;
    if (!random.temperament) {
        pTemperament.style.display = "none";
    } else {
        pTemperament.style.display = "block";
        temperament.textContent = random.temperament;
    }
    height.textContent = `${random.height.metric} cm`;
    weight.textContent = `${random.weight.metric} kg`;
    rightBtn.style.display="none";
    leftBtn.style.display="none";
}


leftBtn.addEventListener("click", goLeft);
rightBtn.addEventListener("click", goRight);
closeBtn.addEventListener("click", closeInfo);
randomBtn.addEventListener("click", showRandomDog);
