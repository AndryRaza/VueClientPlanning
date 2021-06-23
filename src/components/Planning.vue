<template>
  <!-- <div>{{ info }}</div> -->
<div class="flex">

  <div class="gridActivity">
    <li class="nb" v-for="i in hours" :key="i">{{i}}</li>
    <li v-for="element in info" :key="element.id" :style="{'grid-row': setRowPlace(element.beginAt) ,'grid-column': 2 }">
      <Activity 
      :title="element.title" 
      :description="element.description" 
      :hour="element.beginAt"
      /> 

    </li>
  </div>
   
</div>

</template>

<script>

import Activity from "./Activity.vue"
import axios from "axios";

export default {
  name: "Planning",
  data: function () {
    return {
      info: null,
      hours:[]
    };
  },
  mounted() {
    axios
      .get(
        `http://127.0.0.1:8000/users/${ this.$route.params.id}/activities` ) 
      .then((response) => (this.info = response.data))
      .catch((err) => {
        console.log(err);
      });

    for (let i = 7; i < 18; i++) {
      this.hours.push(i);
    }

  },
  components: {
    Activity
  },
  methods: {
    setRowPlace: function (hour) {
      let activityHour = new Date(hour).getHours();
      let res;

      this.hours.forEach((v,k) => {
        if (v === activityHour) {
          res = k + 1;
        }
        
      });

       return res;
    }
  }
};
</script>

<style scoped>

 li {
   list-style: none;
 }

.gridActivity {
  display: grid;
  grid-template-rows: repeat(10, 100px);
  grid-auto-rows: minmax(100px, 100px);
  grid-template-columns: 40px 600px 600px;
 }

 .flex {
   display: flex;
   flex-direction: row;
 }

 ul {
   display: flex;
   flex-direction: column;
 }

 .nb {
   grid-column:1;
   margin:auto;
   font-weight: bold;
 }
</style>