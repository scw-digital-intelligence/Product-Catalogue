/* shows or hides the product filters */
window.onpageshow = function(){
    showFilters();
}

// identifies the current page
let path = window.location.pathname;
let page = path.split("/").pop();

// stores the product filter element
let filters = document.getElementById("filter-container")

// changes diplay property based on current page
function showFilters(){
    if (page == "catalogue.html"){
        filters.style.display = "flex"
    } else {
        filters.style.display = "none"
    }
}