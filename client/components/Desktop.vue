<template>
  <div class="desktop">
    <div class="desktop__field">
      <Shortcut class="desktop__shortcut"
                @double-click="openWindow"
                v-for="(shortcut, index) of shortcutsData"
                :key="index" :shortcutData="shortcut"
      />

      <Window class="desktop__window"
              v-for="(windowData, index) of activeWindows"
              :key="windowData.name + index"
              ref="windows"
              @close-window="closeWindow(index)"
              @drag="dragHandler($event, windowData, index)"
              @disable-drag="disableDrag(windowData)"
              :windowParams="windowData"
      />

    </div>
    <Wallpaper class="desktop__wallpaper"/>
    <TaskPanel class="desktop__task-panel"/>
  </div>
</template>

<script>
import Window from "./basic/Window";
import TaskPanel from "./TaskPanel";
import Wallpaper from "./Wallpaper";
import Shortcut from "./basic/Shortcut";
import api from '../api/desktop'

export default {
  name: 'Desktop',
  components: {
    Window,
    TaskPanel,
    Wallpaper,
    Shortcut
  },
  data() {
    return {
      activeWindows: [],
      dragId: null,
      shortcutsData: [{
        name: "test",
        icon: 'https://pngicon.ru/file/uploads/gory.png',
        fullscreen: true
      },
        {
          name: "test-2",
          icon: 'https://pngicon.ru/file/uploads/gory.png',
          fullscreen: true
        }],
      eventX: 0,
      eventY: 0
    }
  },
  methods: {
    disableDrag(windowData) {
      this.dragId = null
      windowData.startPosX = 0
      windowData.startPosY = 0
      windowData.prevTranslateX = this.translatePosX
      windowData.prevTranslateY = this.translatePosY
    },
    dragHandler(event, windowData, index) {
      this.dragId = index
      windowData.startPosX = event.pageX
      windowData.startPosY = event.pageY
      windowData.prevTranslateX = windowData.translatePosX
      windowData.prevTranslateY = windowData.translatePosY
      this.activeWindows.forEach(activeWindow => {
        if (this.activeWindows[index].zIndex <= activeWindow.zIndex && (this.activeWindows[index] !== activeWindow)) {
          this.activeWindows[index].zIndex = activeWindow.zIndex + 1
        }
      })
    },
    prepareTransform(index) {
      if (this.dragId !== null) {
        console.log('ok')
        const windowData = this.activeWindows[index]
        windowData.translatePosX = windowData.prevTranslateX === 0 ? this.eventX - windowData.startPosX : windowData.prevTranslateX + (event.x - windowData.startPosX)
        windowData.translatePosY = windowData.prevTranslateY === 0 ? this.eventY - windowData.startPosY : windowData.prevTranslateY + (event.y - windowData.startPosY)
      }
    },
    openWindow(event) {
      if (!this.activeWindows.includes(event)) {
        this.$set(event, 'translatePosX', 0)
        this.$set(event, 'translatePosY', 0)
        this.$set(event, 'startPosX', 0)
        this.$set(event, 'startPosY', 0)
        this.$set(event, 'prevTranslateX', 0)
        this.$set(event, 'prevTranslateY', 0)
        this.$set(event, 'zIndex', 0)
        this.activeWindows.push(event)
      }
    },
    closeWindow: function (index) {
      this.activeWindows.splice(index, 1)
    },
    initGlobalEventListeners() {
      window.addEventListener('pointermove', this.changeCord)
    },
    destroyGlobalEventListeners() {
      window.removeEventListener('pointermove', this.changeCord)
    },
    changeCord(event) {
      this.eventX = event.x
      this.eventY = event.y
      this.prepareTransform(this.dragId)
    },
    async getData() {
      try {
        this.shortcutsData = await api.getShortcuts()
      } catch (e) {
        throw e
      }
    }
  },
  beforeDestroy() {
    this.destroyGlobalEventListeners()
  },
  mounted() {
    this.initGlobalEventListeners()
    this.getData()
  }
}
</script>

<style lang='scss' scoped>
.desktop {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: auto min-content;

  &__field {
    padding: 10px;
    align-self: start;
  }

  &__task-panel {
    align-self: end;
  }
}
</style>

