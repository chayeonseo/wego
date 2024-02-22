const idBtn = document.getElementById('id-check');
const mbId = document.getElementById('mbId');
const checkedMessage =  document.querySelector('.check-message');

idBtn.onclick = () => {
    fetch(`/user/selectId?id=${mbId.value}`)
        .then(response => {
            return response.json()
        })
        .then(value => {
            if(value){
                checkedMessage.textContent = '사용 가능!'
            } else{
                checkedMessage.textContent = '아이디 중복!'

            }
        })
}