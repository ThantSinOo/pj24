<template>
    <WorkerNavbar/>
    <div class="container text-center">
        <h3 class="text-primary">No Suvery</h3>
    </div>
    <!-- <h6 class="text-center">Survey Page</h6> -->
    <SurveyFormone v-if="firstSurveyState" class=""></SurveyFormone>
    <SurveyFormtwo v-if="secondSurveyState"></SurveyFormtwo>
    <SurveyFormthree v-if="thirdSurveyState"></SurveyFormthree>
    <SurveyFormfour v-if="fourthSurveyState"></SurveyFormfour>
    <SurveyFormfive v-if="fifthSurveyState"></SurveyFormfive>
    <SurveyFormsix v-if="sixthSurveyState"></SurveyFormsix>
    <SurveyFormseven v-if="seventhSurveyState"></SurveyFormseven>
    <SurveyFormeight v-if="eighthSurveyState"></SurveyFormeight>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import WorkerNavbar from '@/components/WorkerNavbar.vue';
import SurveyFormone from '@/components/SurveyFormone.vue';
import SurveyFormtwo from '@/components/SurveyFormtwo.vue';
import SurveyFormthree from '@/components/SurveyFormthree.vue';
import SurveyFormfour from '@/components/SurveyFormfour.vue';
import SurveyFormseven from '@/components/SurveyFormseven.vue';
import SurveyFormfive from '@/components/SurveyFormfive.vue';
import SurveyFormsix from '@/components/SurveyFormsix.vue';
import SurveyFormeight from '@/components/SurveyFormeight.vue';
export default {
    components: {
        WorkerNavbar,
        SurveyFormone,
        SurveyFormtwo,
        SurveyFormthree,
        SurveyFormfour,
        SurveyFormfive,
        SurveyFormsix,
        SurveyFormseven,
        SurveyFormeight,
    },
    setup(){
        let firstSurveyPermission = ref(''); 
        let secondSurveyPermission = ref(''); 
        let thirdSurveyPermission = ref(''); 
        let fourthSurveyPermission = ref(''); 
        let fifthSurveyPermission = ref(''); 
        let sixthSurveyPermission = ref(''); 
        let sevenSurveyPermission = ref(''); 
        let eighthSurveyPermission = ref(''); 
        let firstSurveyState = ref(false);
        let secondSurveyState = ref(false);
        let thirdSurveyState = ref(false);
        let fourthSurveyState = ref(false);
        let fifthSurveyState = ref(false);
        let sixthSurveyState = ref(false);
        let seventhSurveyState = ref(false);
        let eighthSurveyState = ref(false);
        let nosuvery = ref(true)
        console.log(eighthSurveyState.value);
        let userid = localStorage.getItem("userid");
        // let surveyData = axios.get(`employee_infos/${userid}`);
        const surveyData = async() =>{
            try{
                let res = await axios.get(`employee_infos/${userid}`);
                firstSurveyPermission.value = res.data.data.employee_info.first_survey_permission;
                secondSurveyPermission.value = res.data.data.employee_info.second_survey_permission;
                thirdSurveyPermission.value = res.data.data.employee_info.third_survey_permission;
                fourthSurveyPermission.value = res.data.data.employee_info.fourth_survey_permission;
                fifthSurveyPermission.value = res.data.data.employee_info.fifth_survey_permission;
                sixthSurveyPermission.value = res.data.data.employee_info.sixth_survey_permission;
                sevenSurveyPermission.value = res.data.data.employee_info.seventh_survey_permission;
                eighthSurveyPermission.value = res.data.data.employee_info.eighth_survey_permission;

                console.log(res.data);
                // Check User Have Permission To Fill Survey For Form (1)
                // if(firstSurveyPermission.value !== null && res.data.data.surveyIds.first_survey_id === null){
                //     firstSurveyState.value = true;
                // }

                firstSurveyPermission.value !== null && res.data.data.surveyIds.first_survey_id === null  ? firstSurveyState.value = true :  firstSurveyState.value = false;
                secondSurveyPermission.value !== null && res.data.data.surveyIds.second_survey_id === null ? secondSurveyState.value = true :  secondSurveyState.value = false;
                thirdSurveyPermission.value !== null && res.data.data.surveyIds.third_survey_id === null ? thirdSurveyState.value = true :  thirdSurveyState.value = false;
                fourthSurveyPermission.value !== null && res.data.data.surveyIds.fourth_survey_id === null ? fourthSurveyState.value = true :  fourthSurveyState.value = false;
                fifthSurveyPermission.value !== null && res.data.data.surveyIds.fifth_survey_id === null ? fifthSurveyState.value = true :  fifthSurveyState.value = false;
                sixthSurveyPermission.value !== null && res.data.data.surveyIds.sixth_survey_id === null ? sixthSurveyState.value = true :  sixthSurveyState.value = false;
                sevenSurveyPermission.value !== null && res.data.data.surveyIds.seventh_survey_id === null ? seventhSurveyState.value = true :  seventhSurveyState.value = false;
                eighthSurveyPermission.value !== null && res.data.data.surveyIds.eighth_survey_id === null ? eighthSurveyState.value = true :  eighthSurveyState.value = false;
                console.log(eighthSurveyState.value);
                // console.log("Response Data =>", res.data.data.employee_info.first_survey_permission);
            }catch(error){

            }
        }
        surveyData();
        // console.log("Survey Infos =>", surveyData);

        return{
            surveyData,
            firstSurveyPermission,
            firstSurveyState,
            secondSurveyState,
            thirdSurveyState,
            fourthSurveyState,
            fifthSurveyState,
            sixthSurveyState,
            seventhSurveyState,
            eighthSurveyState
        }
    }
}

</script>

<style scoped>

</style>