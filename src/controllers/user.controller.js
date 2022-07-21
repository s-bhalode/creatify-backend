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
//   finding designer data by id (designer-profile-settings) 
exports.find = (req, res) => {
    // console.log(req.params);
    const id = req.params.id;
    // console.log(id);
    User.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : "Not found user with id " + id });
            }else{
                res.send(data);
                // console.log(data);
            }  
        })
        .catch(err => {
            res.status(500).send({ message : "Error retrieving user with id " + id });
        })
}


//   Updating designer-profile-settings data 
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;
    // console.log(req.params);
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update  user with ${id}.Maybe user not found` })
            } else {
                res.send(data);
                // console.log(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: " Error Update user information" })
        })

}
