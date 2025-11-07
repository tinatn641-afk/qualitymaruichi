// Shared client-side data & utilities (localStorage prototype)
const STORAGE_KEY = 'qc_data';
const USER_KEY = 'qc_current_user';

function initDefaults(){
  const exist = localStorage.getItem(STORAGE_KEY);
  if(exist) return;
  const defaults = {
    customers: ['PT. FTSID','PT. SDI','PT. ASTEER','PT. MIYUKI','PT. ICHII','PT. FCC','PT. MITSUBA','PT. F.TECH','PT. HITUTA','PT. MITSUTOYO','PT. SJM','PT. HIRUTA KOGYO INDONESIA'],
    org: [
      {id:1,title:'Senior Chief',person:'Budi',role:'senior'},
      {id:2,title:'Leader',person:'Siti',role:'leader'},
      {id:3,title:'Staff QC',person:'Rina',role:'staff'}
    ],
    photos: [],
    parts: [],
    tools: [{id:1,name:'Caliper',model:'Mitutoyo 500-196-30',sn:'CPL-001',status:'ready'},{id:2,name:'Micrometer',model:'Mitutoyo 293-340-30',sn:'MIC-021',status:'kalibrasi'}],
    users: [
      {email:'admin@qc',pwd:'admin123',name:'Admin Demo',role:'admin'},
      {email:'member@qc',pwd:'member123',name:'Member Demo',role:'member'}
    ]
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
}

function loadData(){
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || (initDefaults(), JSON.parse(localStorage.getItem(STORAGE_KEY)));
}
function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function setCurrentUser(user){ localStorage.setItem(USER_KEY, JSON.stringify(user)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); }
function clearCurrentUser(){ localStorage.removeItem(USER_KEY); }

// helpers for pages
function protectPage(){
  // redirect to login if not logged
  const cur = getCurrentUser();
  if(!cur){
    location.href = 'login.html';
    throw new Error('Redirecting to login');
  }
}
function renderTopUser(){
  const ua = document.getElementById('userArea');
  if(!ua) return;
  const cur = getCurrentUser();
  ua.innerHTML = '';
  if(cur){
    const avatar = document.createElement('div'); avatar.className='avatar'; avatar.textContent = (cur.name||cur.email).charAt(0).toUpperCase();
    const info = document.createElement('div'); info.innerHTML = `<div style="font-weight:700">${cur.name||cur.email}</div><div class="muted-sm">${cur.role}</div>`;
    const logout = document.createElement('button'); logout.className='btn secondary'; logout.textContent='Logout';
    logout.onclick = ()=>{ if(confirm('Logout?')){ clearCurrentUser(); location.href='login.html'; } };
    ua.appendChild(avatar); ua.appendChild(info); ua.appendChild(logout);
  } else {
    const a = document.createElement('a'); a.href='login.html'; a.className='btn'; a.textContent='Login';
    ua.appendChild(a);
  }
}

function isAdmin(){ const u = getCurrentUser(); return u && u.role==='admin'; }

// initialization call for pages that load script.js directly
// not automatically redirect here

// expose to window for inline page scripts
window.initDefaults = initDefaults;
window.loadData = loadData;
window.saveData = saveData;
window.setCurrentUser = setCurrentUser;
window.getCurrentUser = getCurrentUser;
window.clearCurrentUser = clearCurrentUser;
window.protectPage = protectPage;
window.renderTopUser = renderTopUser;
window.isAdmin = isAdmin;
