import {appendSection, removeSection, randomize, sendEmail} from "./baseScript.js";
import {option, fade, slide} from "./animationScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase,
    get,
    update,
    ref,
    query,
    child,
    orderByChild,
    equalTo,
    limitToFirst
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let app = initializeApp({
        databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
    }),
    userDatabase = getDatabase(app),
    userRef = ref(userDatabase);

// const app2 = initializeApp({
//     databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }, 'app2');
// const scoreDatabase = getDatabase(app2);

let array = {
    normal: `Quý huynh tỷ vui lòng<br><span>đăng nhập</span> hoặc <span>đăng ký</span><br>để tham gia chương trình.`,
    signIn: `Tài khoản <span>đã tồn tại,</span> quý<br>
        huynh tỷ vui lòng điền <span>mật khẩu</span><br>để đăng nhập tài khoản.`,
    wrongPassword: `Mật khẩu <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightPassword: `Mật khẩu <span>chính xác,</span><br>
        quý huynh tỷ vui lòng <span>đăng nhập</span><br>để tham gia chương trình.`,
    verify: `<span>Mã xác thực</span> đã gửi qua <span>email,</span><br>
        quý huynh tỷ vui lòng sử dụng<br>để <span>đăng ký</span> tài khoản.`,
    wrongOTP: `Mã xác thực <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightOTP: `Tài khoản <span>đã xác thực,</span> quý<br>
        huynh tỷ vui lòng điền <span>mật khẩu</span><br>để tiếp tục việc đăng ký.`,
    signUp: `Quý huynh tỷ vui lòng điền<br><span>quý danh</span> và <span>sinh nhật</span><br>
        để hoàn thành việc đăng ký.`,
    offline: `Kết nối mạng <span>bị gián đoạn,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>hệ thống mạng.`
};

let title = document.createElement('div');
title.className = 'title';
title.innerHTML = '<p>Tàng Kinh Các</p><p>Đại Đạo</p>';

let email = document.createElement('input');
email.className = 'email';
email.inputMode = 'email';
email.placeholder = 'Email';

let password = document.createElement('input');
password.className = 'password';
password.type = 'password';
password.placeholder = 'Mật khẩu';

let OTP = document.createElement('div');
OTP.className = 'OTP';
for (let i = 0; i < 4; i++) {
    let child = document.createElement('input');
    child.inputMode = 'numeric';
    child.maxLength = 1;
    OTP.append(child);
}
let OTPChildren = [...OTP.children];

let button = document.createElement('button');
button.className = 'button0';
button.innerHTML = 'Đăng nhập/Đăng ký';

let buttonBox = document.createElement('div');
buttonBox.className = 'buttonBox';
buttonBox.append(button);

let name = document.createElement('input');
name.className = 'name';
name.placeholder = 'Quý danh';

let birthday = document.createElement('input');
birthday.className = 'birthday';
birthday.inputMode = 'numeric';
birthday.placeholder = 'dd-mm-yyyy';
birthday.maxLength = 10;

let board = document.createElement('div');
board.className = 'board0';
board.append(email, password, OTP, name, birthday, buttonBox);

let message = document.createElement('div');
message.className = 'message0';
message.innerHTML = array.normal;

let area = document.createElement('div');
area.append(title, board, message);
area.setRatio(45, -10);
[...title.children, board, ...board.children, message].setVisibility(false);
document.body.append(area);
sessionStorage.setItem('section', 'normal');

setTimeout(function () {
    title.children[0].animate(fade(), option(0.5));
    title.children[1].animate(fade(), option(0.5, 0.4));
    board.animate(fade(), option(0.5, 0.6, 'ease-in'));
    email.animate(slide(-40, 0), option(0.5, 0.6, 'ease-in'));
    password.animate(slide(-40, 0), option(0.5, 0.8, 'ease-in'));
    buttonBox.animate(slide(-40, 0), option(0.5, 1, 'ease-in'));
    message.animate(fade(), option(0.5, 1.2));
}, 4 * 1000);

email.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
};

email.onfocus = function () {
    this.classList.remove('green', 'blue');
    password.style.pointerEvents = 'none';
    password.value = '';
    password.classList.remove('green', 'blue');

    sessionStorage.setItem('section', 'normal');
    message.innerHTML = array.normal;
    setOTP(false);
    setButton(false);
};

email.onblur = function () {
    password.style.pointerEvents = 'visible';
    this.value = this.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();
    if (this.value) checkEmail();
};

password.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
};

password.onfocus = function () {
    email.style.pointerEvents = 'none';
    this.classList.remove('green', 'blue');

    if (!email.value) email.focus();
    if (email.classList.length === 1) {
        this.blur();
        if (email.value) checkEmail();
    }

    let section = sessionStorage.getItem('section');
    message.innerHTML = array[section];
    if (section === 'verify' && sessionStorage.getItem(email.value) === 'rightOTP')
        message.innerHTML = array.rightOTP;
    setButton(false);
};

password.onblur = function () {
    email.style.pointerEvents = 'visible';
    if (this.value) checkPassword();
};

OTPChildren.forEach(function (item, index) {
    item.oninput = function () {
        item.value = item.value.replace(/[^\d]/g, '');
        if (item.value) {
            index < 3
                ? OTPChildren[index + 1].focus()
                : item.blur();
        }
    }
    item.onpaste = function (event) {
        let clipboardData = event.clipboardData || window.clipboardData;
        OTPChildren.forEach((item, index) => item.value = clipboardData.getData('Text')
            .slice(0, 4)[index]);
    }
    item.onkeydown = function (event) {
        if (['Backspace', 'Delete'].includes(event.key)) clearOTP();
    }
    item.onclick = clearOTP;
    item.onblur = checkOTP;
});

name.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) this.blur();
}

name.onfocus = function () {
    birthday.style.pointerEvents = 'none';
    this.classList.remove('blue');
    setButton(false);
}

name.onblur = function () {
    birthday.style.pointerEvents = 'visible';
    this.value = this.value
        .replace(/\s+/g, ' ')
        .replace(/[`~!@#$%^&*()+=\-_/\\|.,<>?:;'"]/g, '')
        .trim()
        .toTitleCase();
    if (this.value) checkName();
}

birthday.onkeydown = function (event) {
    this.setCustomValidity('');
    event.target.selectionStart = this.value.length + 1;
    if (['Enter', 'Return'].includes(event.key)) this.blur();
}

birthday.oninput = function (event) {
    this.value = this.value
        .replace(/[^\d-]/g, '')
        .replace(/-+/g, '-');

    if (event.inputType === 'deleteContentBackward') this.value = '';
    if (this.value.match(/^\d{2}$/)) this.value += '-';
    if (this.value.match(/^\d{2}-\d{2}$/)) this.value += '-';
}

birthday.onfocus = function () {
    name.style.pointerEvents = 'none';
    this.classList.remove('blue');
    setButton(false);
}

birthday.onblur = function () {
    name.style.pointerEvents = 'visible';
    if (this.value) checkBirthday();
}

function checkEmail() {
    if (!email.value.match(/\S+@\S+\.\S+/)) {
        email.setCustomValidity('Email theo cấu trúc aaa@bbb.ccc');
        email.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(email.value));
        get(queryRef).then(function (data) {
                let section = data.val()
                    ? 'signIn'
                    : 'verify';

                sessionStorage.setItem('section', section);
                email.classList.add(section.replace('signIn', 'green')
                    .replace('signUp', 'blue')
                    .replace('verify', 'blue')
                    .replace('rightOTP', 'blue'));
                message.innerHTML = array[section];
                setButton(false);
                if (section === 'verify') setOTP(true);
            }
        ).catch(function (error) {
            console.log(error);
            message.innerHTML = array.offline;
        })
    }
}

function checkPassword() {
    if (password.value.length < 8) {
        password.setCustomValidity('Mật khẩu tối thiểu 8 ký tự.');
        password.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(email.value));
        get(queryRef).then(function (data) {
            if (data.val()) {
                let userData = Object.entries(data.val())[0][1];
                if (password.value === userData['userPassword']) {
                    password.classList.add('green');
                    password.classList.remove('blue');
                    message.innerHTML = array.rightPassword;
                    setButton(true);
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                } else {
                    message.innerHTML = array.wrongPassword;
                    navigator.vibrate(500);
                }
            } else {
                setTimeout(function () {
                    password.classList.add('blue');
                    password.classList.remove('green');
                    setButton(true);
                }, 0.25 * 1000);
            }
        }).catch(function (error) {
            console.log(error);
            message.innerHTML = array.offline;
        })
    }
}

function setOTP(type) {
    if (type === true) {
        let userOTP = sessionStorage.getItem(email.value);
        if (!userOTP) {
            OTP.setVisibility(true);
            userOTP = randomize(1000, 9999);
            sessionStorage.setItem(email.value, userOTP);
            sendEmail(email.value, 'Mã xác thực tài khoản',
                `<span style="font-size: 16px">
                   <br>Mến chào quý huynh tỷ.<br>
                   Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>
                   <h1>${userOTP}<br></h1>
                   Quý huynh tỷ vui lòng sử dụng mã số này để đăng ký tài khoản.<br>
                   Xin trân trọng cảm ơn.
                   </span>`);
        } else if (userOTP !== 'rightOTP') {
            OTP.setVisibility(true);
            for (let item of OTPChildren) item.value = '';
        } else {
            OTP.setVisibility(false);
            message.innerHTML = array.rightOTP;
        }
    } else {
        OTP.setVisibility(false);
    }
}

function checkOTP() {
    let userOTP = sessionStorage.getItem(email.value);
    let inputOTP = '';
    for (let item of OTPChildren) inputOTP += item.value;

    if (inputOTP.length === OTPChildren.length) {
        if (inputOTP !== userOTP) {
            message.innerHTML = array.wrongOTP;
            navigator.vibrate(500);
        } else {
            setOTP(false);
            message.innerHTML = array.rightOTP;
            sessionStorage.setItem(email.value, 'rightOTP');
        }
    }
}

function clearOTP() {
    for (let item of OTPChildren) {
        OTPChildren[0].focus();
        item.value = '';
    }
}

function checkName() {
    let queryRef = query(userRef, orderByChild('userAlias'),
        equalTo(name.value.replaceAll(' ', '').toLowerCase()));
    get(queryRef).then(function (data) {
            if (data.val()) {
                name.setCustomValidity('Quý danh đã tồn tại.');
                name.reportValidity();
            } else {
                setTimeout(function () {
                    name.classList.add('blue');
                    if (birthday.classList.length > 1) setButton(true);
                }, 0.25 * 1000);
            }
        }
    ).catch(function (error) {
        console.log(error);
        message.innerHTML = array.offline;
    })
}

function checkBirthday() {
    if (birthday.value.length !== 10) {
        birthday.setCustomValidity('Sinh nhật theo cấu trúc dd-mm-yyyy.');
        birthday.reportValidity();
    } else {
        let array = birthday.value.split('-');
        if (parseInt(array[0]) > 31 || parseInt(array[1]) > 12
            || parseInt(array[2]) > 1900 && parseInt(array[2]) > new Date().getFullYear()) {
            birthday.setCustomValidity('Sinh nhật không hợp lệ.');
            birthday.reportValidity();
        } else {
            setTimeout(function () {
                birthday.classList.add('blue');
                if (name.classList.length > 1) setButton(true);
            }, 0.25 * 1000);
        }
    }
}

function setButton(type) {
    button.innerHTML = sessionStorage.getItem('section')
        .replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('verify', 'Tiếp tục')
        .replace('signUp', 'Đăng ký');

    if (type === true) {
        button.classList.add('active');
        button.onclick = function () {
            button.onclick = null;
            switch (sessionStorage.getItem('section')) {
                case 'verify':
                    sessionStorage.setItem('section', 'signUp');
                    message.innerHTML = array.signUp;
                    setButton(false);

                    email.animate(slide(40, 0, false), option(0.5, 0, 'ease-in'));
                    password.animate(slide(40, 0, false), option(0.5, 0, 'ease-in'));
                    name.animate(slide(-40, 0), option(0.5, 0.3, 'ease-in'));
                    birthday.animate(slide(-40, 0), option(0.5, 0.3, 'ease-in'));
                    break;
                case 'signUp':
                    updateUserData();
                    break;
                case 'signIn':
                    setInterlude();
                    break;
            }
        }
    } else {
        button.classList.remove('active');
        button.onclick = null;
    }
}

function updateUserData() {
    get(userRef).then(function (data) {
        let userID = `user${data.size}`;
        let userData = {
            userID: userID,
            userEmail: email.value,
            userPassword: password.value,
            userName: name.value,
            userAlias: name.value.replaceAll(' ', '').toLowerCase(),
            userBirthday: birthday.value
        }
        update(child(userRef, userID), userData).then(function () {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            sendEmail(email.value, 'Thông tin tài khoản chính thức',
                `<span style="font-size: 16px">
                   <br>Xin chúc mừng <b>${name.value}.</b><br>
                   Đây là tài khoản thứ ${userID.replace('user', '')}
                   đăng ký thành công tại Tàng Kinh Các Đại Đạo.<br>
                   <br>
                   <b>Email:</b> ${email.value}<br>
                   <b>Password:</b> ${password.value}<br>
                   <br>
                   Quý huynh tỷ vui lòng lưu lại thông tin này để sử dụng khi cần thiết.<br>
                   Xin trân trọng cảm ơn.
                   </span>`);
            setInterlude();
        });
    }).catch(function (error) {
        console.log(error);
        message.innerHTML = array.offline;
    })
}

function setInterlude() {
    appendSection('welcome');
    area.animate(fade(false), option(0.5)).onfinish = function () {
        removeSection(area, 'info');
    };
}