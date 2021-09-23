import { createApp } from '../client/main';

export default context =>
    new Promise((resolve, reject) => {
        // на каждый запрос создается экземпляр Vue
        const { app, router, store } = createApp();

        // $meta - метод, добавляемый пакетом vue-meta в экземпляр Vue

        // пушим текущий путь в роутер
        router.push(context.url);

        // записываем мета-данные в контекст, чтобы потом отрендерить в шаблоне

        router.onReady(() => {
            context.rendered = () => {
                // записываем стейт в контекст, в шаблоне он будет сгенерирован, как window.__INITIAL_STATE__
                context.state = store.state;
            };

            const matchedComponents = router.getMatchedComponents();
            // если ничего не нашлось
            if (!matchedComponents.length) {
                return reject(new Error(404));
            }

            return resolve(app);
        }, reject);
    });