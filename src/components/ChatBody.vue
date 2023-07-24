<template>
   <div class="messages_box">
    <!-- <p>{{ messages.message }}</p> -->
    <!-- <p>{{ messages.value }}</p> -->
    <div  class="singleMessage">
        <p>{{ messages }}</p>
    </div>
   </div>
</template>

<script>
import { computed,ref } from 'vue';
import { useStore } from 'vuex';
    export default{
        setup(){
        const store = useStore();
        let messages = computed(()=> store.state.chat.message);
        console.log("Messages from Chat Body =>", messages);
        console.log("Messages from Chat Body =>", messages.message);
        console.log("Messages from Chat Body =>", messages.value);
        return{
            messages
        }
        }        
    }
</script>

<style>
.messages_box{
    position: relative;
}
    .messages_box > p{
        padding: 10px;
        background-color: lightblue;
        border-radius: 20px;
    }
    .singleMessage{
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(50%, 50%);

        background-color: lightcoral;
        border-radius: 0.7rem;
        padding: 5px 10px;
     }
</style>