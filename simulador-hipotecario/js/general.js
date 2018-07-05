function cambiarAltura(){
        var altura = $(".contenedor").height();
        var auxAltura = 40; 
        altura = altura + auxAltura;
        try{window.parent.setFrame(altura)}catch(e){}
    }
var msg={poner:true,text:function(mensaje){if(this.poner){try{console.log(mensaje)}catch(e){};}} }
function redondeo(numero, decimales){var flotante = parseFloat(numero);var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);return resultado;}
function formato_numero(numero, decimales, separador_decimal, separador_miles){
    numero=parseFloat(numero);
    if(isNaN(numero)){return "";}
    if(decimales!==undefined){numero=numero.toFixed(decimales);}
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");if(separador_miles){var miles=new RegExp("(-?[0-9]+)([0-9]{3})");while(miles.test(numero)) {numero=numero.replace(miles, "$1" + separador_miles + "$2");}}
    return numero;
}
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
var vMoment = {
    mascara: function (f, objeto,obj2) {
        var obj2_ = (obj2) ? obj2 : false;
        if(!obj2_){
            setTimeout(function () { vMoment[f](objeto) }, 1);
        }else {
            setTimeout(function () { vMoment[f](objeto,obj2) }, 1);
        } 
    },
    'dinero': function (objeto) { 
        objeto.value = objeto.value.replace(/\$/g, '');
        objeto.value = objeto.value.replace(/\s/g, '');
        objeto.value = objeto.value.replace(/[^0-9.]/g, "", "");
        var entero = null;
        var decimal = null;   
        if(objeto.value=="."){objeto.value = "0"+objeto.value;}
        var a = objeto.value.indexOf(".");
        var decimalNum=0;
        if(a!=-1){
            entero = objeto.value.substr(0,a);
            entero = formato_numero( entero , 0,".", ",");
            if(a==objeto.value.length-1){
                objeto.value= entero+'.';
            }else{
                decimal = objeto.value.substr(a+1 ,objeto.value.length-1 );
                decimal = decimal.replace(/\./g, '');    
                objeto.value =  entero+'.'+ decimal;
            }
        }else{
            entero = formato_numero( objeto.value , 0,".", ",")
            objeto.value = entero;
        }
        objeto.value = "$ "+objeto.value;
    }, //Remueve lo que no es numero
    'numero': function (objeto) { objeto.value = objeto.value.replace(/\D/g, ""); }, //Remueve lo que no es numero
    'leatraMasNum': function (objeto) { 
        objeto.value = objeto.value.replace(/[^a-zA-Z0-9ñÑ]/g, ""); 
    }, //Remueve lo que no es (letra o numero )
    'leatraMasNumEspacio': function (objeto) { objeto.value = objeto.value.replace(/[^a-zA-Z0-9ñÑ\sáéíóú� É� ÓÚ#]/g, ""); },   //Remueve lo que no es letra 
	'letra': function (objeto) { objeto.value = objeto.value.replace(/[^a-zA-ZñÑ\s]/g, ""); } //Remueve lo que no es (letra o numero )
}
function ponerValorSlider(s,value){
    s.find("a").html( "$ " + formato_numero( value, 0,".", ",") );         
}
// var slider_montoCredito = $('.slider_montoCredito_').slider({
    // range: "min",
    // value: 300000,
    // min: 300000,
    // max: 10000000,
    // step: 1000,
    // slide:function(event, ui){ponerValorSlider(slider_montoCredito,ui.value);},
    // stop: function(event, ui){
        // ponerValorSlider(slider_montoCredito,ui.value);
        // simulador.simular();
    // } 
// });
// var slider_valorCasa = $('#slider_valorCasa').slider({
    // range: "min",
    // value: 500000,
    // min: 500000,
    // max: 15000000,
    // step: 1000,
    // slide:function(event, ui){ponerValorSlider(slider_valorCasa,ui.value);},
    // stop: function(event, ui){
        // ponerValorSlider(slider_valorCasa,ui.value);
        // simulador.simular();
    // } 
// });
// var slider_mensualidades = $('#slider_mensualidades').slider({
    // range: "min",
    // value: 2000,
    // min: 2000 ,
    // max: 100000,
    // step: 500,
    // slide:function(event, ui){ponerValorSlider(slider_mensualidades,ui.value);},
    // stop: function(event, ui){
        // ponerValorSlider(slider_mensualidades,ui.value);
        // simulador.simular();
    // } 
// });
// var slider_ingresosMensuales = $('#slider_ingresosMensuales').slider({
    // range: "min",
    // value: 15000,
    // min: 15000 ,
    // max: 245000,
    // step: 1000,
    // slide:function(event, ui){ ponerValorSlider(slider_ingresosMensuales,ui.value);},
    // stop: function(event, ui){
        // ponerValorSlider(slider_ingresosMensuales,ui.value);
        // simulador.simular();
    // } 
// });
// var slider_restaCredito= $('#restaCredito').slider({
    // range: "min",
    // value: 300000,
    // min: 300000,
    // max: 10000000,
    // step: 1000,
    // slide:function(event, ui){ ponerValorSlider(slider_restaCredito,ui.value);},
    // stop: function(event, ui){
        // //ponerValorSlider(slider_restaCredito,ui.value);
        // //simulador.simular();
		// ponerValorSlider(slider_restaCredito,ui.value);
		// var aux = slider_valorAprox.slider( "option", "value");
		// if(ui.value>aux*.9){
			// alert("El valor de tu casa debe ser mayor a lo que resta de tu cr�dito actual"); 
			// $(".link_imp").css("display","none");
			// $(".link_tab").css("display","none");
			// $(".btn_int").css("display","none");
			
		// }
		// else{
			// $(".link_imp").css("display","block");
			// $(".link_tab").css("display","block");
			// $(".btn_int").css("display","block");
			// simulador.simular();
		// }
		
			// //dataForm.valorAproxVivienda 
			// //alert(ui.value);
			// //alert();
        // //simulador.simular();
    // } 
// }); 
// var slider_valorAprox= $('#valorAprox').slider({
    // range: "min",
    // value: 500000,
    // min: 500000,
    // max: 15000000,
    // step: 1000,
    // slide:function(event, ui){ ponerValorSlider(slider_valorAprox,ui.value);},
    // stop: function(event, ui){
        // ponerValorSlider(slider_valorAprox,ui.value);
		// var aux = slider_restaCredito.slider( "option", "value");
		// if(aux>ui.value*.9){
			// alert("El valor de tu casa debe ser mayor al 90% de lo que resta de tu cr�dito actual"); 
			// $(".link_imp").css("display","none");
			// $(".link_tab").css("display","none");
			// $(".btn_int").css("display","none");
			
		// }
		// else{
			// $(".link_imp").css("display","block");
			// $(".link_tab").css("display","block");
			// $(".btn_int").css("display","block");
			// simulador.simular();
		// }
			// //dataForm.valorAproxVivienda 
			// //alert(ui.value);
			// //alert();
        
    // } 
// }); 
//----------------- press btn slider ------------------------------
var press = {
    s:null,
    press:false,
    time:null,
    mas:function(s){
        var max = s.slider( "option", "max" )*1;
        var value = s.slider( "option", "value" )*1;
        if(value<max){
            value = value+1000;
            s.slider( "option", "value",value );
            s.find("a").html( "$ " + formato_numero( value, 0,".", ",") );
        }
    },
    menos:function(s){
        var min = s.slider( "option", "min" )*1;    
        var value = s.slider( "option", "value" )*1;
        if(value>min){
            value = value-1000;
            s.slider( "option", "value", value );
            s.find("a").html( "$ " + formato_numero( value, 0,".", ",") );
         }   
    }
}
$(".body").mouseover(function(){event.stopPropagation();clearInterval(press.press);});
$(".botn_menos").mousedown( function(){
    var s = $(this).next().find(">div");
    press.menos(s);
    press.press = setInterval(function(){ press.menos(s); },1000);
}).mouseup(function(){ clearInterval(press.press); simulador.simular(); }).
mouseover(function(){  clearInterval(press.press); }).
mouseout(function(){  clearInterval(press.press); })
$(".botn_mas").mousedown(function(){
    var s = $(this).prev().find(">div");
    press.mas(s);
    press.press = setInterval(function(){ press.mas(s); },1000);
}).mouseup(function(){  clearInterval(press.press); simulador.simular();}).
mouseover(function(){  clearInterval(press.press); }).
mouseout(function(){  clearInterval(press.press); })
$("ui-slider-handle ui-state-default ui-corner-all").mousedown(function(event){
    event.stopPropagation()
});

 
//---------------------------- EVENTOS -----------------------/
$("input[name=clienteBanamex]").change(function(){
    var valor = $("input[name=clienteBanamex]:checked").val();
    simulador.simular();
});
$("input[name=apoyoInfonavit_tipo]").change(function(){
    var valor = $("input[name=apoyoInfonavit_tipo]:checked").val();    
    simulador.simular();
});

$("input[name=apoyoFovissste_tipo]").change(function(){
    var valor = $("input[name=apoyoFovissste_tipo]:checked").val();  
    simulador.simular();
});

$("#enganche").on('change', function(){
    //var valor = $("input[name=apoyoFovissste_tipo]:checked").val();  
    simulador.simular();

    var val = $(this).val().slice(1);
    valF = ( val == '35')?'Mas':'';
    s.linkTrackVars='eVar25,events';
    s.linkTrackEvents='event30';
    s.eVar25=s.pageName+'|Simulador|Enganche|'+ val + valF;
    s.events='event30';
    s.tl(this,'o',s.pageName+'-Page Interaction');
});

// ocultar fragmentos de información
$("input[name=tiempoEnPagar], input[name=financiarGastoInicial]").change(function(){
    simulador.simular();
})
function limpiarFormConfinavit(){}

function verificarCambiarEnganche(){
	if(!$("#apoyoInfonavit").is(":checked") && !$("#apoyoFovissste").is(":checked")){
		$("#enganche option:eq(0)").html("15%")
		$("#enganche option:eq(0)").val(".15")
		$("#enganche ").change()
	}
	else{
		$("#enganche option:eq(0)").html("10%")
		$("#enganche option:eq(0)").val(".10")
		$("#enganche ").change()
		
	}

}

$('#chkinfonavit').change(function(){
    $(".dft-switch__input.chk").not("#chkinfonavit, #swmitasa").trigger("click");
});


$("#apoyoInfonavit").change(function(){
	verificarCambiarEnganche()
    if($(this).is(":checked")  ){
        $('.apoyoInfonavit_content').show();
        if($('#cofinavit').is(":checked")){
            $(".cofinavit_conten").show();
        }else{
            $(".cofinavit_conten").hide();
        }
        
        var b2 = $("#botones2");
        //$(".apoyoInfonavit_content .botones2").html("").append(b2);
		$(".apoyoInfonavit_content .botones2").html(b2);
        
        $("#apoyoFovissste").removeAttr('checked');
        $("#apoyoFovissste").parent().parent().removeClass("selected");
        $('.apoyoFovissste_content').hide();
        simulador.simular();  
    }else{
        $('.apoyoInfonavit_content').hide();
        simulador.simular();
    }
    $('#slider_valorCasa').stop();
});
$("#apoyoFovissste").change(function(){
    $(".dft-switch__input.chk").not("#apoyoFovissste, #swmitasa").trigger("click");
	verificarCambiarEnganche();
    var porcentaje;
    var maxslider;
    if($(this).is(":checked")  ){
        $('.apoyoFovissste_content').show();
        if($('#Alia2').is(":checked")){
            $(".alia2_content").show();
            $("#input_capMAxCred_infosss").show();
            $("#input_pagoMen_infosss").show();
            
        } else{
            $('.apoyoInfonavit_content').show();
            $("#input_capMAxCred_infosss").hide();
            $("#input_pagoMen_infosss").hide();
            
        }

        var b2 = $("#botones2");
        //$(".apoyoFovissste_content .botones2").html("").append(b2);
		$(".apoyoFovissste_content .botones2").html(b2);
         
        $("#apoyoInfonavit").removeAttr('checked');
        $("#apoyoInfonavit").parent().parent().removeClass("selected");
        $('.apoyoInfonavit_content').hide();
        simulador.simular();
    }else{
        $('.apoyoFovissste_content').hide();
        simulador.simular();
    }
});
$("#cofinavit").change(function(){
    if($(this).is(":checked"))
        $(".cofinavit_conten").show();
        simulador.simular();
});
$("#infonavit").change(function(){
    if($(this).is(":checked"))
        $(".cofinavit_conten").hide();
    simulador.simular();  
});
$("#Alia2").change(function(){
    var porcentaje;
    if($(this).is(":checked")){
        $(".alia2_content").show();
        $("#input_capMAxCred_infosss").show();
        $("#input_pagoMen_infosss").show();
    }  
    simulador.simular();
});
$("#Respalda2").change(function(){
    if($(this).is(":checked")){
        $(".alia2_content").show();
        $("#input_capMAxCred_infosss").hide();
        $("#input_pagoMen_infosss").hide();
    }
    simulador.simular();
});
// poner moneda a los campos
 $(".dinero").each(function(){
   $(this)[0].getMoneda = function(){
        var value= $(this).val();
        value = value.replace(/\$/g, '');
        value = value.replace(/\,/g, '');
     return value.trim()*1;
   };
})
//ponertTxtSlider
$(".sliderGenerico .slider").bind("ponerValueTxt",function(){ponerValorSlider($(this),$(this).slider( "option", "value"));});
//reset slider
$(".sliderGenerico .slider").bind("reset",function(){var aux = 0; aux = $(this).slider( "option", "min");ponerValorSlider($(this),aux);$(this).slider( "option", "value",aux);})
setTimeout(function(){
    $(".sliderGenerico .slider").trigger("ponerValueTxt");  
    //var valorcasa = slider_valorCasa.slider( "option", "value");
},500);

function limpiar(){
    $(".sliderGenerico .slider").trigger("reset");    
    $("input[type=text]").val("")
    $("input[type=radio]").removeAttr("checked")
    $(".mascaraRadio").removeClass("selected")
    $("input[type=checkbox]").removeAttr("checked")
    $(".mascaraCheckbox").removeClass("selected")
    $("input[name=tiempoEnPagar][value=20]").attr("checked","true").parent().parent().addClass("selected")
    $("input[name=clienteBanamex][value=NO]").attr("checked","true").parent().parent().addClass("selected")
    $("input[name=financiarGastoInicial][value=SI]").attr("checked","true").parent().parent().addClass("selected")
    $(".cofinavit_conten,.alia2_content").hide();
    $(".apoyoInfonavit_content,.apoyoFovissste_content").hide();
    $("#contenBotones").hide();
    simulador.resetSimulador();   
}


function limpiar2(){
    var info = $("#apoyoInfonavit").is(":checked")
    var fovisss = $("#apoyoFovissste").is(":checked");

    if(fovisss)  
      $("input[name=capMAxCred_infosss], input[name=saldoSub_infosss], input[name=pagoMen_infosss]").val("");
    if(info)
      $("input[name=cred_info], input[name=saldoSub_info], input[name=gastosTitu_info] , input[name=pagoMen_info]  ").val("");
  
}

//-------- funciones en el load ---------------------
$(window).load(function(){
   //----- input -----
        $("input[name=cred_info], input[name=saldoSub_info], input[name=gastosTitu_info], input[name=pagoMen_info], input[name=capMAxCred_infosss], input[name=saldoSub_infosss],input[name=pagoMen_infosss]").val("");
        if (getCookie("tipoCredito") == ""){
            $("#seleccionarCredito").show();
        }else if( getCookie("tipoCredito") == "compraCasa" ){
            simulador.simular();
        }else if( getCookie("tipoCredito") == "cambiaHipoteca" ){

            $(".tabs.eleccion").data("obj").tabSelect(2);
            //$(".cuantoTiempoQuieroPagar").html( $("#cuantoTiempoQuieroPagar").html() );
            //$(".seccionEresClienteBanamex").html( $("#seccionEresClienteBanamex").html() );
            simulador.setRealizarSim("cambia tu hipoteca");
            $("input[name=tiempoEnPagar], input[name=clienteBanamex]").parent().parent().change(function(){
                    simulador.simular();
            })
        }
        //metrica.simulador(1);
});
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
function mostrarSimulador(tipoCredito){
    //metrica.simulador(0,tipoCredito);
    if(tipoCredito == "compraCasa"){
        setCookie("tipoCredito", tipoCredito, 15);
        simulador.simular();
    }else if( tipoCredito == "cambiaHipoteca"){
        setCookie("tipoCredito", tipoCredito, 15);
        
        var seccionEresClienteBanamex = $("#seccionEresClienteBanamex");
        var cuantoTiempoQuieroPagar = $("#cuantoTiempoQuieroPagar");

        var D = $(".accordion").data("obj").getActiveConten(); 
        var div_seccionEresClienteBanamex = D.find(".seccionEresClienteBanamex");
        var div_cuantoTiempoQuieroPagar = D.find(".cuantoTiempoQuieroPagar");
        $(".tabs.eleccion").data("obj").tabSelect(2);
        simulador.setRealizarSim("cambia tu hipoteca");
        $("input[name=tiempoEnPagar], input[name=clienteBanamex]").parent().parent().change(function(){
                simulador.simular();
        })
        $(".tab_2 .cuantoTiempoQuieroPagar .div10Anios").show();
        $(".tab_2 .cuantoTiempoQuieroPagar .div10Anios").removeAttr('disabled');
    }
    $("#seleccionarCredito").hide();
}
function mostrarAyuda(){
    $('.img-overlay-5').css('top',$('.value_AhorroTerminoCredito').position().top-25);
    
    
    if( simulador.getRealizarSim() == "cambia tu hipoteca" ){
        $('.img-overlay-4').css('top',$("#restaCredito").position().top+10);
		//$('.img-overlay-4a').css('top',$("#valorAprox").position().top+50);
        $('.img-overlay-6').css('top',$("#eventComoPagarlos").position().top-20);
        $('.img-overlay-3a').css('top',$("#seccionEresClienteBanamex").position().top);
        $(".dark-overlay3").show();
        
    }else{
        var idAccordion = $(".accordion").data("obj").getActive(); 
        $('.img-overlay-1').css('top',$('a[href="#accordion-1"]').position().top-10); 
        $('.img-overlay-3').css('top',$('#eventCreditosInfo').position().top);
        $('.img-overlay-7').css('top',$('#seccionEresClienteBanamex').position().top);
        $('.img-overlay-8').css('top',$('a[href="#accordion-2"]').position().top);
        $('.img-overlay-8').show();
        if(idAccordion == 0)
            $('.img-overlay-2').css('top',$('#slider_valorCasa').position().top+10); 
        if(idAccordion == 1){
            $('.img-overlay-2').css('top',$('#slider_montoCredito').position().top+10);
            $('.img-overlay-8').css('top',$('a[href="#accordion-3"]').position().top);
        }
         if(idAccordion == 2){
            $('.img-overlay-2').css('top',$("#slider_mensualidades").position().top+10);
            $('.img-overlay-8').hide();
        }
        if(idAccordion == 3){
            $('.img-overlay-8').hide();
            $('.img-overlay-2').css('top',$('#slider_ingresosMensuales').position().top+10);
        }
        $(".dark-overlay2").show();
    }
}

$(document).ready(function() {
    device = (screen.width < 769) ? "-Mobile" : "-ES";
});

$("#pfijos").on("mouseup", function(){
    s.linkTrackVars='eVar25,events';
    s.linkTrackEvents='event30';
    s.eVar25=s.pageName+'|Simulador|TipoPago|Fijos';
    s.events='event30';
    s.tl(this,'o',s.pageName+'-Page Interaction');
});

$("#vvivienda").on("mouseup", function(){
    s.linkTrackVars='eVar25,events';
    s.linkTrackEvents='event30';
    s.eVar25=s.pageName+'|Simulador|TipoCalculo|ValorVivienda';
    s.events='event30';
    s.tl(this,'o',s.pageName+'-Page Interaction');

});

$(".dft-simulador-hipotecario__container").one("mouseup", function(){
    s.linkTrackVars='eVar4,events';
    s.linkTrackEvents='event17';
    s.eVar4=s.pageName+'|Simulador|InicioSimulador';
    s.events='event17';
    s.tl(this,'o',s.pageName+'-Tool Usage Start');
});

var apoyo = "";
$("#cofinavit, #infonavit, #Alia2, #Respalda2, #swmitasa").on('click', function(){
    var id = $(this).attr('id');
    if($(this).is(':checked')){
        if(id == "cofinavit" || id == "infonavit")
            apoyo = "Infonavit-"+id;
        else if(id == "Alia2" || id == "Respalda2")
            apoyo = "Fovissste-"+id;
        else if(id == "swmitasa")
            apoyo = "AmarrarTasa";

        s.linkTrackVars='eVar25,events';
        s.linkTrackEvents='event30';
        s.eVar25=s.pageName+'|Simulador|ApoyoVivienda|'+apoyo;
        s.events='event30';
        s.tl(this,'o',s.pageName+'-Page Interaction');
    }
});

function getDatos(){
    sec1 = ($("#sec1 button.active-button").attr("id") == "dec1") ? "Comprar" : "Cambiar";
    pagos = ($("#pagos button.active-button").attr("id") == "pfijos") ? "Fijos" : "Crecientes";
    sec2 = ($("#sec2 button.active-button").attr("id") == "vvivienda") ? "ValorVivienda" : "MontoCredito";
    enganche = $("#enganche").val().replace(".","");
    tiempo = $("#itiempo button.active-button").attr("data-time");
    amarrar = ( $("#swmitasa").is(":checked") ? "AmarrarTasa" : "" );
    apoyo = (apoyo != "AmarrarTasa") ? apoyo : "";
    s1 = (amarrar!="") ? "-" : "";
    s2 = (apoyo!="") ? "-" : "";
}

$(".meInteresa").click(function(){
    getDatos();
    s.linkTrackVars='eVar4,events';
    s.linkTrackEvents='event18';
    s.eVar4=s.pageName+'|Simulador|SimulacionTerminada|'+sec1+"-"+pagos+"-"+sec2+"-Clasificacion"+clasificacion+"-"+enganche+"%-"+tiempo+"a�os"+s1+amarrar+s2+apoyo;
    s.events='event18';
    s.tl(this,'o',s.pageName+'-Tool Usage Complete');
});

$("#tabla-amortizacion").click(function(){
    getDatos();
    s.linkTrackVars='eVar25,events';
    s.linkTrackEvents='event30';
    s.eVar25=s.pageName+'|Simulador|TablaAmortizacion|'+sec1+"-"+pagos+"-"+sec2+"-Clasificacion"+clasificacion+"-"+enganche+"%-"+tiempo+"a�os"+s1+amarrar+s2+apoyo;
    s.events='event30';
    s.tl(this,'o',s.pageName+'-Page Interaction');
});

$("#slider_valorCasa, #restaCredito, #valorAprox").on("blur", function(){
    mClasificacion($(this).val());
});
