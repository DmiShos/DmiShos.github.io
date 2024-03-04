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
const testCompany4 = {
    companyName: "Geek For Geek",
    companyDecsription: "Use your brain ;)",
};
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
const testCompanies = [testCompany1, testCompany2, testCompany3, testCompany4];
const portfolio = [testPortfolioCompany1, testPortfolioCompany2];

const mainButtons = document.getElementById("mainbuttons");
const pageButtons = document.getElementById("pagebuttons");
const companyList = document.getElementById("companylist");
const portfolioList = document.getElementById("portfoliolist");

let currentCompanies = []
let currentScreen = "main";
let currentCompanyPageInitIndex = 0

tg.BackButton.show();
tg.SettingsButton.show();
hideCompanyList();
hidePortfolioList();
setCurrentCompanyPage(0)

tg.onEvent("backButtonClicked", function () {
    switch (currentScreen) {
        case "main":
            tg.close();
            break;

        case "market":
            currentScreen = "main";
            hideCompanyList();
            showMainButtons();
            break;

        case "portfolio":
            currentScreen = "main";
            hidePortfolioList();
            showMainButtons();
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

pageButtons.children.item(0).addEventListener("click", function () {
    changeCompanyPage(-1);
});
pageButtons.children.item(1).addEventListener("click", function () {
    changeCompanyPage(1);
});

function setCurrentCompanyPage() {
    /* Temporary solution */

    const newCurrentCompanies = []
    let currentCompanyIndex = currentCompanyPageInitIndex
    for (let index = 0; index < companyList.children.length; index++) {
        const currentCompany = testCompanies[currentCompanyIndex];
        if (typeof (currentCompany) == "object") {
            newCurrentCompanies.push(currentCompany);
            currentCompanyIndex++
        } else {
            break;
        }
    };

    if (newCurrentCompanies.length > 0) {
        currentCompanies = newCurrentCompanies
    };
};

function changeCompanyPage(delta) {
    const newCurrentCompanyPageInitIndex = delta * companyList.children.length + currentCompanyPageInitIndex
    if (newCurrentCompanyPageInitIndex < 0) {
        currentCompanyPageInitIndex = 0
    } else if(newCurrentCompanyPageInitIndex < testCompanies.length) {
        currentCompanyPageInitIndex = newCurrentCompanyPageInitIndex
    };
    setCurrentCompanyPage()
    hideCompanyList()
    showCompanyList()
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

function showCompanyList() {
    hideMainMenu();
    currentScreen = "market";
    for (let index = 0; index < currentCompanies.length; index++) {
        const element = companyList.children.item(index);
        const currentCompany = currentCompanies[index];
        element.children.item(0).innerHTML = currentCompany.companyName;
        element.children.item(1).innerHTML = currentCompany.companyDecsription;
    };
    show(companyList);
    show(pageButtons);
};

function hideCompanyList() {
    hide(companyList);
    for (let index = 0; index < companyList.children.length; index++) {
        const element = companyList.children.item(index);
        element.children.item(0).innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function showPortfolioList() {
    hideMainMenu();
    currentScreen = "portfolio";
    for (let index = 0; index < portfolio.length; index++) {
        const element = portfolioList.children.item(index);
        const currentCompany = portfolio[index];

        const firstElement = element.children.item(0);

        firstElement.innerHTML = currentCompany.companyName;
        element.children.item(1).innerHTML = currentCompany.shareCurrent + "/" + currentCompany.shareMax;
    };
    show(portfolioList);
    show(pageButtons);
};

function hidePortfolioList() {
    hide(portfolioList);
    hide(pageButtons);
    for (let index = 0; index < portfolioList.children.length; index++) {
        const element = portfolioList.children.item(index);
        element.children.item(0).innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function hideMainMenu() {
    tg.expand();
    hideMainButtons();
};

function hide(element) {
    element.style.display = "none";
};

function show(element) {
    element.style.display = "block";
};
