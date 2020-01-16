<template>
  <nav-bar>
    <i class="fa fa-angle-left" slot="left" @click="back"></i>
    <ul slot="center" class="title">
      <li
        v-for="(item,index) in titles"
        :key="item"
        :class="{active:currentIndex==index}"
        @click="toggleNav(index)"
      >{{item}}</li>
    </ul>
  </nav-bar>
</template>
<script>
import NavBar from "components/mobile/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: { NavBar },
  methods: {
    toggleNav(index) {
      this.currentIndex = index;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.fa-angle-left {
  display: block;
  font-size: 30px;
  line-height: 40px;
}
.title {
  display: flex;
  list-style: none;
}
.title li {
  flex: 1;
}
.title li.active {
  color: var(--color-tint);
}
</style>