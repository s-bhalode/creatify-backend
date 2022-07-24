const DesignerPost = require('../models/designer-post.model');

exports.uploadDesignerPost = async(req, res) => {
    console.log('controller yes');
    // let designerPost = new DesignerPost({
    //         caption : req.body.caption,
    //         postImageUrl : req.file.secure_url,
    //         cloudinaryId : req.file.public_id,
    //       }); 

    // DesignerPost.create(designerPost).then(newImage => {
    //     res.json(newImage);
    // }).catch(err => {
    //     console.log(err);
    // })

    try{
      const result = await cloudinary.uploader.upload(req.file.path);

      let designerPost = new DesignerPost({
        caption : req.body.caption,
        postImageUrl : result.secure_url,
        cloudinaryId : result.public_id,
      }); 

      await designerPost.save( (err, designerPost) => {
            if(err){
                // console.log('yes');
                res.status(500).send({message : err});
                return;
            }
            res.status(200).send({designerPost});
        });
    }catch(err){
        console.log('catch yes');
        console.log(err);
    }

  };


  exports.getDesignerPost = async(req, res) => {
    try{
      let designerPostMedia = await DesignerPost.findById(req.param.id);
      if(!designerPostMedia){
        res.status(404).send({
          message : 'Designer media not found !'
        });

        res.status(200).send(JSON(designerPostMedia));
      }
    }catch(err){
      console.log(err);
    }
  };

  exports.deleteDesignerPost = async(req, res) => {
    try{
      let designerPostMedia = await DesignerPost.findById(req.params.id);

      await cloudinary.uploader.destroy(designerPostMedia.cloudinaryId);

      await designerPostMedia.remove();
      res.json(designerPostMedia);
    }catch(err){
      console.log(err);
    }
  };

  exports.updateDesignerPost = async(req, res) => {
    try{
      let designerPost = await DesignerPost.findById(req.params.id);
      
      await cloudinary.uploader.destroy(designerPost.cloudinaryId);

      const result = await cloudinary.uploader.upload(req.file.path);

      const data = {
        caption : req.body.caption || designerPost.caption,
        postImageUrl : result.secure_url || designerPost.postImageUrl,
        cloudinaryId : result.public_id || designerPost.cloudinaryId
      };

      designerPost = await DesignerPost.findByIdAndDelete(req.params.id, data, {
        new : true
      });
      res.json(designerPost);
    }catch(err){
      console.log(err);
    }
  };