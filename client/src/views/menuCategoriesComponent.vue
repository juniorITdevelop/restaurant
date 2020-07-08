<template>
  <div class="component-wrapper">
            <div class="popup-hide" :class="{popup: active}" id='popup'>
            <div class="close-button" @click="hidePopup"></div>
              <form action="" class="form-category">
                <input type="text" placeholder="Ім'я категорії" v-model="categoryName">
                <input type="file" id="file"  @change="processFile" >     
                <label for="file" class="btn-1">Вибрати картинку</label>
                <input type="submit" value="Створити" @click="handleSubmit">
              </form>
              <div class="popup-bg" @click="hidePopup" ></div>  
            </div>

    <div class="header-panel">
      <h1 class="header-text">Меню: <span>категорії страв</span></h1>
      <div class="control-buttons">
        <div class="btn add" @click="showPopup"></div>
      </div>
    </div>
    <div class="work-area" :style="{'grid-template-rows': 'repeat(' + rowsGrid + ',300px'+')'}" >
      <div class="catgory-menu" @click="goToDishes(category._id)" v-for="(category, index) in menuCategories" :key="index">
          <div class="img-category" :style="{ 'background': 'url(http://localhost:3000/' + category.categoryImage +')no-repeat center/cover' }">
            <div class="name-category">{{category.categoryName}}</div>
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
    menuCategories:[],
    categoryName: '',
    categoryImage: '',
    length: '',
    active: false
    };
  },
  components: {

  },
  methods:{
    goToDishes(categoryId){
      this.$router.push('/' + categoryId + '/dishes'); 
    },
    showPopup(){
      this.active = !this.active
    },
    hidePopup(){
      this.active = false
    },
      processFile(event) {
      this.categoryImage = event.target.files[0];
    },
    handleSubmit(e) {
      e.preventDefault();
      var formData = new FormData();
      formData.append('categoryName', this.categoryName);
      formData.append('categoryImage', this.categoryImage);
      this.axios.post('http://localhost:3000/api/addCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        this.$store.dispatch('loadMenuCategories')
        .then((response) => {
          let user = JSON.parse(sessionStorage.getItem('currLoginUserData'))

          this.$store.dispatch('loadCurrentUserData', user.userId)
            .then(res=>{
                  let obj = {
                        user: `${res.data.name + ' ' + res.data.surname}`,
                        postId: res.data.postId,
                        postName: res.data.postName,
                        action: "Додано категорію страв: " + this.categoryName
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                    this.$router.go()
                    this.hidePopup()
                })
            })
        
        })
      })
    }
  },
  computed:{
    rowsGrid(){
      this.length = Math.ceil(this.menuCategories.length/3)
      return this.length
    }
  },
  created(){
     this.$store.dispatch('loadMenuCategories')
    .then((response) => {
      this.menuCategories = this.$store.getters.getMenuCategories;
      this.menuCategories.forEach((element, index) => {
        if(element.categoryImage.split("//").length < 2){
          this.menuCategories[index].categoryImage = element.categoryImage.split("\\").join('/');
        } else {
          this.menuCategories[index].categoryImage = element.categoryImage.split("//").join('/');
        }
      });
    })
  }
}
</script>

<style scoped>
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
    width: 80px;
    height: 100%;
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
  

  .add{
    background: #41c0c2 url('../assets/images/add.png') no-repeat center center;
    background-size: 20px;
  }

  .work-area{
    width: calc(100% - 40px);
    height: calc(100% - 90px);;
    position: absolute;
    top: 81px;
    left: 30px;
    background-color: #fafafa;
    padding: 20px 20px;
    box-sizing: border-box;
     display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    overflow-y: scroll;
  }
  .catgory-menu{
        position: relative;
  }
   .work-area .catgory-menu:hover{
     opacity: 0.7;
   }
  .catgory-menu .img-category{
    width: 100%;
    height: 100%;
  }
  .catgory-menu .name-category{
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.5);
    font-size: 20px;
    color: #fff;
    font-family: "Roboto";
    font-weight: 600;
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
