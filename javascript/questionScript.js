import {} from "./baseScript.js";
import {fade, option, pump, slide, zoom} from "./animationScript.js";

let array = [`Ngày 09-09 nguyệt lịch.`,
    `Ngày 09-01 nguyệt lịch.`,
    `Ngày 15-08 nguyệt lịch.`,
    `Ngày 18-08 nguyệt lịch.`
];

let part = document.createElement('div');
part.className = 'part';
part.innerHTML = 'Câu 1';

let question = document.createElement('div');
question.className = 'question';
question.innerHTML = `Thánh Lễ của Đức Ngọc Hoàng Thượng Đế thường diễn ra vào ngày nào trong năm?`;

let response = document.createElement('div');
response.className = 'response';
for (let i = 0; i < 4; i++) {
    response.innerHTML += `<button>${array[i]}</button>`;
}
let children = [...response.children];

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Xác nhận';

let area = document.createElement('div');
area.append(part, question, response, button);
area.setRatio();
document.body.append(area);
[part, question, children, button].setVisibility(false);

part.animate(fade(), option(0.5));
question.animate(fade(), option(0.5, 0.5));
for (let i = 0; i < 4; i++) {
    children[i].animate(slide(-40, 0), option(0.5, 1 + 0.3 * i));
}
button.animate(zoom(1.1, 1), option(0.5, 1 + 1.4)).onfinish = () => {
    children.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.onclick = () => {
            sessionStorage.setItem('Câu 1', index.toString());
            children.forEach((item) => item.classList.remove('active'));
            [item, button].addClass('active');
            setTimeout(function () {
                button.style.transition = 'none';
                button.style.cursor = 'pointer';
                button.onclick = () => {
                    button.onclick = null;
                    button.animate(pump(0.95),
                        option(0.2, 0, 'linear', 'alternate', 2));
                    setInterlude();
                };
            }, 0.5 * 1000);
        }
    });
};

function setInterlude() {
    area.animate(fade(false), option(0.5,0.2)).onfinish = () => {
        area.setSection('question','answer');
    }
}

