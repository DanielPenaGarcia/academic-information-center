export const getHeaderParam = ({req, param}) => {
    return req.headers[param];
};