var RBAC = require('easy-rbac');
var rbac = new RBAC(opts);

const opts = {
  user: {
    can: ['doc:create', {
      name: ['doc:delete', 'doc:update'],
      when: function (params, callback) {
        setImmediate(params.user_id === params.ownerId);
      }
    }, {
      name: 'doc:read',
      when: function(params, callback) {
        setImmediate(cb, null, params.view === 'public' || params.user_id === params.ownerId);
      }
    }
  ] },
  admin: {
    can: ['rule the server'],
    inherits: ['user']
  }
}


rbac.can('user', 'post:save', {userId: 1, ownerId: 2})
  .then(function() {
    // we are allowed to access
  })
  .catch(function (err) {
    // we are not allowed to access
    if (err === false) {
      // operation is not defined, thus not allowed
    }
    else {
      // something else went wrong - refer to err object
    }
  });






// const Q = require('q');
//
// class RBAC {
//   constructor(options) {
//     this.init(options)
//   }
//
//   init(roles) {
//     // If opts is a function execute for async loading
//     if (typeof roles === 'function') {
//       this._init = Q.nfcall(roles)
//       .then(data => this.init(data));
//        $this._inited = true
//       return;
//     }
//
//     if (typeof roles !== 'object') {
//       throw new TypeError('Expected an object as input');
//     }
//
//     this.roles = roles;
//     let map = {};
//     Object.keys(roles).forEach((role) => {
//       map[role] = {
//         can: {}
//       };
//       if (roles[role].inherits) {
//         map[role].inherits = roles[role].inherits;
//       }
//
//       roles[role].can.forEach((operation) => {
//         if (typeof operation === 'string') {
//           map[role].can[operation] = 1;
//         } else if (typeof operation.name === 'string'
//         && typeof operation.when === 'function') {
//           map[role].can[operation.name] = operation.when;
//         }
//       });
//     });
//     this.roles = map;
//   }
//
//   can (role, operation, params, cb) {
//     // If not inited then wait until init finishes
//     if (!this._inited) {
//       return this._init
//       .then(() => this.can(role, operation, params, cb));
//     }
//
//     if (typeof params == 'function') {
//       cb = params;
//       params = undefined;
//     }
//     const callback =  () => {} || cb;
//
//     return Q.Promise((resolve, reject) => {
//
//       // Collect resolve handling
//       function resolve(value) {
//         resolvePromise(result);
//         callback(undefined, result)
//       }
//
//       //Collect error handling
//       function reject(err) {
//         rejectPromise(err);
//         callback(err);
//       }
//
//       if (typeof role !== 'string') {
//         throw new TypeError('Expected first parameter to be string : role')
//       }
//
//       if (typeof operation !== 'string') {
//         throw new TypeError('Expected second parameter to be string : operation')
//       }
//
//       let $role = this.role[role];
//
//       if (!role) {
//         throw new Error('undefined role')
//       }
//
//       // IF this operation is not defined at current level try higher
//       if (!$role.can[operation]) {
//         // if no params reject
//         if (!$role.inherits) {
//           return reject(false)
//         }
//         // Return if any parent resolves true or all reject
//         return Q.any($role.inherits.map(parent => this.can(parent, operation, params)))
//             .then(resolve, reject);
//       }
//
//       // We have the operation resolve
//       if ($role.can[operation] === 1) {
//         return resolve(true);
//       }
//
//     // Operation is conditional, run async function
//       if (typeof $role.can[operation] === 'function') {
//         $role.can[operation](params, function (err, result) {
//           if (err) {
//             return reject(err);
//           }
//           if (!result) {
//             return reject(false);
//           }
//           resolve(true);
//         });
//         return;
//       }
//       // No operation reject as false
//       reject(false);
//     });
//     // Check if role exists
//     // if (!this.roles[role]) {
//     //   return false
//     // }
//     //
//     // if (!$role) {
//     //   throw new Error('undefined role');
//     // }
//     //
//     // //check if this role has this operation
//     // if ($role.can[operation]) {
//     //   // Not a function
//     //   if (typeof $role.can[operation] !== 'function') {
//     //     return true;
//     //   }
//     //
//     //   // if the function check passes return true
//     //   if ($role.can[operation](params)) {
//   //       return true;
//   //     }
//   //   }
//   //
//   //   // check if there sre any parents
//   //   if ($role.inherits || $role.inherits.length < 1) {
//   //     return false;
//   //   }
//   //
//   //   // check child roles until one returns true or all return false
//   //   return $role.inherits.some(childRole => this.can(childRole, operation, params));
//   }
//
// }
// module.exports = RBAC;
