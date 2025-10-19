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
  
  if(e.target !== menuPesquisadores && e.target !== btnMenu &&
    menu.classList.contains("ativo")
  ){
    const aberto = btnMenu.getAttribute("aria-expanded") === "true";
    btnMenu.setAttribute("aria-expanded", String(!aberto));
    menu.classList.toggle("ativo");
  }
})


// Move o foco ao conteúdo destino ao clicar em links do aside
document.querySelectorAll('#menu-pesquisadores a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    // permitir que o navegador faça o jump/rolagem nativa
    const href = link.getAttribute('href');
    const destino = document.querySelector(href);
    if (!destino) return;

    // encontrar o título (h3) e o parágrafo (p)
    const titulo = destino.querySelector('h3, h2, h1');
    const paragrafo = destino.querySelector('p');

    // garantir ids para aria-describedby (se ainda não existem)
    if (titulo && paragrafo) {
      if (!paragrafo.id) paragrafo.id = `${destino.id}-texto`;
      if (!titulo.hasAttribute('aria-describedby')) {
        titulo.setAttribute('aria-describedby', paragrafo.id);
      }
      // timeout curto para esperar o scroll do navegador
      setTimeout(() => {
        titulo.setAttribute('tabindex', '-1'); // garante focável
        titulo.focus({ preventScroll: true });  // foca sem reposicionar novamente
      }, 50);
    } else if (titulo) {
      // se não houver parágrafo, apenas foca o título
      setTimeout(() => {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus({ preventScroll: true });
      }, 50);
    } else {
      // fallback: foca o article
      setTimeout(() => destino.focus({ preventScroll: true }), 50);
    }
  });
});
