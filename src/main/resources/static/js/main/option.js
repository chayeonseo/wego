const csrfToken = document.querySelector('meta[name=_csrf]').content; // csrf

const optionJoinModalBtn = document.querySelector('.con-add'); // 옵션 추가 버튼
const categoryJoinBtn = document.querySelector('.con-category-add'); // 옵션 카테고리 추가 버튼
const allOptions = document.querySelectorAll('.option-list'); // 옵션 리스트 들
const optionModifyModal = document.querySelector('.option-editing-container'); // 옵션 수정 모달창 node
const optionJoinModal = document.querySelector('.option-creating-container'); // 옵션 추가 모달창 node
const categoryModifyModal = document.querySelector('.option-category-container'); // 옵션 카테고리 수정 모달창 node
const categoryList = document.querySelectorAll('.con'); // 카테고리 별 container

/////////////////////////////////////////////////////////////////////////////

let modalOptionId = document.querySelector('#modal-optionId').value; // [수정모달] 옵션 id input

const optionModifyCancel = optionModifyModal.querySelector('.option-cancel-btn'); // [수정모달] 옵션 변경 모달창 닫기 버튼
const categorySelect = optionModifyModal.querySelector('#option-category-dropdown'); // [수정모달] 카테고리 select node
const statusSelect = optionModifyModal.querySelector('#option-status-dropdown'); // [수정모달] status select node
const modifyBtn = optionModifyModal.querySelector('.apply-btn'); // [수정모달] 옵션 적용 버튼
const deleteBtn = optionModifyModal.querySelector('.delete-btn'); // [수정모달] 옵션 적용 버튼
const modalNameInput = optionModifyModal.querySelector('.option-title'); // [수정모달] nameInput
const modalPriceInput = optionModifyModal.querySelector('.option-price'); // [수정모달] nameInput
const editingBtn = optionModifyModal.querySelector('.option-editing-btn'); // [수정모달] input 수정버튼

///////////////////////////////////////////////////////////////////////////

const optionJoinCancel = optionJoinModal.querySelector('.option-cancel-btn'); // [추가모달] 옵션 추가모달 닫기 버튼
const joinOptionCategory = optionJoinModal.querySelector('.join-option-category'); // [추가모달] 카테고리 select node
const optionCreatingContainer = optionJoinModal.querySelector('.option-creating'); // [추가모달] 옵션 작성 container node
const optionCreateAddBtn = optionJoinModal.querySelector('.create-add-btn'); // [추가모달] 옵션 추가 버튼
// const optionCreatingDiv = optionJoinModal.querySelectorAll('.option-creating-div')[0]; // [추가모달] 옵션 추가 시 들어갈 원래 있는 node
const optionJoinBtn = optionJoinModal.querySelector('.create-btn'); // [추가모달] 옵션 추가 요청 버튼
let optionCreatingDiv; // [추가모달] 옵션 추가할 때 사용할 node

///////////////////////////////////////////////////////////////////////////

let categoryId = categoryModifyModal.querySelector('#modify-categoryId'); // [카테고리 모달] 현재 모달에 띄워진 카테고리 id

const categoryModifyCancel = categoryModifyModal.querySelector('.option-cancel-btn'); // [카테고리 모달] 모달창 닫기 버튼
const categoryTitle = categoryModifyModal.querySelector('.option-header-title'); // [카테고리 모달] category name input node
const optionContainer = categoryModifyModal.querySelector('.option-editing-body'); // [카테고리 모달] 옵션 리스트 container
const categoryDeleteBtn = categoryModifyModal.querySelector('.delete-btn'); // [카테고리 모달] 카테고리 삭제 버튼

///////////////////////////////////////////////////////////////////////////


/* Option category join*/
categoryJoinBtn.onclick = () => {
    let categoryName = prompt('카테고리 이름 입력');

    if (categoryName !== null) {
        fetch(`/option/categoryJoin/${categoryName}`)
            .then(resp => {
                if (resp.ok) {
                    alert('카테고리 추가 성공')
                    location.reload();
                }
            })
    }
}

////////////////////////////////////// 옵션 수정


/* 옵션 모달창 닫기 */
optionModifyCancel.onclick = () => {
    if (confirm('지인짜 창을 닫을래?')) {
        const editingInput = optionModifyModal.querySelectorAll('.option-editing-div input');
        optionModifyModal.style.display = 'none';
        document.body.style.overflow = 'auto';

        editingInput.forEach(input => input.disabled = false);
    }
}

/* 모든 옵션 수정 모달창 띄우기*/
[...allOptions].forEach(option => {
    option.onclick = () => {
        modalOptionId = option.querySelector('#optionId').value;
        const optionName = option.querySelector('.title');
        const optionPrice = option.querySelector('.price');

        modalNameInput.value = optionName.innerText;
        modalPriceInput.value = optionPrice.innerText.replace('원', '');

        optionModifyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';


        fetch(`/option/categorys`)
            .then(resp => resp.json())
            .then(categorys => {
                console.log(categorys);
                categorySelect.innerHTML = '';
                for (let category of categorys) {
                    categorySelect.insertAdjacentHTML('beforeend', `<option value="${category['menuOptionCategoryId']}">${category['menuOptionCategoryName']}</option>`)
                }
            })
    }
})

// modifyBtn click (옵션 적용)
modifyBtn.onclick = () => {
    const optionId = modalOptionId;
    const optionName = modalNameInput.value;
    const optionPrice = modalPriceInput.value;
    const optionCategoryId = categorySelect.options[categorySelect.selectedIndex].value;
    const optionStatus = statusSelect.options[statusSelect.selectedIndex].value;

    let data = {
        optionId : optionId,
        menuOptionName : optionName,
        categoryId : optionCategoryId,
        menuOptionPrice : optionPrice,
        menuOptionStatus : optionStatus
    }

    fetch('/option/modify', {
        method: 'PATCH',
        headers: {
            "content-type" : "application/json",
            'X-Csrf-Token' : csrfToken
        },
        body: JSON.stringify(data)
    }).then(resp => {
        if (resp.ok) {
            alert('수정완료');
            location.reload();
        } else {
            alert('실패함');
        }
    }).catch(reason => {
        alert('통신 실패함');
    })
}

// deleteBtn click (옵션 삭제)
deleteBtn.onclick = () => {
    if (confirm('정말 삭제하겠냐?')) {
        fetch(`/option/delete/${modalOptionId}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json',
                'X-Csrf-Token' : csrfToken
            },
        }).then(resp => {
            if (resp.ok) {
                alert('삭제완');
                location.reload();
            } else {
                alert('실패함');
            }
        }).catch(reason => {
            alert('통신 실패함');
        })
    }
}

// 수정 버튼 클릭
editingBtn.onclick = () => {
    const editingInput = optionModifyModal.querySelectorAll('.option-editing-div input');
    console.log(editingInput)
    editingInput.forEach(input => input.disabled = false);
}


////////////////////////////////////// 옵션 추가

// 옵션 추가 닫기
optionJoinCancel.onclick = () => {
    if (confirm('진짜 닫을래? 참고로 저장 안됨')) {
        location.reload();
    }
}

// 옵션 추가 모달 띄우기
optionJoinModalBtn.onclick = () => {
    optionJoinModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    fetch(`/option/categorys`)
        .then(resp => resp.json())
        .then(categorys => {
            joinOptionCategory.innerHTML = '';
            for (let category of categorys) {
                joinOptionCategory.insertAdjacentHTML('beforeend', `<option value="${category['menuOptionCategoryId']}">${category['menuOptionCategoryName']}</option>`)
            }

            optionCreatingDiv = optionCreatingContainer.innerHTML;
        })
}

// 옵션 추가 (옵션 여러개를 한번에 추가 하기 위한 기능)
optionCreateAddBtn.onclick = () => {
    optionCreatingContainer.insertAdjacentHTML('beforeend', optionCreatingDiv);
}

// 옵션 추가 요청
optionJoinBtn.onclick = () => {
    let data = [];
    const optionList = optionJoinModal.querySelectorAll('.option-creating-div');

    console.log(optionList.length)
    for (let option of optionList) {
        const category = option.querySelector('.join-option-category');
        const optionName = option.querySelector('.option-title').value;
        const optionPrice = option.querySelector('.option-price').value;

        data.push({
            categoryId : category.options[category.selectedIndex].value,
            menuOptionName : optionName,
            menuOptionPrice : optionPrice
        });
    }

    console.log(data)

    fetch('/option/join', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
            'X-Csrf-Token' : csrfToken
        },
        body: JSON.stringify(data)
    }).then(resp => {
        if (resp.ok) {
            alert('추가성공');
            location.reload();
        } else {
            alert('추가 실패');
        }
    }).catch(reason => {
        alert('통신 추가 실패');
    })
}




//////////////////////////////////////// 옵션 그룹 변경

categoryModifyCancel.onclick = () => {
    if (confirm('진짜 닫을래? 자동 저장 안됨')) {
        categoryModifyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

categoryList.forEach(category => {
    const categoryModifyBtn = category.querySelector('.category-modify-btn');

    // 변경 버튼 클릭 시
    categoryModifyBtn.onclick = () => {

        categoryModifyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        categoryId = category.querySelector('#categoryId').value;

        fetch(`/option/category/${categoryId}`)
            .then(resp => resp.json())
            .then(category => {
                categoryTitle.value = category['menuOptionCategoryName'];

                optionContainer.innerHTML = '';
                for (let option of category['menuOptions']) {
                    optionContainer.insertAdjacentHTML('beforeend', 
                        `<div class="option-editing">
                    <div class="option-editing-div">
                        <input type="hidden" value="${option['optionId']}">
                        <div class="option-modify-title">${option['menuOptionName']}</div>
                        <div class="option-modify-price">${option['menuOptionPrice'] + '원'}</div>
                    </div>
                </div>
                <hr>`)
                }
            })
    }
})


categoryDeleteBtn.onclick = () => {
    console.log('delete 클릭')
    if (confirm('삭제하면 그룹에 속한 옵션도 같이 삭제되는데 그래도 할래?')) {
        fetch(`/option/category/delete/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'X-Csrf-Token' : csrfToken
            }
        }).then(resp => {
            if (resp.ok) {
                alert('삭제 됨');
                location.reload();
            }
        })
    }
}




