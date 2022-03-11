import {appendSection, removeSection} from "./baseScript.js";
import {bounce, fade, resize, option} from "./animationScript.js";

let userData = JSON.parse(sessionStorage.getItem('userData'));
let array0 = [`Xin chào mừng<br><span class="userName">${userData.userName}</span><br>`,
    `đã quay trở lại<br>cùng chư huynh đệ<br><span>Tàng Kinh Các Đại Đạo.</span>`];
let array1 = [`Xin chúc mừng<br><span class="userName">${userData.userName}</span>`,
    `Đây là tài khoản <span>thứ ${userData.userID.replace('user', '')}</span><br>
    đăng ký thành công tại<br><span>Tàng Kinh Các Đại Đạo.</span>`,
    `<span>Thông tin tài khoản</span> đã gửi<br>qua <span>email,</span>
    quý huynh tỷ<br>vui lòng lưu lại để sử dụng<br>khi cần thiết.`];
let array2 = [`Chương trình <span>Niềm vui<br>tu Đạo</span> đang trong<br>giai đoạn <span>chuẩn bị,</span><br>`,
    `<span>Tiểu Dần</span> sẽ thông báo<br>đến quý huynh tỷ khi<br>chương trình <span>ra mắt.</span><br>
    Xin trân trọng cảm ơn.`];
// let array2 = [`Chương trình <span>Niềm vui<br>tu Đạo</span> lần này sẽ bao gồm<br><span>15 câu hỏi,</span>`,
//     `nếu trả lời <span>chính xác</span> trong thời gian <span>càng ngắn,</span><br>quý huynh tỷ sẽ đạt điểm <span>càng cao.</span>`,
//     `<span>Tiểu Dần</span> mến chúc quý huynh tỷ thật nhiều may mắn.<br>
//     Quý huynh tỷ đã sẵn sàng để <span>bắt đầu</span> chứ?`];

let section = sessionStorage.getItem('section');
// let section = 'signIn';
let array = section === 'signIn'
    ? array0.concat(array2)
    : array1.concat(array2);

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array[0];

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Bắt đầu';

let board = document.createElement('div');
board.className = 'board';
board.append(message);

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let area = document.createElement('div');
area.append(board, tieuDan);
area.setRatio(55, -10);
[board, message, tieuDan].setVisibility(false);
document.body.append(area);

setTimeout(function () {
    board.setAppearance();
    tieuDan.animate(fade(), option(0.7));
    tieuDan.animate(bounce(0, 20),
        option(0.7, 0.7, 'ease-in', 'alternate', Infinity));
    message.animate(fade(), option(0.5, 4.3));
    board.animate(resize(390, '0 30px 40px'), option(2, 3.8, 'ease-in-out'))
        .onfinish = function () {
        window.onclick = setClick;
    }
}, 0.5 * 1000);

let i = 0;

function setClick() {
    window.onclick = null;
    if (i < array.length - 1) {
        i++;
        message.animate(fade(false), option(0.5)).onfinish = function () {
            message.innerHTML = array[i];
            message.animate(fade(), option(0.5));
            window.onclick = setClick;
        };
    } else setInterlude();
}

function setInterlude() {
    // appendSection('welcome');
    // area.animate(fade(false), option(0.5)).onfinish = function () {
    //     removeSection(area, 'welcome');
    // }
}