var countUse=0;
var simulador = (function() {
    var realizarSim = "";
    var datosXml={
        titulos:{
                'cofi':"Cofinavit Hipoteca",
                'hipo':"Hipoteca",
                'alia':"Alia2 Hipoteca",
                'apoyo':"Apoyo Infonavit Hipoteca",
                'respal':"Respalda2 Hipoteca"
                },
        salarioMin:80.04,
            n:{
                tasa: 10.65,//%
                plazos:{"10" : 13.88,"15" : 11.45,"20" : 10.39    },
                costoAnual:11.7,//%%CAT
                creMin:200000,
                creMax:5000000,
                aforo:85//%
            },
            b:{
                tasa: 9.65,//%
                plazos:{"10" : 13.33,"15" : 10.84,"20" : 9.72    }, //directo de formula PAgo exel
                costoAnual:10.6,//%%CAT
                creMin:1500000,
                creMax:5000000,
                aforo:85//%
            },
            w:{
                tasa:10,//%
                plazos:{"10" : 13.33,"15" : 10.84,"20" : 9.72    }, //directo de formula PAgo exel
                costoAnual:10.6,//%%CAT
                creMin:1500000,
                creMax:5000000,
                aforo:85//%
            },
            x:{
                tasa: 9.5,//%
                plazos:{"10" : 13.33,"15" : 10.84,"20" : 9.72    }, //directo de formula PAgo exel
                costoAnual:10.6,//%%CAT
                creMin:1500000,
                creMax:5000000,
                aforo:85//%
            },
            y:{
                tasa: 9,//%
                plazos:{"10" : 13.33,"15" : 10.84,"20" : 9.72    }, //directo de formula PAgo exel
                costoAnual:10.6,//%%CAT
                creMin:1500000,
                creMax:5000000,
                aforo:85//%
            },
            z:{
                tasa: 8.5,//%
                plazos:{"10" : 13.33,"15" : 10.84,"20" : 9.72    }, //directo de formula PAgo exel
                costoAnual:10.6,//%%CAT
                creMin:1500000,
                creMax:5000000,
                aforo:85//%
            }
    };

   var dataForm={
        valorVivienda:null,
        valorPrestamo:null,
        tiempoApagar:null,
        seccionInfonavit:{
            selected:false,
            ayuda:null
        },
        seccionFovissste:{
            selected:false,
            ayuda:null
        },
        pagoMensual:null,
        ingresoMensual:null,
        cuantoRestaCreditoActual:null,
        valorAproxVivienda:null,
        financiarGastoInicial:null,
        clienteBanamex:null,
        creditoInfonavit : null,
        subcuentaInfonavit : null,
        gastosTitulacionInfonavit : null,
        pagoMensualInfonavit : null,
        capacidadMAxInfovissste : null,
        subcuentaInfovissste : null,
        pagoMensualInfovissste : null,
        tipoProducto : "adquisicion",
        tipoCalculo: null
    };

    var valHtml={
        //Detalle del credito
        value_valorVivienda:"",
        value_valorPrestamo:"",
        value_tiempoApagar:"",
        value_ingresoRequerido:"",
        value_porcentFinanciamiento:"",
        value_tasaInteresAnual:"",
        value_CAT:"",
        //Gastos iniciales
        value_comisionAperturaR:"",
        value_comisionApertura:"",
        value_estudioSocioeconomicoR:"",
        value_estudioSocioeconomico:"",
        value_avaluoR:"",
        value_avaluo:"",
        value_engancheR:"",
        value_enganche:"",
        value_gastosNotarialesR:"",
        value_gastosNotariales:"",
        value_ahorroR:"",
        value_ahorro:"",
        value_gastoInicial:"",
        //Pago mensual
        value_mensualidadCredito:"",
        value_seguroVidaR:"",
        value_seguroVida:"",
        value_seguroDaniosR:"",
        value_seguroDanios:"",
        value_comisionAdministracionR:"",
        value_comisionAdministracion:"",
        value_AhorroHipoR:"",
        value_AhorroHipo:"",
        value_pagoTotalMensual:"",
        value_AhorroTerminoCredito:"",
        //Infonavit y fovissste
        value_creditoInfonavit:"",
        value_creditoInfovissste:"",
        value_saldoSubcuenta:"",
        value_pagoMenAyudaCred:"",
        value_contariasCon:"",
        value_gastoTitulacion:"",
        value_amarra:""
    };

    var ponerValoresHtml= function(){
        for(clave in valHtml ){
            // if(dataForm.tipoCalculo=="cambiaHipoteca" && clave == "value_enganche"){valHtml[clave] = "--"}
            $("."+clave).html(valHtml[clave]);}}
                var resetValoresHtml= function(){for(clave in valHtml ){valHtml[clave]=""}}
                var resetForm = function(){
                dataForm={
                    valorVivienda:null,
                    valorPrestamo:null,
                    tiempoApagar:null,
                    seccionInfonavit:{
                        selected:false,
                        ayuda:null
                    },
                    seccionFovissste:{
                        selected:false,
                        ayuda:null
                    },
                    pagoMensual:null,
                    ingresoMensual:null,
                    cuantoRestaCreditoActual:null,
                    valorAproxVivienda:null,
                    financiarGastoInicial:null,
                    clienteBanamex:null,
                    creditoInfonavit : null,
                    subcuentaInfonavit : null,
                    gastosTitulacionInfonavit : null,
                    pagoMensualInfonavit : null,
                    capacidadMAxInfovissste : null,
                    subcuentaInfovissste : null,
                    pagoMensualInfovissste : null,
                    tipoProducto : "adquisicion",
                    tipoCalculo : null
                };
        }

        var setValoresForm_=function(){
        //obtener los valores del formulario

        dataForm.valorVivienda = $("#slider_valorCasa").val()
        dataForm.valorVivienda = parseInt(dataForm.valorVivienda)
        if(Saction.section == "hipoteca"){
            dataForm.valorPrestamo = $("#restaCredito").val()
        }else{
            dataForm.valorPrestamo = $("#slider_montoCredito").val()
        }

        dataForm.valorPrestamo = parseInt(dataForm.valorPrestamo)
        var t = 1
        if(t==1)
            dataForm.tiempoApagar = Saction.Tpagar*1;

        dataForm.seccionInfonavit.selected  =  $("#chkinfonavit").is(":checked");
        var apInfo = $("input[name=apoyoInfonavit_tipo]:checked") ;

        if(apInfo.length==0)
            dataForm.seccionInfonavit.ayuda  = null;
        else
            dataForm.seccionInfonavit.ayuda = apInfo.val();

        dataForm.seccionFovissste.selected  =  $("#apoyoFovissste").is(":checked");
        var apFovisss = $("input[name=apoyoFovissste_tipo]:checked");

        if(apFovisss.length==0)
            dataForm.seccionFovissste.ayuda  = null;
        else
            dataForm.seccionFovissste.ayuda = apFovisss.val();

        dataForm.pagoMensual  = 2000;
        dataForm.ingresoMensual  = 15000
        dataForm.cuantoRestaCreditoActual  = $("#restaCredito").val();
        dataForm.cuantoRestaCreditoActual = parseInt(dataForm.cuantoRestaCreditoActual)
        dataForm.valorAproxVivienda  = $("#valorAprox").val();

        var finan = $("input[name=financiarGastoInicial]:checked") ;

        if(finan.length==0)
            dataForm.financiarGastoInicial  = null;
        else
            dataForm.financiarGastoInicial =(finan.val()=="SI" ) ? true :false;

        dataForm.financiarGastoInicial = true;
        var cliente = $("input[name=clienteBanamex]:checked") ;

        if(cliente.length==0)
            dataForm.clienteBanamex  = null;
        else
           dataForm.clienteBanamex = (cliente.val()=="SI") ? true : false;

        dataForm.creditoInfonavit = $("input[name=cred_info]")[0].getMoneda();
        dataForm.subcuentaInfonavit = $("input[name=saldoSub_info]")[0].getMoneda();
        dataForm.gastosTitulacionInfonavit = $("input[name=gastosTitu_info]")[0].getMoneda();
        dataForm.pagoMensualInfonavit = $("input[name=pagoMen_info]")[0].getMoneda();
        dataForm.capacidadMAxInfovissste = $("input[name=capMAxCred_infosss]")[0].getMoneda();

        if($("#Respalda2").is(":checked")){dataForm.subcuentaInfovissste = $("input[name=saldoSub_infosss2]")[0].getMoneda();}else{dataForm.subcuentaInfovissste = $("input[name=saldoSub_infosss]")[0].getMoneda();}

        dataForm.pagoMensualInfovissste = $("input[name=pagoMen_infosss]")[0].getMoneda();
        if($("#chkinfonavit").is(":checked") && $("#cofinavit").is(":checked") )
            dataForm.tipoProducto = "cofinavit";
        else if($("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") )
            dataForm.tipoProducto = "infonavit";
        else if( $("#apoyoFovissste").is(":checked")  && $("#Alia2").is(":checked") )
            dataForm.tipoProducto = "alia2";
        else if($("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") )
            dataForm.tipoProducto = "respalda2";
        else
            dataForm.tipoProducto = "adquisicion";

        var psize = dataForm.tipoProducto
    }


    var valHtmlEstatico=function(){
        valHtml.value_ahorro="--";
        valHtml.value_AhorroHipo="--";
        valHtml.value_comisionAdministracion="SIN COSTO";
        valHtml.value_estudioSocioeconomico="SIN COSTO";
        valHtml.value_engancheR="--";
        valHtml.value_seguroVidaR="--";
        valHtml.value_seguroDaniosR="--";
        valHtml.value_valorPrestamo="--falta--";
    };

    var hideSeccionValueAyudaCred=function(){
        valHtml.value_creditoInfonavit="";
        valHtml.value_creditoInfovissste="";
        valHtml.value_contariasCon="";
        valHtml.value_gastoTitulacion="";
        valHtml.value_pagoMenAyudaCred="";
        valHtml.value_saldoSubcuenta="";

        $("#seccionValueAyudaCred").hide();
        $("#seccionValueAyudaCredinfo").hide();
    }

    return {
        calculaCAT: function(array){
            var mtir = (simulador.tir(array))/100;
        return (Math.abs(Math.pow((mtir+1),12))-1)*100;
    },

    ponerTitulo:function(){
        var cofi =  $("input[name=apoyoInfonavit_tipo][value=Cofinavit]:checked");
        var apoyo=  $("input[name=apoyoInfonavit_tipo][value=Infonavit]:checked");
        var alia =  $("input[name=apoyoFovissste_tipo][value=Alia2]:checked");
        var respal = $("input[name=apoyoFovissste_tipo][value=Respalda2]:checked");
        var bana1 = $("input[name=clienteBanamex][value=SI]:checked");

        $("#tituloPrincipal,#labelTipoProductoTabla").html( datosXml.titulos['hipo']);
        $("#textBanamex1,#label_Banamex1").html("SIN");
        $('#descTitle,#descTipoProductoTabla').html("Adquisición &nbsp");

        if( dataForm.tipoCalculo == "valorVivienda" ){

            if($("#chkinfonavit").is(":checked")){

                $('#descTitle,#descTipoProductoTabla').empty();
                if(cofi.length!=0) $("#tituloPrincipal,#labelTipoProductoTabla").html(datosXml.titulos['cofi']);
                if(apoyo.length!=0) $("#tituloPrincipal,#labelTipoProductoTabla").html(datosXml.titulos['apoyo']);
            }else if($("#apoyoFovissste").is(":checked")){
                $('#descTitle,#descTipoProductoTabla').empty();
                if(alia.length!=0) $("#tituloPrincipal,#labelTipoProductoTabla").html(datosXml.titulos['alia']);
                if(respal.length!=0) $("#tituloPrincipal,#labelTipoProductoTabla").html(datosXml.titulos['respal']);
            }

        }else{

            $('#descTitle,#descTipoProductoTabla').html("Cambia tu Hipoteca con &nbsp");
            $("#tituloPrincipal,#labelTipoProductoTabla").html(datosXml.titulos['hipo']);

        }

        if(bana1.length!=0)$("#textBanamex1,#label_Banamex1").html("Banamex1");
    },


    verifica :{
        verificaSegmentoSimilar:function(){
            var mensaje = "";
            if ( $("input[name=tiempoEnPagar]:checked").not(':disabled').length==0) mensaje+="-";
            if ( $("input[name=clienteBanamex]:checked").length==0) mensaje+="-";

            if($("#chkinfonavit").is(":checked")){
                if($("#cofinavit").is(":checked")){
                    if(($("input[name=cred_info]")[0].getMoneda()!=0   &&  $("input[name=saldoSub_info]")[0].getMoneda()!=0 &&
                        $("input[name=gastosTitu_info]")[0].getMoneda()!=0  && $("input[name=pagoMen_info]")[0].getMoneda()!=0 )==false){
                        mensaje+="pon cantidades de cofinavit";
                    }
                }else{
                    if( $("#infonavit").is(":checked") == false)
                        mensaje+="-";
                }
            }

            if( $("#apoyoFovissste").is(":checked") ){
                if( $("#Alia2").is(":checked") ){
                    if( ($("input[name=capMAxCred_infosss]")[0].getMoneda()!=0   && $("input[name=saldoSub_infosss]")[0].getMoneda()!=0  &&
                        $("input[name=pagoMen_infosss]")[0].getMoneda()!=0)==false  ){
                            mensaje+="-";
                        }
                }else{
                    if( $("#Respalda2").is(":checked") == false)
                        mensaje+="-";
                    if( $("#Respalda2").is(":checked") == true ){
                        if ( $("input[name=saldoSub_infosss]").val()=="" || $("input[name=saldoSub_infosss]")[0].getMoneda() == 0  ){
                            mensaje+="-";
                        }
                    }

                }
            }

            if(Saction.section == "hipoteca"){mensaje=""}
            if(mensaje!=""){
                return false
            }else{
                return true
            }

        },
        "valor de la vivienda":function(){
            return this.verificaSegmentoSimilar();
        },
        "monto del credito":function(){
            return this.verificaSegmentoSimilar();
        },
        "pago mensual":function(){
            return this.verificaSegmentoSimilar();
        },
        "ingresos mensuales":function(){
            return this.verificaSegmentoSimilar();
        },
        "cambia tu hipoteca":function(){
            var mensaje = "";
            var bandera1 =true;
            var bandera2 = true;
            bandera2 =  this.verificaSegmentoSimilar();
            return bandera1 &&    bandera2;
            }
        },
                realiza:{
                        "monto del credito":function(){
                                //simulador.ponerTitulo(); 26112014
                                resetValoresHtml();
                                valHtmlEstatico();
                                dataForm.tipoCalculo = "montoCredito";
                                simulador.resuelve();
                        },
                        "valor de la vivienda":function(){
                                //simulador.ponerTitulo(); 26112014
                                resetValoresHtml();
                                valHtmlEstatico();
                                dataForm.tipoCalculo = "valorVivienda";
                                simulador.resuelve();
                        },
                        "pago mensual":function(){
                                //simulador.ponerTitulo(); 26112014
                                resetValoresHtml();
                                valHtmlEstatico();
                                dataForm.tipoCalculo = "pagoMensual";
                                simulador.resuelve();
                        },
                        "ingresos mensuales":function(){
                                //simulador.ponerTitulo(); 26112014
                                resetValoresHtml();
                                valHtmlEstatico();
                                dataForm.tipoCalculo = "ingresosMensuales";
                                simulador.resuelve();
                        },
                        "cambia tu hipoteca":function(){
                                resetValoresHtml();
                                valHtmlEstatico();
                                dataForm.tipoCalculo = "cambiaHipoteca";
                                simulador.resuelve();
                        }
                },
                resuelve:function(){
                        var creditoInfo = 0;
                        var subcuenta = 0;
                        var gasTitu = 0;
                        var pagoMen = 0;
                        var contariasCon = 0;
                        var capMaxCredito = 0;
                        var monto_solicitado = 0;
                        var banamexPresta = 0;
                        var valorVivienda = 0;
                        var porcentFinanciamiento = 0;
                        var auxEngancheN = 0;
                        var CAT;
                        var Capacidad_de_pago;
                        var mensualidadCredito = 0;
                        var Enganche = 0;
                        var gastosNotariales = 0;
                        var avaluo = 0;
                        var seguroVida = 0;
                        var seguroDanios = 0;
                        var comisionAdministracion = 0;
                        var comisionApertura = 0;
                        var estudioSocioeconomico = 0;
                        var ingresoRequerido = 0;

                        countUse++;
                        var datos;
                        var tasa_interes = "";
                        var auxAvaluo = "";
                        var maxMonto = 4250000;
                        var avaluo2 = 0;
                        var gastosNotariales2 = 0;
                        var auxCAT = 0;
                        var flg1 = 0;
                        var auxOpe = 0;
                        var sumaPagos = 0;
                        var amarra =0;

                        if(dataForm.tipoProducto == "cofinavit"){
                            creditoInfo = dataForm.creditoInfonavit;
                            subcuenta = dataForm.subcuentaInfonavit;
                            pagoMen = dataForm.pagoMensualInfonavit;
                            gasTitu = dataForm.gastosTitulacionInfonavit;

                        }
                        if(dataForm.tipoProducto == "alia2" ){
                            creditoInfo = dataForm.capacidadMAxInfovissste;
                            subcuenta = dataForm.subcuentaInfovissste;
                            pagoMen = dataForm.pagoMensualInfovissste;
                            gasTitu =  0 ;
                        }
                        if(dataForm.tipoProducto == "respalda2")
                            subcuenta = dataForm.subcuentaInfovissste;

                        contariasCon = creditoInfo+subcuenta-gasTitu;

                        if(dataForm.tipoProducto != "adquisicion")
                            maxMonto = 4500000;

                        switch(dataForm.tipoCalculo){

                                case 'montoCredito':

                                    banamexPresta  = dataForm.valorPrestamo;

                                    if(dataForm.tipoProducto == "alia2" || dataForm.tipoProducto == "respalda2"){
                                        if(banamexPresta+contariasCon>10000000)
                                            banamexPresta = 10000000-contariasCon;
                                    }

                                    var enganche = $("#enganche").val();
                                    porcentFinanciamiento = 1 - enganche;


                                    var enganche_real=0;

                                    valorViviendaAux = banamexPresta + creditoInfo;


                                    if(valorViviendaAux<6000000*porcentFinanciamiento)
                                        valorVivienda = (valorViviendaAux/porcentFinanciamiento);
                                    else{
                                        if(valorViviendaAux>11999999)
                                          valorVivienda = (valorViviendaAux/.5);
                                        else
                                          if(porcentFinanciamiento<=.65)
                                          valorVivienda = (valorViviendaAux/porcentFinanciamiento);
                                            else
                                              valorVivienda = (valorViviendaAux/.65);
                                    }


                                    if(valorVivienda<500000)
                                        valorVivienda=500000;

                                    valorViviendaAux = valorViviendaAux + subcuenta - gasTitu;

                                    if(valorViviendaAux>valorVivienda)
                                        valorVivienda = valorViviendaAux;

                                    porcentFinanciamiento_por=((banamexPresta+creditoInfo)/valorVivienda)*100;

                                    enganche_real = (100 - porcentFinanciamiento_por);

                                    if (enganche_real>=10 && enganche_real<25)
                                        tasa_por_enganche = 10.49;
                                    else if(enganche_real>=25 && enganche_real<35)
                                        tasa_por_enganche = 10.25;
                                    else if(enganche_real>=35)
                                        tasa_por_enganche = 9.99;
                                    else
                                        tasa_por_enganche = 9.99;

                                    tasa_interes  = tasa_por_enganche;

                                    if(porcentFinanciamiento>(porcentFinanciamiento_por)/100)
                                    porcentFinanciamiento = porcentFinanciamiento_por/100;

                                    //comisión de apertura
                                    comisionApertura = (1*banamexPresta)/100;

                                break;

                                case 'valorVivienda':

                                    valorVivienda = dataForm.valorVivienda;
                                    monto_solicitado = valorVivienda;
                                    enganche = $("#enganche").val();

                                    //enganche = 100%-enganche;
                                    _enganche = $("#enganche").val();
                                    _credito = 1-_enganche;

                                    var bana_presta = 0;
                                    porcentFinanciamiento = 1 - enganche;

                                    //Banamex te presta:
                                    if(monto_solicitado<6000000){
                                        bana_presta = monto_solicitado*_credito;
                                    }else{

                                        if(monto_solicitado>11999999){
                                            bana_presta = monto_solicitado*.50;
                                        }else{
                                            if(_credito<=.65){
                                                bana_presta = monto_solicitado*_credito;
                                            }else{
                                                bana_presta = monto_solicitado*.65;
                                            }
                                        }
                                    }

                                    if(bana_presta>10000000)
                                        banamexPresta = 10000000;
                                    else if(bana_presta<300000)
                                        banamexPresta = 300000;
                                    else
                                        banamexPresta = bana_presta;

                                    porcentFinanciamiento_por=((banamexPresta+creditoInfo)/valorVivienda)*100;
                                    enganche_real = Math.round( (100 - porcentFinanciamiento_por) );

                                    if(porcentFinanciamiento*100 > porcentFinanciamiento_por)
                                    porcentFinanciamiento = porcentFinanciamiento_por;
                                    else
                                    porcentFinanciamiento  = porcentFinanciamiento*100;


                                    if (enganche_real>=10 && enganche_real<25)
                                        tasa_por_enganche = 10.49;
                                    else if(enganche_real>=25 && enganche_real<35)
                                        tasa_por_enganche = 10.25;
                                    else if(enganche_real>=35)
                                        tasa_por_enganche = 9.99;
                                    else
                                        tasa_por_enganche = 10;


                                    if( enganche_real<=24.99 && enganche_real>=9.999999 ){
                                        enganche_real = 10.49;
                                    }else{
                                        if(enganche_real>=25 && enganche_real<35){
                                            enganche_real =  10.25;
                                        }else{
                                            enganche_real =  9.99;
                                        }
                                    }


                                    tasa_interes  = enganche_real;
                                    porcentFinanciamiento = porcentFinanciamiento/100;

                                    //comisión de apertura
                                    comisionApertura = (1*banamexPresta)/100;


                                break;

                                case 'pagoMensual':

                                        mensualidadCredito = dataForm.pagoMensual - pagoMen;
                                        banamexPresta = (mensualidadCredito/(datos.plazos[dataForm.tiempoApagar]))*1000;

                                        monto_solicitado = banamexPresta + creditoInfo;
                                        if(monto_solicitado < maxMonto){
                                        if(dataForm.tipoProducto != "adquisicion")
                                                porcentFinanciamiento = 0.90;
                                        else
                                                porcentFinanciamiento = 0.85;
                                        }
                                        else if (monto_solicitado > 7150000){
                                                porcentFinanciamiento = 0.50;
                                        }
                                        else{
                                                  porcentFinanciamiento = 0.65;
                                        }
                                        //valorVivienda = ((monto_solicitado * 1 )/ porcentFinanciamiento) + subcuenta - gasTitu;// preguntar subcuenta
                                        valorVivienda = ((monto_solicitado * 1 )/ porcentFinanciamiento) ;// preguntar subcuenta


                                        if(valorVivienda<200000)
                                                porcentFinanciamiento = monto_solicitado/200000;


                                break;

                                case 'ingresosMensuales':

                                        Capacidad_de_pago = 35/100;

                                        mensualidadCredito = (dataForm.ingresoMensual*Capacidad_de_pago) - pagoMen;
                                        banamexPresta = (mensualidadCredito/(datos.plazos[dataForm.tiempoApagar]))*1000;

                                        monto_solicitado = banamexPresta + creditoInfo;

                                        if(monto_solicitado < maxMonto){
                                            if(dataForm.tipoProducto != "adquisicion")
                                                porcentFinanciamiento = 0.90;
                                            else
                                                porcentFinanciamiento = 0.85;
                                        }
                                        else if (monto_solicitado > 7150000){
                                            porcentFinanciamiento = 0.50;
                                        }
                                        else{
                                            porcentFinanciamiento = 0.65;
                                        }

                                        valorVivienda = ((monto_solicitado  * 1 ) / porcentFinanciamiento) ;

                                break;

                                case 'cambiaHipoteca':

                                    var montoMinimo = 500000;
                                    gastNot = 0.04* dataForm.cuantoRestaCreditoActual ;
                                    banamexPresta = (dataForm.financiarGastoInicial) ? dataForm.cuantoRestaCreditoActual  : dataForm.cuantoRestaCreditoActual+ gastNot;
                                    valorVivienda = dataForm.valorAproxVivienda;
                                    porcentFinanciamiento = banamexPresta/valorVivienda;

                                    if(porcentFinanciamiento > 0.85){

                                        $("#"+Saction.lastinput+"").removeClass("success")
                                        $("#"+Saction.lastinput+"").addClass("failure")

                                        var $inputfail = $("."+Saction.lastinput+"");
                                        if( !$inputfail.hasClass("input-error") ){
                                            $inputfail.addClass("input-error")
                                        }
                                        return;
                                    }else{
                                        $(".porcentaje_fin").removeClass("failure")
                                        $(".porcentaje_fin").addClass("success")
                                    }

                                    var casaDeberiaCostar;
                                    if(banamexPresta/0.85>montoMinimo){
                                        if(banamexPresta<=5999999){
                                            casaDeberiaCostar = banamexPresta/0.85;
                                        }
                                        else if(banamexPresta>11999999){
                                            casaDeberiaCostar = banamexPresta/0.5;
                                        }
                                        else{
                                            casaDeberiaCostar = banamexPresta/0.65;
                                        }
                                    }
                                    else{
                                        casaDeberiaCostar = montoMinimo;
                                    }
                                    if(valorVivienda<=casaDeberiaCostar){
                                        valorVivienda = casaDeberiaCostar;
                                    }

                                    porcentFinanciamiento = banamexPresta/valorVivienda;
                                    Enganche = valorVivienda - banamexPresta;
                                    gastosNotariales = valorVivienda*0.05;
                                    seguroDanios = 0.0003*(0.8*valorVivienda);

                                    var enganche=0;
                                    porcentFinanciamiento_por=(banamexPresta/valorVivienda)*100;

                                    credito_real = (banamexPresta/valorVivienda)*100;
                                    enganche = (100-credito_real)/100;

                                    //tasa de interes
                                    if(enganche<.25 && enganche>.15){
                                        tasa_interes = 10.25;
                                    }else{
                                        if(enganche>=.25 && enganche<.35){
                                            tasa_interes = 10.00;
                                        }else{
                                            tasa_interes = 9.75;
                                        }
                                    }

                                    seguroVida = (0.5*banamexPresta)/1000;
                                    seguroDanios = (0.3*(valorVivienda*.8))/1000;
                                    seguros = seguroVida+seguroDanios;
                                    //calcular ingreso
                                    mensualidadCredito = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros;
                                    mensualidadCredito = parseInt(mensualidadCredito);
                                    calcular_ingreso = mensualidadCredito/0.35;

                                break;
                        }


                    if(dataForm.tipoCalculo=='cambiaHipoteca'){
                        comisionApertura = (1*banamexPresta)/100;
                    }else{
                        Enganche =valorVivienda - contariasCon - banamexPresta;
                    }


                    if(Enganche < 0)
                        Enganche = 0;

                    mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                    var segvida = 0.0005*banamexPresta;
                    var segdan = ((0.0003*(0.8*valorVivienda) * 100) / 100);
                    var mensualidad = (mensualidadCredito).toFixed(2);
                    var men2=Number(mensualidad)//+segdan+segvida;
                    Capacidad_de_pago = 35/100;
                    mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);
                    //change 2ene17
                    if(dataForm.tipoCalculo=='cambiaHipoteca'){
                        valorViviendaH = dataForm.valorAproxVivienda;

                        if(valorViviendaH<=1000000)
                            avaluo = 3500;
                        else if(valorViviendaH<=3000000)
                            avaluo = 5500;
                        else if(valorViviendaH<=5000000)
                            avaluo = 7500;
                        else if(valorViviendaH<=8000000)
                            avaluo = 10500;
                        else if(valorViviendaH<=15000000)
                            avaluo = 15500;
                         else if(valorViviendaH>15000000)
                            avaluo = 0;
                        else{
                            avaluo = 15500;
                            flgavaluo = 1;
                        }

                    }else{

                        if(valorVivienda<=1000000)
                            avaluo = 3500;
                        else if(valorVivienda<=3000000)
                            avaluo = 5500;
                        else if(valorVivienda<=5000000)
                            avaluo = 7500;
                        else if(valorVivienda<=8000000)
                            avaluo = 10500;
                        else if(valorVivienda<=15000000)
                            avaluo = 15500;
                         else if(valorVivienda>15000000)
                            avaluo = 0;
                        else{
                            avaluo = 15500;
                            flgavaluo = 1;
                        }
                    }

                    if( $("#infonavit").is(":checked") && $("#chkinfonavit").is(":checked")){
                        gastosNotariales = valorVivienda*0.05;
                    }
                    else if(dataForm.tipoCalculo=="valorVivienda" &&  $("#chkinfonavit").is(":checked") &&  $("#apoyoFovissste").is(":checked")){
                        gastosNotariales = valorVivienda*0.04;
                    }
                    else if( dataForm.tipoCalculo!="cambiaHipoteca" ){
                        gastosNotariales = valorVivienda*0.05;
                    }

                    //avaluo = (valorVivienda>=5000000) ?  5000 : 2850 ;
                    //if(dataForm.tipoCalculo == "cambiaHipoteca"){
                        //gastosNotariales = valorVivienda*0.05;
                    //}

                    seguroVida = 0.0005*banamexPresta;
                    if( dataForm.tipoCalculo!="cambiaHipoteca" ){
                        seguroDanios = 0.0003*(0.8*valorVivienda);
                    }

                    comisionAdministracion = 300;
                    var productos = new Array("cofinavit", "alia2", "respalda2", "infonavit");

                    //comisionApertura = (banamexPresta * 0.5)/100;
                    estudioSocioeconomico   = 500;

                    ingresoRequerido = (mensualidadCredito+seguroDanios+seguroVida)/Capacidad_de_pago;

                    //ingresoRequerido = PAGO((tasa_interes/100)/12,plazo*12+1-k-1)
                    if(ingresoRequerido <15000)
                        ingresoRequerido = 15000;


                    var cantPrep = 0;
                    var eleccion;

                    if(dataForm.tipoCalculo == "valorVivienda"){
                        eleccion  = 0
                    }else if(dataForm.tipoCalculo == "montoCredito"){
                        eleccion  = 1
                    }else{
                        eleccion  = 2323
                    }

                    if( $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 0 ){

                        _credito = 1-enganche;
                        if(monto_solicitado<6000000){
                            bana_presta = monto_solicitado*_credito;
                        }else{
                            if(monto_solicitado>11999999){
                                bana_presta = monto_solicitado*.50;
                            }else{
                                if(_credito<=.65){
                                        bana_presta = monto_solicitado*_credito;
                                }else{
                                    bana_presta = monto_solicitado*.65;
                                }
                            }
                        }

                        banamexPresta = bana_presta;

                        seguroVida = 0.0005*banamexPresta;
                        Enganche = valorVivienda-banamexPresta;
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //ingresos requeridos
                        ingresoRequerido = (mensualidadCredito+seguroDanios+seguroVida)/Capacidad_de_pago;
                        if(ingresoRequerido<15000){
                            ingresoRequerido = 15000;
                        }else{
                            ingresoRequerido = ingresoRequerido;
                        }

                        //comisión de apertura
                        comisionApertura = (banamexPresta*0.5)/100;

                        //porcentFinanciamiento = 1-enganche;
                        porcentFinanciamiento = banamexPresta/valorVivienda;

                        //Aportación patronal
                        var apoyo_infonavit=75.49;
                        var mensual_30d = apoyo_infonavit*30.4;
                        var ingresoMin_25sm = mensual_30d*25;
                        var sm_maxMensual = ingresoMin_25sm*0.05;
                        var aportacionPatronal = 0;

                        if( ingresoRequerido > ingresoMin_25sm ){
                          aportacionPatronal = sm_maxMensual*2;
                        }else{
                           aportacionPatronal = ingresoRequerido*.10;
                        }

                    } else if( $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && dataForm.tipoCalculo == "montoCredito"){

                        var _credito = 1-enganche;
                        
                        /*
                        if(monto_solicitado<6000000){
                            bana_presta = monto_solicitado*_credito;
                        }else{
                            if(monto_solicitado>11999999){
                                bana_presta = monto_solicitado*.50;
                            }else{
                                if(_credito<=.65){
                                        bana_presta = monto_solicitado*_credito;
                                }else{
                                    bana_presta = monto_solicitado*.65;
                                }
                            }
                        }

                        banamexPresta = bana_presta;
                        */

                        seguroVida = 0.0005*banamexPresta;
                        Enganche = valorVivienda-banamexPresta;
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //ingresos requeridos
                        ingresoRequerido = (mensualidadCredito+seguroDanios+seguroVida)/Capacidad_de_pago;
                        if(ingresoRequerido<15000){
                            ingresoRequerido = 15000;
                        }else{
                            ingresoRequerido = ingresoRequerido;
                        }

                        //comisión de apertura
                        comisionApertura = (banamexPresta*.50)/100;

                        //porcentFinanciamiento = 1-enganche;
                        porcentFinanciamiento = banamexPresta/valorVivienda;

                        //Aportación patronal
                        var apoyo_infonavit=75.49;
                        var mensual_30d = apoyo_infonavit*30.4;
                        var ingresoMin_25sm = mensual_30d*25;
                        var sm_maxMensual = ingresoMin_25sm*0.05;
                        var aportacionPatronal = 0;

                        if( ingresoRequerido > ingresoMin_25sm ){
                          aportacionPatronal = sm_maxMensual*2;
                        }else{
                           aportacionPatronal = ingresoRequerido*.10;
                        }

                        /*
                        //cantPrepago
                        var _pagoInteres = (banamexPresta*tasa_interes/12)/100;
                        var _pagoCapital = mensualidadCredito-_pagoInteres;

                        if( ((mensualidadCredito-_pagoInteres)+aportacionPatronal)<banamexPresta ){

                            if( banamexPresta<=0 ){
                                _cantPrep = 0;
                            }else{
                                _cantPrep = aportacionPatronal;
                            }

                        }else{
                            _cantPrep = banamexPresta-_pagoCapital;
                        }

                        cantPrep = _cantPrep;
                        */


                    }else if( $("#chkinfonavit").is(":checked") && $("#cofinavit").is(":checked") && dataForm.tipoCalculo == "valorVivienda"){

                        //creditoInfo
                        //subcuenta
                        //pagoMen
                        //gasTitu

                        _credito = 1-enganche;

                        //----- Tu casa debería costar
                        if(valorVivienda<500000){
                            valorVivienda = 500000;
                        }else{
                            valorVivienda = valorVivienda;
                        }

                        //----- Banamex te presta
                        if(valorVivienda<6000000){
                            aux_banapresta1 = valorVivienda*_credito;
                        }else{
                            if(valorVivienda>11999999){
                                aux_banapresta1 = valorVivienda*.50;
                            }else{
                                if(_credito<=.65){
                                    aux_banapresta1 = valorVivienda*_credito;
                                }else{
                                    aux_banapresta1 = valorVivienda*.65;
                                }
                            }
                        }



                        aux_banapresta2 = aux_banapresta1-creditoInfo;

                        if(aux_banapresta2+creditoInfo-gasTitu>=10000000){
                            aux_banapresta3 = 10000000;
                        }else{
                            aux_banapresta3 = aux_banapresta2;
                        }

                        if(contariasCon+aux_banapresta3<=valorVivienda){
                            aux_banapresta4 = aux_banapresta3;
                        }else{
                            aux_banapresta4 = valorVivienda-contariasCon;
                        }

                        if(aux_banapresta4<300000){
                            banamexPresta = 300000;
                        }else{
                            banamexPresta = aux_banapresta4;
                        }

                        comisionApertura = (banamexPresta*.50)/100;

                        //-------- financiamiento e interés
                        financiamiento_real = ((banamexPresta+creditoInfo)/valorVivienda)*100;
                        enganche_real = 100-financiamiento_real;

                        if(enganche_real<25 && enganche_real>9.99999999999999){
                            tasa_por_enganche = 10.49;
                        }else{
                            if(enganche_real>=25 && enganche_real<35){
                                tasa_por_enganche = 10.25;
                            }else{
                                tasa_por_enganche = 9.99;
                            }
                        }

                        tasa_interes  = tasa_por_enganche;

                        //-------- % financiamiento
                        porc_financiamiento_real = (banamexPresta+creditoInfo)/valorVivienda;
                        if(_credito>porc_financiamiento_real)
                            porcentFinanciamiento = porc_financiamiento_real;
                        else
                            porcentFinanciamiento = _credito;

                        //-------- validar Ingresos Requeridos
                        seguroVida = (banamexPresta*0.5)/1000;
                        seguros = seguroVida+seguroDanios;
                        aux_mensualidad = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros+pagoMen;
                        calcular_ingreso = aux_mensualidad/0.35;

                        if(calcular_ingreso<15000)
                            calcular_ingreso = 15000;
                        else
                            calcular_ingreso = calcular_ingreso;

                        ingresoRequerido = calcular_ingreso;

                        //-------- Mensualidad crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //-------- Enganche
                        if(valorVivienda-contariasCon-banamexPresta<0){
                            Enganche = 0;
                        }else{
                            Enganche = valorVivienda-contariasCon-banamexPresta;
                        }

                    }else if( $("#chkinfonavit").is(":checked") && $("#cofinavit").is(":checked") && dataForm.tipoCalculo == "montoCredito"){

                        //creditoInfo
                        //subcuenta
                        //pagoMen
                        //gasTitu
                        _credito = 1-enganche;

                        //bana_presta
                        _nuevoPresta = banamexPresta+creditoInfo;

                        if(_nuevoPresta<6000000*_credito){
                            aux_valorVivienda = _nuevoPresta/_credito;
                        }else{
                            if(_nuevoPresta>11999999){
                                aux_valorVivienda = _nuevoPresta/.50;
                            }else{
                                if(_credito<=.65){
                                   aux_valorVivienda =  _nuevoPresta/_credito;
                                }else{
                                    aux_valorVivienda = _nuevoPresta/.65;
                                }
                            }
                        }

                        if(aux_valorVivienda<500000){
                            aux_valorVivienda = 500000;
                        }else{
                            aux_valorVivienda = aux_valorVivienda;
                        }

                        _valorVivienda = (_nuevoPresta+subcuenta)-gasTitu;

                        if(_valorVivienda>aux_valorVivienda){
                            valorVivienda = _valorVivienda;
                        }else{
                            valorVivienda = aux_valorVivienda;
                        }

                        //calcular ingreso
                        _mensualidadCredito = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguroDanios+seguroVida+pagoMen;
                        _mensualidadCredito = parseInt(_mensualidadCredito/0.35);

                        if(_mensualidadCredito<15000){
                            _mensualidadCredito = 15000;
                        }else{
                            _mensualidadCredito = _mensualidadCredito;
                        }

                        ingresoRequerido = _mensualidadCredito;


                        //mensualidad de crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);


                        comisionApertura = (banamexPresta*.50)/100;

                    }else if( $("#apoyoFovissste").is(":checked") && $("#Alia2").is(":checked") && dataForm.tipoCalculo == "valorVivienda"){

                        //creditoInfo
                        //subcuenta
                        //pagoMen
                        //gasTitu

                        _credito = 1-enganche;

                        //-------- validar Tu casa debería costar
                        if(valorVivienda<500000){
                            valorVivienda = 500000;
                        }else{
                            valorVivienda = valorVivienda;
                        }

                        //-------- validar Banamex presta
                        banamexPresta = bana_presta-creditoInfo;

                        if(valorVivienda<6000000){
                            aux_banaPresta = valorVivienda*_credito;
                        }else{
                            if(valorVivienda>11999999){
                                aux_banaPresta = valorVivienda*.50;
                            }else{
                                if(_credito<=.65){
                                    aux_banaPresta = valorVivienda*_credito;
                                }else{
                                    aux_banaPresta = valorVivienda*.65;
                                }
                            }
                        }

                        aux_banaPresta = aux_banaPresta;
                        aux_banaPresta1 = aux_banaPresta-creditoInfo;

                        if(aux_banaPresta1+creditoInfo>=10000000){
                            aux_banaPresta2 = 10000000-contariasCon;
                        }else{
                            aux_banaPresta2 = aux_banaPresta1;
                        }

                        if(contariasCon+aux_banaPresta2<=valorVivienda)
                            aux_banaPresta3 = aux_banaPresta2;
                        else
                            aux_banaPresta3 = valorVivienda-contariasCon;

                        banamexPresta = aux_banaPresta3;
                        comisionApertura = (banamexPresta*.50)/100;

                        //-------- financiamiento e interés
                        financiamiento_real = ((banamexPresta+creditoInfo)/valorVivienda)*100;
                        enganche_real = 100-financiamiento_real;

                        if(enganche_real<25 && enganche_real>9.99999999999999){
                            tasa_por_enganche = 10.49;
                        }else{
                            if(enganche_real>=25 && enganche_real<35){
                                tasa_por_enganche = 10.25;
                            }else{
                                tasa_por_enganche = 9.99;
                            }
                        }

                        tasa_interes  = tasa_por_enganche;

                        //-------- % financiamiento
                        porc_financiamiento_real = (banamexPresta+creditoInfo)/valorVivienda;
                        if(_credito>porc_financiamiento_real)
                            porcentFinanciamiento = porc_financiamiento_real;
                        else
                            porcentFinanciamiento = _credito;

                        //-------- validar Ingresos Requeridos
                        seguroVida = (banamexPresta*0.5)/1000;
                        seguros = seguroVida+seguroDanios;
                        aux_mensualidad = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros+pagoMen;
                        calcular_ingreso = aux_mensualidad/0.35;

                        if(calcular_ingreso<15000)
                            calcular_ingreso = 15000;
                        else
                            calcular_ingreso = calcular_ingreso;

                        ingresoRequerido = calcular_ingreso;

                        //-------- Mensualidad crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //-------- Enganche
                        if(valorVivienda-contariasCon-banamexPresta<0){
                            Enganche = 0;
                        }else{
                            Enganche = valorVivienda-contariasCon-banamexPresta;
                        }

                    }else if( $("#apoyoFovissste").is(":checked") && $("#Alia2").is(":checked") && dataForm.tipoCalculo == "montoCredito"){

                        //creditoInfo
                        //subcuenta
                        //pagoMen
                        //gasTitu
                        var aux_bana_presta;
                        _credito = 1-enganche;

                        //-------- validar Banamex presta
                        if(banamexPresta<300000){
                            banamexPresta = 300000;
                        }else{
                            banamexPresta = banamexPresta;
                        }

                        //-------- validar Tu casa debería costar
                        aux_valida1 = banamexPresta+creditoInfo;

                        if(aux_valida1<6000000*_credito){
                            aux_valida2 = aux_valida1/_credito;
                        }else{
                            if(aux_valida1>11999999){
                                aux_valida2 = aux_valida1/.50;
                            }else{
                                if(_credito<=.65){
                                    aux_valida2 = aux_valida1/_credito;
                                }else{
                                    aux_valida2 = aux_valida1/.65;
                                }
                            }
                        }

                        if(aux_valida2<500000){
                            aux_valida3 = 500000;
                        }else{
                            aux_valida3 = aux_valida2;
                        }

                        aux_valida4 = aux_valida1+subcuenta;

                        if(aux_valida4>aux_valida3){
                            aux_valida5 = aux_valida4;
                        }else{
                            aux_valida5 = aux_valida3;
                        }

                        if(aux_valida3==500000){
                            valorVivienda = aux_valida3;
                        }else{
                            valorVivienda = aux_valida5;
                        }

                        comisionApertura = (banamexPresta*.50)/100;

                        //-------- financiamiento e interés
                        financiamiento_real = ((banamexPresta+creditoInfo)/valorVivienda)*100;
                        enganche_real = 100-financiamiento_real;

                        if(enganche_real<25 && enganche_real>9.99999999999999){
                            tasa_por_enganche = 10.49;
                        }else{
                            if(enganche_real>=25 && enganche_real<35){
                                tasa_por_enganche = 10.25;
                            }else{
                                tasa_por_enganche = 9.99;
                            }
                        }

                        tasa_interes  = tasa_por_enganche;

                        //-------- % financiamiento
                        porc_financiamiento_real = (banamexPresta+creditoInfo)/valorVivienda;
                        if(_credito>porc_financiamiento_real)
                            porcentFinanciamiento = porc_financiamiento_real;
                        else
                            porcentFinanciamiento = _credito;

                        //-------- validar Ingresos Requeridos
                        seguroVida = (banamexPresta*0.5)/1000;
                        seguros = seguroVida+seguroDanios;
                        aux_mensualidad = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros+pagoMen;
                        calcular_ingreso = aux_mensualidad/0.35;

                        if(calcular_ingreso<15000)
                            calcular_ingreso = 15000;
                        else
                            calcular_ingreso = calcular_ingreso;

                        ingresoRequerido = calcular_ingreso;

                        //-------- Mensualidad crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //-------- Enganche
                        if(valorVivienda-contariasCon-banamexPresta<0){
                            Enganche = 0;
                        }else{
                            Enganche = valorVivienda-contariasCon-banamexPresta;
                        }

                        //Avalúo
                        if(valorVivienda<=1000000)
                            avaluo = 3500;
                        else if(valorVivienda<=3000000)
                            avaluo = 5500;
                        else if(valorVivienda<=5000000)
                            avaluo = 7500;
                        else if(valorVivienda<=8000000)
                            avaluo = 10500;
                        else if(valorVivienda<=15000000)
                            avaluo = 15500;
                        else if(valorVivienda>15000000){
                            avaluo = 0;
                        }

                    }else if( $("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && dataForm.tipoCalculo == "valorVivienda"){

                        _credito = 1-enganche;

                        //----- Tu casa debería costar
                        if(valorVivienda<500000){
                            aux_valorVivienda = 500000;
                        }else{
                           aux_valorVivienda = valorVivienda;
                        }

                        valorVivienda = aux_valorVivienda;

                        //----- Banamex te presta
                        if(valorVivienda<6000000){
                            aux_banaPresta1 = valorVivienda*_credito;
                        }else{
                            if(valorVivienda>11999999){
                                aux_banaPresta1 = valorVivienda*.50;
                            }else{
                                if(_credito<=.65){
                                    aux_banaPresta1 = valorVivienda*_credito;
                                }else{
                                    aux_banaPresta1 = valorVivienda*.65;
                                }
                            }
                        }

                        if(aux_banaPresta1>(10000000-subcuenta)){
                            aux_banaPresta2 = aux_banaPresta1-subcuenta;
                        }else{
                            aux_banaPresta2 = aux_banaPresta1;
                        }

                        if(aux_banaPresta2+subcuenta>=10000000){
                            aux_banaPresta3 = 10000000-subcuenta;
                        }else{
                            aux_banaPresta3 = aux_banaPresta2;
                        }

                        if(subcuenta+aux_banaPresta3<=valorVivienda){
                            aux_banaPresta4 = aux_banaPresta3;
                        }else{
                            aux_banaPresta4 = valorVivienda-subcuenta;
                        }

                        if(aux_banaPresta4>10000000){
                            banamexPresta = 10000000;
                        }else{
                            if(aux_banaPresta4<300000){
                                banamexPresta = 300000;
                            }else{
                                banamexPresta = aux_banaPresta4;
                            }
                        }

                        //-------- Seguros
                        seguroVida  = (0.5*banamexPresta)/1000;
                        seguroDanios = (0.3*(valorVivienda*0.8))/1000;
                        seguros = seguroVida+seguroDanios;

                        //-------- Ingresos Requeridos
                        aux_mensualidad = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros;
                        calcular_ingreso = aux_mensualidad/.35;

                        if(calcular_ingreso<15000){
                            ingresoRequerido = 15000;
                        }else{
                            ingresoRequerido = calcular_ingreso;
                        }

                        //-------- Enganche
                        if(valorVivienda-contariasCon-banamexPresta<0){
                            Enganche = 0;
                        }else{
                            Enganche = valorVivienda-contariasCon-banamexPresta;
                        }

                        comisionApertura = (banamexPresta*.50)/100;

                        //-------- % financiamiento
                        porcentFinanciamiento= banamexPresta/valorVivienda;

                        //-------- Mensualidad crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //Avalúo
                        if(valorVivienda<=1000000)
                            avaluo = 3500;
                        else if(valorVivienda<=3000000)
                            avaluo = 5500;
                        else if(valorVivienda<=5000000)
                            avaluo = 7500;
                        else if(valorVivienda<=8000000)
                            avaluo = 10500;
                        else if(valorVivienda<=15000000)
                            avaluo = 15500;
                        else if(valorVivienda>15000000){
                            avaluo = 0;
                        }

                    }else if( $("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && dataForm.tipoCalculo == "montoCredito"){

                        _credito = 1-enganche;

                        //----- Banamex te presta
                        if(banamexPresta<300000){
                            banamexPresta = 300000;
                        }else{
                            if(banamexPresta+contariasCon>10000000){
                                banamexPresta = 10000000-contariasCon;
                            }else{
                                banamexPresta = banamexPresta;
                            }
                        }

                        //----- Tu casa debería costar
                        if(banamexPresta<6000000*_credito){
                            aux_valorVivienda1 = banamexPresta/_credito;
                        }else{
                            if(banamexPresta>11999999){
                                aux_valorVivienda1 = banamexPresta/.50;
                            }else{
                                if(_credito<=.65){
                                    aux_valorVivienda1 = banamexPresta/_credito;
                                }else{
                                    aux_valorVivienda1 = banamexPresta/.65;
                                }
                            }
                        }

                        if(aux_valorVivienda1<500000){
                            aux_valorVivienda2 = 500000;
                        }else{
                            aux_valorVivienda2 = aux_valorVivienda1;
                        }

                        aux_valorVivienda3 = banamexPresta+subcuenta;

                        if(aux_valorVivienda3>aux_valorVivienda2){
                            aux_valorVivienda4 = aux_valorVivienda3;
                        }else{
                            aux_valorVivienda4 = aux_valorVivienda2;
                        }

                        if(aux_valorVivienda2 == 500000){
                            valorVivienda = aux_valorVivienda2;
                        }else{
                            valorVivienda = aux_valorVivienda4;
                        }

                        comisionApertura = (banamexPresta*.50)/100;
                        gastosNotariales = valorVivienda*0.05;
                        seguroDanios = (0.3*(valorVivienda*0.8))/1000;

                       //Avalúo
                        if(valorVivienda<=1000000)
                            avaluo = 3500;
                        else if(valorVivienda<=3000000)
                            avaluo = 5500;
                        else if(valorVivienda<=5000000)
                            avaluo = 7500;
                        else if(valorVivienda<=8000000)
                            avaluo = 10500;
                        else if(valorVivienda<=15000000)
                            avaluo = 15500;
                        else if(valorVivienda>15000000){
                            avaluo = 0;
                        }

                        //-------- financiamiento e interés
                        financiamiento_real = ((banamexPresta+creditoInfo)/valorVivienda)*100;
                        enganche_real = 100-financiamiento_real;

                        if(enganche_real<25 && enganche_real>9.99999999999999){
                            tasa_por_enganche = 10.49;
                        }else{
                            if(enganche_real>=25 && enganche_real<35){
                                tasa_por_enganche = 10.25;
                            }else{
                                tasa_por_enganche = 9.99;
                            }
                        }

                        tasa_interes  = tasa_por_enganche;

                        //-------- % financiamiento
                        porc_financiamiento_real = (banamexPresta+creditoInfo)/valorVivienda;
                        if(_credito>porc_financiamiento_real)
                            porcentFinanciamiento = porc_financiamiento_real;
                        else
                            porcentFinanciamiento = _credito;

                        //-------- validar Ingresos Requeridos
                        seguroVida = (banamexPresta*0.5)/1000;
                        seguros = seguroVida+seguroDanios;
                        aux_mensualidad = simulador.PAGO(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta)+seguros+pagoMen;
                        calcular_ingreso = aux_mensualidad/0.35;

                        if(calcular_ingreso<15000)
                            calcular_ingreso = 15000;
                        else
                            calcular_ingreso = calcular_ingreso;

                        ingresoRequerido = calcular_ingreso;

                        //-------- Mensualidad crédito
                        mensualidadCredito = simulador.obtenerPMT(tasa_interes*0.01/12,[dataForm.tiempoApagar]*12,banamexPresta,1);

                        //-------- Enganche
                        if(valorVivienda-contariasCon-banamexPresta<0){
                            Enganche = 0;
                        }else{
                            Enganche = valorVivienda-contariasCon-banamexPresta;
                        }

                        pagoMen = mensualidadCredito;

                    }

                    if(dataForm.tipoCalculo == "cambiaHipoteca" || dataForm.tipoCalculo == "respalda2"){
                        amarra = 0;
                    }
                    else if( $("#swmitasa").is(":checked") ){
                        amarra = banamexPresta *0.01*1.16;
                    }
                    else{
                        amarra = 0;
                    }
                    var arr = simulador.crearArreglo(men2,banamexPresta,tasa_interes/100,dataForm.tiempoApagar,valorVivienda,cantPrep,ingresoRequerido);
                    arr[0] = Math.round( (-1)*banamexPresta+comisionApertura+avaluo );
                    //console.log(arr)
                    var mycat = simulador.calculaCAT(arr);
                    var costoAnual = mycat*10/10;
                    CAT = formato_numero(mycat +"", 1,".", ",")+" %";

                    valHtml.value_avaluo = (avaluo==0) ? "Se cotiza" : ("$ "+formato_numero(Math.round(avaluo),2,".", ",")+(dataForm.tipoProducto == "cofinavit" || dataForm.tipoProducto == "alia2" || dataForm.tipoProducto == "respalda2" ? "*": ""));
                    valHtml.value_avaluoR = (avaluo2!=0) ?  "$ "+formato_numero(avaluo2,2,".", ",")  : "--";
                    valHtml.value_ahorroR ="$ "+formato_numero(estudioSocioeconomico+avaluo2+gastosNotariales2,2,".", ",") ;
                    valHtml.value_AhorroTerminoCredito="$ "+formato_numero(((seguroVida+comisionAdministracion)*dataForm.tiempoApagar*12)+comisionApertura+estudioSocioeconomico,2,".", ",")     ;
                    valHtml.value_CAT='<span style="font-size:14px;font-weight:bold">'+CAT+'</span>';
                    valHtml.value_valorPrestamo ="$ "+formato_numero(Math.round(banamexPresta),2,".", ",") ;
                    valHtml.value_amarra ="$ "+formato_numero(Math.round(amarra),2,".", ",") ;
                    valHtml.value_comisionAperturaR= "--";//"$ "+formato_numero(comisionApertura,2,".", ",") ;
                    valHtml.value_comisionApertura= "$ "+formato_numero(Math.round(comisionApertura),2,".", ",") ;
                    valHtml.value_comisionAdministracionR=   "$ "+formato_numero(comisionAdministracion,2,".", ",") ;
                    valHtml.value_estudioSocioeconomicoR="$ "+formato_numero(estudioSocioeconomico,2,".", ",") ;
                    valHtml.value_enganche=(Enganche!=0) ?  "$ "+formato_numero(Math.round(Enganche),2,".", ",")  : "--";

                    valHtml.value_gastosNotariales= ((gastosNotariales!=0) ?  "$ "+formato_numero(Math.round(gastosNotariales),2,".", ",")  : "--");
                    valHtml.value_gastosNotarialesR= (gastosNotariales2!=0) ?  "$ "+formato_numero(gastosNotariales2,2,".", ",")  : "--";

                    valHtml.value_gastoInicial ="$ "+formato_numero(Math.round((comisionApertura+avaluo+Enganche+gastosNotariales)),2,".", ",") ;
                    valHtml.value_ingresoRequerido="$ "+formato_numero(Math.round(ingresoRequerido),2,".", ",");

                    valHtml.value_mensualidadCredito="$ "+formato_numero(Math.round(mensualidadCredito),2,".", ",");
                    valHtml.value_pagoTotalMensual="$ "+formato_numero(Math.round((mensualidadCredito+seguroDanios+seguroVida)),2,".", ",");
                    valHtml.value_porcentFinanciamiento=formato_numero(porcentFinanciamiento*100,1,".", ",")  +"%";

                    valHtml.value_seguroVida= "$ "+formato_numero(Math.round(seguroVida),2,".", ",");
                    valHtml.value_seguroDanios= "$ "+formato_numero(Math.round(seguroDanios),2,".", ",");
                    valHtml.value_tiempoApagar=dataForm.tiempoApagar+" a&#241;os";
                    valHtml.value_tasaInteresAnual=formato_numero(tasa_interes, 2,".", ",")+" %";
                    valHtml.value_valorVivienda=  "$ "+formato_numero(Math.round(valorVivienda), 2,".", ",");

                    valHtml.value_AhorroHipoR= "$ "+formato_numero(seguroVida+comisionAdministracion,2,".", ",")     ;

                    valHtml.value_gastoTitulacion="$ "+formato_numero(gasTitu,2,".", ",");
                    valHtml.value_pagoMenAyudaCred="$ "+formato_numero(pagoMen,2,".", ",");
                    //valHtml.value_pagoMenAyudaCred="$ "+formato_numero(mensualidadCredito,2,".", ",");
                    valHtml.value_saldoSubcuenta="$ "+formato_numero(subcuenta,2,".", ",");
                    valHtml.value_contariasCon="$ "+formato_numero(contariasCon,2,".", ",");

                    if( dataForm.tipoProducto == "adquisicion" ){
                      if(dataForm.tipoCalculo != "cambiaHipoteca"){
                      valHtml.value_mensualidadCredito="$ "+formato_numero(mensualidadCredito,2,".", ",");
                      valHtml.value_seguroVida= "$ "+formato_numero(seguroVida,2,".", ",");
                      valHtml.value_seguroDanios= "$ "+formato_numero(seguroDanios,2,".", ",");
                      valHtml.value_pagoTotalMensual="$ "+formato_numero((mensualidadCredito+seguroDanios+seguroVida),2,".", ",");
                      }
                    }

                    amortizacion.param="conPrepago="+conPrepago+"&producto="+dataForm.tipoProducto+"&tipo="+dataForm.tipoCalculo+"&men="+men2+"&mc="+banamexPresta +"&tasa="+formato_numero(tasa_interes, 2,".", ",")+"&cat="+ formato_numero(CAT,1,".", ",")+"&plazo="+dataForm.tiempoApagar+"&ingreso="+ingresoRequerido+"&vC="+valorVivienda+"&minSalario="+datosXml.salarioMin+"&comisionApertura="+comisionApertura+"&avaluo="+avaluo;

                    window.parent.$("#meInteresaModal").data("datosCredito",{producto:dataForm.tipoProducto,tipo:dataForm.tipoCalculo,men:men2,mc:banamexPresta,tas:formato_numero(tasa_interes, 2,".", ","),cat:formato_numero(CAT,2,".", ","),plazo:dataForm.tiempoApagar,ingreso:ingresoRequerido,vc:valorVivienda,minSalario:datosXml.salarioMin,comisionApertura:comisionApertura,avaluo:avaluo});
                    amortizacion.paramIt ="&pF="+porcentFinanciamiento;

                    if(dataForm.tipoCalculo != "cambiaHipoteca"){

                        if(dataForm.tipoProducto == "cofinavit"){
                            valHtml.value_creditoInfonavit="$ "+formato_numero(creditoInfo,2,".", ",");

                            $("#seccionValueAyudaCredinfo").show();
                            $("#txt_creditoFovisss,#label_tipoCreditoFovisss").hide();
                            $("#txt_creditoInfo,#label_tipoCreditoInfo,#li_text_gastosTituInfo,#li_text_pagoMenCredInfo").show();
                        }
                        else if(dataForm.tipoProducto == "alia2"){
                            valHtml.value_creditoInfovissste="$ "+formato_numero(creditoInfo,2,".", ",");

                            $("#seccionValueAyudaCred").show();
                            $("#li_text_gastosTituInfo").hide();
                            $("#txt_creditoInfo,#label_tipoCreditoInfo").hide();
                            $("#txt_creditoFovisss,#label_tipoCreditoFovisss,#li_text_pagoMenCredInfo").show();
                        }
                        else if(dataForm.tipoProducto == "respalda2"){
                            $("#amarratucasa").hide();

                            $("#seccionValueAyudaCred").show();
                            $("#li_text_gastosTituInfo").hide();
                            $("#txt_creditoInfo,#label_tipoCreditoInfo,#txt_creditoFovisss,#li_text_pagoMenCredInfo").hide();
                            $("#label_tipoCreditoFovisss").show();
                        }else{
                            hideSeccionValueAyudaCred();
                          }
                    }else{
                       hideSeccionValueAyudaCred();
                       $("#amarratucasa").hide();

                          }
                    ponerValoresHtml();
                    },
                    obtenerPorcentaje: function(valorVivienda,infonavit){
                        var porcentaje;
                        if(valorVivienda<5000001){
                            if(infonavit == 1)
                                porcentaje = 90/100;
                            else
                                porcentaje = 85/100;
                        }
                        else
                        {
                            if(valorVivienda<=11000000)
                                var porcentaje= 65/100;
                            else
                                var porcentaje = 50/100;
                        }
                        return porcentaje;
                    },
                    masInfo:function(){

                        var url_ ="";

                        if($("#cambiaH").hasClass("selected"))
                            url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/paga_hipoteca/cambia_hipoteca.htm';
                        else if($("#chkinfonavit").is(":checked") && $("#cofinavit").is(":checked") )
                            url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/compra_casa/cofinavit.htm';
                        else if($("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") )
                            url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/compra_casa/apoyo_infonavit.htm';
                        else if( $("#apoyoFovissste").is(":checked")  && $("#Alia2").is(":checked") )
                            url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/compra_casa/alia2.htm';
                        else if($("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") )
                            url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/compra_casa/respalda2.htm';
                        else
                           url_='https://www.banamex.com/es/personas/creditos/credito_hipotecario/compra_casa/tasa_fija.htm?icid=Menu-Credito-Hipotecario-HipotecarioSin-01292013-Int-Es';

                        $("#button_info").attr('href',url_);

                    },
                    obtenerPMT: function(rate, nper, pv, fv, type) {
                        if (!fv) fv = 0;
                        if (!type) type = 0;

                        if (rate == 0) return -(pv + fv)/nper;
                        var pvif = Math.pow(1 + rate, nper);
                        var pmt = ((rate * pvif)* pv) / (pvif - 1);
                        if (type == 1) {
                            pmt /= (1 + rate);
                        };

                        return pmt;
                    },
                    setTextHtml : function(){
                        var cofi =  $("input[name=apoyoInfonavit_tipo][value=Cofinavit]:checked");
                        var apoyo=  $("input[name=apoyoInfonavit_tipo][value=Infonavit]:checked");
                        var alia =  $("input[name=apoyoFovissste_tipo][value=Alia2]:checked");
                        var respal = $("input[name=apoyoFovissste_tipo][value=Respalda2]:checked");
                        var bana1 = $("input[name=clienteBanamex][value=SI]:checked");
                        $("#avaluoLegal").hide();
                        $("#CAT_").html( $(".value_CAT span").html());
                        $("#tituloPrincipal,#labelLegalTipoProducto").html( datosXml.titulos['hipo'] + "&nbsp;");
                        $("#textBanamex1,#label_Banamex1").html("Perfiles Banamex");

                        if( dataForm.tipoCalculo == "valorVivienda" ){
                            $('#descTitle,#descTipoProductoTabla,#descTab').html("Adquisición");

                            if($("#chkinfonavit").is(":checked")){
                                $('#descTitle,#descTipoProductoTabla,#descTab').empty();
                                if(cofi.length!=0){
                                    $("#tituloPrincipal,#labelLegalTipoProducto").html(datosXml.titulos['cofi'] + "&nbsp;");
                                    $("#avaluoLegal").show();
                                }
                                if(apoyo.length!=0)
                                    $("#tituloPrincipal,#labelLegalTipoProducto").html(datosXml.titulos['apoyo'] + "&nbsp;");
                                }else if($("#apoyoFovissste").is(":checked")){
                                    $('#descTitle,#descTipoProductoTabla,#descTab').empty();
                                    if(alia.length!=0){
                                        $("#tituloPrincipal,#labelLegalTipoProducto").html(datosXml.titulos['alia'] + "&nbsp;");
                                        $("#avaluoLegal").show();
                                    }
                                    if(respal.length!=0){
                                        $("#tituloPrincipal,#labelLegalTipoProducto").html(datosXml.titulos['respal'] + "&nbsp;");
                                        $("#avaluoLegal").show();
                                    }
                                }
                        }else{
                            $("#avaluoLegal").hide();
                            $('#descTitle,#descTipoProductoTabla,#descTab').html("Cambia tu Hipoteca con&nbsp;");
                        }
                        if(bana1.length!=0)
                            $("#textBanamex1,#label_Banamex1,#descTab_").html("Banamex 1");
                        else
                            //$("#descTab_").html("SIN");
                        $("#descTab_").html("Perfiles Banamex.");
                    },
                    PAGO:function (A1,B1,C1,i){
                        var aux = Math.pow((1+A1),-B1);
                        return (A1)*C1/(1-(aux));
                    },
                    setRealizarSim:function(valor){realizarSim = valor;},
                    getRealizarSim:function(){return realizarSim;},
                    resetSimulador:function(){
                        resetForm();
                        resetValoresHtml();
                        ponerValoresHtml();
                    },
                    ver:function(){return dataForm;},
                    simular:function(){
                        if( realizarSim =="" ){
                            return false;
                        }

                        setValoresForm_();
                        this.realiza[realizarSim]();
                        $("#contenBotones").show();
                        simulador.setTextHtml();

                    },modLegal:function(){
                        var cofi =  $("input[name=apoyoInfonavit_tipo][value=Cofinavit]:checked");
                        var apoyo=  $("input[name=apoyoInfonavit_tipo][value=Infonavit]:checked");
                        var alia =  $("input[name=apoyoFovissste_tipo][value=Alia2]:checked");
                        var respal = $("input[name=apoyoFovissste_tipo][value=Respalda2]:checked");

                        $("#modLegal").show();
                        $("#avaluoLegal").hide();
                        //modificacion de legales
                        $("#CAT_").html( $(".value_CAT span").html() );

                        $("#labelLegalTipoProducto").html(datosXml.titulos['hipo']);

                        /* Cálculos de adquisición */
                        if(dataForm.tipoCalculo == "valorVivienda"){
                            $("#descTab").html("Adquisición ");

                            if($("#chkinfonavit").is(":checked")){

                                $("#descTab").empty();
                                if(cofi.length!=0){
                                    $("#labelLegalTipoProducto").html(datosXml.titulos['cofi']);
                                    $("#avaluoLegal").show();
                                }
                                if(apoyo.length!=0) $("#labelLegalTipoProducto").html(datosXml.titulos['apoyo']);

                            }else if($("#apoyoFovissste").is(":checked")){

                                $("#descTab").empty();
                                if(alia.length!=0){
                                    $("#labelLegalTipoProducto").html(datosXml.titulos['alia']);
                                    $("#avaluoLegal").show();
                                }
                                if(respal.length!=0){
                                    $("#labelLegalTipoProducto").html(datosXml.titulos['respal']);
                                    $("#avaluoLegal").show();
                                }

                            }
                            }else{
                                $("#avaluoLegal").hide();
                                $("#descTab").html("Cambia tu Hipoteca con ");
                            }

                            var bana1 = $("input[name=clienteBanamex][value=SI]:checked");
                            if(bana1.length==1){
                                $("#descTab_").html("&nbsp;&nbsp;Banamex 1");
                            }else{
                                $("#descTab_").html("&nbsp;&nbsp;SIN");
                            }
                        },
                        getDatosMetrica : function(){
                            var valor =0;
                            if(dataForm.tipoCalculo == "montoCredito"){
                                valor = Math.ceil(dataForm.valorPrestamo/1000000);
                            }
                            else if(dataForm.tipoCalculo == "valorVivienda"){
                                valor = Math.ceil(dataForm.valorVivienda/1000000);
                            }
                            else if (dataForm.tipoCalculo == "pagoMensual"){
                                valor = Math.ceil(dataForm.pagoMensual/10000);
                            }
                            else if (dataForm.tipoCalculo == "ingresosMensuales"){
                                valor = Math.ceil(dataForm.ingresoMensual/100000);
                            }
                            else{
                                valor = Math.ceil(dataForm.cuantoRestaCreditoActual/200000);
                            }

                            var tiempo = dataForm.tiempoApagar;

                            var producto = "";
                            if(dataForm.tipoProducto == "cofinavit")
                                producto = "Cofin";
                            else if (dataForm.tipoProducto == "infonavit")
                                producto = "Apoyo";
                            else if (dataForm.tipoProducto == "alia2")
                                producto = "Alia2";
                            else if (dataForm.tipoProducto == "respalda2")
                                producto = "Resp2";
                            else
                                producto = "adquisicion";

                            var calculo = dataForm.tipoCalculo;
                            var banamex = (dataForm.clienteBanamex) ? 'CSI' : 'CNO';
                            var datos = {
                                    valor : valor,
                                    tiempo : tiempo,
                                    producto : producto,
                                    calculo : calculo,
                                    banamex : banamex
                            };


                        return datos;
                    },
                    imprimirSolicitud:function(){
                        var solicitud = "<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><meta http-equiv='Content-Type' content='text/html; charset=utf-8'><link type='text/css' rel='stylesheet' href='css/general.css' /><style>.value_CAT span,#CAT_ {font-size: 20px !important;}</style><div style='width:610px;'>" + $('#imprimirSimulacion').html()+"<div style='margin-top:15px;float:left;'>"+$('.terminos').html()+"</div></div>";
                        var ventImp = window.open('','_blank','width=640,height=650,top=0,left=0,scrollbars=yes');
                        ventImp.document.write(solicitud);
                        $.ajax({
                            url: '/simulador-hipotecario/css/general.css',
                            success: function(data) {
                                ventImp.document.write('<style>'+data+'</style>');
                            }
                        });


                        $.ajax({
                            url: '/simulador-hipotecario/css/general.css',
                            success: function(data) {
                                ventImp.document.write('<style>'+data+'</style>');
                            }
                        });

                        setTimeout(function(){
                            ventImp.print();
                            ventImp.document.close();
                            ventImp.close();
                        },100)
                    },
                    crearArreglo(mensualidad,saldo,tasa,plazo,valorCasa,prepagos,ingreso){

                        var ap_patronal = 0;
                        var apoyo_infonavit=75.49;
                        conPrepago = false;
                        var i =  (i) ? i : 1;
                        var pagoAlCredito = (i) ? mensualidad : 0;
                        var pagoTotal = 0;
                        var dato  = null;
                        var t = $("#contentTable");
                        var contadoGris= 1;
                        var aportacionPatronal = 0;
                        var prepago = prepagos > 0 ? prepagos : 0;
                        var seguroDanios= (valorCasa*.80)*(0.3)/1000;
                        var seguroVida= Math.round(0.0005*saldo);
                        var aux3 = mensualidad;
                        var flgpago = 0;
                        var pagoAnterior =0;
                        var ingresoMin_req = ingreso;
                        var arrPagoTotal = new Array();
                        var eleccion;

                        if(dataForm.tipoCalculo == "valorVivienda"){
                            eleccion  = 0
                        }else if(dataForm.tipoCalculo == "montoCredito"){
                            eleccion  = 1
                        }else{
                            eleccion  = 2323
                        }
                        
                        if( $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 0 ||  $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 1 ){
                            conPrepago = 'true';
                        }
                        
                        for( i ; i<= (plazo*12) ; i++){

                            var interes  = tasa*saldo/12;
                            var aux1  = 0;
                            var aux2  = 0;
                            
                            if( i == 1  ){
                                //if($("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && eleccion == 1){
                                    //pagoAlCredito = mensualidad;
                                //}else{
                                    pagoAlCredito = calculaPagoCredito(saldo,plazo*12,tasa);
                                //}
                                
                            }
                            else if(saldo == 0){
                                pagoAlCredito = 0;
                            }
                            else if(saldo >= 0){
                                var calculoSaldoInteres = saldo + interes;
                                var calculoComparativo = 0;
                                var calculoIf = 0;
                                var calculoElse  = 0;
                                let prepagoValue = 0;
                                prepagoValue = $(".prepago")[i-2];
                                prepagoValue = parseInt($(prepagoValue).val());
                                
                                var sumaFL = pagoAlCredito + seguroVida + seguroDanios + pagoTotal  + prepagoValue;
                                var sumaFI = pagoAlCredito + seguroVida + seguroDanios;
                                
                                if(prepagoValue >= sumaFI){
                                      calculoComparativo = calculaPagoCredito(saldo,(plazo*12 - (i - 1) ),tasa)
                                }else{
                                    calculoComparativo = pagoAlCredito;
                                }

                                
                                if($("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 0 || $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 1 || dataForm.tipoCalculo == 'cambiaHipoteca' || $("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && eleccion == 0 || $("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && eleccion == 1 || $("#apoyoFovissste").is(":checked") && $("#Alia2").is(":checked") && dataForm.tipoCalculo == "valorVivienda" || $("#apoyoFovissste").is(":checked") && $("#Alia2").is(":checked") && dataForm.tipoCalculo == "montoCredito"){

                                    if(calculoSaldoInteres < calculoComparativo){
                                        pagoAlCredito = calculoSaldoInteres;
                                    }else{
                                        if(prepagoValue >= sumaFI){

                                            pagoAlCredito = calculaPagoCredito(saldo,(plazo*12 - (i - 1) ),tasa)

                                        }else{
                                            pagoAlCredito = pagoAlCredito;
                                        } 

                                    }

                                }/*else if($("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && eleccion == 1){

                                    pagoAlCredito = mensualidad;

                                    if(saldo<=0){
                                       pagoAlCredito = 0; 
                                    }else{
                                        pagoAlCredito = pagoAlCredito;
                                    }

                                }*/

                            }
                            
                            var amortizacion = pagoAlCredito-interes.toFixed(11);

                            seguroVida = saldo*0.0005;
                            seguroVida = parseFloat(seguroVida.toFixed(11));

                            if( $("#apoyoFovissste").is(":checked") && $("#Respalda2").is(":checked") && eleccion == 0 ){
                                //seguro de vida
                                if( saldo*0.0005<=0 ){
                                    _seguroVida = 0;
                                }else{
                                    _seguroVida = saldo*0.0005;
                                }
                            }

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

                            }else{
                                ap_patronal = 0;
                            }
                            
                            if( conPrepago == 'true'){
                                arrPagoTotal[i] = Math.round( pagoAlCredito+seguroVida+seguroDanios+ap_patronal+prepago );
                                pagoTotal = arrPagoTotal[i];
                            }else{
                                arrPagoTotal[i] = Math.round( pagoAlCredito+seguroVida+seguroDanios );
                            }

                            arrPagoTotal[i] = parseFloat(arrPagoTotal[i].toFixed(11)) 

                            if(saldo-amortizacion-prepago<=0){
                                saldoFinal = 0;
                            }else{
                                saldoFinal = saldo-amortizacion-prepago-ap_patronal;
                            }

                            pagoTotalAux = pagoTotal;   
                            
                            aux1=prepago;
                            aux2 = pagoAlCredito;
                            
                            if(aux1>aux2)
                                flgpago = 1;
                            else
                                flgpago = 0;
                                
                            aux3 = pagoAlCredito;
                            prepago = 0;

                            saldo = (saldoFinal<=0.9) ?  0 : saldoFinal ;
                            if(saldoFinal<=0) break;

                        }//for

                        return arrPagoTotal;
                                
                    },
  
                    vpl:function (taxa, arrPrepago){

                        var ret = arrPrepago[0];
                        for (var i=1; i<arrPrepago.length; i++)
                            ret += arrPrepago[i] / Math.pow( (1.0 + taxa), i);
                        return ret;
                    },
                    tir:function (arrPrepago){

                        var ret = -1000000000.0;
                        var juros_inicial = -1.0;
                        var juros_medio = 0.0;
                        var juros_final = 1.0;
                        var vpl_inicial = 0.0;
                        var vpl_final = 0.0;
                        var vf = 0.0;
                        var erro = 1e-5;

                        for (var i=0; i<100; i++) {
                        vpl_inicial = simulador.vpl(juros_inicial, arrPrepago);
                          vpl_final = simulador.vpl(juros_final, arrPrepago);
                          if (simulador.sinal(vpl_inicial) != simulador.sinal(vpl_final))
                        break;
                          juros_inicial -= 1.0;
                          juros_final += 1.0;
                        };

                        var count = 0;
                        for (;;) {
                          var juros_medio = (juros_inicial + juros_final) / 2.0;
                        var vpl_medio = simulador.vpl(juros_medio, arrPrepago)


                        if (Math.abs(vpl_medio) <= erro) {
                            return juros_medio*100.0;
                        }

                        if (simulador.sinal(vpl_inicial) == simulador.sinal(vpl_medio)) {
                            juros_inicial = juros_medio;
                            vpl_inicial = simulador.vpl(juros_medio, arrPrepago);
                        }else{
                            juros_final = juros_medio;
                            vpl_final = simulador.vpl(juros_medio, arrPrepago);
                        }

                        if (++count > 10000)
                            throw "looping inválido";
                        }
                    return ret;
                },
                sinal:function (x) {
                    return x < 0.0 ? -1 : 1;
                }
                }
                })()


var amortizacion = {
    url: '/simulador-hipotecario/tabla-amortizacion/',
    param:'',
    paramIt:'',
    open:function(){

        var prepago = "";
        var Bana1="";
        var eleccion

        if(Saction.simulacion == "valor de la vivienda"){eleccion = 0}else{eleccion = 3232}
            if( $("#chkinfonavit").is(":checked") && $("#infonavit").is(":checked") && eleccion == 0 ){
                prepago="&prepago=true";
            }

            if($("input[name=clienteBanamex]:checked").val()=="SI"){
                Bana1 = "&Bana1=true";
            }else{
                Bana1 = "&Bana1=false";
            }

            var title  = encodeURI($('#descTab').html().split("&nbsp").join(" ")+$("#tituloPrincipal").html().split("&nbsp").join(" ")+" "+$("#textBanamex1").html());
            var titulo ="&titulo="+Saction.urttabla;
            window.open("/simulador-hipotecario/tabla-amortizacion/index.html?"+this.param+prepago+Bana1+titulo, "", "width=1400, height=500,scrollbars=yes");
        },
        solicitud:function(){
            metrica.simulador(2);
            window.open("https://portal.banamex.com.mx/contactohipotecario/index.html?xhost=https://www.banamex.com.mx/?"+this.param+this.paramIt, "", "width=552, height=970,scrollbars=yes");
            //window.open("https://portal.banamex.com.mx/formularios/hipotecario/?"+this.param+this.paramIt, "", "width=430, height=650,scrollbars=yes");
        }
}

var metrica = {
    page : 'MX|PERSONAS|SIMULADORHIPOTECARIO|',
    simulador:function(tipoMetrica,tipoCredito){

        switch(tipoMetrica){

            case 0://Modal
                s.pageName = this.page + "MODAL|";
                if(tipoCredito == "compraCasa")
                   s.eVar4 = this.page + "COMPRA";
                else
                    s.eVar4 = this.page + "CAMBIA";
            break;

            case 1:// General

                s.pageName = this.page + "HOME";
                s.prop22="MX|PERSONAS|SIMULADORHIPOTECARIO|Home";

            break;

            case 2:// Operar

                var datos = simulador.getDatosMetrica();
                s.pageName = this.page + "USO";
                if(datos.calculo == "cambiaHipoteca")
                   s.prop22 = this.page + "CAMBIA"+ "/" + datos.calculo;
                else
                    s.prop22 = this.page + "COMPRA"+ "/" + datos.calculo;
                var producto = "";
                if(datos.producto != "adquisicion")
                    producto = "|SH:" + datos.producto;

                s.prop58 = "SH:" + datos.valor + "|SH:" + datos.tiempo + producto + "|SH:" + datos.banamex;
            break;
        }
        void(s.t());
    },

    metricaImprimir:function(){
        s.linkTrackVars='eVar25,events';
        s.linkTrackEvents='event30';
        s.eVar25='MX|PERSONAS|SIMULADORHIPOTECARIO|COMPRA|'+simulador.getDatosMetrica().calculo+'|print';
        s.events='event30';
        s.tl(this,'o','MX|PERSONAS|SIMULADORHIPOTECARIO|Print')
    },
    metricaVerTabla:function(){
        var datos = simulador.getDatosMetrica();
        s.pageName = "MX|PERSONAS|SIMULADORHIPOTECARIO|Tabla AmortizaciÃƒÂ³n|"+simulador.getDatosMetrica().calculo;
        if(datos.calculo == "cambiaHipoteca")
            s.prop22 = this.page + "CAMBIA"+ "/" + datos.calculo;
        else
            s.prop22 = this.page + "COMPRA"+ "/" + datos.calculo;
        var producto = "";
        if(datos.producto != "adquisicion")
            producto = "|SH:" + datos.producto;

        s.prop58 = "SH:" + datos.valor + "|SH:" + datos.tiempo + producto + "|SH:" + datos.banamex;
        void(s.t());
    }
}


$( window ).unload(function() {
    s.linkTrackVars='prop22,events';
    s.linkTrackEvents='event30';
    s.prop22='MX|PERSONAS|SIMULADORHIPOTECARIO|'+simulador.getDatosMetrica().calculo+'|play|'+(countUse>2);
    s.events='event30';
    s.tl(this,'o', 'MX|PERSONAS|SIMULADORHIPOTECARIO|USO')
    sleepFor(500);
});


window.onbeforeunload = function(e) {}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

 $("#chkinfonavit").change(function(){

    if( $("#chkinfonavit").is(":checked") == true ){
        var _this = $("#enganche").find("option")[0];
        $(_this).text("10%").val(".10");
        simulador.resuelve();
    }else if( $("#chkinfonavit").is(":checked") == false ) {
        var _this = $("#enganche").find("option")[0];
        $(_this).text("15%").val(".15");
        simulador.resuelve();
    }

 });

 $("#swmitasa").change(function(){
   if($("#swmitasa").is(":checked") == true){
        simulador.resuelve();

   }
   else {
        amarra = 0;
        simulador.resuelve();
   }
 });

  $("#apoyoFovissste").change(function(){

    if( $("#apoyoFovissste").is(":checked") == true ){
        var _this = $("#enganche").find("option")[0];
        $(_this).text("10%").val(".10");
        simulador.resuelve();
    }else if( $("#apoyoFovissste").is(":checked") == false ) {
        var _this = $("#enganche").find("option")[0];
        $(_this).text("15%").val(".15");
        simulador.resuelve();
    }

 });
 
 
 //function para calcular pago al credito
function calculaPagoCredito(saldoTotal,plazoCredito,tasa){
    //var pagoCredito = PAGO(tasa/12,plazoCredito,-1000).toFixed(2)/ 1000;
    var pagoCredito =Math.ceil((simulador.PAGO(tasa/12,plazoCredito,-1000))*-100)/100000
    pagoCredito = (pagoCredito * saldoTotal);
    
    return pagoCredito;
}
