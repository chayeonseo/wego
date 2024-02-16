const csrfToken = document.querySelector('meta[name=_csrf]').getAttribute("content")
const productList = document.querySelectorAll('.menu-li');
const editingModal = document.getElementById('menu-modify-modal')
const modifyCancel = document.getElementById('menu-modify-cancel');
const addCancel = document.getElementById('menu-add-cancel');
const menuAddModal = document.getElementById('menu-add-modal');
const editingBtn = document.querySelector('.menu-editing-btn');
const menuAddBtn = document.querySelector('.btn-div button');


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

//메뉴 추가 버튼 클릭
menuAddBtn.onclick = () => {
    menuAddModal.style.display = 'block';
    const menuEditing =  document.querySelector('menu-editing-div');
    const menuTitle = document.querySelector('menu-title').value;
    const menuCon = document.querySelector('menu-con').value;
    const menuDescrition = document.querySelector('editing-con');
    const menuAddOpt = document.getElementById('menuAddOpt');

    const data = {
        menuName: menuTitle, menuPrice: menuCon, menuContent: menuDescrition, menuOptionCategorys: menuAddOpt
    }

    fetch(`/menu/${menuEditing.value}` , {
        method: 'POST',
        headers: {
            "X-CSRF-TOKEN": csrfToken,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
}






modifyCancel.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        editingModal.style.display = 'none';
    }
}

addCancel.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        menuAddModal.style.display = 'none';
    }
}