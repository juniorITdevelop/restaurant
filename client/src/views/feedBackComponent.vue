<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Відгуки</h1>
      <div class="control-buttons">
        <div class="btn add" @click="showPopup"></div>
      </div>
    </div>
    <div class="work-area">
      <div class="header-table">
        <div>Офіціант</div>
        <div>Оцінки</div>
        <div>Коментар</div>
        <div class="flex-star date">Дата</div>
      </div>
      <div class="table-estimation" v-for="(feedback, index) in feedbackData" :key="index">
        <div class="delete-block active">
          <div class="btn delete" @click="deleteComment(feedback._id)"></div>
        </div>
        <div class="name-waiter">{{feedback.waiterName}}</div>
        <div class="quality-block">
          <div class="text-quality">Оцінка обслуговування:</div>
          <div class="estimation-quality">
            <div class="deactive-star"></div>
            <div class="active-star" :style="{'width': `${20*feedback.serviceQuality+'px'}`}"></div>
          </div>
          <div class="text-quality">Оцінка атмосфери закладу:</div>
          <div class="estimation-quality">
            <div class="deactive-star"></div>
            <div class="active-star" :style="{'width': `${20*feedback.interier+'px'}`}"></div>
          </div>
          <div class="text-quality">Оцінка їжі:</div>
          <div class="estimation-quality">
            <div class="deactive-star"></div>
            <div class="active-star" :style="{'width': `${20*feedback.foodQuality+'px'}`}"></div>
          </div>
        </div>
        <div class="comment-quality">{{feedback.comment}}</div>
        <div class="comment-quality flex-star">{{sortData(feedback)}}</div>
      </div>
    </div>
    <div class="add-comments" :class="{activePopup: formActive}">
      <div class="close-button" @click="hidePopup"></div>

      <form action class="form-category">
        <p>Ім'я офіціанта</p>
        <select v-model="waiterName">
          <option value disabled>Виберіть Ім'я</option>
          <option v-for="(name,index) in waiters" :key="index">{{name}}</option>
        </select>
        <p>Оцінка обслуговування</p>
        <div class="estimation-servis estimation-block">
          <div class="deactive-star"></div>
          <div class="active-star" :style="{'width': `${30*serviceQuality+'px'}`}"></div>
          <div class="star" @click="activeServiceQuality(1)"></div>
          <div class="star" @click="activeServiceQuality(2)"></div>
          <div class="star" @click="activeServiceQuality(3)"></div>
          <div class="star" @click="activeServiceQuality(4)"></div>
          <div class="star" @click="activeServiceQuality(5)"></div>
        </div>
        <p>Оцінка атмосфери закладу</p>
        <div class="estimation-interer estimation-block">
          <div class="deactive-star"></div>
          <div class="active-star" :style="{'width': `${30*interier+'px'}`}"></div>
          <div class="star" @click="activeinterier(1)"></div>
          <div class="star" @click="activeinterier(2)"></div>
          <div class="star" @click="activeinterier(3)"></div>
          <div class="star" @click="activeinterier(4)"></div>
          <div class="star" @click="activeinterier(5)"></div>
        </div>
        <p>Оцінка їжі</p>
        <div class="estimation-food estimation-block">
          <div class="deactive-star"></div>
          <div class="active-star" :style="{'width': `${30*foodQuality+'px'}`}"></div>
          <div class="star" @click="activefoodQuality(1)"></div>
          <div class="star" @click="activefoodQuality(2)"></div>
          <div class="star" @click="activefoodQuality(3)"></div>
          <div class="star" @click="activefoodQuality(4)"></div>
          <div class="star" @click="activefoodQuality(5)"></div>
        </div>
        <textarea class="text-area1" type="text" placeholder="Коментар" v-model="comment"></textarea>
        <input type="submit" value="Додати" @click="handleSubmit" />
      </form>
      <div class="popup" @click="hidePopup"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedback-component",
  data() {
    return {
      formActive: false,
      feedbackData: [],
      waiterName: "",
      serviceQuality: "",
      interier: "",
      foodQuality: "",
      comment: "",
      waiters: [],
      activeDel: false,
      statisticsData: {}
    };
  },
  components: {},
  computed: {},
  methods: {
    showPopup() {
      this.formActive = !this.formActive;
    },
    activeDeleteBlock() {
      this.activeDel = !this.activeDel;
    },
    hidePopup() {
      this.formActive = false;
    },
    activeServiceQuality(value) {
      this.serviceQuality = value;
    },
    activeinterier(value) {
      this.interier = value;
    },
    activefoodQuality(value) {
      this.foodQuality = value;
    },
    deleteComment() {},
    sortData(timeData) {
      let str = JSON.stringify(timeData);

      let dat = JSON.parse(str, function(key, value) {
        if (key == "creationTime") return new Date(value);
        return value;
      });
      let day = dat.creationTime.getDate();
      if (day < 10) day = "0" + day;
      let minutes = dat.creationTime.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;
      return (
        dat.creationTime.getHours() +
        ":" +
        minutes +
        " / " +
        day +
        "." +
        `${dat.creationTime.getMonth() + 1}` +
        "." +
        dat.creationTime.getFullYear()
      );
    },
    handleSubmit(e) {
      e.preventDefault();
      let formData = {
        waiterName: this.waiterName,
        serviceQuality: this.serviceQuality,
        interier: this.interier,
        foodQuality: this.foodQuality,
        comment: this.comment
      };
      this.axios
        .post("http://localhost:3000/api/addFeedback", formData)
        .then(response => {
           let user = JSON.parse(sessionStorage.getItem('currLoginUserData'))

          this.$store.dispatch('loadCurrentUserData', user.userId)
            .then(res=>{
                  let obj = {
                        user: `${res.data.name + ' ' + res.data.surname}`,
                        postId: res.data.postId,
                        postName: res.data.postName,
                        action: "Додано новий відгук"
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
            })
          this.$store.dispatch("loadFeedback")
          .then(res => {
            this.feedbackData = this.$store.getters.getFeedback;
            this.$store.dispatch("loadStatistics")
            .then(r => {
              this.statisticsData = this.$store.getters.getStatistics;
              this.statisticsData.feedback = JSON.stringify(this.feedbackData);
              this.statisticsData.orders = JSON.stringify(
                this.statisticsData.orders
              );
              this.statisticsData.purchases = JSON.stringify(
                this.statisticsData.purchases
              );
              this.axios
                .patch(
                  "http://localhost:3000/api/editStatistics/" +
                    this.statisticsData._id,
                  this.statisticsData
                )
                .then(response => {
                  this.$router.go();
                });
            });
          });
          this.hidePopup()
        });
    },
    deleteComment(commentId) {
      let quation = confirm("Ви впевнені, що хочете видалити коментар?");
      if (quation == true) {
        this.axios
          .delete("http://localhost:3000/api/deleteFeedback/" + commentId)
          .then(response => {
            this.$store.dispatch("loadFeedback").then(res => {
              this.feedbackData = this.$store.getters.getFeedback;
              this.$store.dispatch("loadStatistics").then(r => {
                this.statisticsData = this.$store.getters.getStatistics;
                this.statisticsData.feedback = JSON.stringify(
                  this.feedbackData
                );
                this.statisticsData.orders = JSON.stringify(
                  this.statisticsData.orders
                );
                this.statisticsData.purchases = JSON.stringify(
                  this.statisticsData.purchases
                );
                console.dir(this.statisticsData);
                this.axios
                  .patch(
                    "http://localhost:3000/api/editStatistics/" +
                      this.statisticsData._id,
                    this.statisticsData
                  )
                  .then(response => {
                    
                    this.$router.go();
                  });
              });
            });
          });
      } else {
        return;
      }
    }
  },
  created: function() {
    this.$store.dispatch("loadUsersData").then(response => {
      this.usersData = this.$store.getters.getUsersData;
      this.usersData.forEach((element, index) => {
        if (element.postId == "p004") {
          this.waiters.push(element.name + ' ' + element.surname);
        }
      });
    });
    this.$store.dispatch("loadFeedback").then(response => {
      this.feedbackData = this.$store.getters.getFeedback;
    });
  }
};
</script>

<style scoped>
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

.add-comments {
  display: none;
}
.add-comments.activePopup {
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
  background: rgba(0, 0, 0, 0.7);
}
.table-estimation,
.header-table {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 2fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  padding: 10px;
  font-family: Roboto;
  color: #2b3042;
  font-weight: 200;
}
.table-estimation {
  border-bottom: 1px solid rgb(173, 192, 211);
}
.header-table {
  border-bottom: 2px solid #42bab0;
  padding: 10px;
  font-size: 25px;
  font-weight: 600;
  font-family: Roboto;
  justify-items: center;
}
.flex-star {
  justify-self: flex-start;
}
.flex-star.date {
  padding-left: 40px;
}
.table-estimation .quality-block {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-items: flex-end;
}
.name-waiter {
  font-size: 22px;
  font-weight: 600;
}
.table-estimation .estimation-quality {
  position: relative;
  width: 100px;
  height: 20px;
}
.table-estimation .estimation-quality .deactive-star {
  position: absolute;
  width: 100%;
  height: 20px;
  background: url("../assets/images/deactive-star.png") repeat-x;
  background-size: 20px 20px;
}
.table-estimation .estimation-quality .active-star {
  position: absolute;
  width: 0;
  height: 20px;
  background: url("../assets/images/active-star.png") repeat-x;
  background-size: 20px 20px;
}

.estimation-block {
  position: relative;
  display: flex;
  justify-self: center;
  width: 150px;
  height: 30px;
}
.text-quality {
  justify-self: flex-start;
  font-weight: 600;
}
.delete-block {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.delete-block:hover {
  background: rgba(0, 0, 0, 0.1);
}
.delete-block:hover > .delete {
  display: block;
}
.btn.delete {
  display: none;
  position: absolute;
  right: 20px;
  width: 80px;
  height: 35px;
  background: #ed535d url("../assets/images/delete.png") no-repeat center center;
  background-size: 20px;
}
.star {
  width: 30px;
  height: 30px;
  z-index: 10;
}

.deactive-star {
  position: absolute;
  width: 100%;
  height: 30px;
  background: url("../assets/images/deactive-star.png") repeat-x;
  background-size: 30px 30px;
}
.active-star {
  position: absolute;
  width: 0;
  height: 30px;
  background: url("../assets/images/active-star.png") repeat-x;
  background-size: 30px 30px;
}

.form-category {
  position: absolute;
  display: grid;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #2b3042;
  box-shadow: 17px 1px 30px 15px #270202;
  width: 30%;
  padding: 30px 10px;
  z-index: 10;
  font-size: 20px;
  font-weight: 600;
  font-family: Roboto;
  color: #fff;
  text-align: center;
}
.form-category p {
  padding: 10px 0;
  margin: 0;
}
.form-category input[type="text"],
.form-category textarea {
  min-width: 300px;
  height: 30px;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
  margin: 10px 0;
  border-radius: 5px;
  padding: 5px;
}
.form-category .text-area1 {
  height: 60px;
}
.form-category .text-area2 {
  height: 80px;
}
.form-category input[type="submit"] {
  background-color: #4caf50;
  border: none;
  font-size: 20px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
}
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
  margin: 10px 0;
}

[type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}
[type="file"] + label :hover {
  background-color: darken(#f15d22, 10%);
}

[type="file"] + label .btn-1 {
  background-color: #f79159;
  box-shadow: 0 6px darken(#f79159, 10%);
  transition: none;
}
[type="file"] + label .btn-1:hover {
  box-shadow: 0 4px darken(#f79159, 10%);
  top: 2px;
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
  width: 80px;
  height: 100%;
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
}

.delete {
  background: #ed535d url("../assets/images/delete.png") no-repeat center center;
  background-size: 20px;
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