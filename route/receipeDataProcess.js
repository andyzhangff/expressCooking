const receipeDataProcess = (req, res, next) => {

    const fileLocation = req.files['receipePictureSource'][0]['destination'];
    const fileName = req.files['receipePictureSource'][0]['filename'];
    const receipe_path = fileLocation + fileName;
    req.receipe_path = receipe_path;
  
    const stepsPicPath = [];
    for (key in req.files["stepPictureSource[]"]) {
        const stepPicLocation = req.files["stepPictureSource[]"][key]['destination'];
        const stepPicName = req.files["stepPictureSource[]"][key]['filename'];
        const stepPicPath = stepPicLocation + stepPicName;
        stepsPicPath.push(stepPicPath);
    }
    const c = req.body.steps.map(function (e, i) {
        return [e, stepsPicPath[i]];
    });
    req.steps = c;
    next();
};

module.exports = receipeDataProcess;