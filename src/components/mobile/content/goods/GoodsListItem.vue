<template>
  <div class="goods-item" @click="goDetail">
    <img :src="goodsItem.image" @load="imgLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}￥</span>
      <span class="collect">{{goodsItem.collect}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoad");
    },
    goDetail(){
      this.$router.push({
        name:'detail',
        params:{
          id:this.goodsItem.id
        }
      })
    }
  }
};
</script>

<style scoped>
.goods-item {
  flex: 0 0 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/mobile/images/common/collect.svg") 0 0/14px 14px;
}
</style>