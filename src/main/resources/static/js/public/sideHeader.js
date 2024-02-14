// // 사용자가 로그인한 상태인지 여부를 가정하고, 사용자 이름을 가져오는 함수
// function getUserName() {
//     // 사용자 이름을 가져오는 로직을 구현
//     // 예를 들어, 로그인된 사용자 정보를 서버에서 가져와야함
//     return "Uaaaaaa";
// }
//
// // 로그인 상태에 따라 헤더에 사용자 이름 또는 로그인 텍스트를 업데이트하는 함수
// function updateHeader() {
//     const loginStatusDiv = document.getElementById("loginStatus");
//     const userName = getUserName();
//
//     if (userName) {
//         loginStatusDiv.textContent = userName;
//     } else {
//         loginStatusDiv.textContent = "로그인";
//     }
// }
//
// // 페이지 로드 시 헤더 업데이트 호출
// updateHeader();


/***************************** sideBar ****************************************/

// 사이드바 요소가 보이는 상태면 숨기고, 숨겨진 상태면 보이게함
function toggleNav() {
    var sidebar = document.querySelector('.sideNav');
    // console.log(sidebar.style.display)
    sidebar.classList.toggle("hidden")
}

// 아이콘이 있는 li 항목들을 클릭 시 색상이 진하게 변경
var iconItems = document.querySelectorAll('.sideBar li');
iconItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // 클릭된 항목의 색상을 진하게 변경
        item.style.fontWeight = 'bold';

        // 다른 항목들의 색상을 원래대로 변경
        iconItems.forEach(function(otherItem) {
            if (otherItem !== item) {
                otherItem.style.fontWeight = 'normal';
            }
        });
    });
});




// 가게관리를 클릭했을 때 드롭다운 기능 구현
// 모든 menu-group 요소를 선택합니다.
const menuGroups = document.querySelectorAll('.menu-group');

// 각 menu-group 요소에 대해 클릭 이벤트를 추가합니다.
menuGroups.forEach(menuGroup => {
    // menu-group 요소를 클릭했을 때의 동작을 정의합니다.
    menuGroup.addEventListener('click', () => {
        // 클릭한 menu-group의 하위 요소인 sideBar-list를 선택합니다.
        const sideBarList = menuGroup.querySelector('.sideBar-list');

        // sideBar-list가 보이지 않는 상태인 경우에는 보이도록 변경하고,
        // 보이는 상태인 경우에는 숨기도록 변경합니다.
        if (sideBarList.style.display === 'none') {
            sideBarList.style.display = 'block';
        } else {
            sideBarList.style.display = 'none';
        }
    });
});






// var menuGroups = document.querySelectorAll('.menu-group');
// menuGroups.forEach(function(menuGroup) {
//     var subMenus = menuGroup.querySelectorAll('.sideBar-list');
//     var isOpen = false;
//
//     menuGroups.addEventListener('click', function() {
//         if (isOpen) {
//             subMenus.style.display = 'none';
//             menuGroups.classList.remove('active'); // 클릭 시 상위 항목에서 active 클래스 제거
//             isOpen = false;
//         } else {
//             subMenus.style.display = 'block';
//             menuGroups.classList.add('active'); // 클릭 시 상위 항목에 active 클래스 추가
//             isOpen = true;
//         }
//     });
//
//     subMenus.addEventListener('click', function(event) {
//         event.stopPropagation(); // 하위 속성 클릭 시 이벤트 전파 중단
//     });
// });
//
//
//
