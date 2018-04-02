<style lang="less">
    .comment {
        &__list {
            height: auto;
        }
        &__item {
            width: 100%;
            height: 1.5rem;
        }
        &__item-img {
            display: inline-block;
            width: 0.925926rem;
            // height: 0.925926rem;
            float: left;
        }
        &__item-cont {
            width: 75%;
            display: block;
            /* display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden; */
            font-size: 0.333333rem;
            float: left;
        }
        &__item-more {
            // position: absolute;
        }
        &__tips {
            text-align: center;
            color: #666;
        }
    }
</style>
<template>
    <div class='comment'>
        <img src="../assets/logo.png">
        <img src="../assets/logo.png">
        <ul id="abc" ref="commentList" class="comment__list" 
            @touchstart="touchstartFun($event)"
            @touchmove="touchMoveFun($event)"
            @touchend="touchEndFun($event)">
            <li class="comment__item" v-for="(item, index) in cmtData">
                <img class="comment__item-img" src="../assets/logo.png">
                <div class="comment__item-cont">{{ item.subComment }}</div>
                <!-- <span class="comment__item-more" v-show="item.moreFlag" @click="showMore(item)">... 更多</span> -->
            </li>
        </ul>
        <p ref="tips" class="comment__tips">加载更多...</p>
    </div>
</template>
<script>
    export default {
        props: {},
        data() {
            return {
                cmtData: [],
                startY: 0,
                moveY: 0,
                loadTimes: 0,
                touching: false,
                count: 0
            }
        },
        computed: {

        },
        mounted() {
            // 1、请求评论接口
            // [{img: '', nickName: '', comment: '',thumbupNum: 0}]
            this.cmtData = [
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                    {img: '',nickName: '用户昵称', comment: '一拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18},
                ];
            this.cmtData.forEach((item) => {
                item.subComment = this.subString(item);
            });
            //监听评论区滑到底部的操作
            // this.touchEvent();
            // 2、判断用户是否登录
            //     是：拉取用户头像，输入框tips：输入想说的话....
            //     否：拉取APP Icon，输入框tips：登录后才能一起发言喔....
        },
        methods: {
            /*截取字符操作*/
            subString(obj) {
                let singleStr = obj.comment.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,"çç");
                let result = '';
                if(singleStr.length > 125) {
                    let length = singleStr.slice(0, 125).replace(/çç/g,'ç').length;
                    result = obj.comment.slice(0, length);
                    obj.moreFlag = true;
                } else {
                    result = obj.comment;
                    obj.moreFlag = false;
                }
                return result;
            },
            /*展示更多操作*/
            showMore(item) {
                item.moreFlag = false;
                item.subComment = item.comment;
                this.$forceUpdate();
            },
            /*评论操作*/
            speak() {
                // 1、判断用户是否登录
                //     是：正常输入，监听keyCode == 13(回车键)，如果为空，提示“输入内容为空，不允许发送”
                //     否：调到登录界面
            },
            /*点赞操作*/
            thumbUp() {
                // 1、判断用户是否登录
                //     是：正常输入，调用点赞接口，执行点赞功能
                //     否：调到登录界面
            },
            /*评论区里滑动加载更多操作*/
            // touchEvent() {
                // this.$refs.commentList.addEventListener('touchstart', this.touchstartFun, false); 
                // this.$refs.commentList.addEventListener('touchmove', this.touchMoveFun, false); 
                // this.$refs.commentList.addEventListener('touchend', this.touchEndFun, false);  
            // },
            touchstartFun(t) {
                let e = t.targetTouches[0];
                this.startY = e.pageY;
                this.touching = true;
            },
            touchMoveFun(t) {
                let e = t.targetTouches[0];
                this.moveY = e.pageY - this.startY;
                if(this.moveY < -5) {
                    // t.preventDefault();
                    this.
                    alert('clientHeight:'+document.documentElement.clientHeight); //527
                    alert('scrollTop:'+document.documentElement.scrollTop); //0
                    alert('offsetTop:'+this.$refs.tips.offsetTop) //527
                    let offsetTop = this.$refs.tips.offsetTop;
                    if(document.documentElement.clientHeight + document.body.scrollTop >= offsetTop ) {
                        this.count++
                        // debugger
                        // 调用接口，把数据push进cmtData, 再loadTimes，当loadtimes>=3时，显示回到顶部的按钮
                        let data = [
                            {img: '',nickName: '用户昵称', comment: this.count+'拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话拉取用户头像，输入框tips：输入想说的话', thumbupNum: 18}
                        ];
                        this.cmtData = this.cmtData.concat(data);
                        this.cmtData.forEach((item) => {
                            item.subComment = this.subString(item);
                        });
                        this.$forceUpdate();
                        this.touching = false;
                        // alert('clientHeight:'+document.documentElement.clientHeight); //527
                        // alert('scrollTop:'+document.body.scrollTop); //0
                        // alert('offsetTop:'+this.$refs.tips.offsetTop) //527
                        // alert('move:'+this.touching)
                    }
                }
            },
            touchEndFun(t) {
                alert('end:'+this.touching)
                this.touching = true;
            }
        }
    }
</script>