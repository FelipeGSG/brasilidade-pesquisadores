const botaoTema = document.getElementById("tema-toggle");
const html = document.documentElement;
const body = document.body;

const temaSalvo = localStorage.getItem("tema"); // 'escuro' | 'claro' | null

function aplicarTema(tema) {
  if (tema === "escuro") {
    html.setAttribute("data-theme", "dark");
    body.classList.add("dark-mode");

    botaoTema.setAttribute("aria-pressed", "true");
    botaoTema.textContent = "Modo claro";
  } else {
    html.setAttribute("data-theme", "light");
    body.classList.remove("dark-mode");

    botaoTema.setAttribute("aria-pressed", "false");
    botaoTema.textContent = "Modo escuro";
  }
}

if (temaSalvo === "escuro" || temaSalvo === "claro") {
  aplicarTema(temaSalvo === "escuro" ? "escuro" : "claro");
} else {
  const sistemaEscuro =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  aplicarTema(sistemaEscuro ? "escuro" : "claro");
}

// Evento de clique: alterna e SALVA preferência do usuário
botaoTema.addEventListener("click", () => {
  const modoAtivo = body.classList.toggle("dark-mode");
  if (modoAtivo) {
    html.setAttribute("data-theme", "dark");
    botaoTema.setAttribute("aria-pressed", "true");
    botaoTema.textContent = "Modo claro";
    localStorage.setItem("tema", "escuro");
  } else {
    html.setAttribute("data-theme", "light");
    botaoTema.setAttribute("aria-pressed", "false");
    botaoTema.textContent = "Modo escuro";
    localStorage.setItem("tema", "claro");
  }
});

const mq = window.matchMedia("(prefers-color-scheme: dark)");
mq.addEventListener?.("change", (e) => {
  const temSalvo = !!localStorage.getItem("tema");
  if (!temSalvo) {
    aplicarTema(e.matches ? "escuro" : "claro");
  }
});

const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-pesquisadores");

btnMenu.addEventListener("click", () => {
  const aberto = btnMenu.getAttribute("aria-expanded") === "true";
  btnMenu.setAttribute("aria-expanded", String(!aberto));
  menu.classList.toggle("ativo");
});

// Fecha com Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("ativo")) {
    btnMenu.setAttribute("aria-expanded", "false");
    menu.classList.remove("ativo");
    btnMenu.focus(); // devolve foco ao botão
  }
});

document.addEventListener("click", (e) =>{
  const btnMenu = document.getElementById("btn-menu");
  const menu = document.getElementById("menu-pesquisadores");
  const menuPesquisadores = document.getElementById("menu-pesquisadores")
  
  if(e.target !== menuPesquisadores && e.target !== btnMenu){
    const aberto = btnMenu.getAttribute("aria-expanded") === "true";
    btnMenu.setAttribute("aria-expanded", String(!aberto));
    menu.classList.toggle("ativo");
  }
})
