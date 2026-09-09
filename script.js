
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

// ===== FUNÇÃO DE BUSCA =====
let dados = [];

function carregarDados() {
    fetch('results/results.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
        })
        .then(data => {
            dados = data;
        })
        .catch(error => {
            console.error('Erro:', error);
            resultados.innerHTML = `
                <div class="card" style="text-align:center;border-left-color:#ff6b6b;">
                    <p style="color:#ff6b6b;">⚠️ Erro ao carregar dados. Tente novamente.</p>
                </div>
            `;
        });
}

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
    
    const filtrados = dados.filter(item => 
        item.titulo.toLowerCase().includes(termoLower) ||
        item.descricao.toLowerCase().includes(termoLower) ||
        (item.categoria && item.categoria.toLowerCase().includes(termoLower))
    );
    
    if (filtrados.length === 0) {
        resultados.innerHTML = `
            <div class="card" style="text-align:center;border-left-color:#ff6b6b;">
                <p style="color:var(--text-secondary);">😕 Nenhum resultado encontrado para "<strong>${termo}</strong>"</p>
                <small style="color:var(--text-muted);">Tente usar outras palavras</small>
            </div>
        `;
        return;
    }
    
    resultados.innerHTML = filtrados.map(item => `
        <div class="card" onclick="window.location.href='${item.pagina || '#'}'">
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
            ${item.categoria ? `<small>📂 ${item.categoria}</small>` : ''}
        </div>
    `).join('');
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

// ===== INICIALIZAR =====
carregarDados();
