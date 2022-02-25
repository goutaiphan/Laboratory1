import {appendObject, removeObject, setSize, setVisibility} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, pumping} from "./animationScript.js";

let area = document.createElement('div');

let array = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];

for (let i = 0; i < array.length; i++) {
    let child;
    if (i === array.indexOf('Bắt đầu')) {
        child = document.createElement('button');
        child.style.pointerEvents = 'none';
        child.onclick = interlude;
    } else child = document.createElement('div');
    child.innerHTML = array[i];
    child.className = 'area';
    setVisibility(child, false);
    area.append(child);
}

document.body.append(area);
setSize(area, 20, -30);

let children = area.children;
children[0].animate(fadeIn(), options(0.5, 0.5));
children[1].animate(fadeIn(), options(0.5, 1));
children[2].animate(fadeIn(), options(0.5, 1.5));
children[3].animate(fadeIn(), options(0.5, 2));
children[4].animate(slideIn(-20, 0), options(0.7, 2.5, 'ease-out'));
children[5].animate(slideIn(20, 0), options(0.7, 2.5, 'ease-out'));
children[6].animate(fadeIn(), options(0.5, 3.2)).onfinish = function () {
    children[6].animate(pumping(1.07),
        options(0.5, 0, 'ease-in', 'alternate', Infinity));
    children[6].style.pointerEvents = 'visible';
};

function interlude() {
    let backgroundAudio = document.createElement('audio');
    backgroundAudio.src = '../media/FreeTheMindInNature.mp3';
    backgroundAudio.volume = 0.8;
    backgroundAudio.preload;
    backgroundAudio.loop = true;
    backgroundAudio.play().then(function () {
        console.log('Nhạc nền đã phát thành công.');
    });
    document.body.append(backgroundAudio);

    area.animate(fadeOut(), options(0.5)).onfinish = function () {
        appendObject('intro');
        // appendObject('info');
        removeObject(area, 'entrance');
    }
}