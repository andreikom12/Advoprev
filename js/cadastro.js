$(document).ready(function(){
	//abaixo usamos o seletor da jQuery para acessar o botão, e em seguida atribuir à ele um evento de click
	$("#cep").mask("99999-999", {placeholder: "_____-___"});

	$("#btn_cadpessoa").click(function(){
		//Aqui chamamos a função validaCadPessoa, e passamos a ela o que foi digitado nos campos de cadastro de pessoa
		if(!$("input:radio[name=tipo-pessoa]:checked").val()){
			alert("Selecione o tipo de pessoa");
			return;
		}
		validaCadPessoa(
			$("#nome1"), 
			$("input:radio[name=tipo-pessoa]:checked").val(), 
			$("#email"), 
			$("#rg"), 
			$("#data"), 
			$("#telefone"), 
			$("#sexo"),  
			$("#oab"), 
			$("#cep"), 
			$("#complemento"), 
			$("#numero"), 
			$("#estadocivil"), 
			$("#profissao")
		);
	});
});
/* ------------------------- CADASTRO DE PESSOAS --------------------------*/
function validaCadPessoa(nome, tipoPessoa, emails, rg, data, tel, sexo, oab, cep, complemento, numero, estadocivil, profissao){
	var cpf_cnpj;
	cep.val(cep.val().replace(/-/g, ""));
	if(emails.val() != ""){
		var email = IsEmail(emails.val());
	}else{
		email == true;
	}
	if(tipoPessoa == "cpf"){
		cpf_cnpj = $("#cpf").val();
		var check = verificaCPF(cpf_cnpj);
	}else{
		cpf_cnpj = $("#cnpj").val();
		var check = validarCNPJ(cpf_cnpj);
	}
	var sexo;
	var els = document.getElementsByName('sexo');
	for (var i=0;i<els.length;i++){
	  if ( els[i].checked ) {
	    sexo = els[i].value;
	  }
	}

	if(nome.val() == ""){
		nome.focus();
		return;
	}else if(email == false) {
		alert("email inválido");
		return;
	}else if(check == false) {
		alert("CPF/CNPJ inválido");
		return;
	}else if(data.val() == ""){
		data.focus();
		return;
	}else if(cep.val() == ""){
		cep.focus();
		return;
	}else{
		$.post("control/cadastroControl.php?action=cadastro", {cpf_cnpj: cpf_cnpj, rg: rg.val(),
		nome: nome.val(), data: data.val(),	email: emails.val(), telefone: tel.val(), 
		sexo: sexo, oab: oab.val(), cep: cep.val(), complemento: complemento.val(),numero: numero.val(),
		estadocivil: estadocivil.val(), profissao: profissao.val()}, // envia variaveis por POST para a control cadastroControl
			function(retorno2){ //resultado da control	
				if(retorno2 == 1){
					alert("Cadastro efetuado com sucesso");
					$("#container1").html('');
					$("#container1").load('cadastroPessoas.php');
				}else{
					alert(retorno2);
				}
			} //function(retorno)
		); //$.post()
	}
}

//funcao para aceitar somente numeros nos campos
function somenteNum(e) {
	var tecla=(window.event)?event.keyCode:e.which;   
    if((tecla>47 && tecla<58)) return true;
    else{
    	if (tecla==8 || tecla==0) return true;
	else  return false;
    }
}

function buscarCPF(valor){
	var cpf = valor.length;
	if(cpf < 11){
		var a = unescape("<img src=\"assets/uncheck.png\" width=\"20px\" height=\"20px\">");
		$("#verifica1").html(a);
		return; //retorna nulo
	}
	$.post("control/cadastroControl.php?action=verCPF", {aux: valor}, // envia variaveis por POST para a control cadastroControl
		function(retorno){ //retorno é o resultado que a control retorna
			var a = unescape("<img alt=\"CPF inválido ou já cadastrado\" src=\"assets/uncheck.png\" width=\"20px\" height=\"20px\">");
			var b = unescape("<img src=\"assets/check.png\" width=\"20px\" height=\"20px\">");
			if(retorno == 1){ // se retornar 1, neste caso o login ja existe no banco
				$("#verifica1").html(a);  //mostra na div alert
				alert("CPF já cadastrado");
				$("#cpf").val("");
				return false;
			}
			else{
				var c = verificaCPF((valor.replace(/[a-z]/gi,''))); // verifica se o cpf é valido
				if(c == true){
					$("#verifica1").html(b);
					return true;
				}else{
					alert("CPF com formato inválido");
					$("#verifica1").html(a);
					return false;
				}
			}
			
		}
	);
}

function buscarCNPJ(valor){
	var cnpj = valor.length;
	var a = unescape("<img src=\"assets/uncheck.png\" width=\"20px\" height=\"20px\">");
	var b = unescape("<img src=\"assets/check.png\" width=\"20px\" height=\"20px\">");
	if(cnpj < 14){
		$("#verifica1").html(a);
		return; //retorna nulo
	}else if(!validarCNPJ(valor)){
		$("#verifica1").html(a);
		return; //retorna nulo
	}else{
		$.post("control/cadastroControl.php?action=verCPF", {aux: valor}, // envia variaveis por POST para a control cadastroControl
		function(retorno){ //retorno é o resultado que a control retorna
			var a = unescape("<img alt=\"CNPJ inválido ou já cadastrado\" src=\"assets/uncheck.png\" width=\"20px\" height=\"20px\">");
			var b = unescape("<img src=\"assets/check.png\" width=\"20px\" height=\"20px\">");
			if(retorno == 1){ // se retornar 1, neste caso o login ja existe no banco
				$("#verifica1").html(a);  //mostra na div alert
				alert("CNPJ já cadastrado");
				$("#cnpj").val("");
				return false;
			}else{
				var c = validarCNPJ((valor.replace(/[a-z]/gi,''))); // verifica se o cpf é valido
				if(c == true){
					$("#verifica1").html(b);
					return true;
				}else{
					alert("CNPJ com formato inválido");
					$("#verifica1").html(a);
					return false;
				}
			}
		});
	}
}

function verificaCPF(cpf) {
	var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
}

//funcao para validar email
function IsEmail(email){
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;
    if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
    else {return true;}
}
//validar email
function buscarEmail(valor){
	if(IsEmail(valor)){
		$.post("control/cadastroControl.php?action=verEmail", {aux: valor}, // envia variaveis por POST para a control cadastroControl
			function(retorno){ //retorno é o resultado que a control retorna
				if(retorno == 1){
					setTimeout(window.alert("Email já cadastrado"), 1000);
					$("#email").val("");
					return false;
				}else{
					return true;
				}
			}
		);
	}
}
//validar RG
function buscarRG(valor){
	$.post("control/cadastroControl.php?action=verRG", {aux: valor}, // envia variaveis por POST para a control cadastroControl
		function(retorno){ //retorno é o resultado que a control retorna
			if(retorno == 1){ // se retornar 1, neste caso o login ja existe no banco
				//mostra na div alert
				alert("RG já cadastrado");
				$("#rg").val("");
				return false;
			}else{
				return true;
			}

		}
	);
}

function buscarTel(valor){
	$.post("control/cadastroControl.php?action=verTEL", {aux: valor}, // envia variaveis por POST para a control cadastroControl
		function(retorno){ //retorno é o resultado que a control retorna
			if(retorno == 1){ // se retornar 1, neste caso o login ja existe no banco
				//mostra na div alert
				alert("Telefone/celular já cadastrado");
				return false;
			}else{
				return true;
			}

		}
	);
}

function tipoPessoa(value){
	if(value.value == "cpf"){
		document.getElementById("tipoPessoa").style.display = 'none';
		document.getElementById("lblcpf").style.display = 'table-cell';
		document.getElementById("inputcpf").style.display = 'table-cell';
	}else{

		document.getElementById("tipoPessoa").style.display = 'none';
		document.getElementById("lblcnpj").style.display = 'table-cell';
		document.getElementById("inputcnpj").style.display = 'table-cell';
	}
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function buscarAPICorreios(value){
	var cep = value.replace(/\D/g, '');
	if(cep != ""){
		var validacep = /^[0-9]{8}$/;
		if(validacep.test(cep)){
			$.ajax({
				type: 'GET',
	            dataType: 'json',
	            url: '//viacep.com.br/ws/'+ cep +'/json/?callback=?',
	            async: true,
	            success: function(response){
	            	if(!("erro" in response)){
	            		$(".endereco").css("display","table-row");
		            	$("#logradouro").val(response.logradouro);
		            	$("#bairro").val(response.bairro);
		            	$("#uf").val(response.uf);
		            	$("#cidade").val(response.localidade);
		            }else{
		            	alert("CEP inexistente");
		            	$(".endereco").css("display","none");
		            	$("#cep").val("");
		            	$("#logradouro").val("");
		            	$("#bairro").val("");
		            	$("#uf").val("");
		            	$("#cidade").val("");
		            }
	            }
			});
		}else{
			alert("CEP inválido");
			$(".endereco").css("display","none");
        	$("#cep").val("");
        	$("#logradouro").val("");
        	$("#bairro").val("");
        	$("#uf").val("");
        	$("#cidade").val("");
		}
	}
}