<!-- eslint-disable no-prototype-builtins -->
<script setup>
import { ref } from 'vue'
import * as Yup from 'yup'
import { onClickOutside } from '@vueuse/core'

import InputSection from '@/components/basic/InputSection.vue'
import InputModal from '@/components/basic/InputModal.vue'
import ConditionsModal from '@/components/basic/ConditionsModal.vue'
import QueryForm from '@/components/basic/QueryForm.vue'

import query_options from '@/assets/data/query_options.js'

const info_hidden = ref(true)
const info_reponse_hidden = ref(true)
const table = ref('')

const openGroupedByModal = ref(false)
const target_grouped_by = ref(null)
const target_conditions = ref(null)
const openConditionsModal = ref(false)
const querry_type_advanced = ref(false)

const final_query = ref('')

const example_request = `queryType=join^tableReference=users^joinType=left^targetColumn=todos.user_id^localColumn=users.id^groupedBy=todos.status_id$todos.id$users.updated_at$users.id$users.email$todos.action$users$todos.priority^[%users.id=todos.user_id*AND*%users.name=admin]*AND*%26%26queryType=join^joinType=inner^tableReference=status^orderBy=todos.inserted_at^orderSymbol=ASC^limitBy=2500^offsetBy=0^targetColumn=status.id^localColumn=todos.status_id^groupedBy=status$status.id$todos.inserted_at^%status.enum>=0`

const example_result =
  '[\n' +
  ' %{\n' +
  '  “conditions” => “( users.id = todos.user_id AND users.name = ‘admin’ ) AND”,\n' +
  '  “grouped_by” => “todos.status_id, todos.id, users.updated_at, users.id, users.email, todos.action, users, todos.priority”,\n' +
  '  “join_type” => “left”,\n' +
  '  “local_column” => “users.id”,\n' +
  '  “query_type” => “join”,\n' +
  '  “table_reference” => “users”,\n' +
  '  “target_column” => “todos.user_id”\n' +
  ' },\n' +
  ' %{\n' +
  '   “conditions” => “status.enum >= ‘0’“,\n' +
  '   “grouped_by” => “status, status.id, todos.inserted_at”,\n' +
  '   “join_type” => “inner”,\n' +
  '   “limit_by” => “2500",\n' +
  '   “local_column” => “todos.status_id”,\n' +
  '   “offset_by” => “0",\n' +
  '   “order_by” => “todos.inserted_at”,\n' +
  '   “order_symbol” => “ASC”,\n' +
  '   “query_type” => “join”,\n' +
  '   “table_reference” => “status”,\n' +
  '   “target_column” => “status.id”\n' +
  ' }\n' +
  ']\n'

const checkSchema = () => {
  return Yup.object().shape({
    tableReference: Yup.string().required('Required'),
    queryType: Yup.string().required('Required'),
    joinType: Yup.string(),
    targetColumn: Yup.string(),
    localColumn: Yup.string(),
    orderSymbol: Yup.string(),
    limitedBy: Yup.string(),
    offsetBy: Yup.string(),
    orderBy: Yup.string(),
    gropuedBy: Yup.array().of(Yup.string())
  })
}

const closeModal = (modal) => {
  console.log('modal', modal)
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

onClickOutside(target_grouped_by, () => {
  openGroupedByModal.value = false
})

onClickOutside(target_conditions, () => {
  openConditionsModal.value = false
})

const onSubmit = (value) => {
  console.log('value', value)
}

const onInvalidSubmit = (value) => {
  console.log(value)
}
</script>

<template>
  <section class="query">
    <query-form
      @submit="onSubmit"
      :validation-schema="checkSchema()"
      @invalid-submit="onInvalidSubmit"
      v-slot="{ meta }"
    >
      {{ meta }}
      <div class="query-request query-action filters">
        <div class="table-selection">
          <input-section
            name="tableReference"
            label="Table reference"
            :options="query_options.tableReference"
            selection="tableReference"
            v-model="table"
            class="table-reference"
          />
          <input-section
            name="queryType"
            label="Query type"
            :options="query_options.queryType"
            selection="queryType"
            class="query-type"
          />
          <input-section
            name="joinType"
            label="Join type"
            :options="query_options.joinType"
            selection="joinType"
            class="join-type"
          />
          <input-section
            name="targetColumn"
            label="Target column"
            :options="query_options.targetColumn"
            selection="targetColumn"
            class="target-column"
          />
          <input-section
            name="localColumn"
            label="Local column"
            :options="query_options.targetColumn"
            selection="localColumn"
            class="local-column"
          />
          <input-section
            name="orderSymbol"
            label="Order symbol"
            :options="query_options.orderSymbol"
            selection="orderSymbol"
            class="symbol"
          />
          <div class="filter checkbox-section grouped-by">
            <h3>Grouped By</h3>
            <button
              type="button"
              class="checkbox-input"
              @click="openGroupedByModal = true"
              ref="target"
            >
              <p class="checkbox-result">Select</p>
            </button>
            <button class="advanced" @click="querry_type_advanced = !querry_type_advanced">
              {{ querry_type_advanced ? 'Checkbox' : 'Advanced' }}
            </button>
          </div>
          <div class="filter conditions-section grouped-by">
            <h3>Conditions</h3>
            <button
              type="button"
              class="conditions-input"
              @click="openConditionsModal = true"
              ref="target"
            >
              <p class="conditions-result">Select</p>
            </button>
            <button class="advanced" @click="querry_type_advanced = !querry_type_advanced">
              {{ querry_type_advanced ? 'Modal' : 'Advanced' }}
            </button>
          </div>
        </div>
        <div class="btn-wrapper grid">
          <label for="add-or">New table</label>
          <button id="add-or">AND</button>
          <button id="add-or">OR</button>
        </div>
        <div class="unique-fields">
          <input-section
            name="limitBy"
            label="Limit by"
            :options="query_options.limitBy"
            selection="limitBy"
            class="limit"
          />
          <input-section
            name="offsetBy"
            label="Offset by"
            :options="query_options.offsetBy"
            selection="offsetBy"
            class="offset"
          />
          <input-section
            name="orderBy"
            label="Order by"
            :options="query_options.targetColumn"
            selection="orderBy"
            class="order"
          />
        </div>
        <div class="btn-wrapper">
          <button type="submit">Create query</button>
        </div>
      </div>
      <div :class="[`query-request result`, final_query ? 'show' : 'hide']">
        <h2>Result</h2>
        <span>{{ final_query }}</span>
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
            name="groupedBy"
            :options="query_options.targetColumn"
            ref="target_grouped_by"
            @closeModal="closeModal('groupedBy')"
          />
        </div>
        <div v-show="openConditionsModal" class="checkbox-modal">
          <conditions-modal
            name="conditionals"
            :table="table"
            :options="query_options.conditions"
            ref="target_conditions"
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
  &.filters {
    flex-direction: column;
  }
}
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin-bottom: 10px;

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
        display: flex;
        opacity: 0.7;
        padding: 0 10px;
      }
    }
    .checkbox-input {
      margin-left: 25px;
    }
    .conditions-input {
      margin-left: 35px;
    }
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
    z-index: 14;
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
