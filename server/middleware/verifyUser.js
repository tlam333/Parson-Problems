const verifyUser = (req, res, next) => {
    const id = req.query.id;
    console.log(`outside thing: ${id}`);
    
    // Check if url params id = the JWT user id
    if (req.sub !== id) {
        console.log(`${req.sub}`);
        console.log(`${id}`);

        console.log('cman420');
        // Potential random XSS attack :(
        return res.sendStatus(403);
    }
    next();
}

module.exports = verifyUser;