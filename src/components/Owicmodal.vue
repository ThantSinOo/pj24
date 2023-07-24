<template>
  <div class="cvModal bg-white">
    <div class="cv px-5">
        <div class="modalHeader text-center pt-2">
                <h3 class="">Worker Contract And OWIC Number Details</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('closeModal')">
                    <span class="text-dark">&times;</span>
                </button>
        </div>

        <div v-if="employees" class="modalBody">
            <!-- Personal Information -->
            <div>
                <h5 class="text-primary py-2">Personal Information</h5>
                <div class="d-flex justify-content-between align-items-center bolds">
                    <div class="">
                        <p>Worker ID</p>
                        <p>{{ employees.data.employee_id }}</p>
                    </div>

                    <div class="">
                        <p>Name (En)</p>
                        <p>{{ employees.data.employee_info.name_en }}</p>
                    </div>

                    <div class="">
                        <p>NRC Number</p>
                        <p>{{ employees.data.employee_info.nrc }}</p>
                    </div>

                    <div class="">
                        <p>DOE Number</p>
                        <p>{{ employees.data.doe.doe_id}}</p>
                    </div>

                    <div class="">
                        <p>Father Name (En)</p>
                        <p>{{ employees.data.employee_info.father_name_en }}</p>
                    </div>
                </div>
            </div>
            <!-- Contract Upload Information -->
            <h5 class="text-primary py-2">Contract Upload Information</h5>
            <div v-if=" employees.data.passport_and_owic_data && !edit" class="row bolds">
                <div class="col-12 col-lg-5">
                    <p>Address</p>
                    <p class="address bg-light">{{ employees.data.passport_and_owic_data.address_english }}</p>
                </div>

                <div class="col-12 col-lg-7">
                    <div class="row">
                        <div class="col-6 pb-3">
                            <p>OWIC Card Number</p>
                            <p>{{ employees.data.passport_and_owic_data.owic_card_number }}</p>
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 pb-3">
                            <p>OWIC Card Number</p>
                            <p>{{ employees.data.passport_and_owic_data.owic_card_making_date }}</p>
                        </div>

                        <div class="col-6 py-3">
                            <p>Passport Number</p>
                            <p>{{employees.data.passport_and_owic_data.passport_number }}</p>
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 py-3">
                            <p>Passport Created Date</p>
                            <p>{{ employees.data.passport_and_owic_data.passport_recieving_date }}</p>
                        </div>

                        <!-- Contract Date -->
                        <div class="col-6 py-3">
                            <p>Passport Location</p>
                            <p>{{ employees.data.passport_and_owic_data.passport_making_date }}</p>
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 py-3">
                            <p>Passport Expired Date</p>
                            <p>{{ employees.data.passport_and_owic_data.passport_expire_date }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="row">
                <div class="col-12 col-lg-5">
                    <label for="address" class="d-block">Address</label>
                    <textarea type="text" class="address bg-light" id="address" v-model="address"></textarea>
                </div>

                <div class="col-12 col-lg-7">
                    <div class="row">
                        <div class="col-6 pb-3">
                            <label for="cardno" class="d-block">OWIC Card Number</label>
                            <input type="text" name="cardno" id="cardno" v-model="cardno">
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 pb-3">
                            <label for="createDate" class="d-block">OWIC Created Date</label>
                            <input autocomplete="off" class="form-control bg-light date" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="createDate" v-model="createDate">
                        </div>

                        <div class="col-6 py-3">
                            <label for="passport" class="d-block">Passport Number</label>
                            <input type="text" name="passport" id="passport" v-model="passport">
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 py-3">
                            <label for="passportcreateDate" class="d-block">Passport Created Date</label>
                            <input autocomplete="off" class="form-control bg-light date" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="passportcreateDate" v-model="passportcreateDate">
                        </div>

                        <!-- Contract Date -->
                        <div class="col-6 py-3">
                            <label for="passportlocation" class="d-block">Passport Created Location</label>
                            <input type="text" name="passportlocation" id="passportlocation" v-model="passportlocation">
                        </div>

                        <!-- Contract Date -->
                        <div class="form-group col-6 py-3">
                            <label for="passportexpiredDate" class="d-block">Passport Expired Date</label>
                            <input autocomplete="off" class="form-control bg-light date" name="MoveInDate" placeholder="DD-MM-YYYY" type="date" min="1900-12-01" max="2050-01-01" spellcheck="false" id="passportexpiredDate" v-model="passportexpiredDate">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Btn Container -->
            <div  v-if="employees.data.passport_and_owic_data && !edit" class="d-flex justify-content-center my-2">
                    <button class="btn reject mx-2 oneBtn" @click="editData"><span class="text-light" >Edit</span></button>
                  
            </div>

            <div v-else-if="!employees.data.passport_and_owic_data" class="d-flex justify-content-center my-2">
                    <!-- <button class="btn reject mx-2 oneBtn" @click="close"><span class="text-danger" >Cancel</span></button> -->
                    <button class="btn passed mx-2 oneBtn" @click="handleSubmit"><span class="text-success" @click="$emit('closeModal')" >Confirm</span></button>
            </div>

            <div v-if="edit" class="d-flex justify-content-center my-2">
                    <button class="btn reject mx-2 oneBtn" @click="cancel"><span class="text-danger" >Cancel</span></button>
                    <button class="btn passed mx-2 oneBtn" @click="update"><span class="text-success" @click="$emit('closeModal')">Update</span></button>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { defineEmits,defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    props:["id"],
    setup(props){
        let store = useStore();
        let router = useRouter();
        let address = ref();
        let cardno = ref();
        let createDate = ref();
        let passport = ref();
        let passportcreateDate = ref();
        let passportlocation = ref();
        let passportexpiredDate = ref();
        let owicdata = ref();
        let edit = ref(false);

        //   get employee
        let getsingleEmployees = (id)=> store.dispatch('infoModule/getsingleEmployees',id);
        getsingleEmployees(props.id.user_id);
           
        let employees = computed(()=> {
              return store.state.infoModule.singleemployeesinfo
          })
          
        console.log(employees);  

        // owicdata.value = props.id.id;
        console.log(owicdata.value);

        let handleSubmit=async()=>{
            let data = {
                user_id:props.id.user_id,
                owic_card_number:cardno.value,
                owic_card_making_date:createDate.value,
                passport_number:passport.value,
                passport_recieving_date:passportcreateDate.value,
                passport_expire_date:passportexpiredDate.value,
                passport_making_date:passportlocation.value,
                address_english:address.value
            }

            console.log(data);

            let res = await axios.post('passport_and_owic',data);
            console.log(res.data);
        } 
        
        let editData = ()=>{
            address.value = props.id.id.address_english;
            cardno.value = props.id.id.owic_card_number;
            createDate.value = props.id.id.owic_card_making_date;
            passport.value =props.id.id.passport_number;
            passportcreateDate.value = props.id.id.passport_recieving_date ;
            passportlocation.value = props.id.id.passport_making_date;
            passportexpiredDate.value = props.id.id.passport_expire_date;
            owicdata.value = null;
            edit.value=true;
        }

        let update=async()=>{
            let data = {
                user_id:props.id.user_id,
                owic_card_number:cardno.value,
                owic_card_making_date:createDate.value,
                passport_number:passport.value,
                passport_recieving_date:passportcreateDate.value,
                passport_expire_date:passportexpiredDate.value,
                passport_making_date:passportlocation.value,
                address_english:address.value
            }

            console.log(data);

            let res = await axios.patch(`passport_and_owic/${props.id.id.id}`,data)
            console.log(res.data);
            // props.id.id = data;
            router.go(0);
        }


        let cancel=()=>{
            owicdata.value = props.id.id,
            edit.value = false;
        }

       return{
        employees,address,cardno,passport,passportcreateDate,passportexpiredDate,passportlocation,createDate,
        handleSubmit,owicdata,editData,cancel,edit,update
       }   
    }
}
</script>

<style>
.address{
    width: 350px;
    height: 250px;
}

.date{
    /* width: 300px; */
    -webkit-appearance: none;
    font-size: 18px;
    text-align: center;
    letter-spacing: 2px;
    padding-right: 10px;
    border-radius: 8px;
    
}
</style>