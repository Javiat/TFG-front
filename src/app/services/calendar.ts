import { Options } from 'fullcalendar';
export var Calendar:Options={
    locale:'es',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay',
      
  },
  
  events:[],
  businessHours: {
    start: '09:00', // hora final
    end: '21:00', // hora inicial
    dow: [ 1, 2, 3, 4, 5 ],
  },
  buttonText: {
    month:'Mes',
    week:'Semana',
    day:'Dia'
  },

  editable: true,
  eventLimit: false,
  eventConstraint: "businessHours",
  defaultView:'agendaWeek',
  themeSystem: 'bootstrap3',
  columnFormat:'dddd D' ,
  firstDay:1,
  allDaySlot:false,
};