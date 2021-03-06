// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBase = require('../../../app/service/base');
import ExportCa = require('../../../app/service/ca');
import ExportCaUser = require('../../../app/service/caUser');
import ExportOrg = require('../../../app/service/org');
import ExportPeer = require('../../../app/service/peer');
import ExportResource = require('../../../app/service/resource');
import ExportRole = require('../../../app/service/role');
import ExportRoleResource = require('../../../app/service/roleResource');
import ExportRoleUser = require('../../../app/service/roleUser');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    base: AutoInstanceType<typeof ExportBase>;
    ca: AutoInstanceType<typeof ExportCa>;
    caUser: AutoInstanceType<typeof ExportCaUser>;
    org: AutoInstanceType<typeof ExportOrg>;
    peer: AutoInstanceType<typeof ExportPeer>;
    resource: AutoInstanceType<typeof ExportResource>;
    role: AutoInstanceType<typeof ExportRole>;
    roleResource: AutoInstanceType<typeof ExportRoleResource>;
    roleUser: AutoInstanceType<typeof ExportRoleUser>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
