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

// Creates list of products to search
let a = 1

productDistinct.forEach(function (product){
    let list = document.getElementById("product-search-list")

    let new_item = document.createElement("li");
    let new_link = document.createElement("a");
    new_link.textContent = product.Report_Title;
    new_link.setAttribute("id","product-" + a);
    new_link.setAttribute("href","./product.html");
    new_link.addEventListener("mouseenter", clickedProduct);

    new_item.appendChild(new_link);
    list.appendChild(new_item);

    a++
});
// Script to search for products and display results
function productSearchResults() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("product-search-bar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("product-search-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

    if(filter.length >= 1){
        ul.classList.remove("hide-search-results")
    } else {
        ul.classList.add("hide-search-results")
    }
}

// let prodSearchTerm = window.setInterval(function(){
//     prodSearch.childNodes[1].value
// }, 100);

// window.setInterval(function(){
//     if (prodSearchTerm != '') {
//         portfolios.forEach(function(portfolio) {
//             let prods = portfolio.Products
//             for (let key in prods) {
//                 if (typeof prods[key] === "object") {
//                     for (let nestedKey in prods[key]) {
//                         if (prods[key][nestedKey] == prodSearchTerm){
//                             console.log(prods[key].Name)
//                             return prods[key]
//                         }
//                         //console.log(prods[key][nestedKey])       
//                     }
//                 } else {
//                     console.log(prods[key]);
//                 }
//             }
//         });
//     }
// }, 100);  