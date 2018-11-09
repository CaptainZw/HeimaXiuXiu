<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}} {{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- <dzh-qrcode url="https://www.baidu.com/" :img_url="img_url"></dzh-qrcode> -->
                                <!-- logo图片（不用logo图片，可以不要） -->
                                <img id="imgLogo" src="../../assets/zhifubao.jpg" hidden>
                                <!-- 二维码容器 -->
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import DZHQRCode from 'dzh-qrcode'
    import "./qrcode.js"
    export default {
        // components: { "dzh-qrcode" : DZHQRCode },
        data() {
            return {
                timeID:-1,
                orderInfo: {}
            }
        },
        created() {
            this.getOrderInfo()
            this.timeID=setInterval(()=>{
                this.task()
            },3000)
            // this.img_url=require("../../assets/zhifubao.jpg")
        },
        mounted() {
            
        },
        updated(){
             $("#container").erweima({
                    text:`http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`,
                    mode: 4,
                    mSize: 25,
                    image: $("#imgLogo")[0],      
                });
        },
        methods: {
            getOrderInfo() {
                const url = `site/validate/order/getorder/${this.$route.query.orderid}`
                this.$axios.get(url).then(res => {
                    this.orderInfo = res.data.message[0]
                })
            },
            task(){
                const url= `site/validate/order/getorder/${this.$route.query.orderid}`
                this.$axios.get(url).then(res=>{
                    if(res.data.message[0].status===2){
                        this.$router.push({path:'/paySuccess'})
                    }
                    console.log(res.data.message[0].status);
                })
            }
        },
        beforeDestroy(){
            clearInterval(this.timeID)
        }
    }
</script>
