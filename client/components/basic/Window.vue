<template>
  <div
      :style="{transform: `translate(${windowParams.translatePosX}px, ${windowParams.translatePosY}px)`, zIndex: windowParams.zIndex}"
      class="object-wrapper window">
    <div @mousedown.self="allowDrag" @mouseup.self="disableDrag"
         class="window__header">
      <div v-if="windowParams.name || windowParams.iconPath" class="window__title">
        <div v-if="windowParams.iconPath" class="window__icon">
          <img :src="windowParams.iconPath" :alt="windowParams.name" class="window__icon-img">
        </div>
        <h3 v-if="windowParams.name" class="window__name">{{ windowParams.name }}</h3>
      </div>
      <div class="window__control">
        <button class="button window__control-btn" title="Свернуть">
          <svg class="window__control-btn-icon" width="6" height="2" viewBox="0 0 6 2" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="2" fill="black"/>
          </svg>
        </button>
        <button v-if="windowParams.fullscreen" class="button window__control-btn" title="На весь экран">
          <svg class="window__control-btn-icon" width="9" height="9" viewBox="0 0 9 9" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0H0V9H9V0ZM8 2H1V8H8V2Z" fill="black"/>
          </svg>
        </button>
        <button @click="closeWindow" class="button window__control-btn" title="Закрыть">
          <svg class="window__control-btn-icon" width="8" height="7" viewBox="0 0 8 7" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0 0H2V1H3V2H5V1H6V0H8V1H7V2H6V3H5V4H6V5H7V6H8V7H6V6H5V5H3V6H2V7H0V6H1V5H2V4H3V3H2V2H1V1H0V0Z"
                  fill="black"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="window__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Window',
  props: {
    windowParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    disableDrag() {
      this.$emit('disable-drag')
    },
    allowDrag(event) {
      this.$emit('drag', event)
    },
    closeWindow() {
      this.$emit('close-window', this.windowParams)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/main.scss";

.window {
  min-width: 400px;
  height: 400px;
  position: absolute;

  &__header {
    background: linear-gradient(270deg, #1085D2 0%, #00007B 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    cursor: url("~@/assets/img/cursor/cursor-drag.cur"), move;
  }

  &__title {
    display: flex;
    pointer-events: none;
  }

  &__name {
    color: #FFFFFF;
    text-shadow: 2px 2px 0 black;
    margin-left: 10px;
  }

  &__icon {
    max-width: 21px;

    &-img {
      display: block;
      width: 100%;
      user-select: none;
      pointer-events: none;
    }
  }

  &__control {
    display: flex;
    justify-content: space-between;

    &-btn {
      height: 14px;
      width: 16px;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      &:last-child {
        margin-left: 2px;
      }

      &-icon {
        display: block;
        width: 100%;
        pointer-events: none;
      }
    }
  }
}
</style>