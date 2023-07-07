export default [
  {
    id: '4abde537-2bc0-4b6b-a031-c49647f4d405',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'roles',
    parent: 'base',
    relations: null,
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'permissions',
        type: 'jsonb'
      },
      {
        name: 'registerable',
        type: 'bool'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '000da7ce-15c1-412e-9a42-89d21db6af08',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'groups',
    parent: 'base',
    relations: null,
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '7858876c-c48d-45d6-a122-466ad196186b',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'users',
    parent: 'base',
    relations: null,
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'email',
        type: 'varchar'
      },
      {
        name: 'password_hash',
        type: 'varchar'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '80b2eec8-9135-4e7b-915b-aa0f7d07d1d4',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'user_roles',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: '7858876c-c48d-45d6-a122-466ad196186b',
          name: 'users'
        },
        table: {
          column: 'user_id',
          id: '80b2eec8-9135-4e7b-915b-aa0f7d07d1d4',
          name: 'user_roles'
        }
      },
      {
        references_table: {
          column: 'id',
          id: '4abde537-2bc0-4b6b-a031-c49647f4d405',
          name: 'roles'
        },
        table: {
          column: 'role_id',
          id: '80b2eec8-9135-4e7b-915b-aa0f7d07d1d4',
          name: 'user_roles'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'user_id',
        type: 'uuid'
      },
      {
        name: 'role_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: 'dd25d9c6-fb76-4dc7-87b0-0642da5970f6',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'user_groups',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: '7858876c-c48d-45d6-a122-466ad196186b',
          name: 'users'
        },
        table: {
          column: 'user_id',
          id: 'dd25d9c6-fb76-4dc7-87b0-0642da5970f6',
          name: 'user_groups'
        }
      },
      {
        references_table: {
          column: 'id',
          id: '000da7ce-15c1-412e-9a42-89d21db6af08',
          name: 'groups'
        },
        table: {
          column: 'group_id',
          id: 'dd25d9c6-fb76-4dc7-87b0-0642da5970f6',
          name: 'user_groups'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'user_id',
        type: 'uuid'
      },
      {
        name: 'group_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: 'd531e548-59db-4b6d-8ce6-ddf55535f428',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'group_roles',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: '000da7ce-15c1-412e-9a42-89d21db6af08',
          name: 'groups'
        },
        table: {
          column: 'group_id',
          id: 'd531e548-59db-4b6d-8ce6-ddf55535f428',
          name: 'group_roles'
        }
      },
      {
        references_table: {
          column: 'id',
          id: '4abde537-2bc0-4b6b-a031-c49647f4d405',
          name: 'roles'
        },
        table: {
          column: 'role_id',
          id: 'd531e548-59db-4b6d-8ce6-ddf55535f428',
          name: 'group_roles'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'group_id',
        type: 'uuid'
      },
      {
        name: 'role_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '20607263-4f28-4dd3-91c2-0a79dc47ace9',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'workflows',
    parent: 'base',
    relations: null,
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'description',
        type: 'varchar'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: 'a8da05bc-a539-4747-b68d-33899337e359',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'steps',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: '20607263-4f28-4dd3-91c2-0a79dc47ace9',
          name: 'workflows'
        },
        table: {
          column: 'workflow_id',
          id: 'a8da05bc-a539-4747-b68d-33899337e359',
          name: 'steps'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'description',
        type: 'varchar'
      },
      {
        name: 'workflow_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '1e960a33-ef40-422f-ba9e-7ccb48be35ef',
    inserted_at: '2023-06-13T12:07:00Z',
    name: 'conditions',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: 'a8da05bc-a539-4747-b68d-33899337e359',
          name: 'steps'
        },
        table: {
          column: 'step_id',
          id: '1e960a33-ef40-422f-ba9e-7ccb48be35ef',
          name: 'conditions'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'order',
        type: 'int4'
      },
      {
        name: 'active',
        type: 'bool'
      },
      {
        name: 'description',
        type: 'varchar'
      },
      {
        name: 'field',
        type: 'varchar'
      },
      {
        name: 'operator',
        type: 'varchar'
      },
      {
        name: 'value',
        type: 'varchar'
      },
      {
        name: 'type',
        type: 'varchar'
      },
      {
        name: 'settings',
        type: 'jsonb'
      },
      {
        name: 'step_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:00Z'
  },
  {
    id: '83de7fa1-b950-44e2-afc8-6ffc4ae9ffef',
    inserted_at: '2023-06-13T12:07:01Z',
    name: 'actions',
    parent: 'base',
    relations: [
      {
        references_table: {
          column: 'id',
          id: 'a8da05bc-a539-4747-b68d-33899337e359',
          name: 'steps'
        },
        table: {
          column: 'step_id',
          id: '83de7fa1-b950-44e2-afc8-6ffc4ae9ffef',
          name: 'actions'
        }
      }
    ],
    schema: [
      {
        name: 'id',
        type: 'uuid'
      },
      {
        name: 'acl',
        type: 'jsonb'
      },
      {
        name: 'inserted_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'description',
        type: 'varchar'
      },
      {
        name: 'settings',
        type: 'jsonb'
      },
      {
        name: 'type',
        type: 'varchar'
      },
      {
        name: 'order',
        type: 'int4'
      },
      {
        name: 'active',
        type: 'bool'
      },
      {
        name: 'trigger',
        type: 'varchar'
      },
      {
        name: 'trigger_condition',
        type: 'varchar'
      },
      {
        name: 'trigger_condition_value',
        type: 'varchar'
      },
      {
        name: 'trigger_condition_field',
        type: 'varchar'
      },
      {
        name: 'trigger_condition_operator',
        type: 'varchar'
      },
      {
        name: 'step_id',
        type: 'uuid'
      }
    ],
    updated_at: '2023-06-13T12:07:01Z'
  }
]
