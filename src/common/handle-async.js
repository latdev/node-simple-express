module.exports = function handleAsync(callable) {
    return (request, response, next) => {
        Promise.resolve(callable(request, response, next)).catch(error => next(error))
    }
}