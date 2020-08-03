var updateBtns = document.getElementsByClassName('update-cart')

for(var i = 0; i < updateBtns.length; i++ ){
    updateBtns[i].addEventListener('click', function(){
        var product_id = this.dataset.product
        var action = this.dataset.action
        console.log(`Product Id : ${product_id}\nAction : ${action}\nUser : ${user}`)

        if (user == 'AnonymousUser'){
            addCookieItem(product_id, action)
        }
        else {
            updateUserOrder(product_id, action)
        }
    })
}

function updateUserOrder(product_id, action){
    console.log('User is logged in, sending data...')
    var url = '/update-item/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'product_id': product_id,
            'action': action
        })
    })

    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log('Data :', data)
        location.reload()
    })

}

function addCookieItem(product_id, action){
    console.log('Not Logged In')

    if (action == 'add') {
        if (cart[product_id] == undefined) {
            cart[product_id] = {'quantity': 1}
        }
        else {
            cart[product_id]['quantity'] += 1
        }
    }
    if (action == 'remove') {
        cart[product_id]['quantity'] -= 1
        if (cart[product_id]['quantity'] <= 0) {
            console.log('Removed Item')
            delete cart[product_id]
        }
    }

    console.log('Cart :', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ';domain=;path=/'
    location.reload()

}
