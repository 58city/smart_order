/**
 * 权限配置
 */
module.exports = [
	{
		name: 'allAuth',
		description: '所有权限',
		code: 100000
	},
	{
		name: 'roles',
		description: '权限管理',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100100
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100101
			}
		]
	},
	{
		name: 'adminUsers',
		description: '后台用户',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100200
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100201
			}
		]
	},
	{
		name: 'account',
		description: '我的账号',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100300
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100301
			}
		]
	},
	{
		name: 'content_cat',
		description: '内容分类',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100400
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100401
			}
		]
	},
	{
		name: 'content_ls',
		description: '内容列表',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100500
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100501
			}
		]
	},
	{
		name: 'goods_cat',
		description: '商品分类',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100600
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100601
			}
		]
	},
	{
		name: 'goods_attr',
		description: '分类参数',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100700
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100701
			}
		]
	},
	{
		name: 'goods_ls',
		description: '商品列表',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100800
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100801
			}
		]
	},
	{
		name: 'order',
		description: '订单管理',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100900
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100901
			}
		]
	},
	{
		name: 'users',
		description: '用户管理',
		authorities: [
			{
				name: 'read',
				description: '查看',
				code: 100110
			},
			{
				name: 'edit',
				description: '编辑',
				code: 100111
			}
		]
	}
];