<template>
   <SuveryModal  v-if="showModal && surveyNumber=='first'" :data="data" @closeModal="hidemodal"></SuveryModal>
   <SuveryModal2  v-if="showModal && surveyNumber=='second'" :data="data" @closeModal="hidemodal"></SuveryModal2>
   <SuveryModal3  v-if="showModal && surveyNumber=='third'" :data="data" @closeModal="hidemodal"></SuveryModal3>
   <SuveryModal4  v-if="showModal && surveyNumber=='fourth'" :data="data" @closeModal="hidemodal"></SuveryModal4>
   <SuveryModal5  v-if="showModal && surveyNumber=='fifth'" :data="data" @closeModal="hidemodal"></SuveryModal5>
   <SuveryModal6  v-if="showModal && surveyNumber=='sixth'" :data="data" @closeModal="hidemodal"></SuveryModal6>
   <SuveryModal7  v-if="showModal && surveyNumber=='seventh'" :data="data" @closeModal="hidemodal"></SuveryModal7>
   <SuveryModal8  v-if="showModal && surveyNumber=='eighth'" :data="data" @closeModal="hidemodal"></SuveryModal8>
  <div class="bg-light mains">
    <!-- top navbar -->
    <div>
      <nav class="nav navbar-light bg-white ps-3">
              <!-- <a class="navbar-brand" href="#"></a> -->
                    <div class="mx-auto">
                      <router-link class="nav-link nav-link-ltr ms-5"  to="/home" >Manage</router-link>
                      <router-link class="nav-link nav-link-ltr"  to="/surveypage">Suvery</router-link>
                      <router-link class="nav-link nav-link-ltr" to="/searchpage">Chat</router-link>
                    </div>
                    <!-- User Account -->
                    <div class="my-2 my-lg-0 px-2">
                        <!-- <p>logo</p> -->
                        <div class="account">
                              <div class="btn-group dropstart">
                                  <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    <font-awesome-icon icon="fa-solid fa-circle-user" size="2xl" style="color:black" />

                                  </button>
                                  <form class="dropdown-menu p-4">
                                    <div class="mb-3">
                                      <label for="exampleDropdownFormEmail2" class="form-label">User Name</label>
                                      <p class="form-control text-center">{{ useraccount }}</p>
                                    </div>
                                
                                  
                                    <button type="submit" class="col-12 btn btn-primary text-center" @click="logoutFunction">Logout</button>
                                  </form>
                              </div>
                        </div>
                    </div>
      </nav>
    </div>
   
    <div class="">
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
           <div class="suveryContainer">
              <!-- <button class="btn btn-primary mt-5 mb-3" @click="suveryapi">View Survey Result</button> -->

              
              <div class="formContainer">
                <p class="my-3">Suvery Form</p>
                <div class="d-flex">
                  <select class="form-select" aria-label="Default select example" v-model="surveyNumber">
                  <option selected>Open this select menu</option>
                  <option value="first">Suvery Form 1</option>
                  <option value="second">Suvery Form 2</option>
                  <option value="third">Suvery Form 3</option>
                  <option value="fourth">Suvery Form 4</option>
                  <option value="fifth">Suvery Form 5</option>
                  <option value="sixth">Suvery Form 6</option>
                  <option value="seventh">Suvery Form 7</option>
                  <option value="eighth">Suvery Form 8</option>
                </select>
                <button class="sends ms-2" @click="sendData"><font-awesome-icon icon="fa-solid fa-arrow-right" /></button>
                </div>
              </div>
           </div>

          </div>
          <div class="col-9">
            <div>
              <!-- chose DOE Num -->
              <div class="form-group col-3">
                          <label for="doenum">DOE Number</label>
                              <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                                  <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                              </select>
              </div>

               <!-- Worker Table -->
               <div class="mt-5 me-3">
                      <h6>{{ workernum }} Workers Info</h6>
                      <div>
                          <table class="table table-striped">
                              <thead>
                                  <tr>
                                  <th>
                                    <input type="checkbox" v-model="allEmployees" @change="selectedallEmployee">
                                  </th>
                                  <th scope="col">No</th>
                                  <th scope="col">Worker ID</th>
                                  <th scope="col">Name(En)</th>
                                  <th scope="col">Gender</th>
                                  <th scope="col">Birth of Date</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Details</th>
                                  </tr>
                              </thead>
                              <tbody  v-for="(employees,index) in fillterEmployees" :key="employees.id" >
                                  <tr class="">
                                      <td>
                                          <input type="checkbox" v-model="selectedEmployees" :value="employees.employee_id" @change="selectNum">
                                      </td>
                                      <th scope="row">{{ index + 1 }}</th>
                                      <td>{{ employees.employee_id }}</td>
                                      <td>{{ employees.employee_info.name_en }}</td>
                                      <td>{{ employees.employee_info.gender }}</td>
                                      <td>{{ employees.employee_info.dob }}</td>
                                      <td v-if="employees.cv_data">{{ employees.cv_data.state }}</td>
                                      <td v-if="employees.cv_data == null" class="text-danger">No Data</td>
                                      <td v-if="surveyNumber == 'first'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.first_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'second'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.second_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'third'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.third_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'fourth'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.fourth_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'fifth'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.fifth_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'sixth'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.sixth_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'seventh'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.seventh_survey_id)" /></td>
                                      <td v-if="surveyNumber == 'eighth'" class="text-center"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"  @click="showmodal(employees.surveyIds.eighth_survey_id)" /></td>
                                      
                                  </tr>   
                              </tbody>
                          </table>
                      </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import { useRouter } from 'vue-router';
import SuveryModal from '../components/SuveryModal.vue'
import SuveryModal2 from '../components/SuveryModal2.vue'
import SuveryModal3 from '../components/SuveryModal3.vue'
import SuveryModal4 from '../components/SuveryModal4.vue'
import SuveryModal5 from '../components/SuveryModal5.vue'
import SuveryModal6 from '../components/SuveryModal6.vue'
import SuveryModal7 from '../components/SuveryModal7.vue'
import SuveryModal8 from '../components/SuveryModal8.vue'
export default {
  components:{SuveryModal,SuveryModal2,SuveryModal3,SuveryModal4,SuveryModal5,SuveryModal6,SuveryModal7,SuveryModal8},
  setup(){
    let store = useStore();
    let doeId=ref();
    let fillterEmployees = ref();
    let allEmployees = ref(false);
    let selectedEmployees = ref([]);
    let surveyNumber = ref();
    let showModal = ref(false);
    let data = ref();
    let useraccount = ref(localStorage.getItem("useraccount"));
    const logoutFunction = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        router.push('/');
      }


    // get DOE Data
    let does = computed(()=>{
        return store.state.doeModule.does
    })

    let getData = ()=> store.dispatch('doeModule/getDoes');
    getData();

    //   get employee
    let getEmployees = ()=> store.dispatch('infoModule/getEmployees');
    getEmployees();

    let employees = computed(()=> {
        return store.state.infoModule.employeesinfo
    })

    console.log(employees);


    let getdoeId=(id)=>{
      console.log(doeId);
      fillterEmployees.value = employees.value.data.filter((employee)=>{
            if(employee.doe !== null){
              return employee.doe.doe_id == id
              }     
            })                  
  }

  let selectedallEmployee =()=>{
            if(allEmployees.value == true){
                selectedEmployees.value=[];
                console.log(fillterEmployees.value);
                fillterEmployees.value.forEach((allemployee)=>{
                  selectedEmployees.value.push(allemployee.employee_id)
                })
            }else{
                selectedEmployees.value = [];
            }
  }
// Permission
  let sendData = async()=>{
    console.log(surveyNumber.value);
    let data = {
      employee_id:selectedEmployees.value
    }
    console.log(data);
    let res = await axios.patch(`survey_result?survey=${surveyNumber.value}_survey_permission&_method=patch`,data);
    console.log(res.data);

  }

  let suveryapi=async()=>{
    let res = await axios.get(`survey/first`);
    if(res.data.status === 'success'){
      console.log("Survey Add Success, status =>", res.data.status);
      console.log("Survey Add Success, status =>", res);
            showmodal();
            setTimeout(()=>{
                router.go(0);
            },2000)
            
            console.log("work");
          }
    console.log(res.data);
    employees = res.data
    console.log(employees);
  }


  let showmodal = (id) => {
            console.log(id);
            data.value = {
              id,
              suvery:surveyNumber.value
            }
            console.log(data.value)
            showModal.value = true;
        };

        const hidemodal = () => {
            showModal.value = false;
        };

  return{
          does,doeId,getdoeId,fillterEmployees,allEmployees,selectedEmployees,selectedallEmployee,
          surveyNumber,sendData, showModal,showmodal,hidemodal,data,suveryapi, useraccount,
        logoutFunction
        }
}

}
</script>

<style>
.suveryContainer{
  background: rgb(224, 220, 220);
  width: 80%;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.suveryContainer .btn{
  width: 80%;
}

.formContainer{
  width: 80%;

}

.formContainer p{
  margin: 0;
}

.sends{
  width: 50px;
  height: 35x;
  border: none;
  background: #007bff;
  /* transition: 0.3s; */
}

.sends:hover{
  transform: scale(0.95);
}

.sends:active{
  transform: scale(1.02);
}
</style>