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

// creates filter content arrays
// maps distinct object lists brought in from SQL data as simple arrays
let portfolioList = portfolioDistinct.map(a => a.Report_Portfolio_Name)
let productList = productDistinct.map(a => a.Report_Title)
let platformList = platformDistinct.map(a => a.Platform)
