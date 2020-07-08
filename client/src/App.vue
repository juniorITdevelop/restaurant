<template>
    <main>
        <app-menu-component v-if="loggedInUser.userId"></app-menu-component>

        <router-view></router-view>
        <div class="bg-wrapper" :class='{active: this.$store.state.isActive}' @click="hideMenu"></div>

    </main>
</template>

<script>
    import AppMenu from './components/appMenuComponent.vue';

    export default {
    components: {
        'app-menu-component': AppMenu
    },
    created(){
        
    },
    computed: {
        loggedInUser(){
            if(sessionStorage.getItem("currLoginUserData") != undefined){
                return JSON.parse(sessionStorage.getItem("currLoginUserData"));
            } else {
                return this.$store.getters.getLoginUserData;
            }
        }
    },
    methods:{
        hideMenu(){
            this.$store.state.isActive = !this.$store.state.isActive
        }
    }
}
</script>

<style>
@import "../public/css/fonts.css";

    html,
    body,
    main{
        height: 100%;
        background-color: #edf2f6;
        margin: 0;
        padding: 0;
    }
    .bg-wrapper{
        opacity: 0;
        pointer-events: none;
        width: 100%;
        height: 100%;
        background: transparent;
        transition: 0.5s;
  }
  .bg-wrapper.active{
    position: relative;
    opacity: 1;
    pointer-events: auto;
    background: transparent;
  }
</style>
