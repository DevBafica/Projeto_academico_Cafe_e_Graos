// ==========================================
// 1. MOSTRAR / OCULTAR SENHA COM ÍCONES SVG
// ==========================================
function configurarToggleSenha(idInput, idBotao) {
    const input = document.getElementById(idInput);
    const botao = document.getElementById(idBotao);

    
    // Ícones em SVG
    const iconeOlhoAberto = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const iconeOlhoFechado = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;

    if (botao && input) {
        botao.addEventListener('click', () => {
            const tipoAtual = input.getAttribute('type');
            if (tipoAtual === 'password') {
                input.setAttribute('type', 'text');
                botao.innerHTML = iconeOlhoFechado;
            } else {
                input.setAttribute('type', 'password');
                botao.innerHTML = iconeOlhoAberto;
            }
        });
    }
}

configurarToggleSenha('senha', 'toggle-senha');
configurarToggleSenha('confirmacao', 'toggle-confirmacao');


// 2. MÁSCARAS DE INPUT (Formatação automática)

const inputCPF = document.getElementById('CPF');
inputCPF.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = valor;
});

const inputCEP = document.getElementById('CEP');
inputCEP.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = valor;
});

const inputCelular = document.getElementById('celular');
inputCelular.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = valor;
});

const inputTelefone = document.getElementById('telefone');
inputTelefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    e.target.value = valor;
});

// 3. VALIDAÇÃO E ANIMAÇÕES

const form = document.querySelector('#form-cadastro');
const btnSubmit = document.querySelector('.btn-submit');

function mostrarErro(input, mensagem) {
    const container = input.parentElement.classList.contains('senha-container') 
        ? input.parentElement.parentElement 
        : input.parentElement;

    container.classList.add('erro-animacao');
    input.classList.add('input-erro');

    let errorSpan = container.querySelector('.mensagem-erro');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'mensagem-erro';
        container.appendChild(errorSpan);
    }
    errorSpan.innerText = mensagem;

    // Remove a classe da animação para poder tremer novamente no próximo clique
    setTimeout(() => {
        container.classList.remove('erro-animacao');
    }, 400); 
}

function removerErro(input) {
    const container = input.parentElement.classList.contains('senha-container') 
        ? input.parentElement.parentElement 
        : input.parentElement;
        
    input.classList.remove('input-erro');
    const errorSpan = container.querySelector('.mensagem-erro');
    if (errorSpan) {
        errorSpan.remove();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    let formValido = true;

    const campos = [
        { id: 'nome', msg: 'O nome é obrigatório.' },
        { id: 'CPF', msg: 'Digite um CPF válido.' },
        { id: 'CEP', msg: 'Digite o CEP.' },
        { id: 'celular', msg: 'Digite seu número de celular.' },
        { id: 'Email', msg: 'Digite um e-mail válido.' },
        { id: 'senha', msg: 'A senha deve ter no mínimo 6 caracteres.' }
    ];

    // Limpa erros anteriores
    form.querySelectorAll('input').forEach(input => removerErro(input));

    // Validar campos obrigatórios
    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (input.value.trim() === '') {
            mostrarErro(input, campo.msg);
            formValido = false;
        } else if (campo.id === 'Email' && !input.value.includes('@')) {
            mostrarErro(input, 'Insira um e-mail válido com @.');
            formValido = false;
        } else if (campo.id === 'senha' && input.value.length < 6) {
            mostrarErro(input, campo.msg);
            formValido = false;
        }
    });

    // Validar senhas iguais
    const inputSenha = document.getElementById('senha');
    const inputConfirmacao = document.getElementById('confirmacao');
    
    if (inputSenha.value !== '' && inputSenha.value !== inputConfirmacao.value) {
        mostrarErro(inputConfirmacao, 'As senhas não coincidem.');
        formValido = false;
    }

    // Sucesso no envio
    if (formValido) {
        btnSubmit.classList.add('btn-sucesso');
        btnSubmit.innerText = 'Cadastrando...';
        
        setTimeout(() => {
            btnSubmit.innerText = 'Conta Criada!';
            // form.submit(); // <-- Remova as barras // para enviar de verdade depois
        }, 1500);
    }
});

// Remove o erro assim que o usuário digita
form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        removerErro(input);
    });
});


// Configura as ferramentas de acessibilidade após o carregamento da página.
document.addEventListener("DOMContentLoaded", function () {

    const aumentarFonte = document.getElementById("aumentar-fonte");
    const diminuirFonte = document.getElementById("diminuir-fonte");
    const alternarTema = document.getElementById("alternar-tema");

    let escalaFonte = 1;

    const textos = document.querySelectorAll(
        "h1, h2, h3, p, label, input, button, a, small, span"
    );

    // Armazena o tamanho original das fontes para permitir os ajustes.
    textos.forEach(function (elemento) {
        elemento.dataset.fonteOriginal =
            parseFloat(getComputedStyle(elemento).fontSize);
    });

    // Atualiza o tamanho dos textos conforme a escala selecionada.
    function atualizarFonte() {
        textos.forEach(function (elemento) {
            const tamanhoOriginal = Number(elemento.dataset.fonteOriginal);

            elemento.style.fontSize =
                (tamanhoOriginal * escalaFonte) + "px";
        });
    }

    // Aumenta o tamanho da fonte até o limite de 140%.
    aumentarFonte.addEventListener("click", function () {
        if (escalaFonte < 1.4) {
            escalaFonte = Math.round((escalaFonte + 0.1) * 10) / 10;
            atualizarFonte();
        }
    });

    // Diminui o tamanho da fonte até o limite de 80%.
    diminuirFonte.addEventListener("click", function () {
        if (escalaFonte > 0.8) {
            escalaFonte = Math.round((escalaFonte - 0.1) * 10) / 10;
            atualizarFonte();
        }
    });

    // Atualiza o emoji conforme o tema ativo.
    function atualizarIconeTema() {
        const modoEscuro = document.body.classList.contains("modo-escuro");

        // Exibe somente o emoji de sol ou lua.
        alternarTema.textContent = modoEscuro ? "☀️" : "🌙";

        // Mantém a identificação do botão para leitores de tela.
        alternarTema.setAttribute(
            "aria-label",
            modoEscuro ? "Ativar tema claro" : "Ativar tema escuro"
        );
    }

    // Alterna entre os temas claro e escuro da página.
    alternarTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-escuro");
        atualizarIconeTema();
    });

    // Define o emoji correto ao carregar a página.
    atualizarIconeTema();

});