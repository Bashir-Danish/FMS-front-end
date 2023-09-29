<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { mainStore } from "@/stores/main";
import { Icon } from "@vicons/utils";
import { Dismiss20Regular } from "@vicons/fluent";
import { RadarSpinner } from 'epic-spinners'
import { onMounted, watch } from "vue";
const props = defineProps({
    store: { type: String, required: true },
    loading: { type: Boolean, required: false, default: false },
});

const emits = defineEmits(["selectImage"]);

let store = mainStore();

const uploadFile = (e: any) => {
    store.File = [];
    const files = [...e.target.files];
    files.forEach((e) => {
        store.File.push(e);
    });
    emits("selectImage");
};

const dragFile = (e: any) => {
    store.File = [];
    const files = [...e.dataTransfer.files];
    files.forEach((e) => {
        store.File.push(e);
    });
    emits("selectImage");
};

const generateURL = (file: any) => {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
};

const remove = () => {
    store.File = [];
};



</script>

<template>
    <div class="" @dragover.prevent @drop.prevent>
        <div @drop="dragFile" class="dropDiv">
            <label for="inputTag">
                <Icon class="inputTag">
                    <Dismiss20Regular />
                </Icon>
                <input class="file" id="inputTag" name="file" accept="image/*" type="file" @change="uploadFile($event)"
                    required :disabled="loading" />
                <p v-if="!store.File.length && !loading">
                    تصاویر را بکشید و رها کنید، یا برای انتخاب فایل‌ کلیک کنید
                </p>
                <div class="loader" v-else-if="loading">
                    <radar-spinner :animation-duration="2000" :size="50" color="#007bff" />
                </div>
            </label>
            <ul v-if="store.File.length && !loading">
                <li v-for="file in store.File" :key="file.name">
                    <span @click="remove()">
                        <Icon size="18">
                            <Dismiss20Regular />
                        </Icon>
                    </span>
                    <img :src="generateURL(file)" :alt="file.name" />
                </li>
            </ul>
        </div>
    </div>
</template>

  
<style lang="scss" scoped>
.dropDiv {
    max-height: 8em;
    min-height: 8em;
    height: fit-content;
    row-gap: 16px;
    border: 1px dashed #cccccc;
    border-radius: 10px;
    transition: 0.3s ease all;
    position: relative;
    color: #3c4254;

    .inputTag {
        width: 100%;
        max-height: 7rem;
        min-height: 7rem;
        opacity: 0;
        position: absolute;
        top: 0;
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

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 8em;
        min-height: 8em;
        background-color: transparent;
        box-shadow: none;
    }

    ul {
        margin: 0 auto;
        display: flex;

        li {
            z-index: 1000;
            position: relative;
            list-style-type: none;

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

            img {
                max-height: 6rem;
                border-radius: 5px;
                margin: .5em;
            }
        }
    }
}
</style>