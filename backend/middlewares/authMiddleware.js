/**
 * Middleware to ensure a user is authenticated before accessing a route.
 * If the user is not authenticated, they will be redirected to the login page.
 * Otherwise, the next middleware or route handler is called.
 *
 * @function
 * @param {Request} req - Express request object, which contains the session data.
 * @param {Response} res - Express response object, used to redirect unauthenticated users.
 * @param {Function} next - Express `next` middleware function, called if authentication is successful.
 */
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect("/321119887/Yi/login");
    }
}

module.exports = ensureAuthenticated;
