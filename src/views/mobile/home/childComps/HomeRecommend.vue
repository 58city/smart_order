<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:'HomeRecommend',
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-flow:wrap;
    text-align: center;
    font-size: 12px;
    line-height: 30px;
    padding: 10px 0;
    border-bottom: 10px solid #ddd;
  }
  .recommend-item{
    /* flex属性
       flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
       建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
       flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
       flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
       flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 
     */
    flex: 0 0 25%;
  }
  .recommend-item img{
    display: block;
    width: 80%;
    margin: 0 auto;
    border-radius: 50%;
  }
</style>