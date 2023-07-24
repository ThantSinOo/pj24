<template>
    
    <div class="bg-light mains" :class="showModal === true ? 'red' : 'blue'">
        <Navbar/>
        <LoadingPage v-if="!does"/>
        <SuccessModal  v-if="showModal"/>
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
        
        <div class="page">
            <div class="containers py-4">
                <!-- title -->
                <h4 class="py-2">Create New DOE</h4>
                <!-- Add DOE Form -->
                <div class="pt-2">
                    <form class="row col-12">
                        <!-- <div class="row"> -->
                            <div class="form-group col-4">
                                <label for="doenumber">DOE Number</label>
                                <input type="text" class="form-control bg-light" id="doenumber" v-model="doesId">
                            </div>

                            <div class="form-group col-8">
                                <label for="factory">Factory</label>
                                    <select class="form-select" id="factory" v-model="factoryName">
                                        <option value="Thai Union Co.Ltd" selected>Thai Union Co.Ltd</option>
                                        <option value="Super Steel Co.Ltd">Super Steel Co.Ltd</option>
                                    </select>
                            </div>

                            <div class="form-group col-4 mt-4">
                                <label for="category">Category</label>
                                    <select class="form-select" id="category" v-model="factoryCategory">
                                        <option value="Food Packing" >Food Packing</option>
                                        <option value="Steel Manufacturing">Steel Manufacturing</option>
                                    </select>
                            </div>

                            <div class="form-group col-4 mt-4">
                                <label for="location">Location</label>
                                <input type="text" class="form-control bg-light" id="location" v-model="factoryLocation">
                            </div>

                            <div class="form-group col-4 mt-4" >
                                <label for="country">Country</label>
                                    <select class="form-select" id="country" v-model="factoryCountry">
                                        <option value="Thai" >Thai</option>
                                        <option value="Malaysia">Malaysia</option>
                                    </select>
                            </div>

                            <div class="form-group col-4 mt-4" >
                                <label for="country">Salary</label>
                                <input type="text" class="form-control bg-light" id="salary" v-model="salary">
                            </div>

                            <div class="form-group col-4 mt-4">
                                <label class="">Type</label>
                                    <div class="col-12 btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="familyTree" id="familyTreeYes" autocomplete="off" value="0" v-model="newEmployee" checked/>
                                    <label class="btn btn-outline-primary" for="familyTreeYes">Old</label>
                        
                                    <input type="radio" class="btn-check" name="familyTree" id="familyTreeNo" autocomplete="off" value="1" v-model="newEmployee"/>
                                    <label class="btn btn-outline-primary" for="familyTreeNo">New</label>
                                    </div>
                            </div>

                            <div class="btn-containers mt-4">
                                <button class=" mx-3 shadow-sm clearbutton" @click="clearForm"><span class="button-content pe-1">Clear All </span><span class="button-icon"><font-awesome-icon icon="fa-solid fa-trash"  /></span></button>
                                <button class="button" @click.prevent="handleSubmit" ><span class="button-content">Create </span></button>
                            </div>
                        <!-- </div> -->
                        
                    </form>
                </div>
                
            </div>
        </div>

        <div class="page">  
            <div class="containers">
                <!-- title -->
                <h4 class="py-4">Existing DOEs</h4>
                <!-- DOE Table-->
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No<font-awesome-icon class="mx-1 reverse" icon="fa-solid fa-arrow-down" style="color:blue" @click="reverseData" /></th>
                        <th scope="col">DOE Number</th>
                        <th scope="col">Factory</th>
                        <th scope="col">Category</th>
                        <th scope="col">Location</th>
                        <th scope="col">Country</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="reverse" v-for="(doe,index) in does" :key="doe.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <th>{{ doe.doe_id }}</th>
                        <td>{{ doe.factory_name }}</td>
                        <td>{{ doe.factory_category }}</td>
                        <td>{{ doe.factory_location }}</td>
                        <td>{{ doe.factory_country }}</td>
                        <td>{{ doe.salary }}<span v-if="doe.factory_country === 'Thai'"> Bath</span><span v-if="doe.factory_country === 'Malaysia'"> Ringgit</span></td>
                        <td>{{ doe.is_new_employee === 0 ? 'new' : 'old' }}</td>
                        </tr>
                        <tr v-if="!reverse" v-for="(doe,index) in does.slice().reverse()" :key="doe.id">
                        <th scope="row">{{does.length - index}}</th>
                        <th>{{ doe.doe_id }}</th>
                        <td>{{ doe.factory_name }}</td>
                        <td>{{ doe.factory_category }}</td>
                        <td>{{ doe.factory_location }}</td>
                        <td>{{ doe.factory_country }}</td>
                        <td>{{ doe.salary }}</td>
                        <td>{{ doe.is_new_employee === 0 ? 'New' : 'Old' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { computed , ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue'
import LoadingPage from '../components/LoadingPage.vue'
import SuccessModal from '../components/SuccessModal.vue'
export default {
    components:{Navbar,LoadingPage,SuccessModal},
    setup(){
        let router = useRouter();
        let reverse = ref(false);
        let store = useStore();
        const showModal = ref(false);

  
        let doesId = ref("");
        let factoryName = ref("");
        let factoryCategory = ref("");
        let factoryLocation = ref("");
        let factoryCountry = ref("");
        let salary = ref('')
        let newEmployee = ref('');
        let yesno = ref('');
        let message = ref(true);

         // modal function
         let showmodal = () => {
            showModal.value = true;
        };

        const hidemodal = () => {
            showModal.value = false;
        };

        let doesData = ref({
            doe_id : doesId,
            factory_name : factoryName,
            factory_category : factoryCategory,
            factory_location : factoryLocation,
            factory_country : factoryCountry,
            salary:salary,
            is_new_employee:newEmployee
        })
        let does = computed(()=>{
            return store.state.doeModule.does

        })

        let errorMessage = computed(()=>{
            return store.state.doeModule.errorMessage
        })

       

        let getData = ()=> store.dispatch('doeModule/getDoes');
        getData();
        onMounted(getData);

        // storeDoe //
        let handleSubmit =async function(){
          console.log(doesData.value, typeof(doesData.value))

          await store.dispatch('doeModule/storeDoes',doesData.value)
          message.value = true;
          if(!errorMessage.value){
            showmodal();
            setTimeout(()=>{
                router.go(0);
            },2000)
            
            console.log("work");
          }
          
        }

        // Clear Form Data
        let clearForm =()=>{
            doesId.value = "",
            factoryLocation.value = "";

        }

        // Reverse data
        let reverseData = ()=>{
           reverse.value = !reverse.value
        }

        reverseData();

        let closemessage = ()=>{
            message.value = false;
            console.log("hey");
        }
  

        return{
            doesId,factoryName,factoryCategory,factoryLocation,factoryCountry,
            doesData,handleSubmit,salary,newEmployee,
            does,getData,errorMessage,clearForm,reverse,reverseData,yesno,closemessage,message,showModal,showmodal
        }

    }
}
</script>

<style >
/* .mains{
    overflow-x:hidden ;
    overflow-y:scroll ;
} */


.page{
  /* height: 100vh; */
  background-color: white;

  margin-top: 25px;
  margin-left: 85px;
  margin-right:25px ;

  overflow:hidden;
}

.containers{
    margin-left: 20px;
    /* margin-top: 50px; */
    /* background-color: red; */
}

.btn-containers .button{
    font-weight: 600;
    width: 180px;
    background-color: #fff;

    position: relative;
    overflow: hidden;
    height: 2.5rem;
    padding: 0 2rem;
    border: 2px solid #007bff;

    border-radius: 1.5rem;
    background-size: 400%;
    color: #000;
}

.btn-containers .clearbutton{
    font-weight: 600;
    /* height: 30px; */
    width: 180px;
    background-color: #fff;

    position: relative;
    overflow: hidden;
    height: 2.5rem;
    padding: 0 2rem;
    border: 2px solid #dc3545;
    border-radius: 1.5rem;
    background-size: 400%;
    color: #000;
    /* border: none; */
}


.button:hover::before, .clearbutton:hover::before {
  transform: scale(1.5);
}

.button:hover, .clearbutton:hover{
    color: #fff;
}

.button-content, .button-icon {
  position: relative;
  z-index: 1;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10%;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  /* background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  ); */
  background-color: #007bff;
  transition: all 0.475s;
}

.clearbutton::before{
  content: '';
  position: absolute;
  top: 0;
  left: -10%;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: #dc3545;
  transition: all 0.475s;
}



.reverse{
    cursor: pointer;
}

.reverse:active{
    transform: scale(0.95);
}

.errorMessage{
    width: 100vw;
    height: 100vh;
    font-weight: bold;
    font-size: 18px;
    padding: 30px 20px;
    transition: 1s;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,0.36458333333333337) 100%, rgba(0,212,255,1) 100%);

    position: absolute;
    top: 0;
    

    z-index: 100;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 400px;
  width: 100%;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
  border-radius: 2px;
  overflow: hidden;
  color: #415868;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


}

.modalss {
  position: absolute;
  width: 280px;
  height: 250px;
  top: 95px;
  left: 60px;
  background: #fff;
  border-radius: 3px;
  border: 2px solid #cb2929;
  box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  animation: show-modal 0.7s ease-in-out;
}
.modalss.hide {
  animation: hide-modal 0.6s ease-in-out both;
}
.modalss img {
  margin-top: 24px;
}
.modalss .title {
  display: block;
  font-size: 25px;
  line-height: 24px;
  font-weight: 400;
  margin: 14px 0 5px 0;
}
.modalss p {
  font-size: 18px;
  font-weight: 300;
  line-height: 26px;
  margin: 0;
  padding: 0 30px;
}
.modalss .button {
  position: absolute;
  height: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #cb2929;
  color: #fff;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  font-family: inherit;
  border: 0;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.modalss .button:hover {
  background: #CB4029;
}

@keyframes show-modal {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes hide-modal {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>