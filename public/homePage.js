'use strict';
//Деавторизация
const logOut = new LogoutButton();
logOut.action = () => ApiConnector.logout(back => {
    if (back.success) {
        location.reload();
    }
});

//Получение current profile
ApiConnector.current(back => {
    if (back.success) {
        ProfileWidget.showProfile(back.data);
    }
});

//Получение курсов валюты
const dataBoard = new RatesBoard();
const coursesBack = () => ApiConnector.getStocks(back => {
    if (back.success) {
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
    if (back.success) {
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
   if (back.success) {
       ProfileWidget.showProfile(back.data);
       cashOperation.setMessage(false, 'Перевод выполнен!');
   } else {
       cashOperation.setMessage(true, back.data);
   }
});

//Работа с избранным
const workingFavorites = new FavoritesWidget();
ApiConnector.getFavorites(back => {
    if (back.success) {
        workingFavorites.clearTable();
        workingFavorites.fillTable(back.data);
        cashOperation.updateUsersList(back.data);
    }
});

workingFavorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, back => {
    if (back.success) {
        workingFavorites.clearTable();
        workingFavorites.fillTable(back.data);
        cashOperation.updateUsersList(back.data);
        workingFavorites.setMessage(false, `Пользователь ${data.name} добавлен`);
    } else {
        workingFavorites.setMessage(true, back.data);
    }
});

workingFavorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, back => {
    if (back.success) {
        workingFavorites.clearTable();
        workingFavorites.fillTable(back.data);
        cashOperation.updateUsersList(back.data);
        workingFavorites.setMessage(false, 'Пользователь удален');
    } else {
        workingFavorites.setMessage(true, back.data);
    }
});