var Sfront =
	{
	section: function(q,a){
		a == "h" ? $("#"+q+"").hide() : $("#"+q+"").show()
	}
}
function validarOnPress(event,patron){
	var ev = (event) ? event : event;
	var k =(ev.which) ? ev.which : event.keyCode;
	if (k==8 || k==0 || k == 9 || (k >= 37 && k <= 40)) return true;
	var n = String.fromCharCode(k);
	return patron.test(n);
}

function format_n(n, dp) {
             var w = n, k = w|0, b = n < 0 ? 1 : 0,
			 u = Math.abs(w-k), d = (''+u).substr(2, dp),
			 s = ''+k, i = s.length, r = '';
			 while ( (i-=3) > b ) { r = ',' + s.substr(i, 3) + r; }
			 return s.substr(0, i + 3) + r + (d ? '.'+d: '');
}

var Saction=
	{
		simulacion: "",
		section: "",
		lastinput:"porcentaje_fin_0",
		inputresta:true,
		inputaprox:true,
		Tpagar : 20,
		urttabla: "",
		init: function(){
			this.click("dec1",["chipoteca"],"h")
			//cambio mi tasa
			this.click("dec2",["sec2","sec3","itiempo","linfonavit","cinfonavit","cfovisste","binfonavit","bfovisste","mitasa","amarratucasa","pagos"],"h")
			this.click("dec1",["sec2","pagos","mitasa"],"s")
			this.click("dec2",["chipoteca","itiempo"],"s")
			this.click("vvivienda",["cfovisste","sec3","cinfonavit","ivivienda","ienganche","itiempo","linfonavit","mitasa"],"s")
			this.click("mcredito",["sec3","cfovisste","imonto","cinfonavit","ienganche","itiempo","linfonavit","mitasa"],"s")
			this.click("mcredito",["ivivienda"],"h")
			this.click("vvivienda",["imonto"],"h")
			this.click("vvivienda",["imonto"],"h")
			this.clickchk("chkinfonavit",["binfonavit"],"apoyoFovissste")
			this.clickchk("cofinavit",["bconfinavit"],"infonavit")
			this.clickchk("infonavit",[""],"cofinavit")
			this.clickchk("apoyoFovissste",["bfovisste","Salia2","Srespalda2"],"chkinfonavit")
			this.clickchk("Alia2",["balia2"],"Respalda2")
			this.clickchkpp("Respalda2",["brespalda2"],"Alia2","swmitasa")
			this.clickchk("swmitasa",["amarratucasa"],"Respalda2")
			this.simula();
			this.clicktime();
		},
		click: function(e,q,a){

			$("#"+e+"").click(function() {

				if( e != "dec1"){
					$(".active-button:not(.pagos)").removeClass("active-button");
				}
					
				if(e == "vvivienda" || e == "mcredito" || e == "dec2" || e == "dec1"){
					Saction.reset()
				}

				$(".time:eq(2)").trigger("click");
				
				if(e == "vvivienda" || e == "mcredito"){
					$("#dec1").addClass("active-button");
				}

				$(this).addClass("active-button");

				$.each(q, function( i, v ) {
					a == "h" ? $("#"+v+"").fadeOut( "slow", function() {}) : $("#"+v+"").fadeIn( "slow", function() {

					})

				});

				switch(e){
                    case "vvivienda":
                    	simulador.setRealizarSim("valor de la vivienda");
                    	Saction.simulacion = "valor de la vivienda";
                    	//Saction.urttabla = "Adquisici%C3%B3n%20Hipoteca%20%20Perfiles%20Banamex";
                    break;
                    case "mcredito":
                    	simulador.setRealizarSim("monto del credito");
                    	Saction.simulacion = "monto del credito";
                    	//Saction.urttabla = "Adquisici%C3%B3n%20Hipoteca%20%20Perfiles%20Banamex";
                    break;
                    case "":
                    	simulador.setRealizarSim("pago mensual");
                    break;
                    case "":
                    	simulador.setRealizarSim("ingresos mensuales");
                    break;
					case "dec2":
						simulador.setRealizarSim("cambia tu hipoteca");
						Saction.section = "hipoteca";
						Saction.simulacion = "cambia tu hipoteca";
						//Saction.urttabla = "Cambia%20tu%20Hipoteca%20con%20Hipoteca%20Perfiles%20Banamex";
					break;
                  	case "dec1":
                  		Saction.section = "comprar";
                  	break;
           		}


			});


		},
		hhDynamic: function(element, event){
			var hh = {
				el : Math.abs(parseInt($("#"+element).height())),
				iframe: window.parent.$(".dft-iframe iframe").height()
			}
			//console.log(event, window.parent.$(".dft-iframe iframe"), hh );
			if( !$("#chkinfonavit").hasClass('chk') &&  !$("#cfovisste").hasClass('chk') && event == 'close' && $( window ).width()==1319 && $( window ).width()< 1920){
				console.log("RESET");
				window.parent.$(".dft-iframe iframe").css( 'height', 917);
			}
			else if (!$("#chkinfonavit").hasClass('chk') &&  !$("#cfovisste").hasClass('chk') && event == 'close' && $( window ).width()==1920)	{
					window.parent.$(".dft-iframe iframe").css( 'height', 1118);
			}
			else if( event == 'open'){
				window.parent.$(".dft-iframe iframe").css( 'height', hh.iframe + hh.el);
			}else if( event == 'close'){
				window.parent.$(".dft-iframe iframe").css( 'height', hh.iframe - hh.el);
			}
		},
		clickchk: function(e,q,rad){
			$("#"+e+"").click(function() {
				if($(this).hasClass("chk")){
					$(this).removeClass("chk");a = "h"
				}else{
					$(this).addClass("chk");a = "s"
					simulador.simular();
					if( e != 'swmitasa'){
						Saction.limpiar();
					}
					
				}
				$.each(q, function( i, v ) {
					a == "h" ? $("#"+v+"").fadeOut( "slow", function() { Saction.hhDynamic(v, 'close') }) : $("#"+v+"").fadeIn( "slow", function() {  Saction.hhDynamic(v, 'open') })
				});
				if($("#"+rad+"").hasClass("chk") && a == "s"){$("#"+rad+"").trigger( "click" )}
			});

		},
		clickchkpp: function(e,q,rad,sw){

			$("#"+e+"").click(function() {
				if($(this).hasClass("chk") ){
					$(this).removeClass("chk");
					a = "h"
				}else{
					$(this).addClass("chk");
					a = "s"
					simulador.simular();
					Saction.limpiar();
					
				}

				$.each(q, function( i, v ) {
					a == "h" ? $("#"+v+"").fadeOut( "slow", function() { Saction.hhDynamic(v, 'close') }) : $("#"+v+"").fadeIn( "slow", function() {  Saction.hhDynamic(v, 'open') })
				});
				if( ($("#"+rad+"").hasClass("chk") && a == "s")  )
				{$("#"+rad+"").trigger( "click" )
			}
			if( ($("#"+sw+"").hasClass("chk"))  )
			{$("#"+sw+"").trigger( "click" )
		}
			});

		},
		simula:function(){

			$( "#slider_valorCasa,#valorAprox").focusout(function() {
				$(this).parent().hide()
				var valor = $(this).val();
				var clasificacion = 0;
				var error = $(this).attr("id")
				var campo = $(this).attr("id"); campo = campo += "_txt"
				$("#"+campo+"").parent().show()
				$("#"+campo+"").val("$"+format_n(valor))
				var $errors = $("."+error+"")
				var $errorinput = $("#"+error+"_txt").parent()
				valor = parseInt(valor)
				$(".error_continue").removeClass("failure")
				$(".error_continue").addClass("success")
				var vmin = 500000, vmax = 15000000 ;
				if(valor < vmin){
					//$(this).val(vmin);
					//valor = vmin
					if(error=="valorAprox"){Saction.inputaprox = false}
					$errors.removeClass("success")
					$errors.addClass("failure")
					$errorinput.addClass("input-error")
				}else if(valor > vmax){
					if(error=="valorAprox"){Saction.inputaprox = false}
					//7$(this).val(vmax);
					//valor = vmax
					$errors.removeClass("success")
					$errors.addClass("failure")
					$errorinput.addClass("input-error")
				}else{
					if(error=="valorAprox"){Saction.inputaprox = true}
					$errors.removeClass("failure")
					$errors.addClass("success")
					$errorinput.removeClass("input-error")
				}
				if(campo=="restaCredito_txt"){
					Saction.lastinput = "porcentaje_fin_0"
				}else if(campo=="valorAprox_txt"){
					Saction.lastinput = "porcentaje_fin_1"
				}
				$( "#restaCredito" ).focusout()
				simulador.simular();
				//console.log("out")

			});
			$( "#slider_montoCredito" ).focusout(function() {
				$(this).parent().hide()
				var valor = $(this).val();
				var error = $(this).attr("id")
				var campo = $(this).attr("id"); campo = campo += "_txt"
				$("#"+campo+"").parent().show()
				$("#"+campo+"").val("$"+format_n(valor))
				var $errors = $("."+error+"")
				var $errorinput = $("#"+error+"_txt").parent()
				valor = parseInt(valor)
				$(".error_continue").removeClass("failure")
				$(".error_continue").addClass("success")
				var vmin = 300000, vmax = 10000000 ;
				if(valor < vmin){
					//$(this).val(vmin);
					//valor = vmin
					if(error=="valorAprox"){Saction.inputaprox = false}
					$errors.removeClass("success")
					$errors.addClass("failure")
					$errorinput.addClass("input-error")
				}else if(valor > vmax){
					if(error=="valorAprox"){Saction.inputaprox = false}
					//7$(this).val(vmax);
					//valor = vmax
					$errors.removeClass("success")
					$errors.addClass("failure")
					$errorinput.addClass("input-error")
				}else{
					if(error=="valorAprox"){Saction.inputaprox = true}
					$errors.removeClass("failure")
					$errors.addClass("success")
					$errorinput.removeClass("input-error")
				}
				if(campo=="restaCredito_txt"){
					Saction.lastinput = "porcentaje_fin_0"
				}else if(campo=="valorAprox_txt"){
					Saction.lastinput = "porcentaje_fin_1"
				}
				$( "#restaCredito" ).focusout()
				simulador.simular();
				//console.log("out")

			});
			$( "#restaCredito" ).focusout(function() {
				$(this).parent().hide()
				var campo = $(this).attr("id"); campo = campo += "_txt"
				var valor = $(this).val();
				$("#"+campo+"").parent().show()
				$("#"+campo+"").val("$"+format_n(valor))
				var error = $(this).attr("id")
				var $errors = $("."+error+"")
				var $errorinput = $("#"+error+"_txt").parent()
				var $valorM = $("#valormayor_fin")
				var v_vivienda = parseInt($("#valorAprox").val())
				valor = parseInt(valor)
				var vmin = 300000, vmax = 10000000 ;
				if(valor < vmin){
					//$(this).val(vmin);
					//valor = vmin
					Saction.inputresta = false;
					$errors.addClass("failure")
					$errors.removeClass("success")
					$errorinput.addClass("input-error")
					$valorM.removeClass("failure")
					$valorM.addClass("success")
				}else if(valor > vmax){
					Saction.inputresta = false;
					//$(this).val(vmax)
					//valor = vmax
					$errors.addClass("failure")
					$errors.removeClass("success")
					$errorinput.addClass("input-error")
					$valorM.removeClass("failure")
					$valorM.addClass("success")
				}else if(valor > v_vivienda*.9){
					$valorM.removeClass("success")
					$valorM.addClass("failure")
					$errorinput.addClass("input-error")
					//return false;
					// alert("El valor de tu casa debe ser mayor a lo que resta de tu crédito actual");
				}else{
					Saction.inputresta = true;
					$errors.removeClass("failure")
					$errors.addClass("success")
					$errorinput.removeClass("input-error")
					$valorM.removeClass("failure")
					$valorM.addClass("success")
				}

				simulador.simular();
				
			});
			$( "#restaCredito,#slider_valorCasa,#slider_montoCredito,#valorAprox" ).keypress(function(evnt) {
					var patron = /\d/
					if(!validarOnPress(evnt,patron)){return false}
			});
			$( "#restaCredito_txt,#slider_valorCasa_txt,#slider_montoCredito_txt,#valorAprox_txt" ).click(function(evnt) {
				$(this).parent().hide()
				var campo = $(this).attr("id"); campo = campo.slice(0, -4);
				$("#"+campo+"").parent().show()
				$("#"+campo+"").focus()
				$("#"+campo+"").val("");
			});
			$( "#restaCredito,#slider_valorCasa,#slider_montoCredito,#valorAprox" ).keyup(function(e){
			if(e.keyCode == 13)
				{
					$(this).focusout()
				}
			});
			$( "#enganche" ).change(function() {
				simulador.simular();
			});
		},

		estilos: function(e,q,s){

		},
		clicktime: function(){
			var $time = $(".time")
			$time.on('mouseup',function(e){
				s.linkTrackVars='eVar25,events';
				s.linkTrackEvents='event30';
				s.eVar25=s.pageName+'|Simulador|Plazo|'+$(this).attr('data-time')+'años';
				s.events='event30';
				s.tl(this,'o',s.pageName+'-Page Interaction');
			})
			$time.click(function(){
				$time.removeClass("active-button")
				 $(this).addClass("active-button")
				 Saction.Tpagar = $(this).attr("data-time");
				 Saction.Tpagar = parseInt(Saction.Tpagar)
				 simulador.simular();
				 	switch(Saction.simulacion){
                        case "cambia tu hipoteca" :
						if(!Saction.inputresta || !Saction.inputaprox){
							$(".error_continue").removeClass("success")
							$(".error_continue").addClass("failure")
						}
					; break;

					}
			});
		},
		limpiar:function(){
			$(".clean").val(0)
		},
		reset:function(){
			$("#slider_valorCasa").val(500000)
			$("#slider_valorCasa_txt").val("$500,000")
			$("#slider_montoCredito").val(300000)
			$("#slider_montoCredito_txt").val("$300,000")
			$("#restaCredito").val(300000)
			$("#restaCredito_txt").val("$300,000")
			$("#valorAprox").val(500000)
			$("#valorAprox_txt").val("$500,000")
		}
	}

$( document ).ready(function() {

   var insideIframe = window.top !== window.self;
   if(insideIframe){
	   setTimeout(function(){$(".dft-survey-feedback").hide()},2500);
	   $("#main-header,#main-footer,#botonex").hide()}

   Saction.init()
   simulador.setRealizarSim("valor de la vivienda");
   simulador.simular();

});

var clasificacion = 1;

function mClasificacion(valor){

	if(valor >= 500000 && valor <= 1000000)
		clasificacion = 1;
	else if(valor >= 1000001 && valor <= 5000000)
		clasificacion = 2;
	else if(valor >= 5000001 && valor <= 10000000)
		clasificacion = 3;
	else if(valor >= 10000001 && valor <= 15000000)
		clasificacion = 4;

	if(clasificacion != 0 ){
		s.linkTrackVars='eVar25,events';
		s.linkTrackEvents='event30';
		s.eVar25=s.pageName+'|Simulador|ValorVivienda|Clasificacion'+clasificacion;
		s.events='event30';
		s.tl(this,'o',s.pageName+'-Page Interaction');
	}

	return clasificacion;
}