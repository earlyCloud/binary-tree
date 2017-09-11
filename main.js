/*将一个排序好的整数数组转换为一棵高度最小的二叉树*/

//递归将数组从中间分为左右两组
var arr = [1, 5, 7, 8, 9, 11, 25, 26, 44, 55, 66, 99, 100];
var sortedArrToBST = {
	nodeArr: [],  //存放树节点的数组
	height: 1,   //树高，默认为1
	//preMid: null,
	//counter: 1,  //调用toTwo的次数，反映的是操作是的树深
	toBST: function(arr){
		var treeNode = {};
		/*var treeNode = {
			node: 0,
			left: 0,
			right: 0,
			leftArr: 0,
			rightArr: 0
		};*/
		treeNode = this.toTwo(arr);
		this.nodeArr.push(treeNode);

		//循环到叶
		/*if(treeNode.left.length == 0){
			treeNode = this.setNodeInfo(this.counter, treeNode.left[0], null, null);
			this.nodeArr.push(treeNode);
		}
		if(treeNode.right.length == 0){
			treeNode = this.setNodeInfo(this.counter, treeNode.right[0], null, null);
			this.nodeArr.push(treeNode);
		}*/

		//当前node的左节点的处理

		if(treeNode.leftArr.length >= 1){
			this.toBST(treeNode.leftArr);

			//this.nodeArr[(length-1)].left = this.preMid;
			//this.height += 1;
		}
		//当前node的右节点的处理
		if(treeNode.rightArr.length >= 1){
			this.toBST(treeNode.rightArr);
		}
		
		
	},
	
	toTwo: function(arr){
		var treeNode = {
			node: 0,
			leftArr: 0,
			rightArr: 0
		};
		var start = 0, 
			 end = arr.length;
		// if(end > 3){
			var middle = Math.floor( (start+end)/2 );
			var leftArr = arr.slice(0, middle);
			var rightArr = arr.slice(middle+1);
			treeNode = this.setNodeInfo(arr[middle], leftArr, rightArr);
			treeNode.left = leftArr[Math.floor(leftArr.length/2)];
			treeNode.right = rightArr[Math.floor(rightArr.length/2)];
		// }else{
		// 	treeNode = this.setNodeInfo(arr[0], null, null);
		// }
		return treeNode;
	},
	setNodeInfo: function(node, left, right){
		//if(right && right!=0){
			return {
				node: node,
				leftArr: left,
				rightArr: right
			}
		/*}else {
			return {
				node: node,
				left: left,
				right: null
			}
		}*/
	}

};



//树深就是嵌套深度

var body = document.getElementsByTagName('body')[0];
sortedArrToBST.toBST(arr);
console.log(sortedArrToBST.nodeArr);
var nodeArr = sortedArrToBST.nodeArr;

generateTree(nodeArr)

function generateTree(nodeArr){
	//遍历树对象数组
	var len = nodeArr.length;
	for(var i=0; i<len; i++){
		//如果节点存在（比如数组为空的情况，树对象全是空）
		if(!(nodeArr[i].node == undefined)){
			//第一个元素，父节点是body
			if(i==0){
				createNode(body, nodeArr[i].node);
				if(nodeArr[i].left || nodeArr[i].left == 0){   //有左节点
					var parTagClass = 'd' + nodeArr[i].node;
					var parDom = document.getElementsByClassName(parTagClass)[0];
				if(nodeArr[i].right || nodeArr[i].right == 0){  //有右节点
					createNode(parDom, nodeArr[i].left);
					createNode(parDom, nodeArr[i].right);
				}else{
					createNode(parDom, nodeArr[i].left);
				}
			}else{  //是叶子节点
				continue;
			}
			}else{  //不是第一个元素，其父节点根据树的情况决定
				if(nodeArr[i].left || nodeArr[i].left == 0){   //有左节点
					var parTagClass = 'd' + nodeArr[i].node;
					var parDom = document.getElementsByClassName(parTagClass)[0];
				if(nodeArr[i].right || nodeArr[i].right == 0){  //有右节点
					createNode(parDom, nodeArr[i].left);
					createNode(parDom, nodeArr[i].right);
				}else{
					createNode(parDom, nodeArr[i].left);
				}
			}else{  //是叶子节点
				continue;
			}
			}
		}
	}
}

function createNode(parent, nodeValue){
	//生成节点
	var tree = document.createElement('div');
	tree.className = 'tree';
	var tagClass = 'd' + nodeValue;
	addClass(tree, tagClass);
	var span = document.createElement('span');
	span.innerText = nodeValue;
	tree.appendChild(span);
	//将生成的树节点插入到父节点中
	parent.appendChild(tree);
}
function isLeafNode(obj){
	if(obj.left==undefined && obj.right==undefined){
		return true;
	}else{
		return false;
	}
}
//添加class
function addClass(ele,className){
     if(ele.className){
		 var claArr = ele.className.split(' ');
		 for(var i in claArr){   //如果元素中原来有这个class，那么就没必要再添加
			 if (claArr[i]==className){
				 return;
			 }
		 }	 
	     ele.className += (' '+className);
	 }else{
	     ele.className = className;
	 }
}

