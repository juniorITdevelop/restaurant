<template>
  <div class="content-wrapper">
    <div class="user-avatar" v-if="userAvatarImageUrl" v-bind:style="{ backgroundImage: 'url(http://localhost:3000/' + userAvatarImageUrl + ')' }"></div>
    <div>
      <p>{{this.userData.name + " " + this.userData.surname}}</p>
      <p>{{this.userData.postName}}</p>
      <router-link to="">
        <span v-on:click="goToUserInfo()">Профіль</span>
      </router-link>
      <router-link to="/login">
        <span v-on:click="logOut()">Вийти</span>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'user-menu-component',
  data(){
    return{
      userData: {},
      userAvatarImageUrl: ''
    };
  },
  computed: {

  },
  methods: {
    goToUserInfo(){
      this.$router.push("/userInfo/" + this.userData._id); 
    },
    logOut(){
      sessionStorage.clear();
      this.$store.dispatch('clearAll')
      .then((res) => {
        sessionStorage.clear();
        this.$router.push('/login');
        this.$router.go();
      });
    }
  },
  created: function(){
    let loginUserInfo = JSON.parse(sessionStorage.getItem("currLoginUserData"));
    this.$store.dispatch('loadCurrentUserData', loginUserInfo.userId)
    .then((response) => {
      this.userData = this.$store.getters.getCurrentUserData;
      if(this.userData.avatarImage.split("//").length < 2){
        this.userAvatarImageUrl = this.userData.avatarImage.split("\\").join('/');
      } else {
        this.userAvatarImageUrl = this.userData.avatarImage.split("//").join('/');
      }
    })
  }
}
</script>
  
<style scoped>
  .content-wrapper{
    display: flex;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    align-items: center;
    z-index: 1000;
    width: 200px;
    height: 70px;
    font-family: "Roboto";
    color: #cdd6e7;
    font-weight: 300;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.4px;
  }
  .user-avatar{
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-right: 10px;
  }
  a{
    text-decoration: underline;
    color: #e9c87b;
    margin-right: 5px;
    cursor: pointer;
  }
</style>