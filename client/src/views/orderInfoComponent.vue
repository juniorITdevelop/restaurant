<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Замовлення №: <span v-if="orderData[orderIndex]">{{orderData[orderIndex].orderNumber}}</span></h1>
      <div class="control-buttons">
      </div>
    </div>
    <div class="work-area">
      <div class="info-order" v-if="orderData[orderIndex]">
        <div class="text">Номер столика: <span>{{orderData[orderIndex].tableName}}</span></div>
        <div class="text">Кількість гостей: <span>{{orderData[orderIndex].guestsCount}}</span></div>
        <div class="text">Додаткова інформація: <span>{{orderData[orderIndex].additionalInfo}}</span></div>
        <div class="text">Час створення замовлення: <span>{{orderData[orderIndex].creationTime}}</span></div>
        <div class="text">Офіціант: <span>{{orderData[orderIndex].waiter}}</span></div>
        <div class="text">Номер замовлення: <span>{{orderData[orderIndex].orderNumber}}</span></div>
        <div class="text">Статус замовлення: <span>{{orderData[orderIndex].orderStatus}}</span></div>
        <div class="text">Тип подачі: <span>{{orderData[orderIndex].deliveryType}}</span></div>
        <div class="text">Ціна замовлення: <span>{{orderData[orderIndex].totalCost}} грн.</span></div>

        <form class="add-new-dish">
          <select  class="add-category" id="category" v-model="categoryName"  @change="changeCategory($event, $event.target.selectedIndex)" >
            <option v-for="(category, index) in categoryData" :key="index" >{{category.categoryName}}</option>
          </select>
          <select  class="add-dish-name" id="dishes" v-model="dishName"  @change="changeDish($event, $event.target.selectedIndex)" v-if="categoryData[selectedCategoryindex]">
            <option v-for="(dish, index) in categoryData[selectedCategoryindex].dishes" :key="index">{{dish.dishName}}</option>
          </select>
          <input type="text" placeholder="Кількість" v-model="countDish">
          <input type="submit"  @click="handleSubmit" >
        </form>

        <div class="header-dishes">
          <div>Назва категорії страв</div>
          <div>Назва страви</div>
          <div>Знижка(%)</div>
          <div>Час приготування(хв)</div>
          <div>Статус приготування</div>
          <div>Кількість</div>
          <div>Ціна(грн.)</div>
        </div>

        <div class="dishes-table" v-if="render" v-for="(dish, ind) in orderData[orderIndex].dishes" :key="ind">
          <div>{{dish.categoryName}}</div>
          <div>{{dish.dishName}}</div>
          <div>{{dish.specialOffer}}</div>
          <div>{{dish.cookingTime}}</div>
          <div>{{dish.cookingStatus}}
            <select name="" id="" v-model="cookingStat" class="status-select" v-if="showInputs[ind]">
              <option>У черзі</option>
              <option>В процесі</option>
              <option>Готово</option>
            </select>
            <div v-if="showInputs[ind]" class="btn complete" @click.stop="updateDishStatus(ind)"></div>
            <div v-if="showInputs[ind]" class="btn close" @click.stop="closeStatusEdit(ind)"></div>
          </div>
          <div>{{dish.count}}</div>
          <div>{{dish.cost}}</div>
          <div class="control-buttons">
            <div class="btn edit" @click.stop="openStatusEdit(ind)"></div>
            <div class="btn delete" @click.stop="deleteDishFromOrder(ind)"></div>
          </div>
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
      render: "true",
      orderData: [],
      orderIndex: "",
      flagsArray: [], 
      oredrNum:'',
      countDish: '',
      cookingStat: '',
      selectedCategoryindex: '',
      selectedDishindex: '',
      categoryData:[],
      dishData:[],
        dishName: "",
        categoryName: "",
        cost: "",
        specialOffer: "",
        cookingTime: "",
        cookingStatus: "",
        count: this.countDish
    };
  },
  computed: {
    showInputs() {
      return this.flagsArray;
    }
  },
  components: {
  },
  methods:{
    updateDishStatus(index){
      this.orderData[this.orderIndex].dishes[index].cookingStatus = this.cookingStat;
      let inProgressStatus = this.orderData[this.orderIndex].dishes.some(el => {
        return el.cookingStatus == "В процесі";
      })
      let doneStatus = this.orderData[this.orderIndex].dishes.every(el => {
        return el.cookingStatus == "Готово";
      })
      console.dir(inProgressStatus);
      console.dir(doneStatus);
      if(inProgressStatus){
        this.orderData[this.orderIndex].orderStatus = "В роботі";
      } else if(doneStatus){
        this.orderData[this.orderIndex].orderStatus = "Роботу завершено";
      }
      this.orderData[this.orderIndex].dishes = JSON.stringify(this.orderData[this.orderIndex].dishes);
      this.axios.patch('http://localhost:3000/api/editOrder/'+ this.$route.params.id, this.orderData[this.orderIndex])
      .then((response) => {
        this.$store.dispatch('loadOrders')
        .then((resp) => {
          this.$router.go()
        })
      })
    },
    openStatusEdit(index){
      this.flagsArray.forEach((el, ind) => {
        this.flagsArray[ind] = false;
      });
      this.flagsArray[index] = true;
      this.render = false;
      this.render = true;
    },
    closeStatusEdit(index){
      this.flagsArray.forEach((el, ind) => {
        this.flagsArray[ind] = false;
      });
      this.render = false;
      this.render = true;
    },
    changeCategory(e, selected){
      this.selectedCategoryindex = selected
    },
    changeDish(e, selected){
        this.selectedDishindex = selected
        this.cost = this.categoryData[this.selectedCategoryindex].dishes[this.selectedDishindex].cost
        this.specialOffer = this.categoryData[this.selectedCategoryindex].dishes[this.selectedDishindex].specialOffer
        this.cookingTime = this.categoryData[this.selectedCategoryindex].dishes[this.selectedDishindex].cookingTime
        this.cookingStatus = this.categoryData[this.selectedCategoryindex].dishes[this.selectedDishindex].cookingStatus
    },
    deleteDishFromOrder(index){
      this.orderData[this.orderIndex].dishes.splice(index, 1);
      this.orderData[this.orderIndex].totalCost = 0;
      this.orderData[this.orderIndex].dishes.forEach((element, index) => {
          let cst = element.cost * element.count;
          if(element.specialOffer){
            this.orderData[this.orderIndex].totalCost += cst - (cst * (element.specialOffer / 100));
          } else {
            this.orderData[this.orderIndex].totalCost += cst;
          }
      })
      this.orderData[this.orderIndex].dishes = JSON.stringify(this.orderData[this.orderIndex].dishes);
      this.axios.patch('http://localhost:3000/api/editOrder/'+ this.$route.params.id, this.orderData[this.orderIndex])
      .then((response) => {
        this.$store.dispatch('loadOrders')
        .then((resp) => {
          this.$router.go()
        })
      })
    },
     handleSubmit(e) {
       e.preventDefault();
       let dish = {
          dishName: this.dishName,
          categoryName: this.categoryName,
          cost: this.cost,
          specialOffer: this.specialOffer,
          cookingTime: this.cookingTime,
          cookingStatus: this.cookingStatus,
          count: this.countDish
       }
       this.orderData[this.orderIndex].dishes.push(dish)
       this.orderData[this.orderIndex].totalCost = 0;
       this.orderData[this.orderIndex].dishes.forEach((element, index) => {
          let cst = element.cost * element.count;
          if(element.specialOffer){
            this.orderData[this.orderIndex].totalCost += cst - (cst * (element.specialOffer / 100));
          } else {
            this.orderData[this.orderIndex].totalCost += cst;
          }
       })
       this.orderData[this.orderIndex].dishes = JSON.stringify(this.orderData[this.orderIndex].dishes)

      this.axios.patch('http://localhost:3000/api/editOrder/'+ this.$route.params.id, this.orderData[this.orderIndex])
      .then((response) => {
        this.$store.dispatch('loadOrders')
        .then((resp) => {
          this.$router.go()
        })
      })
    },
  },
  created: function(){
    this.$store.dispatch('loadOrders')
    .then((response) => {
      this.orderData = this.$store.getters.getOrders;
      this.orderIndex = this.orderData.findIndex(el => el._id == this.$route.params.id)
      this.orderData[this.orderIndex].dishes.forEach(el => {
        this.flagsArray.push(false);
      })
      this.$store.dispatch('loadMenuCategories')
      .then((response) => {
        this.$store.getters.getMenuCategories.forEach(element => {
          this.categoryData.push(element)
          this.dishData.push(element.dishes)
        }) 
      })
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
.add-new-dish input[type="text"] {
  height: 32px;
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
    background-size: 20px;
    display: none;
  }

  .complete{
    background: #41c0c2 url('../assets/images/complete.png') no-repeat center center;
    background-size: 12px;
    position: absolute!important;
    top: 23px;
    left: 1px;
    height: 20%!important;
  }

  .close{
    background: #f47264 url('../assets/images/close.png') no-repeat center center;
    background-size: 12px;
    position: absolute!important;
    top: 23px;
    left: 69px;
    height: 20%!important;
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
