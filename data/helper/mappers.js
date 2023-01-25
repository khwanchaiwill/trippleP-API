const { ControlCamera } = require("@material-ui/icons");

module.exports = {
    intToBoolean,
    booleanToint,
    userToBody,
    cateToBody,
  };
  

  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  
  function userToBody(user) {
    const result = {
      ...user,
    };
  
    if (user.blog) {
      result.blog = user.blog.map(blogs=> ({
        ...blogs,
      }));
    }
    return result;

  }
  
  function cateToBody(cates) {
    return {
      ...cates,
    };
  
  }
  