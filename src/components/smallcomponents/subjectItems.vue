<script setup lang="ts">
import { ref } from 'vue';
import { mainStore } from "@/stores/main";
import { Icon } from "@vicons/utils";
import {
    Delete24Regular
} from "@vicons/fluent";
const firstInput = ref('')
const secondInput = ref('')
const itemArray = ref<string[]>([])
const useMain = mainStore();
const pushItem = () => {
    if (firstInput.value && secondInput.value) {
        itemArray.value.push(firstInput.value)
        itemArray.value.push(secondInput.value)
        useMain.subjectItems.unshift(itemArray.value)
        firstInput.value = ''
        secondInput.value = ''
        itemArray.value = []
        window.document.getElementById('firstInput')?.focus()
    }
}
const remove = (i: any) => {
    useMain.subjectItems.splice(i, 1);
}

</script>
<template >
    <div class="spec-inputs">
        <form @submit.prevent="pushItem">
            <input id="firstInput" type="text" v-model="firstInput" required autocomplete="off">
            <input type="number" v-model="secondInput" @keydown.enter="pushItem">
            <button type="submit">افزدون</button>
        </form>
    </div>
    <ul v-if="useMain.subjectItems.length">
        <transition-group name="specList" appear>
            <li v-for="item in useMain.subjectItems" :key="item">
                <span>{{ item[0] }}</span>
                <span>{{ item[1] }}</span>
                <span class="trash" @click="remove(useMain.subjectItems.indexOf(item))">
                    <Icon color="red">
                        <Delete24Regular />
                    </Icon>
                </span>
            </li>
        </transition-group>
    </ul>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

.spec-inputs {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    input {
        width: 40%;
        border: none;
        outline: none;
        padding: 0.9em 1em;
        border: 1px solid lighten($color-border, 5%);
        font-size: 1em;
        text-align: right;

        &:first-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-right: #cccccc 1px solid;
        }

        &:focus {
            border-bottom: $primary 1px solid;
        }
    }


    button {
        width: 20%;
        height: 3em;
        font-size: 15px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background: $primary;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
    }
}

ul {
    overflow-y: scroll;
    width: 100%;
    border-radius: 5px;
    min-height: 12rem;
    max-height: 12rem;
    margin: 1em 0;
    position: relative;
    list-style-type: none;
    padding: 0;
    @include hideScrollbar();

    &:hover {
        @include scrollbar();
    }

    li {
        width: 98%;
        display: flex;
        align-items: center;
        padding: 0.3em;
        margin: 0.3em;
        border-radius: 5px;
        height: 2.5rem;
        background: transparent;
        transition: 0.3s ease all;
        box-shadow: 0 2px 3px 0 rgba(136, 137, 138, 0.37),
            0 -1px 3px 0 rgba(160, 160, 160, 0.085);
        // border-bottom: #cccccc 1px solid;
        position: relative;
        color: rgba(0, 0, 0, 0.7);

        span {
            width: 50%;
            padding-right: 0.3em;

        }

        .trash {
            display: none;
            position: absolute;
            width: 3rem;
            top: 0.3em;
            bottom: 0.3em;
            left: 1em;
            cursor: pointer;
        }
        
        &:hover {
            background: rgba(244, 245, 247);
            
            .trash {
                display: block;
                color: $red;
                
                &:last-child {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}

.specList-enter-from {
    opacity: 0;
    transform: scale(0);
}

.specList-enter-to {
    opacity: 1;
    transform: scale(1);
}

.specList-enter-active {
    transition: all 0.5s ease;
}

.specList-leave-from {
    opacity: 1;
    transform: scale(1);
}

.specList-leave-to {
    opacity: 0;
    transform: scale(0);
}

.specList-leave-active {
    transition: all .4s ease;
    position: absolute;
}

.specList-move {
    transition: all 0.3s ease;
}
</style>