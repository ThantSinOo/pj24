<template>
  <div class="bg-light mains" :class="bgactive === true ? 'red' : 'blue'" >
        <Navbar/>
        <Contractmodal v-if="showModal" :id="userid" @closeModal="hidemodal"></Contractmodal>
        <Filemodal v-if="fileModal" :id="contractid" @closeModal="hidemodal"></Filemodal>
        <SuccessModal  v-if="successModal"/>
        <!-- alert -->
        <div v-if="errorMessage && message" class="errorMessage">

            <div class="error-message">
                <div class="modalss">
                    <img src="http://100dayscss.com/codepen/alert.png" width="44" height="38" />
                        <span class="title">ops !</span>
                        <p class="my-2">{{ errorMessage }}</p>
                        <button class="btn btn-danger" @click="closemessage">Close</button>
                </div>
            </div>
       </div>
        <!-- form -->
        <div class="page">
            <div class="containers py-4">
                <h4 class="py-2">Contract Upload</h4>
                <!-- Input Container -->
                <div class="row col-12 col-lg-10 mt-4">
                    <!-- DOE Number -->
                    <div class="col-4">
                        <label for="doenum">DOE Number</label>
                            <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                                <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                            </select>
                    </div>
                    <!-- Contract Place -->
                    <div class="form-group col-4">
                        <label for="place">Contract Place</label>
                        <input type="text" class="form-control bg-light" id="place" v-model="contractPlace">
                    </div>
                </div>    

                <!-- Date Container -->
                <div class="row col-12 col-lg-10 my-4">
                        <!-- Contract Date -->
                        <div class="form-group col-4">
                            <label for="contractDate" class="d-block">Contract Date</label>
                            <input autocomplete="off" class="form-control bg-light dates" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="contractDate" v-model="contractDate">
                        </div>
                        <!-- Training Date -->
                        <div class="form-group col-4">
                            <label for="trainingDate" class="d-block">Training Date</label>
                            <input autocomplete="off" class="form-control bg-light dates" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="trainingDate" v-model="trainingDate">
                        </div>

                        <div class="form-group col-4">
                            <label for="depatureDate" class="d-block">Depature Date</label>
                            <input autocomplete="off" class="form-control bg-light dates" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="depatureDate" v-model="depatureDate">
                        </div>
                </div>
                <!-- Button Container -->
                <div class="btn-containers">
                    <button class="mx-4 shadow-sm clearbutton " @click="clearData"><span class="button-content pe-1">Clear All </span><span class="button-icon"><font-awesome-icon icon="fa-solid fa-trash"  /></span></button>
                    <button class="button" @click="handleSubmit"><span class="button-content">Register </span></button>
                </div>
            </div>
        </div>
        <!-- table -->
        <div class="page">
            <div class="containers">
                    <!-- title -->
                    <h4 class="py-4">Workers Information</h4>
                    <!-- DOE Table-->
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>
                                <input type="checkbox" v-model="allEmployees" @change="selectedallEmployee">
                            </th>
                            <th scope="col">No</th>
                            <th scope="col">Worker ID</th>
                            <th scope="col">Name(En)</th>
                            <th scope="col">NRC Number</th>
                            <th scope="col">Passport</th>
                            <th scope="col">PDF Files</th>
                            <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody v-for="(employees,index) in fillterEmployees" :key="employees.id">
                            <tr>
                            <td>
                                <input type="checkbox" v-model="selectedEmployees" :value="employees.employee_info.user_id" @change="selectNum">
                            </td>
                            <th scope="row">{{ index + 1 }}</th>
                                <td>{{ employees.employee_id }}</td>
                                <td>{{ employees.employee_info.name_en }}</td>
                                <td>{{employees.employee_info.nrc }}</td>
                                <td>{{ employees.employee_id }}</td>
                                <td v-if="employees.contrat_upload_data ">
                                    <button v-if="!employees.contrat_upload_data.pdf" class="btn btn-primary" @click="showFile(employees.contrat_upload_data.id)">Upload File</button>  
                                    <button v-else-if="employees.contrat_upload_data.pdf"  class="btn btn-success" @click="getfile(employees.contrat_upload_data.pdf)">Get File</button>
                                    
                                </td>
                                <td><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="showmodal(employees.employee_info.user_id)" /></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import Navbar from '../components/Navbar.vue'
import Contractmodal from '../components/Contractmodal.vue';
import SuccessModal from '../components/SuccessModal.vue';
import Filemodal from '../components/FileUploadmodal.vue';
import { useRouter } from 'vue-router';export default {
    components:{Navbar,Contractmodal,Filemodal,SuccessModal},
    setup(){
        let store = useStore();
        let router =useRouter();
        let showModal = ref(false);
        let fileModal = ref(false)
        let successModal = ref(false);
        let errorMessage = ref(null);
        let message = ref(true);

        let doeId=ref();
        let contractPlace = ref();
        let contractDate = ref();
        let trainingDate = ref();
        let depatureDate = ref();
        let fillterEmployees = ref();
        let allEmployees = ref(false);
        let selectedEmployees = ref([]);
        let userid = ref();
        let contractid=ref();
        let file = ref();
        let bgactive = ref(false);

        // get DOE Data
        let does = computed(()=>{
            return store.state.doeModule.does
        })

        let getData = ()=> store.dispatch('doeModule/getDoes');
        getData();

         // get All Employees Data
         let getEmployees = ()=> store.dispatch('infoModule/getEmployees');
        getEmployees();

        let employees = computed(()=> {
            return store.state.infoModule.employeesinfo
        })

        console.log(employees.value.data);

        let getdoeId =(id)=>{
            // console.log(id);
            console.log(employees.value);
            fillterEmployees.value = employees.value.data.filter((employee)=>{
                if(employee.doe !== null){
                    return employee.doe.doe_id == id
                }
                
                // console.log(employee.doe);
            })
        }

        // selected Function
        let selectedallEmployee =()=>{
            if(allEmployees.value == true){
                selectedEmployees.value=[];
                console.log(fillterEmployees.value);
                fillterEmployees.value.forEach((allemployee,index)=>{
                    selectedEmployees.value.push(allemployee.employee_info.user_id)
                })

                console.log(selectedEmployees.value);
            }else{
                selectedEmployees.value = [];
            }
        }


    let handleSubmit = async ()=>{
        let data = {
            userIds:selectedEmployees.value,
            contract_place:contractPlace.value,
            contract_date:contractDate.value,
            training_start_date:trainingDate.value,
            departure_date:depatureDate.value
        }

        // let data = {
        //     userIds:[6,7],
        //     contract_place:"yangon",
        //     contract_date:"1.2.2023",
        //     training_start_date:"1.2.2023",
        //     departure_date:"1.2.2023"
        // }

        console.log(data);
        try {
            let res = await axios.post('contract_upload',data);
            if(res){
                console.log(res.data.message);
                // alert(res.data.message)
                showSuccess();
                setTimeout(()=>{
                    router.go(0);
                },2000)
            }
        } catch (error) {
            message.value = true;
            if(error.response){
                errorMessage.value = error.response.data.message
                console.log(error.response.data.message);
            }
        }
        
    }    


    let uploadFile=(event)=>{
        file.value = event.target.files[0]
        console.log(file.value);
    }
        
        // modal function
        let showmodal = (id) => {
            userid.value = id;
            showModal.value = true;
            bgactive.value = true;
        };

        let showFile = (id) => {
            contractid.value = id;
            fileModal.value = true;
            bgactive.value = true;
        };

        let showSuccess = (id) => {
            successModal.value = true;
            bgactive.value = true;
        };

        const hidemodal = () => {
            showModal.value = false;
            fileModal.value = false;
            bgactive.value = false;
        };

        let closemessage = ()=>{
            message.value = false;
            console.log("hey");
        }


        let getfile = (fileData)=>{
            console.log(fileData);
            window.open(`https://api.kookpyit.com/storage/${fileData}`);
        }


        return{
            doeId,does,contractPlace,contractDate,
            trainingDate,depatureDate,fillterEmployees,employees,getdoeId,
            showModal,showmodal,hidemodal,allEmployees,selectedEmployees,selectedallEmployee,
            handleSubmit,userid,uploadFile,file,fileModal,showFile,bgactive,contractid,getfile,
            successModal,showSuccess,errorMessage,message,closemessage
        }

    }
}
</script>

<style>
.dates{
    /* width: 300px; */
    -webkit-appearance: none;
    font-size: 18px;
    text-align: center;
    letter-spacing: 2px;
    padding-right: 10px;
    border-radius: 8px;
    
}



</style>