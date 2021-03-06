/**
 * 注册
 */
var selector = document.querySelector.bind(document);

var registerForm = selector('.register-form'),
    accountErrorTip = selector('#account_error'),
    passwordErrorTip = selector('#password_error'),
    affirmPasswordErrorTip = selector('#affirm_password_error'),
    phoneNoErrorTip = selector('#phone_number_error'),
    emailErrorTip = selector('#email_error'),
    validateCodeErrorTip = selector('#validate_code_error');

// 注册失去焦点事件
selector('#account').addEventListener('blur', blurUser.bind(selector('#form_item_account')));
selector('#password').addEventListener('blur', blurPwd.bind(selector('#form_item_password')));
selector('#affirm_password').addEventListener('blur', blurAffirmPwd.bind(selector('#form_item_affirm_password')));
selector('#phone_number').addEventListener('blur', blurPhone.bind(selector('#form_item_phone')));
selector('#email').addEventListener('blur', blurEmail.bind(selector('#form_item_email')));
selector('#validate_code').addEventListener('blur', blurValidateCode.bind(selector('#form_item_validate_code')));
selector('.validate-code').addEventListener('click', function () {
    this.innerHTML = getValidateCode();
});
registerForm.addEventListener('submit', function (e) {
    if (checkResult()) {
        console.log('发送请求');
        // $.ajax({});
    }
    e.preventDefault();
});
// 用户名
function blurUser() {
    var reg = /^[a-zA-Z0-9_-]{4,16}$/;
    var valueInput = document.querySelector('#account').value;
    if (valueInput == '' || valueInput == null || valueInput.length == 0) {
        this.classList.add('border-err');
        accountErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (valueInput.length < 4 || valueInput.length > 20) {
        this.classList.add('border-err');
        accountErrorTip.innerHTML = '用户名长度为4 - 20个字符';
        return false;
    } else if (!reg.test(valueInput)) {
        this.classList.add('border-err');
        accountErrorTip.innerHTML = '用户名为字母和数字组合';
        return false;
    } else {
        this.classList.remove('border-err');
        accountErrorTip.innerHTML = '';
        /*$.ajax({
            url: '...',
            data: {username: valueInput},
            success: function(data){
                if(...){
                    errorTip.innerHTML = '该用户名已被注册过,请更换';
                    ...
                }
            }
        });*/
        return true;
    }
}

// 密码
function blurPwd() {
    var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    var regNumber = /[^\d]/g;
    var regLetter = /[^a-zA-Z]/g;
    var valueInput = selector('#password').value;
    if (valueInput == '' || valueInput == null || valueInput.length == 0) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (sameLetter(valueInput) === valueInput.length) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '密码为相同字符,请重新输入';
        return false;
    } else if (valueInput.length < 6 || valueInput.length > 20) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '密码长度为6 - 20';
        return false;
    } else if (!regNumber.test(valueInput)) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '密码不能为纯数字';
        return false;
    } else if (!regLetter.test(valueInput)) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '密码不能为纯字母';
        return false;
    } else if (reg.test(valueInput)) {
        this.classList.add('border-err');
        passwordErrorTip.innerHTML = '请输入符合要求的密码';
        return false;
    } else {
        this.classList.remove('border-err');
        passwordErrorTip.innerHTML = '';
        return true;
    }
}

// 确认密码
function blurAffirmPwd() {
    var valuePwd = selector('#password').value,
        valueAffirmPwd = selector('#affirm_password').value;
    if (valueAffirmPwd == '' || valueAffirmPwd == null) {
        this.classList.add('border-err');
        affirmPasswordErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (valuePwd !== valueAffirmPwd) {
        this.classList.add('border-err');
        affirmPasswordErrorTip.innerHTML = '密码不一致，请重新输入';
        return false;
    } else {
        this.classList.remove('border-err');
        affirmPasswordErrorTip.innerHTML = '';
        return true;
    }
}

// 手机号
function blurPhone() {
    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var valueInput = selector('#phone_number').value;
    if (valueInput == '' || valueInput == null) {
        this.classList.add('border-err');
        phoneNoErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (!reg.test(valueInput)) {
        this.classList.add('border-err');
        phoneNoErrorTip.innerHTML = '请输入符合要求的电话号码';
        return false;
    } else {
        this.classList.remove('border-err');
        phoneNoErrorTip.innerHTML = '';
        return true;
    }
}

// 邮箱
function blurEmail() {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var valueInput = selector('#email').value;
    if (valueInput == '' || valueInput == null) {
        this.classList.add('border-err');
        emailErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (!reg.test(valueInput)) {
        this.classList.add('border-err');
        emailErrorTip.innerHTML = '输入错误,请输入正确格式的邮箱';
        return false;
    } else {
        this.classList.remove('border-err');
        emailErrorTip.innerHTML = '';
        return true;
    }
}

// 验证码
function blurValidateCode() {
    var valueInput = document.querySelector('#validate_code').value;
    if (valueInput == '' || valueInput == null) {
        this.classList.add('border-err');
        validateCodeErrorTip.innerHTML = '输入不能为空';
        return false;
    } else if (valueInput != document.querySelector('.validate-code').innerHTML) {
        this.classList.add('border-err');
        validateCodeErrorTip.innerHTML = '验证码不正确';
        return false;
    } else {
        this.classList.remove('border-err');
        validateCodeErrorTip.innerHTML = '';
        return true;
    }
}

function checkResult() {
    if (blurUser.call(selector('#form_item_account')) &&
        blurPwd.call(selector('#form_item_password')) &&
        blurAffirmPwd.call(selector('#form_item_affirm_password')) &&
        blurPhone.call(selector('#form_item_phone')) &&
        blurEmail.call(selector('#form_item_email')) &&
        blurValidateCode.call(selector('#form_item_validate_code'))) {
        return true;
    } else {
        return false;
    }
}

function sameLetter(value) {
    var result = 0;
    var firstLetter = value[0];
    for (var i = 1; i < value.length; i++) {
        if (value.charAt(i) === firstLetter) {
            result++;
        }
    }
    return result;
}

// 获取随机码
function getValidateCode() {
    var code = '';
    for (var i = 0; i < 6; i++) {
        code = code + parseInt(Math.random() * 10).toString();
    }
    return code;
}