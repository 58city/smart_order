/*
 * 防抖函数
 */
export function debounce(fn, delaytime = 0) {
	let timer = null
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.call(this, args)
		}, delaytime)
	}
}
/*
 * 普通对象获取所有下级分类
 */
export function getChildren(id, list) {
  var idArray = []
  for (var i = 0; i < list.length; i++) {
    if (id == list[i].pid) {
      idArray.push(list[i])
      idArray.push(...getChildren(list[i]._id, list))
    }
  }
  return idArray
}
/*
 * 普通对象转换为树结构对象
 */
export function toTree(data, type) {
	data.forEach(function (item) {
		delete item.children
	})

	var map = {}
	data.forEach(function (item) {
		map[item._id] = item
	})

	var val = []
	for (let i = 0; i < data.length; i++) {
		if (data[i].level >= type) { continue }
		var parent = map[data[i].pid]
		if (parent) {
			(parent.children || (parent.children = [])).push(data[i])
		} else {
			val.push(data[i])
		}
	}
	return val
}
/*
 * 查询树结构对象--非递归
 */
export function deepQuery(tree, id) {
	var stark = []
	stark = stark.concat(tree)
	while (stark.length) {
		var temp = stark.shift()
		if (temp.children) {
			// 当前节点有子节点时，将子节点放到当前的栈的前面
			stark = temp.children.concat(stark)
		}
		if (id === temp._id) {
			return temp
		}
	}
}
/*
 * 查询树结构对象--递归
 */
export function RdeepQuery(tree, id) {
	var isGet = false
	var retNode = null
	function deepSearch(tree, id) {
		for (var i = 0; i < tree.length; i++) {
			if (tree[i].children && tree[i].children.length > 0) {
				deepSearch(tree[i].children, id)
			}
			if (id === tree[i]._id || isGet) {
				isGet || (retNode = tree[i])
				isGet = true
				break
			}
		}
	}
	deepSearch(tree, id)
	return retNode
}
/*
 * 删除树结构对象--某个节点
 */
export function RdeepDelete(tree, id) {
	var isDeleted = false
	function deepDel(tree, id) {
		for (var i = 0; i < tree.length; i++) {
			if (tree[i].children && tree[i].children.length > 0) {
				deepDel(tree[i].children, id)
			}
			if (id === tree[i]._id || isDeleted) {
				isDeleted || tree.splice(i,1)
				isDeleted = true
				break
			}
		}
	}
	deepDel(tree, id)
}