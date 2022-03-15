export {setQuestion};
import {fade, option, pump, slide, zoom} from "./animationScript.js";
import {setAnswer} from "./answerScript.js";

let question = document.createElement('div');
question.className = 'question';
question.innerHTML = '<div></div><div></div>'
let questionChildren = question.children;

let response = document.createElement('div');
response.className = 'response';
for (let i = 0; i < 4; i++) {
    response.innerHTML += '<button></button>'
}
let responseChildren = response.children;

let button = document.createElement('button');
button.className = 'button';
button.innerHTML = 'Xác nhận';

let area = document.createElement('div');
area.style.position = 'absolute';
area.style.top = '0';
area.append(question, response, button);

setQuestion();

function setQuestion() {
    setContent();
    setAnimation();
}

function setContent() {
    let partIndex = parseInt(sessionStorage.getItem('partIndex'));
    if (!partIndex) partIndex = 1;

    let file = JSON.parse(sessionStorage.getItem('file'));
    questionChildren[0].innerHTML = `Câu ${partIndex}`;
    questionChildren[1].innerHTML = file[partIndex - 1].question.replace(/Câu \d: /g, '');

    [...responseChildren].forEach((item, index) => {
        let string = file[partIndex - 1].response
            .split('\n')[index]
            .replace(/\w\. /g, '');
        item.innerHTML = string;
        item.onclick = null;
        item.style.cursor = 'default';
        item.classList.remove('active');
        item.style.height = partIndex === 2
            ? '135px'
            : '60px';
    });

    button.classList.remove('active');
    button.style.cursor = 'default';

    document.body.append(area);
    document.body.setRatio();
    [...questionChildren, ...responseChildren, button].setVisibility(false);
}

function setAnimation() {
    questionChildren[0].animate(fade(), option(0.5));
    questionChildren[1].animate(fade(), option(0.5, 0.5));
    for (let i = 0; i < 4; i++) {
        responseChildren[i].animate(slide(-40, 0), option(0.5, 1 + 0.3 * i));
    }
    button.animate(zoom(1.1, 1), option(0.5, 1 + 1.4)).onfinish = setClick;
}

function setClick() {
    [...responseChildren].forEach((item) => {
        item.style.cursor = 'pointer';
        item.onclick = () => {
            [...responseChildren].forEach((item) => item.classList.remove('active'));
            [item, button].addClass('active');

            let partIndex = parseInt(sessionStorage.getItem('partIndex'));
            if (!partIndex) partIndex = 1;
            sessionStorage.setItem('part' + partIndex, item.innerHTML);

            setTimeout(function () {
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
}

function setInterlude() {
    [...questionChildren, ...responseChildren, button].forEach((item) => {
        item.animate(fade(false), option(0.5, 0.2))
    });
    setTimeout(function () {
        area.setSection('question', 'answer');
        setAnswer();
    }, 0.7 * 1000);
}

