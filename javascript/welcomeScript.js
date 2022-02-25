import {appendObject, removeObject, setAppearance, setSize, setVisibility} from "./baseScript.js";
import {bounce, fadeIn, fadeOut, maximize, options, slideIn} from "./animationScript.js";

let userData = JSON.parse(sessionStorage.getItem('userData'));
// let userData = {userName: 'Tĩnh Tâm', userID: 'user1'};
let array1 = [`Xin chào mừng<br><span class="userName">${userData.userName}</span><br>`,
    `đã quay trở lại<br>cùng chư huynh đệ<br><span>Tàng Kinh Các Đại Đạo.</span>`];
let array2 = [`Xin chúc mừng<br><span class="userName">${userData.userName}</span>`,
    `Đây là tài khoản <span>thứ ${userData.userID.replace('user', '')}</span><br>
    đăng ký thành công tại<br><span>Tàng Kinh Các Đại Đạo.</span>`,
    `<span>Thông tin tài khoản</span> đã gửi<br>qua <span>email,</span>
    quý huynh tỷ<br>vui lòng lưu lại để sử dụng<br>khi cần thiết.`];
let array3 = [`Chương trình <span>Niềm vui<br>tu Đạo</span> đang trong<br>giai đoạn <span>chuẩn bị,</span><br>`,
    `<span>Tiểu Dần</span> sẽ thông báo<br>đến quý huynh tỷ khi<br>chương trình <span>ra mắt.</span><br>
    Xin trân trọng cảm ơn.`];

let section = sessionStorage.getItem('section');
// let section = 'signIn';
let array = section === 'signIn'
    ? array1.concat(array3)
    : array2.concat(array3);

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array[0];

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Tham gia';

let board = document.createElement('div');
board.className = 'board';
board.append(message);

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let area = document.createElement('div');
area.append(board, tieuDan);
document.body.append(area);
setVisibility([board, message, tieuDan], false);
setSize(area, 55, -10);

setTimeout(function () {
    setAppearance(board);
    tieuDan.animate(fadeIn(), options(0.7));
    tieuDan.animate(bounce(0, 20),
        options(0.7, 0.7, 'ease-in', 'alternate', Infinity));
    message.animate(fadeIn(), options(0.5, 4.3));
    board.animate(maximize('390px', '0 30px 40px'), options(2, 3.8, 'ease-in-out'))
        .onfinish = function () {
        document.body.style.pointerEvents = 'visible';
    }
}, 0.5 * 1000);

let i = 0;
document.body.style.pointerEvents = 'none';
document.body.onclick = function () {
    document.body.style.pointerEvents = 'none';
    if (i < array.length - 1) {
        i++;
        message.animate(fadeOut(), options(0.5)).onfinish = function () {
            message.innerHTML = array[i];
            message.animate(fadeIn(), options(0.5));
            document.body.style.pointerEvents = 'visible';
        };
    } else {
        //board.append(button);
        //interlude();
    }
}

function interlude() {
    area.animate(fadeOut(), options(0.5)).onfinish = function () {
        // appendObject('welcome');
        removeObject(area, 'welcome');
    }
}