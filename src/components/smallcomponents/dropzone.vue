<template>
    <div class="" @dragover.prevent @drop.prevent>
        <div @drop="dragFile" class="dropDiv">
            <label for="inputTag">
                <Icon class="inputTag">
                    <Dismiss20Regular />
                </Icon>
                <input class="file" id="inputTag" name="file" accept="image/*" type="file" @change="uploadFile" required/>
            </label>
            <p v-if="!useAuth.File.length">تصاویر را بکشید و رها کنید، یا برای انتخاب فایل‌ها کلیک کنید</p>
            <ul v-if="useAuth.File.length">
                <li v-for="file in useAuth.File" :key="file.name">
                    <span @click="remove()">
                        <Icon size="18">
                            <Dismiss20Regular />
                        </Icon>
                    </span>
                    <img :src="generateURL(file)" :alt="file.name">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@vicons/utils";
import {
    Dismiss20Regular
} from "@vicons/fluent";
import { ref } from "vue";
const useAuth = useAuthStore()
const uploadFile = (e: any) => {
    useAuth.File = e.target.files
}

const dragFile = (e: any) => {
    useAuth.File = []

    const files = [...e.dataTransfer.files];
    files.forEach((e) => {
        useAuth.File.push(e)
    })
}

const generateURL = (file: any) => {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
}
const remove = () => {
    useAuth.File = [];
}



</script>
<style lang="scss" scoped>
.dropDiv {
    max-height: 8em;
    min-height: 8em;
    height: fit-content;
    row-gap: 16px;
    border: 1px dashed #cccccc;
    border-radius: 10px;
    transition: 0.3s ease all;
    // background-color: #0E9F6E;

    // padding: 0.5em;
    position: relative;
    color: #3c4254;

    .inputTag {
        width: 100%;
        max-height: 7rem;
        min-height: 7rem;
        opacity: 0;
        position: absolute;
        top: 0;
        // background-color: #3c4254;
    }

    &:hover {
        border: 1px dashed #0E9F6E;
        background: #fff;
    }

    input[type='file'] {
        display: none;
    }

    p {
        position: absolute;
        top: 1rem;
        width: 100%;
        text-align: center;
    }

    ul {
        // background-color: aqua;
        // width: 50%;
        margin: 0 auto;
        display: flex;
        // flex-wrap: wrap;

        li {
            z-index: 1000;
            position: relative;
            list-style-type: none;
            
            // list-style: none;
            // width: 100%;
            
            // background-color: rgb(255, 0, 200);

            &:hover {
                span {
                    opacity: 1;
                }
            }

            span {
                position: absolute;
                right: 0.5em;
                top: 0.5em;
                border-radius: 50%;
                display: flex;
                background: rgba(255, 255, 255, 0.603);
                opacity: 0;

            }

            // background-color: #0E9F6E;
            img {
                max-height: 6rem;
                // width: 100%;

                border-radius: 5px;
                margin: .5em;
            }
        }
    }
}
</style>