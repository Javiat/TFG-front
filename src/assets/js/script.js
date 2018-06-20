
$(document).ready(function() {
   
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
    $("#tasks").click(function(){
        $("#formulario").show();
        $("#tareas").hide();
        
    });
    $("#actualizar").click(function(){
        $("#tareas").show();
        $("#formulario").hide();
        
    });
    $("#nivel1").mouseover(function(){
        $("#descripcion_solucion1").show(); 
    });
    $("#nivel1").mouseout(function(){
        $("#descripcion_solucion1").hide();
       
    });
    $("#nivel2").mouseover(function(){
        $("#descripcion_solucion2").show(); 
    });
    $("#nivel2").mouseout(function(){
        $("#descripcion_solucion2").hide();
       
    });
    $("#nivel3").mouseover(function(){
        $("#descripcion_solucion3").show(); 
    });
    $("#nivel3").mouseout(function(){
        $("#descripcion_solucion3").hide();
       
    });
});