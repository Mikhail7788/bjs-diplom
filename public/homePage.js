'use strict';
//Деавторизация
const logOut = new LogoutButton();
logOut.action = () => ApiConnector.logout(back => {
    if (back.success) {
        location.reload();
    }
});

//Получение current
ApiConnector.current(back => {
    if (back.success) {
        ProfileWidget.showProfile(back.data);
    }   console.log(back);
});

//Получение курсов валюты
const dataBoard = new RatesBoard();
const coursesBack = () => ApiConnector.getStocks(back => {
    if(back.success) {
        dataBoard.clearTable();
        dataBoard.fillTable(back.data);
    } 
});

coursesBack();

//Задаем интервал на обновление курсов
setInterval(coursesBack, 60000);

//Пополнение баланса
const cashOperation = new MoneyManager();
cashOperation.addMoneyCallback = (data) => ApiConnector.addMoney(data, back => {
    if(back.success) {
        ProfileWidget.showProfile(back.data);
        cashOperation.setMessage(false, 'Счет успешно пополнен');    
    } else {
        cashOperation.setMessage(true, back.data);
    }
});

//Конвертация валюты
cashOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, back => {
    if (back.success) {
        ProfileWidget.showProfile(back.data);
        cashOperation.setMessage(false, 'Конвертация валюты прошла успешно');
    } else {
        cashOperation.setMessage(true, back.data);
    }
});

//Перевод валюты
cashOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, back => {
   if(back.success) {
       ProfileWidget.showProfile(back.data);
       cashOperation.setMessage(false, 'Перевод выполнен!');
   } else {
       cashOperation.setMessage(true, back.data);
   }
});