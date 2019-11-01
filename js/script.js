var app = angular.module('chevyplan',[]);
app.controller('FormularioRegistroCtrl', function(){
	var Formulario = this;
	//-- Constantes
	Formulario.ListadoTipoDocumentos = [
		{ Nombre: 'Tipo de documento', Codigo: -1 },
		{ Nombre: 'Tarjeta de identidad', Codigo: 1 },
		{ Nombre: 'Cédula ciudadanía', Codigo: 2 },
		{ Nombre: 'Pasaporte', Codigo: 3 }
	];
	Formulario.TipoDocumentoCliente = Formulario.ListadoTipoDocumentos[0];
	
	Formulario.ListadoPaises = [{numericCode: -1, Nombre: 'País'}];
	ObtenerPaises();
	Formulario.PaisCliente = Formulario.ListadoPaises[0];
	
	Formulario.PoliticaPrivacidad = false;
	
	$('#NombreCliente').bind('keypress', MascaraLetras);
	$('#NumeroDocumentoCliente').bind('keypress', MascaraNumero);
	$('#CelularCliente').bind('keypress', MascaraNumero);
	
	Formulario.ValidacionFormulario = function () {
		$(".alertError").remove();
		LimpiarEstiloError();
		var ErrNombreClie = false;
		var ErrTipoDocuClie = false;
		var ErrNumeroDocuClie = false;
		var ErrPaisClie = false;
		var ErrCelularClie = false;
		var ErrCorreoClie = false;
		var ErrCheckTerminos = false;
		
		if(Formulario.NombreCliente == "" || Formulario.NombreCliente == undefined || Formulario.NombreCliente == null){
			ErrNombreClie = true;
			$("#NombreCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#NombreCliente").addClass("CustImput-error");
		}
			
		if(Formulario.TipoDocumentoCliente.Codigo == -1){
			ErrTipoDocuClie = true;
			$("#TipoDocumentoCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#TipoDocumentoCliente").addClass("CustImput-error");
		}
		
		if(Formulario.NumeroDocumentoCliente == "" || Formulario.NumeroDocumentoCliente == undefined || Formulario.NumeroDocumentoCliente == null){
			ErrNumeroDocuClie = true;
			$("#NumeroDocumentoCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#NumeroDocumentoCliente").addClass("CustImput-error");
		}
		else{
			if(Formulario.NumeroDocumentoCliente.length < 6 || Formulario.NumeroDocumentoCliente.length > 10){
				ErrNumeroDocuClie = true;
				$("#NumeroDocumentoCliente").after('<div class="alertError">Debe ser mayor a 6 digitos y menor a 10.</div>');
				$("#NumeroDocumentoCliente").addClass("CustImput-error");
			}
		}
		
		if(Formulario.PaisCliente.numericCode == -1){
			ErrPaisClie = true;
			$("#PaisCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#PaisCliente").addClass("CustImput-error");
		}
		
		if(Formulario.CelularCliente == "" || Formulario.CelularCliente == undefined || Formulario.CelularCliente == null){
			ErrCelularClie = true;
			$("#CelularCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#CelularCliente").addClass("CustImput-error");
		}
		else{
			if(Formulario.CelularCliente.length != 10){
				ErrCelularClie = true;
				$("#CelularCliente").after('<div class="alertError">Debe ser de 10 digitos.</div>');
				$("#CelularCliente").addClass("CustImput-error");
			}
		}
		
		if(Formulario.CorreoCliente == "" || Formulario.CorreoCliente == undefined || Formulario.CorreoCliente == null){
			ErrCorreoClie = true;
			$("#CorreoCliente").after('<div class="alertError">Campo Requerido.</div>');
			$("#CorreoCliente").addClass("CustImput-error");
		}
		else{
			if(ValidarCorreo(Formulario.CorreoCliente) == false){
				ErrCorreoClie = true;
				$("#CorreoCliente").after('<div class="alertError">Formato no permitido.</div>');
				$("#CorreoCliente").addClass("CustImput-error");
			}
		}
		
		if(Formulario.PoliticaPrivacidad == false){
			ErrCheckTerminos = true;
			$("#LabelPoliticasPrivacidad").after('<div class="alertError">Debe aceptar politicas de privacidad.</div>');
		}
		
		if(ErrNombreClie == false && ErrTipoDocuClie == false && ErrNumeroDocuClie == false && ErrPaisClie == false && ErrCelularClie == false &&
		   ErrCorreoClie == false && ErrCheckTerminos == false){
			   alert("Información enviada Exitosamente , Gracias");
			   location.reload();
		}
	};

	function LimpiarEstiloError(){
		$("#NombreCliente").removeClass("CustImput-error");
		$("#TipoDocumentoCliente").removeClass("CustImput-error");
		$("#NumeroDocumentoCliente").removeClass("CustImput-error");
		$("#PaisCliente").removeClass("CustImput-error");
		$("#CelularCliente").removeClass("CustImput-error");
		$("#CorreoCliente").removeClass("CustImput-error");
	}

	function MascaraLetras(event) {
	   var value = String.fromCharCode(event.which);
	   var pattern = new RegExp(/[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/i);
	   return pattern.test(value);
	}
	function MascaraNumero(event) {
	   var value = String.fromCharCode(event.which);
	   var pattern = new RegExp(/[0-9]/i);
	   return pattern.test(value);
	}
	function ValidarCorreo(strcorreo) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(strcorreo);
	}
	function ObtenerPaises(){
		$.ajax({
			url: "https://restcountries.eu/rest/v2/all",
		}).then(function(data) {
		   for(var i = 0; i< data.length; i++){
			   Formulario.ListadoPaises.push({numericCode: data[i].numericCode, Nombre: data[i].translations.es});
		   }
		});
	}
	/*$('.CustImput').focus(function() {
		$('label[for="' + this.id + '"]').addClass('labelfocus');
	}).blur(function() {
		if($('.CustImput').val() == ""){
			$('label[for="' + this.id + '"]').removeClass('labelfocus');
		}
	});
	$(".CustSelect").change(function(){
	  if($('.CustSelect').val() == "0"){
			$('label[for="' + this.id + '"]').removeClass('labelfocus');
		}
		else{
			$('label[for="' + this.id + '"]').addClass('labelfocus');
		}
	});*/
});
