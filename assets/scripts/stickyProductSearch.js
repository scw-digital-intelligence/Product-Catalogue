/* creates the sticky nav that only attaches when you scroll past */

// identfies required elements
let prodSearch = document.getElementById("product-search-container");
let prodSticky = prodSearch.getBoundingClientRect().y;

// checks scroll position and adds sticky class when required
function productSticky() {
    if (window.scrollY >= prodSticky) {
        prodSearch.classList.add("sticky-product")
    } else {
        prodSearch.classList.remove("sticky-product");
    }
}


