async function loadPage() {
    let loadPage = await fetch("http://localhost:3000/indicadores", { 
        method: "GET"
    });
    let loadPageJson = await loadPage.json();
    document.querySelector(".income-ipca").value = `${loadPageJson[1].valor}%`;
    document.querySelector(".contribution-cdi").value = `${loadPageJson[0].valor}%`;
}

loadPage();

const brute = document.querySelector(".brute-btn");
const liquid = document.querySelector(".liquid-btn");
const pre = document.querySelector(".pre-btn");
const pos = document.querySelector(".pos-btn");
const fixed = document.querySelector(".fixed-btn");
const hide = document.querySelectorAll(".hide");
const incomeInput = document.querySelector(".income-input");
const incomeTime = document.querySelector(".income-time");
const contributionInput = document.querySelector(".contribution-input");
const contributionProf = document.querySelector(".contribution-profitability");
const hr = document.querySelectorAll("hr");
const label = document.querySelectorAll("label");
const simulate = document.querySelector(".simulate-btn");
let income = "";
let contribution = "";

brute.addEventListener("click", () => {
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    hide[1].classList.add("hide");
    brute.classList.add("checked");
    hide[0].classList.remove("hide");
    income = "bruto";
});

liquid.addEventListener("click", () => {
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    hide[0].classList.add("hide");
    liquid.classList.add("checked");
    hide[1].classList.remove("hide");
    income = "liquido"
});

incomeInput.addEventListener("keyup", () => {
    let testNum = Number(incomeInput.value);

    if(isNaN(testNum)) {
        incomeInput.previousSibling.classList.add("warning");
        label[1].classList.add("warning");
        hr[0].classList.add("warning");
        hide[2].classList.remove("hide");
    }
    else{
        incomeInput.previousSibling.classList.remove("warning");
        label[1].classList.remove("warning");
        hr[0].classList.remove("warning");
        hide[2].classList.add("hide");
    }
});

incomeTime.addEventListener("keyup", () => {
    let testNum = Number(incomeTime.value);

    if(isNaN(testNum)) {
        label[2].classList.add("warning");
        hide[3].classList.remove("hide");
    }
    else{
        label[2].classList.remove("warning");
        hide[3].classList.add("hide");
    }
});

pre.addEventListener("click", () => {
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    hide[5].classList.add("hide");
    hide[6].classList.add("hide");
    pre.classList.add("checked");
    hide[4].classList.remove("hide");
    contribution = "pre";
})

pos.addEventListener("click", () =>{
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    hide[4].classList.add("hide");
    hide[6].classList.add("hide");
    pos.classList.add("checked");
    hide[5].classList.remove("hide");
    contribution = "pos";
});

fixed.addEventListener("click", () =>{
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    hide[4].classList.add("hide");
    hide[5].classList.add("hide");
    fixed.classList.add("checked");
    hide[6].classList.remove("hide");
    contribution = "ipca";
});

contributionInput.addEventListener("keyup", () => {
    
    let testNum = Number(contributionInput.value);

    if(isNaN(testNum)) {
        contributionInput.previousSibling.classList.add("warning");
        label[5].classList.add("warning");
        hr[1].classList.add("warning");
        hide[7].classList.remove("hide");
    }
    else{
        contributionInput.previousSibling.classList.remove("warning");
        label[5].classList.remove("warning");
        hr[1].classList.remove("warning");
        hide[7].classList.add("hide");
    }
});

contributionProf.addEventListener("keyup", () => {
    let testNum = Number(contributionProf.value);

    if(isNaN(testNum)) {
        label[6].classList.add("warning");
        hide[8].classList.remove("hide");
    }
    else{
        label[6].classList.remove("warning");
        hide[8].classList.add("hide");
    }
});

document.querySelector(".clear-btn").addEventListener("click", () => {
    incomeInput.value = "";
    incomeTime.value = "";
    contributionInput.value = "";
    contributionProf.value = "";
    incomeInput.previousSibling.classList.remove("warning");
    label[1].classList.remove("warning");
    hr[0].classList.remove("warning");
    hide[2].classList.add("hide");
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    contributionInput.previousSibling.classList.remove("warning");
    label[5].classList.remove("warning");
    hr[1].classList.remove("warning");
    hide[7].classList.add("hide");
    label[6].classList.remove("warning");
    hide[8].classList.add("hide");
    label[2].classList.remove("warning");
    hide[3].classList.add("hide");
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    hide[0].classList.add("hide");
    hide[1].classList.add("hide");
    hide[4].classList.add("hide");
    hide[5].classList.add("hide");
    hide[6].classList.add("hide");
    document.querySelector(".information").classList.add("hide");
});

simulate.addEventListener("click", loadSimulation);

async function loadSimulation(){
    if((brute.classList.contains("checked") || liquid.classList.contains("checked")) && (pre.classList.contains("checked") || pos.classList.contains("checked") || fixed.classList.contains("checked"))){
        
        let loadSimulation = await fetch(`http://localhost:3000/simulacoes?tipoIndexacao=${contribution}&tipoRendimento=${income}`, { 
        method: "GET"
        });
        let loadSimulationJson = await loadSimulation.json();
        const info = document.querySelectorAll(".info p");
        console.log(loadSimulationJson);
        console.log(info);
        info[0].innerHTML = "R$ " + loadSimulationJson[0].valorFinalBruto;
        info[1].innerHTML = loadSimulationJson[0].aliquotaIR + "%";
        info[2].innerHTML = "R$ " + loadSimulationJson[0].valorPagoIR;
        info[3].innerHTML = "R$" + loadSimulationJson[0].valorFinalLiquido;
        info[4].innerHTML = "R$ " + loadSimulationJson[0].valorTotalInvestido;
        info[5].innerHTML = "R$ " + loadSimulationJson[0].ganhoLiquido;
        document.querySelector(".information").classList.remove("hide");

    }
    else{
        alert("Favor escolher o Rendimento e Indexação.")
    }
}