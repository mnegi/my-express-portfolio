var fs = require('fs');
var path = require('path');
var multer = require('multer');

// shell(mkdir -p path)
function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';
  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }
      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }
      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && targetDir === curDir) {
        throw err; // Throw if it's just the last created dir.
      }
    }
    return curDir;
  }, initDir);
}

module.exports.uploadMedia = function (req, res, dirPath, fileName, goBack) {
  mkDirByPathSync(dirPath);
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, dirPath);
    },
    filename: function (req, file, callback) {
      callback(null, fileName);
    }
  });

  var upload = multer({ storage: storage }).single('image');
  upload(req, res, function (err, data) {
    if (err) {
      goBack(err, null);
    } else {
      goBack(null, { 'fileName': dirPath + '' + fileName });
    }
  });
}