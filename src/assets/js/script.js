
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
    
});