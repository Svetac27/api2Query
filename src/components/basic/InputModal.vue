<script setup>
import { ref, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  table: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array
  }
})

const emit = defineEmits(['update:modelValue', 'closeModal', 'onBlur'])

const result = ref([])
const options = ref(props.options)
const name = toRef(props, 'name')

const {
  value: inputValue,
  // errorMessage,
  handleBlur
} = useField(name, undefined, {
  initialValue: props.value
})

const onInputBlur = (event) => {
  handleBlur(event)
  emit('onBlur', event)
}

const saveOptions = () => {
  var final_result = []
  options.value.forEach((element, index) => {
    if (result.value[index]) {
      element.checked = true
      final_result.push(element)
    } else {
      element.checked = false
    }
  })
  inputValue.value = final_result
  emit('update:modelValue', inputValue.value)
  emit('closeModal')
}

const closeModal = () => {
  emit('closeModal')
}
</script>
<template>
  <div class="modal">
    <button type="button" @click="closeModal" class="close-icon">&#10005;</button>
    <div class="checkbox-wrapper">
      <div v-for="(check, index) in options" :key="index" class="checkbox">
        <input :id="check.name + '-' + check.table" type="checkbox" v-model="result[index]" />
        <label :for="check.name + '-' + check.table"> {{ check.name }} ({{ check.table }}) </label>
      </div>
    </div>
    <div class="btn-wrapper">
      <button type="button" class="save-btn" @blur="onInputBlur" @click="saveOptions">
        SAVE OPTIONS
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.modal {
  position: relative;
  background-color: white;
  min-width: 500px;
  min-height: 300px;
  border-radius: 7px;
  color: black;
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      color: grey;
    }
  }
  .checkbox-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 40px 50px;
  }
  .checkbox {
    display: flex;
    align-items: center;
    input {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      padding: 5px 0;
      cursor: pointer;
    }
    label {
      min-width: 100px;
      padding: 5px 0;
      cursor: pointer;
    }
    &:hover {
      opacity: 0.7;
    }
  }
  .save-btn {
    background-color: $primary;
    color: white;
    width: 150px;
    height: 40px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
