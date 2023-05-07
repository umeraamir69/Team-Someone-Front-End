
var jwt = require('jsonwebtoken');


export default function handler(req, res) {
    try {
        if (req.body.Token) {
            const response = jwt.verify(req.body.Token, "dbpjct234234sdfasdfXDEFSDFSDFDff")
            if (response) {
                return res.status(200).json({ status: true, error: response })
            }
        }
        else {
            return res.status(400).json({ status: false, error: "Token Not Found" })
        }
    } catch (error) {
        return res.status(400).json({ status: false, error: "Token Expired" })
    }
}

