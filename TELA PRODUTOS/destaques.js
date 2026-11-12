document.addEventListener("DOMContentLoaded", () => {
    // Função auxiliar para notificações na tela (Substituto do alert)
    function mostrarMensagem(mensagem, tipo = "info") {
        const alertaAntigo = document.querySelector(".toast-alerta-custom");
        if (alertaAntigo) alertaAntigo.remove();

        const toast = document.createElement("div");
        toast.className = "toast-alerta-custom";
        toast.textContent = mensagem;
        
        Object.assign(toast.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: tipo === "sucesso" ? "#2d6a4f" : "#333",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: "9999",
            fontFamily: "sans-serif",
            fontSize: "14px",
            transition: "opacity 0.3s ease"
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Função auxiliar para confirmação na tela (Substituto do confirm)
    function mostrarConfirmacao(mensagem, callbackSim) {
        const modalAntigo = document.querySelector(".modal-confirm-custom");
        if (modalAntigo) modalAntigo.remove();

        const overlay = document.createElement("div");
        overlay.className = "modal-confirm-custom";
        Object.assign(overlay.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "10000",
            fontFamily: "sans-serif"
        });

        const caixa = document.createElement("div");
        Object.assign(caixa.style, {
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            maxWidth: "350px",
            width: "100%",
            textAlign: "center"
        });

        const texto = document.createElement("p");
        texto.textContent = mensagem;
        Object.assign(texto.style, {
            marginBottom: "20px",
            color: "#333",
            fontSize: "16px"
        });

        const btnSim = document.createElement("button");
        btnSim.textContent = "Sim";
        Object.assign(btnSim.style, {
            backgroundColor: "#2d6a4f",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px",
            fontWeight: "bold"
        });

        const btnNao = document.createElement("button");
        btnNao.textContent = "Cancelar";
        Object.assign(btnNao.style, {
            backgroundColor: "#ccc",
            color: "#333",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
        });

        btnSim.addEventListener("click", () => {
            overlay.remove();
            callbackSim();
        });

        btnNao.addEventListener("click", () => {
            overlay.remove();
        });

        caixa.appendChild(texto);
        caixa.appendChild(btnSim);
        caixa.appendChild(btnNao);
        overlay.appendChild(caixa);
        document.body.appendChild(overlay);
    }

    // 1. Gerenciamento do nome do usuário no localStorage
    let nomeUsuario = localStorage.getItem("cafe_usuario_nome");
    
    if (!nomeUsuario) {
        nomeUsuario = "Eduardo";
        localStorage.setItem("cafe_usuario_nome", nomeUsuario);
    }

    const spanUserNavbar = document.querySelector(".user-name");
    if (spanUserNavbar) {
        spanUserNavbar.textContent = nomeUsuario;
    }

    const h1Principal = document.querySelector(".conteudo-principal h1");
    if (h1Principal) {
        h1Principal.textContent = `Olá, ${nomeUsuario}!`;
    }

    // 2. Ações dos Botões de Navegação do Painel
    const btnQuiz = document.querySelector(".btn-quiz");
    if (btnQuiz) {
        btnQuiz.addEventListener("click", () => {
            mostrarMensagem("Redirecionando para o questionário de perfil de café...", "sucesso");
            // window.location.href = "quiz.html";
        });
    }

    const btnPreferencias = document.querySelector(".btn-preferencias");
    if (btnPreferencias) {
        btnPreferencias.addEventListener("click", () => {
            mostrarMensagem("Indo para a tela de Minhas Preferências...", "sucesso");
            // window.location.href = "preferencias.html";
        });
    }

    // 3. Botão Sair (Logout)
    const btnSair = document.querySelector(".btn-sair");
    if (btnSair) {
        btnSair.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarConfirmacao("Deseja realmente sair da sua conta?", () => {
                localStorage.removeItem("cafe_usuario_nome");
                mostrarMensagem("Sessão encerrada com sucesso!", "sucesso");
                // window.location.href = "index.html";
            });
        });
    }
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