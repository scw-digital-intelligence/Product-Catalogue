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
    let title = document.createElement("h4");
    let link = document.createElement("a");
    link.setAttribute("href", link_href)
    link.textContent = `${link_text}`
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
    
        contentBoxes(targetElement[0], "./assets/images/img/product_box.svg", link_text, "#", text, String(i))
        contentBoxes(targetElement[1], "./assets/images/img/product_box.svg", link_text, "#", text, String(i))
    }
}

// product portfolio section creator

//dummy portfolios for testing
portfolios = [
    {
        "Id": 1,
        "Portfolio":"Cancer Care",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
        "Products":[
            {
                "Name": "Cancer Performance Dashboard",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "South West Prostate Dashboard",
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
                "Name": "Ambulance Waiting Times",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Referral To Treatment",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            }
        ]
    }, {
        "Id": 3,
        "Portfolio":"Mental Health",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem. Vivamus nec porttitor tellus, in sodales lorem. Sed sagittis nibh sit amet sodales vehicula.",
        "Products":[
            {
                "Name": "Mental Health Assessment Tool",
                "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id consequat sem.",
                "Image": "./assets/images/img/product_box.svg"
            },
            {
                "Name": "Mental Health Dashboard",
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

        let port_title = document.createElement("h2");
        port_title.textContent = `${element.Portfolio}`

        let port_desc = document.createElement("p");
        port_desc.textContent = `${element.Description}`;

        port_div.appendChild(port_title);
        port_div.appendChild(port_desc);
        port_sec.appendChild(port_div);
        catmain.appendChild(port_sec);

        let prods = element.Products
        prods.forEach(function(prop) {
            newBox = contentBoxes(port_div,prop.Image , prop.Name, "#", prop.Description, 1)           
        });
    });
}