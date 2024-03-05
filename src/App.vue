<script setup>
import {RouterView} from 'vue-router'
import logo from './assets/logo.png'
import {onBeforeMount} from 'vue';
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import {useUserStore} from '@/stores/user';
import Notifications from "@/views/NotificationsView.vue";

const userStore = useUserStore();
onBeforeMount(() => {
    userStore.initStore();
    const token = userStore.user.access;
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(userStore.user)
        console.log(userStore.user.avatar)
    } else {
        axios.defaults.headers.common["Authorization"] = "";
    }
});
</script>

<template>
    <!--    DESKTOP VERSION NAVBAR-->
    <nav class="py-10 px-8 border-b border-gray-200 hidden md:block">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="menu-left">
                    <RouterLink to="/feed" class="text-xl">
                        <img src="./assets/logo2.png" class="w-[70px]">
                    </RouterLink>
                </div>

                <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated">
                    <RouterLink to="/feed" class="text-purple-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                    </RouterLink>

                    <RouterLink to="/chat">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                        </svg>
                    </RouterLink>

                    <RouterLink to="/notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                        </svg>
                    </RouterLink>

                    <RouterLink to="/search">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </RouterLink>
                </div>

                <div class="menu-right">
                    <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                        <RouterLink :to="{name:'profile', params:{'id':userStore.user.id}}">
                            <img :src="userStore.user.avatar" class="w-[48px] h-[48px] object-cover rounded-full">
                        </RouterLink>
                    </template>
                    <template v-else>
                        <RouterLink to="/login" class="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Login
                        </RouterLink>
                        <RouterLink to="/signup" class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign up
                        </RouterLink>
                    </template>
                </div>
            </div>
        </div>
    </nav>
    <!--    MOBILE VERSION NAVBAR-->

    <nav class="py-10 px-8 border-b border-gray-200 block md:hidden">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="menu-left" @click="showMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <path
                            d="M 12 6.9863281 C 9.256343 6.9863281 7 9.2426712 7 11.986328 C 7 14.729985 9.256343 16.986328 12 16.986328 L 36 16.986328 C 38.743657 16.986328 41 14.729985 41 11.986328 C 41 9.2426712 38.743657 6.9863281 36 6.9863281 L 12 6.9863281 z M 12 9.9863281 L 36 9.9863281 C 37.122343 9.9863281 38 10.863985 38 11.986328 C 38 13.108671 37.122343 13.986328 36 13.986328 L 12 13.986328 C 10.877657 13.986328 10 13.108671 10 11.986328 C 10 10.863985 10.877657 9.9863281 12 9.9863281 z M 12 18.986328 C 9.256343 18.986328 7 21.242671 7 23.986328 C 7 26.729985 9.256343 28.986328 12 28.986328 L 36 28.986328 C 38.743657 28.986328 41 26.729985 41 23.986328 C 41 21.242671 38.743657 18.986328 36 18.986328 L 12 18.986328 z M 12 21.986328 L 36 21.986328 C 37.122343 21.986328 38 22.863985 38 23.986328 C 38 25.108671 37.122343 25.986328 36 25.986328 L 12 25.986328 C 10.877657 25.986328 10 25.108671 10 23.986328 C 10 22.863985 10.877657 21.986328 12 21.986328 z M 12 30.986328 C 9.256343 30.986328 7 33.242671 7 35.986328 C 7 38.729985 9.256343 40.986328 12 40.986328 L 36 40.986328 C 38.743657 40.986328 41 38.729985 41 35.986328 C 41 33.242671 38.743657 30.986328 36 30.986328 L 12 30.986328 z M 12 33.986328 L 36 33.986328 C 37.122343 33.986328 38 34.863985 38 35.986328 C 38 37.108671 37.122343 37.986328 36 37.986328 L 12 37.986328 C 10.877657 37.986328 10 37.108671 10 35.986328 C 10 34.863985 10.877657 33.986328 12 33.986328 z"></path>
                    </svg>
                </div>

                <div class="menu-center">
                    <RouterLink to="/feed" class="text-xl">
                        <img src="./assets/logo2.png" class="w-[70px]">
                    </RouterLink>
                </div>

                <div class="menu-right">
                    <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                        <RouterLink :to="{name:'profile', params:{'id':userStore.user.id}}">
                            <img :src="userStore.user.avatar" class="w-[48px] h-[48px] object-cover rounded-full">
                        </RouterLink>
                    </template>
                    <template v-else>
                        <RouterLink to="/login" class="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Login
                        </RouterLink>
                    </template>
                </div>
            </div>
            <div v-if="showMobileMenu" class="bg-purple-300 text-white absolute left-0 top-28 w-full h-[calc(100vh)] z-50 ">
                <div class="flex flex-col justify-center items-center gap-10 pt-20"
                     v-if="userStore.user.isAuthenticated">
                    <RouterLink to="/feed" class="text-white flex gap-3 items-center  w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                        <span class="text-2xl">
                            Home
                        </span>
                    </RouterLink>

                    <RouterLink to="/chat" class="text-white flex gap-3 items-center  w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" color="white" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                        </svg>
                        <span class="text-2xl">
                            Chat
                        </span>
                    </RouterLink>

                    <RouterLink to="/notifications" class="text-white flex gap-3 items-center  w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                        </svg>
                        <span class="text-2xl">
                            Notifications
                        </span>
                    </RouterLink>

                    <RouterLink to="/search" class="text-white flex gap-3  items-center w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                        <span class="text-2xl">
                            Search
                        </span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
    <main class="px-8 py-6 bg-gray-100">
        <RouterView/>
        <div class="relative">
            <iframe
                class="h-[600px] top-[300px] right-[15px] fixed w-[360px]"
                srcdoc='<body>
                    <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
                    <script src="https://mediafiles.botpress.cloud/ed69382f-fb50-4b95-8607-0f200cf1d953/webchat/config.js" defer></script>
                    </body>'
                width="100%"
                height="100%"
            ></iframe>
        </div>
    </main>

    <Toast/>
</template>

<script>
export default {
    data() {
        return {
            showMobileMenu: false,
        };
    },
    methods: {
        showMenu() {
            console.log(this.showMobileMenu)
            this.showMobileMenu = !this.showMobileMenu;
        },
    },
};
</script>
