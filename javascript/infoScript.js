import {
    appendObject,
    removeObject,
    setVisibility,
    randomize,
    sendEmail,
    toTitleCase,
    setSize
} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, slideOut, zoomIn} from "./animationScript.js";
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
    signIn: `Tài khoản <span>đã tồn tại,</span><br>
        quý huynh tỷ vui lòng điền<br>mật khẩu để <span>đăng nhập.</span>`,
    wrongPassword: `Mật khẩu <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightPassword: `Mật khẩu <span>chính xác,</span><br>
        quý huynh tỷ có thể <span>đăng nhập</span><br>để tham gia chương trình.`,
    signUp: `<span>Mã xác thực</span> đã gửi qua <span>email,</span><br>
        quý huynh tỷ vui lòng sử dụng<br>để <span>xác thực</span> tài khoản.`,
    wrongOTP: `Mã xác thực <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightOTP: `Tài khoản <span>đã xác thực,</span><br>
        quý đạo hữu vui lòng điền <span>mật khẩu</span><br>để tiếp tục việc đăng ký.`,
    identify: `Quý huynh tỷ vui lòng điền<br><span>quý danh</span> và <span>sinh nhật</span><br>
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

let otp = document.createElement('div');
otp.className = 'otp';
for (let i = 0; i < 4; i++) {
    let child = document.createElement('input');
    child.inputMode = 'numeric';
    child.maxLength = 1;
    otp.append(child);
}

let button = document.createElement('button');
button.className = 'button';
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
board.className = 'board';
board.append(email, password, otp, name, birthday, buttonBox);

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array.normal;

let area = document.createElement('div');
area.append(title, board, message);
document.body.append(area);
setVisibility([...title.children, board, ...board.children, message], false);
setSize(area, 45, -10);

setTimeout(function () {
    title.children[0].animate(fadeIn(), options(0.5));
    title.children[1].animate(fadeIn(), options(0.5, 0.4));
    board.animate(fadeIn(), options(0.5, 0.6, 'ease-in'));
    email.animate(slideIn(-40, 0), options(0.5, 0.6, 'ease-in'));
    password.animate(slideIn(-40, 0), options(0.5, 0.8, 'ease-in'));
    buttonBox.animate(slideIn(-40, 0), options(0.5, 1, 'ease-in'));
    message.animate(fadeIn(), options(0.5, 1.2));
}, 0.1 * 1000);

email.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
}

email.onfocus = function () {
    this.classList.remove('signIn', 'signUp');
    password.value = '';
    password.classList.remove('signIn', 'signUp');
    password.style.pointerEvents = 'none';

    sessionStorage.setItem('section', 'normal');
    message.innerHTML = navigator.onLine
        ? array.normal
        : array.offline;
    setOTP(false);
    setButton(false);
}

email.onblur = function () {
    password.style.pointerEvents = 'visible';
    this.value = email.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();
    if (this.value) checkEmail();
}

password.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
}

password.onfocus = function () {
    this.classList.remove('signIn', 'signUp');
    email.style.pointerEvents = 'none';

    if (!email.value) email.focus();
    if (email.classList.length === 1) {
        this.blur();
        if (email.value) checkEmail();
    }
    if (navigator.onLine) {
        message.innerHTML = sessionStorage.getItem('finalOTP') === 'rightOTP'
            ? array.rightOTP
            : array[sessionStorage.getItem('section')];
    } else {
        message.innerHTML = array.offline;
    }
    setButton(false);
}

password.onblur = function () {
    email.style.pointerEvents = 'visible';
    if (this.value) checkPassword();
}

for (let i = 0; i < otp.children.length; i++) {
    getChild(i).oninput = function () {
        getChild(i).value = getChild(i).value.replace(/[^\d]/g, '');
        if (getChild(i).value) {
            i < 3 ? getChild(i + 1).focus() : getChild(i).blur();
        }
    }

    getChild(i).onclick = function () {
        for (let j = 0; j < otp.children.length; j++) {
            getChild(0).focus();
            getChild(j).value = '';
        }
    }

    getChild(i).onblur = function () {
        checkOTP();
    }
}

name.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) this.blur();
}

name.onfocus = function () {
    this.classList.remove('signUp');
    setButton(false);
}

name.onblur = function () {
    this.value = toTitleCase(this.value
        .replace(/\s+/g, ' ')
        .replace(/[\d`~!@#$%^&*()+=\-_/\\|.,<>?:;'"]/g, '')
        .trim());

    if (this.value) {
        setTimeout(function () {
            name.classList.add('signUp');
            if (birthday.classList.length > 1) setButton(true);
        }, 0.25 * 1000);
    }
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

    if (this.value.match(/^\d{2}$/)) {
        this.value = this.value + '-';
    } else if (this.value.match(/^\d{2}-\d{2}$/)) {
        this.value = this.value + '-';
    }
}

birthday.onfocus = function () {
    this.classList.remove('signUp');
    setButton(false);
}

birthday.onblur = function () {
    if (this.value) {
        if (this.value.length !== 10) {
            this.setCustomValidity('Sinh nhật theo cấu trúc dd-mm-yyyy.');
            this.reportValidity();
        } else {
            let array = this.value.split('-');
            if (parseInt(array[0]) > 31 || parseInt(array[1]) > 12
                || parseInt(array[2]) > 1900 && parseInt(array[2]) > new Date().getFullYear()) {
                this.setCustomValidity('Sinh nhật không hợp lệ.');
                this.reportValidity();
            } else {
                setTimeout(function () {
                    birthday.classList.add('signUp');
                    if (name.classList.length > 1) setButton(true);
                }, 0.25 * 1000);
            }
        }
    }
}

function checkEmail() {
    if (!email.value.match(/\S+@\S+\.\S+/)) {
        email.setCustomValidity('Email theo cấu trúc aa@bb.cc');
        email.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(email.value));
        get(queryRef).then(
            function (data) {
                let section;
                if (data.val()) {
                    section = 'signIn';
                } else {
                    section = 'signUp';
                    createOTP();
                }
                sessionStorage.setItem('section', section);
                email.classList.add(section);
                message.innerHTML = array[section];
                setButton(false);
            }).catch(function () {
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
                    password.classList.add('signIn');
                    password.classList.remove('signUp');
                    message.innerHTML = array.rightPassword;
                    setButton(true);
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                } else {
                    message.innerHTML = array.wrongPassword;
                    navigator.vibrate(500);
                }
            } else {
                setTimeout(function () {
                    password.classList.add('signUp');
                    password.classList.remove('signIn');
                    setButton(true);
                }, 0.25 * 1000);
            }
        }).catch(function () {
            message.innerHTML = array.offline;
        })
    }
}

function createOTP() {
    let userOTP = randomize(1000, 9999);
    console.log(userOTP);
    let emailBody = `<br>Mến chào quý đạo hữu.<br>Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>
                    <h1>${userOTP}<br></h1>
                    Quý đạo hữu vui lòng sử dụng mã số này để xác thực tài khoản.<br>Xin trân trọng cảm ơn.`;
    emailBody = '<span style="font-size: 16px">' + emailBody + '</span>';
    sendEmail(email.value, 'Mã xác thực tài khoản', emailBody);
    setOTP(true);
    sessionStorage.setItem('userOTP', userOTP);
}

function checkOTP() {
    let userOTP = sessionStorage.getItem('userOTP');
    let finalOTP = '';
    for (let j = 0; j < otp.children.length; j++) {
        finalOTP += getChild(j).value;
    }

    if (finalOTP.length === otp.children.length) {
        if (finalOTP !== userOTP) {
            message.innerHTML = array.wrongOTP;
            navigator.vibrate(500);
        } else {
            setTimeout(function () {
                setOTP(false);
                message.innerHTML = array.rightOTP;
                sessionStorage.setItem('finalOTP', 'rightOTP');
            }, 0.25 * 1000);
        }
    }
}

function setOTP(type) {
    setVisibility(otp, type);
    sessionStorage.removeItem('finalOTP');
    if (type === true)
        for (let j = 0; j < otp.children.length; j++) {
            getChild(j).value = '';
        }
}

function getChild(index) {
    return otp.children[index];
}

function setButton(type) {
    button.innerHTML = sessionStorage.getItem('section')
        .replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('signUp', 'Tiếp tục')
        .replace('identify', 'Đăng ký');

    if (type === true) {
        button.classList.add('active');
        button.style.pointerEvents = 'visible';
        button.onclick = function () {
            button.style.pointerEvents = 'none';
            switch (sessionStorage.getItem('section')) {
                case 'signUp':
                    sessionStorage.setItem('section', 'identify');
                    message.innerHTML = array.identify;
                    setButton(false);

                    email.animate(slideOut(40, 0), options(0.5, 0, 'ease-in'));
                    name.animate(slideIn(-40, 0), options(0.5, 0.3, 'ease-in'));
                    password.animate(slideOut(40, 0), options(0.5, 0, 'ease-in'));
                    birthday.animate(slideIn(-40, 0), options(0.5, 0.3, 'ease-in'));
                    break;
                case 'identify':
                    updateUserData();
                    break;
                case 'signIn':
                    interlude();
                    break;
            }
        }
    } else {
        button.classList.remove('active');
        button.style.pointerEvents = 'none';
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
            userBirthday: birthday.value
        }
        update(child(userRef, userID), userData).then(function () {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            interlude();
        }).catch(function () {
            message.innerHTML = array.offline;
        });
    }).catch(function () {
        message.innerHTML = array.offline;
    })
}

function interlude() {
    area.animate(fadeOut(), options(0.5)).onfinish = function () {
        appendObject('welcome');
        removeObject(area, 'info');
    };
}