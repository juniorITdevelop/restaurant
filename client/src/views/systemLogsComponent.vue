<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Дії користувачів</h1>
      <div class="control-buttons">
        <div class="btn add"></div>
        <div class="filter-section">
          <label for="filter">Сортувати</label>
          <select name="filter" id="filter" v-model="key">
            <option value="">Всі</option>
            <option value="1">За добу</option>
            <option value="2">За тиждень</option>
            <option value="3">За місяць</option>
            <option value="4">За рік</option>
          </select>
        </div>
      </div>
    </div>
    <div class="work-area">
      <div class="table-header">
        <div class="first-colon flex">
          <p>№</p>
        </div>
        <div class="second-colon flex">
          <p>Ім'я Прізвище</p>
        </div>
        <div class="third-colon flex">
          <p>№ Посади</p>
          </div>
        <div class="fourth-colon flex">
          <p>Посада</p>
        </div>
        <div class="fifth-colon flex">
          <p>Дата</p>
        </div>
        <div class="sixth-colon flex">
           <p>Дія</p>
        </div>
      </div>
      <div class="user-record" v-for="(logs, index) in dataLog" :key="index">
        <div class="first-colon flex">
          <p>{{index+1}}</p>
        </div>
        <div class="second-colon flex">
          <p>{{logs.user}}</p>
        </div>
        <div class="third-colon flex">
          <p>{{logs.postId}}</p>
        </div>
        <div class="fourth-colon flex">
          <p>{{logs.postName}}</p>
        </div>
        <div class="fifth-colon flex">
          <p>{{sortData(logs)}}</p>
        </div>
        <div class="sixth-colon flex">
          <p>{{logs.action}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'users-list-component',
  data(){
    return{
      logsData: [],
      dataLogs: [],
      
      key:''
    };
  },
  components: {

  },
  computed:{
      dataLog(){
        this.dataLogs = this.logsData
            let curentTime = new Date().getTime()
            const yearTime = 31536000000
            const monthTime = 2592000000
            const weekTime = 604800000
            const dayTime = 86400000
              if(this.key == ''){
                this.dataLogs = this.logsData
              }
              if(this.key == 1){
                this.dataLogs = []
                this.logsData.filter(element => {
                  let elementTime = new Date(element.time).getTime()
                    if(elementTime > curentTime-dayTime)
                      this.dataLogs.push(element)
                })
             }if(this.key == 2){
                this.dataLogs = []
                this.logsData.filter(element => {
                  let elementTime = new Date(element.time).getTime()
                    if(elementTime > curentTime-weekTime)
                      this.dataLogs.push(element)
                })
             }if(this.key == 3){
                this.dataLogs = []
                this.logsData.filter(element => {
                  let elementTime = new Date(element.time).getTime()
                    if(elementTime > curentTime-monthTime)
                      this.dataLogs.push(element)
                })
             }if(this.key == 4){
                this.dataLogs = []
                this.logsData.filter(element => {
                  let elementTime = new Date(element.time).getTime()
                    if(elementTime > curentTime-yearTime)
                      this.dataLogs.push(element)
                })
             }
            return this.dataLogs
      }
  },
  methods:{
        sortData(timeData) {
         let str = JSON.stringify(timeData)
         
        let dat = JSON.parse(str,function(key, value) {
          if (key == 'time') return new Date(value);
          return value;
        })
        let day = dat.time.getDate()
          if(day < 10)
          day = "0" + day
          let minutes = dat.time.getMinutes()
          if(minutes < 10)
          minutes = "0" + minutes
        return dat.time.getHours()+ ':' + minutes + ' / ' + day + '.' + `${dat.time.getMonth()+1}` +  '.' + dat.time.getFullYear();
      }
  },
  created: function(){
    this.$store.dispatch('loadLogsSystem')
    .then((response) => {
      this.logsData = this.$store.getters.getLogsSystem;
      this.dataLogs = this.logsData.reverse()
    })
  }
}
</script>

<style scoped>
.filter-section{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  height: 50px;
}
#filter {
    display: block;
    font-size: 14px;
    font-weight: 600;
    font-family: sans-serif;
    color: #2b3042;
    padding: 5px;
    width: 100%;
    height: 30px;
    border-radius: 5px 5px 0 0;
    background: #d0d0d2;
    outline: none;
    box-shadow: 0 3px 3px;
}
select option{
  font-size: 14px;
  font-weight: 400;
}
select option:hover {
    background: red;
}
.filter-section label{
    font-size: 16px;
    font-family: Verdana;
    color: #fff;
    font-weight: 600;
}
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .component-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .header-panel{
    width: calc(100%);
    position: absolute;
    height: 70px;
    background-color: #2b3042;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
  }
  .header-text{
    font-family: "Roboto";
    font-weight: 200;
    font-style: normal;
    font-size: 20px;
    color: #ffffff;
  }
  .work-area{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    position: absolute;
    border-radius: 5px;
    top: 80px;
    left: 30px;
    background-color: #ffffff;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
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

  .user-record{
    display: grid;
    grid-template-columns: 50px 1fr 100px repeat(3, 1fr);
    grid-gap: 10px;
    margin: 5px 0;
    font-family: "Roboto";
    font-weight: 200;
    height: auto;
    font-size: 15px;
  }
  .user-record div:nth-child(even){
    background: #eaeaff;
  }
  .user-record div:nth-child(odd){
    background: #d0d0d2;
  }
  .user-record div p{
    padding: 0 5px;
  }
  .table-header{
    display: grid;
    grid-template-columns: 50px 1fr 100px repeat(3, 1fr);
    grid-gap: 10px;
    font-family: "Roboto";
    height: auto;
    padding: 5px 0;
    background: #eaeaff;
  }
   .table-header .flex{
     background: #d0d0d2;
   }
</style>