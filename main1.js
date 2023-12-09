let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let marcaInput = document.getElementById("marcaInput");
let quilometragemInput = document.getElementById("quilometragemInput")
let msg = document.getElementById("msg");
let veiculos = document.getElementById("veiculos");
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
      const b = marcaInput.value;
      const c = quilometragemInput;

      fetch("http://127.0.0.1:8080/jpa/veiculos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"},
        body: JSON.stringify({
          nome: a,
          marca: b,
          quilometragem: c,
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
    createveiculos();
  };
  
  let createveiculos = () => {
    veiculos.innerHTML = "";
    data.map((x, y) => {
      return (veiculos.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.nome}</span>
            <span class="fw-bold">${x.marca}</span>
            <span class="fw-bold">${x.quilometragem}</span>
   
            <span class="options">
              <i onClick= "editVeiculo(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteVeiculo(this);createveiculos()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };
  
  let deleteVeiculo = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };
  
  let editVeiculo = (e) => {
    let selectedVeiculo = e.parentElement.parentElement;
  
    nomeInput.value = selectedVeiculo.children[0].innerHTML;
    marcaInput.value = selectedVeiculo.children[1].innerHTML;
    quilometragemInput.value = selectedVeiculo.children[2].innerHTML;
  
    deleteVeiculo(e);
  };
  
  let resetForm = () => {
    nomeInput.value = "";
    marcaInput.value = "";
    quilometragemInput.value = "";
  };
  
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createveiculos();
  })();