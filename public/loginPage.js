'use strict';
const user = new UserForm();
user.loginFormCallback = logFunc => { 
    ApiConnector.login(logFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setLoginErrorMessage(back.data);
        }
        console.log(back); // объект возвращаемый колбеком при выполнении запроса к серверу при попытке авторизации
    });
}

user.registerFormCallback = regFunc => {
    ApiConnector.register(regFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setRegisterErrorMessage(back.data);
        }
        console.log(back); // объект возвращаемый колбеком при выполнении запроса к серверу при попытке регистрации
    });
}