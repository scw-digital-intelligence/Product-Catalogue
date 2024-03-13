// creating version of main dat that will be subsettable 
let data = portfolios;

// function to capture correct object details on click
function clickedProduct(evt){
    let productName = document.getElementById(evt.target.id).textContent

    for(let i = 0; i < portfolios.length; i++) {
        let portfolio = portfolios[i]
        for (let x = 0; x < (portfolio.Products.length); x++){
            // console.log(portfolio.Products[x].Name);
            // console.log(productName);
            if(portfolio.Products[x].Name == productName){
                console.log(portfolio.Products[x].Name);
                // results.push(portfolio.Products[x]);
                localStorage.setItem("useThisProduct", JSON.stringify(portfolio.Products[x]));
                break;
            }
        }      
    }   
}

// function to generate content boxes
function contentBoxes(parent, imgSource, linkText, linkHref, text,i) {
    // creating main box
    let specClass = "content-box".concat("-",i)
    let box = document.createElement("div");
    box.setAttribute("class", "content-box", specClass)

    // creating product image box
    let pib = document.createElement("div");
    pib.setAttribute("class", "product-img-box");

    // adding image to product image box
    let image = document.createElement("img");
    image.setAttribute("class", "product-img");
    image.setAttribute("src", imgSource);
    pib.appendChild(image);

    // creating h4 with link
    let idText = linkText.replace(/\s+/g, "-").toLowerCase();

    let title = document.createElement("h4");
    let link = document.createElement("a");
    link.setAttribute("href", linkHref);
    link.textContent = `${linkText}`;
    link.setAttribute("id", idText);
    link.addEventListener('mouseenter', clickedProduct);
    title.appendChild(link);

    // creating text
    let para = document.createElement("p");
    para.textContent = `${text}`;
    para.setAttribute("class", "catalogue-product-desc");

    // combining with main box
    box.appendChild(pib)
    box.appendChild(title)
    box.appendChild(para)

    // adding box to parent element
    parent.appendChild(box)
}

// adding recent boxes for landing page
function recentBoxes(){
    for (let i = 0; i < latestProducts.length; i++) {
        let targetElement = document.getElementsByClassName("content-container-row");
        let text = latestProducts[i].Description
        let linkText = latestProducts[i].Name
        let img = latestProducts[i].Image
    
        if (i < 3){
            contentBoxes(targetElement[0], img, linkText, "./product.html", text, String(i));
        } else {
            contentBoxes(targetElement[1], img, linkText, "./product.html", text, String(i));
        }
    }
}

// product portfolio section creator

// Capture catalogue main container to append to
let catmain = document.getElementById("catalogue-main");

function portfolioBoxes(){
    let b = 1;
    data.forEach(function(element) {
        

        let portSec = document.createElement("section");
        portSec.setAttribute("class", "content-section landing-catalogue");

        if(element.Products[0].Portfolio_ID % 2 == 0){
            portSec.style.backgroundColor = "#EAEEF9"
        }

        let portDiv = document.createElement("div");
        portDiv.setAttribute("class", "content-container catalogue-container");

        let catRowBox = document.createElement("div");
        catRowBox.setAttribute("class", "catalogue-row-box");

        let leftArrowBox = document.createElement("span");
        leftArrowBox.setAttribute("class", "scroll-left");

        // let leftArrow = document.createElement("img");
        let leftArrow = document.createElement("i");
        // leftArrow.setAttribute("class", "scroll-left-arrow");
        leftArrow.setAttribute("class", "fa-solid fa-chevron-left fa-3x scroll-left-arrow");
        // leftArrow.setAttribute("src", "./assets/images/icon/chevron-left.svg");

        let rightArrowBox = document.createElement("span");
        rightArrowBox.setAttribute("class", "scroll-right");

        // let rightArrow = document.createElement("img");
        let rightArrow = document.createElement("i");
        // rightArrow.setAttribute("class", "scroll-right-arrow");
        rightArrow.setAttribute("class", "fa-solid fa-chevron-right fa-3x scroll-right-arrow");
        // rightArrow.setAttribute("src", "./assets/images/icon/chevron-right.svg");

        let caroCont = document.createElement("div");
        caroCont.setAttribute("class", "carousel-catalogue-container")
        caroCont.setAttribute("id", `carousel-catalogue-container-${b}`)

        let portTitle = document.createElement("h2");
        portTitle.textContent = `${element.Portfolio}`

        let portDesc = document.createElement("p");
        portDesc.textContent = `${element.Products[0].Portfolio_Description}`;
        portDesc.setAttribute("class", "catalogue-portfolio-desc");

        portDiv.appendChild(portTitle);
        portDiv.appendChild(portDesc);
        portDiv.appendChild(catRowBox);
        leftArrowBox.appendChild(leftArrow);
        rightArrowBox.appendChild(rightArrow);
        catRowBox.appendChild(leftArrowBox);
        catRowBox.appendChild(caroCont);
        catRowBox.appendChild(rightArrowBox);
        portSec.appendChild(portDiv);
        catmain.appendChild(portSec);

        let prods = element.Products
        prods.forEach(function(prop) {
            newBox = contentBoxes(
                caroCont,
                prop.Image,
                prop.Name,
                "./product.html",
                prop.Description,
                1
            )        
        });

        b++
    });
}