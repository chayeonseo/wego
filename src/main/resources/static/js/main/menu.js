const csrfToken = document.querySelector('meta[name=_csrf]').content;

const productList = document.querySelectorAll('.menu-li');
const editingModal = document.querySelector('.menu-editing-container')
const editingCancelBtn = document.querySelector('.menu-cancel-btn');
const [editingTitleBtn, editingContentBtn] = document.querySelectorAll('.menu-editing-btn');
const selectCategory = document.querySelector('.category-dropdown');
const selectOption = document.querySelector('.option-dropdown');
const optionJoinBtn = document.querySelector('.menu-option-join-btn');
const joinOptionContainer = document.querySelector('.join-option-container');
const modifyBtn = document.querySelector('.modify-btn');
const menuName = document.querySelector('.menu-title');
const menuPrice = document.querySelector('.menu-con');
const menuContent = document.querySelector('.editing-con');
const menuImg = document.querySelector('.menu-editing-img');
const joinOptionList = document.querySelectorAll('.join-option-list');




[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        editingModal.style.display = 'block';

        fetch(`/menu/${menuId.value}`)
            .then(resp => resp.json())
            .then(categorys => {
                console.log(categorys);
                menuName.value = categorys[0]['menus'][1]['menuName'];
                menuPrice.value = categorys[0]['menus'][1]['menuPrice'];
                menuContent.value = categorys[0]['menus'][1]['menuContent'];
                menuImg.setAttribute('src', 'http://' + categorys[0]['menus'][1]['menuImgs'][0]['menuImgThm']);
                for (category of categorys) {
                    selectCategory.insertAdjacentHTML('beforeend', `<option value="${category['menuCategoryId']}">${category['menuCategoryName']}</option>`)
                }
                for (option of categorys[0]['menus'][0]['menuOptionCategorys']) {
                    selectOption.insertAdjacentHTML('beforeend', `<option value="${option['menuOptionCategoryId']}">${option['menuOptionCategoryName']}</option>`)
                }
                document.querySelector('#menuId').value = menuId.value;

                console.log(categorys[0]['menus'][1]['menuOptionCategorys'])
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


                const joinOptionList = document.querySelectorAll('.join-option-list');

                console.log(joinOptionList);
                [...joinOptionList].forEach(option => {
                    option.querySelector('button').onclick = () => {
                        fetch(`/menu/${option.querySelector('input').value}/${document.querySelector('#menuId').value}`,{
                            method: 'delete',
                            headers: {'X-Csrf-Token' : csrfToken}
                        }).then(resp => {
                            console.log(resp.ok)
                            if (resp.ok) {
                                alert('옵션 삭제 완료');
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
    const category = selectCategory.value;
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
        menuOptionCategorys: optionCategory
    }

    fetch('/menu/update', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
            'X-Csrf-Token' : csrfToken
        },
        body: JSON.stringify(data)
    }).then(resp => {
        console.log(resp.ok)
    })
}

// 옵션 추가 버튼 눌렀을때
optionJoinBtn.onclick = () => {
    joinOptionContainer.insertAdjacentHTML('beforeend', `
                    <input type="hidden" value="${selectOption.options[selectOption.selectedIndex].value}">
                    <span class="join-option">${selectOption.options[selectOption.selectedIndex].text}</span>`
    )
}

// 수정버튼 눌렀을 때
editingContentBtn.onclick = () => {
    document.querySelector('.editing-con').disabled = false;
}

editingTitleBtn.onclick = () => {
    document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = false);
    selectCategory.disabled = false;
}


// 닫기 버튼 눌렀을 때
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