<template>
  <div class="content">
    <div class="dark-shadow"></div>
    <img src="../assets/images/main-logo.png" alt="Logo" class="main-logo">
    <form class="login-form">
        <input id="email" type="email" placeholder="e-mail" autocomplete="off" v-model="email" required>
        <input id="password" type="password" placeholder="Пароль" autocomplete="off" v-model="password" required>
        <input type="submit" @click="handleSubmit" value="Увійти">
    </form>
  </div>
</template>

<script>

export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods : {
      handleSubmit(e){
        e.preventDefault();
        if (this.password.length > 0) {
          this.$store.dispatch('loadLoginUserData', {
              email: this.email,
              password: this.password
            })
            .then((resp) => {
              if (this.$store.getters.getLoginUserData != undefined){
                this.$emit('loggedIn');
                this.$store.dispatch('loadCurrentUserData', this.$store.getters.getLoginUserData.userId)
                .then((response) => {
                  if(this.$route.params.nextUrl != null){
                    this.$router.push(this.$route.params.nextUrl);
                  }
                  else {
                    let obj = {
                      user: `${response.data.name + ' ' + response.data.surname}`,
                      postId: response.data.postId,
                      postName: response.data.postName,
                      action: "Користувач здійснив вхід в систему"
                    }
                    this.axios.post('http://localhost:3000/api/addLog/', obj)
                    .then((response) => {
                      this.$router.push('menuCategories');
                    })
                    .catch((err) => {
                      reject(err)
                    });
                  }
                })
                .catch(error => {
                  console.dir(error);
                });
              }
            })
            .catch( err => {
              console.dir(err);
            });
        }
      }
    },
    created(){
      sessionStorage.clear();
      this.$store.dispatch('clearAll');
    }
  }

</script>

<style scoped>
  .content{
    position: absolute;
    z-index: 1000;
    width: 100%;
    left: 0;
    height: 100%;
    background: url("../assets/images/main-bg.jpg") no-repeat center center;
    background-size: cover;
  }
  .dark-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, #000000, transparent);
    right: 0;
    z-index: 10;
  }
  .main-logo{
    position: absolute;
    right: calc(10% + 100px);
    top: calc(55% - 250px);
    width: 200px;
    height: 200px;
    z-index: 20;
  }
  .login-form{
    position: absolute;
    right: 10%;
    top: 55%;
    width: 400px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: 20;
  }

  .login-form input[type="email"],
  .login-form input[type="password"]{
    width: 100%;
    height: 40px;
    background: transparent;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-right: none;
    border-left: none;
    color: white;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: "Roboto";
    font-weight: 200;
    font-size: 16px;
  }

  .login-form input[type="email"]::placeholder,
  .login-form input[type="password"]::placeholder{
    color: white;
    font-size: 16px;
  }

  .login-form input[type="submit"]{
    width: 30%;
    height: 40px;
    background: #EAC67A;
    border: none;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;
  }

  .login-form input:focus{
    outline: none;
  }
</style>