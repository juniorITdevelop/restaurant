<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Користувачі системи</h1>
      <div class="control-buttons">
        <div class="btn add"  @click="goToAddUser()"></div>
      </div>
    </div>
    <div class="work-area">
      <div class="table-header">
        <div class="first-colon">
        </div>
        <div class="second-colon">
          <p>Ім'я</p>
        </div>
        <div class="third-colon">
          <p>Посада</p>
        </div>
        <div class="fourth-colon">
          <p>Телефон</p>
        </div>
        <div class="fifth-colon">

        </div>
      </div>
      <div class="user-record" v-for="(user, index) in updatedList" :key="index" @click="goToProfile(user._id)">
        <div class="first-colon border">
          <div class="user-avatar" v-if="user.avatarImage" v-bind:style="{ backgroundImage: 'url(http://localhost:3000/' + user.avatarImage + ')' }"></div>
        </div>
        <div class="second-colon border">
          <p>{{user.name + " " + user.surname}}</p>
        </div>
        <div class="third-colon border">
          <p>{{user.postName}}</p>
        </div>
        <div class="fourth-colon border">
          <p>{{user.phone}}</p>
        </div>
        <div class="fifth-colon">
          <div class="btn edit" @click.stop="goToEdit(user._id)"></div>
          <div class="btn delete" @click.stop="deleteUser(user._id)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'users-list-component',
  data(){
    return{
      usersData: []
    };
  },
  components: {

  },
  computed:{
    updatedList(){
      return this.usersData;
    }
  },
  methods:{
    goToAddUser(){
      this.$router.push({path: '/addUser/'});
    },
    goToEdit(userId){
      this.$router.push({path: '/editUser/'+ userId});
    },
    goToProfile(userId){
      this.$router.push({path: '/userInfo/'+ userId});
    },
    deleteUser(userId){
      this.axios.delete('http://localhost:3000/api/deleteUser/'+ userId)
      .then((response) => {
        this.$store.dispatch('loadUsersData')
        .then(() => {
          this.usersData = this.$store.getters.getUsersData;
          this.usersData.forEach((element, index) => {
            if(element.avatarImage.split("//").length < 2){
              this.usersData[index].avatarImage = element.avatarImage.split("\\").join('/');
            } else {
              this.usersData[index].avatarImage = element.avatarImage.split("//").join('/');
            }
          });
        });
      })
    }
  },
  created: function(){
    this.$store.dispatch('loadUsersData')
    .then((response) => {
      this.usersData = this.$store.getters.getUsersData;
      this.usersData.forEach((element, index) => {
        if(element.avatarImage.split("//").length < 2){
          this.usersData[index].avatarImage = element.avatarImage.split("\\").join('/');
        } else {
          this.usersData[index].avatarImage = element.avatarImage.split("//").join('/');
        }
      });
    })
  }
}
</script>

<style scoped>
  .component-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
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

  .work-area{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    position: absolute;
    border-radius: 5px;
    top: 81px;
    left: 30px;
    background-color: #ffffff;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .work-area::-webkit-scrollbar-track
{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 4px;
    background-color: #F5F5F5;
}

.work-area::-webkit-scrollbar
{
    width: 8px;
    background-color: #F5F5F5;
}

.work-area::-webkit-scrollbar-thumb
{
    border-radius: 4px;
    background-color: #474f70;
}

  .work-area .border:nth-child(odd),
  .work-area .border:nth-child(even){
    border-left: 2px solid #edf2f6;
  }
  .work-area .border:nth-child(1){
    border: none;
  }
  .work-area .border{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5px 0;
  }
  .user-record{
    display: grid;
    grid-template-columns: 100px repeat(4, 1fr);
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    padding: 5px 0;
    font-family: "Roboto";
    font-weight: 200;
    height: auto;
    font-size: 15px;
    border-bottom: 2px solid #edf2f6;

  }
  .user-record:hover{
    background-color: #edf2f6;
  }

  .table-header{
    display: grid;
    grid-template-columns: 100px repeat(4, 1fr);
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    font-family: "Roboto";
    width: (100% - 20px);
    height: auto;
    padding: 5px 10px;
    border-bottom: 2px solid #000000;
  }

 
  .add{
    background: #42bab0 url('../assets/images/add.png') no-repeat center center;
    background-size: 20px;
  }
  .user-avatar{
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background-size: cover;
    background-position: center center;
  }

  .user-record .fifth-colon{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .user-record .fifth-colon .btn{
    height: 35px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    display: none;
    border-radius: 3px;
  }

  .user-record:hover > .fifth-colon .btn{
    display: block;
  }
  .edit{
    background: #68c2da url('../assets/images/edit.png') no-repeat center center;
    background-size: 20px;
  }

  .delete{
    background: #ed535d url('../assets/images/delete.png') no-repeat center center;
    background-size: 20px;
  }

  .work-area::-webkit-scrollbar-track
{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 4px;
    background-color: #F5F5F5;
}

.work-area::-webkit-scrollbar
{
    width: 8px;
    background-color: #F5F5F5;
}

.work-area::-webkit-scrollbar-thumb
{
    border-radius: 4px;
    background-color: #474f70;
}

</style>