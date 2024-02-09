/* creates the sticky nav that only attaches when you scroll past */

// identfies required elements
let prodsearch = document.getElementById("product-search-container");
let prodsticky = prodsearch.getBoundingClientRect().y;

// checks scroll position and adds sticky class when required
function productSticky() {
    if (window.scrollY >= prodsticky) {
        prodsearch.classList.add("sticky-product")
    } else {
        prodsearch.classList.remove("sticky-product");
    }
}


