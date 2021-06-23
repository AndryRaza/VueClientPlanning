<template>
   <div class="card" v-bind:style="{ backgroundColor: bgColor + ' !important' }">
        <div class="row">
            <H3 style="font-weight:bold">{{title}}</h3>

            <p>{{description}}</p>
        </div>
    
    </div>
</template>

<script>

export default {
    name: "Activity",
    props: ['title', 'description'],
    data: function () {
        return {
            bgColor:"#A4F3B1"
        }
    },
    mounted() {
        let colors = ["#A4F3B1", "#B9A4F3", "A4EAF3", "F29090"];
        this.bgColor = colors[Math.floor(Math.random() * colors.length)];
    }
  
};
</script>

<style scoped>
*{

    color:white
}

.card {
    background-color:blue; 
    border-radius:20px; box-shadow:2px 2px 10px rgb(0,0,0,0.1);
    padding:10px;
    margin:10px;
}

h3 { font-weight: bold;}

</style>