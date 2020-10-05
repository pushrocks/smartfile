// node native scope
import * as fs from 'fs';
import * as path from 'path';

export { fs, path };

// @pushrocks scope
import * as smartfileInterfaces from '@pushrocks/smartfile-interfaces';
import * as smarthash from '@pushrocks/smarthash';
import * as smartjson from '@pushrocks/smartjson';
import * as smartmime from '@pushrocks/smartmime';
import * as smartpath from '@pushrocks/smartpath';
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartrequest from '@pushrocks/smartrequest';

export { smartfileInterfaces, smarthash, smartjson, smartmime, smartpath, smartpromise, smartrequest };

// third party scope
import * as fsExtra from 'fs-extra';
import glob from 'glob';
import yaml from 'js-yaml';

export { fsExtra, glob, yaml };
