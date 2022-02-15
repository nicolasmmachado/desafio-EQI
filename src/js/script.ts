async function loadSimulation() {
    let teste = await fetch("http://localhost:3000");
    let testeJson = await teste.json();
}