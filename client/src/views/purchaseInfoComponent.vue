<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Замовлення на закупку інгредієнтів №: <span v-if="purchasesData[purchaseIndex]">{{purchasesData[purchaseIndex].purchaseNumber}}</span></h1>
      <div class="control-buttons">
      </div>
    </div>
    <div class="work-area">
      <div class="info-order" v-if="purchasesData[purchaseIndex]">
        <div class="text">Номер закупки: <span>{{purchasesData[purchaseIndex].purchaseNumber}}</span></div>
        <div  class="text">Статус: <span>{{purchasesData[purchaseIndex].purchaseStatus}}</span></div>
        <div  class="text">Дата створення: <span>{{purchasesData[purchaseIndex].creationTime}}</span></div>
        <div  class="text">Фінальна вартість
          <span style="position: relative;">: {{costData}}
            <div v-if="!showInput" class="btn edit" @click.stop="openStatusEdit()"></div>
            <input v-if="showInput" type="text" placeholder="Фінальна вартість" v-model="costData" />
            <div v-if="showInput" class="btn complete" @click.stop="handleSubmit"></div>
            <div v-if="showInput" class="btn close" @click.stop="closeStatusEdit()"></div>
          </span>
        </div>

        <div class="header-dishes">
          <div>Необхідні товари:</div>
        </div>

        <div class="dishes-table" v-for="(good, ind) in purchasesData[purchaseIndex].goods" :key="ind">
          <div>{{ind + 1}}. {{good}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'user-info-component',
  data(){
    return{
      purchasesData: [],
      purchaseIndex: "",
      costData: '',
      showInput: false
    }
  },
  computed: {

  },
  components: {
  },
  methods:{
      openStatusEdit(index){
        this.showInput = true;
      },
      closeStatusEdit(index){
        this.showInput = false;
        this.costData = "0";
      },
     handleSubmit(e) {
      e.preventDefault();
      this.purchasesData[this.purchaseIndex].purchaseStatus = "Закупку виконано";
      this.purchasesData[this.purchaseIndex].totalCost = this.costData;
      this.purchasesData[this.purchaseIndex].goods = JSON.stringify(this.purchasesData[this.purchaseIndex].goods);

      this.axios.patch('http://localhost:3000/api/editPurchase/'+ this.$route.params.id, this.purchasesData[this.purchaseIndex])
      .then((response) => {
        this.$store.dispatch('loadPurchases')
        .then((resp) => {
          this.$router.push('/purchases')
        })
      })
    },
  },
  created: function(){
    this.$store.dispatch('loadPurchases')
    .then((response) => {
      this.purchasesData = this.$store.getters.getPurchases;
      this.purchaseIndex = this.purchasesData.findIndex(el => el._id == this.$route.params.id);
      this.costData = this.purchasesData[this.purchaseIndex].totalCost;
    })
  }
}
</script>

<style scoped>
.text{
  margin-bottom: 10px;
}

.status-select{
  position: absolute;
  top: 2px;
  left: 0;
  width: 125px;
}

.add-new-dish{
  margin: 20px 0;
  height: 35px;
  display: flex;
  align-items: center;
}

.add-new-dish input[type="submit"] {
  background: #42bab0 url("../assets/images/add.png") no-repeat center center;
  background-size: 20px;
  width: 80px;
  height: 30px;
  border: none;
  font-size: 0;
  text-decoration: none;
  cursor: pointer;
}
input[type="text"] {
  height: 20px;
  position: absolute;
  left: 0px;
  top: -2px;
  z-index: 100;
  font-family: "Roboto";
}
input[type="text"]:focus {
  outline: none;
}



.info-order{
  width: 100%;
  height: 100%;
  font-family: Roboto;
}
.info-order span{
  font-weight: 200;
}
.header-dishes,
.dishes-table{
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
}
.header-dishes{
  border-bottom: 2px solid #41c0c2;
}
.dishes-table{
  border-bottom: 1px solid silver;
}
.header-dishes div,
.dishes-table div{
  position: relative;
  padding: 5px;
}
.dishes-table div:nth-child(5){
  width: 120px;
  height: 33px;
}

.dishes-table:hover .edit,
.dishes-table:hover .delete{
  display: block;
}
.header-dishes{
      text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin-top: 50px;

}
.dishes-table{
  font-size: 15px;
  font-weight: 200;
}
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
    width: 45px;
    height: 60%;
  }
  form > select,
  form > input[type="text"]{
      height: 100%;
      border-radius: 5px;
      margin-right: 10px;
      width: 200px;
      font-size: 20px;
      color: #2b3042;
      text-align: center;
      border: 1px solid black;
      outline: none;
  }

  .edit{
    background: #41c0c2 url('../assets/images/edit.png') no-repeat center center;
    background-size: 15px;
    height: 20px;
    width: 60px;
    position: absolute;
    right: -80px;
    top: 0;
  }

  .complete{
    background: #41c0c2 url('../assets/images/complete.png') no-repeat center center;
    background-size: 10px;
    position: absolute!important;
    top: 26px;
    left: 0px;
    width: 80px;
    height: 20px!important;
  }

  .close{
    background: #f47264 url('../assets/images/close.png') no-repeat center center;
    background-size: 10px;
    position: absolute!important;
    top: 26px;
    left: 96px;
    width: 80px;
    height: 20px!important;
  }

  .delete{
    background: #f47264 url('../assets/images/delete.png') no-repeat center center;
    background-size: 20px;
    display: none;
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

</style>
