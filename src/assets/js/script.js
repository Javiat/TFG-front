
$(document).ready(function() {

    $("#prueba").click(function(){
        $("#login").hide();
        $("#formulario_registro").show();
    });
    $("#prueba2").click(function(){
        $("#login").show();
        $("#formulario_registro").hide();
    });
    /* initialize the external events
    -----------------------------------------------------------------*/

    // $('#external-events .fc-event').each(function() {

    //     // store data so the calendar knows to render an event upon drop
    //     $(this).data('event', {
    //         title: $.trim($(this).text()), // use the element's text as the event title
    //         stick: true // maintain when user navigates (see docs on the renderEvent method)
    //     });

    //     // make the event draggable using jQuery UI
    //     $(this).draggable({
    //         zIndex: 999,
    //         revert: true,      // will cause the event to go back to its
    //         revertDuration: 0  //  original position after the drag
    //     });

    // });


    // /* initialize the calendar
    // -----------------------------------------------------------------*/

    // $('#calendar').fullCalendar({
    //     header: {
    //         left: 'prev,next today',
    //         center: 'title',
    //         right: 'month,agendaWeek,agendaDay'
    //     },
    //     editable: true,
    //     droppable: true, // this allows things to be dropped onto the calendar
    //     dragRevertDuration: 0,
    //     drop: function() {
    //         // is the "remove after drop" checkbox checked?
    //         if ($('#drop-remove').is(':checked')) {
    //             // if so, remove the element from the "Draggable Events" list
    //             $(this).remove();
    //         }
    //     },
    //     eventDragStop: function( event, jsEvent, ui, view ) {
            
    //         if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
    //             $('#calendar').fullCalendar('removeEvents', event._id);
    //             var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
    //             el.draggable({
    //               zIndex: 999,
    //               revert: true, 
    //               revertDuration: 0 
    //             });
    //             el.data('event', { title: event.title, id :event.id, stick: true });
    //         }
    //     }
    // });


});