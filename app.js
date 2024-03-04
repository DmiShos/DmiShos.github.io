const tg = window.Telegram.WebApp;

const context = document.createElement("canvas").getContext("2d");

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

const testPortfolioCompany1 = {
    companyName: "Durger King",
    shareMax: 100,
    shareCurrent: 20,
};
const testPortfolioCompany2 = {
    companyName: "Bulochka",
    shareMax: 1000,
    shareCurrent: 350,
};
const portfolio = [testPortfolioCompany1, testPortfolioCompany2];

const mainButtons = document.getElementById("mainbuttons");
const companyList = document.getElementById("companylist");
const portfolioList = document.getElementById("portfoliolist");

let currentScreen = "main";

tg.BackButton.show();
tg.SettingsButton.show();

hideCompanyList();
hidePortfolioList();

tg.onEvent("backButtonClicked", function() {
    switch (currentScreen) {
        case "main":
            tg.close()
            break;

        case "market":
            currentScreen = "main"
            hideCompanyList()
            showMainButtons()
            break;
    
        case "portfolio":
            currentScreen = "main"
            hidePortfolioList()
            showMainButtons()
            break;

        default:
            break;
    }
});

for (let index = 0; index < mainButtons.children.length; index++) {
    const element = mainButtons.children.item(index);

    switch (index) {
        case 0:
            element.addEventListener("click", showCompanyList);
            break;

        case 1:
            element.addEventListener("click", showPortfolioList);
            break;
    
        default:
            break;
    };
};

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

function showCompanyList(element) {
    hideMainMenu(element);
    for (let index = 0; index < companies.length; index++) {
        const element = companyList.children.item(index);
        const currentCompany = companies[index];
        element.children.item(0).innerHTML = currentCompany.companyName;
        element.children.item(1).innerHTML = currentCompany.companyDecsription;
    };
    show(companyList);
};

function hideCompanyList() {
    hide(companyList);
    for (let index = 0; index < companyList.children.length; index++) {
        const element = companyList.children.item(index);
        element.children.item(0).innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function showPortfolioList(element) {
    hideMainMenu(element);
    for (let index = 0; index < portfolio.length; index++) {
        const element = portfolioList.children.item(index);
        const currentCompany = portfolio[index];

        const firstElement = element.children.item(0)

        firstElement.innerHTML = currentCompany.companyName;
        element.children.item(1).innerHTML = currentCompany.shareCurrent + "/" + currentCompany.shareMax;
    };
    show(portfolioList);
};

function hidePortfolioList() {
    hide(portfolioList);
    for (let index = 0; index < portfolioList.children.length; index++) {
        const element = portfolioList.children.item(index);
        element.children.item(0).innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function hideMainMenu(element) {
    currentScreen = element.id;
    tg.expand();
    hideMainButtons();
};

function hide(element) {
    element.style.display = "none";
};

function show(element) {
    element.style.display = "block";
};
