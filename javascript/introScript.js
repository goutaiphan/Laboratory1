import {appendObject, removeObject, setSize, setVisibility} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, zoomOut, minimize, bounce} from "./animationScript.js";

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
setVisibility([board, tieuDan], false);
setSize(area, 55, -7);

setTimeout(function () {
    tieuDan.animate(fadeIn(), options(0.7));
    tieuDan.animate(bounce(0, 20),
        options(0.7, 0.7, 'ease-in', 'alternate', Infinity));
    board.animate(slideIn(0, 15), options(0.5, 1.4)).onfinish = function () {
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
    } else interlude();
}

function interlude() {
    message.animate(fadeOut(), options(0.5, 0.5));
    board.animate(minimize(), options(2, 0, 'ease-in-out'));
    setTimeout(function () {
        document.body.style.pointerEvents = 'visible';
        document.body.onclick = null;
        appendObject('info');
        removeObject(area, 'intro');
    }, 4 * 1000);
}