// ===== ELEMENTOS =====
const busca = document.getElementById('busca');
const resultados = document.getElementById('resultados');
const mensagemInicial = document.getElementById('mensagem-inicial');
const clearBtn = document.getElementById('clearBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// ===== TEMA =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    
    localStorage.setItem('theme', newTheme);
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', toggleTheme);

// ===== DADOS (VAZIO POR ENQUANTO) =====
let dados = [];

// ===== FUNÇÃO DE BUSCA =====
function buscar(termo) {
    const termoLower = termo.toLowerCase().trim();
    
    if (!termoLower) {
        resultados.innerHTML = '';
        mensagemInicial.style.display = 'block';
        clearBtn.classList.remove('visible');
        return;
    }
    
    clearBtn.classList.add('visible');
    mensagemInicial.style.display = 'none';
    
    // SEM DADOS = MENSAGEM INFORMATIVA
    resultados.innerHTML = `
        <div class="card" style="text-align:center;border-left-color:#ff6b6b;">
            <p style="color:var(--text-secondary);">📭 Nenhuma informação cadastrada ainda</p>
            <small style="color:var(--text-muted);">Em breve adicionaremos dados do Minecraft!</small>
        </div>
    `;
}

// ===== EVENTOS =====
busca.addEventListener('input', function() {
    buscar(this.value);
});

busca.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        this.value = '';
        buscar('');
        this.blur();
    }
});

clearBtn.addEventListener('click', function() {
    busca.value = '';
    buscar('');
    busca.focus();
});
