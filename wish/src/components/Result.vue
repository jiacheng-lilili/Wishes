<template>
  <div>
    <h2>{{ msg }}</h2>
    <el-button type="text" @click="$router.back(-1)">返回</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "添加成功，返回去看一下",
    };
  },
  created() {
    this.msg = this.$route.params.msg;
  },
};
</script>
