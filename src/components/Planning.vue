<template>
  <!-- <div>{{ info }}</div> -->
<div class="container">
  <h1>Planning du</h1>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</div>

</template>

<script>

import axios from "axios";

import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';


export default {
  name: "Planning",
  data: function () {
    return {
      info: null,
      hours:[],
      calendarOptions: {
        plugins: [ timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridDay',
        locales: [frLocale],
        locale:"fr",
        headerToolbar: {
          start: "",
          center:'title',
          end: '',
        } ,
        slotMinTime: "07:00:00",
        slotLabelInterval: "00:30",
        allDaySlot:false,
        events: [],
      },
      
       
    };
  },
  async mounted() {
    try {
      let response = await axios.get(`${process.env.VUE_APP_URL}/${ this.$route.params.id}/activities` );
      this.calendarOptions.events = await this.formatDateFromData(response.data);
      this.setDescription()
      // let calendarApi = this.$refs.fullCalendar.getApi()
      // console.log(calendarApi)

    } catch (e) {
      console.error(e);
    }  

  },
  components: {
    FullCalendar
  },
  methods: {
    getRandomColor: function () {
      let colors = ["#A4F3B1", "#B9A4F3", "A4EAF3", "F29090"];
      return colors[Math.floor(Math.random() * (colors.length - 1) )];
    },
    formatDateFromData: function (data) {
      let infosWithFormatedDate = data.map((row) => {
        return {
          ...row,
          start: row.beginAt.replace(' ', 'T'),
          end: row.endAt.replace(' ', 'T'),
          backgroundColor: this.getRandomColor(),
          className: "activity-" + row.id
        }
      });

      return infosWithFormatedDate;
    },
    setDescription: function () {
      this.calendarOptions.events.forEach(event => {
        let html = document.createElement("p");
        html.innerText = event.description;

        console.log(document.querySelector("activity-7"));
      })
    }
  }
};
</script>

<style>

.container {
  padding:0 200px;
}


.fc .fc-timegrid-col.fc-day-today {
   background: none;
   margin: 0 auto;
 }

.fc-event-today {
    display: flex;
    flex-direction: column;
}

/* style title from activity */

.fc-event-title {
  font-size:20px ;
  font-weight: bold;
  order:1;
  margin-top: 10px;
}

/* style hours from activity */
.fc-event-time {
  order: 2;
  margin-bottom: 15px !important;
}

/* delete acitivty dot color */

.fc-daygrid-event-dot {
  display: none;
}

/* -------- start delete table borders------ */
.fc-theme-standard td, .fc-theme-standard ths {
  border:none;
}

.fc-scrollgrid  .fc-scrollgrid-liquid  { 
    border-collapse: collapse;
}

.fc .fc-timegrid-slot-minor {
  border:none;
}

.fc-v-event {
  border:none;
}

/* ---- end delete table borders----- */
 
.fc-event-main-frame{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
}

/* width for activity card */

.fc-timegrid-event-harness {
 width: 500px !important;
}

/* set background color for activity card */
.fc-v-event {
  background:#A4EAF3;
  border:none;
  box-shadow:2px 2px 10px rgb(0,0,0,0.1);
}

/* border radius for activity card */

.fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link {
  border-radius:15px;
}

/* height of rows */
.fc-direction-ltr .fc-timegrid-slot-label-frame {
  height: 50px;
  width: 100px;;
}

/* set hours label position and style */
.fc .fc-timegrid-axis-cushion, .fc .fc-timegrid-slot-label-cushion {
  display:flex;
  justify-content: center;
  align-items: center;
  height:100%;
  font-weight: bold;
}

/* set mragin 5% to the right for activity card */
.fc-timegrid-event-harness-inset {

  margin-left: 7%;
}

@media (max-width: 600px) {
  .container {
    padding: 0;
    height: 100vh;
  }

  .fc-timegrid-event-harness-inset {

  margin-left: 30%;
  }

  .fc-timegrid-event-harness {
    width: 200px !important;
  }

  .fc .fc-scroller-harness-liquid {
    height:100vh;
  }
}



</style>