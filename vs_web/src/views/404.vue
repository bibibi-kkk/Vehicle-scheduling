<template>
  <a-result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  >
    <template v-slot:extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
