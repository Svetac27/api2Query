<script setup>
import { ref, toRef } from 'vue'
import { useField } from 'vee-validate'

import SelectOptions from '../basic/SelectOptions.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  selection: {
    type: String
  },
  modelValue: {
    type: String,
    default: ''
  },
  noButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'onBlur'])
const name = toRef(props, 'name')
const querry_type_advanced = ref(false)

const {
  value: inputValue,
  errorMessage,
  handleBlur
} = useField(name, undefined, {
  initialValue: props.value
})

const onInputBlur = (event) => {
  handleBlur(event)
  emit('onBlur', event)
}

const handleInput = (e) => {
  inputValue.value = e.target.name
  emit('update:modelValue', inputValue.value)
}
</script>
<template>
  <div :class="{ filter: true, 'filter-error': !!errorMessage }">
    <h3>{{ label }}</h3>
    <select-options
      @blur="onInputBlur"
      v-if="!querry_type_advanced"
      :items="options"
      :selection="selection"
      @result="handleInput"
      class="select"
    />
    <input
      @blur="onInputBlur"
      @input="handleInput"
      :value="inputValue"
      v-else
      type="text"
      class="select advanced-input"
      placeholder="Type filter"
    />
    <button
      v-if="!noButton"
      type="button"
      class="btn advanced"
      @click="querry_type_advanced = !querry_type_advanced"
    >
      {{ querry_type_advanced ? 'Dropdown' : 'Advanced' }}
    </button>
    <span v-show="!!errorMessage" :class="{ 'text--error': !!errorMessage }">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.filter {
  h3 {
    width: 200px;
  }
  .select {
    min-width: 300px;
    height: 30px;
    margin-right: 20px;
    width: 80%;
    &.advanced-input {
      height: 30px;
      margin-left: 0;
      width: 80%;
      padding: 0 10px;
    }
  }
  button {
    width: 100px;
    height: 30px;
    min-width: 100px;
    cursor: pointer;
  }
  .text--error {
    position: absolute;
    left: 150px;
    bottom: -17px;
    color: red;
    z-index: -1;
  }
  &.filter-error > .select {
    border: 1px solid red;
  }
}
</style>
