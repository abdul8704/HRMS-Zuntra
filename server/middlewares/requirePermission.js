const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user; 

    if (!user.allowedAccess) return res.status(401).json({ message: "Unauthorized" });

    if (!user.allowedRoles.includes(requiredPermission)) {
        return res
            .status(403)
            .json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
}

module.exports = requirePermission;