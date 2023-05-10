const handleHttpError = (res, message = 'Something gone wrong', code = 403) => {
    res.status(code);
    res.send({ errors: message });
}

export { handleHttpError };