const verifyUser = (req, res, next) => {
    const id = req.params.id;
    
    console.log(req.sub);
    console.log(id);
    // Check if url params id = the JWT user id
    if (req.sub !== id) {
        // Potential random XSS attack :(
        console.log(`In verify user`);
        return res.sendStatus(403);
    }
    next();
}

module.exports = verifyUser;