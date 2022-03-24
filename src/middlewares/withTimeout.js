module.exports = (timeout) => function (ctx, next) {
    ctx.request.socket.setTimeout(timeout * 1000);
    return next();
}