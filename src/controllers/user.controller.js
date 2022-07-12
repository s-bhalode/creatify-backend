// return public & protected content
const User=require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
}

exports.designerDashboard = (req, res) => {
    res.status(200).send("Designer content");
}

exports.adminDasboard = (req, res) => {
    res.status(200).send("Admin content");
}

exports.recruiterDasboard = (req, res) => {
    res.status(200).send("Recruiter content");
}
exports.find = (req, res) => {
    const id = req.query.id;
    User.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : "Not found user with id " + id });
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error retrieving user with id " + id });
        })
}
