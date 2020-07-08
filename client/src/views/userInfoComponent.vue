<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Профіль користувача: <span>{{this.userData.name + " " + this.userData.surname}}</span></h1>
      <div class="control-buttons">
        <div class="btn edit" @click="goToEdit"></div>
        <div class="btn delete" @click="deleteUser"></div>
      </div>
    </div>
    <div class="work-area">
      <div class="first-cell">
        <div class="user-avatar" v-if="userAvatarImageUrl" v-bind:style="{ backgroundImage: 'url(http://localhost:3000/' + userAvatarImageUrl + ')' }"></div>
      </div>
      <div class="second-cell">
        <p>Посада: <span>{{this.userData.postName}}</span></p>
        <p>Телефон: <span>{{this.userData.phone}}</span></p>
        <p>e-mail: <span>{{this.userData.email}}</span></p>
        <p>Дата народження: <span>{{this.userData.birdthDay}}</span></p>
        <p>Зареєстровано в системі: <span>{{this.userData.registrationDate}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'user-info-component',
  data(){
    return{
      userData: {},
      userAvatarImageUrl: ''
    };
  },
  components: {

  },
  methods:{
    goToEdit(){
      this.$router.push({path: '/editUser/'+ this.$route.params.id});
    },
    deleteUser(){
      this.axios.delete('http://localhost:3000/api/deleteUser/'+ this.$route.params.id)
      .then((response) => {
        this.$store.dispatch('loadUsersData')
        .then(() => {
          this.$router.push({path: '/usersList'});
        });
      })
    }
  },
  computed:{

  },
  created: function(){
    this.$store.dispatch('loadUserData', this.$route.params.id)
    .then((response) => {
      this.userData = this.$store.getters.getUserData;
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
  .component-wrapper{
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .header-panel{
    width: calc( 100%);
    position: absolute;
    height: 70px;
    background-color: #2b3042;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .header-text{
    font-family: "Roboto";
    font-weight: 200;
    font-style: normal;
    font-size: 20px;
    color: #ffffff;
  }
  .header-text span{
    font-weight: 300;
  }
  .control-buttons{
      width: auto;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .control-buttons .btn:not(:last-child){
      margin-right: 10px;
  }
  .btn{
    width: 80px;
    height: 100%;
  }

  .edit{
    background: #41c0c2 url('../assets/images/edit.png') no-repeat center center;
    background-size: 20px;
  }

  .delete{
    background: #f47264 url('../assets/images/delete.png') no-repeat center center;
    background-size: 20px;
  }

  .work-area{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    position: absolute;
    top: 81px;
    left: 30px;
    background-color: #fafafa;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
    border-radius: 5px;
  }
  .work-area::-webkit-scrollbar {
    display: none;
  }
  .first-cell{
    width: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .first-cell .user-avatar{
    width: 150px;
    height: 150px;
    border-radius: 75px;
    background-size: cover;
    background-position: center center;
  }

  .second-cell{
    font-family: "Roboto";
    font-weight: 200;
    width: 500px;
    height: auto;
    margin-top: 5px;
  }

  .second-cell p{
    margin-bottom: 15px;
    margin-top: 0px;
    width: 500px;
    height: auto;
  }

  .second-cell p span{
    font-weight: 300;
  }
</style>
