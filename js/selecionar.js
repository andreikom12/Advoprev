$(document).ready(function(){
	//abaixo usamos o seletor da jQuery para acessar o botão, e em seguida atribuir à ele um evento de click
	$("#btn_acesso1").click(function(){
		
		$("#container1").html('');
		$("#container1").load('cadastroUsuarios.php');
	});

	$("#btn_acesso2").click(function(){
		
		$("#container1").html('');
		$("#container1").load('consultarUsuarios.php');
	});

	$("#btn_mostra2").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarPessoas.php');
	});

	$("#btn_mostra3").click(function(){
		$("#container1").html('');
		$("#container1").load('cadastroPessoas.php');
	});

	$("#btn_assuntos1").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarIndices.php');
	});

	$("#btn_assuntos2").click(function(){
		$("#container1").html('');
		$("#container1").load('cadastroIndices.php');
	});

	$("#btn_vara1").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarVaras.php');
	});

	$("#btn_vara2").click(function(){
		$("#container1").html('');
		$("#container1").load('cadastroVaras.php');
	});

	$("#btn_processo1").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarProcessos.php');
	});

	$("#btn_processo2").click(function(){
		$("#container1").html('');
		$("#container1").load('cadastroOpcaoProcesso.php');
	});

	$("#btn_processo3").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarPartes.php');
	});

	$("#btn_processo4").click(function(){
		$("#container1").html('');
		$("#container1").load('andamentos.php');
	});

	$("#btn_relatorio1").click(function(){
		$("#container1").html('');
		$("#container1").load('relatorioProcessos.php');
	});

	$("#btn_relatorio2").click(function(){
		$("#container1").html('');
		$("#container1").load('relatorioAndamentos.php');
	});

	$("#btn_relatorio3").click(function(){
		$("#container1").html('');
		$("#container1").load('relatorioIndices.php');
	});

	$("#btn_tipos1").click(function(){
		$("#container1").html('');
		$("#container1").load('consultarTipos.php');
	});

	$("#btn_tipos2").click(function(){
		$("#container1").html('');
		$("#container1").load('cadastrarTipos.php');
	});
});