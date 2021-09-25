System.register([], function (exports_1, context_1) {
    "use strict";
    var CurrentTime;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            CurrentTime = class CurrentTime {
                constructor() {
                    this.container = getContanerElement();
                    this.container.innerText = new Date().toLocaleString();
                    const timer = setInterval(() => {
                        this.container.innerText = new Date().toLocaleString();
                    }, 1000);
                    onDestroy(() => {
                        console.log('clear interval');
                        window.clearInterval(timer);
                    });
                }
            };
            exports_1("default", CurrentTime);
        }
    };
});
