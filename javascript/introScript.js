import {option, fade, slide, bounce, resize} from "./animationScript.js";

let array = [`Mến chào quý huynh tỷ,<br>đệ là <span>Tiểu Dần</span>.`,
    `Mến chúc quý huynh tỷ<br>một năm mới nhiều<br><span>sức khỏe,</span> thường <span>an lạc</span><br>
    và <span>tinh tấn.</span>`,
    `Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>`,
    `<span>Tiểu Dần</span> thân mời<br>quý huynh tỷ cùng tham gia<br>
    chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>`,
    `để cùng nhau tưởng nhớ<br>về Ngài, vị <span>Cha Lành từ ái</span><br>của muôn sinh.`];

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array[0];

let board = document.createElement('div');
board.className = 'board';
board.append(message);

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let area = document.createElement('div');
area.append(board, tieuDan);
document.body.append(area);
document.body.setRatio();
[...area.children].setVisibility(false);

tieuDan.animate(fade(), option(0.7));
tieuDan.animate(bounce(0, 20),
    option(0.7, 0.7, 'ease-in', 'alternate', Infinity));
board.animate(slide(0, 15), option(0.5, 1.4)).onfinish = function () {
    window.onclick = setClick;
}

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
    message.animate(fade(false), option(0.5, 0.5));
    board.animate(resize(0, 0), option(2, 0, 'ease-in-out'));
    setTimeout(function () {
        area.setSection('intro','info');
    }, 4 * 1000);
}