// ===== TEMA =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', newTheme);
    });
}

// ===== DADOS =====
const dados = [
    {
        titulo: "🔨 Clava (Mace)",
        descricao: "Arma poderosa adicionada na 1.21 que causa dano massivo em queda",
        categoria: "Armas",
        pagina: "results.html"
    }
];

// ===== ELEMENTOS =====
const busca = document.getElementById('busca');
const resultados = document.getElementById('resultados');
const mensagemInicial = document.getElementById('mensagem-inicial');
const clearBtn = document.getElementById('clearBtn');

// ===== BUSCA =====
function buscar(termo) {
    if (!busca || !resultados) return;

    const termoLower = termo.toLowerCase().trim();

    if (!termoLower) {
        resultados.innerHTML = '';
        if (mensagemInicial) mensagemInicial.style.display = 'block';
        if (clearBtn) clearBtn.classList.remove('visible');
        return;
    }

    if (clearBtn) clearBtn.classList.add('visible');
    if (mensagemInicial) mensagemInicial.style.display = 'none';

    const filtrados = dados.filter(item =>
        item.titulo.toLowerCase().includes(termoLower) ||
        item.descricao.toLowerCase().includes(termoLower) ||
        item.categoria.toLowerCase().includes(termoLower)
    );

    if (filtrados.length === 0) {
        resultados.innerHTML = `
            <div class="card" style="text-align:center;border-left-color:#ff6b6b;cursor:default;">
                <p style="color:var(--text-secondary);">😕 Nenhum resultado para "<strong>${termo}</strong>"</p>
                <small style="color:var(--text-muted);">Tente: clava, mace, arma</small>
            </div>
        `;
        return;
    }

    resultados.innerHTML = filtrados.map(item => `
        <a href="${item.pagina}" class="card-link">
            <div class="card">
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
                <small>📂 ${item.categoria}</small>
            </div>
        </a>
    `).join('');
}

// ===== EVENTOS =====
if (busca) {
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
}

if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        busca.value = '';
        buscar('');
        busca.focus();
    });
                           }
