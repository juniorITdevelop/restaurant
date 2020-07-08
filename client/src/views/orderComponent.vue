<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Замовлення</h1>
      <div class="control-buttons">
        <div class="btn add" @click="showPopup"></div>
      </div>
    </div>
    <div class="work-area">
      <div class="table-header">
        <div class="first-colon">
          <p>Столик</p>
        </div>
        <div class="second-colon">
          <p>Офіціант</p>
        </div>
        <div class="third-colon">
          <p>
            Номер
            <br />замовлення
          </p>
        </div>
        <div class="fourth-colon">
          <p>
            Статус
            <br />замовлення
          </p>
        </div>
        <div class="fifth-colon">
          <p>
            Тип
            <br />подачі
          </p>
        </div>
        <div class="sixth-colon">
          <p>
            Загальна
            <br />вартість (грн.)
          </p>
        </div>
        <div class="seventh-colon"></div>
      </div>
      <div class="table-record" v-for="(order, index) in orders" :key="index" @click="goToInfo(order._id)">
        <div class="first-colon border">
          <p>{{order.tableName}}</p>
        </div>
        <div class="second-colon border">
          <p>{{order.waiter}}</p>
        </div>
        <div class="third-colon border">
          <p>{{order.orderNumber}}</p>
        </div>
        <div class="fourth-colon border">
          <p>{{order.orderStatus}}</p>
        </div>
        <div class="fifth-colon border">
          <p>{{order.deliveryType}}</p>
        </div>
        <div class="sixth-colon border">
          <p>{{order.totalCost}}</p>
        </div>
        <div class="seventh-colon">
          <div class="btn complete" @click.stop="completeOrder(order._id, index)"></div>
          <div class="btn delete" @click.stop="deleteOrder(order._id)"></div>
        </div>
      </div>
    </div>
    <div class="add-order" :class="{activePopup: formActive}">
      <form class="form-order">
        <select v-model="newOrder.tableName">
          <option value="" disabled>Оберіть столик</option>
          <option v-for="(item,index) in tables" :key="index">{{item.tableName}}</option>
        </select>
        <select v-model="newOrder.waiter">
          <option value="" disabled>Офіціант</option>
          <option v-for="(item,index) in waiters" :key="index">{{item.name + ' ' + item.surname}}</option>
        </select>
        <select v-model="newOrder.deliveryType">
          <option value="" disabled>Тип доставки</option>
          <option>В один час</option>
          <option>По готовності</option>
        </select>
        <input type="text" placeholder="Кількість гостей" v-model="newOrder.guestsCount" />
        <input type="text" placeholder="Додаткова інформація" v-model="newOrder.additionalInfo" />
        <div v-for="(item,index) in newOrder.dishes" :key="index" class="dish-record">
          <select v-model="newOrder.dishes[index].categoryName" @change="updateDishCategory(index ,$event.target.selectedIndex)">
            <option v-for="(item,index) in menu" :key="index">{{item.categoryName}}</option>
          </select>
          <select v-if='menu[categoriesIndexes[index]].dishes' v-model="newOrder.dishes[index].dishName">
            <option v-for="(item,index) in menu[categoriesIndexes[index]].dishes" :key="index">{{item.dishName}}</option>
          </select>
          <input type="text" placeholder="Кількість порцій" v-model="newOrder.dishes[index].count" />
           <div class="btn delete" @click="deleteOrderDish(index)" style="margin-left: 10px; padding: 0 20px;"></div>
        </div>
        <div class="btn add" @click="addOrderDish"></div>
        <input type="submit" value="Замовити" @click="handleSubmit"/>
      </form>
      <div class="close-button" @click="hidePopup"></div>
      <div class="popup" @click="hidePopup"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableStatus: '',
      orders: [],
      waiters: [],
      menu: [],
      tables: [],
      categoriesIndexes: [],
      formActive: false,
      statisticsData: {},
      numberOrder:'',
      newOrder: {
        tableName: "",
        guestsCount: "",
        additionalInfo: "",
        creationTime: "",
        waiter: "",
        sessionTime: "",
        orderNumber: "",
        orderStatus: "Створено",
        deliveryType: "",
        totalCost: "",
        dishes: []
      },
      categoriesIndexes: []
    };
  },
  methods: {
    completeOrder(orderId, index){
      if(this.orders[index].orderStatus != "Роботу завершено"){
        alert("У замовленні є страви в прогресі! Дочекайтесь закінчення приготувння страви, або видаліть її із замовлення");
      } else {
        this.$store.dispatch("loadStatistics").then(r => {
          this.statisticsData = this.$store.getters.getStatistics;
          this.statisticsData.feedback = JSON.stringify(this.statisticsData.feedback);
          this.statisticsData.purchases = JSON.stringify(this.statisticsData.purchases);
          this.orders[index].orderStatus = "Замовлення закрито";
          this.statisticsData.orders.unshift(this.orders[index]);
          this.statisticsData.orders = JSON.stringify(this.statisticsData.orders);
          var tableIndex = this.tables.findIndex(el => el.tableName == this.orders[index].tableName);
          this.tables[tableIndex].tableStatus = 'Вільний';
          this.axios.patch('http://localhost:3000/api/editTable/' + this.tables[tableIndex]._id, this.tables[tableIndex])
          .then(response => {
            this.axios.patch("http://localhost:3000/api/editStatistics/" +this.statisticsData._id, this.statisticsData)
            .then(response => {
              this.axios.delete("http://localhost:3000/api/deleteOrder/" + orderId)
              .then(response => {
                this.$store.dispatch("loadOrders").then(() => {
                  this.$router.go();
                });
              });
            });
          });
        });
      }  
    },
    addOrderDish(){
      this.newOrder.dishes.push({
        dishName: "",
        categoryName: "",
        cost: "",
        specialOffer: "",
        cookingTime: "",
        cookingStatus: "У черзі",
        count: ""
      });
      this.categoriesIndexes.push(0);
    },
    updateDishCategory(recordIndex, categoryIndex){
      this.categoriesIndexes[recordIndex] = categoryIndex;
    },
    deleteOrderDish(index){
      this.newOrder.dishes.splice(index, 1);
      this.categoriesIndexes.splice(index, 1);
    },
    goToInfo(orderId){
      this.$router.push({path: '/orderInfo/'+ orderId});
    },
    showPopup() {
      this.formActive = !this.formActive;
    },
    hidePopup() {
      this.formActive = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.newOrder.totalCost = 0;
      this.newOrder.creationTime = new Date();
      this.newOrder.orderNumber = new Date().getTime(),
      this.newOrder.orderStatus = "Створено",
      this.newOrder.dishes.forEach((element, index) => {
        let categoryIndex;
        this.menu.forEach((elem, ind) => {
          if(elem.categoryName == element.categoryName){
            categoryIndex = ind;
          }
        });
        let dishIndex;
        this.menu[categoryIndex].dishes.forEach((elem, ind) => {
          if(elem.dishName == element.dishName){
            dishIndex = ind;
          }
        });
        this.newOrder.dishes[index].cost = this.menu[categoryIndex].dishes[dishIndex].cost;
        this.newOrder.dishes[index].specialOffer = this.menu[categoryIndex].dishes[dishIndex].specialOffer;
        this.newOrder.dishes[index].cookingTime = this.menu[categoryIndex].dishes[dishIndex].cookingTime;
      })
      this.newOrder.dishes.forEach((element, index) => {
        let cst = element.cost * element.count;
        if(element.specialOffer){
          this.newOrder.totalCost += cst - (cst * (element.specialOffer / 100));
        } else {
          this.newOrder.totalCost += cst;
        }
      })
      let stringedDishes = JSON.stringify(this.newOrder.dishes);
      this.newOrder.dishes = stringedDishes;
      this.axios.post("http://localhost:3000/api/addOrder", this.newOrder)
        .then(response => {
          var tableIndex = this.tables.findIndex(el => el.tableName == this.newOrder.tableName);
          this.tables[tableIndex].tableStatus = 'Зайнятий';
          this.axios.patch('http://localhost:3000/api/editTable/' + this.tables[tableIndex]._id, this.tables[tableIndex])
          .then(response => {
            this.newOrder = {
              tableName: "",
              guestsCount: "",
              additionalInfo: "",
              creationTime: "",
              waiter: "",
              sessionTime: "",
              orderNumber: "",
              orderStatus: "Створено",
              deliveryType: "",
              totalCost: "",
              dishes: []
            };
            this.categoriesIndexes = [];
            this.$store.dispatch("loadOrders")
            .then(response => {
              let user = JSON.parse(sessionStorage.getItem('currLoginUserData'))

          this.$store.dispatch('loadCurrentUserData', user.userId)
           .then(res=>{
                  let obj = {
                        user: `${res.data.name + ' ' + res.data.surname}`,
                        postId: res.data.postId,
                        postName: res.data.postName,
                        action: 'Створено замовлення: ' + this.numberOrder
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                   this.$router.go()
                })
              })
            });
          });
            
        });
    },
    deleteOrder(orderId) {
      let quation = confirm("Ви впевнені, що хочете видалити замовлення?");
      if (quation == true) {
        this.axios
          .delete("http://localhost:3000/api/deleteOrder/" + orderId)
          .then(response => {
            this.$store.dispatch("loadOrders").then(() => {
              this.$router.go();
            });
          });
      } else {
        return;
      }
    }
  },
  created: function() {
    this.$store.dispatch("loadOrders").then(response => {
      this.orders = this.$store.getters.getOrders;
      this.orders.forEach(el => {
        this.numberOrder = el.orderNumber
      })

      this.$store.dispatch("loadMenuCategories").then(res => {
        this.menu = this.$store.getters.getMenuCategories;
        this.menu.forEach((element, index) => {

          if (element.categoryImage.split("//").length < 2) {
            this.menu[index].categoryImage = element.categoryImage
              .split("\\")
              .join("/");
          } else {
            this.menu[index].categoryImage = element.categoryImage
              .split("//")
              .join("/");
          }
        });
        this.$store.dispatch("loadUsersData").then(response => {
          this.usersData = this.$store.getters.getUsersData;
          this.usersData.forEach((element, index) => {
            if (element.avatarImage.split("//").length < 2) {
              this.usersData[index].avatarImage = element.avatarImage
                .split("\\")
                .join("/");
            } else {
              this.usersData[index].avatarImage = element.avatarImage
                .split("//")
                .join("/");
            }
            if (element.postId == "p004") {
              this.waiters.push(element);
            }
          });
          this.axios.get("http://localhost:3000/api/tables/").then(res => {
            this.tables = res.data;
          });
        });
      });
    });
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
  width: 55px;
  height: 100%;
  min-height: 25px;
}
.add {
  background: #42bab0 url("../assets/images/add.png") no-repeat center center;
  background-size: 20px;
  width: 80px;
}
.complete {
  background: #42bab0 url("../assets/images/complete.png") no-repeat center center;
  background-size: 16px;
}
.edit {
  background: #68c2da url("../assets/images/edit.png") no-repeat center center;
  background-size: 16px;
}
.delete {
  background: #ed535d url("../assets/images/delete.png") no-repeat center center;
  background-size: 16px;
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
  flex-direction: column;
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
.work-area .border:nth-child(odd),
.work-area .border:nth-child(even) {
  border-left: 2px solid #edf2f6;
}
.work-area .border:nth-child(1) {
  border: none;
}
.work-area .border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px 0;
}
.table-record {
  display: grid;
  grid-template-columns: 100px repeat(6, 1fr);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  padding: 5px 0;
  font-family: "Roboto";
  font-weight: 200;
  height: 30px;
  font-size: 15px;
  border-bottom: 2px solid #edf2f6;
  height: auto;;
}
.table-record:hover {
  background-color: #edf2f6;
}
.table-header {
  display: grid;
  grid-template-columns: 100px repeat(6, 1fr);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  font-family: "Roboto";
  text-align: center;
  width: (100% - 20px);
  height: auto;
  padding: 5px 10px;
  border-bottom: 2px solid #000000;
}
.table-record:hover .seventh-colon {
  display: flex;
  height: 95%;
}
.table-record:hover .seventh-colon .btn {
  display: block;
}
.seventh-colon > .btn {
  display: none;
  margin-right: 5px;
}
.add-order {
  display: none;
}
.add-order.activePopup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.popup {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
}
.form-order {
  position: absolute;
  display: grid;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #2b3042;
  box-shadow: 17px 1px 30px 15px #270202;
  width: 70%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 30px 10px;
  z-index: 10;
  font-size: 20px;
  font-weight: 600;
  font-family: Roboto;
  color: #fff;
  text-align: center;
}
.close-button {
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: url("../assets/images/closeButton.png") no-repeat center/contain;
  z-index: 40;
}
.form-order::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: #2b3042;
}
.form-order::-webkit-scrollbar {
  width: 8px;
  background-color: #2b3042;
}
.form-order::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #474f70;
}
.form-order input[type="submit"] {
  background-color: #4caf50;
  border: none;
  font-size: 20px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}
.form-order input[type="text"]{
  min-width: 600px;
  height: 30px;
  font-size: 20px;
  color: #2b3042;
  text-align: left;
  border: none;
  outline: none;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px;
}
.form-order > select{
    margin-bottom: 20px;
}
select{
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  width: 100%;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
}
.dish-record{
  display: flex;
  justify-content: center;
  align-items: center;
}
.dish-record input{
  min-width: 150px!important;
}

</style>