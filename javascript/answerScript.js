export {setAnswer};
import {fade, option, pump, slide, zoom} from "./animationScript.js";
import {setQuestion} from "./questionScript.js";

let result = document.createElement('div');
result.className = 'result';
let children = result.children;

let explain = document.createElement('div');
explain.className = 'answer';

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Tiếp tục';

let area = document.createElement('div');
area.style.position = 'absolute';
area.append(result, explain, button);

function setAnswer() {
    setContent();
    setAnimation();
}

function setContent() {
    let array = {
        right: `<div>Xin chúc mừng,</div>
            <div>đây là câu trả lời chính xác.</div>`,
        wrong: `<div>Thật đáng tiếc,</div>
            <div>đây là câu trả lời chưa chính xác.</div>`
    };

    let partIndex = parseInt(sessionStorage.getItem('partIndex'));
    if (!partIndex) partIndex = 1;
    let answer = JSON.parse(sessionStorage.getItem('file'))[partIndex - 1].answer
        .replace(/\w\. /g, '');
    let response = sessionStorage.getItem('part' + partIndex);
    sessionStorage.setItem('partIndex', (partIndex + 1).toString());

    let type = response === answer
        ? 'right'
        : 'wrong';
    result.innerHTML = array[type];
    [result, button, ...document.querySelectorAll('span')].addClass(type);

    explain.innerHTML = `Thánh Lễ của Đức Ngọc Hoàng Thượng Đế được chọn là ngày <span>09-01</span> nguyệt lịch hằng năm,
thiết lễ cúng Trời, thành kính tri ân Đấng tạo hóa dưỡng dục muôn sinh.
9 là số thuần dương tối cao, 1 là số thuần dương đầu tiên nên chọn <span>09-01</span> làm ngày lễ vía Đức Đại Từ Phụ đó vậy.<br>
Bên cạnh đó, <span>15-08</span> là ngày Thánh Lễ của Đức Dao Trì Kim Mẫu. 
<span>18-08</span> là ngày Thánh Lễ của Đức Thái Bạch Kim Tinh. 
<span>09-09</span> là ngày Thánh Lễ của Đức Hồng Quân Lão Tổ.`;

    button.style.cursor = 'default';
    document.body.append(area);
    document.body.setRatio();
    [result, ...children, explain, button].setVisibility(false);
}

function setAnimation() {
    result.animate(fade(), option(0.5));
    children[0].animate(slide(-40, 0), option(0.5));
    children[1].animate(slide(40, 0), option(0.5));

    explain.animate(fade(), option(0.5, 0.5));
    button.animate(zoom(1.1, 1), option(0.5, 1)).onfinish = function () {
        button.style.cursor = 'pointer';
        button.onclick = () => {
            button.onclick = null;
            button.animate(pump(0.95),
                option(0.2, 0, 'linear', 'alternate', 2));
            setInterlude();
        }
    };
}

function setInterlude() {
    [result, ...children, explain, button].forEach((item) => {
        item.animate(fade(false), option(0.5, 0.2));
    });
    setTimeout(function () {
        area.setSection('answer', 'question');
        setQuestion();
    }, 0.7 * 1000);
}
