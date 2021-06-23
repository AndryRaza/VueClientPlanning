<template>
  <!-- <div>{{ info }}</div> -->
<ul>
  <li v-for="element in info" :key="element.id">
     <Activity 
     :title="element.title" 
     :description="element.description"
     /> 
  </li>
</ul>
</template>

<script>

import Activity from "./Activity.vue"
import axios from "axios";

export default {
  name: "Planning",
  data: function () {
    return {
      info: null
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
  },
  components: {
    Activity
  }
};
</script>

<style>
 li {
   list-style: none;
 }
</style>