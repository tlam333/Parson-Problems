const verifyUser = (req, res, next) => {
    const id = req.params.id;
    console.log(`outside thing: ${id}`);
    
    // Check if url params id = the JWT user id
    if (req.id !== id) {
        console.log(`${req.id}`);
        console.log(`${id}`);

        console.log('cman420');
        return res.sendStatus(403);
    }
    next();
}

module.exports = verifyUser;