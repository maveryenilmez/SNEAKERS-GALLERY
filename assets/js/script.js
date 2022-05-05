let corps = document.getElementById('corps');
const modal = document.querySelector('.modal')
const close = document.querySelector('.close');
const close2 = document.querySelector('.close2');
const cartModal = document.getElementById('cartModal')
const modalFooter = document.getElementById('modalFooter')
const modal2 = document.querySelector('.modal2')
let products = []
let arrayCart = []


fetchProducts();


let totalCalc = (arrayCart) => {
    let total = 0;
    for (i = 0; i < arrayCart.length; i++) {
        total += parseInt(arrayCart[i].price)
    }
    return total
}



let displayProducts = (products) => {
    for (let count = 0; count < products.length; count++) {
        // création div produit dans le container
        const divProduct = document.createElement('div');
        corps.appendChild(divProduct);
        divProduct.classList.add('product');
        divProduct.id = `${count+1}`;
        divProduct.dataset.brand = products[count].brand;
        divProduct.dataset.gender = products[count].gender;
        divProduct.dataset.color = products[count].color;

        // création sous partie image

        const imgProduct = document.createElement('img');
        divProduct.appendChild(imgProduct);
        imgProduct.classList.add('imgProduct')
        imgProduct.src = products[count].picture_path;

        //effet hover  sur l'image

        imgProduct.addEventListener('mouseenter', () => {
            imgProduct.src = products[count].picture_hover_path;
        })
        imgProduct.addEventListener('mouseout', () => {
            imgProduct.src = products[count].picture_path;
        })

        // création div texte

        const textProduct = document.createElement('div');
        textProduct.classList.add('textProduct');
        divProduct.appendChild(textProduct);


        // création div nom dans div texte

        const nameProduct = document.createElement('h2');
        textProduct.appendChild(nameProduct);
        nameProduct.classList.add('nameProduct');
        nameProduct.innerHTML = products[count].name;


        // création div description dans div texte

        const descProduct = document.createElement('p');
        textProduct.appendChild(descProduct);
        descProduct.classList.add('descProduct');
        descProduct.innerHTML = products[count].description_brand;

        // création div prix 

        const priceDivProduct = document.createElement('div');
        divProduct.appendChild(priceDivProduct);

        const priceProduct = document.createElement('p');
        priceProduct.classList.add('priceProduct');
        priceDivProduct.appendChild(priceProduct);
        priceProduct.innerHTML = products[count].price + ' €';


        //boutons

        const buttons = document.createElement('div');
        buttons.classList.add('buttonsDiv');
        divProduct.appendChild(buttons);


        // ajout bouton panier

        const addCart = document.createElement('button');
        addCart.classList.add('button');
        addCart.id = `${count}`
        buttons.appendChild(addCart);
        addCart.innerHTML = 'Ajouter au panier'

        //création tableau panier
        addCart.addEventListener('click', () => {
            const trueName = {};
            trueName.name = products[addCart.id].name;
            trueName.id = products[addCart.id].id;
            trueName.img = products[addCart.id].picture_path;
            trueName.price = products[addCart.id].price;
            arrayCart.push(trueName);
        })
    }
    //affichage modal
    let panier = document.querySelectorAll('.panier');

    panier.forEach(items => {
        items.addEventListener('click', () => {
            if (arrayCart.length == 0) {
                cartModal.innerHTML = 'Votre panier est vide.'
            } else {
                let total = totalCalc(arrayCart);
                cartModal.innerHTML = '';
                modalFooter.innerHTML = '';
                const cartElemBuy = document.createElement('div');
                cartElemBuy.classList.add('acheter');
                modalFooter.appendChild(cartElemBuy);
                cartElemBuy.innerHTML = 'Acheter';

                const cartElemDelete = document.createElement('div');
                cartElemDelete.classList.add('delete');
                modalFooter.appendChild(cartElemDelete);
                cartElemDelete.innerHTML = 'Supprimer';

                for (i = 0; i < arrayCart.length; i++) {
                    const cartElem = document.createElement('div');
                    cartElem.classList.add('objectCart');
                    cartElem.id = i;
                    cartModal.appendChild(cartElem);

                    const cartElemPic = document.createElement('img');
                    cartElemPic.classList.add('imgCart');
                    cartElem.appendChild(cartElemPic);
                    cartElemPic.src = arrayCart[i].img;

                    const cartElemName = document.createElement('div');
                    cartElemName.classList.add('elementName');
                    cartElem.appendChild(cartElemName);
                    cartElemName.innerHTML = arrayCart[i].name;


                    const cartElemPrice = document.createElement('div');
                    cartElemPrice.classList.add('elementPrice');
                    cartElem.appendChild(cartElemPrice);
                    cartElemPrice.innerHTML = arrayCart[i].price + '€';


                    // tout supprimer panier

                    const removeItem = document.createElement('div');
                    removeItem.classList.add('removeItem');
                    cartElem.appendChild(removeItem);
                    removeItem.innerHTML = 'x'

                    const removeItemElem = document.querySelector('.delete')
                    removeItemElem.addEventListener('click', () => {
                        const index = arrayCart.indexOf(parseInt(cartElem.id))
                        arrayCart.splice((index + 1), 1);
                        cartElem.remove();
                        document.querySelector('.total').innerHTML = ''
                    })

                    //suppression d'un seul élément
                    removeItem.addEventListener('click', () => {
                        arrayCart.splice((cartModal.children[parseInt(cartElem.id)].id), 1)
                        cartModal.children[(cartModal.children[parseInt(cartElem.id)].id)].innerHTML = '';
                        total = totalCalc(arrayCart);
                        if (arrayCart.length == 0) {
                            document.querySelector('.total').innerHTML = ''
                        } else {
                            document.querySelector('.total').innerHTML = 'Total : ' + total + '€'
                        }

                    })
                }
                const totalPrice = document.createElement('div');
                totalPrice.classList.add('total');
                modalFooter.appendChild(totalPrice);
                totalPrice.innerHTML = 'Total : ' + total + '€'
            }

            modal.style.display = 'block';
        })
    })


    // fermeture modal
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

let dropdown = document.getElementsByClassName("dropdown-btn");
let i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

////////////////////////////
// SELECTEURS //



// let selectItem = (attribut) => {
//     for (let count = 0; count < attribut.length; count++) {
//         if (attribut[count].gender != "Male") {
//             document.querySelectorAll('.product[data-gender="Male"]')
//         } else {
//             console.log("OK")
//         }
// }}

async function fetchProducts(products) {
    const response = await fetch('assets/data/data.json')
    const data = await response.json()
    displayProducts(data.products)

}



const maleBox = document.getElementById('maleChoose');


maleBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    if (maleBox.checked) {
        selectedItems.forEach(element => {
            if (element.dataset.gender != "Male") {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            if (element.dataset.gender != "Male") {
                element.style.display = 'flex'
            }
        })
    }
})


const femaleBox = document.getElementById('femaleChoose');


femaleBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    if (femaleBox.checked) {
        selectedItems.forEach(element => {
            if (element.dataset.gender != "Female") {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            if (element.dataset.gender != "Female") {
                element.style.display = 'flex'
            }
        })
    }
})

const whiteBox = document.getElementById('whiteChoose');


whiteBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (whiteBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})

const blueBox = document.getElementById('blueChoose');


blueBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (blueBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})

const greyBox = document.getElementById('greyChoose');


greyBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (greyBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})

const yellowBox = document.getElementById('yellowChoose');


yellowBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (yellowBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})

const brownBox = document.getElementById('brownChoose');


brownBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (brownBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})


const blackBox = document.getElementById('blackChoose');


blackBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (blackBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})


const orangeBox = document.getElementById('orangeChoose');


orangeBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (orangeBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})


const roseBox = document.getElementById('pinkChoose');


roseBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (roseBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})



const redBox = document.getElementById('redChoose');


redBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (redBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})


const greenBox = document.getElementById('greenChoose');


greenBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (greenBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})


const purpleBox = document.getElementById('purpleChoose');


purpleBox.addEventListener('change', function (event) {
    let selectedItems = document.querySelectorAll('.product');
    let valueCheckbox = event.target.value;
    if (purpleBox.checked) {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'none'
            }
        })

    } else {
        selectedItems.forEach(element => {
            let data = (element.dataset.color).split(',');
            if (!data.includes(valueCheckbox)) {
                element.style.display = 'flex'
            }
        })
    }
})

document.querySelectorAll('a[href^="#"]').forEach(elem => {
    elem.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(elem.getAttribute('href')).scrollIntoView({
            behavior: "smooth",
            offsetTop: 50
        });
    });
})


const everyday = document.querySelector('.everyday');

everyday.addEventListener('click', () => {
    let selectedItems = document.querySelectorAll('.product');
    selectedItems.forEach(element => {
        if (parseInt(element.querySelector('.priceProduct').textContent) > 350) {
            element.style.display = 'none'
        } else {
            element.style.display = 'flex'
        }
    })
})

const classy = document.querySelector('.classy');

classy.addEventListener('click', () => {
    let selectedItems = document.querySelectorAll('.product');
    selectedItems.forEach(element => {
        if (parseInt(element.querySelector('.priceProduct').textContent) > 800 || parseInt(element.querySelector('.priceProduct').textContent) <= 350) {
            element.style.display = 'none'
        } else {
            element.style.display = 'flex'
        }
    })
})

const luxe = document.querySelector('.luxe');

luxe.addEventListener('click', () => {
    let selectedItems = document.querySelectorAll('.product');
    selectedItems.forEach(element => {
        if (parseInt(element.querySelector('.priceProduct').textContent) <= 800) {
            element.style.display = 'none'
        } else {
            element.style.display = 'flex'
        }
    })
})


const allShoes = document.querySelector('.allShoes');

allShoes.addEventListener('click', () => {
    let selectedItems = document.querySelectorAll('.product');

    selectedItems.forEach(element => {
        element.style.display = 'flex'
    })
})