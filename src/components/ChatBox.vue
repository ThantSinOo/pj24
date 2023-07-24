<template>
    <div class="chat-box">
      <div class="textarea-container">
        <textarea    v-model="message" @keydown.enter="sendMessage" :placeholder="message ? '' : 'Type message'"></textarea>
      </div>
     
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  export default{
    setup(){
      const message = ref('');
      const store = useStore();

      
  
  let sendMessage = async () => {
    console.log("Send Message to store",message.value);
    await store.dispatch("chat/storeMessages",message.value);
    message.value = '';
  }

  return{
    sendMessage,
    message,
     
  }
    }
  }
  
  </script>
  
  <style>
  .chat-box {
    position: fixed;
    bottom: 0;
    left: 50%;

    transform: translateX(-50%);
    width: 360px;
    background-color: #f0f0f0;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .upload-button {
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    /* Style the label to look like a button */
    display: inline-block;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: #007bff;
    color: #fff;
  }
  
  .upload-button img {
    width: 24px;
    height: 24px;
    /* Position the image at the left side of the button */
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .textarea-container {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  textarea {
    flex: 1;
    padding: 8px;
    resize: none;
    border: none;
    border-radius: 6px;
    background-color: #fff;
    line-height: 0.8rem;
    vertical-align: center;
    overflow-y: hidden; /* Hide the vertical scrollbar */
    
  }

  
  textarea:focus {
    outline: none; /* Remove the default focus outline */
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: #fff;
  }
  </style>
  