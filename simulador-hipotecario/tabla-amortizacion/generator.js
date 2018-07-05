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
    }
}
function redondeo(numero, decimales){var flotante = parseFloat(numero);var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);return resultado;}
function formato_numero(numero, decimales, separador_decimal, separador_miles){
    numero=parseFloat(numero);
    if(isNaN(numero)){return "";}
    if(decimales!==undefined){numero=numero.toFixed(decimales);}
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");if(separador_miles){var miles=new RegExp("(-?[0-9]+)([0-9]{3})");while(miles.test(numero)) {numero=numero.replace(miles, "$1" + separador_miles + "$2");}}
    return numero;
}

function formato_prepago(numero, decimales, separador_decimal, separador_miles){

    numero=parseFloat(numero);
    if(isNaN(numero)){return "";}
    if(decimales!==undefined){numero=numero.toFixed(decimales);}
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");
    if(separador_miles){var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
    }
    return numero;
}
function clearCad(cad) {
    var cadAux = cad;
    cadAux = cadAux.replace(/"/gi, "");
    cadAux = cadAux.replace(/'/gi, "");
    cadAux = cadAux.replace(/<script>.*<\/script>/gi, "");
    cadAux = cadAux.replace(/</gi, "");
    cadAux = cadAux.replace(/>/gi, "");
    cadAux = cadAux.replace(/"%3C"/gi, "");
    cadAux = cadAux.replace(/%3E/gi, "");
    cadAux = cadAux.replace(/script/gi, "");
    return cadAux
}
function getUrlVars3(f) {
    var d = {};
    var e = clearCad(f).replace(/[?&]+([^=&]+)=([^&]*)/gi, function (g, b, a) {
        d[b] = a
    });
    return d
}
function PAGO(A1,B1,C1,i){
    var aux = Math.pow((1+A1),-B1);
    var aux2 = (A1)*C1/(1-(aux)); 
    return aux2;  
    
}

function calculaCAT(array){
    var mtir = (tir(array).toFixed(10))/100;
    var mycat = (Math.abs(Math.pow((mtir+1),12))-1)*100;
    mycat = (mycat*10)/10;
    CAT = mycat;
    return CAT;
}
function vpl(taxa, arrPrepago){
        var ret = arrPrepago[0];
        
        for (var i=1; i<arrPrepago.length; i++)
            ret += arrPrepago[i] / Math.pow( (1.0 + taxa), i);
        return ret;
}
        
function tir(arrPrepago){   
    var ret = -1000000000.0;
    var juros_inicial = -1.0;
    var juros_medio = 0.0;
    var juros_final = 1.0;
    var vpl_inicial = 0.0;
    var vpl_final = 0.0;
    var vf = 0.0;
    var erro = 1e-5;
    
        for (var i=0; i<100; i++) {
        vpl_inicial = vpl(juros_inicial, arrPrepago);
      vpl_final = vpl(juros_final, arrPrepago);
      if (sinal(vpl_inicial) != sinal(vpl_final))
        break;
      juros_inicial -= 1.0;
      juros_final += 1.0;
    };

    var count = 0;
    for (;;) {
      var juros_medio = (juros_inicial + juros_final) / 2.0;        
      var vpl_medio = vpl(juros_medio, arrPrepago)
       
      if (Math.abs(vpl_medio) <= erro) {
          return juros_medio*100.0;
      }
      if (sinal(vpl_inicial) == sinal(vpl_medio)) {
            juros_inicial = juros_medio;
          vpl_inicial = vpl(juros_medio, arrPrepago);          
      } else {
            juros_final = juros_medio;
          vpl_final = vpl(juros_medio, arrPrepago);          
      }
      if (++count > 10000)
        throw "looping inválido";
    }
    return ret;
}

function sinal(x) {
    return x < 0.0 ? -1 : 1;
}

var color = "#FFF"; 


//function para calcular pago al credito
function calculaPagoCredito(saldoTotal,plazoCredito){
    var pagoCredito =Math.ceil((PAGO(tasa/12,plazoCredito,-1000))*-100)/100000
    pagoCredito = (pagoCredito * saldoTotal);
    return pagoCredito;
}

function pintarTabla(mensualidad,saldo,tasa,plazo,valorCasa,ap_patronal,prepago,i,change,x){

    var change;
    var i =  (i) ? i : 1;
    var x =  (x) ? x : 1;
    var pagoAlCredito = (i) ? mensualidad : 0;
    var pagoTotal = 0;
    var dato  = null;
    var t = $("#contentTable");
    var contadoGris= 1;
    var aportacionPatronal = 0;
    var prepago = prepago > 0 ? prepago : 0;
    var numLi = t.find("tr").length;

    for(var k = i ;numLi>=k ; k++){
        $("#"+k).remove();
    }

    if( change == 'true'){
        mensualidad = calculaPagoCredito(saldo,plazo*12)-(i-1),tasa;     
    }

   var contador = 1 ;
  if(i<=1){
        contador =1;
    }
    else if (i <13)
        contador = i;
    else{    
        var ult = t.find(".divisionAnos").last();
        contador = i - ult.attr("id");
    }

    switch(tipoPago){

        case "pfijos":
            arrPagoTotal = arrPagoTotal.slice(0,i);
            var seguroDanios= (valorCasa*.80)*(.0003*100)/100;
            var seguroVida= Math.round(0.0005*montoCredito);
            var aux3 = mensualidad;
            var flgpago = 0;
            var pagoAnterior =0;
            var ingresoMin_req = ingreso;
            var ap_patronal = ap_patronal;
            var plazoFor;
            
            for( i ; i<= (plazo*12) ; i++){

                var  classFondo="";
                contador ++;
                var style = "";
                var interes  = tasa*saldo/12;
                var aux1  = 0;
                var aux2  = 0;

                if( i == 1  ){
                    pagoAlCredito = calculaPagoCredito(saldo,plazo*12);
                }else if(saldo == 0){
                    pagoAlCredito = 0;
                }else if(saldo >= 0){

                    var calculoSaldoInteres = saldo + interes;
                    var calculoComparativo = 0;
                    var calculoIf = 0;
                    var calculoElse  = 0;
                    let prepagoValue = 0;
                    prepagoValue = $(".prepago")[i-2];
                    prepagoValue = parseInt($(prepagoValue).val());
                    
                    var sumaFL = pagoAlCredito + seguroVida + seguroDanios  + ap_patronal + prepagoValue;
                    var sumaFI = pagoAlCredito + seguroVida + seguroDanios;
                    
                    if(prepagoValue >= sumaFI){
                        calculoComparativo = calculaPagoCredito(saldo,(plazo*12 - (i - 1) ))
                    }
                    else{
                        calculoComparativo = pagoAlCredito;
                    } 

                    if( conPrepago == 'true' && tipoprod == 'infonavit' && tipocalc == 'valorVivienda' || conPrepago == 'true' && tipoprod == 'infonavit' && tipocalc == 'montoCredito' || tipoprod == "adquisicion" || tipoprod == 'respalda2'  ||  tipoprod == 'alia2' || tipoprod == 'cofinavit'){

                        if(calculoSaldoInteres < calculoComparativo){
                            pagoAlCredito = calculoSaldoInteres;
                        }else{
                            if(prepagoValue >= sumaFI){
                                pagoAlCredito = calculaPagoCredito(saldo,(plazo*12 - (i - 1) ),tasa)
                            }else{
                                pagoAlCredito = pagoAlCredito;
                            }        
                        }

                    }

                }

                var amortizacion = pagoAlCredito-interes.toFixed(11);
                seguroVida = saldo*0.0005;
                seguroVida = parseFloat(seguroVida.toFixed(11));
                pagoTotal = pagoAlCredito+seguroVida+seguroDanios+prepago;
                pagoTotal = parseFloat(pagoTotal.toFixed(11))

                if( conPrepago == 'true'){
                    if(i == 1)
                        auxTotal = pagoTotal;
                    
                    if(saldo<=0){
                        pagoTotal = 0;
                    }else{
                        pagoTotal = auxTotal;
                    }
                }

                //conPrepago : variable global
                if( conPrepago == 'true' && prepago == 0  &&  (i % 2 == 0)  ){

                    var mensual_30d = apoyo_infonavit*30.4;
                    var ingresoMin_25sm = mensual_30d*25;
                    var sm_maxMensual = ingresoMin_25sm*0.05;
                    var aportacionBimestral = sm_maxMensual*2;
                    var _ingresoMin = pagoTotal/.35;

                    if( ingresoMin_req > ingresoMin_25sm ){
                      aportacionPatronal = sm_maxMensual*2;
                    }else{
                       aportacionPatronal = ingresoMin_req*.10;
                    }

                    if(_ingresoMin>ingresoMin_25sm){
                        aportacionPatronal  = aportacionBimestral;
                    }else{
                        aportacionPatronal  = _ingresoMin*0.10;
                    }

                    //Aportación Patronal
                    if( (amortizacion+aportacionPatronal)<saldo ){
                        if( saldo<=0 ){
                            ap_patronal = 0;
                        }else{
                            ap_patronal = aportacionPatronal;
                        }
                    }else{
                        ap_patronal = saldo-amortizacion;
                    }

                }

                if( ap_patronal > 0  &&  (i % 2 == 0)){
                    ap_patronal = ap_patronal;
                }
                else{
                    
                    ap_patronal = 0;
                }

                if( conPrepago == 'true'){
                    arrPagoTotal[i] = Math.round(pagoAlCredito+seguroVida+seguroDanios+ap_patronal+prepago);
                    pagoTotal = arrPagoTotal[i];
                    arrPagoTotal[i] = Math.round(pagoAlCredito+seguroVida+seguroDanios+ap_patronal);
                }else{
                    arrPagoTotal[i] = Math.round(pagoAlCredito+seguroVida+seguroDanios);
                }

                if(saldo<ap_patronal && saldo-amortizacion-prepago<=0){
                    saldoFinal = 0;
                }else{
                    saldoFinal = saldo-ap_patronal-prepago-amortizacion;
                }

                if(i%2 == 1)
                    classFondo = 'bg_1';
                
                style = ' style="background-color:'+color+'"';
                if(contador > 12 && i< (plazo*12)){
                    classFondo = classFondo + ' divisionAnos'; 
                    contador = 1;
                }

                var th_toggle = "";
                if( tipoprod == "infonavit" ){
                    if( (i % 2 == 0) ){
                        $(".th_toggle").html("Aportación <br/> patronal")
                        th_toggle = '<th>$'+formato_numero(Math.round(ap_patronal), 0, ".", ",")+'</th>';
                    }else{
                        $(".th_toggle").html("Comisión <br/>por admon")
                        th_toggle = '<th></th>';
                    }
                }else{
                    $(".th_toggle").html("Comisión <br/>por admon")
                    th_toggle = '<th>$ 0.00</th>';
                }

                var li =$( '<tr '+style+'class="'+classFondo+'" id="'+i+'"  >'+
                            '<th class="center  ">'+i+'</th>'+
                            '<th>$'+formato_numero(Math.round(saldo), 0, ".", ",") +'</th>'+
                            '<th>'+(formato_numero(tasa*100, 2, ".", ","))+'%</th>'+
                            '<th>$'+formato_numero(Math.round(interes), 0, ".", ",")+'</th>'+
                            '<th>$'+formato_numero(Math.round(amortizacion), 0, ".", ",")+'</th>'+
                            '<th>$'+formato_numero(Math.round(pagoAlCredito), 0, ".", ",")+'</th>'+
                            '<th>$' + formato_numero(Math.round(seguroVida),0,".",",") + '</th>'+
                            '<th>$' + formato_numero(Math.round(seguroDanios),0,".",",") + '</th>'+
                            th_toggle+
                            '<th>$'+formato_numero(Math.round(pagoTotal), 0, ".", ",")+'</th>'+
                            '<th><span class="content_dinero"></span></th>'+
                            '<th>$'+formato_numero(Math.round( (saldoFinal < 1 ) ? 0 : saldoFinal), 0, ".", ",")+'</th>'+
                            '</tr>');

                pagoTotalAux = pagoTotal;   
                var input =$('<input class="prepago"  maxlength="16" value=" '+formato_prepago(Math.round(prepago), 2, ".", ",")+'"/>');

                aux1=prepago;
                aux2 = pagoAlCredito;
                
                if(aux1>aux2)
                    flgpago = 1;
                else
                    flgpago = 0;
                    
                aux3 = pagoAlCredito;
                prepago = 0;
                  
                input[0].datos={
                    i: i,
                    saldo:saldo,
                    tasa:tasa,
                    plazo:plazo,
                    valorCasa:valorCasa,
                    ap_patronal:ap_patronal,
                    mensualidad:pagoAlCredito

                }
                //pagoAnterior = pagoTotal;
                input.addClass("prepago");
                input.addClass("dinero");
                input[0].getMoneda = function(){
                    var value = $(this).val();
                    value = value.replace(/\$/g, '');
                    value = value.replace(/\,/g, '');
                    return  value.trim()*1;
                };
               
                input.keypress(function(){
                    vMoment.mascara('dinero',this)
                }).keyup(function(e){

                    if(e.keyCode==13){
                        if( this.getMoneda()>this.datos.saldo){
                            alert("El prepago no puede exceder el saldo");
                        }else{
                            indice = this.datos.indice;
                            change = 'true';
                            pintarTabla(this.datos.mensualidad,this.datos.saldo,this.datos.tasa,this.datos.plazo,this.datos.valorCasa,this.datos.ap_patronal,this.getMoneda(),this.datos.i,change);
                        }
                    }

                    }).focusout(function(){
                        if( this.getMoneda()>this.datos.saldo){
                            alert("El prepago no puede exceder el saldo");
                        }else{
                            indice = this.datos.indice;
                            change = 'true';
                            pintarTabla(this.datos.mensualidad,this.datos.saldo,this.datos.tasa,this.datos.plazo,this.datos.valorCasa,this.datos.ap_patronal,this.getMoneda(),this.datos.i,change);
                        }
                    }).one('keypress', function(){
                        s.linkTrackVars='eVar25,events';
                        s.linkTrackEvents='event30';
                        s.eVar25=s.pageName+'|EscrituraPrepago';
                        s.events='event30';
                        s.tl(this,'o',s.pageName+'-Page Interaction');
                    });
                    
                li.find(".content_dinero").append(input);         
                t.append(li);

                saldo = (saldoFinal<=0.9) ?  0 : saldoFinal ;

                if(saldoFinal<=0) break;
                if(saldoFinal>saldo) break;

            }//for

            var ie = navigator.userAgent.toLowerCase();
            var version = parseInt(ie.split('msie')[1]);
            arrPagoTotal[0] = (-1)*montoCredito+comisionApertura*(1)+avaluo*(1);
            var cat =  calculaCAT( arrPagoTotal );
            $("span#cat").text(formato_numero(cat, 1, ".", ",")); 

        break;

        case "pcrecientes":

            var seguroDanios= (valorCasa*.80)*(0.3)/1000;
            var pagoxmil =((tasa*100) == 10.75)?9.10:8.89; 
            var incrementoAnual = 0.02;
            var ap_patronal = ap_patronal;
            var gastoInicial = parseFloat(comisionApertura)+parseFloat(avaluo);

            interes = (saldo*tasa)/12;
            amortizacion = saldo*tasa/12;

            for( i ; i<= (plazo*12) ; i++){
                
                interes = (saldo*tasa)/12;
                pagoAlCreditoPC[i] = saldo*pagoxmil/1000;

                if(i == 1){
                    arrPagoTotal2[0] = (-1*saldo)+gastoInicial;
                }else if(i > 1){
                    if(saldo+interes<pagoAlCreditoPC[i-1]){
                        pagoAlCreditoPC[i] = saldo+interes;
                    }else{
                        if(x > 12){
                            pagoAlCreditoPC[i] = pagoAlCreditoPC[i-1]+pagoAlCreditoPC[i-1]*incrementoAnual;
                            x = 1;
                        }else{
                            pagoAlCreditoPC[i] = pagoAlCreditoPC[i-1];
                        }

                    }
                }

                seguroVida = (saldo*0.0005<=0) ? 0 : saldo*0.0005;
                seguroDanios = (saldo<=0)? "" : seguroDanios;
                amortizacion = (saldo == 0) ? 0 : pagoAlCreditoPC[i]-interes;

                //conPrepago : variable global
                if( conPrepago == 'true' && prepago == 0  &&  (i % 2 == 0)  ){
                    //aportación patronal
                    ingresoRequerido = arrPagoTotal[1]/0.3375;
                    apoyo_infonavit=80.60;
                    mensual_30d = apoyo_infonavit*30.4;
                    ingresoMin_25sm = mensual_30d*25;
                    sm_maxMensual = ingresoMin_25sm*0.05;

                    aportacionPatronal = (ingresoRequerido>ingresoMin_25sm)? sm_maxMensual*2 : ingresoRequerido*0.10;

                    if((amortizacion+aportacionPatronal)<saldo){
                        ap_patronal = (saldo<=0)? 0 : aportacionPatronal;
                    }else{
                        ap_patronal = saldo-amortizacion;  
                    }

                }

                if( ap_patronal > 0  &&  (i % 2 == 0)){
                    ap_patronal = ap_patronal;
                }
                else{
                    
                    ap_patronal = 0;
                }

                if( conPrepago == 'true'){
                    saldoFinal = (saldo<ap_patronal)? 0 : saldo-ap_patronal-prepago-amortizacion;
                    arrPagoTotal[i] = pagoAlCreditoPC[i]+seguroVida+seguroDanios+prepago+ap_patronal;
                }else{
                    saldoFinal = (saldo-amortizacion-prepago <= 0) ? 0 : (saldo-amortizacion-prepago);
                    arrPagoTotal[i] = pagoAlCreditoPC[i]+seguroVida+seguroDanios+prepago;
                }

                arrPagoTotal2[i] = arrPagoTotal[i]-prepago;

                if(i%2 == 1)
                    classFondo = 'bg_1';
                
                style = ' style="background-color:'+color+'"';
                if(contador > 12 && i< (plazo*12)){
                    classFondo = classFondo + ' divisionAnos'; 
                    contador = 1;
                }

                var th_toggle = "";

                if( tipoprod == "infonavit" ){
                    $(".th_toggle").html("Aportación <br/> patronal");

                    if( (i % 2 == 0) ){
                        th_toggle = '<th>$'+formato_numero(Math.round(ap_patronal), 0, ".", ",")+'</th>';
                    }else{
                        th_toggle = '<th></th>';
                    }

                }else{
                    $(".th_toggle").html("Comisión <br/>por admon")
                    th_toggle = '<th>$ 0.00</th>';
                }

                var li =$( '<tr '+style+'class="'+classFondo+'" id="'+i+'"  >'+
                            '<th class="center  ">'+i+'</th>'+
                            '<th>$'+formato_numero(saldo, 2, ".", ",") +'</th>'+
                            '<th>'+(formato_numero(tasa*100, 2, ".", ","))+' %</th>'+
                            '<th>$'+formato_numero(interes, 2, ".", ",")+'</th>'+
                            '<th>$'+formato_numero(amortizacion, 2, ".", ",")+'</th>'+
                            '<th>$'+formato_numero(pagoAlCreditoPC[i], 2, ".", ",")+'</th>'+
                            '<th>$' + formato_numero(seguroVida,2,".",",") + '</th>'+
                            '<th>$' + formato_numero(seguroDanios,2,".",",") + '</th>'+
                            th_toggle+
                            '<th>$'+formato_numero(arrPagoTotal[i], 2, ".", ",")+'</th>'+
                            '<th><span class="content_dinero"></span></th>'+
                            '<th>$'+formato_numero((saldoFinal < 1 ) ? 0 : saldoFinal, 2, ".", ",")+'</th>'+
                            '</tr>');

                pagoTotalAux = pagoTotal;   
                var input =$('<input class="prepago"  maxlength="16" value=" '+formato_prepago(Math.round(prepago), 2, ".", ",")+'"/>');

                aux1=prepago;
                aux2 = pagoAlCreditoPC[i];
                
                if(aux1>aux2)
                    flgpago = 1;
                else
                    flgpago = 0;
                    
                aux3 = pagoAlCreditoPC[i];
                prepago = 0;
                  
                input[0].datos={
                    i: i,
                    saldo:saldo,
                    tasa:tasa,
                    plazo:plazo,
                    valorCasa:valorCasa,
                    ap_patronal:ap_patronal,
                    mensualidad:pagoAlCreditoPC[i],
                    x: x

                }

                input.addClass("prepago");
                input.addClass("dinero");
                input[0].getMoneda = function(){
                    var value = $(this).val();
                    value = value.replace(/\$/g, '');
                    value = value.replace(/\,/g, '');
                    return  value.trim()*1;
                };
               
                input.keypress(function(){
                    vMoment.mascara('dinero',this)
                }).keyup(function(e){

                    if(e.keyCode==13){
                        if( this.getMoneda()>this.datos.saldo){
                            alert("El prepago no puede exceder el saldo");
                        }else{
                            indice = this.datos.indice;
                            change = 'true';
                            pintarTabla(this.datos.mensualidad,this.datos.saldo,this.datos.tasa,this.datos.plazo,this.datos.valorCasa,this.datos.ap_patronal,this.getMoneda(),this.datos.i,change,this.datos.x);
                        }
                    }

                    }).focusout(function(){
                        if( this.getMoneda()>this.datos.saldo){
                            alert("El prepago no puede exceder el saldo");
                        }else{
                            indice = this.datos.indice;
                            change = 'true';
                            pintarTabla(this.datos.mensualidad,this.datos.saldo,this.datos.tasa,this.datos.plazo,this.datos.valorCasa,this.datos.ap_patronal,this.getMoneda(),this.datos.i,change,this.datos.x);
                        }
                    });
                    
                li.find(".content_dinero").append(input);         
                t.append(li);
                
                x++;
                saldo = (saldoFinal<=0) ? 0 : saldoFinal;
                if(saldo<=0){break};
                

                
            }//for
            
            var ie = navigator.userAgent.toLowerCase();
            var version = parseInt(ie.split('msie')[1]);
            var cat =  calculaCAT( arrPagoTotal2.slice(0,i+1) );
            //console.log(arrPagoTotal2.slice(0,i+1));
            $("span#cat").text(formato_numero(cat, 1, ".", ","));
            
            


        break;

    }

  
}//PintarTabla

    var d = new Date();
    var fecha={
        meses:new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","septiembre","Octubre","Noviembre","Diciembre"),
        getFecha:function (){ 
            var mes = d.getMonth()+1+"";
            
            if(mes.length==1)
                mes= "0"+mes;

            var dia=d.getDate()+"";
            if(dia.length==1)
                dia = "0"+dia;
        
            return dia +" / "+mes+" / "+d.getFullYear(); },
        getCalculado:function(){return "Calculado en "+ fecha.meses[d.getMonth()]+" del "+d.getFullYear()}
    }

    var parametros = getUrlVars3(location.href);
    //var parametros = getUrlVars3("?prepago=true&producto=adquisicion&tipo=valorVivienda&men=34904.79&mc=3250000&tasa=9.99&cat=12.0&plazo=15&ingreso=107799.38971987167&vC=5000000&minSalario=80.04&comisionApertura=32500&avaluo=7000&Bana1=false&titulo=AdquisiciÃ³n%20Hipoteca%20%20Perfiles%20Banamex");
    //var parametros = getUrlVars3("?montoCredito=1983326.5318020172&tasa=10.3&cat=10.6&plazo=20&cofinavit=true&ingreso=2501&valorCasa=1111111&minSalario=10")

    var apoyo_infonavit=75.49;
    var saldo = parametros['mc']*1; 
    var tasa = parametros['tasa']*1/100;
    var mensu = parametros['men']*1;
    var plazo = parametros['plazo']*1;
    var ingreso = parametros['ingreso']*1;
    var cat = parametros['cat']*1;
    var valorCasa= parametros['vC']*1;
    var minSalario =  parametros['minSalario']*1;
    var montoCredito = parametros['mc']*1;
    var tipocalc = parametros['tipo'];
    var tipoprod =   parametros['producto'];
    var comisionApertura = parametros['comisionApertura'];
    var avaluo = parametros['avaluo'];
    var tipoPago = parametros['tipoPago'];

    var arrPagoTotal = new Array();
    var arrPagoTotal2 = new Array();
    var pagoAlCreditoPC = new Array();

    var conPrepago = parametros['conPrepago'];
    var prepagoCant=0;
    var totalInicial = 0;
    if(conPrepago){

        if(conPrepago &&  parametros['conPrepago']=="true" ){
            prepagoCant = (ingreso*.05)*2;
            var salMinMax =  minSalario*30*25*.10;
            prepagoCant = ( prepagoCant <=  salMinMax ) ? prepagoCant : salMinMax ;
            ap_patronal = 0;
        }else{
            prepagoCant = ( prepagoCant <=  minSalario*25 ) ? prepagoCant : minSalario*25 ;
            ap_patronal = 0;
        }
        
    }

    pintarTabla(mensu,saldo,tasa,plazo,valorCasa,ap_patronal);
    
    $("#fecha").html(fecha.getFecha);
    $("#fechaMes").html(fecha.getCalculado);
    $("#tasa").html( parametros['tasa']+"%")
    $("#plazo").html(parametros['plazo'] + " a&#241;os")
    
    $("#valorCasa").html("$ "+formato_numero(valorCasa, 2, ".", ","));
    $("#montoSolicitado").html("$ "+formato_numero(Math.round(montoCredito), 2, ".", ","));
    var arrayaux = new Array();
    
    var titulo =  decodeURI(parametros['titulo']);
    $("#titulo").html( titulo ) ;
    $("#credito_legales").html( titulo );
    
    var Bana1 = ( parametros['B1'] ) ? true : false;
    if(Bana1 && parametros['B1']=="true"){
        $("#textBanamex1").removeClass("displayNone");    
    }

    $(".dft-print-icon").click(function(){
        s.linkTrackVars='eVar25,events';
        s.linkTrackEvents='event30';
        s.eVar25=s.pageName+'|Imprimir';
        s.events='event30';
        s.tl(this,'o',s.pageName+'-Page Interaction');
    });