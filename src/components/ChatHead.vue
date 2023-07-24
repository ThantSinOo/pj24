<template>
    <div class="d-flex header_container d-none">
        <div class="user_logo"></div>
        <span class="chat_user">Admin</span>
    </div>
</template>

<script>
    export default{

    }
</script>

<style>
.header_container{
    background-color: #f8f8f8;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.user_logo{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: black;
}

.chat_user{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding-left: 1rem;
}

</style>