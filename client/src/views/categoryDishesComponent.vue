<template>
    <div class="component-wrapper">
          
          <div class="popup-hide" :class="{popup: active}" id='popup'>
            <div class="close-button" @click="hidePopup"></div>
              <form action="" class="form-category">
                <input type="text" placeholder="Ім'я страви" v-model="dishName">
                <input type="text" placeholder="Ціна" v-model="cost">
                <input type="text" placeholder="Вага" v-model="weight">
                <input type="text" placeholder="Час приготування" v-model="cookingTime">
                <textarea class="text-area1" type="text" placeholder="Описання" v-model="description"></textarea>
                <textarea class="text-area2" type="text" placeholder="Рецепт" v-model="recipe"></textarea>
                <input type="text" placeholder="Акція" v-model="specialOffer">
                <input type="file" id="file"  @change="processFile" >     
                <label for="file" class="btn-1">Вибрати картинку</label>
                <input type="submit" value="Створити" @click="handleSubmit">
              </form>
              <div class="popup-bg" @click="hidePopup" ></div>  
          </div>

           
          <div class="popup-hide" :class="{popup1: active2}" id='popup1'>
            <div class="close-button" @click="hidePopupEdit"></div>
              <form action="" class="form-category">
                <input type="text" placeholder="Ім'я категорії" v-if="nameCategory" v-model="nameCategory.categoryName">
                <input type="file" id="file1"  @change="processFileCategory" >     
                <label for="file1" class="btn-1">Вибрати картинку</label>
                <input type="submit" value="Оновити" @click="handleSubmitCategory">
              </form>
              <div class="popup-bg" @click="hidePopupEdit" ></div>  
          </div>

    <div class="header-panel">
      <h1 class="header-text" >Категорія: <span v-if="nameCategory">{{nameCategory.categoryName}}</span></h1>
      <div class="control-buttons" >
            <div class="btn add" @click="showPopup"></div>
            <div class="btn edit" @click="showPopupEdit"></div>
            <div class="btn delete"  @click.stop="deleteCategory"></div>
      </div>
    </div>

    <div class="info-dish" :class="{dishActive : activeDish}">
          <div class="close-button" :class="{dishActive : activeDish}"  @click="hidePopupDish"></div>

        <dishes-info :dishId="infoDishId"></dishes-info>
    </div>

    <div class="work-area" :style="{'grid-template-rows': 'repeat(' + rowsGrid + ',250px'+')'}" >
      <div class="catgory-menu" v-for="(dish, index) in menuDishes" :key="index">
                <div class="img-category" @click="showInfoDish(dish._id)"  :style="{ 'background': 'url(http://localhost:3000/' + dish.dishImage +')no-repeat center/cover' }">
                   <div v-if="dish.specialOffer != ''" class="ribbon">
                        <span>-{{dish.specialOffer}}%</span>
                    </div>
                  <div class="name-category">
                    <div class="name-dish">{{dish.dishName}}</div>
                    <div>{{dish.cost}} грн</div>
                    <div><span class="description">{{dish.description}}</span></div>
                    <div> {{dish.weight}} г</div>
                  </div>
                </div>
      </div>
        <div class="no-content" v-if="rowsGrid == 0">Страви в даній категорії поки відсутні</div>

    </div>
  </div>
</template>

<script>
import DishesInfo from './dishInfoComponent.vue'

export default {
  name: 'user-info-component',
  data(){
    return{
      menuDishes:[],
      categoryMenu:[],
      length: '',
      active: false,  
      active2: false,
      activeDish: false,
      dishName: '',
      cost: '',
      weight: '',
      cookingTime: '',
      description: '',
      recipe: '',
      specialOffer: '',
      categName: '',
      infoDishId:''
    };
  },
  components: {
    DishesInfo
  },
  methods:{
    showPopup(){
      this.active = !this.active
    },
    showInfoDish(id){
      this.infoDishId = id
      this.activeDish = !this.activeDish
    },
    showPopupEdit(){
      this.active2 = !this.active2
    },
    hidePopup(){
      this.active = false
    },
    hidePopupEdit(){
      this.active2 = false
    },
     hidePopupDish(){
      this.activeDish = false
    },
      processFile(event) {
      this.dishImage = event.target.files[0];

    },
    handleSubmit(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append('dishName', this.dishName);
      formData.append('cost', this.cost);
      formData.append('weight', this.weight);
      formData.append('cookingTime', this.cookingTime);
      formData.append('description', this.description);
      formData.append('recipe', this.recipe);
      formData.append('specialOffer', this.specialOffer);
      formData.append('dishImage', this.dishImage);
      this.axios.post('http://localhost:3000/api/addCategoryDish/'+this.$route.params.id , formData, {
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
                        action: 'Додано страву: ' + this.dishName
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                   this.$router.go()
                  this.hidePopup()
                })
              })
         
        })
      })
    },
    processFileCategory(event) {
      this.nameCategory.categoryImage = event.target.files[0];
    },
    handleSubmitCategory(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append('categoryName', this.nameCategory.categoryName);
      formData.append('categoryImage', this.nameCategory.categoryImage);
      formData.append('dishes', JSON.stringify(this.nameCategory.dishes));
      this.axios.patch('http://localhost:3000/api/editCategory/'+this.$route.params.id , formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        this.$store.dispatch('loadMenuCategories')
        .then((response) => {
            this.$router.push({path: '/menuCategories'});
            this.hidePopupEdit()
        })
      })
    },
     deleteCategory(){
      let quation = confirm('Ви впевнені, що хочете видалити категорію?')
        if(quation ==true){
        this.axios.delete('http://localhost:3000/api/deleteCategory/'+ this.$route.params.id)
        .then((response) => {
          this.$store.dispatch('loadMenuCategories')
          .then(() => {
             let user = JSON.parse(sessionStorage.getItem('currLoginUserData'))

          this.$store.dispatch('loadCurrentUserData', user.userId)
            .then(res=>{
                  let obj = {
                        user: `${res.data.name + ' ' + res.data.surname}`,
                        postId: res.data.postId,
                        postName: res.data.postName,
                        action: "Видалено категорію страв: " + this.nameCategory.categoryName
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                    this.$router.push({path: '/menuCategories'});
                })
            })
          });
        })
      }else{
        return
      }
     }
  },
  computed:{
    nameCategory(){
      return this.categoryMenu.find(el => {
       return el._id == this.$route.params.id          
        
      })
    },
     rowsGrid(){
      this.length = Math.ceil(this.menuDishes.length/3)
      return this.length
    }
  },
  created(){

     this.$store.dispatch('loadMenuCategories')
    .then((response) => {
      this.categoryMenu = this.$store.getters.getMenuCategories;
    })
     this.$store.dispatch('loadDishesMenu', this.$route.params.id)
    .then((response) => {
      this.menuDishes = this.$store.getters.getDishesMenu;
      this.menuDishes.forEach((element, index) => {
        if(element.dishImage.split("//").length < 2){
          this.menuDishes[index].dishImage = element.dishImage.split("\\").join('/');
        } else {
          this.menuDishes[index].dishImage = element.dishImage.split("//").join('/');
        }
      });
    })
  }
}
</script>

<style scoped>

.info-dish{
   position: absolute;
    height: 100%;
    width: 100%;
}
.info-dish .close-button{
  display: none;
  }
.info-dish .close-button.dishActive{
    display: block;
    position: absolute;
    top: 20px;
    left: 95%;
    width: 50px;
    height: 50px;
    background: url('../assets/images/closeButton.png')no-repeat center/contain;
    z-index: 40;
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
    width: 80px;
    height: 100%;
  }
.popup-hide, .info-dish{
  display: none;
}
.popup, .dishActive, .popup1{
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
.popup .close-button, .popup1 .close-button{
  position: absolute;
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background: url('../assets/images/closeButton.png')no-repeat center/contain;
    z-index: 2;
}
.popup .form-category, .popup1 .form-category{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #2b3042;
  box-shadow: 0 0 20px 0 #000;
  min-width: 350px;
  width: 25%;
  padding: 30px 10px;
  z-index: 2;
}
.form-category .text-area1{
  height: 60px;
}
.form-category .text-area2{
  height: 80px;
}
.popup .form-category input[type="text"],
 .popup1 .form-category input[type="text"],
 .form-category textarea {
   width: 80%;
  height: 40px;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
  margin: 5px 0;
  border-radius: 5px;
}

.popup .form-category input[type="submit"], .popup1 .form-category input[type="submit"]{
    background-color: #4CAF50;
    border: none;
    font-size: 20px;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
}
.popup [type="file"], .popup1 [type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
  margin: 10px 0;
}

.popup [type="file"] + label, .popup1 [type="file"] + label  .popup1 [type="file"] + label, .popup1 [type="file"] + label {
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
 .popup [type="file"] + label :hover, .popup1 [type="file"] + label :hover {
    background-color: darken(#f15d22, 10%);
  }
  
  .popup [type="file"] + label .btn-1, .popup1 [type="file"] + label .btn-1 {
    background-color: #f79159;
    box-shadow: 0 6px darken(#f79159, 10%);
    transition: none;
  }
   .popup [type="file"] + label .btn-1:hover , .popup1 [type="file"] + label .btn-1:hover {
      box-shadow: 0 4px darken(#f79159, 10%);
      top: 2px;
}
  
  .add{
    background: #41c0c2 url('../assets/images/add.png') no-repeat center center;
    background-size: 20px;
  }
  .edit{
    background: #68c2da url('../assets/images/edit.png') no-repeat center center;
    background-size: 20px;
  }

  .delete{
    background: #ed535d url('../assets/images/delete.png') no-repeat center center;
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
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    overflow-y: scroll;
  }
  .work-area .no-content{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
    font-weight: 900;
    font-family: 'Poppins', sans-serif;

  }
  .catgory-menu{
        position: relative;
        box-shadow: 0 0 10px 0 #000;
  }
   .work-area .catgory-menu:hover{
     opacity: 0.7;
   }
  .catgory-menu .img-category{
    width: 100%;
    height: 100%;
  }
    .ribbon {
    position: absolute;
    right: -15px;
    top: -15px;
    overflow: hidden;
    width: 205px;
    height: 205px;
}
.ribbon span {
    font-size: 25px;
    font-weight: bold;
    font-family: Roboto;
    font-style: italic;
    color: yellow;
    text-transform: uppercase;
    line-height: 20px;
    transform: rotate(45deg);
    width: 195px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center; 
    background: linear-gradient(#F70505 0%, #8F0808 100%);
    box-shadow: inset 0 -9px 40px 0px rgba(0, 0, 0, 1);
    position: absolute;
    top: 36px;
    right: -37px;
}
.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #000;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #000;
}
.ribbon span::after {
  content: "";
  position: absolute; 
  right: 0px; 
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #000;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #000;
}
  .catgory-menu .name-category{
    position: absolute;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: calc(100% - 20px);
    height: 100px;
    align-items: center;
    padding: 0 10px;
    background: rgba(0,0,0,0.5);
    font-size: 16px;
    font-weight: 200;
    color: #fff;
    font-family: "Roboto";
  }
  .catgory-menu .name-category .name-dish{
    font-size: 20px;
    font-weight: 600;
  }
  .name-category .description{
    font-size: 12px;
    height: 40px;
    overflow: hidden;
    display: block;
    width: 180px;
  }
   .catgory-menu .name-category div:nth-child(even){
     padding-left: 15px; 
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
