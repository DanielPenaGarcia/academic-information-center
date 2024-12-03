export function userSerializable(req, res, next) {
  const json = res.json;
  res.json = function (data) {
    if (data && data.user) {
        delete data.user.password;
    }
    return json.call(this, data);
  };
  next();
}