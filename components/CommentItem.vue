<template>
    <div class="comment" >
        <a class="avatar">
            <img :src="data.avatar">
        </a>
        <div class="content">
            <a class="author">{{data.author}}</a>
            <div class="metadata">
                <span class="date">{{data.create}}</span>
            </div>
            <div class="text">{{data.text}}</div>
            <div class="actions">
                <a class="reply" v-if="reply">回复</a>
            </div>
        </div>
        <comment-item v-if="data.comment"></comment-item>
    </div>
</template>

<script>
    export default {
        name: "comment-item",
        props:{
            data:{
                type:Object
            },
            reply:{
                type:Boolean,
                default:true
            }
        }
    }
</script>

<style scoped>

</style>