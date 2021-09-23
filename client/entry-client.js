import { createApp } from './main'

const { app, router, store } = createApp()

router.onReady(() => {
    app.$mount('#app')
})

if (module.hot) {
    const api = require('vue-hot-reload-api')

    if (!api.compatible) {
        throw new Error(
            'vue-hot-reload-api is not compatible with the version of Vue you are using'
        )
    }
    module.hot.accept()
}