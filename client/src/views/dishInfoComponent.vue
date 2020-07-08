<template>
  <div class="component-wrapper">
    <div class="left-block">
       <div class="control-buttons" >
            <div class="btn edit" @click="showEditForm"></div>
            <div class="btn delete" @click="deleteDish"></div>
      </div>
      <div class="info-dish" v-if="nameCategory">
         
        <div class="dish-img" :style="{ 'background': 'url(http://localhost:3000/' + nameCategory.dishImage +')no-repeat center/cover' }">
          <div v-if="nameCategory.specialOffer != ''" class="ribbon">
              <span>-{{nameCategory.specialOffer}}%</span>
          </div>
        </div>
        <div class="dish-text">Назва: <span>{{nameCategory.dishName}}</span></div>
        <div class="dish-text">Опис: <span>{{nameCategory.description}}</span></div>
        <div class="dish-text">Рецепт: <span>{{nameCategory.recipe}}</span></div>
        <div class="dish-text">Час приготування: <span>{{nameCategory.cookingTime}}хв</span></div>
        <div class="dish-text">Ціна: <span>{{nameCategory.cost}}грн</span></div>
        <div class="dish-text">Вага: <span>{{nameCategory.weight}}г</span></div>
        <div class="dish-text">Акція: <span>{{nameCategory.specialOffer}}%</span></div>
      </div>
    </div>

    <div class="right-block" v-if="nameCategory">
              <form action="" class="form-category" :class="{activeForm: forActive}">
                <input type="text" placeholder="Ім'я страви" v-model="nameCategory.dishName">
                <input type="text" placeholder="Ціна" v-model="nameCategory.cost">
                <input type="text" placeholder="Вага" v-model="nameCategory.weight">
                <input type="text" placeholder="Час приготування" v-model="nameCategory.cookingTime">
                <textarea class="text-area1" type="text" placeholder="Описання" v-model="nameCategory.description"></textarea>
                <textarea class="text-area2" type="text" placeholder="Рецепт" v-model="nameCategory.recipe"></textarea>
                <input type="text" placeholder="Акція" v-model="nameCategory.specialOffer">
                <input type="file" id="file3"  @change="processFile" >     
                <label for="file3" class="btn-1">Вибрати картинку</label>
                <input type="submit" value="Оновити" @click="handleSubmit">
              </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'user-info-component',
  props: ['dishId'],
  data(){
    return{
      menuDishes:[],
      menuDish:[],
      forActive: false
    };
  },
  components: {
    
  },
methods:{
    showEditForm(){
      this.forActive = !this.forActive
    },
    processFile(event) {
      this.nameCategory.dishImage = event.target.files[0];
    },
      handleSubmit(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append('dishName', this.nameCategory.dishName);
      formData.append('cost', this.nameCategory.cost);
      formData.append('weight', this.nameCategory.weight);
      formData.append('cookingTime', this.nameCategory.cookingTime);
      formData.append('description', this.nameCategory.description);
      formData.append('recipe', this.nameCategory.recipe);
      formData.append('specialOffer', this.nameCategory.specialOffer);
      formData.append('dishImage', this.nameCategory.dishImage);
      this.axios.patch('http://localhost:3000/api/editCategoryDish/'+this.$route.params.id+'/'+this.dishId , formData, {
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
                        action: 'Оновлено страву: ' + this.nameCategory.dishName
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                   this.$router.push({path: '/'+this.$route.params.id+'/dishes'});
                   this.$router.go()
                })
          })
      })
    })
  },
     deleteDish(){
      let quation = confirm('Ви впевнені, що хочете видалити страву?')
        if(quation ==true){
        this.axios.delete('http://localhost:3000/api/deleteCategoryDish/'+this.$route.params.id+'/'+this.dishId)
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
                        action: 'Видалено страву: ' + this.nameCategory.dishName
                 }
                this.axios.post('http://localhost:3000/api/addLog/', obj)
                .then(el=>{
                  this.$router.push({path: '/'+this.$route.params.id+'/dishes'});
                  this.$router.go()
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
       return this.menuDishes.find(el => {
           return el._id == this.dishId
           
        })
    },
  },
   created(){
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
  .component-wrapper{
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 20;
    overflow: hidden;
  }
  .right-block{
    width: 50%;
    height: auto;
  }

    .left-block{
      height: 652px;
      width: 50%;
      overflow-y: scroll;
    } 
  .left-block{
    position: absolute;
    left: 0
  }
.info-dish::-webkit-scrollbar-track,
.left-block::-webkit-scrollbar-track
{
    visibility: hidden;
}

.info-dish::-webkit-scrollbar,
.left-block::-webkit-scrollbar
{
    visibility: hidden;
}

.info-dish::-webkit-scrollbar-thumb,
.left-block::-webkit-scrollbar-thumb
{
    visibility: hidden;
}
  .right-block{
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
  }
  .info-dish{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 95%;
    height: auto;
    overflow-y: scroll;
    overflow-x: visible;
    margin: 25px;
  }



  .dish-img{
    position: relative;
    width: 350px;
    height: 300px;
    border-radius: 30px;
    margin: 10px;
    box-shadow: 0 0 10px 0 silver;
  }

  .dish-text{
    font-size: 20px;
    font-weight: 600; 
    color: #fff;
    font-family: "Roboto";
    padding: 5px 0 0 10px;
  }
  .dish-text span{
    font-size: 16px;
    color: #fff;
    font-weight: 200;
    font-family: "Roboto";
  }

.control-buttons{
      position: absolute;
      top: 289px;
      left: 35px;
      z-index: 10;
      width: 350px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.5);
      box-shadow: 0 0 10px 0 #000;
      border-radius: 0 0 30px 30px ;

  }
  .control-buttons .btn:not(:last-child){
      margin-right: 10px;
  }
  .btn{
    width: 80px;
    height: 35px;
  }
    .edit{
    background: #68c2da url('../assets/images/edit.png') no-repeat center center;
    background-size: 20px;
  }

  .delete{
    background: #ed535d url('../assets/images/delete.png') no-repeat center center;
    background-size: 20px;
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

.right-block .form-category{
  display: none;
}
.right-block .form-category.activeForm{
  display: flex;
}

.form-category{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 17px 1px 30px 15px #270202;   
  width: 60%;
  padding: 0 10px;
  z-index: 2;
}
.form-category input[type="text"],
.form-category textarea{
  height: 30px;
  font-size: 20px;
  color: #2b3042;
  text-align: center;
  border: none;
  outline: none;
  margin: 5px 0;
  border-radius: 5px;
  width: 80%;
  padding: 5px;
}
.form-category .text-area1{
  height: 60px;
}
.form-category .text-area2{
  height: 80px;
}
.form-category input[type="submit"]{
    background-color: #4CAF50;
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
  
</style>
