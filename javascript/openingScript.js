import {} from "./baseScript.js";
import {option, fade, slide, pump} from "./animationScript.js";

let area = document.createElement('div');
let array = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Tham gia'];

for (let i = 0; i < array.length; i++) {
    let child = i === array.indexOf('Tham gia')
        ? document.createElement('button')
        : document.createElement('div');
    child.className = 'area';
    child.innerHTML = array[i];
    child.setVisibility(false);
    area.append(child);
}
document.body.append(area);
document.body.setRatio();

let children = area.children;
children[0].animate(fade(), option(0.5, 0.5));
children[1].animate(fade(), option(0.5, 1));
children[2].animate(fade(), option(0.5, 1.5));
children[3].animate(fade(), option(0.5, 2));
children[4].animate(slide(-20, 0), option(0.7, 2.5, 'ease-out'));
children[5].animate(slide(20, 0), option(0.7, 2.5, 'ease-out'));
children[6].animate(fade(), option(0.5, 3.2)).onfinish = function () {
    children[6].animate(pump(1.07),
        option(0.5, 0, 'ease-in', 'alternate', Infinity));
    children[6].onclick = setInterlude;
};

function setInterlude() {
    let backgroundAudio = document.querySelector('#backgroundAudio');
    backgroundAudio.volume = 0.8;
    backgroundAudio.play().then(function () {
        console.log('Nhạc nền đã phát thành công.');
    });
    document.body.append(backgroundAudio);

    children[6].onclick = null;
    area.animate(fade(false), option(0.5)).onfinish = function () {
        area.setSection('opening', 'intro');
    }
}