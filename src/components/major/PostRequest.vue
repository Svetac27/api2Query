<script setup>
import { ref } from 'vue'

const info_hidden = ref(true)
const info_reponse_hidden = ref(true)

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

const query = ref('')
const result = ref([])

const prefix = 'conditions'
const separator_queryType = 'queryType'
const separator_element = '^'

const arrangePieces = (pieces) => {
  var arranged_queries = {}
  var piece
  var last_element = pieces.length - 1
  pieces[last_element] = prefix + '=' + pieces[last_element]
  for (var i = 0; i < pieces.length; i++) {
    var key
    var value
    pieces[i] = pieces[i].replace(/\*AND\*/g, ' AND ')
    pieces[i] = pieces[i].replace(/\*OR\*/g, ' OR')
    pieces[i] = pieces[i].replace(/\$/g, ', ')
    pieces[i] = pieces[i].replace(/%/g, '')
    if (i === last_element) {
      var element = pieces[i]
      var index = element.indexOf('=')
      if (index !== -1) {
        key = element.substring(0, index)
        value = element.substring(index + 1)
      }
    } else {
      piece = pieces[i].split(/(?<!\[)=/)
      key = piece[0].replace(/([A-Z])/g, '_$1').toLowerCase()
      value = piece[1]
    }
    arranged_queries[key] = value
  }
  return arranged_queries
}
const createResult = (query) => {
  var queri_pieces = query.split(separator_queryType)
  var unreordered_queries = []
  for (var i = 1; i < queri_pieces.length; i++) {
    var pieces = (separator_queryType + queri_pieces[i]).split(separator_element)
    var query_element = arrangePieces(pieces)
    unreordered_queries.push(query_element)
  }

  const final_queries = unreordered_queries.map((query) => {
    const reordered_query = {}

    Object.keys(query)
      .sort()
      .forEach((key) => {
        reordered_query[key] = query[key]
      })

    return reordered_query
  })

  return JSON.stringify(final_queries, null, 2)
}

const sendQuery = (type) => {
  if (type == 'post' && query.value == '') alert('Please enter a query')
  else result.value = createResult(type == 'example' ? example_request : query.value)
}

const clearQuery = () => {
  query.value = ''
  result.value = []
}
</script>

<template>
  <section class="query">
    <div class="query-request query-example">
      <h2>HTTP Post Request</h2>
      <button @click="info_hidden = !info_hidden" class="info-btn">i</button>
      <div :class="['info', { hidden: info_hidden }]">
        <pre>{{ example_request }}</pre>
      </div>
    </div>
    <div class="query-request query-action">
      <button @click="sendQuery('example')" class="query-button">Send example</button>
      <input type="text" v-model="query" />
      <button @click="sendQuery('post')" class="query-button">Send query</button>
      <button @click="clearQuery" class="query-button clear">Clear query</button>
    </div>
    <div class="query-request query-example">
      <h2>Response</h2>
      <button @click="info_reponse_hidden = !info_reponse_hidden" class="info-btn">i</button>
      <div :class="['info', { hidden: info_reponse_hidden }]">
        <pre>{{ example_result }}</pre>
      </div>
    </div>
    <div :class="[`query-request query-result`, result.length != 0 ? 'show' : 'hide']">
      <pre class="result">
        {{ result }}
      </pre>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/global.scss' as *;
.query {
  .query-request {
    display: flex;
    align-items: center;
    border: 1px solid white;
    position: relative;
    &.query-example {
      padding: 50px 20px;
    }
    &.query-action {
      padding: 20px;
      .query-button {
        width: 150px;
        height: 40px;
        &.clear {
          margin-left: 20px;
        }
      }
      input {
        width: 100%;
        height: 40px;
        margin: 0 20px;
      }
    }
    &.query-result {
      padding: 20px;
      padding: 0;
      background-color: $secondary;
      .result {
        background-color: rgba($primary, 0.4);
        color: $primary;
        height: 100%;
        width: 100%;
        padding: 20px;
      }
      &.show {
        visibility: visible;
      }
      &.hide {
        visibility: hidden;
      }
    }
    .info-btn {
      margin-left: 20px;
      color: $secondary;
      background-color: transparent;
      border: 1px solid $secondary;
      border-radius: 50%;
      opacity: 0.6;
      cursor: pointer;
    }
  }
  .info {
    width: 85%;
    position: absolute;
    top: 100px;
    left: 100px;
    border: 1px solid $secondary;
    background-color: $primary;
    opacity: 0.9;
    padding: 20px;
    z-index: 10;
    pre {
      width: 100%;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    &.hidden {
      display: none;
    }
  }
}
</style>
