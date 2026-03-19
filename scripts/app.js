const botao = document.querySelector("#switch button");
const body = document.body;
const heroAvatar = document.querySelector(".hero-avatar img");
const projectsGrid = document.querySelector("#projects-grid");
const languageSwitch = document.querySelector("#language-switch");
const heroCta = document.querySelector("#hero-cta");
const socialWhatsapp = document.querySelector("#social-whatsapp");

// Registrar ScrollTrigger com GSAP
gsap.registerPlugin(ScrollTrigger);

const i18n = {
  "pt-BR": {
    htmlLang: "pt-br",
    heroTitleStatic: "Olá, me chamo",
    heroSubtitle: "Full Stack Developer & UI/UX Designer",
    heroDescription:
      "Transformo ideias em experiências digitais incríveis. Desenvolvimento web moderno, design intuitivo e performance garantida.",
    heroCta: "Quero um orçamento",
    projectsTitle: "Projetos Desenvolvidos",
    projectsSubtitle: "Clique em qualquer projeto para abrir o site.",
    themeTitle: "Trocar tema",
    languageAria: "Selecionar idioma",
    whatsappText: "Olá, vim pelo seu site e quero um orçamento.",
  },
  en: {
    htmlLang: "en",
    heroTitleStatic: "Hello, my name is",
    heroSubtitle: "Full Stack Developer & UI/UX Designer",
    heroDescription:
      "I turn ideas into outstanding digital experiences. Modern web development, intuitive design, and high performance.",
    heroCta: "Get a quote",
    projectsTitle: "Featured Projects",
    projectsSubtitle: "Click any project card to open the website.",
    themeTitle: "Switch theme",
    languageAria: "Select language",
    whatsappText: "Hello, I came from your website and would like a quote.",
  },
};

function montarLinkWhatsapp(texto) {
  return `https://wa.me/5588999834281?text=${encodeURIComponent(texto)}`;
}

function aplicarIdioma(lang) {
  const idioma = i18n[lang] ? lang : "pt-BR";
  const dict = i18n[idioma];
  const elementos = document.querySelectorAll("[data-i18n]");

  document.documentElement.lang = dict.htmlLang;
  if (languageSwitch) {
    languageSwitch.value = idioma;
    languageSwitch.setAttribute("aria-label", dict.languageAria);
  }

  elementos.forEach((el) => {
    const chave = el.dataset.i18n;
    if (dict[chave]) {
      el.textContent = dict[chave];
    }
  });

  if (botao) {
    botao.setAttribute("title", dict.themeTitle);
    botao.setAttribute("aria-label", dict.themeTitle);
  }

  const whatsappHref = montarLinkWhatsapp(dict.whatsappText);
  if (heroCta) {
    heroCta.href = whatsappHref;
  }
  if (socialWhatsapp) {
    socialWhatsapp.href = whatsappHref;
  }

  localStorage.setItem("preferred-language", idioma);
}

const projetos = [
  {
    nome: "Parallax",
    url: "https://jhonicruz.github.io/parallax/",
    imagem: "./assets/projects/parallax.webp",
  },
  {
    nome: "Bikcraft",
    url: "https://jhonicruz.github.io/bikcraft/",
    imagem: "./assets/projects/bikcraft.webp",
  },
  {
    nome: "Marmifit Cardapio",
    url: "https://marmifit.github.io/cardapio/",
    imagem: "./assets/projects/marmifit-cardapio.webp",
  },
  {
    nome: "Forest",
    url: "https://forest-liard-theta.vercel.app/",
    imagem: "./assets/projects/forest.webp",
  },
  {
    nome: "Eclass",
    url: "https://eclass-eight.vercel.app/",
    imagem: "./assets/projects/eclass.webp",
  },
  {
    nome: "Dogs Next",
    url: "https://dogs-next-woad.vercel.app/",
    imagem: "./assets/projects/dogs-next.webp",
  },
  {
    nome: "Alan Marcel",
    url: "https://alanmarcel.com/",
    imagem: "./assets/projects/alan-marcel.webp",
  },
];

const perfisMovimento = [
  {
    nome: "preview-loop-a",
    duracao: 10.5,
    easing: "cubic-bezier(0.35, 0.02, 0.28, 1)",
    direcao: "alternate",
  },
  {
    nome: "preview-loop-b",
    duracao: 12.4,
    easing: "cubic-bezier(0.4, 0.08, 0.2, 1)",
    direcao: "alternate",
  },
  {
    nome: "preview-loop-c",
    duracao: 14.2,
    easing: "cubic-bezier(0.2, 0.65, 0.2, 1)",
    direcao: "normal",
  },
];

// ===== TYPEWRITER ANIMATION (ONE TIME) =====

function iniciarTypewriter() {
  const typewriterEl = document.querySelector("#typewriter-text");
  if (!typewriterEl) return;

  const nome = "Jhoni";
  const velocidade = 95;
  const atrasoInicial = 350;

  typewriterEl.textContent = "";

  setTimeout(() => {
    let indice = 0;

    const timer = setInterval(() => {
      typewriterEl.textContent += nome[indice];
      indice += 1;

      if (indice >= nome.length) {
        clearInterval(timer);
      }
    }, velocidade);
  }, atrasoInicial);
}

// ===== GSAP ANIMATIONS - CARDS =====

function animarCards() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  cards.forEach((card, indice) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: indice * 0.12,
      ease: "power3.out",
    });
  });
}

// ===== PREVIEW LOADING =====

function carregarPreviewQuandoVisivel() {
  const previews = document.querySelectorAll(".project-preview[data-preview-url]");

  if (!previews.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const preview = entry.target;
        const { previewUrl } = preview.dataset;
        const previewUrlResolvida = previewUrl ? new URL(previewUrl, window.location.href).href : "";

        if (!previewUrlResolvida) {
          currentObserver.unobserve(preview);
          return;
        }

        const imagem = new Image();
        imagem.decoding = "async";
        imagem.src = previewUrlResolvida;

        imagem.onload = () => {
          preview.style.setProperty("--preview-url", `url('${previewUrlResolvida}')`);
          preview.classList.add("is-loaded");
          preview.classList.remove("is-error");
        };

        imagem.onerror = () => {
          preview.classList.add("is-error");
        };

        currentObserver.unobserve(preview);
      });
    },
    {
      root: null,
      rootMargin: "220px 0px",
      threshold: 0.05,
    },
  );

  previews.forEach((preview) => observer.observe(preview));
}

// ===== RENDER PROJECTS =====

function renderizarProjetos() {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = "";

  projetos.forEach((projeto, indice) => {
    const card = document.createElement("a");
    const screenshotUrl = new URL(projeto.imagem, window.location.href).href;
    const perfil = perfisMovimento[indice % perfisMovimento.length];

    card.className = "project-card";
    card.href = projeto.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.ariaLabel = `Abrir projeto ${projeto.nome}`;
    card.style.setProperty("--delay", `${indice * 90}ms`);
    card.style.setProperty("--preview-animation-name", perfil.nome);
    card.style.setProperty("--preview-duration", `${perfil.duracao}s`);
    card.style.setProperty("--preview-easing", perfil.easing);
    card.style.setProperty("--preview-direction", perfil.direcao);
    card.style.setProperty("--preview-offset", `${indice * -0.9}s`);

    card.innerHTML = `
      <div class="project-preview" data-preview-url="${screenshotUrl}" data-preview-label="${projeto.nome}"></div>
      <div class="project-meta">
        <strong>${projeto.nome}</strong>
        <span>${new URL(projeto.url).hostname}</span>
      </div>
    `;

    projectsGrid.appendChild(card);
  });

  carregarPreviewQuandoVisivel();
  animarCards();
}

// ===== THEME TOGGLE =====

function adicionarClasse() {
  body.classList.toggle("light");

  if (heroAvatar && body.classList.contains("light")) {
    heroAvatar.setAttribute("src", "./assets/light.png");
  } else if (heroAvatar) {
    heroAvatar.setAttribute("src", "./assets/dark.png");
  }
}

// ===== INITIALIZATION =====

botao.addEventListener("click", adicionarClasse);
iniciarTypewriter();
renderizarProjetos();

const idiomaSalvo = localStorage.getItem("preferred-language") || "pt-BR";
aplicarIdioma(idiomaSalvo);

if (languageSwitch) {
  languageSwitch.addEventListener("change", (event) => {
    const { value } = event.target;
    aplicarIdioma(value);
  });
}
