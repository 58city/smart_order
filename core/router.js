module.exports = {
	'/backend*': {
		get: 'backend'
	},
	'/mobile*': {
		get: 'mobile'
	},
	'/api': {
		'/install': {
			get: 'install.status',
			post: 'install.install',
			'/test-database': {
				put: 'install.testDatabase'
			}
		},
		'/account': {
			get: 'account.current',
			put: [100301, 'account.update'],
			'/sign-in': {
				put: 'account.signIn'
			},
			'/sign-out': {
				put: 'account.signOut'
			}
		},
		'/*': {
			all: 'account.check'
		},
		'/dashboard': {
			get: 'dashboard'
		},
		'/users': {
			get: 'users.get'
		},
		'/authorities': {
			get: 'authorities'
		},
		'/roles': {
			get: [100100, 100200, 'roles.list'],
			post: [100101, 'roles.create'],
			delete: [100101, 'roles.removeMany'],
			'/:_id': {
				get: [100100, 'roles.one'],
				put: [100101, 'roles.update'],
				delete: [100101, 'roles.remove']
			}
		},
		'/admins': {
			get: [100200, 'admin.list'],
			post: [100201, 'admin.create'],
			delete: [100201, 'admin.removeMany'],
			'/:_id': {
				get: [100200, 'admin.one'],
				put: [100201, 'admin.update'],
				delete: [100201, 'admin.remove']
			}
		},
		'/goodscat':{
			get:[100600,'goodscat.tree'],
			post:[100601,'goodscat.create'],
			'/:_id':{
				get:[100600,'goodscat.one'],
				put:[100601,'goodscat.update'],
				delete:[100601,'goodscat.remove']
			}
		}
	},
	'*': { get: 'install.access' },
	'/': { get: 'home' },
	'/*': { get: 'errors.notFound' }
};