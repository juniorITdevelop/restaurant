<template>
  <div class="content-wrapper" :class='{active: this.$store.state.isActive}'>
    <div class="open-menu-btn" :class='{active: this.$store.state.isActive}' @click="showMenu"></div>
    <div class="menu-logo"></div> 
    <nav>
      <ul>
        <li class="li1"><router-link active-class="active" to="/menuCategories">Меню</router-link></li>
        <li class="li2" v-if="currentUserData.postId != 'p005'"><router-link  active-class="active" to="/order">Замовлення</router-link></li>
        <li class="li3"><router-link active-class="active" to="/tablesInfo">Столики</router-link></li>
        <li class="li4"><router-link active-class="active" to="/feedBack">Відгуки</router-link></li>
        <li class="li5"><router-link active-class="active" to="/purchases">Закупки</router-link></li>
        <li class="li6"><router-link active-class="active" to="/reports">Звіти</router-link></li>
        <li class="li7"><router-link active-class="active" to="/analitics">Аналітика</router-link></li>
        <li class="li8"><router-link active-class="active" to="/usersList">Користувачі</router-link></li>
      </ul>
    </nav>
    <user-menu-component class="user-menu-block"></user-menu-component>
  </div>
</template>

<script>
  import UserMenu from './userMenuComponent.vue';

export default {
  name: 'app-menu-component',
  data(){
    return{
      currentUserData: {},
      userId: ''
    };
  },
  components: {
    'user-menu-component': UserMenu
  },
  computed:{

  },
  methods:{
    showMenu(){
      this.$store.state.isActive = !this.$store.state.isActive
    }
  },
  created(){
    this.userId = JSON.parse(sessionStorage.getItem('currLoginUserData')).userId;
    this.$store.dispatch("loadCurrentUserData", this.userId).then(response => {
      this.currentUserData = this.$store.getters.getCurrentUserData;
    });
  }
}
</script>

<style>

  .open-menu-btn{
    position: absolute;
    width: 20px;
    height: 100%;
    right: -20px;
    background: #2b3042;
  }
  .open-menu-btn:before{
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    right: 3px;
    top: calc(50% - 7px);
    background: url("../assets/images/menu-arrow.png") no-repeat;
    background-size: 14px 14px;
    transition: 1s;
  }

  .open-menu-btn.active:before{
    transform: rotate(180deg);
    transition: 1s;
  }
  .content-wrapper{
    position: absolute;
    transform: translateX(-200px);
    transition: 1s;
    z-index: 10;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #2b3042;
  }
  .content-wrapper.active{
    transform: translate3d(0,0,0);
    transition: 1s;
  }
  .menu-logo{
    position: absolute;
    width: 120px;
    height: 120px;
    left: 39px;
    top: 35px;
    background: url("../assets/images/main-logo.png") no-repeat;
    background-size: 120px 120px;
  }
  .user-menu-block{
    position: absolute;
    right: 0;
    bottom: calc(0px + 15px);
    transform: translate3d(0,0,0);

  }
  nav{
    width: 100%;
    position: absolute;
    top: 200px;
    height: auto;
  }
  nav > ul{
    color: #9a9fa2;
    font-family: "OpenSans";
    list-style-type: none;
    width: 100%;
    height: auto;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
  }
  nav > ul > li{
    width: 90%;
    height: 36px;
  }
  nav > ul > li{
    width: 100%;
    height: 36px;
  }
  nav > ul > li > a{
    position: relative;
    display: block;
    width: 100%;
    height: 36px;
    border-left: 5px solid #2b3042;
    color: #878a94;
    font-size: 14px;
    line-height: 36px;
    padding-left: 66px;
    text-decoration: none;
    box-sizing: border-box;
  }

   nav > ul > li > a:before{
     top: 7px!important;
   }

   nav > ul > li.li1 > a:before{
    content: '';
    position: absolute;
    left: 35px;
    top: 6px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/menu-dark.png') no-repeat;
    background-size: contain;
  }

  nav > ul > li.li1 > a:hover:before{
    content: '';
    position: absolute;
    left: 35px;
    top: 6px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/menu.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li1 > a.active:before{
    content: '';
    position: absolute;
    left: 35px;
    top: 6px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/menu.png') no-repeat;
    background-size: contain;
  }





  nav > ul > li.li2 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 44px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/list-dark.png') no-repeat;
    background-size: contain;
  }

   nav > ul > li.li2 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 44px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/list.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li2 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 44px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/list.png') no-repeat;
    background-size: contain;
  }






  nav > ul > li.li3 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 78px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/table-dark.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li3 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 78px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/table.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li3 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 78px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/table.png') no-repeat;
    background-size: contain;
  }
  

  nav > ul > li.li4 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 114px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/feedback-dark.png') no-repeat;
    background-size: contain;
  }

  nav > ul > li.li4 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 114px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/feedback.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li4 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 114px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/feedback.png') no-repeat;
    background-size: contain;
  }

  nav > ul > li.li5 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 151px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/purchase-dark.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li5 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 151px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/purchase.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li5 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 151px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/purchase.png') no-repeat;
    background-size: contain;
  }


  nav > ul > li.li6 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 186px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/reports-dark.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li6 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 186px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/reports.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li6 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 186px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/reports.png') no-repeat;
    background-size: contain;
  }

  nav > ul > li.li7 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 222px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/statistics-dark.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li7 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 222px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/statistics.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li7 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 222px;
    width: 22px;
    height: 22px;
    background: url('../assets/images/statistics.png') no-repeat;
    background-size: contain;
  }


  nav > ul > li.li8 > a:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 259px;
    width: 20px;
    height: 20px;
    background: url('../assets/images/users-dark.png') no-repeat;
    background-size: contain;
  }
    nav > ul > li.li8 > a:hover:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 259px;
    width: 20px;
    height: 20px;
    background: url('../assets/images/users.png') no-repeat;
    background-size: contain;
  }
  nav > ul > li.li8 > a.active:before{
    content: '';
    position: absolute;
    left: 36px;
    top: 259px;
    width: 20px;
    height: 20px;
    background: url('../assets/images/users.png') no-repeat;
    background-size: contain;
  }

  nav > ul > li > a:hover{
    border-left: 5px solid #e9c87b;
    color: white;
    background: linear-gradient(90deg, #e9c87b, #2b3042);
  }
  nav > ul > li > a.active{
    display: block;
    color: #ffffff;
    font-family: "OpenSans";
    width: 100%;
    height: 36px;
    border-left: 5px solid #e9c87b;
  }

</style>