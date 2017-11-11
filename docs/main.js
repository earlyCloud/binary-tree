/*将一个排序好的整数数组转换为一棵高度最小的二叉树*/

var arr = [];

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
/**********************************************************/


var userInput = document.getElementById("userInput"),
	 converButton = document.getElementById("conver"),
	 result = document.getElementById("result"),
	 showDOM = document.getElementById('showTheTree');

userInput.addEventListener('keyup', function(e){
	if(e.keyCode == 13){
		converButton.click();	
	}
});
converButton.addEventListener('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	//重置生成树
	showDOM.innerHTML = '';
	//重置生成树数组
	sortedArrToBST.nodeArr = [];
	var resultText = '';
	//获取用户输入
	var input = userInput.value;
	//检测是否含有字母或者一些字符
	var check = /[a-zA-Z^%&/'":;=?$]+/g;
	if(input.search(check) != -1){
		resultText = "请输入纯数字";
		showResult(result, resultText);
		return;
	};
	//去除空格,分割
	input = input.replace(/\s/g, "");
	var inputArr = input.split(',');
	//去重
	inputArr = unique(inputArr);
	//排序
	inputArr.sort(function(v1, v2){
		if(Number(v1) < Number(v2)){
			return -1
		}else if(Number(v1) > Number(v2)){
			return 1
		}else{
			return 0
		}
	});
	sortedArrToBST.toBST(inputArr);
	//获取转换后的树节点数组
	var nodeArr = sortedArrToBST.nodeArr;
	//在HTML中生成树
	generateTree(nodeArr);

	//显示结果数组
	resultText = '[ ' + inputArr + ' ]';
	showResult(result, resultText);
	//重置输入框
	userInput.value = '';
});





/*********************************************************/
function generateTree(nodeArr){
	//遍历树对象数组
	var len = nodeArr.length;
	for(var i=0; i<len; i++){
		if(!(nodeArr[i].node == undefined)){
			//第一个元素，父节点是showDOM
			if(i==0){
				createNode(showDOM, nodeArr[i].node);
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

/*function jugementCreate(nodeObj){
	if(nodeObj.left || nodeObj.left == 0){   //有左节点
		var parTagClass = 'd' + nodeObj.node;
		var parDom = document.getElementsByClassName(parTagClass)[0];
		if(nodeObj.right || nodeObj.right == 0){  //有右节点
			createNode(parDom, nodeObj.left);
			createNode(parDom, nodeObj.right);
		}else{
			createNode(parDom, nodeObj.left);
		}
}*/
function showResult(node, text){
	node.innerText = text;
}
function isLeafNode(obj){
	if(obj.left==undefined && obj.right==undefined){
		return true;
	}else{
		return false;
	}
}

//数组去重
function unique(arr){
	var i, o = {}, temArr = [], len = arr.length;
	if(len){
		for(i=len-1; i>=0; i--){
			if(o[arr[i]]){
				continue
			}else{
				temArr[temArr.length] = arr[i];
				o[arr[i]] = 1;
			}
		}
	}
	return temArr;
}

//添加class
function addClass(ele,className){
     if(ele.className.indexOf(className) == -1)
	     ele.className += (' ' + className);
		return 
}
