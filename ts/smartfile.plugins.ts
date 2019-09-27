// node native scope
import * as fs from 'fs';
import * as path from 'path';

export {
  fs,
  path
};

// @pushrocks scope
import * as smarthash from '@pushrocks/smarthash';
import * as smartpath from '@pushrocks/smartpath';
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartrequest from '@pushrocks/smartrequest';

export {
  smarthash,
  smartpath,
  smartpromise,
  smartrequest,
};

// third party scope
import * as fsExtra from 'fs-extra';
import glob from 'glob';
import yaml from 'js-yaml';

export {
  fsExtra,
  glob,
  yaml
};
