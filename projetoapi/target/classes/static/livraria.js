const API = '/livraria';  // ou '' se quiser usar o mesmo domínio

const tituloEl   = document.getElementById('titulo');
const estoqueEl  = document.getElementById('estoque');
const catalogoEl = document.getElementById('catalogo');
const editIdEl   = document.getElementById('edit-id');
const formTitle  = document.getElementById('form-title');
const btnSave    = document.getElementById('btn-save');
const btnCancel  = document.getElementById('btn-cancel');
const btnRefresh = document.getElementById('btn-refresh');
const listEl     = document.getElementById('livros-list');
const countEl    = document.getElementById('count');
const toastEl    = document.getElementById('toast');
const overlay    = document.getElementById('overlay');
const modalNo    = document.getElementById('modal-no');
const modalYes   = document.getElementById('modal-yes');

let deleteId = null;
let editing  = false;

// ── FETCH ──
async function getAll()         { return (await fetch(API)).json(); }
async function post(data)       { return (await fetch(API, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })).json(); }
async function put(id, data)    { return (await fetch(`${API}/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })).json(); }
async function del(id)          { await fetch(`${API}/${id}`, { method:'DELETE' }); }

// ── RENDER ──
async function load() {
    listEl.innerHTML = '<div class="estado">Carregando...</div>';
    try {
        const livros = await getAll();
        countEl.textContent = livros.length;
        if (!livros.length) {
            listEl.innerHTML = '<div class="estado">Nenhum livro cadastrado.</div>';
            return;
        }
        listEl.innerHTML = livros.map(l => `
      <div class="livro-row">
        <div class="livro-info">
          <div class="livro-titulo">${l.titulo ?? '—'}</div>
          <div class="livro-meta">
            Estoque: <strong>${l.estoque ?? '—'}</strong>
            <span class="tag">${l.catalogo ?? '—'}</span>
          </div>
        </div>
        <div class="livro-actions">
          <button class="btn ghost small" onclick="startEdit('${l.id}','${esc(l.titulo)}','${esc(l.estoque)}','${l.catalogo??''}')">Editar</button>
          <button class="btn danger small" onclick="askDelete('${l.id}')">Remover</button>
        </div>
      </div>
    `).join('');
    } catch {
        listEl.innerHTML = '<div class="estado">Erro ao conectar na API.</div>';
    }
}

const esc = v => (v ?? '').replace(/'/g, "\\'");

// ── SAVE ──
btnSave.addEventListener('click', async () => {
    const titulo   = tituloEl.value.trim();
    const estoque  = estoqueEl.value.trim();
    const catalogo = catalogoEl.value;

    if (!titulo || !estoque || !catalogo) {
        showToast('Preencha todos os campos.', 'error');
        return;
    }

    try {
        if (editing) {
            await put(editIdEl.value, { titulo, estoque, catalogo });
            showToast('Livro atualizado!', 'success');
        } else {
            await post({ titulo, estoque, catalogo });
            showToast('Livro criado!', 'success');
        }
        clearForm();
        load();
    } catch {
        showToast('Erro ao salvar.', 'error');
    }
});

// ── EDIT ──
function startEdit(id, titulo, estoque, catalogo) {
    editing = true;
    editIdEl.value   = id;
    tituloEl.value   = titulo;
    estoqueEl.value  = estoque;
    catalogoEl.value = catalogo;
    formTitle.textContent    = 'Editar Livro';
    btnSave.textContent      = 'Atualizar';
    btnCancel.style.display  = 'inline-flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

btnCancel.addEventListener('click', clearForm);

function clearForm() {
    editing = false;
    tituloEl.value   = '';
    estoqueEl.value  = '';
    catalogoEl.value = '';
    editIdEl.value   = '';
    formTitle.textContent    = 'Novo Livro';
    btnSave.textContent      = 'Salvar';
    btnCancel.style.display  = 'none';
}

// ── DELETE ──
function askDelete(id) {
    deleteId = id;
    overlay.style.display = 'flex';
}

modalNo.addEventListener('click', () => {
    overlay.style.display = 'none';
    deleteId = null;
});

modalYes.addEventListener('click', async () => {
    overlay.style.display = 'none';
    try {
        await del(deleteId);
        showToast('Livro removido.', 'success');
        load();
    } catch {
        showToast('Erro ao remover.', 'error');
    }
    deleteId = null;
});

// ── TOAST ──
let timer;
function showToast(msg, type) {
    toastEl.textContent  = msg;
    toastEl.className    = `toast ${type}`;
    toastEl.style.display = 'block';
    clearTimeout(timer);
    timer = setTimeout(() => toastEl.style.display = 'none', 3000);
}

btnRefresh.addEventListener('click', load);
load();