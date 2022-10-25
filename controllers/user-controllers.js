const userController = {
    test(req, res) {
        console.log('route is working')
        res.json('awesome job')
    }
}

module.exports = userController;