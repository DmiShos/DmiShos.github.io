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
const testPortfolioCompany3 = {
    companyName: "Geek For Geek",
    shareMax: 20000,
    shareCurrent: 20000,
};
const testPortfolioCompany4 = {
    companyName: "Test1",
    shareMax: 20000,
    shareCurrent: 20000,
};
const testPortfolioCompany5 = {
    companyName: "Test2",
    shareMax: 20000,
    shareCurrent: 20000,
};
const testCompanies = [testCompany1, testCompany2, testCompany3, testCompany4];
const testPortfolio = [testPortfolioCompany1, testPortfolioCompany2, testPortfolioCompany3, testPortfolioCompany4, testPortfolioCompany5];

const mainButtons = document.getElementById("mainbuttons");
const pageButtons = document.getElementById("pagebuttons");

const companyList = document.getElementById("companylist");
const portfolioList = document.getElementById("portfoliolist");

const companyCreation = document.getElementById("companycreation");
const sendRequestButton = companyCreation.querySelector("button");
const imageSelector = document.getElementById("imageselector");

const notes = document.getElementsByClassName("note");
const noteOverlay = document.getElementById("noteoverlay");

let currentCompanies = []
let currentPortfolio = []
let currentCompanyPageInitIndex = 0
let currentPortfolioPageInitIndex = 0
let currentScreen = "main"

tg.BackButton.show();
tg.SettingsButton.show();
hideCompanyList();
hidePortfolioList();
setCurrentCompanyPage();
setCurrentPortfolioPage();

addEventListener("click", (event) => {
    hideNoteOverlay()
});

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

        case "company creation":
            currentScreen = "main";
            hideCompanyCreation();
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

        case 2:
            element.addEventListener("click", showCompanyCreation);
            break;

        default:
            break;
    };
};

for (let index = 0; index < notes.length; index++) {
    const note = notes[index];
    note.addEventListener("click", function () {
        setTimeout(function () {
            showNoteOverlay(note.getElementsByClassName("notetext").item(0).innerHTML)
        }, 0.01);
    });
};

pageButtons.children.item(0).addEventListener("click", function () {
    switch (currentScreen) {
        case "market":
            changeCompanyPage(-1);
            break;

        case "portfolio":
            changePortfolioPage(-1);
            break;

        default:
            break;
    };
});

pageButtons.children.item(1).addEventListener("click", function () {
    switch (currentScreen) {
        case "market":
            changeCompanyPage(1);
            break;

        case "portfolio":
            changePortfolioPage(1);
            break;

        default:
            break;
    };
});

imageSelector.addEventListener("change", () => {
    const file = imageSelector.files[0]
    var parts = file.name.split('.');
    const ext = parts[parts.length - 1];
    if (ext.toLowerCase() != "png") {
        tg.showAlert("File is not png")
        return
    }
    console.log(file)
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function () {
        companyCreation.querySelector("img").src = fileReader.result
    });
    fileReader.readAsDataURL(file);
});

sendRequestButton.addEventListener("click", () => {
    const regex = /^[a-zA-Z]+$/

    const comapnyName = document.getElementById("name").value;
    const comapnyDescription = document.getElementById("description").value;
    const productName = document.getElementById("productname").value;
    const productCost = document.getElementById("productcost").value;
    const maxShares = document.getElementById("maxshares").value;

    if (comapnyName.length > 20) {
        tg.showAlert("Name should be not longer than 20 symbols");
        return;
    };
    if (comapnyName.length == 0) {
        tg.showAlert("Name should be longer than 0 symbols");
        return;
    };
    if (regex.test(comapnyName) == false) {
        tg.showAlert("Name should contain only english characters");
        return;
    };
    if (comapnyDescription.length > 100) {
        tg.showAlert("Description should be not longer than 100 symbols");
        return;
    };
    if (comapnyDescription.length = 0) {
        tg.showAlert("Description should be longer than 0 symbols");
        return;
    };
    if (regex.test(comapnyDescription) == false) {
        tg.showAlert("Description should contain only english characters");
        return;
    };
    if (productName.length > 100) {
        tg.showAlert("Product name should be not longer than 100 symbols");
        return;
    };
    if (productName.length == 0) {
        tg.showAlert("Product name should be longer than 0 symbols");
        return;
    };
    if (regex.test(productName) == false) {
        tg.showAlert("Product name should contain only english characters");
        return;
    };
    for (let i = 0; i < productCost.length; i++) {
        var ascii = productCost.charCodeAt(i);
        if (ascii < 48 || ascii > 57) {
            tg.showAlert("Product cost should contain only digits");
            return;
        };
    };
    if (productCost.length > 7) {
        tg.showAlert("Product cost should be not longer than 7 symbols");
        return;
    };
    if (productCost == 0) {
        tg.showAlert("Product cost should be more than 0");
        return;
    };
    for (let i = 0; i < maxShares.length; i++) {
        var ascii = maxShares.charCodeAt(i);
        if (ascii < 48 || ascii > 57) {
            tg.showAlert("Max number of shares should contain only digits");
            return;
        };
    };
    if (maxShares.length > 7) {
        tg.showAlert("Max number of shares should be not longer than 7 symbols");
        return;
    };
    if (maxShares == 0) {
        tg.showAlert("Max number of shares should be more than 0");
        return;
    };

    const request = {
        comapnyName: comapnyName,
        comapnyDescription: comapnyDescription,
        productName: productName,
        productCost: parseInt(productCost),
        maxShares: parseInt(maxShares),
    };
    tg.sendData(JSON.stringify(request));
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
    } else if (newCurrentCompanyPageInitIndex < testCompanies.length) {
        currentCompanyPageInitIndex = newCurrentCompanyPageInitIndex
    };
    setCurrentCompanyPage();
    hideCompanyList();
    showCompanyList();
};

function setCurrentPortfolioPage() {
    /* Temporary solution */

    const newCurrentPortfolio = []
    let currentCompanyIndex = currentPortfolioPageInitIndex
    for (let index = 0; index < portfolioList.children.length; index++) {
        const currentCompany = testPortfolio[currentCompanyIndex];
        if (typeof (currentCompany) == "object") {
            newCurrentPortfolio.push(currentCompany);
            currentCompanyIndex++
        } else {
            break;
        }
    };

    if (newCurrentPortfolio.length > 0) {
        currentPortfolio = newCurrentPortfolio
    };
};

function changePortfolioPage(delta) {
    const newCurrentPortfolioPageInitIndex = delta * portfolioList.children.length + currentPortfolioPageInitIndex
    if (newCurrentPortfolioPageInitIndex < 0) {
        currentPortfolioPageInitIndex = 0
    } else if (newCurrentPortfolioPageInitIndex < testPortfolio.length) {
        currentPortfolioPageInitIndex = newCurrentPortfolioPageInitIndex
    };
    setCurrentPortfolioPage();
    hidePortfolioList();
    showPortfolioList();
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

function showNoteOverlay(text) {
    noteOverlay.style.display = "block"
    noteOverlay.children.item(0).innerHTML = text
};

function hideNoteOverlay(text) {
    noteOverlay.style.display = "none"
    noteOverlay.children.item(0).innerHTML = ""
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
    hide(pageButtons);
    for (let index = 0; index < companyList.children.length; index++) {
        const element = companyList.children.item(index);
        element.children.item(0).innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function showPortfolioList() {
    hideMainMenu();
    currentScreen = "portfolio"
    for (let index = 0; index < currentPortfolio.length; index++) {
        const element = portfolioList.children.item(index);
        const currentCompany = currentPortfolio[index];

        const firstElement = element.children.item(0);
        firstElement.style.borderBottomWidth = "2px"
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

        const firstElement = element.children.item(0);
        firstElement.style.borderBottomWidth = "0px"
        firstElement.innerHTML = "";
        element.children.item(1).innerHTML = "";
    };
};

function showCompanyCreation() {
    hideMainButtons();
    currentScreen = "company creation"
    show(companyCreation)
};

function hideCompanyCreation() {
    hide(companyCreation)
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
