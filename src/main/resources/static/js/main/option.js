const categoryJoinBtn = document.querySelector('.con-category-add');
const optionModifyModal = document.querySelector('.option-editing-container');
const optionModifyCancel = document.querySelector('.option-cancel-btn');
const allOptions = document.querySelectorAll('.option-list');
const optionEditBtn = document.querySelector('.option-editing-btn');
const modalNameInput = optionModifyModal.querySelector('.option-title');
const modalPriceInput = optionModifyModal.querySelector('.option-price');
const optionDeleteBtn = document.querySelector('.opt-delete-btn');
const editingModal = document.querySelector('.option-editing-container');


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
    if (confirm('창을 닫으시겠습니까? 저장되지 않습니다')) {
        optionModifyModal.style.display = 'none';
        modalNameInput.disabled = true;
        modalPriceInput.disabled = true;
    }

}

/* 모든 옵션 수정 모달창 띄우기*/
[...allOptions].forEach(option => {
    option.onclick = () => {
        editingModal.style.display = 'block';
        const optionId = option.querySelector('#optionId').value;
        const optionName = option.querySelector('.title');
        const optionPrice = option.querySelector('.price');

        modalNameInput.value = optionName.innerText;
        modalPriceInput.value = optionPrice.innerText.replace('원', '');

        optionEditBtn.onclick = () => {
            console.log("눌림");
            modalNameInput.disabled = false;
            modalPriceInput.disabled = false;
        }

        optionModifyModal.style.display = 'block';

        fetch(`/option/${optionId}`)
            .then()
    }
})


optionDeleteBtn.onclick = () => {
    console.log("snffff");
    if (confirm("옵션을 삭제하시습니까?")){
        // 옵션삭제
    }
}












