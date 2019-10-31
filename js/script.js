var Paises = [];
ObtenerPaises();
$('#NombreCliente').bind('keypress', MascaraLetras);
$('#NumeroDocumentoCliente').bind('keypress', MascaraNumero);
$('#CelularCliente').bind('keypress', MascaraNumero);

function ValidacionFormulario(){
	$(".alertError").remove();
	var ErrNombreClie = false;
	var ErrTipoDocuClie = false;
	var ErrNumeroDocuClie = false;
	var ErrPaisClie = false;
	var ErrCelularClie = false;
	var ErrCorreoClie = false;
	var ErrCheckTerminos = false;
	
	if(NombreCliente.value == ""){
		ErrNombreClie = true;
		$("#NombreCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
		
	if(TipoDocumentoCliente.value == "0"){
		ErrTipoDocuClie = true;
		$("#TipoDocumentoCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
	
	if(NumeroDocumentoCliente.value == ""){
		ErrNumeroDocuClie = true;
		$("#NumeroDocumentoCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
	else{
		if(NumeroDocumentoCliente.value.length < 6 ){
			ErrNumeroDocuClie = true;
			$("#NumeroDocumentoCliente").after('<div class="alertError">Debe ser mayor a 6 digitos.</div>');
		}
	}
	
	if(PaisCliente.value == ""){
		ErrPaisClie = true;
		$("#PaisCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
	
	if(CelularCliente.value == ""){
		ErrCelularClie = true;
		$("#CelularCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
	
	if(CorreoCliente.value == ""){
		ErrCorreoClie = true;
		$("#CorreoCliente").after('<div class="alertError">Campo Requerido.</div>');
	}
	else{
		if(ValidarCorreo(CorreoCliente.value) == false){
			ErrCorreoClie = true;
			$("#CorreoCliente").after('<div class="alertError">Formato no permitido.</div>');
		}
	}
	
	if(PoliticaPrivacidad.checked == false){
		ErrCheckTerminos = true;
		$("#LabelPoliticasPrivacidad").after('<div class="alertError">Debe aceptar politicas de privacidad.</div>');
	}
	
	if(ErrNombreClie == false && ErrTipoDocuClie == false && ErrNumeroDocuClie == false && ErrPaisClie == false && ErrCelularClie == false &&
	   ErrCorreoClie == false && ErrCheckTerminos == false){
		   alert("Información enviada Exitosamente , Gracias");
		   location.reload();
	}
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
        url: "https://restcountries.eu/rest/v2/all"
    }).then(function(data) {
	   for(var i = 0; i< data.length; i++){
		   Paises.push({numericCode: data[i].numericCode, Nombre: data[i].translations.es});
	   }
	   //console.log(Paises);
	   for(var i = 0; i< Paises.length; i++){
		   $('#PaisCliente').append(new Option(Paises[i].Nombre, Paises[i].numericCode));
	   }
    });
}

$('.CustImput').focus(function() {
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
});
