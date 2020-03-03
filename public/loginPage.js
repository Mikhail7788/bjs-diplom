'use strict';
const user = new UserForm();
user.loginFormCallback = logFunc => { 
    ApiConnector.login(logFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setLoginErrorMessage(back.data);
        }
    });
}

user.registerFormCallback = regFunc => {
    ApiConnector.register(regFunc, back => {
        if (back.success) {
            location.reload();
        } else {
            user.setRegisterErrorMessage(back.data);
        }
    });
}