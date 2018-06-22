
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
    $("#scroll_nivel1").click(function(){
        $("#descripcion_solucion1").show();
        $("#scroll_nivel1").hide();
    });
    $("#no_scroll_nivel1").click(function(){
        $("#descripcion_solucion1").hide();
        $("#scroll_nivel1").show();
    });
    
    $("#scroll_nivel2").click(function(){
        $("#descripcion_solucion2").show();
        $("#scroll_nivel2").hide();
    });
    $("#no_scroll_nivel2").click(function(){
        $("#descripcion_solucion2").hide();
        $("#scroll_nivel2").show();
    });
    $("#scroll_nivel3").click(function(){
        $("#descripcion_solucion3").show();
        $("#scroll_nivel3").hide();
    });
    $("#no_scroll_nivel3").click(function(){
        $("#descripcion_solucion3").hide();
        $("#scroll_nivel3").show();
    });
});