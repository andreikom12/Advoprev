$(document).ready(function(){
	//abaixo usamos o seletor da jQuery para acessar o botão, e em seguida atribuir à ele um evento de click

	$("#btn_pesquisa").click(function(){
		pesquisaIndice($("#campo"));
	});

	$("#campo").keypress(function handleEnter(e, func) {
        if (e.keyCode == 13 || e.which == 13) {
            pesquisaIndice($("#campo"));
        }
    });

    $("#btn_cadIndice").click(function(){
		var check = document.getElementById('desc').value;
		if(buscarIndice(check) == true){
			//alert("Indice já cadastrado!");
			$("#desc").val("");
			$("#desc").focus();
		}else{
			cadIndice($("#desc"));	
		}
	});

	$("#desc").keypress(function handleEnter(e, func) {
        if (e.keyCode == 13 || e.which == 13) {
            var check = document.getElementById('desc').value;
			if(buscarIndice(check) == true){
				//alert("Indice já cadastrado!");
				$("#desc").val("");
				$("#desc").focus();
			}else{
				cadIndice($("#desc"));	
			}
        }
    });

});

function cadIndice(campo){
	$.post("control/cadastroControl.php?action=cadIndice", {desc: campo.val()}, // envia variaveis por POST para a control cadastroControl
		function(retorno2){ //resultado da control	
			//console.log(retorno2);
			if(retorno2 == true){
				campo.val("");
				alert("Cadastro Efetuado Com Sucesso!");
			}else{
				alert("Erro :(");
			}
		} //function(retorno)
	); //$.post()
	return;
}

function pesquisaIndice(campo){
	if(campo.val() == ""){
		alert("Digite no campo pesquisar");
		campo.focus();
		return;
	}else{
		$.post("control/consultarControl.php?action=pesIndice", {desc: campo.val()}, // envia variaveis por POST para a control cadastroControl
			function(retorno2){ //resultado da control	
				if(retorno2){
					$("#tb1 tbody").html(retorno2);
				}else{
					$("#tb1 tbody").html("<td align=\"center\">Indice não encontrado</td>");
				}
			} //function(retorno)
		); //$.post()
		return;
	}
}

function buscarIndice(valor){
	if(valor == ""){
		alert("Digite algo!");
		return;
	}else{
		var aux = false;
		$.post("control/consultarControl.php?action=checkIndice", {desc: valor}, // envia variaveis por POST para a control cadastroControl
			function(retorno){ //retorno é o resultado que a control retorna
				if(retorno){ // se retornar 1, neste caso o login ja existe no banco
					alert("Indice já cadastrado!");
					aux = true;
				}else{
					aux =  false;
				}
			}
		);
	}
	//console.log(aux);
	return aux;
}