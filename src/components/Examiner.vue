<template>
    <div class="container-lg">
        <h1>Visualiser des examens</h1>
        <select 
            class="form-select" 
            aria-label="Default select example"
            @change="handleExamChange($event)"
        >
            <option selected>Choisir un examen</option>

             <option 
                class="list-element" 
                v-for="examen in examens" 
                :key="examen.id" 
                :value="examen.id"
            >
                <span>{{ examen.title }}</span>
            </option>
        </select>
    
        <h1> Activités </h1>

        <table 
            class="table table-responsive table-bordered table-striped table-hover align-middle" 
            v-if="activities.length > 0"
        >
            <thead>
                <tr>
                    <th>Ordre de passage</th>
                    <th>Etudiant</th>
                    <th>Titre</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    class="list-element" 
                    v-for="activity in activities" 
                    :key="activity.id"
                >
                    <td>{{ activity.order }}</td>
                    <td>{{ activity.user }}</td>
                    <td>{{ activity.title }}</td>
                    <td>{{ activity.description }}</td>
                </tr>
            </tbody>


            </table>

            <div v-else class="alert alert-danger">Aucunes activités trouvées pour cet examen </div>
    </div>

  
</template>

<script>
import axios from "axios";

export default {
    name:'Examiner',
    mounted () {
        axios.get(`${process.env.VUE_APP_URL}/examens/`)
        .then((res) => {
            this.examens = res.data;
        });

    },
    data : function () {
        return {
            activities: [],
            examens: [
               {
                    name:"test",
                    id: 1
               },
                {
                    name:"test01",
                    id: 2
               }
            ],
        }
    }, 
    methods : {
        handleExamChange: function (ev) {
            let examId = ev.target.value;
            
            this.getActivities(examId);
        },
        getActivities: async function (examId) {

            let res = await axios.get(
                `${process.env.VUE_APP_URL}/examens/${examId}/activities`
            );

            this.activities = res.data.data ?? [];
            console.log(this.activities)
        }
    }
}
</script>

<style scoped>

h1 {
    margin:50px 0;
}

</style>