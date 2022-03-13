import {} from "./baseScript.js";
import {fade, option, pump, slide, zoom} from "./animationScript.js";

let array = {
    right: `<div>Xin chúc mừng,</div>
            <div>đây là câu trả lời chính xác.</div>`,
    wrong: `<div>Thật đáng tiếc,</div>
            <div>đây là câu trả lời chưa chính xác.</div>`
};

let result = document.createElement('div');
result.className = 'result';
let resultChildren = result.children;

let answer = document.createElement('div');
answer.className = 'answer';
answer.innerHTML = `Thánh Lễ của Đức Ngọc Hoàng Thượng Đế được chọn là ngày <span>09-01</span> nguyệt lịch hằng năm,
thiết lễ cúng Trời, thành kính tri ân Đấng tạo hóa dưỡng dục muôn sinh.
9 là số thuần dương tối cao, 1 là số thuần dương đầu tiên nên chọn <span>09-01</span> làm ngày lễ vía Đức Đại Từ Phụ đó vậy.<br>
Bên cạnh đó, <span>15-08</span> là ngày Thánh Lễ của Đức Dao Trì Kim Mẫu. 
<span>18-08</span> là ngày Thánh Lễ của Đức Thái Bạch Kim Tinh. 
<span>09-09</span> là ngày Thánh Lễ của Đức Hồng Quân Lão Tổ.`;

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Tiếp tục';

let area = document.createElement('div');
area.className = 'area';
area.append(result, answer, button);
area.setRatio();
[...resultChildren, answer, button].setVisibility(false);
document.body.append(area);

let type = sessionStorage.getItem('Câu 1') === '1'
    ? 'right'
    : 'wrong';
result.innerHTML = array[type];
[result, button, ...document.querySelectorAll('span')].addClass(type);

resultChildren[0].animate(slide(-40, 0), option(0.5));
resultChildren[1].animate(slide(40, 0), option(0.5));
answer.animate(fade(), option(0.5, 0.5));
button.animate(zoom(1.2, 1), option(0.5, 1)).onfinish = function () {
    button.style.cursor = 'pointer';
    button.onclick = () => {
        button.onclick = null;
        button.animate(pump(0.95),
            option(0.2, 0, 'linear', 'alternate', 2));
        setInterlude();
    }
};

function setInterlude() {
    area.animate(fade(false), option(0.5, 0.2)).onfinish = () => {
        area.setSection('answer','question');
    }
}
