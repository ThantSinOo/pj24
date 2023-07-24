<template>
  <div class="bg-light mains" :class="showModal === true ? 'red' : 'blue'">
    <Navbar/>
    <Owicmodal v-if="showModal" :id="userid" @closeModal="hidemodal"></Owicmodal>
    <div class="page">
        <div class="containers pt-4">
            <h4 class="py-2">OWIC & Contract</h4>
            <!-- chose DOE Num -->
            <div class="form-group col-3 mt-4">
                    <label for="doenum">DOE Number</label>
                        <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                            <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                        </select>
            </div>
            <!-- table -->
            <div class="containers mt-5">
                <!-- title -->
                <h4 class="py-4">Workers Information</h4>
                <!-- Information Table-->
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No<font-awesome-icon class="mx-1 reverse" icon="fa-solid fa-arrow-down" style="color:blue" @click="reverseData" /></th>
                        <th scope="col">Worker ID</th>
                        <th scope="col">Name (En)</th>
                        <th scope="col">NRC Number</th>
                        <th scope="col">Father Name(En)</th>
                        <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody v-for="(employees,index) in fillterEmployees" :key="employees.id">
                        <tr>
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ employees.employee_id }}</td>
                        <td>{{ employees.employee_info.name_en }}</td>
                        <td>{{employees.employee_info.nrc }}</td>
                        <td>{{ employees.employee_info.father_name_en }}</td>
                        <td><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="showmodal({user_id:employees.employee_info.user_id,id:employees.passport_and_owic_data})" /></td>
                        </tr>
                        <!-- <tr v-if="!reverse" v-for="(doe,index) in does.slice().reverse()" :key="doe.id">
                        <th scope="row">{{does.length - index}}</th>
                        <th>{{ doe.doe_id }}</th>
                        <td>{{ doe.factory_name }}</td>
                        <td>{{ doe.factory_category }}</td>
                        <td>{{ doe.factory_location }}</td>
                        <td>{{ doe.factory_country }}</td>
                        </tr> -->
                    </tbody>
                </table>
        </div>
            
        </div>
        
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Owicmodal from '@/components/Owicmodal.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
export default {
components:{Navbar,Owicmodal},
setup(){
    let showModal = ref(false);
    let store = useStore();
    let doeId=ref();
    let fillterEmployees = ref();
    let userid = ref();




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


    let showmodal = (id) => {
            userid.value = id;
            showModal.value = true;
        };

        const hidemodal = () => {
            showModal.value = false;
        };


    return{
        doeId,does,getdoeId,fillterEmployees,employees,
        showModal,showmodal,hidemodal,userid
    }

}
}
</script>

<style>

</style>