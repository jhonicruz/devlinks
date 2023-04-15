const botao = document.querySelector("#switch button");
const body = document.body;
const foto = document.querySelector("#foto img");

function adicionarClasse() {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {

    foto.setAttribute('src','./assets/light.png')
    foto.setAttribute('alt','Foto do Jhoni de óculos')
  }else {

    foto.setAttribute('src','./assets/dark.png')
    foto.setAttribute('alt','Foto do Jhoni de óculos Escuro')
  }
}

botao.addEventListener("click", adicionarClasse);
