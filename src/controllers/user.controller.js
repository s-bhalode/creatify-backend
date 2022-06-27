// return public & protected content

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