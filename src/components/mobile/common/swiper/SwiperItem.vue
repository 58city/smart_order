<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /* 在flex布局中，父元素在不同宽度下，子元素是如何分配父元素空间的。 */
    /* flex-basis:basis英文意思是<主要成分>，所以他和width放在一起时,肯定把width干掉，
       basis遇到width时就会说我才是最主要的成分，你是次要成分，所以见到我的时候你要靠边站。
       该属性用来设置元素的宽度，其实，width也可以设置宽度。如果元素上同时设置了width和flex-basis，那么width 的值就会被flex-basis覆盖掉。
     */
    /* 
       flex-grow:grow英文意思是<扩大，扩展，增加>,这就代表当父元素的宽度大于子元素宽度之和时，并且父元素有剩余，
       这时，flex-grow就会说我要成长，我要长大，怎么样才能成长呢，当然是分享父元素的空间了。
       flex-grow的默认值为0，意思是该元素不索取父元素的剩余空间，如果值大于0，表示索取。值越大，索取的越厉害
     */
    /* 
       flex-shrink:shrink英文意思是<收缩，>，这就代表当父元素的宽度小于子元素宽度之和时，并且超出了父元素的宽度，
       这时，flex-shrink就会说外面的世界太苦了，我还是回到父亲的怀抱中去吧！因此，flex-shrink就会按照一定的比例进行收缩。
       flex-shrink的默认值为1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。值越大，减小的越厉害。如果值为0，表示不减小。
     */
    flex-shrink: 0;
  }
  .slide img {
    width: 100%;
  }
</style>