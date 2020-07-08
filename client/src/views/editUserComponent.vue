<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Редагування даних користувача: {{updatedUser.name + " " + updatedUser.surname}}</h1>
      <div class="control-buttons"></div>
    </div>
    <div class="work-area">
      <input id="name" type="text" placeholder="Ім'я" v-model="updatedUser.name"/>
      <input id="surname" type="text" placeholder="Прізвище" v-model="updatedUser.surname"/>
      <input id="birdthDay" type="date" v-model="updatedUser.birdthDay"/>
      <select name id="postName" placeholder="Посада"  v-model="updatedUser.postName">
        <option value="Адміністратор">Адміністратор</option>
        <option value="Шеф-кухар">Шеф-кухар</option>
        <option value="Кухар">Кухар</option>
        <option value="Офіціант">Офіціант</option>
        <option value="Відвідувач">Відвідувач</option>
      </select>
      <select name id="postId" placeholder="ID посади" v-model="updatedUser.postId">
        <option value="p001">p001</option>
        <option value="p002">p002</option>
        <option value="p003">p003</option>
        <option value="p004">p004</option>
        <option value="p004">p005</option>
      </select>
      <input id="password" type="text" placeholder="Пароль" v-model="updatedUser.password"/>
      <input id="phone" type="text" placeholder="Телефон" v-model="updatedUser.phone"/>
      <input id="email" type="text" placeholder="Електронна пошта" v-model="updatedUser.email"/>
      <input id="avatarImage" type="file" @change="processFile"/>
      <input type="submit" value @click="handleSubmit"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-user-component",
  data() {
    return {
      userData: ''
    };
  },
  components: {},
  computed: {
    updatedUser(){
      return this.userData;
    }
  },
  created: function(){
    this.$store.dispatch('loadUserData', this.$route.params.id)
    .then((response) => {
      this.userData = this.$store.getters.getUserData;
      this.userData.password = undefined;
    })
  },
  methods: {
    processFile(event) {
      this.updatedUser.avatarImage = event.target.files[0];
    },
    handleSubmit(e) {
      e.preventDefault();
      var formData = new FormData();
      formData.append('avatarImage', this.updatedUser.avatarImage);
      formData.append('name', this.updatedUser.name);
      formData.append('surname', this.updatedUser.surname);
      formData.append('birdthDay', this.updatedUser.birdthDay);
      formData.append('postId', this.updatedUser.postId);
      formData.append('postName', this.updatedUser.postName);
      formData.append('password', this.updatedUser.password);
      formData.append('phone', this.updatedUser.phone);
      formData.append('email', this.updatedUser.email);
      this.axios.patch('http://localhost:3000/api/editUser/' + this.$route.params.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        this.$store.dispatch('loadUsersData')
        let user = JSON.parse(sessionStorage.getItem('currLoginUserData'))

          this.$store.dispatch('loadCurrentUserData', user.userId)
           .then(res=>{
                  let obj = {
                        user: `${res.data.name + ' ' + res.data.surname}`,
                        postId: res.data.postId,
                        postName: res.data.postName,
                        action: res.data.name + ' ' + res.data.surname + ' - змінив дані профілю: ' +this.updatedUser.name  + ' ' + this.updatedUser.surname 
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                    this.$router.push({path: '/usersList'});
                    this.$router.go()
                })
        })
      })
    }
  }
};
</script>

<style scoped>
.component-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.header-panel {
  width: calc(100%);
  position: absolute;
  height: 70px;
  background-color: #2b3042;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.header-text {
  font-family: "Roboto";
  font-weight: 200;
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
}
.header-text span {
  font-weight: 300;
}
.control-buttons {
  width: auto;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.control-buttons .btn:not(:last-child) {
  margin-right: 10px;
}
.btn {
  width: 80px;
  height: 100%;
  background-color: orange;
}

.work-area {
  width: calc(100% - 40px);
  height: calc(100% - 90px);
  position: absolute;
  top: 81px;
  left: 30px;
  background-color: #ffffff;
  padding: 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
}

input {
  font-family: "OpenSans";
  color: #5a5c5e;
  font-size: 14px;
  width: 300px;
  height: 40px;
  margin-bottom: 15px;
  border: none;
  border-top: 1px solid #abb3bd;
  border-bottom: 1px solid #abb3bd;
  background-color: #fafafa;
  padding: 0 10px;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
}

input[type="submit"] {
  width: 200px;
  height: 40px;
  margin-bottom: 15px;
  border: none;
  background: #41c0c2 url("../assets/images/send.png") no-repeat center center;
  background-size: 30px;
}

input[type="file"] {
  border: none;
  background-color: transparent;
}

select {
  padding: 0 10px;
  box-sizing: border-box;
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid #abb3bd;
  border-bottom: 1px solid #abb3bd;
  background-color: #fafafa;
  font-family: "OpenSans";
  color: #5a5c5e;
  font-size: 14px;
}
</style>