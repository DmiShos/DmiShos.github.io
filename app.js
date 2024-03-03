const tg = window.Telegram.WebApp;

tg.BackButton.show();
tg.SettingsButton.show();

const testCompany1 = {
    companyName: "Durger King",
    companyDecsription: "Fun Fun Fun!!!",
};
const testCompany2 = {
    companyName: "Bulochka",
    companyDecsription: "Wanna eat",
};
const testCompany3 = {
    companyName: "Mac Fried",
    companyDecsription: "Let's cook some shit!",
};
const companies = [testCompany1, testCompany2, testCompany3];

const mainButtons = document.getElementById("mainbuttons");
const companyList = document.getElementById("companylist");
hide(companyList);

let currentScreen = "main"

tg.onEvent("backButtonClicked", function() {
    switch (currentScreen) {
        case "main":
            tg.close()
            break;

        case "market":
            currentScreen = "main"
            hide(companyList)
            showMainButtons()
            break;
    
        default:
            break;
    }
});

mainButtons.children.item(0).addEventListener("click", function() {
    currentScreen = "market"

    tg.expand()

    hideMainButtons()
    for (let index = 0; index < companyList.children.length; index++) {
        const element = companyList.children.item(index);
        const currentCompany = companies[index];
        element.children.item(0).innerHTML = currentCompany.companyName;
        element.children.item(1).innerHTML = currentCompany.companyDecsription;
    };
    show(companyList);
});

function showMainButtons() {
    for (let index = 0; index < mainButtons.children.length; index++) {
        const element = mainButtons.children.item(index);
        show(element);
    };
};

function hideMainButtons() {
    for (let index = 0; index < mainButtons.children.length; index++) {
        const element = mainButtons.children.item(index);
        hide(element);
    };
};

function hide(element) {
    element.style.display = "none";
};

function show(element) {
    element.style.display = "block";
};
