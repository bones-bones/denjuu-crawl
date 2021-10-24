export const requestInterval = (fn: () => any, delay: number) => {
    let start = Date.now();
    const handle: { value?: number } = {};

    function loop() {
        handle.value = window.requestAnimationFrame(loop);

        if (Date.now() - start >= delay) {
            fn();
            start = Date.now();
        }
    }

    handle.value = window.requestAnimationFrame(loop);
    return handle;
};

export const clearRequestInterval = (cancelId: number) => {
    window.cancelAnimationFrame(cancelId);
};
