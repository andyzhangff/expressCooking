const AccessControl = require('accesscontrol');

let grantsObject = {
    admin: {
        receipe: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {
        receipe: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    }
};

const ac = new AccessControl(grantsObject);

module.exports = ac;