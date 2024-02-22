const storeName = document.getElementById('store-name');
const [storeCallNumChangeBtn, storeStatusChangeBtn] = document.getElementById('store-call-num-change-btn', 'store-status-change-btn');
const numModalCloseButton = document.getElementById('modalCloseButton');
const textModalCloseButton = document.getElementById('modalCloseButton');
const statusModalCloseButton = document.getElementById('modalCloseButton');
const numModalContainer = document.getElementById('numModalContainer');
const textModalContainer = document.getElementById('textModalContainer');
const statusModalContainer = document.getElementById('statusModalContainer');
// fetch('/store',)
//     .then(resp => resp.json())
//     .then(value => {
//
//     });

storeCallNumChangeBtn.onclick = () => {
    numModalContainer.classList.remove('hidden');
}

statusModalCloseButton.onclick = () => {
    numModalContainer.classList.add('hidden');
}


storeStatusChangeBtn.onclick()


