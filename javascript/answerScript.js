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

    let file = JSON.parse(sessionStorage.getItem('file'));
    let response = sessionStorage.getItem('part' + partIndex).replaceAll('<br>', ' ');
    let answer = file[partIndex - 1].answer.replace(/\w\. /g, '');
    explain.innerHTML = file[partIndex - 1].explain.replaceAll('\n', '<br>');
    sessionStorage.setItem('partIndex', (partIndex + 1).toString());

    if (response === answer) {
        result.innerHTML = array.right;
        [result, button, ...explain.querySelectorAll('span')].addClass('right');
        [result, button, ...explain.querySelectorAll('span')].removeClass('wrong');
        'rightAudio'.setPlay(0.4);
    } else {
        result.innerHTML = array.wrong;
        [result, button, ...explain.querySelectorAll('span')].addClass('wrong');
        [result, button, ...explain.querySelectorAll('span')].removeClass('right');
        'wrongAudio'.setPlay(0.4);
    }

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
