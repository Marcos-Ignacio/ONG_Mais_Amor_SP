const caminhoServidorAPI = 'https://api-contato-ong.herokuapp.com';

// Variáveis dos campos do formulário
let msgVol = document.querySelector('#msg-vol');
let nomeVol = document.querySelector('#nom-vol');
let foneVol = document.querySelector('#fon-vol');
let tempAux = document.querySelector('#aux-temp');
let formVol = document.querySelector('#form-con');
let emailVol = document.querySelector('#ema-vol');


formVol.addEventListener('submit', async(e) => {
    console.log('oi')
    e.preventDefault();


    if (msgVol.value.length > 0 && nomeVol.value.length > 0 && foneVol.value.length > 0 && emailVol.value.length > 0) {
        await enviarFormulario();
    } else {
        alert('Existem campos em branco');
    }
});


async function enviarFormulario() {
    console.log('entrou no envio ' + tempAux.value.trim());

    let data = {
        nome: nomeVol.value,
        email: emailVol.value,
        telefone: foneVol.value,
        mensagem: msgVol.value,
        prot: parseInt(tempAux.value)
    }

    let configurationsFetch = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    let response = await fetch(`${caminhoServidorAPI}/contato?send=1&origin=0`, configurationsFetch);

    console.log(response.json());

    nomeVol.disabled = true;
    foneVol.disabled = true;
    emailVol.disabled = true;
    msgVol.disabled = true;
    document.querySelector('#btn-env').disabled = true;
    alert("Mensagem Enviada Com Sucesso!");
    formVol.insertAdjacentHTML('afterbegin', `<p id="sucess-form">Mensagem enviada com sucesso, em instantes receberá a confirmação por email.</p>`);

    return 1;
}

// Tratamento Telefone

/* Máscaras ER */
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

function id(el) {
    return document.getElementById(el);
}
window.onload = function() {
    id('fon-vol').onkeyup = function() {
        mascara(this, mtel);
    }
}