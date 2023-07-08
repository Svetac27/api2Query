export default {
  example_request: `queryType=join^tableReference=users^joinType=left^targetColumn=todos.user_id^localColumn=users.id^groupedBy=todos.status_id$todos.id$users.updated_at$users.id$users.email$todos.action$users$todos.priority^[%users.id=todos.user_id*AND*%users.name=admin]*AND*%26%26queryType=join^joinType=inner^tableReference=status^orderBy=todos.inserted_at^orderSymbol=ASC^limitBy=2500^offsetBy=0^targetColumn=status.id^localColumn=todos.status_id^groupedBy=status$status.id$todos.inserted_at^%status.enum>=0`,
  example_result:
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
}
