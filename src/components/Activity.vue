<template>
   <div class="card" v-bind:style="{ backgroundColor: bgColor + ' !important' }">
        <div class="row">
            <H3 style="font-weight:bold">{{title}}</h3>

            <p>{{description}}</p>
            <p>{{hour}}</p>
        </div>
    
    </div>
</template>

<script>

export default {
    name: "Activity",
    props: ['title', 'description', 'hour'],
    data: function () {
        return {
            bgColor:"#A4F3B1"
        }
    },
    mounted() {
        let colors = ["#A4F3B1", "#B9A4F3", "A4EAF3", "F29090"];
        this.bgColor = colors[Math.floor(Math.random() * (colors.length - 1) )];
    }
  
};
</script>

<style scoped>
*{
    padding:0;
    margin:0;
    color:white
}

.card {
    background-color:blue; 
    border-radius:20px; box-shadow:2px 2px 10px rgb(0,0,0,0.1);
    padding:20px;
    margin:10px;
    height: 50px;
    width: 450px;
}

h3 { 
    font-weight: bold;
    margin-bottom: 5px;
}
p {font-size: 14px;}

</style>