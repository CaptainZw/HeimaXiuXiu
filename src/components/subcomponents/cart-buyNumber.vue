<template>
    <div>
        <div class="left" @click="deleteCount">-</div>
        <div class="middle">{{initbuycount}}</div>
        <div class="right"  @click="addCount">+</div>
    </div>
</template>
<script>
    export default {
        props:['goodid','buycount'],
        data(){
            return{
                initbuycount:0
            }
        },
        created(){
            this.initbuycount=this.buycount
        },
        methods:{
            deleteCount(){
                if(this.initbuycount===1) return
                this.initbuycount--
                this.notify()
            },
            addCount(){
                this.initbuycount++
                this.notify()
                // this.$emit('goodsCountChange',{
                //     goodid:this.goodid,
                //     count:this.initbuycount      
                // })
                
            },
            notify(){
                this.$emit('goodsCountChange',{
                    goodid:this.goodid,
                    count:this.initbuycount      
                })
                
            }
        }
    }
</script>
<style scoped>
    .left,.right,.middle{
        width: 25px;
        height: 25px;
        display: inline-block;
        border: 1px solid rgba(92, 92, 92, 0.3);
        line-height: 25px;
        text-align: center;
    }
    .middle {
        width: 30px;
        margin: 0 5px;
    }
</style>
