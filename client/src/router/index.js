import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'



import Login from '../views/loginPageComponent.vue'
import MenuCategories from '../views/menuCategoriesComponent.vue'
import CategoryDishes from '../views/categoryDishesComponent.vue'
import DishesInfo from '../views/dishInfoComponent.vue'
import TablesComponent from '../views/tablesComponent.vue'
import UserInfo from '../views/userInfoComponent.vue'
import UsersList from '../views/usersListComponent.vue'
import EditUser from '../views/editUserComponent.vue'
import AddUser from '../views/addUserComponent.vue'
import Logs from '../views/systemLogsComponent.vue'
import feedBack from '../views/feedBackComponent.vue'
import order from '../views/orderComponent.vue'
import orderInfo from '../views/orderInfoComponent.vue'
import analitics from '../views/analiticsComponent.vue'
import purchases from '../views/purchasesComponent.vue'
import purchaseInfo from '../views/purchaseInfoComponent.vue'
import reports from '../views/reportsComponent.vue'
import ordersReports from '../views/orderReportsComponent.vue'
import orderInfoReports from '../views/orderInfoReportsComponent.vue'
import purchasesReports from '../views/purchasesReportsComponent.vue'
import purchaseInfoReports from '../views/purchaseInfoReportsComponent.vue'

Vue.use(VueRouter)

const routes = [
  {  
    path: '/',
    redirect: '/menuCategories'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/menuCategories',
    name: 'menuCategories',
    component: MenuCategories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editCategory/:id',
    name: 'editCategory',
    component: EditUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/analitics',
    name: 'analitics',
    component: analitics,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:id/dishes',
    name: 'categoryDishes',
    component: CategoryDishes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:categoryId/infoDishes/:id',
    name: 'DishesInfo',
    component: DishesInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/feedBack',
    name: 'feedBack',
    component: feedBack,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/orderInfo/:id',
    name: 'orderInfo',
    component: orderInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports/orders',
    name: 'ordersReports',
    component: ordersReports,
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/reports/orderInfo/:id',
    name: 'orderInfoReports',
    component: orderInfoReports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports/purchases',
    name: 'purchasesReports',
    component: purchasesReports,
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/reports/purchaseInfo/:id',
    name: 'purchaseInfoReports',
    component: purchaseInfoReports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/purchases',
    name: 'purchases',
    component: purchases,
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/purchaseInfo/:id',
    name: 'purchaseInfo',
    component: purchaseInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tablesInfo',
    name: 'tables',
    component: TablesComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userInfo/:id',
    name: 'userInfo',
    component: UserInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usersList',
    name: 'usersList',
    component: UsersList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editUser/:id',
    name: 'edit',
    component: EditUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports/logs',
    name: 'logs',
    component: Logs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports',
    name: 'reports',
    component: reports,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(sessionStorage.getItem("currLoginUserData"));
  store.state.isActive = false
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
