// LOGIN
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('login-msg');

  const validEmail = "support@thegalaxyhub";
  const validPassword = "thegalaxyhubstaff";

  if (email === validEmail && password === validPassword) {
    localStorage.setItem('isAdmin', 'true');
    window.location.href = "dashboard.html";
  } else {
    msg.textContent = "Email o password errata!";
    msg.style.color = "red";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem('isAdmin');
  window.location.href = "login.html";
}

// CONTROLLO ACCESSO DASHBOARD
if (window.location.pathname.endsWith('dashboard.html')) {
  if (localStorage.getItem('isAdmin') !== 'true') {
    alert("Devi loggarti come admin!");
    window.location.href = "login.html";
  }
}

// DATI INIZIALI
let annunci = JSON.parse(localStorage.getItem("annunci")) || [];
let comunicazioni = JSON.parse(localStorage.getItem("comunicazioni")) || [];
let team = JSON.parse(localStorage.getItem("team")) || [{ nome: "Admin", ruolo: "Founder" }];
let candidature = JSON.parse(localStorage.getItem("candidature")) || [];
let unbanRequests = JSON.parse(localStorage.getItem("unbanRequests")) || [];

// SALVA DATI
function salvaDati() {
  localStorage.setItem("annunci", JSON.stringify(annunci));
  localStorage.setItem("comunicazioni", JSON.stringify(comunicazioni));
  localStorage.setItem("team", JSON.stringify(team));
  localStorage.setItem("candidature", JSON.stringify(candidature));
  localStorage.setItem("unbanRequests", JSON.stringify(unbanRequests));
}

// SALVA MODIFICHE (dashboard)
function salvaModifiche() {
  salvaDati();
  popolaListe();
  alert("Modifiche salvate con successo!");
}

// MOSTRA SEZIONE DASHBOARD
function mostraSezione(id) {
  const sections = document.querySelectorAll('.dashboard-section');
  sections.forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(id);
  if(target) target.style.display = 'block';
}

// POPOLA LISTE
function popolaListe() {

  // ANNUNCI
  const annunciList = document.getElementById("annunci-list");
  if (annunciList) {
    annunciList.innerHTML = "";
    annunci.forEach((a, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${a.titolo}</strong>: ${a.descrizione}`;

      const btnElimina = document.createElement("button");
      btnElimina.textContent = "Elimina";
      btnElimina.onclick = () => {
        if(confirm(`Eliminare l'annuncio: "${a.titolo}"?`)) {
          annunci.splice(i,1);
          salvaDati();
          popolaListe();
        }
      };

      li.appendChild(btnElimina);
      annunciList.appendChild(li);
    });
  }

  // COMUNICAZIONI
  const comunicazioniList = document.getElementById("comunicazioni-list");
  if(comunicazioniList){
    comunicazioniList.innerHTML = "";
    comunicazioni.forEach((c,i)=>{
      const li = document.createElement("li");
      li.textContent = c;
      const btn = document.createElement("button");
      btn.textContent = "Elimina";
      btn.onclick = () => {
        if(confirm(`Eliminare la comunicazione: "${c}"?`)){
          comunicazioni.splice(i,1);
          salvaDati();
          popolaListe();
        }
      }
      li.appendChild(btn);
      comunicazioniList.appendChild(li);
    });
  }

  // TEAM
  const teamList = document.getElementById("team-list");
  if(teamList){
    teamList.innerHTML = "";
    team.forEach((m,i)=>{
      const li = document.createElement("li");
      li.textContent = `${m.nome} - ${m.ruolo}`;
      const btn = document.createElement("button");
      btn.textContent = "Rimuovi";
      btn.onclick = () => {
        if(confirm(`Rimuovere ${m.nome} dal team?`)){
          team.splice(i,1);
          salvaDati();
          popolaListe();
        }
      }
      li.appendChild(btn);
      teamList.appendChild(li);
    });
  }

  // CANDIDATURE
  const candidatureList = document.getElementById("candidature-list");
  if(candidatureList){
    candidatureList.innerHTML = "";
    candidature.forEach((c,i)=>{
      const li = document.createElement("li");
      li.textContent = `${c.nome} (${c.email}): ${c.motivo}`;
      const btnAccetta = document.createElement("button");
      btnAccetta.textContent = "Accetta";
      btnAccetta.onclick = () => {
        candidature.splice(i,1);
        salvaDati();
        popolaListe();
        alert(`Candidatura di ${c.nome} accettata!`);
      }
      const btnRifiuta = document.createElement("button");
      btnRifiuta.textContent = "Rifiuta";
      btnRifiuta.onclick = () => {
        candidature.splice(i,1);
        salvaDati();
        popolaListe();
        alert(`Candidatura di ${c.nome} rifiutata!`);
      }
      li.appendChild(btnAccetta);
      li.appendChild(btnRifiuta);
      candidatureList.appendChild(li);
    });
  }

  // UNBAN
  const unbanList = document.getElementById("unban-list");
  if(unbanList){
    unbanList.innerHTML = "";
    unbanRequests.forEach((u,i)=>{
      const li = document.createElement("li");
      li.textContent = `${u.username} (${u.email}): ${u.motivo}`;
      const btnAccetta = document.createElement("button");
      btnAccetta.textContent = "Accetta";
      btnAccetta.onclick = () => {
        unbanRequests.splice(i,1);
        salvaDati();
        popolaListe();
        alert(`Richiesta unban di ${u.username} accettata!`);
      }
      const btnRifiuta = document.createElement("button");
      btnRifiuta.textContent = "Rifiuta";
      btnRifiuta.onclick = () => {
        unbanRequests.splice(i,1);
        salvaDati();
        popolaListe();
        alert(`Richiesta unban di ${u.username} rifiutata!`);
      }
      li.appendChild(btnAccetta);
      li.appendChild(btnRifiuta);
      unbanList.appendChild(li);
    });
  }
}

// FUNZIONI AGGIUNTA

function aggiungiAnnuncioForm(e) {
  e.preventDefault();
  const titolo = document.getElementById('annuncio-titolo').value.trim();
  const descrizione = document.getElementById('annuncio-descrizione').value.trim();
  if(!titolo || !descrizione) return alert("Titolo e descrizione obbligatori!");
  annunci.push({titolo, descrizione});
  salvaDati();
  popolaListe();
  document.getElementById('form-annuncio').reset();
}

function aggiungiComunicazione(){
  const testo = prompt("Testo comunicazione:");
  if(testo){ comunicazioni.push(testo); salvaDati(); popolaListe();}
}

function aggiungiTeam(){
  const nome = prompt("Nome membro:");
  if(!nome) return alert("Nome non valido");
  const ruolo = prompt("Ruolo membro:");
  if(!ruolo) return alert("Ruolo non valido");
  team.push({nome: nome, ruolo: ruolo});
  salvaDati();
  popolaListe();
}

// AL CARICAMENTO DELLA PAGINA
document.addEventListener("DOMContentLoaded",()=>{
  popolaListe();
  mostraSezione('annunci');
});