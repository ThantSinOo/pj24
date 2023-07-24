<template>
    <div class="container form_control">
        <WorkerNavbar></WorkerNavbar>
        <div>
            <h3>Chat with International Focus</h3>
        </div>
    </div>
</template>

<script>
    import WorkerNavbar from '@/components/WorkerNavbar.vue';
    export default{
        components:{WorkerNavbar},

        setup(){

        }
    }
</script>

<style>
    .form_control {
  /* margin-top: ; */
    width: 370px;
    /* height: 400vh; */
    /* border: 1px solid blue; */
    /* padding: 3rem; */

    /* display: flex; */
    justify-content: center;
    align-items: center;
}
</style>