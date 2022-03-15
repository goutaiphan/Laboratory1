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

let toolbar = document.createElement('div');
toolbar.className = 'toolbar';
toolbar.innerHTML = '<div></div><button>Xác nhận</button>';
let toolbarChildren = toolbar.children,
    clock = toolbarChildren[0],
    button = toolbarChildren[1];

let area = document.createElement('div');
area.append(question, response, toolbar);

setQuestion();

function setQuestion() {
    setContent();
    setAnimation();
}

function setContent() {
    let part = parseInt(sessionStorage.getItem('part')),
        contentArray = JSON.parse(sessionStorage.getItem('contentArray'))[part - 1];

    questionChildren[0].innerHTML = `Câu ${part}`;
    questionChildren[1].innerHTML = contentArray.question
        .replace(/Câu \d: /g, '')
        .replaceAll('\n', '<br>');

    [...responseChildren].forEach((item, index) => {
        item.innerHTML = contentArray.response
            .split('\n')[index]
            .replace(/\w\. /g, '');
        if ([3, 5].includes(part)) item.style.height = '95px';
        else item.style.height = '60px';
    });
    setResponse(false);
    setButton(false);
    setClock(false);

    document.body.append(area);
    document.body.setRatio();
    [...questionChildren, ...responseChildren, ...toolbarChildren].setVisibility(false);
}

function setAnimation() {
    questionChildren[0].animate(fade(), option(0.5));
    questionChildren[1].animate(fade(), option(0.5, 0.5));
    for (let i = 0; i < responseChildren.length; i++) {
        responseChildren[i].animate(slide(-40, 0), option(0.5, 1 + 0.3 * i));
    }
    clock.animate(zoom(1.1, 1), option(0.5, 1 + 1.4))
        .onfinish = () => setClock();
    button.animate(zoom(1.1, 1), option(0.5, 1 + 1.4))
        .onfinish = () => setResponse();
}

function setResponse(type = true) {
    [...responseChildren].forEach((item) => {
        if (type === true) {
            item.style.cursor = 'pointer';
            item.onclick = () => {
                item.classList.toggle('active');
                let quantity = [...responseChildren].reduce(function (total, item) {
                    if (item.classList.length !== 0) total += 1;
                    return total;
                }, 0);
                quantity > 0
                    ? setButton()
                    : setButton(false);
            }
        } else {
            item.onclick = null;
            item.style.cursor = 'default';
            item.classList.remove('active');
        }
    });
}

function setButton(type = true) {
    if (type === true) {
        button.classList.add('active');
        button.style.cursor = 'pointer';
        button.onclick = () => {
            button.onclick = null;
            button.animate(pump(0.95),
                option(0.2, 0, 'linear', 'alternate', 2));
            setInterlude();
        };
    } else {
        button.style.cursor = 'default';
        button.onclick = null;
        button.classList.remove('active');
    }
}

function setClock(type = true) {
    if (type === true) {
        let second = 60;
        let job = setInterval(function () {
            second -= 1;
            clock.innerHTML = second < 10
                ? `00:0${second}`
                : `00:${second}`;
            if (second === 0) {
                setActivity(second);
                setInterlude();
            }
            if (document.activeElement === button && button.classList.length !== 0) {
                clearInterval(job);
                setActivity(second);
            }
        }, 1000);
    } else {
        clock.innerHTML = '01:00';
    }
}

function setActivity(second) {
    let part = parseInt(sessionStorage.getItem('part'));
    let responseArray = [...responseChildren].reduce((total, item) => {
        if (item.classList.length !== 0) total.push(item.innerHTML.replaceAll('<br>', ' '));
        return total;
    }, []);
    sessionStorage.setItem('response' + part, JSON.stringify(responseArray));
    sessionStorage.setItem('clock' + part, second.toString());
}

function setInterlude() {
    [...questionChildren, ...responseChildren, ...toolbarChildren].forEach((item) => {
        item.animate(fade(false), option(0.5, 0.2))
    });
    setTimeout(function () {
        area.setSection('question', 'answer');
        setAnswer();
    }, 0.7 * 1000);
}

