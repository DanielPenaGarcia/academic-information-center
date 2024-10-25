export function serializable(req, res, next) {
  const json = res.json;
  res.json = function (data) {
    if (data && data.password) {
      delete data.password;
    }
    return json.call(this, data);
  };
  next();
}
