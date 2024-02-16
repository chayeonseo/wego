const productList = document.querySelectorAll('.menu-li');
const editingModal = document.querySelector('.menu-editing-container')
const editingCancelBtn = document.querySelector('.menu-cancel-btn');
const editingBtn = document.querySelector('.menu-editing-btn');


[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        editingModal.style.display = 'block';

        editingBtn.onclick = () => {
            document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = false);
        }

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(value => {
                document.querySelector('.menu-title').value = value['menuName'];
                document.querySelector('.menu-con').value = value['menuPrice'];
                document.querySelector('.editing-con').value = value['menuContent'];
                document.querySelector('.menu-editing-img').setAttribute('src', 'http://' + value['menuImgs'][0]['menuImgThm']);
                console.log(value);
            });
    }
});

editingCancelBtn.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        editingModal.style.display = 'none';
    };

}
