const categoryJoinBtn = document.querySelector('.con-category-add');
const optionModifyModal = document.querySelector('.option-editing-container');
const optionModifyCancel = document.querySelector('.option-cancel-btn');
const allOptions = document.querySelectorAll('.option-list');


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
    optionModifyModal.style.display = 'none';
}

/* 모든 옵션 수정 모달창 띄우기*/
[...allOptions].forEach(option => {
    option.onclick = () => {
        const optionId = option.querySelector('#optionId').value;
        optionModifyModal.style.display = 'block';

        fetch(`/option/${optionId}`)
            .then()
    }
})










