
const getBaseUrl = (req) => {
    return req.protocol + "://" + req.headers.host
}

exports.getBaseUrl = getBaseUrl;