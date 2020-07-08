<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Категорії звітної інформації</h1>
      <div class="control-buttons">
      </div>
    </div>
    <div class="work-area">
      <div class='item' @click.stop="goToLogs">
        <div class="text-container" >
          Реалізовані замовлення
        </div>
      </div>
      <div class='item' @click.stop="goToPurchases">
        <div class="text-container">
          Реалізовані закупки
        </div>
      </div>
      <div class='item' @click.stop="goToOrders">
        <div class="text-container">
          Логи дій користувачів
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'component-name',
  data(){
    return{};
  },
  components: {

  },
  computed:{

  },
  methods: {
    goToLogs(){
      this.$router.push('/reports/orders'); 
    },
    goToPurchases(){
      this.$router.push('/reports/purchases'); 
    },
    goToOrders(){
      this.$router.push('/reports/logs'); 
    }
  }
}
</script>

<style scoped>
  .item{
    width: 300px;
    height: 200px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    margin-right: 15px;
    border: 2px solid #000;
  }
  .item:nth-child(1){
    background: url("../assets/images/money_income.jpg") no-repeat center/contain;
  }
  .item:nth-child(2){
    background: url("../assets/images/money_outcoming.jpg") no-repeat center/contain;
  }
  .item:nth-child(3){
    background: url("../assets/images/system_logs.png") no-repeat center/contain;
  }
  .text-container{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
    font-family: "OpenSans";
    font-size: 18px;
    line-height: 40px;
    color: white;
    text-align: center;
  }
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
  width: 55px;
  height: 100%;
  min-height: 25px;
}
.work-area {
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
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
}
.work-area::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: #f5f5f5;
}
.work-area::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}
.work-area::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #474f70;
}
</style>