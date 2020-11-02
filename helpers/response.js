exports.success = (message, results, statusCode) => {
    return {
        message: message,
        error: false,
        code: statusCode,
        data: results
    };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.error = (message, statusCode) => {
    console.log(statusCode);
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403,409, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true
    };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
};