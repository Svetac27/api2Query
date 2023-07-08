<script setup>
import { ref, toRef } from 'vue'
import { useField } from 'vee-validate'
import InputSection from '@/components/basic/InputSection.vue'
import tables from '@/assets/data/tables.js'

import query_options from '@/assets/data/query_options.js'

const operators = query_options.operators

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  primary: {
    type: String,
    default: ''
  },
  secondary: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['closeModal', 'onBlur', 'update:modelValue'])
const name = toRef(props, 'name')

var tab = []
const first_table = ref('')
const first_field = ref('')
const operator = ref('')
const second_table = ref('')
const second_field = ref('')
const condition = ref('')
const section = ref('')

const { value: inputValue, handleBlur } = useField(name, undefined, {
  initialValue: props.value
})

const onInputBlur = (event) => {
  handleBlur(event)
  emit('onBlur', event)
}

const getOperator = (operator) => {
  var operator_object = {}
  operators.forEach((obj) => {
    if (obj.name == operator) {
      operator_object = obj
    }
  })
  return operator_object.value
}
const getCondition = (oper) => {
  var condition =
    '%' +
    first_table.value +
    '.' +
    first_field.value +
    getOperator(operator.value) +
    second_table.value +
    '.' +
    second_field.value +
    oper
  first_table.value = ''
  first_field.value = ''
  operator.value = ''
  second_table.value = ''
  second_field.value = ''
  return condition
}

const newFunction = (action) => {
  switch (action) {
    case 'add':
      condition.value += getCondition('*AND*')
      break
    case 'or':
      condition.value += getCondition('*OR*')
      break
    case 'section':
      if (props.modelValue != '' && section.value == '') {
        section.value = props.modelValue
      }
      condition.value += getCondition('')
      var and = section.value != '' ? '*AND*' : ''
      console.log(section.value, 'SECTION')
      section.value += and + '[' + condition.value + ']'
      condition.value = ''
      break
  }
}

const saveOptions = () => {
  emit('update:modelValue', section.value)
  emit('closeModal')
}

const getOptions = (choose, table) => {
  switch (choose) {
    case 'table':
      if (table == undefined) tab = [{ name: props.primary }, { name: props.secondary }]
      else {
        tab = tab.filter((obj) => obj.name !== table)
      }
      return tab
    case 'field':
      var options = tables.find((element) => element.name === table)
      return options.schema
  }
}

const closeModal = () => {
  emit('closeModal')
}
</script>
<template>
  <div class="modal">
    <button type="button" @click="closeModal" class="close-icon">&#10005;</button>
    <div class="conditions-wrapper">
      <label>Select Conditions</label>
      <div v-if="modelValue != '' || section">
        <span>Condition Section: {{ modelValue ? modelValue : section }}</span>
      </div>
      <div v-if="condition">
        <span>Condition: {{ condition }}</span>
      </div>
      <div class="conditions">
        <div class="condition-section">
          <input-section
            name="first_table"
            label="Table"
            :options="getOptions('table')"
            v-model="first_table"
            noButton
          />
          <input-section
            v-if="first_table"
            name="first_field"
            label="Field"
            :options="getOptions('field', first_table)"
            v-model="first_field"
            noButton
          />
        </div>
        <input-section
          v-if="first_field"
          name="operator"
          label="Operator"
          :options="operators"
          v-model="operator"
          noButton
        />
        <div class="condition-section">
          <input-section
            v-if="operator"
            name="second_table"
            label="Table"
            :options="getOptions('table', first_table)"
            v-model="second_table"
            noButton
          />
          <input-section
            v-if="second_table"
            name="second_field"
            label="Field"
            :options="getOptions('field', second_table)"
            v-model="second_field"
            noButton
          />
        </div>
      </div>
      <div class="bottom">
        <div class="btn-wrapper">
          <button
            :disabled="second_field == ''"
            type="button"
            class="save-btn"
            @blur="onInputBlur"
            @click="newFunction('section')"
          >
            NEW ARRAY
          </button>
          <button
            :disabled="second_field == ''"
            type="button"
            class="save-btn"
            @blur="onInputBlur"
            @click="newFunction('add')"
          >
            ADD
          </button>
          <button
            :disabled="second_field == ''"
            type="button"
            class="save-btn"
            @blur="onInputBlur"
            @click="newFunction('or')"
          >
            OR
          </button>
        </div>
        <div class="btn-wrapper">
          <button
            :disabled="section == ''"
            type="button"
            class="save-btn"
            @blur="onInputBlur"
            @click="saveOptions"
          >
            SAVE OPTIONS
          </button>
        </div>
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
    min-width: 740px;
    min-height: 500px;
    padding: 40px 50px;
    label {
      font-size: 16px;
      font-weight: 600;
    }
    .conditions {
      margin-top: 20px;
      position: relative;
      z-index: 5;
      .condition-section {
        display: flex;
      }
      > .filter {
        width: 220px;
      }

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
    .bottom {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
    .btn-wrapper {
      padding-right: 0;
      padding-bottom: 0;
      grid-gap: 10px;
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
