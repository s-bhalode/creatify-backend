const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../controllers/multer.controller');
const designerMedia = require('../controllers/designerMedia.controller');
const DesignerPost = require('../models/designer-post.model');



module.exports = function(app) {

  // auth routes
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/designer", [authJwt.verifyToken, authJwt.isDesigner], controller.designerDashboard);
  app.get("/api/test/recruiter", [authJwt.verifyToken, authJwt.isRecruiter], controller.recruiterDasboard);
  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminDasboard);


  // Designer media routes
  app.post('/designer/designer-post/upload', upload.designerUpload.single('file'), designerMedia.uploadDesignerPost);
  app.get('/designer/designer-post/upload/:id', designerMedia.getDesignerPost);
  app.delete('/designer/designer-post/upload/:id', designerMedia.deleteDesignerPost);
  app.put('/designer/designer-post/upload/:id', upload.designerUpload.single('image'), designerMedia.updateDesignerPost);



  // common user routes
  app.get("/users/:id" + "/profile-settings", controller.find);//designer-profile-settings edit-profile (fetching)
  app.put("/users/:id" + "/profile-settings", controller.update )//designer-profile-settings edit-profile (updating)


}
