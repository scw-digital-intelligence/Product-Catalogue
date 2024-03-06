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

let activePortfolioFilters, activeProductFilters, activePlatformFilters;
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
    } else if (productFilters.includes(parentElem)) {
        activeFilters = activeProductFilters;
    } else if (platformFilters.includes(parentElem)) {
        activeFilters = activePlatformFilters;
    }

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

    if(activePortfolioFilters.length == 0 && activePlatformFilters.length == 0 && activeProductFilters.length == 0) {
        data = portfolios;
        // console.log("Empty!");
    } else {
        if(activePortfolioFilters.length != 0){
            data = portfolios.filter(el => activePortfolioFilters.includes(el.Portfolio));
        }

        // if(activeProductFilters.length != 0){
        //     data = data.filter(el => el.Products.every(prod => activeProductFilters.includes(prod.Name)));
        // }
        
        // console.log("Not empty!");
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
            new_filter.addEventListener('mouseleave', filteredData);
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