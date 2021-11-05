function checkAuthentica(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth thanh cong");
    return next();
  } else {
    console.log("auth that bai");
    res.send({ isSuccess: false , redirectUrl: "/sign" });
  }
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.send({isSuccess: true });
  }
  else{
    next();
  }
}

module.exports = {
  checkAuthentica,
  checkNotAuthenticated,
};
