/**
 * 登录
 */
var username =  document.querySelector('#username'),
    password =  document.querySelector('#password');
    
username.addEventListener('focus',function(){
    this.parentNode.children[0].classList.add('focus-bgc');
});
username.addEventListener('blur',function(){
    this.parentNode.children[0].classList.remove('focus-bgc');
});
password.addEventListener('focus',function(){
    this.parentNode.children[0].classList.add('focus-bgc');
});
password.addEventListener('blur',function(){
    this.parentNode.children[0].classList.remove('focus-bgc');
});

document.querySelector('.login-form').addEventListener('submit',function(e){
    var usernameCheck = username.value === '' || null;
    var passwordCheck = password.value === '' || null;
    if(usernameCheck || passwordCheck){
        document.querySelector('.msg-error').style.display = 'block';
        document.querySelector('.msg-content').innerHTML = '请输入账户名或密码';
    }else{
        var usernameParam = username.value;
        var passwordParam = password.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST','../php/login.php',false);
        xhr.send({
            username: username,
            password: password
        });
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = xhr.responseText;
                // data = JSON.parse(data);
                console.log(data);
            }
        };
    }
    e.preventDefault();
});