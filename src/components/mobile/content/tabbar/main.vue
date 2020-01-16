<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="#d4237a">
      <!-- <img slot="icon" src="../../assets/mobile/images/tabbar/home.svg" alt=""> -->
      <img slot="icon" src="~assets/mobile/images/tabbar/home.svg" alt="">
      <img slot="icon-active" src="~assets/mobile/images/tabbar/home_on.svg" alt="">
      <h4 slot="text">首页</h4>
    </TabBarItem>
    <TabBarItem path="/category" activeColor="#d4237a">
      <img slot="icon" src="~assets/mobile/images/tabbar/cat.svg" alt="">
      <img slot="icon-active" src="~assets/mobile/images/tabbar/cat_on.svg" alt="">
      <h4 slot="text">分类</h4>
    </TabBarItem>
    <TabBarItem path="/cart" activeColor="#d4237a">
      <img slot="icon" src="~assets/mobile/images/tabbar/cart.svg" alt="">
      <img slot="icon-active" src="~assets/mobile/images/tabbar/cart_on.svg" alt="">
      <h4 slot="text">购物车</h4>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="#d4237a">
      <img slot="icon" src="~assets/mobile/images/tabbar/my.svg" alt="">
      <img slot="icon-active" src="~assets/mobile/images/tabbar/my_on.svg" alt="">
      <h4 slot="text">我的</h4>
    </TabBarItem>
  </TabBar>
</template>
<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";
  export default {
    name: 'TabBarMain',
    components:{ TabBar,TabBarItem }
  }
</script>
<style></style>