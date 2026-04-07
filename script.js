/////////////////////////////////////////////////////
// Mock data iniziale o caricamento da localStorage
/////////////////////////////////////////////////////

let annunci = JSON.parse(localStorage.getItem("annunci")) || [
    "🎉 Benvenuto nella community TheGalaxyHub!",
    "🚀 Server Discord aggiornato!"
];

let comunicazioni = JSON.parse(localStorage.getItem("comunicazioni")) || [
    "📢 Comunicazione ufficiale: nuova regola server!"
];

let team = JSON.parse(localStorage.getItem("team")) || [
    {nome: "Admin", ruolo: "Founder"},
    {nome: "Mod1", ruolo: "Moderatore"}
];

let candidature = JSON.parse(localStorage.getItem("candidature")) || [];
let unbanRequests = JSON.parse(localStorage.getItem("unbanRequests")) || [];

/////////////////////////////////////////////////////
// Helper per salvare tutto su localStorage
/////////////////////////////////////////////////////

function salvaDati() {
    localStorage.setItem("annunci", JSON.stringify(annunci));
    localStorage.setItem("comunicazioni", JSON.stringify(comunicazioni));
    localStorage.setItem("team", JSON.stringify(team));
    localStorage.setItem("candidature", JSON.stringify(candidature));
    localStorage.setItem("unbanRequests", JSON.stringify(unbanRequests));
}

/////////////////////////////////////////////////////
// Popolamento Home e Annunci
/////////////////////////////////////////////////////

function popolaAnnunci() {
    const list = document.getElementById("annunci-list") || document.getElementById("latest-annunci");
    if(list){
        list.innerHTML = "";
        annunci.forEach((a,i)=>{
            const li = document.createElement("li");
            li.textContent = a;
            list.appendChild(li);
        });
    }
}

function popolaComunicazioni() {
    const list = document.getElementById("comunicazioni-list");
    if(list){
        list.innerHTML = "";
        comunicazioni.forEach((c,i)=>{
            const li = document.createElement("li");
            li.textContent = c;
            list.appendChild(li);
        });
    }
}

function popolaTeam() {
    const list = document.getElementById("team-list");
    if(list){
        list.innerHTML = "";
        team.forEach((m,i)=>{
            const li = document.createElement("li");
            li.textContent = `${m.nome} - ${m.ruolo}`;
            list.appendChild(li);
        });
    }
}

function popolaCandidature() {
    const list = document.getElementById("candidature-list");
    if(list){
        list.innerHTML = "";
        candidature.forEach((c,i)=>{
            const li = document.createElement("li");
            li.innerHTML = `
            ${c.nome} (${c.email}) - "${c.motivo}"
            <button onclick="approvaCandidatura(${i})">✅ Accetta</button>
            <button onclick="rifiutaCandidatura(${i})">❌ Rifiuta</button>`;
            list.appendChild(li);
        });
    }
}

function popolaUnban() {
    const list = document.getElementById("unban-list");
    if(list){
        list.innerHTML = "";
        unbanRequests.forEach((r,i)=>{
            const li = document.createElement("li");
            li.innerHTML = `
            ${r.username} (${r.email}) - "${r.motivo}"
            <button onclick="approvaUnban(${i})">✅ Accetta</button>
            <button onclick="rifiutaUnban(${i})">❌ Rifiuta</button>`;
            list.appendChild(li);
        });
    }
}

/////////////////////////////////////////////////////
// Admin Login
/////////////////////////////////////////////////////

function loginAdmin(email,password){
    if(email === "support@thegalaxyhub" && password === "thegalaxyhubstaff"){
        alert("Login Admin Riuscito!");
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-section").style.display = "block";
        aggiornaAdmin();
    } else {
        alert("Email o password errata!");
    }
}

/////////////////////////////////////////////////////
// Admin Actions
/////////////////////////////////////////////////////

function aggiungiAnnuncio(){
    const text = prompt("Testo dell'annuncio:");
    if(text) {
        annunci.push(text);
        salvaDati();
        popolaAnnunci();
        aggiornaAdmin();
    }
}

function aggiungiComunicazione(){
    const text = prompt("Testo comunicazione:");
    if(text){
        comunicazioni.push(text);
        salvaDati();
        popolaComunicazioni();
        aggiornaAdmin();
    }
}

function aggiungiTeam(){
    const nome = prompt("Nome membro:");
    const ruolo = prompt("Ruolo:");
    if(nome && ruolo){
        team.push({nome, ruolo});
        salvaDati();
        popolaTeam();
        aggiornaAdmin();
    }
}

function rimuoviTeam(index){
    if(confirm(`Rimuovere ${team[index].nome}?`)){
        team.splice(index,1);
        salvaDati();
        popolaTeam();
        aggiornaAdmin();
    }
}

function approvaCandidatura(index){
    alert(`Candidatura di ${candidature[index].nome} approvata!`);
    candidature.splice(index,1);
    salvaDati();
    popolaCandidature();
}

function rifiutaCandidatura(index){
    alert(`Candidatura di ${candidature[index].nome} rifiutata!`);
    candidature.splice(index,1);
    salvaDati();
    popolaCandidature();
}

function approvaUnban(index){
    alert(`Richiesta unban di ${unbanRequests[index].username} approvata!`);
    unbanRequests.splice(index,1);
    salvaDati();
    popolaUnban();
}

function rifiutaUnban(index){
    alert(`Richiesta unban di ${unbanRequests[index].username} rifiutata!`);
    unbanRequests.splice(index,1);
    salvaDati();
    popolaUnban();
}

/////////////////////////////////////////////////////
// Admin Update Display
/////////////////////////////////////////////////////

function aggiornaAdmin(){
    popolaAnnunci();
    popolaComunicazioni();
    popolaTeam();
    popolaCandidature();
    popolaUnban();
}

/////////////////////////////////////////////////////
// Gestione Form Candidature / Unban dal sito
/////////////////////////////////////////////////////

const candidatureForm = document.getElementById("candidature-form");
if(candidatureForm){
    candidatureForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const nome = e.target[0].value;
        const email = e.target[1].value;
        const motivo = e.target[2].value;
        candidature.push({nome,email,motivo});
        salvaDati();
        alert("Candidatura inviata!");
        e.target.reset();
    });
}

const unbanForm = document.getElementById("unban-form");
if(unbanForm){
    unbanForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const motivo = e.target[2].value;
        unbanRequests.push({username,email,motivo});
        salvaDati();
        alert("Richiesta unban inviata!");
        e.target.reset();
    });
}

/////////////////////////////////////////////////////
// Popolamento automatico pagine
/////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded",()=>{
    popolaAnnunci();
    popolaComunicazioni();
    popolaTeam();
    popolaCandidature();
    popolaUnban();
});