const productList = document.querySelectorAll('.menu-li');
const editingModal = document.querySelector('.menu-editing-container')
const editingBtn = document.querySelector('.menu-editing-btn');
const editingCancelBtn = document.querySelector('.menu-cancel-btn');



[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        const menuName = product.getElementsByClassName('menu-name')[0];
        editingModal.style.display = 'block';

        editingBtn.onclick = () => {
            document.querySelector('.menu-title')
        }

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(value => {

            })

    }
})

editingCancelBtn.onclick = () => {

    editingModal.style.display = 'none';

}


