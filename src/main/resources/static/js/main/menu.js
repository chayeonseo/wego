const productList = document.querySelectorAll('.menu-li');

[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(value => {
                console.log(value)
            })

    }



})