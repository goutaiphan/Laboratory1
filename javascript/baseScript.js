export {
    appendObject, removeObject, setSize, setVisibility, setAppearance,
    deAccent, toTitleCase, randomize, sendEmail
};

function appendObject(name) {
    let script = document.createElement('script');
    script.id = `${name}Script`;
    script.src = `javascript/${name}Script.js`;
    script.type = 'module';

    let style = document.createElement('link');
    style.id = `${name}Style`;
    style.href = `stylesheet/${name}Style.css`;
    style.rel = 'stylesheet';

    document.body.append(script, style);
}

function removeObject(object, name) {
    object.remove();
    document.getElementById(`${name}Script`).remove();
    document.getElementById(`${name}Style`).remove();
}

function setSize(object, marginDesktop, marginMobile) {
    let width = Math.min(screen.width, screen.height);
    let height = Math.max(screen.width, screen.height);
    let widthRatio = width / 450;
    let heightRatio = height / 850;

    //alert(screen.width + '/' + screen.height + ',' + outerWidth + '/' + outerHeight);

    window.scroll(0, 0);
    height < 600
        ? document.body.style.maxHeight = height + 'px'
        : document.body.style.minHeight = '90vh';

    if (width < 1080) {
        if (width > 450) widthRatio = widthRatio * 0.7;
        if (height > 800) object.style.marginTop = marginMobile * heightRatio + 'px';
    } else {
        widthRatio = 1;
        object.style.marginTop = marginDesktop + 'px';
    }
    object.style.transform = `scale(${widthRatio})`;
    object.style.minWidth = 'max-content';

    // if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    // }
}

function setVisibility(object, type) {
    if (Array.isArray(object)) {
        object.forEach(function (item) {
            process(item);
        })
    } else {
        process(object);
    }

    function process(object) {
        if (type === true) {
            object.style.opacity = '1';
            object.style.visibility = 'visible';
        } else {
            object.style.opacity = '0';
            object.style.visibility = 'hidden';
        }
    }
}

function setAppearance(object) {
    if (Array.isArray(object)) {
        object.forEach(function (item) {
            process(item);
        })
    } else {
        process(object);
    }

    function process(object) {
        object.style.height = '0';
        object.style.padding = '0';
    }
}

function toTitleCase(string) {
    return string.replace(/\w\S*/g, function (data) {
            return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
        }
    );
}

function deAccent(string) {
    return string.normalize('NFD')
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
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
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