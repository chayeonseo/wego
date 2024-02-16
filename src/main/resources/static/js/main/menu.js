const productList = document.querySelectorAll('.menu-li');
const editingModal = document.querySelector('.menu-editing-container')
const editingCancelBtn = document.querySelector('.menu-cancel-btn');
const [editingTitleBtn, editingContentBtn] = document.querySelectorAll('.menu-editing-btn');
const selectCategory = document.querySelector('.category-dropdown');
const selectOption = document.querySelector('.option-dropdown');


[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        editingModal.style.display = 'block';

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(categorys => {
                document.querySelector('.menu-title').value = categorys[0]['menus'][0]['menuName'];
                document.querySelector('.menu-con').value = categorys[0]['menus'][0]['menuPrice'];
                document.querySelector('.editing-con').value = categorys[0]['menus'][0]['menuContent'];
                document.querySelector('.menu-editing-img').setAttribute('src', 'http://' + categorys[0]['menus'][0]['menuImgs'][0]['menuImgThm']);
                for (category of categorys) {
                    selectCategory.insertAdjacentHTML('beforeend', `<option>${category['menuCategoryName']}</option>`)
                }
                console.log(categorys[0]['menus'][0]['menuOptionCategorys']);
                for (option of categorys[0]['menus'][0]['menuOptionCategorys']) {
                    selectOption.insertAdjacentHTML('beforeend', `<option>${option['menuOptionCategoryName']}</option>`)
                }

            });
    }
});

editingContentBtn.onclick = () => {
    document.querySelector('.editing-con').disabled = false;
}

editingTitleBtn.onclick = () => {
    document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = false);
    selectCategory.disabled = false;
}

editingCancelBtn.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        document.querySelector('.editing-con').disabled = true;
        selectCategory.disabled = true;
        editingModal.style.display = 'none';
        selectCategory.innerHTML = '';
        selectOption.innerHTML = '';
    }
}