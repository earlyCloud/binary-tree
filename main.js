/*将一个排序好的整数数组转换为一棵高度最小的二叉树*/

var arr = [0, 1, 5, 7, 8, 9, 11, 25, 26, 44, 55, 66, 99, 100];

var sortedArrToBST = {
	nodeArr: [],  //存放树节点的数组
	toBST: function(arr){
		var treeNode = {};
		treeNode = this.toTwo(arr);
		this.nodeArr.push(treeNode);
		//当前node的左节点的处理
		if(treeNode.leftArr.length >= 1){
			this.toBST(treeNode.leftArr);
		}
		//当前node的右节点的处理
		if(treeNode.rightArr.length >= 1){
			this.toBST(treeNode.rightArr);
		}	
	},
	toTwo: function(arr){  //将数组从中间分为左右两组
		var treeNode = { 
			node: 0,
			leftArr: 0,
			rightArr: 0
		};
		var start = 0, 
			 end = arr.length;
		var middle = Math.floor( (start+end)/2 );
		var leftArr = arr.slice(0, middle);
		var rightArr = arr.slice(middle+1);
		treeNode = this.setNodeInfo(arr[middle], leftArr, rightArr);
		treeNode.left = leftArr[Math.floor(leftArr.length/2)];
		treeNode.right = rightArr[Math.floor(rightArr.length/2)];
		return treeNode;
	},
	setNodeInfo: function(node, leftArr, rightArr){
		return {
			node: node,
			leftArr: leftArr,
			rightArr: rightArr
		}
	}

};



var body = document.getElementsByTagName('body')[0];
sortedArrToBST.toBST(arr);
//获取转换后的树节点数组
var nodeArr = sortedArrToBST.nodeArr;
//在HTML中生成树
generateTree(nodeArr);

function generateTree(nodeArr){
	//遍历树对象数组
	var len = nodeArr.length;
	for(var i=0; i<len; i++){
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

/*
*创建树节点的函数
*@param parent:所生成节点的父节点; nodeValue:节点值
*/
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
