function checkAuthentica(req, res, next) {
  if (req.isAuthenticated()) {
    
    return next();
  } else {
    res.send({ isSuccess: false , redirectUrl: "/sign" });
  }
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('login roi');
    return res.send({isSuccess: true });
  }
  else{
    console.log('chua login ');
    next();
  }
}

module.exports = {
  checkAuthentica,
  checkNotAuthenticated,
};
