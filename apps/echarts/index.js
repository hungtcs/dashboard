System.register([], function (exports_1, context_1) {
    "use strict";
    var CurrentTime;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            CurrentTime = class CurrentTime {
                constructor() {
                    console.log(`CurrentTime: ${new Date()}`);
                }
            };
            exports_1("default", CurrentTime);
        }
    };
});
