document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementsByClassName("nav")[0]
    const menu = document.getElementsByClassName("menu")[0]
    const one = document.getElementsByClassName("one")[0]
    const two = document.getElementsByClassName("two")[0]
    const three = document.getElementsByClassName("three")[0]

    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")

    const downArrows = document.getElementsByClassName("downarrow")

    const page1anchor = document.getElementById("page1anchor")
    const page2anchor = document.getElementById("page2anchor")

    const leftAnchor = document.getElementById("leftanchor")
    const rightAnchor = document.getElementById("rightanchor")

    const darkModeSwitch = document.getElementById("switch")

    let sideMenu = false
    let transitioning = false

    let isMobile = getComputedStyle(document.getElementsByClassName("parallax")[0]).getPropertyValue("background-attachment") !== "fixed"

    hamburger.addEventListener('mouseleave', () => {
        if(!sideMenu) {
            two.style.width = "40px"
            three.style.width = "45px"
        }
    })

    hamburger.addEventListener('mouseenter', () => {
        if(!sideMenu) {
            two.style.width = "50px"
            three.style.width = "50px"
        }
    })

    hamburger.addEventListener("click",  () => {
        if(sideMenu) {
            menu.style.left = "-270px"
            hamburger.style.transform = "rotate(0)"
            one.style.width = "50px"
            two.style.width = "40px"
            three.style.width = "45px"
        } else {
            menu.style.left = "0"
            hamburger.style.transform = "rotate(-90deg)"
            one.style.width = "35px"
            two.style.width = "35px"
            three.style.width = "35px"
        }
        sideMenu = !sideMenu;
    })

    darkModeSwitch.addEventListener('click', () => {
        let docStyle = getComputedStyle(document.body)
        let value = docStyle.getPropertyValue("color")
        if(value === "rgb(255, 255, 255)") {
            document.documentElement.style.setProperty("--colour-1", "black")
            document.documentElement.style.setProperty("--colour-2", "#464646")
            document.documentElement.style.setProperty("--colour-3", "#A7A7A7")
            document.documentElement.style.setProperty("--colour-4", "#E9E9E9")
            document.documentElement.style.setProperty("--colour-5", "rgba(255, 255, 255, 0.7)")
            document.documentElement.style.setProperty("--shadow", "0 0 2px rgb(226, 226, 226), 0 0 2px rgb(226, 226, 226)")
        } else {
            document.documentElement.style.setProperty("--colour-1", "rgb(255, 255, 255)")
            document.documentElement.style.setProperty("--colour-2", "#c7c7c7")
            document.documentElement.style.setProperty("--colour-3", "#585858")
            document.documentElement.style.setProperty("--colour-4", "#111")
            document.documentElement.style.setProperty("--colour-5", "rgba(0, 0, 0, 0.7)")
            document.documentElement.style.setProperty("--shadow", "0 0 1vw rgb(29, 29, 29)")
        }
    })

    function movePage(ele1, ele2, dis1, dis2) {
        if(transitioning) return;
        if(ele1 === page2) ele1.style.overflowY = "hidden"
        document.documentElement.style.setProperty("--page1-offset", dis1)
        document.documentElement.style.setProperty("--page2-offset", dis2)
        if (isMobile) {
            ele1.style.display = "none"
            if(ele1 === page1) {
                rightAnchor.style.display = "none"
                leftAnchor.style.display = "flex"
            } else {
                rightAnchor.style.display = "flex"
                leftAnchor.style.display = "none"
            }
            ele2.style.display = "block"
            ele2.style.overflowY = "scroll"
            return
        }
        document.documentElement.style.setProperty("--transition-amount", "1s")
        transitioning = true
        setTimeout(() => {
            transitioning = false
            if (ele2 === page2) ele2.style.overflowY = "scroll"
            document.documentElement.style.setProperty("--transition-amount", "0s")
        }, 1000)
        if(sideMenu) hamburger.click()
    }

    function movePage1() {
        movePage(page1, page2, "-100vw", "0vw")
    }

    function movePage2() {
        movePage(page2, page1, "0vw", "100vw")
    }

    rightAnchor.addEventListener("click", movePage1)
    page2anchor.addEventListener("click", movePage1)
    page1anchor.addEventListener("click", movePage2)
    leftAnchor.addEventListener("click", movePage2)

    leftAnchor.addEventListener("click", () => {
        page1.getElementsByClassName("downarrow")[0].style.opacity = 1 - (page1.scrollTop * 6 / window.innerHeight)
        if(sideMenu) hamburger.click()
    })
    rightAnchor.addEventListener("click", () => {
        page2.getElementsByClassName("downarrow")[0].style.opacity = 1 - (page2.scrollTop * 6 / window.innerHeight)
        if(sideMenu) hamburger.click()
    })

    for(let downArrow of downArrows) {
        setInterval(() => {
            downArrow.style.bottom = '3vh'
            setTimeout(() => {
                downArrow.style.bottom = '5vh'
            }, 1250)
        }, 2500)

        page1.addEventListener("scroll",  () => {
            downArrow.style.opacity = 1 - (page1.scrollTop * 6 / window.innerHeight)
        })
        page2.addEventListener("scroll",  () => {
            downArrow.style.opacity = 1 - (page2.scrollTop * 6 / window.innerHeight)
        })
    }

})

function preloadImages(array) {
    if (!preloadImages.list) preloadImages.list = [];
    let list = preloadImages.list;
    for (let i = 0; i < array.length; i++) {
        let img = new Image();
        img.onload = () => {
            let index = list.indexOf(this);
            if (index !== -1) list.splice(index, 1)
        }
        list.push(img)
        img.src = `../images/${array[i]}`
    }
}

preloadImages([
    "moviesync.webp",
    "swift.webp",
    "python.webp",
    "project_bg.webp",
    "me_bw.webp",
    "me.webp",
    "mcmodding.webp",
    "languages.webp",
    "js.webp",
    "java.webp",
    "fitapp.webp",
    "discord.webp"
])
