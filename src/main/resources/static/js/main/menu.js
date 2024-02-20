


const csrfToken = document.querySelector('meta[name=_csrf]').content;

const addCancel = document.getElementById('menu-add-cancel');
const menuAddModal = document.getElementById('menu-add-modal');
const menuAddBtn = document.querySelector('.btn-div button');
const menuAddOpt = document.getElementById('menuAddOpt');


const productList = document.querySelectorAll('.menu-li');
const editingModal= document.querySelector('#menu-modify-modal')
const modifyCancel = document.querySelector('#menu-modify-cancel');
const [editingTitleBtn, editingContentBtn] = document.querySelectorAll('.menu-editing-btn');
const [modifySelectCategory, joinSelectCategory] = document.querySelectorAll('.category-dropdown');
const selectOption = document.querySelector('.option-dropdown');
const optionJoinBtn = document.querySelector('.menu-option-join-btn');
const joinOptionContainer = document.querySelector('.join-option-container');
const modifyBtn = document.querySelector('.modify-btn');
const menuName = document.querySelector('.menu-title');
const menuPrice = document.querySelector('.menu-con');
const menuContent = document.querySelector('.editing-con');
const menuImg = document.querySelector('.menu-editing-img');
// const joinOptionList = document.querySelectorAll('.join-option-list');
const selectMenuStatus = document.querySelector('.menu-sold-select');




[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        editingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';


        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(categorys => {
                console.log(categorys);
                menuName.value = categorys[0]['menus'][1]['menuName'];
                menuPrice.value = categorys[0]['menus'][1]['menuPrice'];
                menuContent.value = categorys[0]['menus'][1]['menuContent'];
                menuImg.setAttribute('src', 'http://' + categorys[0]['menus'][1]['menuImgs'][0]['menuImgThm']);
                for (category of categorys) {
                    modifySelectCategory.insertAdjacentHTML('beforeend', `<option value="${category['menuCategoryId']}">${category['menuCategoryName']}</option>`)
                }
                for (option of categorys[0]['menus'][0]['menuOptionCategorys']) {
                    selectOption.insertAdjacentHTML('beforeend', `<option value="${option['menuOptionCategoryId']}">${option['menuOptionCategoryName']}</option>`)
                }
                document.querySelector('#menuId').value = menuId.value;


                if (categorys[0]['menus'][1]['menuOptionCategorys'][0]['menuOptionCategoryId'] !== 0) {
                    for (option of categorys[0]['menus'][1]['menuOptionCategorys']) {
                        joinOptionContainer.insertAdjacentHTML('beforeend', `
                        <div class="join-option-list">
                            <input type="hidden" value="${option.menuOptionCategoryId}">
                            <div style="width: 200px;" class="join-option">${option.menuOptionCategoryName}<button type="button">X</button></div>
                        </div>`
                        )
                    }
                }

                switch (categorys[0]['menus'][1]['menuStatus']) {
                    case 0 :
                        selectMenuStatus.querySelectorAll('option')[0].selected = true;
                        break;
                    case 1 :
                        selectMenuStatus.querySelectorAll('option')[1].selected = true;
                        break;
                    case 2 :
                        selectMenuStatus.querySelectorAll('option')[2].selected = true;
                        break;
                }


                const joinOptionList = document.querySelectorAll('.join-option-list');
                [...joinOptionList].forEach(option => {
                    option.querySelector('button').onclick = () => {
                        fetch(`/menu/${option.querySelector('input').value}/${document.querySelector('#menuId').value}`,{
                            method: 'delete',
                            headers: {'X-Csrf-Token' : csrfToken}
                        }).then(resp => {
                            console.log(resp.ok)
                            if (resp.ok) {
                                alert('옵션 삭제 완료');
                                option.remove();
                            } else {
                                alert('옵션 삭제 실패');
                            }
                        })
                    }
                });

            });
    }
});


// 수정버튼 눌렀을 때
modifyBtn.onclick = () => {
    // menuid, 메뉴이름, 메뉴내용, 메뉴가격, 메뉴 카테고리, 메뉴 옵션,
    const menuId = document.querySelector('#menuId').value;
    const name = menuName.value;
    const content = menuContent.value;
    const price = menuPrice.value;
    const category = modifySelectCategory.value;
    const menuStatus = selectMenuStatus.options[selectMenuStatus.selectedIndex].value
    const menuCategorys = joinOptionContainer.querySelectorAll('input');
    let optionCategory = [];
    for (let category of menuCategorys) {
        optionCategory.push({menuOptionCategoryId: category.value})
    }

    let data = {
        menuId: menuId,
        menuName : name,
        menuContent: content,
        menuPrice: price,
        menuCategoryId: category,
        menuOptionCategorys: optionCategory,
        menuStatus :menuStatus
    }

    fetch('/menu/update', {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'X-Csrf-Token' : csrfToken
        },
        body: JSON.stringify(data)
    }).then(resp => {
        if (resp.ok) {
            alert('수정됨');
            editingModal.style.display = 'none';
        } else {
            alert('수정안됨');
        }
    })
}


// 옵션 추가 버튼 눌렀을때
optionJoinBtn.onclick = () => {
    const joinOptionList = document.querySelectorAll('.join-option-list');
    for (let optionVal of joinOptionList) {
        if (optionVal.querySelector('input').value === selectOption.options[selectOption.selectedIndex].value) {
            alert('같은 옵션은 넣을 수 없음');
            return;
        }
    }
    joinOptionContainer.insertAdjacentHTML('beforeend', `
                        <div class="join-option-list">
                            <input type="hidden" value="${selectOption.options[selectOption.selectedIndex].value}">
                            <div style="width: 200px;" class="join-option">${selectOption.options[selectOption.selectedIndex].text}<button type="button">X</button></div>
                        </div>`
    )

}

// 수정버튼 눌렀을 때
editingContentBtn.onclick = () => {
    document.querySelector('.editing-con').disabled = false;
}


editingTitleBtn.onclick = () => {
    document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = false);
    modifySelectCategory.disabled = false;
}

// 닫기 버튼 눌렀을 때
modifyCancel.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        document.querySelector('.editing-con').disabled = true;
        document.body.style.overflow = 'auto';
        modifySelectCategory.disabled = true;
        editingModal.style.display = 'none';
        modifySelectCategory.innerHTML = '';
        selectOption.innerHTML = '';
    }
}

//메뉴 추가 버튼 클릭
menuAddBtn.onclick = () => {
    menuAddModal.style.display = 'block';

    const menuEditing =  document.querySelector('menu-editing-div');
    const menuTitle = document.querySelector('menu-title').value;
    const menuCon = document.querySelector('menu-con').value;
    const menuDescription = document.querySelector('editing-con');

    const data = {
        menuName: menuTitle,
        menuPrice: menuCon,
        menuContent: menuDescription,
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

menuAddOpt.onclick = () => {

}





addCancel.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        menuAddModal.style.display = 'none';
    }
}



