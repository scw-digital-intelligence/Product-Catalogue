// function to capture correct object details on click
function clickedProduct(evt){
    let product_name = document.getElementById(evt.target.id).textContent
        
    let results = []

    for(let i = 0; i < portfolios.length; i++) {
        let portfolio = portfolios[i]
        for (let x = 0; x < (Object.keys(portfolio).length - 1); x++){
            if(portfolio["Products"][x].Name == product_name){
                results.push(portfolio);
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
    let id_text = link_text.replace(/\s+/g, "-").toLowerCase()

    let title = document.createElement("h4");
    let link = document.createElement("a");
    link.setAttribute("href", link_href)
    link.textContent = `${link_text}`
    link.setAttribute("id", id_text)
    link.addEventListener('onclick', clickedProduct);
    title.appendChild(link)

    // creating text
    let para = document.createElement("p")
    para.textContent = `${text}`

    // combining with main box
    box.appendChild(pib)
    box.appendChild(title)
    box.appendChild(para)

    // adding box to parent element
    parent.appendChild(box)
}

// adding recent boxes for landing page
function recentBoxes(){
    for (let i = 0; i < 3; i++) {
        let targetElement = document.getElementsByClassName("content-container-row");
        let text = "Duis pulvinar purus non tellus vestibulum, ac porta dui laoreet. Integer eu tellus scelerisque, placerat arcu ut massa."
        let link_text = "Lorem ipsum dolor sit amet"
    
        contentBoxes(targetElement[0], "./assets/images/img/product_box.svg", link_text, "./product.html", text, String(i))
        contentBoxes(targetElement[1], "./assets/images/img/product_box.svg", link_text, "./product.html", text, String(i))
    }
}

// product portfolio section creator

//dummy portfolios for testing
portfolios = [
    {
        "Id": 1,
        "Portfolio":"Cancer care",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
        "Products":[
            {
                "Name": "Cancer performance dashboard",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Early diagnosis programme: south west",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "South west prostate dashboard",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            }
        ]
    }, {
        "Id": 2,
        "Portfolio":"Performance",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
        "Products":[
            {
                "Name": "Ambulance waiting times",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Cancer care: patient tracking list (public)",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Referral to treatment",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            }
        ]
    }, {
        "Id": 3,
        "Portfolio":"Mental health",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
        "Products":[
            {
                "Name": "HIOW mental health dashboard",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Mental health assurance tool",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Mental health waiting time dashboard",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            }
        ]
    }
]

// Capture catalogue main container to append to
let catmain = document.getElementById("catalogue-main");

function portfolioBoxes(){
    portfolios.forEach(function(element) {
        let port_sec = document.createElement("section");
        port_sec.setAttribute("class", "content-section landing-catalogue");

        if(element.Id % 2 == 0){
            port_sec.style.backgroundColor = "#EAEEF9"
        }

        let port_div = document.createElement("div");
        port_div.setAttribute("class", "content-container catalogue-container");

        let caro_cont = document.createElement("div");
        caro_cont.setAttribute("class", "carousel-catalogue-container")

        let port_title = document.createElement("h2");
        port_title.textContent = `${element.Portfolio}`

        let port_desc = document.createElement("p");
        port_desc.textContent = `${element.Description}`;

        port_div.appendChild(port_title);
        port_div.appendChild(port_desc);
        port_div.appendChild(caro_cont);
        port_sec.appendChild(port_div);
        catmain.appendChild(port_sec);

        let prods = element.Products
        prods.forEach(function(prop) {
            newBox = contentBoxes(caro_cont,prop.Image , prop.Name, "./product.html", prop.Description, 1)        
        });
    });
}