<template>
  <WorkerNavbar/>
  <MaintenanceLoading />
  <div class="chat_app d-none">
    <div class="navbar">
      <!-- Add your WorkerNavbar content here -->
      <!-- <WorkerNavbar /> -->

    </div>

    <div class="chat_container">
      <div class="chat-head">
        <!-- Add your ChatHead content here -->
        <ChatHead />
      </div>
      
      <div class="chat_body">
        <!-- Add your ChatBody content here -->
        <ChatBody />
      </div>
    </div>

    <div class="chat_box">
      <!-- Add your ChatBox content here -->
      <ChatBox />
    </div>
  </div>
</template>

<script>
import WorkerNavbar from '@/components/WorkerNavbar.vue';
import ChatHead from '@/components/ChatHead.vue';
import ChatBody from '@/components/ChatBody.vue';
import ChatBox from '@/components/ChatBox.vue';
import MaintenanceLoading from '@/components/MaintenanceLoading.vue';
export default {
  components: {
    MaintenanceLoading,
    WorkerNavbar,
    ChatHead,
    ChatBody,
    ChatBox,
  },
};
</script>

<style scoped>
.chat_app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 360px;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  /* position: relative; */
}

.navbar {
  background-color: #f4f4f4;
  padding: 1rem;
  text-align: center;
  font-size: 18px;
}

.chat_container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
}

.chat-head {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 360px;
  /* width: inherit; */
  position: fixed;
}

.chat_body {
  flex: 1;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: scroll;
}

.chat_box {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
}
</style>
