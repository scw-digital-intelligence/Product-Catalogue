/* creates the sticky nav that only attaches when you scroll past */

// identfies required elements
let navbar, sticky, burgerMenu, globalMenu, navMenu, filterMenu;
navbar = document.getElementById("nav-bar");
sticky = navbar.getBoundingClientRect().y;

// checks scroll position and adds sticky class when required
function navSticky() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

function mobileMenu() { 
    let burgerMenu, globalMenu, navMenu, filterMenu;
    burgerMenu = document.getElementById("burger-menu");
    globalMenu = document.getElementById("nav-body");
    navMenu = document.getElementById("nav-container");
    filterMenu = document.getElementById("filter-container");

    if(!burgerMenu.classList.contains("hidden")){
        burgerMenu.classList.add("hidden");
    }
    
    if (window.innerWidth <= 1279) {
        burgerMenu.classList.remove("hidden");
        globalMenu.classList.add("hidden");
    } else {
        burgerMenu.classList.add("hidden");
        globalMenu.classList.remove("hidden");
    }

    burgerMenu.onmousedown = function(){
        if(globalMenu.classList.contains("hidden")){
            globalMenu.classList.remove("hidden");
        } else {
            globalMenu.classList.add("hidden");
        }    
    }
}


