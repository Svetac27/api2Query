<script setup>
import { ref, toRef } from 'vue'
import { useField } from 'vee-validate'
import InputSection from '@/components/basic/InputSection.vue'

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
  }
})

const emit = defineEmits(['closeModal', 'onBlur'])

const result = ref([])
const options = ref(props.options)
const name = toRef(props, 'name')
const conditions = ref()
const operator = ref()

const operators = [
  { name: 'Equal (=)', value: '=' },
  { name: 'More or Equal (>=)', value: '>=' },
  { name: 'Less or Equal (<=)', value: '<=' },
  { name: 'Less (<)', value: '<' },
  { name: 'More (>)', value: '>' },
  { name: 'Contein', value: 'HAS' }
]
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

const addNew = () => {
  console.log('addNew')
  console.log(conditions.value)
  console.log(operator.value)
  console.log(tip.value)
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
  emit('closeModal')
}

const closeModal = () => {
  emit('closeModal')
}
</script>
<template>
  <div class="modal">
    <button type="button" @click="closeModal" class="close-icon">&#10005;</button>
    <div v-if="table == ''" class="empty-table">First select Table reference, please</div>
    <div v-else class="conditions-wrapper">
      <label>Select Conditions</label>
      <div class="conditions">
        <span>{{ table }}. </span>
        <select name="conditions" id="conditions" class="">
          <option value="" disabled selected>Select</option>
          <option v-for="(item, index) in options" :key="index" value="index" v-modal="conditions">
            {{ item.name }}
          </option>
        </select>
        <select name="operator" id="operator">
          <option value="" disabled selected>Select</option>
          <option v-for="(item, index) in operators" :key="index" value="index" v-modal="operator">
            {{ item.name }}
          </option>
        </select>
        <input type="text" v-model="tip" class="tip" />
      </div>
      <div class="btn-wrapper">
        <button type="button" class="save-btn" @blur="onInputBlur" @click="addNew">ADD NEW</button>
      </div>
      <div class="btn-wrapper">
        <button type="button" class="save-btn" @blur="onInputBlur" @click="saveOptions">
          SAVE OPTIONS
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.modal {
  position: relative;
  background-color: white;
  min-width: 500px;
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
  .empty-table {
    padding: 80px 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .conditions-wrapper {
    padding: 40px 50px;
    label {
      font-size: 16px;
      font-weight: 600;
    }
    .conditions {
      margin-top: 20px;
      display: flex;
      span {
        font-size: 18px;
      }
      select {
        width: 140px;
        margin: 0 10px;
      }
      .tip {
        margin-left: 10px;
      }
    }
    .btn-wrapper {
      padding-right: 0;
      padding-bottom: 0;
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
