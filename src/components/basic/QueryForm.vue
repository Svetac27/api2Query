<script setup>
import { Form } from 'vee-validate'

defineProps({
  validationSchema: {
    type: Object
  },
  initialValues: {
    type: Object
  }
})
</script>

<template>
  <Form
    v-slot="{ meta, errors }"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
  >
    <slot :errors="errors" :meta="meta" />
  </Form>
</template>
