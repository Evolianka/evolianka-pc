<template>
  <div class="desktop">
    <div class="desktop__field">
      <Shortcut class="desktop__shortcut"
                @double-click="openWindow"
                v-for="(shortcut, index) of shortcutsData"
                :key="index" :shortcutData="shortcut"
      />
      <Window class="desktop__window"
              @close-window="closeWindow(index)"
              v-for="(windowData, index) of activeWindows"
              :windowParams="windowData"
              :key="windowData.name"
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
      }]
    }
  },
  methods: {
    openWindow(event) {
      this.activeWindows.push(event)
    },
    closeWindow(index) {
      this.activeWindows.splice(index, 1)
    }
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

