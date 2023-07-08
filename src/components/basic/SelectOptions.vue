<script setup>
import { ref } from 'vue'
import { onClickOutside, debounceFilter, watchWithFilter } from '@vueuse/core'
import ChevronDown from '@/assets/icons/ChevronDown.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selection: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['result'])

const input_value = ref('')
const optionsModal = ref(false)
const target = ref(null)
const options = ref(props.items)

const openOptionsModal = () => {
  optionsModal.value = !optionsModal.value
  options.value = props.items
}

onClickOutside(target, () => {
  optionsModal.value = false
})

const choseOptions = (item) => {
  var result_item = typeof item == 'number' ? { value: item.toString() } : item
  input_value.value = item.name || item
  var result = {
    target: result_item,
    selection: props.selection
  }
  emit('result', result)
}

watchWithFilter(
  input_value,
  () => {
    options.value = props.items.filter((item) => {
      return typeof item == 'number'
        ? item.toString()
        : item.name.toLowerCase().includes(input_value.value.toLowerCase())
    })
  },
  {
    eventFilter: debounceFilter(500)
  }
)
</script>

<template>
  <section class="dropdown" @click="openOptionsModal" ref="target">
    <input type="text" placeholder="Select" class="select-input" v-model="input_value" />
    <chevron-down :class="[`icon ${optionsModal ? 'down' : 'up'}`]"></chevron-down>
    <div v-show="optionsModal" class="dropdow_toggle">
      <div v-for="(item, index) in options" :key="index" class="dropdown_toggle_items">
        <button class="item" @click="choseOptions(item)">{{ item.name || item }}</button>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.dropdown {
  padding: 0;
  position: relative;
  cursor: pointer;
  input.select-input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 10px;
  }
  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s ease-in-out;
    &.down {
      transform: translateY(-50%) rotate(180deg);
      transition: transform 0.3s ease-in-out;
    }
  }
  .dropdow_toggle {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 5px 0;
    width: 100%;
    background-color: white;
    border-radius: 0 0 7px 7px;
    box-shadow: 0px 0px 15px #0000001a;
    .dropdown_toggle_items {
      .item {
        display: flex;
        cursor: pointer;
        padding: 7px 15px;
        width: 100%;
        border: 0;
        background-color: transparent;
      }
    }
  }
}
</style>
