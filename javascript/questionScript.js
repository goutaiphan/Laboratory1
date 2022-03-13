import {appendSection, removeSection} from "./baseScript.js";
import {fade, option, slide} from "./animationScript.js";

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
    let child = document.createElement('button');
    child.innerHTML = array[i];
    response.append(child);
}
let children = [...response.children];

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Xác nhận';

let area = document.createElement('div');
area.append(part, question, response, button);
area.setRatio(-10, -40);
[part, question, children, button].setVisibility(false);
document.body.append(area);

part.animate(fade(), option(0.5));
question.animate(fade(), option(0.5, 0.5));
for (let i = 0; i < 4; i++) {
    children[i].animate(slide(-40, 0), option(0.5, 1 + 0.3 * i));
}
button.animate(fade(), option(0.5, 1 + 1.4)).onfinish = ()=>{
    children.forEach((item, index) => {
        item.onclick = () => {
            sessionStorage.setItem('Câu 1', index.toString());
            children.forEach((item) => item.classList.remove('active'));
            item.classList.add('active');
            button.classList.add('active');
        }
    })
};

