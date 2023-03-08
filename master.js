localStorage.setItem("active-class", "active")
// Check If There's Local Storage Color Option 
let mainColor = localStorage.getItem("option-color");


if (mainColor !== null) {
    // Set Color On Local Storage 
    document.documentElement.style.setProperty('--main-color', mainColor)

    
    document.querySelectorAll(".colors-list li").forEach(element => {
        // Remove Class Active From All Children 
        element.classList.remove("active");

        if (element.dataset.colors == mainColor) {
            element.classList = "active"
        }
    })
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Backgroun Interval
let backInterval;

// Check If There's In Local Storage Random Backgound Item 
let backLocalItem = localStorage.getItem("option-back")

if (backLocalItem !== null) {
    
    if (backLocalItem == 'true') {

        backgroundOption = true
    }else {

        backgroundOption = false
    }
    document.querySelectorAll(".random-back span").forEach(element => {
        // Remove Class Active From All Children 
        element.classList.remove("active");

        if (backgroundOption == false) {
            document.querySelector(".random-back .no").classList.add("active")
        }else {
            document.querySelector(".random-back .yes").classList.add("active")
        }
    })
}

let gear = document.querySelector(".sittings-box i")
let Toggle = document.querySelector(".sittings-box .toggle-sitting")
let sittings = document.querySelector(".sittings-box")


Toggle.onclick = ()=> {
    // Toggle Class Open On Main Sitting Box
    sittings.classList.toggle("back")
     // Toggle Class Spin On Icon
    gear.classList.toggle("fa-spin")
}


// Switch Colors 
let colorsLi = document.querySelectorAll(".colors-list li")

// Loop On All Li
colorsLi.forEach(li => {
    
    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.colors)

        // Set Color On Local Storage 
        mainColor = localStorage.setItem("option-color", e.target.dataset.colors);
        
        handleClass(e)
    })
})


// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")


// Switch Random  Background 
let randomBackEl = document.querySelectorAll(".random-back span")


// Loop On All spans
randomBackEl.forEach(span => {
    
    // Click On Every List Items
    span.addEventListener("click", (e) => {

        handleClass(e)

        if (e.target.dataset.background === "no") {
            backgroundOption = false;

            clearInterval(backInterval)

            localStorage.setItem("option-back", false)
        }else {
            backgroundOption = true;

            localStorage.setItem("option-back", true)
            // Change Background Images Url
        }
        randomize() 
    })
})



// Get An Array Of Images
let arrimgs = ["landing1.jpg","landing2.jpg","landing3.jpg","landing4.jpg","landing5.jpg"]

// Random Background Option 
function randomize() {
    
    if (backgroundOption == true) {
        backInterval = setInterval(() => {
            
            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * arrimgs.length + 1)

            // Change Background Images Url
            landingPage.style.backgroundImage = `url(images/landing${randomNumber}.jpg)`
        },5000)        
    }
}

randomize()

let boxes = document.querySelectorAll(".our-skill .skill-box")

window.addEventListener("scroll", ()=> {
    let windowHeight = window.innerHeight;

    boxes.forEach(box => {
        const boxTopHeight = box.getBoundingClientRect().top

        if(boxTopHeight < windowHeight) {
            box.classList.add("get-back")
        }else {
            box.classList.remove("get-back")
        }
        
    })

})

// Get All Images

let imgsGallery = document.querySelectorAll(".images-box img");

imgsGallery.forEach(img => {
    
    // Image On Click 
    img.addEventListener("click", e=> {

        // Create OverLay And Add To Body 

        let popupOverlay = document.createElement("div")

        popupOverlay.classList = "popup-overlay";

        document.body.appendChild(popupOverlay)

        // Create Popup Box
        let popupBox = document.createElement("div");
        popupBox.classList = "popup-box";

        // Create Heading Image 
        if (img.alt !== null) {

            //Create Heading Image 
            let headImg = document.createElement("h2");
            
            // Create Text Node
            let TextImg = document.createTextNode(img.alt)
            TextImg.classList = "text-node"
            // Add Text Node To Heading Image 
            headImg.appendChild(TextImg)

            // Add Heading Image To Popup Box
            popupBox.appendChild(headImg)

        }

        // Create Popup img
        let popupImg = document.createElement("img")

        // Set Img Source
        popupImg.src = img.src

        // Add To Popup Box 
        popupBox.appendChild(popupImg);

        // Add Popup Box To The Body 
        document.body.appendChild(popupBox)

        // Create I
        let i = document.createElement("i")
        i.classList = "fa-solid fa-xmark"

        popupBox.appendChild(i)

        i.onclick = () => {
            popupBox.remove()
            popupOverlay.remove()
        }
    })
})


// Select All Bullets 

const allBullets = document.querySelectorAll(".nav-bullets .bullet")

// Select All Links 

const allLinks = document.querySelectorAll(".links a")






// Select Scroll To All Sections 
function scrollToSections(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e)=> {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior: 'smooth'
        
            })
        })
    })
}
scrollToSections(allBullets)
scrollToSections(allLinks)


// Handle Active Class 
function handleClass(active) {
    // Remove Class Active From All Children 
    active.target.parentElement.querySelectorAll(".active").forEach(act => {
        act.classList.remove("active");
    })
    
    // Add Active Class To Target Element 
    active.target.classList.add("active")
}


// Switch Bullets 
let spanBull = document.querySelectorAll(".bullets-option span")
let navBullet =  document.querySelector(".nav-bullets")
let bulletItem = localStorage.getItem("bullet-option")

if (bulletItem != null) {

        
    navBullet.style.display = localStorage.getItem("bullet-option")

    spanBull.forEach(span => {
        span.classList.remove("active")
        if (span.dataset.bullet == localStorage.getItem("bullet-option")) {
            span.classList.add("active")
        }
    })

}
spanBull.forEach(bullet => {
    bullet.addEventListener("click", e=> {

        handleClass(e)

        if (e.target.dataset.bullet == "block") {

            navBullet.style.display = "block";
            localStorage.setItem("bullet-option", 'block')

        }else {
            
            navBullet.style.display = "none"
            localStorage.setItem("bullet-option", 'none')
        }
    });
});

// Reset All Option 
let resetAll = document.querySelector(".reset-all");

resetAll.addEventListener("click", ()=> {
    localStorage.removeItem("active-class");
    localStorage.removeItem("option-color");
    localStorage.removeItem("option-back");
    localStorage.removeItem("bullet-option");
    location.reload();
})

// Set Toggle Menu 
let toggleMenu = document.querySelector(".landing-page .toggle-menu");
let headLinks = document.querySelector(".landing-page .links");

toggleMenu.addEventListener("click", (e)=> {

    // Stop The Propagation 
    e.stopPropagation()
    toggleMenu.classList.toggle("arrow")
    headLinks.classList.toggle("open")
})

document.addEventListener("click", (e) => {

    if (e.target !== toggleMenu && e.target !== headLinks) {

            toggleMenu.classList.remove("arrow")
            headLinks.classList.remove("open")
        
    }
})

headLinks.addEventListener("click", (e)=> {
    // Stop The Propagation 
    e.stopPropagation()
})