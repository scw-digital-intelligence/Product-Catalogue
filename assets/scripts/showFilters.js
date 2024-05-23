// identifies the current page
let path, page;
path = window.location.pathname;
page = path.split("/").pop();

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
    }, 500);
}

// creates filter content arrays
// maps distinct object lists brought in from SQL data as simple arrays
let portfolioList//, productList, platformList;
portfolioList = portfolioDistinct.map(a => a.Report_Portfolio_Name)
// productList = productDistinct.map(a => a.Report_Title)
// platformList = platformDistinct.map(a => a.Platform)

let activePortfolioFilters//, activeProductFilters, activePlatformFilters;
activePortfolioFilters = [];
// activeProductFilters = [];
// activePlatformFilters = [];

function filteredData(){
    let filterFor, parentElem, portfolioFilters, productFilters, platformFilters ,activeFilters;
    filterFor = this.nextSibling.textContent;
    parentElem = this.parentElement;
    portfolioFilters = Array.from(document.querySelectorAll("[id^='portfolio-filter-list']"));
    // productFilters = Array.from(document.querySelectorAll("[id^='product-filter-list']"));
    // platformFilters = Array.from(document.querySelectorAll("[id^='platform-filter-list']"));
    activeFilters = [];
    // console.log(portfolioFilters);
    // console.log(parentElem);
    // console.log(filterFor);
    
    if(portfolioFilters.includes(parentElem)){
        activeFilters = activePortfolioFilters;
    }// else if (productFilters.includes(parentElem)) {
    //     activeFilters = activeProductFilters;
    // } else if (platformFilters.includes(parentElem)) {
    //     activeFilters = activePlatformFilters;
    // }

    let exists = activeFilters.find((element) => element == filterFor);
    // console.log(exists);

    if (this.checked && typeof exists == "undefined"){                    
        activeFilters.push(filterFor);
        // console.log(filterFor);
    } else if (this.checked == false) {
        let index = activeFilters.indexOf(filterFor);
        if (index > -1) {
            activeFilters.splice(index, 1);
        }
    };

    if(activePortfolioFilters.length == 0 ) {//&& activePlatformFilters.length == 0 && activeProductFilters.length == 0) {
        data = portfolios;
        // console.log("Empty!");
        // console.log(activeFilters);
    } else {
        if(activePortfolioFilters.length != 0){
            data = portfolios.filter(el => activePortfolioFilters.includes(el.Portfolio));
        }

        // if(activeProductFilters.length != 0){
        //     data = data.filter(el => el.Products.every(prod => activeProductFilters.includes(prod.Name)));
        // }
        
        // console.log("Not empty!");
        // console.log(activePortfolioFilters);
    }

    let toRemove = Array.from(document.getElementsByClassName("content-section"));
    for(let i = 0; i < toRemove.length; i++){
        // console.log(toRemove[i]);
        toRemove[i].remove();
    }

    // if (data.length == 0){
    //     data = portfolios;
    // }

    portfolioBoxes();                
    addScrollArrows();                
}

// base filter class to create three seperate filters from
class Filter {
    constructor(content, className){
        this.content = content;
        this.filteredContent = this.content;
        this.className = className;
        this.createFilter();
    }

    // method to generate a filter list when a new object is created
    createFilter(){
        let i, list, classHeader;
        i = 1;
        list = document.getElementById(this.className + "-filter-list");
        classHeader = this.className;

        this.filteredContent.forEach(function(item){
            let new_filter = document.createElement("input");
            new_filter.setAttribute("type", "checkbox");
            new_filter.setAttribute("id", item.replace(/\s+/g, '-').toLowerCase() + "-filter");
            new_filter.setAttribute("name", "filter-" + i);
            new_filter.setAttribute("value", item);
            new_filter.addEventListener('click', filteredData);
            new_filter.addEventListener('touchend', filteredData);

            let new_label = document.createElement("label");
            new_label.setAttribute("for", item.replace(/\s+/g, '-').toLowerCase() + "-filter");
            new_label.textContent = item;

            let newListItem = document.createElement("li");
            newListItem.setAttribute("id", classHeader + "-filter-list-" + i);

            newListItem.appendChild(new_filter);
            newListItem.appendChild(new_label);

            list.appendChild(newListItem);

            i++
        });
    }
}

setTimeout(function() {
    let portfolioFilter//, productFilter, platformFilter;
    portfolioFilter = new Filter(portfolioList, "portfolio");
    // productFilter = new Filter(productList, "product");
    // platformFilter = new Filter(platformList, "platform");
}, 100);

function invertChevrons(){

    setTimeout(function () {
        const filter_chevrons = document.getElementsByClassName('nav-chevron');
        const filterContainer = document.getElementById("filter-container"); // Get filter container

        // Function to close all filters
        function closeAllFilters() {
            for (let elem of filter_chevrons) {
                elem.parentElement.classList.remove("filter-active");
                document.getElementById(elem.parentElement.id + "-list").classList.add("hide-filter");
            }
        }

        // Event listener for clicks outside the filter container
        document.addEventListener('click', function (event) {
            if (!filterContainer.contains(event.target)) { // Click is outside filter container
                closeAllFilters();
            }
        });
    for(i = 0; i < filter_chevrons.length; i++){
        let filter = filter_chevrons[i].parentElement
        // function to make the clicked filter item active
        filter.onclick = function(){
            if(this.classList.contains("filter-active")){
                this.classList.remove("filter-active");

                if(this.id == "portfolio-filter"){
                    document.getElementById(id="portfolio-filter-list").classList.add("hide-filter");
                } else if(this.id == "product-filter"){
                    document.getElementById(id="product-filter-list").classList.add("hide-filter");
                } else if(this.id == "platform-filter"){
                    document.getElementById(id="platform-filter-list").classList.add("hide-filter");
                }
                
            } else {

                let filterElements = this.parentElement.children;
                for (let elem of filterElements) {
                    elem.classList.remove("filter-active");

                    if(elem.id == "portfolio-filter"){
                        document.getElementById(id="portfolio-filter-list").classList.add("hide-filter");
                    } else if(elem.id == "product-filter"){
                        document.getElementById(id="product-filter-list").classList.add("hide-filter");
                    } else if(elem.id == "platform-filter"){
                        document.getElementById(id="platform-filter-list").classList.add("hide-filter");
                    }
                }

                this.classList.add("filter-active");

                if(this.id == "portfolio-filter"){
                    document.getElementById(id="portfolio-filter-list").classList.remove("hide-filter");
                } else if(this.id == "product-filter"){
                    document.getElementById(id="product-filter-list").classList.remove("hide-filter");
                } else if(this.id == "platform-filter"){
                    document.getElementById(id="platform-filter-list").classList.remove("hide-filter");
                }
            }
        }

        // filter.onmousedown = filterUsed;
    }
    
    }, 500);  
}
