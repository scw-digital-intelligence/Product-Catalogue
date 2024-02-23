// function to capture correct object details on click
function clickedProduct(evt){
    let product_name = document.getElementById(evt.target.id).textContent
    
    let results = []

    for(let i = 0; i < portfolios.length; i++) {
        let portfolio = portfolios[i]
        for (let x = 0; x < (portfolio.Products.length - 1); x++){
            // console.log(portfolio.Products[x].Name);
            // console.log(product_name);
            if(portfolio.Products[x].Name == product_name){

                results.push(portfolio.Products[x]);
                break;
            }
        }
                     
    }

    // console.log(product_name)
    // console.log(results[0]);
    localStorage.setItem("useThisProduct", JSON.stringify(results[0]));
}

// function to generate content boxes
function contentBoxes(parent, img_source, link_text, link_href, text,i) {
    // creating main box
    let spec_class = "content-box".concat("-",i)
    let box = document.createElement("div");
    box.setAttribute("class", "content-box", spec_class)

    // creating product image box
    let pib = document.createElement("div");
    pib.setAttribute("class", "product-img-box");

    // adding image to product image box
    let image = document.createElement("img");
    image.setAttribute("class", "product-img");
    image.setAttribute("src", img_source);
    pib.appendChild(image);

    // creating h4 with link
    let id_text = link_text.replace(/\s+/g, "-").toLowerCase();

    let title = document.createElement("h4");
    let link = document.createElement("a");
    link.setAttribute("href", link_href);
    link.textContent = `${link_text}`;
    link.setAttribute("id", id_text);
    link.addEventListener('mouseenter', clickedProduct);
    link.addEventListener('onclick', clickedProduct);
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
        let link_text = latestProducts[i].Name
        let img = latestProducts[i].Image
    
        if (i < 3){
            contentBoxes(targetElement[0], img, link_text, "./product.html", text, String(i));
        } else {
            contentBoxes(targetElement[1], img, link_text, "./product.html", text, String(i));
        }
    }
}

// product portfolio section creator

//dummy portfolios for testing
// portfolios = [
//     {
//         "Portfolio":"Cancer care",
//         "Products":[
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Cancer performance dashboard",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Early diagnosis programme: south west",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "South west prostate dashboard",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             }
//         ]
//     }, {
//         "Portfolio":"Performance",
//         "Products":[
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Ambulance waiting times",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Cancer care: patient tracking list (public)",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Referral to treatment",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             }
//         ]
//     }, {
//         "Portfolio":"Mental health",
//         "Products":[
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "HIOW mental health dashboard",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Mental health assurance tool",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             },
//             {
//                 "Portfolio_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
//                 "Name": "Mental health waiting time dashboard",
//                 "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
//                 "Image": "./assets/images/img/product_box.svg",
//                 "Released": ""
//             }
//         ]
//     }
// ]

// Capture catalogue main container to append to
let catmain = document.getElementById("catalogue-main");

function portfolioBoxes(){
    portfolios.forEach(function(element) {
        let i = 0;

        let port_sec = document.createElement("section");
        port_sec.setAttribute("class", "content-section landing-catalogue");

        if(element.Products[0].Portfolio_ID % 2 == 0){
            port_sec.style.backgroundColor = "#EAEEF9"
        }

        let port_div = document.createElement("div");
        port_div.setAttribute("class", "content-container catalogue-container");

        let cat_row_box = document.createElement("div");
        cat_row_box.setAttribute("class", "catalogue-row-box");

        let left_arrow_box = document.createElement("span");
        left_arrow_box.setAttribute("class", "scroll-left");

        // let left_arrow = document.createElement("img");
        let left_arrow = document.createElement("i");
        // left_arrow.setAttribute("class", "scroll-left-arrow");
        left_arrow.setAttribute("class", "fa-solid fa-chevron-left fa-3x scroll-left-arrow");
        // left_arrow.setAttribute("src", "./assets/images/icon/chevron-left.svg");

        let right_arrow_box = document.createElement("span");
        right_arrow_box.setAttribute("class", "scroll-right");

        // let right_arrow = document.createElement("img");
        let right_arrow = document.createElement("i");
        // right_arrow.setAttribute("class", "scroll-right-arrow");
        right_arrow.setAttribute("class", "fa-solid fa-chevron-right fa-3x scroll-right-arrow");
        // right_arrow.setAttribute("src", "./assets/images/icon/chevron-right.svg");

        let caro_cont = document.createElement("div");
        caro_cont.setAttribute("class", "carousel-catalogue-container")
        caro_cont.setAttribute("id", `carousel-catalogue-container-${i}`)

        let port_title = document.createElement("h2");
        port_title.textContent = `${element.Portfolio}`

        let port_desc = document.createElement("p");
        port_desc.textContent = `${element.Products[0].Portfolio_Description}`;
        port_desc.setAttribute("class", "catalogue-portfolio-desc");

        port_div.appendChild(port_title);
        port_div.appendChild(port_desc);
        port_div.appendChild(cat_row_box);
        left_arrow_box.appendChild(left_arrow);
        right_arrow_box.appendChild(right_arrow);
        cat_row_box.appendChild(left_arrow_box);
        cat_row_box.appendChild(caro_cont);
        cat_row_box.appendChild(right_arrow_box);
        port_sec.appendChild(port_div);
        catmain.appendChild(port_sec);

        let prods = element.Products
        prods.forEach(function(prop) {
            newBox = contentBoxes(
                caro_cont,
                prop.Image,
                prop.Name,
                "./product.html",
                prop.Description,
                1
            )        
        });

        i++
    });
}