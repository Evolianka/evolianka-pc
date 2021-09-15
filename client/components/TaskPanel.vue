<template>
  <div class="task-panel">
    <button class="task-panel__start-btn">
      <img class="task-panel__start-btn-img" src="@/assets/img/task-panel/start-btn.png" alt="start">
    </button>
  </div>
</template>

<script>
export default {
  name: 'TaskPanel',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.task-panel {
  width: 100%;
  background: #BFBFBF;
  box-shadow: inset 1px 1px 0px #FFFFFF;
  padding: 6px;
  &__start-btn {
    background: #BFBFBF;
    box-shadow: inset -1px -1px 0px #000000, inset 1px 1px 0px #FFFFFF, inset -2px -2px 0px #808080, inset 2px 2px 0px #DBDBDB;
    padding: 6px;
    &:active {
      box-shadow: none;
    }
    &-img {
      display: block;
      width: 100%;
      pointer-events: none;
    }
  }
}
</style>