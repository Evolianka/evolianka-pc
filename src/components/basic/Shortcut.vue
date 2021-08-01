<template>
  <div @click="checkDoubleClick" class="shortcut">
    <div class="shortcut__icon-wrapp">
      <img :src="shortcutData.icon" :alt="shortcutData.name" class="shortcut__icon-img">
    </div>
    <h3 class="shortcut__name">{{shortcutData.name}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Shortcut',
  props: {
    shortcutData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      touchtime: 0
    }
  },
  methods: {
    checkDoubleClick() {
      if (this.touchtime === 0) {
        this.touchtime = new Date().getTime()
      } else {
        if (((new Date().getTime()) - this.touchtime) < 800 ) {
          this.$emit('double-click', this.shortcutData)
        } else {
          this.touchtime = new Date().getTime()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcut {
  max-width: 90px;
  :hover {
    cursor: url("~@/assets/img/cursor/cursor-pointer.svg"), pointer;
  }
  &__icon {
    &-wrapp {
      width: 90px;
      height: 90px;
    }
    &-img {
      width: 100%;
      display: block;
      object-fit: contain;
    }
  }
  &__name {
    text-align: center;
    color: #FFFFFF;
    margin-top: 0.3em;
    font-weight: normal;
    text-shadow: 2px 2px 0 black;
  }
}
</style>