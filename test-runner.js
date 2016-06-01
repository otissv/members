import glob from 'glob';
import path from 'path';


const config = {
  base    : './',
  folder  : './__tests__',
  ext  : '-test.js',
  options : {
    ignore: './node_modules/**'
  }
};

const resolveBase = (base, filePath) => {
  return path.resolve(__dirname, `${base}${filePath}`);
};

function runTest (files) {
  files.forEach(file => {
    const tests = resolveBase(config.base, file);

    require(`${tests}`);
  });
}

const requireFiles = (config) => {
  const ext = config.ext || '';
  const pattern = `${config.folder}/**/*${ext}`;

  glob(pattern, config.options, (err, files) => {
    if (err) {
      return err;
    }

    console.log();
    glob('./__tests__/pretests.js', (err, pretests) => {
      if (err) {
        console.log(err);
      }
      if (pretests[0] == null) {
        runTest(files);

      } else {
        require(pretests[0]).pretest();

        const duration = require(pretests[0]).DURATION || 99;
        setTimeout(() => runTest(files), duration + 1);
      }
    });


  });
};

export default requireFiles(config);
