<template>
  <div class="component-wrapper">
    <div class="popup-hide" :class="{popup: active}" id="popup">
      <div class="close-button" @click="hidePopup"></div>
      <form action class="form-category">
        <input type="text" placeholder="Назва столику" required v-model="bufferTable.tableName"/>
        <input type="text" placeholder="Кількість місць" required v-model="bufferTable.sitsNumber"/>
        <select v-model="bufferTable.tableStatus">
          <option>Вільний</option>
          <option>Заброньований</option>
          <option>Зайнятий</option>
        </select>
        <input type="text" placeholder="Заброньований час" v-model="bufferTable.reservedTime"/>
        <input type="text" placeholder="Кількість гостей" v-model="bufferTable.guestsCount"/>
        <select v-model="bufferTable.waiter">
          <option>-</option>
          <option v-for="(item,index) in waiters" :key="index" >{{item.name + " " + item.surname}}</option>
        </select>
        <input type="submit" value="Створити" @click="handleSubmit" />
      </form>
      <div class="popup-bg" @click="hidePopup"></div>
    </div>
    <div class="popup-hide" :class="{popup: active2}" id="popup2">
      <div class="close-button" @click="hidePopup2"></div>
      <form action class="form-category">
        <input type="text" placeholder="Назва столику" required v-model="updatedTable.tableName"/>
        <input type="text" placeholder="Кількість місць" required v-model="updatedTable.sitsNumber"/>
        <select v-model="updatedTable.tableStatus">
          <option>Вільний</option>
          <option>Заброньований</option>
          <option>Зайнятий</option>
        </select>
        <input type="text" placeholder="Заброньований час" v-model="updatedTable.reservedTime"/>
        <input type="text" placeholder="Кількість гостей" v-model="updatedTable.guestsCount"/>
        <select v-model="updatedTable.waiter">
          <option>-</option>
          <option v-for="(item,index) in waiters" :key="index" >{{item.name + " " + item.surname}}</option>
        </select>
        <input type="submit" value="Оновити" @click.prevent="handleSubmit2(updatedTable._id)" />
      </form>
      <div class="popup-bg" @click="hidePopup2"></div>
    </div>
    <div class="header-panel">
      <h1 class="header-text">Інформація про столики</h1>
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
          <p>
            Кількість
            <br />місць
          </p>
        </div>
        <div class="third-colon">
          <p>Статус</p>
        </div>
        <div class="fourth-colon">
          <p>
            Заброньований
            <br />час
          </p>
        </div>
        <div class="fifth-colon">
          <p>
            Кількість
            <br />гостей
          </p>
        </div>
        <div class="sixth-colon">
          <p>Офіціант</p>
        </div>
        <div class="seventh-colon"></div>
      </div>
      <div
        class="table-record"
        :class="statusClass[index]"
        v-for="(table, index) in tablesData"
        :key="index"
      >
        <div class="first-colon border">
          <p>{{table.tableName}}</p>
        </div>
        <div class="second-colon border">
          <p>{{table.sitsNumber}}</p>
        </div>
        <div class="third-colon border">
          <p>{{table.tableStatus}}</p>
        </div>
        <div class="fourth-colon border">
          <p>{{table.reservedTime}}</p>
        </div>
        <div class="fifth-colon border">
          <p>{{table.guestsCount}}</p>
        </div>
        <div class="sixth-colon border">
          <p>{{table.waiter}}</p>
        </div>
        <div class="seventh-colon">
          <div class="btn edit" @click="showPopup2(table)"></div>
          <div class="btn delete" @click="deleteTable(table._id)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tables-component",
  data() {
    return {
      usersData: [],
      waiters: [],
      tablesData: [],
      statusClass: [],
      bufferTable: {
        tableName: "",
        sitsNumber: "",
        tableStatus: "",
        reservedTime: "",
        guestsCount: "",
        waiter: ""
      },
      active: false,
      active2: false,
      editTable: {}
    };
  },
  components: {},
  computed: {
    updatedTable(){
      return this.bufferTable;
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.statusClass = [];
      this.axios.post('http://localhost:3000/api/addTable', this.bufferTable)
      .then(response => {
          this.axios.get("http://localhost:3000/api/tables/").then(res => {
            this.tablesData = res.data;
            this.tablesData.forEach((elem, index) => {
              if (elem.tableStatus == "Вільний") {
                this.statusClass.push("free");
              } else if (elem.tableStatus == "Зайнятий") {
                this.statusClass.push("progress");
              } else if (elem.tableStatus == "Заброньований") {
                this.statusClass.push("reserved");
              }
            });
            this.$store.dispatch("loadUsersData").then(response => {
              this.usersData = this.$store.getters.getUsersData;
              this.waiters = [];
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
                this.hidePopup()
              });
            });
          });
        });
    },
    handleSubmit2(e) {
      this.statusClass = [];
      this.axios.patch('http://localhost:3000/api/editTable/' + this.updatedTable._id, this.updatedTable)
      .then(response => {
          this.axios.get("http://localhost:3000/api/tables/").then(res => {
            this.tablesData = res.data;
            this.tablesData.forEach((elem, index) => {
              if (elem.tableStatus == "Вільний") {
                this.statusClass.push("free");
              } else if (elem.tableStatus == "Зайнятий") {
                this.statusClass.push("progress");
              } else if (elem.tableStatus == "Заброньований") {
                this.statusClass.push("reserved");
              }
            });
            this.$store.dispatch("loadUsersData").then(response => {
              this.usersData = this.$store.getters.getUsersData;
              this.waiters = [];
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
                this.hidePopup2()
              });
            });
          });
        });
    },
    showPopup(){
      this.active = !this.active
    },
    hidePopup(){
      this.active = false
    },
    showPopup2(table){
      this.active2 = !this.active2;
      this.bufferTable._id = table._id;
      this.bufferTable.tableName = table.tableName;
      this.bufferTable.sitsNumber = table.sitsNumber;
      this.bufferTable.tableStatus = table.tableStatus;
      this.bufferTable.reservedTime = table.reservedTime;
      this.bufferTable.guestsCount = table.guestsCount;
      this.bufferTable.waiter = table.waiter;
    },
    hidePopup2(){
      this.active2 = false;
      this.editTable._id = {};
    },
    deleteTable(tableId) {
      this.statusClass = [];
      this.axios
        .delete("http://localhost:3000/api/deleteTable/" + tableId)
        .then(response => {
          this.axios.get("http://localhost:3000/api/tables/").then(res => {
            this.tablesData = res.data;
            this.tablesData.forEach((elem, index) => {
              if (elem.tableStatus == "Вільний") {
                this.statusClass.push("free");
              } else if (elem.tableStatus == "Зайнятий") {
                this.statusClass.push("progress");
              } else if (elem.tableStatus == "Заброньований") {
                this.statusClass.push("reserved");
              }
            });
            this.$store.dispatch("loadUsersData").then(response => {
              this.usersData = this.$store.getters.getUsersData;
              this.waiters = [];
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
            });
          });
        });
    }
  },
  created: function() {
    this.axios.get("http://localhost:3000/api/tables/").then(res => {
      this.tablesData = res.data;
      this.tablesData.forEach((elem, index) => {
        if (elem.tableStatus == "Вільний") {
          this.statusClass.push("free");
        } else if (elem.tableStatus == "Зайнятий") {
          this.statusClass.push("progress");
        } else if (elem.tableStatus == "Заброньований") {
          this.statusClass.push("reserved");
        }
      });
      this.$store.dispatch("loadUsersData").then(response => {
        this.usersData = this.$store.getters.getUsersData;
        this.waiters = [];
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
  width: 80px;
  height: 100%;
  min-height: 30px;
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

.add {
  background: #42bab0 url("../assets/images/add.png") no-repeat center center;
  background-size: 20px;
}

.edit {
  background: #68c2da url("../assets/images/edit.png") no-repeat center center;
  background-size: 20px;
  margin-right: 10px;
  width: 65px;
}

.delete {
  background: #ed535d url("../assets/images/delete.png") no-repeat center center;
  background-size: 20px;
  width: 65px;
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

.table-record {
  display: grid;
  grid-template-columns: 100px repeat(6, 1fr);
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

.seventh-colon {
  display: flex;
}
.free {
  background-color: #94e593 !important;
}
.progress {
  background-color: #e27476 !important;
}
.reserved {
  background-color: #f1cea5 !important;
}

.popup-hide{
  display: none;
}
.popup{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup-bg{
   position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: rgba(0,0,0,0.7);
    z-index: 1;
}
.popup .close-button{
  position: absolute;
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background: url('../assets/images/closeButton.png')no-repeat center/contain;
    z-index: 2;
}
.popup .form-category{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #2b3042;
  box-shadow: 0 0 20px 0 #000;
  width: 300px;
  height: 400px;
  z-index: 2;
}
.popup .form-category input[type="text"]{
  height: 40px;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

.popup .form-category select{
  height: 40px;
  width: 243px;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

.popup .form-category input[type="submit"]{
    background-color: #4CAF50;
    border: none;
    font-size: 20px;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
}
.popup [type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
  margin: 10px 0;
}

.popup [type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
	font-family: 'Poppins', sans-serif;
	font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}
 .popup [type="file"] + label :hover {
    background-color: darken(#f15d22, 10%);
  }
  
  .popup [type="file"] + label .btn-1 {
    background-color: #f79159;
    box-shadow: 0 6px darken(#f79159, 10%);
    transition: none;
  }
   .popup [type="file"] + label .btn-1:hover {
      box-shadow: 0 4px darken(#f79159, 10%);
      top: 2px;
}
</style>