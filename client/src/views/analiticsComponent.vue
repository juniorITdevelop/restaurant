<template>
  <div class="component-wrapper">
    <div class="header-panel">
      <h1 class="header-text">Аналітична інформація</h1>
      <div class="control-buttons">
      </div>
    </div>
    <div class="work-area">
      <div class="chart">
        <div class="chatr-title">Ймовірності та прогнози</div>
        
      </div>
      <div class="chart">
        <div class="chatr-title">Загальний прибуток з реалізації замовлень</div>
        <GChart type="ColumnChart" :data="chart1Data" :options="chart1Options"/>
      </div>
      <div class="chart">
        <div class="chatr-title">Кількість відвудувачів в тиждень за останній квартал</div>
        <GChart type="LineChart" :data="chart2Data" :options="chart2Options"/>
      </div>
      <div class="chart">
        <div class="chatr-title">Кількість замовлень виконаних офіціантами за останній місяць</div>
        <GChart type="PieChart" :data="chart3Data" :options="chart3Options"/>
      </div>
      <div class="chart">
        <div class="chatr-title">Середня оцінка закладу по відгукам за квартал</div>
        <GChart type="ColumnChart" :data="chart4Data" :options="chart4Options"/>
      </div>
      <div class="chart">
        <div class="chatr-title">Рейтинг страв по продажу</div>
        <GChart type="BarChart" :data="chart5Data" :options="chart5Options"/>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'analitics',
  data(){
    return{
      chart1Data: [
        ['Період', 'Дохід', 'Витрати'],
        ['Тиждень',,],
        ['Місяць',,],
        ['Квартал',,]
      ],
      chart1Options: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          
        }
      },
      chart2Data: [
        ['Період', 'Відвідувачі'],
        [0, 0],
        [1,],
        [2,],
        [3,],
        [4,],
        [5,],
        [6,],
        [7,],
        [8,],
        [9,],
        [10,],
        [11,],
        [12,]
      ],
      chart2Options: {
        chart: {
          title: 'Bars, default',
          curveType: 'function',
          series: [{'color': '#D9544C'}],
          intervals: { style: 'bars' },
          legend: 'none',
        }
      },
      chart3Data: [
        ['Період', 'Відвідувачі']
      ],
      chart3Options: {
        chart: {
          title: 'Bars, default'
        }
      },
      chart4Data: [
        ['', 'Оцінка'],
        ['1', 1000],
        ['2', 4170],
        ['3', 12000],
        ['4', 1000],
        ['5', 4170],
        ['6', 12000],
        ['7', 1000],
        ['8', 4170],
        ['9', 12000],
        ['10', 1000],
        ['11', 4170],
        ['12', 12000]
      ],
      chart4Options: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        colors: ['#1b9e77']  
      },
      chart5Data: [
        ['', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп', 'Цезар', 'Грибний суп', 'Вершковий суп'],
        ['', 30, 15, 20, 30, 15, 27, 30, 15, 20, 30, 15, 20, 30, 15, 20, 30, 15, 20, 30, 15, 20, 30, 15, 20],
      ],
      chart5Options: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        bars: 'horizontal',
        height: 600,
        max: 70
      },
      statisticsData: {},
      ordersData: [],
      purchasesData: [],
      feedbackData: [],
      dayMilliseconds: '86400000',
      weekMilliseconds: '604800000',
      monthMilliseconds: '2419200000',
      quaterMilliseconds: '7257600000',
      waiters: [],
      usersData: []
    };
  },
  components: {
    GChart
  },
  computed:{

  },
  methods: {
    calculateOrdersTotalCost(time){
      let cost = 0;
      this.ordersData.forEach(element => {
        let creationTime = new Date(element.creationTime).getTime();
        if(creationTime > (Date.now()  - time)){
          cost = cost + +element.totalCost;
        }
      });
      return cost;
    },
    calculatePurchasesTotalCost(time){
      let cost = 0;
      this.purchasesData.forEach(element => {
        let creationTime = new Date(element.creationTime).getTime();
        if(creationTime > (Date.now()  - time)){
          cost = cost + +element.totalCost;
        }
      });
      return cost;
    },
    calculateGuestsCount(time){
      for(let i = 0;i < 12; i++){
        let count = 0;
        this.ordersData.forEach(element => {
        let creationTime = new Date(element.creationTime).getTime();
          if(creationTime > (Date.now()  - time*(i+1)) && creationTime < (Date.now()  - time*i)){
            count = count + +element.guestsCount;
          }
        });
        this.chart2Data[i+2][1] = count;
      }
    },
    calculateWaitersOrders(time){
      this.waiters.forEach((element, index) => {
        this.chart3Data.push([]);
        this.chart3Data[index + 1][0] = element.name + ' ' + element.surname;
        let count = 0;
        this.ordersData.forEach(elem => {
          let creationTime = new Date(elem.creationTime).getTime();
          if(creationTime > (Date.now() - time) && elem.waiter === this.chart3Data[index + 1][0]){
            count = count + 1;
          }
        });
        this.chart3Data[index + 1][1] = count;
      });
    }
  },
  created: function() {
    this.$store.dispatch("loadStatistics").then(response => {
      this.statisticsData = this.$store.getters.getStatistics;
      this.ordersData = this.statisticsData.orders;
      this.purchasesData = this.statisticsData.purchases;
      this.feedbackData = this.statisticsData.feedback;

      this.$store.dispatch("loadUsersData").then(response => {
          this.usersData = this.$store.getters.getUsersData;
          this.usersData.forEach((element, index) => {
            if (element.postId == "p004") {
              this.waiters.push(element);
            }
          });
          // chart1
          this.chart1Data[1][1] = this.calculateOrdersTotalCost(this.weekMilliseconds);
          this.chart1Data[2][1] = this.calculateOrdersTotalCost(this.monthMilliseconds);
          this.chart1Data[3][1] = this.calculateOrdersTotalCost(this.quaterMilliseconds);
          this.chart1Data[1][2] = this.calculatePurchasesTotalCost(this.weekMilliseconds);
          this.chart1Data[2][2] = this.calculatePurchasesTotalCost(this.monthMilliseconds);
          this.chart1Data[3][2] = this.calculatePurchasesTotalCost(this.quaterMilliseconds);

          // chart2
          this.calculateGuestsCount(this.weekMilliseconds);

          // chart3
          this.calculateWaitersOrders(this.quaterMilliseconds);
        });
    });
  }
}
</script>

<style scoped>
.chart{
  width: 90%;
  padding: 80px 0 20px 0;
  border-bottom: 2px solid #2b3042;
}
.chatr-title{
  font-family: "Roboto";
  font-size: 20px;
  text-align: center;
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
  .component-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
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
  .work-area{
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
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>