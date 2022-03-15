export {randomize, sendEmail};

String.prototype.removeSection = function () {
    document.querySelector(`#${this}Script`).remove();
    document.querySelector(`#${this}Style`).remove();
}

String.prototype.appendSection = function () {
    let script = document.createElement('script');
    script.id = `${this}Script`;
    script.src = `javascript/${this}Script.js`;
    script.type = 'module';

    let style = document.createElement('link');
    style.id = `${this}Style`;
    style.href = `stylesheet/${this}Style.css`;
    style.rel = 'stylesheet';

    document.body.append(script, style);
}

Object.prototype.setSection = function (name0, name1) {
    this.remove();
    let script0 = document.querySelector(`#${name0}Script`);
    let script1 = document.querySelector(`#${name1}Script`);
    if (script0) name0.removeSection();
    if (!script1) name1.appendSection();
}

'opening'.appendSection();

Object.prototype.setRatio = function () {
    let width = Math.min(screen.width, screen.height);
    let height = Math.max(screen.width, screen.height);

    //alert([screen.width, screen.height, outerWidth, outerHeight]);
    window.scroll(0, 0);
    height < 900
        ? this.style.minHeight = height * 85 / 100 + 'px'
        : this.style.minHeight = width * 85 / 100 + 'px';
    width < 450
        ? this.style.maxWidth = width + 'px'
        : this.style.maxWidth = '450px';
    let widthRatio = width >= 1080
        ? 1
        : width > 450
            ? width / 450 * 0.7
            : width / 450;
    this.style.padding = height * 5 / 100 + 'px 0';
    this.style.transform = `scale(${widthRatio})`;

    // if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    // }
}

Array.prototype.setVisibility = function (type) {
    this.forEach((item) => item.setVisibility(type));
}

Object.prototype.setVisibility = function (type) {
    if (type === true) {
        this.style.opacity = '1';
        this.style.visibility = 'visible';
    } else {
        this.style.opacity = '0';
        this.style.visibility = 'hidden';
    }
}

Array.prototype.setAppearance = function () {
    this.forEach((item) => item.setAppearance());
}

Object.prototype.setAppearance = function () {
    this.style.height = '0';
    this.style.padding = '0';
}

Array.prototype.addClass = function (name) {
    this.forEach((item) => item.classList.add(name));
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (data) {
            return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
        }
    );
}

String.prototype.deAccent = function () {
    return this.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\d\w]/g, '')
        .replace(/đ/ig, 'd')
        .replaceAll(' ', '')
        .toLowerCase();
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
            let t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
                n(e)
            })
        })
    }, ajaxPost: function (e, n, t) {
        let a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
            let e = a.responseText;
            null != t && t(e)
        }, a.send(n)
    }, ajax: function (e, n) {
        let t = Email.createCORSRequest("GET", e);
        t.onload = function () {
            let e = t.responseText;
            null != n && n(e)
        }, t.send()
    }, createCORSRequest: function (e, n) {
        let t = new XMLHttpRequest;
        return "withCredentials" in t
            ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
    }
};

function sendEmail(emailReceiver, emailSubject, emailBody) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'tangkinhcacdaidao@gmail.com',
        Password: 'fyvqhyflpfyjospa',
        From: 'Tàng Kinh Các Đại Đạo <tangkinhcacdaidao@gmail.com>',
        To: emailReceiver,
        Subject: emailSubject,
        Body: emailBody,
    }).then(function () {
        console.log(`Email '${emailSubject}' đã gửi thành công.`);
    }).catch(function (error) {
        console.log(error.message);
    });
}