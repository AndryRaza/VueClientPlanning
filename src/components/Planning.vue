<template>
  <!-- <div>{{ info }}</div> -->
  <div class="container">
    <h1>Planning du</h1>
    <FullCalendar :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <h1 class="title">
          {{ arg.event.title }} <span class="time"> {{ arg.timeText }}</span>
        </h1>
        <p class="description">
          {{ arg.event.extendedProps.description }}
        </p>
      </template>
    </FullCalendar>
  </div>
</template>

<script>
import axios from "axios";

import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
// import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from "@fullcalendar/timegrid";

export default {
  name: "Planning",
  data: function () {
    return {
      info: null,
      hours: [],
      calendar: null,
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: "timeGridDay",
        locales: [frLocale],
        locale: "fr",
        headerToolbar: {
          start: "",
          center: "title",
          end: "",
        },
        slotMinTime: "07:00:00",
        slotLabelInterval: "00:05",
        allDaySlot: false,
        events: [],
      },
    };
  },
  async mounted() {
    try {
      let activites = await axios.get(
        `${process.env.VUE_APP_URL}/${this.$route.params.id}/activities`
      );
      let examen = await axios.get(
        `${process.env.VUE_APP_URL}/${this.$route.params.id}/examens`
      );
      let data = activites.data.data;
      let firstEvent = data[0];

      let dataExam = examen.data.data[0];

      this.placeFirstEvent(
        dataExam.start,
        firstEvent.duree,
        firstEvent.description
      );
      // this.calendarOptions.events = await this.formatDateFromData(response.data.data[0]);
    } catch (e) {
      console.error(e);
    }
  },
  components: {
    FullCalendar,
  },
  methods: {
    addZeros: (n) => n > 0 && n < 10 && `0${n}`,
    getRandomColor: function () {
      let colors = ["#A4F3B1", "#B9A4F3", "A4EAF3", "F29090"];
      return colors[Math.floor(Math.random() * (colors.length - 1))];
    },
    // formatDateFromData: function (data) {
    //   let infosWithFormatedDate = data.map((row) => {
    //     return {
    //       ...row,
    //       start: row.beginAt.replace(' ', 'T'),
    //       end: row.endAt.replace(' ', 'T'),
    //       backgroundColor: this.getRandomColor(),
    //     }
    //   });

    //   return infosWithFormatedDate;
    // },
    placeFirstEvent: function (start, duration, description) {
      let end = new Date(start);

      // calculate end based on event duration
      end.setMinutes(end.getMinutes() + parseInt(duration));

      //get Date Time string
      end = `${end.getFullYear()}-${this.addZeros(
        end.getMonth() + 1
      )}-${end.getDate()}T${end.toTimeString().split(" ")[0]}`;
      console.log(start, end);

      this.calendarOptions.events.push({
        start,
        end,
        backgroundColor: this.getRandomColor(),
        description,
      });
    },
  },
};
</script>

<style>
.container {
  padding: 0 200px;
}

/* remove yellow background default color */

.fc .fc-timegrid-col.fc-day-today {
  background: none;
  margin: 0 auto;
}

/* activity card */
.fc-event-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  margin: 0;
}

.description {
  font-weight: bold;
  font-size: 1rem;
  margin-top: 5px;
  height: 30px;
  overflow: hidden;
}

.time {
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  left: 10px;
}

/* delete acitivty dot color */

.fc-daygrid-event-dot {
  display: none;
}

/* -------- start delete table borders------ */
.fc-theme-standard td,
.fc-theme-standard ths {
  border: none;
}

.fc-scrollgrid .fc-scrollgrid-liquid {
  border-collapse: collapse;
}

.fc .fc-timegrid-slot-minor {
  border: none;
}

.fc-v-event {
  border: none;
}

/* ---- end delete table borders----- */

/* set background color for activity card */
.fc-v-event {
  background: #a4eaf3;
  border: none;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.1);
}

/* border radius for activity card */

.fc-timegrid-event-harness-inset .fc-timegrid-event,
.fc-timegrid-event.fc-event-mirror,
.fc-timegrid-more-link {
  border-radius: 15px;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1);
  overflow: hidden;
}

/* height of rows */
.fc-direction-ltr .fc-timegrid-slot-label-frame {
  height: 50px;
  width: 60px;
}

/* set mragin 5% to the right for activity card */
.fc-timegrid-event-harness-inset {
  margin-left: 7%;
}

@media screen and (max-width: 425px) {
  .fc-timegrid-event {
    width: 240px !important;
  }

  .fc-timegrid-event-harness-inset {
    margin-left: 20% !important;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0;
    height: 100vh;
  }

  .fc-timegrid-event-harness-inset {
    margin-left: 20%;
  }

  .fc-timegrid-event-harness {
    width: 240px !important;
  }

  .fc-timegrid-event {
    width: 600px;
  }

  .fc .fc-scroller-harness-liquid {
    height: 100vh;
  }

  .title {
    display: flex;
    flex-direction: column;
  }

  .time {
    position: static;
  }
}

@media screen and (max-width: 1024px) {
  .container {
    padding: 0 !important;
  }

  .fc-timegrid-event-harness-inset {
    margin-left: 10%;
  }
}
</style>
