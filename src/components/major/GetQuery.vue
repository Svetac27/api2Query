<!-- eslint-disable no-prototype-builtins -->
<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { checkSchema } from '@/schemas/query.js'

import InputSection from '@/components/basic/InputSection.vue'
import InputModal from '@/components/basic/InputModal.vue'
import ConditionsModal from '@/components/basic/ConditionsModal.vue'
import QueryForm from '@/components/basic/QueryForm.vue'

// import { useAuthStore } from '@/stores/auth.store'
// const authStore = useAuthStore()

import query_options from '@/assets/data/query_options.js'
import tables from '@/assets/data/tables.js'
import example from '@/assets/data/example.js'

const example_request = example.example_request
const example_result = example.example_result

const info_hidden = ref(true)
const info_reponse_hidden = ref(true)

const mainTable = ref('')
const referenceTable = ref('')
const joinType = ref('')
const queryType = ref('')

const query_object = ref({})
const conditionals = ref('')
const offsetBy = ref('')
const limitBy = ref('')

const openGroupedByModal = ref(false)
const target_grouped_by = ref(null)
const target_conditions = ref(null)
const openConditionsModal = ref(false)
const grouped_by_advanced = ref(false)
const conditions_advanced = ref(false)

const submit_query = ref('')
const final_query = ref('')

const groupedByModel = ref([])
const finalGroupedBy = ref('')
const target_table_options = ref([])
const local_column_options = ref([])
const grouped_by_options = ref([])
const order_by_options = ref([])
const primary_table = ref('')
const secondary_table = ref('')
const reset = ref(false)

const closeModal = (modal) => {
  switch (modal) {
    case 'groupedBy':
      openGroupedByModal.value = false
      break
    case 'conditions':
      openConditionsModal.value = false
      break
    default:
      break
  }
}

const createGroupedBy = (value) => {
  var groupedBy = ''
  if (value.length > 0) {
    value.forEach((element) => {
      groupedBy += element.name + '$'
    })
    groupedBy = groupedBy.slice(0, -1)
  }
  return groupedBy
}

const option = ref('')
const temporary_result = ref('')
const unique_result = ref('')

const getOperator = (operator) => {
  var operator_object = {}
  query_options.operators.forEach((obj) => {
    if (obj.name == operator) {
      operator_object = obj
    }
  })
  return operator_object.value
}

const addNewTableFunction = (value) => {
  option.value = '*' + value + '*%26%26'
  finalGroupedBy.value = ''
  conditionals.value = ''
}

const creteQueryFunction = () => {
  final_query.value = submit_query.value + unique_result.value
  // final_query.value = temporary_result.value + submit_query.value + unique_result.value
}

const onSubmit = (value) => {
  query_object.value = value
  var group = finalGroupedBy.value ? '^groupedBy=' + finalGroupedBy.value : ''
  var condit = conditionals.value ? '^' + conditionals.value : ''
  var symb = value.orderSymbol == 'Ascending' ? 'ASC' : 'DSC'
  var options_value = option.value ? option.value : ''
  var temp = temporary_result.value
  var symbol = value.orderSymbol != undefined ? '^orderSymbol=' + symb : ''
  var limit = limitBy.value != '' ? '^limitBy=' + limitBy.value : ''
  var offset = offsetBy.value ? '^offsetBy=' + offsetBy.value : ''
  var order = value.orderBy ? '^orderBy=' + value.mainTable + '.' + value.orderBy : ''
  var status = value.status ? '^status' + getOperator(value.status) + '0' : ''
  unique_result.value = symbol + limit + offset + order + status
  submit_query.value =
    temp +
    'queryType=' +
    value.queryType +
    '^tableReference=' +
    value.tableReference +
    '^joinType=' +
    value.joinType +
    '^targetColumn=' +
    value.tableReference +
    '.' +
    value.targetColumn +
    '^localColumn=' +
    mainTable.value +
    '.' +
    value.localColumn +
    group +
    condit
  if (options_value != '') {
    temporary_result.value = temporary_result.value + submit_query.value + options_value
    submit_query.value = ''
  }
  option.value = ''
}

const onInvalidSubmit = (value) => {
  console.log(value)
}

onClickOutside(target_grouped_by, () => {
  openGroupedByModal.value = false
})

onClickOutside(target_conditions, () => {
  openConditionsModal.value = false
})

const getTableOptions = (selection) => {
  var schema = []
  tables.forEach((table) => {
    if (table.name === selection) {
      schema = table.schema
    }
  })
  return schema
}

const getOrderByOptions = () => {
  var firstArray = local_column_options.value
  var secondArray = grouped_by_options.value
  order_by_options.value = Array.from(new Set(secondArray.concat(firstArray)))
}

watch(mainTable, () => {
  local_column_options.value = getTableOptions(mainTable.value)
  primary_table.value = mainTable.value
  local_column_options.value.forEach((element) => {
    element.table = primary_table.value
    grouped_by_options.value.push(element)
  })
})

watch(referenceTable, () => {
  target_table_options.value = getTableOptions(referenceTable.value)
  secondary_table.value = referenceTable.value
  target_table_options.value.forEach((element) => {
    element.table = secondary_table.value
    grouped_by_options.value.push(element)
  })
  getOrderByOptions()
})

watch(groupedByModel, () => {
  var result = ''
  groupedByModel.value.forEach((element) => {
    console.log('ELEMENT', element)
    result += '$' + element.table + '.' + element.name
  })
  finalGroupedBy.value = result.substring(1)
})
</script>

<template>
  <section class="query">
    <query-form
      @submit="onSubmit"
      :validation-schema="checkSchema()"
      @invalid-submit="onInvalidSubmit"
      v-slot="{ meta }"
    >
      <div class="query-request query-action filters">
        <div class="temporary">
          <h3 v-if="temporary_result">Temporary Query</h3>
          <div class="final-result">
            {{ temporary_result }}
          </div>
        </div>
        <div ref="myForm" class="table-selection">
          <input-section
            v-show="!reset"
            name="mainTable"
            label="Main Table"
            :options="tables"
            selection="joinTable"
            class="table-main"
            v-model="mainTable"
          />
          <input-section
            name="tableReference"
            label="Table reference"
            :options="tables"
            selection="tableReference"
            class="table-reference"
            v-model="referenceTable"
          />
          <input-section
            name="queryType"
            label="Query type"
            :options="query_options.queryType"
            selection="queryType"
            class="query-type"
            v-model="queryType"
          />
          <input-section
            name="joinType"
            label="Join type"
            :options="query_options.joinType"
            selection="joinType"
            class="join-type"
            v-model="joinType"
          />
          <input-section
            v-if="target_table_options.length > 0"
            name="targetColumn"
            label="Target column"
            :options="target_table_options"
            selection="targetColumn"
            class="target-column"
          />
          <input-section
            v-if="local_column_options.length > 0"
            name="localColumn"
            label="Local column"
            :options="local_column_options"
            selection="localColumn"
            class="local-column"
          />
          <div v-if="grouped_by_options.length > 0" class="filter checkbox-section grouped-by">
            <h3>Grouped By</h3>
            <button
              type="submit"
              class="checkbox-input"
              @click="openGroupedByModal = true"
              ref="target"
            >
              <div class="checkbox-result">
                <p>
                  {{ groupedByModel.length != 0 ? finalGroupedBy : 'Select' }}
                </p>
                <span v-if="groupedByModel.length != 0">
                  {{ finalGroupedBy }}
                </span>
              </div>
            </button>
            <button
              type="button"
              class="btn advanced"
              @click="grouped_by_advanced = !grouped_by_advanced"
            >
              {{ grouped_by_advanced ? 'Checkbox' : 'Advanced' }}
            </button>
          </div>
          <div v-if="primary_table && secondary_table" class="filter conditions-section conditions">
            <h3>Conditions</h3>
            <button
              type="button"
              class="conditions-input"
              @click="openConditionsModal = true"
              ref="target"
            >
              <div class="conditions-result">
                <p>
                  {{ conditionals != '' ? conditionals : 'Select' }}
                </p>
                <span v-if="conditionals != ''">
                  {{ conditionals }}
                </span>
              </div>
            </button>
            <button
              type="button"
              class="btn advanced"
              @click="conditions_advanced = !conditions_advanced"
            >
              {{ conditions_advanced ? 'Modal' : 'Advanced' }}
            </button>
          </div>
        </div>
        <div class="btn-wrapper grid">
          <label for="add-or">New table</label>
          <button
            type="submit"
            :disabled="!meta.valid"
            id="add-or"
            class="btn"
            @click="addNewTableFunction('AND')"
          >
            AND
          </button>
          <button
            :disabled="!meta.valid"
            id="add-or"
            class="btn"
            @click="addNewTableFunction('OR')"
          >
            OR
          </button>
        </div>
        <div class="unique-fields">
          <input-section
            name="orderSymbol"
            label="Order symbol"
            :options="query_options.orderSymbol"
            selection="orderSymbol"
            class="symbol"
          />
          <div class="input-field limit">
            <label for="limit_by">Limit by</label>
            <input name="limitBy" id="limit_by" class="limit" v-model="limitBy" />
          </div>
          <div class="input-field offset">
            <label for="offset_by">Offset By</label>
            <input name="offsetBy" label="Offset by" class="offset" v-model="offsetBy" />
          </div>
          <input-section
            v-if="mainTable && secondary_table"
            name="orderBy"
            label="Order by"
            :options="order_by_options"
            selection="orderBy"
            class="order"
          />
          <input-section
            name="status"
            label="Status"
            :options="query_options.operators"
            selection="status"
            class="symbol"
          />
        </div>
        <div class="btn-wrapper">
          <button type="submit" class="btn" @click="creteQueryFunction()">Create query</button>
        </div>
      </div>
      <div :class="[`query-request result`, final_query ? 'show' : 'hide']">
        <h2>Result</h2>
        <div class="final-result">
          {{ final_query }}
        </div>
      </div>
      <div class="query-request query-example">
        <h2>Request</h2>
        <button @click="info_reponse_hidden = !info_reponse_hidden" class="info-btn">i</button>
        <div :class="['info', { hidden: info_reponse_hidden }]">
          <pre>{{ example_result }}</pre>
        </div>
      </div>
      <div class="query-request query-example">
        <h2>Query</h2>
        <button @click="info_hidden = !info_hidden" class="info-btn">i</button>
        <div :class="['info', { hidden: info_hidden }]">
          <pre>{{ example_request }}</pre>
        </div>
      </div>
      <div class="modals">
        <div v-show="openGroupedByModal" class="checkbox-modal">
          <input-modal
            v-if="grouped_by_options.length > 0"
            name="groupedBy"
            :options="grouped_by_options"
            ref="target_grouped_by"
            v-model="groupedByModel"
            @closeModal="closeModal('groupedBy')"
          />
        </div>
        <div v-if="openConditionsModal" class="checkbox-modal">
          <conditions-modal
            name="conditionals"
            :primary="primary_table"
            :secondary="secondary_table"
            ref="target_conditions"
            v-model="conditionals"
            @closeModal="closeModal('conditions')"
          />
        </div>
      </div>
    </query-form>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.query-request {
  .temporary {
    display: flex;
    margin-bottom: 20px;
    h3 {
      margin-right: 20px;
    }
    .final-result {
      max-width: 75vw;
      padding: 0 10px;
      overflow-wrap: break-word;
    }
  }
  &.filters {
    flex-direction: column;
  }
  .input-field {
    display: flex;
    justify-content: space-between;
    margin-right: 100px;
    margin-bottom: 20px;
    label {
      width: 180px;
    }
    input {
      height: 30px;
    }
  }
}
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin-bottom: 15px;

  &.conditions-section,
  &.checkbox-section {
    button {
      width: 100px;
      height: 30px;
      min-width: 100px;
      cursor: pointer;
    }
    .conditions-input,
    .checkbox-input {
      width: 356px;
      height: 30px;
      padding: 0;
      .conditions-result,
      .checkbox-result {
        display: block;
        padding: 0 10px;
        p {
          opacity: 0.7;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          display: none;
        }
        &:hover {
          span {
            display: flex;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 25%;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0px 2px 10px rgba(29, 37, 45, 0.15);
            max-width: 80%;
            word-break: break-all;
          }
        }
      }
    }
    .checkbox-input {
      margin-left: 25px;
    }
    .conditions-input {
      margin-left: 35px;
    }
  }
  &.table-main {
    z-index: 21;
  }
  &.table-reference {
    z-index: 20;
  }
  &.query-type {
    z-index: 19;
  }
  &.join-type {
    z-index: 18;
  }
  &.target-column {
    z-index: 17;
  }
  &.local-column {
    z-index: 16;
  }
  &.symbol {
    z-index: 15;
  }
  &.grouped-by {
    z-index: 14;
  }
  &.conditions {
    z-index: 13;
  }
  &.limit {
    z-index: 12;
  }
  &.offset {
    z-index: 11;
  }
  &.order {
    z-index: 10;
  }
  &.status {
    z-index: 9;
  }
}
.query .query-request.query-action {
  input.select {
    min-width: 300px;
    width: 80%;
    height: 30px;
    margin-right: 20px;
    margin-left: 0;
  }
}
.query-request.result {
  padding: 30px 20px 50px;
  background-color: rgba(white, 0.2);
  display: grid;
  .final-result {
    width: 85vw;
    display: inline-block;
    word-wrap: break-word;
  }
  h2 {
    margin-bottom: 20px;
  }
  &.hide {
    display: none;
  }
}
.modals {
  .checkbox-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 0.7);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
