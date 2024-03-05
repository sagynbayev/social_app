<template>
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div class="main-center col-span-1 md:col-span-3 space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg">
                <FeedForm
                    v-bind:user=null
                    v-bind:posts="posts"
                />
            </div>

            <div v-for="post in posts"
                 v-bind:key="post.id"
                 class="p-4 bg-white border border-gray-200 rounded-lg">
                <FeedItem v-bind:post="post" />
            </div>

        </div>
        <div class="main-right hidden  md:block col-span-1 space-y-4">
            <PeopleYouMayKnow/>
            <Trends/>
        </div>
    </div>
</template>

<script>
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import axios from "axios";
import FeedItem from "@/components/FeedItem.vue";
import FeedForm from "@/components/FeedForm.vue";

export default {
    name: "FeedView",
    components: {FeedForm, FeedItem, Trends, PeopleYouMayKnow},
    data() {
        return {
            posts: [],
            body: '',
        }
    },
    mounted() {
        this.getFeed()
    },
    methods: {
        getFeed() {
            axios
                .get('/api/posts/')
                .then(response => {
                    console.log(response.data)
                    this.posts = response.data
                })
                .catch(error => {
                    console.log("error", error)
                })
        },
    }
}
</script>