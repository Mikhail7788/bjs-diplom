'use strict';
const user = new UserForm();
user.loginFormCallback = logFunc => { 
    ApiConnector.login(logFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setLoginErrorMessage(back.logFunc);
        }
    });
}

user.registerFormCallback = logFunc => {
    ApiConnector.login(logFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setRegisterErrorMessage(back.logFunc);
        }
    });
}