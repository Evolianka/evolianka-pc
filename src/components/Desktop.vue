<template>
  <div class="desktop">
    <div class="desktop__field">
      <Shortcut class="desktop__shortcut"
                @double-click="openWindow"
                v-for="(shortcut, index) of shortcutsData"
                :key="index" :shortcutData="shortcut"
      />
      <Window class="desktop__window"
              ref="windows"
              @close-window="closeWindow(index)"
              @drag="dragHandler(index)"
              v-for="(windowData, index) of activeWindows"
              :windowParams="windowData"
              :key="windowData.name + index"
              :eventX="eventX"
              :eventY="eventY"
      />
    </div>
    <Wallpaper class="desktop__wallpaper"/>
    <TaskPanel class="desktop__task-panel"/>
  </div>
</template>

<script>
import Window from "@/components/basic/Window";
import TaskPanel from "@/components/TaskPanel";
import Wallpaper from "@/components/Wallpaper";
import Shortcut from "@/components/basic/Shortcut";

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
    dragHandler(index) {
      this.$refs.windows.forEach(activeWindow => {
        if ((Number(this.$refs.windows[index].$el.style.zIndex) <= Number(activeWindow.$el.style.zIndex)) && (this.$refs.windows[index] !== activeWindow)) {
          this.$refs.windows[index].$el.style.zIndex = Number(activeWindow.$el.style.zIndex) + 1
        }
      })
    },
    openWindow(event) {
      if (!this.activeWindows.includes(event)) this.activeWindows.push(event)
    },
    closeWindow(index) {
      this.activeWindows.splice(index, 1)
    },
    initGlobalEventListeners() {
      window.addEventListener('pointermove', this.changeCord)
    },
    destroyGlobalEventListeners() {
      window.removeEventListener('pointermove', this.changeCord)
    },
    changeCord() {
      this.eventX = event.x
      this.eventY = event.y
    }
  },
  beforeDestroy() {
    this.destroyGlobalEventListeners()
  },
  mounted() {
    this.initGlobalEventListeners()
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

