<template>
  <div class="wrapper" ref="wrapper">
		<div class="content">
			<div class="pull-down">
				<i class="fa fa-spinner fa-spin"></i> 下拉刷新
			</div>
			<slot></slot>
			<div class="pull-up">
				<i class="fa fa-spinner fa-spin"></i> 加载更多
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	export default {
		name:'Scroll',
		data() {
			return {
				scroll:null
			}
		},
		mounted() {
			this.scroll=new Bscroll(this.$refs.wrapper,{
				probeType:this.probeType,
				click:this.click,
				pullUpLoad:this.pullUpLoad
			})
			this.scroll.on('scroll',pos=>{
				this.$emit('scroll',pos)
			})
			this.scroll.on('pullingUp',()=>{
				this.$emit('pullingUp')
			})	
		},
		props:{
			probeType:{
				type:Number,
				default:0
			},
			click:{
				type:Boolean,
				default:false
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			scrollTo(x,y,time=300){
				this.scroll.scrollTo(x,y,time)
			},
			finishPullUp(){
				this.scroll.finishPullUp()
			},
			refresh(){
				this.scroll.refresh()
			},
			y(){
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		position: absolute;
		top:44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.pull-down{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position:absolute;
		top:-50px;
	}
	.pull-up{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position:absolute;
		bottom:-50px;
	}
</style>