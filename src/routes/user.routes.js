const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

module.exports = function(app) {

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/designer", [authJwt.verifyToken, authJwt.isDesigner], controller.designerDashboard);

  app.get("/api/test/recruiter", [authJwt.verifyToken, authJwt.isRecruiter], controller.recruiterDasboard);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminDasboard);

}
