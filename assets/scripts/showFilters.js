// identifies the current page
let path = window.location.pathname;
let page = path.split("/").pop();

// changes diplay property based on current page
function showFilters(){
    setTimeout(function(){
        // stores the product filter element
        let filters = document.getElementById("filter-container")

        if (page == "catalogue.html"){
            filters.style.display = "flex"
        } else {
            filters.style.display = "none"
        }
    }, 1);
}
