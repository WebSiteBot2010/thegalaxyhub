// --- LOGIN & CONTROLLO ADMIN ---
if(window.location.pathname.endsWith('dashboard.html')){
  if(localStorage.getItem('isAdmin') !== 'true'){
    alert("Devi loggarti come admin!");
    window.location.href = "login.html";
  }
}

function logout(){
  localStorage.removeItem('isAdmin');
  window.location.href="login.html";
}

// --- DATI ---
let annunci = JSON.parse(localStorage.getItem("annunci")) || ["Benvenuto su TheGalaxyHub!"];
let comunicazioni = JSON.parse(localStorage.getItem("comunicazioni")) || ["Prima comunicazione!"];
let team = JSON.parse(localStorage.getItem("team")) || [{ nome:"Admin", ruolo:"Founder" }];
let candidature = JSON.parse(localStorage.getItem("candidature")) || [];
let unbanRequests = JSON.parse(localStorage.getItem("unbanRequests")) || [];

// --- SALVATAGGIO DATI ---
function salvaDati(){
  localStorage.setItem("annunci",JSON.stringify(annunci));
  localStorage.setItem("comunicazioni",JSON.stringify(comunicazioni));
  localStorage.setItem("team",JSON.stringify(team));
  localStorage.setItem("candidature",JSON.stringify(candidature));
  localStorage.setItem("unbanRequests",JSON.stringify(unbanRequests));
}

// --- MOSTRA SEZIONE ---
function mostraSezione(id){
  document.querySelectorAll('.dashboard-section').forEach(s=>s.style.display='none');
  const target = document.getElementById(id);
  if(target) target.style.display='block';
}

// --- POPOLA LISTE ---
function popolaListe(){
  // Funzione generica per creare li con sposta/elimina
  function creaLi(array, i, testo, container){
    const li = document.createElement("li");
    li.textContent = testo;

    // Pulsanti Sposta
    const btnSu = document.createElement("button");
    btnSu.textContent = "↑"; btnSu.title="Sposta su";
    btnSu.onclick = ()=>spostaElemento(array,i,'su'); li.appendChild(btnSu);

    const btnGiu = document.createElement("button");
    btnGiu.textContent = "↓"; btnGiu.title="Sposta giù";
    btnGiu.onclick = ()=>spostaElemento(array,i,'giu'); li.appendChild(btnGiu);

    // Pulsante Elimina
    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";
    btnElimina.onclick = ()=>{
      if(confirm(`Eliminare "${testo}"?`)){
        array.splice(i,1);
        salvaDati();
        popolaListe();
      }
    };
    li.appendChild(btnElimina);

    container.appendChild(li);
  }

  // ANNUNCI
  const aList = document.getElementById("annunci-list");
  if(aList){ aList.innerHTML=""; annunci.forEach((a,i)=>creaLi(annunci,i,a,aList)); }

  // COMUNICAZIONI
  const cList = document.getElementById("comunicazioni-list");
  if(cList){ cList.innerHTML=""; comunicazioni.forEach((c,i)=>creaLi(comunicazioni,i,c,cList)); }

  // TEAM
  const tList = document.getElementById("team-list");
  if(tList){
    tList.innerHTML="";
    team.forEach((m,i)=>{
      creaLi(team,i,`${m.nome} - ${m.ruolo}`,tList);
    });
  }

  // CANDIDATURE
  const canList = document.getElementById("candidature-list");
  if(canList){
    canList.innerHTML="";
    candidature.forEach((c,i)=>{
      const li = document.createElement("li");
      li.textContent=`${c.nome} (${c.email}): ${c.motivo}`;
      const btnAcc = document.createElement("button"); btnAcc.textContent="Accetta";
      btnAcc.onclick=()=>{
        candidature.splice(i,1); salvaDati(); popolaListe(); alert(`${c.nome} accettato!`);
      };
      const btnRif = document.createElement("button"); btnRif.textContent="Rifiuta";
      btnRif.onclick=()=>{
        candidature.splice(i,1); salvaDati(); popolaListe(); alert(`${c.nome} rifiutato!`);
      };
      li.appendChild(btnAcc); li.appendChild(btnRif);
      canList.appendChild(li);
    });
  }

  // UNBAN
  const uList = document.getElementById("unban-list");
  if(uList){
    uList.innerHTML="";
    unbanRequests.forEach((u,i)=>{
      const li = document.createElement("li");
      li.textContent=`${u.username} (${u.email}): ${u.motivo}`;
      const btnAcc = document.createElement("button"); btnAcc.textContent="Accetta";
      btnAcc.onclick=()=>{
        unbanRequests.splice(i,1); salvaDati(); popolaListe(); alert(`${u.username} accettato!`);
      };
      const btnRif = document.createElement("button"); btnRif.textContent="Rifiuta";
      btnRif.onclick=()=>{
        unbanRequests.splice(i,1); salvaDati(); popolaListe(); alert(`${u.username} rifiutato!`);
      };
      li.appendChild(btnAcc); li.appendChild(btnRif);
      uList.appendChild(li);
    });
  }
}

// --- FUNZIONI DI SUPPORTO ---
function spostaElemento(array,index,direzione){
  if(direzione==='su' && index>0){ [array[index-1],array[index]]=[array[index],array[index-1]]; }
  if(direzione==='giu' && index<array.length-1){ [array[index+1],array[index]]=[array[index],array[index+1]]; }
  salvaDati(); popolaListe();
}

function salvaModifiche(){
  salvaDati();
  alert("Modifiche salvate con successo!");
}

// --- AGGIUNTA ---
function aggiungiAnnuncio(){ const t=prompt("Testo annuncio:"); if(t){annunci.push(t); salvaDati(); popolaListe();} }
function aggiungiComunicazione(){ const t=prompt("Testo comunicazione:"); if(t){comunicazioni.push(t); salvaDati(); popolaListe();} }
function aggiungiTeam(){ 
  const n=prompt("Nome membro:"); if(!n)return alert("Nome non valido");
  const r=prompt("Ruolo membro:"); if(!r)return alert("Ruolo non valido");
  team.push({nome:n,ruolo:r}); salvaDati(); popolaListe();
}

// --- CARICAMENTO ---
document.addEventListener("DOMContentLoaded",()=>{
  popolaListe();
  mostraSezione('annunci');
});