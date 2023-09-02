<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
    label: {
        type: String || Number,
        default: ""
    },
    modelValue: [String, Number],
    inputType: {
        type: String,
        default: ""
    },
    inputId: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String
    },
    isRequired: {
        type: Boolean,
        default: false
    }
})

const message = ref("");
const mColor = ref(false)

function validate() {
    if (typeof props.modelValue === 'string') {
        if (props.inputType === "email") {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(props.modelValue)) {
                message.value = "آدرس ایمیل معتبر است";
                mColor.value = true;
            } else {
                message.value = "آدرس ایمیل وارد شده معتبر نیست";
                mColor.value = false;
            }
        } else if (props.inputType === "password") {
            const re = /^(?=.*[a-zA-Zآ-ی]).{7,}$/;
            // const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{7,}/;
            if (re.test(props.modelValue)) {
                message.value = "رمز عبور معتبر است";
                mColor.value = true;
            } else {
                message.value = "رمز عبور نامعتبر است";
                mColor.value = false;
            }
        } else if (props.inputType === "text" || props.inputType === "textarea") {
            if (props.modelValue.length >= 3) {
                message.value = "ورودی معتبر است";
                mColor.value = true;
            } else {
                message.value = "ورودی نامعتبر است";
                mColor.value = false;
            }
        }
    }

    if (!props.modelValue) {
        mColor.value = true;
    }
}


onMounted(() => {
    mColor.value = false;
});
</script>

<template>
    <div class="inputBox">
        <label class="label">{{ inputId }}</label>
        <input :type="inputType" :value="modelValue" :required="isRequired" :placeholder="placeholder"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value), validate()"
            @keyup="$emit('update:modelValue', ($event.target as HTMLInputElement).value), validate()" />
        <span v-if="modelValue !== null && message" class="message"
            :style="[mColor ? { color: '#159347' } : { color: 'red' }]">{{ message }}</span>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.inputBox {
    direction: rtl;
    margin-bottom: 1em;
    width: 100%;
    position: relative;

    label {
        color: $dOp-7;
    }

    input {
        width: 100%;
        padding: 0.9em 1em;
        border: none;
        outline: none;
        border: 1px solid lighten($color-border, 5%);
        border-radius: 6px;
        font-size: 1em;
        // margin-bottom: 0.7em;
        text-align: right;
        &:hover,&:focus{
            border-bottom: $primary 1px solid;
        }

    }

    z-index: 100;
}

.message {
    position: absolute;
    display: flex;
    top: 0;
    left: .5em;
    font-size: .8em;
}
</style>