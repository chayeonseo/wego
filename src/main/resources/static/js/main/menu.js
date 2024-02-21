


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
const selectAddOption = document.getElementById('option-add-dropdown');
const optionJoinBtn = document.querySelector('.menu-option-join-btn');
const joinOptionContainer = document.getElementById('join-option-modify-container');
const modifyBtn = document.querySelector('.modify-btn');
const addBtn = document.querySelector('.option-add-btn');
const menuName = document.querySelector('#menu-modify-modal .menu-title');
const menuPrice = document.querySelector('#menu-modify-modal .menu-con');



const menuContent = document.querySelector('.editing-con');
const menuImg = document.querySelector('.menu-editing-img');
// const joinOptionList = document.querySelectorAll('.join-option-list');
const selectMenuStatus = document.querySelector('.menu-sold-select');
const categoryAddSelect = document.getElementById('category-add-dropdown');
const joinOptionAddContainer = document.getElementById('join-option-add-container');


[...productList].forEach(product => {
    product.onclick = () => {
        const menuId = product.querySelector('.menuId');
        const menuName = product.getElementsByClassName('menu-name')[0];
        editingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        progress_process(`/menu/${menuId.value}`, 'GET').then(categorys => {
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


// 수정 모달창 -적용 버튼  눌렀을 때
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


    if(name === '' || price === ''){
        alert('이름과 가격은 필수사항 입니다');
        return;
    }

    if(+price + '' === 'NaN'){
        alert('가격에는 숫자만 입력해주세요!');
        return;
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


// 수정 모달창 - 옵션 추가 버튼 눌렀을때
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

fetch('/menu/category')
    .then(resp => resp.json())
    .then(value => {
        console.log(value)
    })

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

/**********************  메뉴 추가 모달창  *********************************************/

//메뉴 추가 버튼 클릭
menuAddBtn.onclick = () => {
    menuAddModal.style.display = 'block';
    selectAddOption.innerHTML = ''; // 메뉴의 카테고리 select 태그 내용 전부 제거
    categoryAddSelect.innerHTML = ''; // 옵션 select 태그 내용 전부 제거
    joinOptionAddContainer.innerHTML = ''; // 추가되어있었던 옵션들 전부 제거

    fetch('/menu/category')
        .then(resp => resp.json())
        .then(data => {
            // 주 메뉴 내용 생성
            for(let i = 0; i < data.length; i++){
                const menuCategoryOptionName = data[i].menuCategoryName;
                const menuCategoryOption = document.createElement("option");
                menuCategoryOption.value = data[i].menuCategoryId;
                menuCategoryOption.textContent = menuCategoryOptionName;
                categoryAddSelect.appendChild(menuCategoryOption);
            }
            // 옵션들 생성
            const categories = data[0].menuOptionCategorys;
            for(let j=0; j < categories.length; j++){
                const optionElement = document.createElement("option");
                optionElement.textContent = categories[j].menuOptionCategoryName;
                optionElement.value = categories[j].menuOptionCategoryId;
                selectAddOption.appendChild(optionElement);
            }
        });
}
// 추가모달창 - 옵션 선택 시 하위에 추가
selectAddOption.onchange = () => {
    joinOptionAddContainer.insertAdjacentHTML('beforeend', `
                        <div class="join-option-list">
                            <input type="hidden" value="${selectAddOption.value}">
                            <div style="width: 200px;" class="join-option">${selectAddOption.options[selectAddOption.selectedIndex].text}<button type="button">X</button></div>
                        </div>`
    )
}


addBtn.onclick = () => {
    const category = categoryAddSelect.value; // 주 카테고리
    const menuTitle = document.querySelector('#menu-add-modal .menu-title').value; // 메뉴명
    const menuCon = document.querySelector('#menu-add-modal .menu-con').value; // 가격
    const menuDescription = document.querySelector('#menu-add-modal .editing-con').value; // 메뉴설명
    const menuAddDiv = joinOptionAddContainer.querySelectorAll('.join-option-list');

    if(menuTitle === '' || menuCon === ''){
        alert('이름과 가격은 필수사항 입니다');
        return;
    }

    if(+menuCon + '' === 'NaN'){
        alert('가격에는 숫자만 입력해주세요!');
        return;
    }

    const data = {
        menuCategoryId: category,
        menuName: menuTitle,
        menuPrice: +menuCon,
        menuContent: menuDescription,
        menuOptionCategorys: []
    }

    for(let i=0; i < menuAddDiv.length; i++){
        const value = menuAddDiv[i].querySelector('input').value;
        data.menuOptionCategorys.push({ menuOptionCategoryId: value });
    }

    fetch(`/menu/join` , {
        method: 'post',
        headers: {
            "X-CSRF-TOKEN": csrfToken,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(resp => {
        if(resp.status === 200 && resp.ok){
            alert('추가 완료되었습니다')
        }else{
            alert('추가가 실패되었습니다')
        }
    }).catch(reason => {
        alert('추가가 실패되었습니다')
    });
}




addCancel.onclick = () => {
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')){
        document.querySelectorAll('.menu-editing-div input').forEach(input => input.disabled = true);
        menuAddModal.style.display = 'none';
    }
}



