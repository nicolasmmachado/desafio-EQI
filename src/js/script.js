async = () => {
    let loadPage = await fetch("http://localhost:3000/indicadores", { 
        method: "GET"
    });
    let loadPageJson = await loadPage.json();
    document.querySelector(".income-ipca").value = `${loadPageJson[0].valor}%`;
    document.querySelector(".contribution-cdi").value = `${loadPageJson[1].valor}%`;
    let loadSimulation = await fetch("http://localhost:3000/simulacoes", { 
        method: "GET"
    });
    let loadSimulationJson = await loadSimulation.json();
    console.log(loadSimulationJson);
}

const brute = document.querySelector(".brute-btn");
const liquid = document.querySelector(".liquid-btn");
const pre = document.querySelector(".pre-btn");
const pos = document.querySelector(".pos-btn");
const fixed = document.querySelector(".fixed-btn");
const show = document.querySelectorAll(".show");
const incomeInput = document.querySelector(".income-input");
const incomeTime = document.querySelector(".income-time");
const contributionInput = document.querySelector(".contribution-input");
const contributionProf = document.querySelector(".contribution-profitability");
const hr = document.querySelectorAll("hr");
const label = document.querySelectorAll("label");

brute.addEventListener("click", () => {
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    show[1].classList.add("show");
    brute.classList.add("checked");
    show[0].classList.remove("show");
});

liquid.addEventListener("click", () => {
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    show[0].classList.add("show");
    liquid.classList.add("checked");
    show[1].classList.remove("show");
});

incomeInput.addEventListener("keyup", () => {
    let testNum = Number(incomeInput.value);

    if(isNaN(testNum)) {
        incomeInput.previousSibling.classList.add("warning");
        label[1].classList.add("warning");
        hr[0].classList.add("warning");
        show[2].classList.remove("show");
        show[2].classList.add("warning");
    }
    else{
        incomeInput.previousSibling.classList.remove("warning");
        label[1].classList.remove("warning");
        hr[0].classList.remove("warning");
        show[2].classList.add("show");
        show[2].classList.remove("warning");
    }
});

incomeTime.addEventListener("keyup", () => {
    let testNum = Number(incomeTime.value);

    if(isNaN(testNum)) {
        label[2].classList.add("warning");
        show[3].classList.remove("show");
        show[3].classList.add("warning");
    }
    else{
        label[2].classList.remove("warning");
        show[3].classList.add("show");
        show[3].classList.remove("warning");
    }
});

pre.addEventListener("click", () => {
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    show[5].classList.add("show");
    show[6].classList.add("show");
    pre.classList.add("checked");
    show[4].classList.remove("show");
})

pos.addEventListener("click", () =>{
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    show[4].classList.add("show");
    show[6].classList.add("show");
    pos.classList.add("checked");
    show[5].classList.remove("show");
});

fixed.addEventListener("click", () =>{
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    show[4].classList.add("show");
    show[5].classList.add("show");
    fixed.classList.add("checked");
    show[6].classList.remove("show");
});

contributionInput.addEventListener("keyup", () => {
    
    let testNum = Number(contributionInput.value);

    if(isNaN(testNum)) {
        contributionInput.previousSibling.classList.add("warning");
        label[5].classList.add("warning");
        hr[1].classList.add("warning");
        show[7].classList.remove("show");
        show[7].classList.add("warning");
    }
    else{
        contributionInput.previousSibling.classList.remove("warning");
        label[5].classList.remove("warning");
        hr[1].classList.remove("warning");
        show[7].classList.add("show");
        show[7].classList.remove("warning");
    }
});

contributionProf.addEventListener("keyup", () => {
    let testNum = Number(contributionProf.value);

    if(isNaN(testNum)) {
        label[6].classList.add("warning");
        show[8].classList.remove("show");
        show[8].classList.add("warning");
    }
    else{
        label[6].classList.remove("warning");
        show[8].classList.add("show");
        show[8].classList.remove("warning");
    }
});

document.querySelector(".clear-btn").addEventListener("click", () => {
    incomeInput.value = "";
    incomeTime.value = "";
    contributionInput.value = "";
    contributionProf.value = "";
    brute.classList.remove("checked");
    liquid.classList.remove("checked");
    pre.classList.remove("checked");
    pos.classList.remove("checked");
    fixed.classList.remove("checked");
    show[0].classList.add("show");
    show[1].classList.add("show");
    show[4].classList.add("show");
    show[5].classList.add("show");
    show[6].classList.add("show");
});