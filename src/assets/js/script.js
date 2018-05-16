
$(document).ready(function() {
    console.log('entra');
    $("#prueba").click(function(){
        $("#login").hide();
        $("#formulario_registro").show();
    });
    $("#prueba2").click(function(){
        $("#login").show();
        $("#formulario_registro").hide();
    });
    $("#tareas_planificadas").click(function(){
        $("#planificar").hide();
        $("#planificadas").show();
       
    });
    $("#tareas_planificar").click(function(){
        $("#planificar").show();
        $("#planificadas").hide();
        
    });
    // $("#btn-cargar3").hover(function(){
    //     $("#descripcion_solucion").show();
    // }, function(){
    //     $("#descripcion_solucion").hide();
    // });
    // $("#btn-juego3").hover(function(){
    //     $("#descripcion_base").show();
    // }, function(){
    //     $("#descripcion_base").hide();
    // });
    // function prueba(){
    //     $("#btn-juego3").show(); 
    // }
   
    
});