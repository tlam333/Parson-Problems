exports.testGet = async (req, res) => {
    if (req.login) {
        console.log('user logged in');
        return res.sendStatus(200);
    } else {
        console.log('user not logged in');
        return res.sendStatus(403);
    }
}