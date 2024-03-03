let tg = window.Telegram.WebApp;

tg.MainButton.show();

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData("Hi!");
});
