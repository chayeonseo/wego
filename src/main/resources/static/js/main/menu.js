const productList = document.querySelectorAll('.menu-li');
const editingModal = document.querySelector('.menu-editing-container')
const editingCancelBtn = document.querySelector('.menu-cancel-btn');


[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        editingModal.style.display = 'block';

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(value => {
                console.log(value)
                document.querySelector('.menu-editing-img').setAttribute('src', "http://" + value['menuImgs'][0]['menuImgThm'])
            });
    }
});

editingCancelBtn.onclick = () => {
    editingModal.style.display = 'none';
}


