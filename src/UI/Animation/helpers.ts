
export default {
    cancelAnimationFrame: window.cancelAnimationFrame || window.webkitCancelAnimationFrame,
    requestAnimationFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame
};

