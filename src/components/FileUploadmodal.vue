<template>
  <div class="mymodal bg-white d-flex justify-content-center rounded">
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
    <div class="borders">
        <div class="py-3 px-4">
          <td class="py-3"><input type="file" class="btn btn-primary" @change="uploadFile"></td>

          <div class="d-flex justify-content-end mt-5">
            <button class="btn btn-danger mx-4" @click="$emit('closeModal')">Cancel</button>
            <button class="btn btn-success" @click ="handleSubmit">Upload</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'
import SuccessModal from '../components/SuccessModal.vue';
export default {
  components:{SuccessModal},
  props:["id"],
  setup(props){
    let file = ref();
    let successModal = ref(false);
        let errorMessage = ref(null);
        let message = ref(true);
        let router = useRouter();

    let uploadFile=(event)=>{
        file.value = event.target.files[0]
    }

    let handleSubmit = async()=>{
      console.log(props.id);
        console.log(file.value);
        let data = {
          pdf:file.value
        }

        let formData = new FormData();
        formData.append('pdf', file.value);

        console.log(formData);

        try {
          let res = await axios.post(`contract_upload/${props.id}?_method=patch`,formData);
            if(res){
                console.log(res.data.message);
                // alert(res.data.message)
                // showSuccess();
                router.go(0);
            }
        } catch (error) {
            
            if(error.response){
                message.value = true;
                errorMessage.value = error.response.data.message
                console.log(error.response.data.message);
            }
        }
    }

    let showSuccess = (id) => {
            successModal.value = true;
            bgactive.value = true;
        };

        let closemessage = ()=>{
            message.value = false;
            console.log("hey");
        }    
     
   return{
     uploadFile,file,handleSubmit,
     successModal,showSuccess,errorMessage,message,closemessage
   } 
  }
}
</script>

<style>
.borders{
  border:2px solid rgba(1, 1, 255, 0.2);
}
</style>