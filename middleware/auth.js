const bcrypt = require('bcrypt');
const jws = require('jsonwebtoken');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const verfiyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const requireAuth = (req, res, next) => {
    try {
        console.log(require.headers);
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'Not authorized'});  
    }
};

module.exports = {hashPassword, verfiyPassword, requireAuth};