function HeaderParameters(method, payload) {
  const token = sessionStorage.getItem("token");
  const methods = ["POST", "PUT"];
  const params = {
    headers: {
      Accept: "application/json",
      Authorization: token
    },
    method,
  };
  if (methods.some((m) => m === method)) {
    params.headers["Content-Type"] = "application/json";
    params.body = JSON.stringify(payload);
  }
  return params;
}

export { HeaderParameters };
