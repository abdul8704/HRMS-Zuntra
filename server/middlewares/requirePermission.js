const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user; 
    if (!user.allowedAccess) return res.status(401).json({ message: "Unauthorized" });
    
    else if (!user.allowedAccess.includes(requiredPermission)) {
        return res
            .status(403)
            .json({ message: "Forbidden: Insufficient role", log: [requiredPermission, user.allowedAccess] });
    }
    next();
  };
}

const requireAdminOrMe = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user; 
    const requestor = req.params.userid;

    if (!user.allowedAccess) return res.status(401).json({ message: "Unauthorized" });
    
    if (requestor === user._id) 
      return next();
    
    else if (!user.allowedAccess.includes(requiredPermission)) {
        return res
            .status(403)
            .json({ message: "Forbidden: Insufficient access" });
    }

    next();
  };
}
module.exports = { requirePermission, requireAdminOrMe };