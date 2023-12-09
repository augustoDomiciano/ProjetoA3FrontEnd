let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let bandaInput = document.getElementById("bandaInput");
let msg = document.getElementById("msg");
let musicas = document.getElementById("musicas");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (nomeInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Música não pode ser vazio.";
    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
  
      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  };
  
  let data = [{}];
  
  let acceptData = () => {
  
    document.addEventListener("submit", sendData);
    function sendData(e) {
      e.preventDefault();
      const a = nomeInput.value;
      const b = bandaInput.value;

      fetch("http://127.0.0.1:8080/jpa/musicas", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"},
        body: JSON.stringify({
          nome: a,
          banda: b
        })
      })
        .then(res => res.json())
        .then(data => {
          const { id } = data;
          document.querySelector(
            ".id"
          ).innerText = `The id is: ${id}`;
        })
        .catch(err => console.log(err));
    }
  
    console.log(data);
    createMusicas();
  };
  
  let createMusicas = () => {
    musicas.innerHTML = "";
    data.map((x, y) => {
      return (musicas.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.nome}</span>
            <span class="fw-bold">${x.banda}</span>
   
            <span class="options">
              <i onClick= "editMusica(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteMusica(this);createMusicas()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };
  
  let deleteMusica = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };
  
  let editMusica = (e) => {
    let selectedMusica = e.parentElement.parentElement;
  
    nomeInput.value = selectedMusica.children[0].innerHTML;
    bandaInput.value = selectedMusica.children[1].innerHTML;
  
    deleteMusica(e);
  };
  
  let resetForm = () => {
    nomeInput.value = "";
    bandaInput.value = "";
  };
  
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createMusicas();
  })();