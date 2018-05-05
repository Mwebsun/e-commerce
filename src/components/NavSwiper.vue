<template>
    <div class="wraper">
    <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide>
            <img class="swiper-img" src="./../../static/big02.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
            <img class="swiper-img" src="./../../static/big03.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
            <img class="swiper-img"  src="./../../static/big04.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
            <img class="swiper-img" src="./../../static/big01.jpg" alt="">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    </div>
</template>

<script>
    export default {
        name: 'IndexSwiper',
        data () {
            return {
                swiperOption:{
                    pagination: '.swiper-pagination',
                    loop:true,
                    autoplay:2000
                },
                swiperList:""
            }
        }
    }
</script>

<style>
    .wraper {
        width:100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 40%;
        background-color: #eee;
    }
    .swiper-img {
        width: 100%;
    }
    .swiper-pagination-bullet-active {
        background-color: #fff!important;
    }
</style>
