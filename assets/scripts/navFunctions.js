/* creates the sticky nav that only attaches when you scroll past */

// identfies required elements
let navbar = document.getElementById("nav-bar");
let sticky = navbar.getBoundingClientRect().y;

// checks scroll position and adds sticky class when required
function navSticky() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

function mobileMenu() {
    let mobileMenu = document.getElementById("burger-menu");    
    if (window.innerWidth < 1279) {
        mobileMenu.classList.remove("hidden");
    } else {
        mobileMenu.classList.add("hidden");
    }
}
