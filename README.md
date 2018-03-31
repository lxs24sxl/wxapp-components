# wxapp-components
> 简易的微信小程序的组件库
> 总的效果demo和图片有时间马上搞上去,目前正在公司搬砖中，有兴趣的给个star关注下哈~~

## 目的
> 为了简化自己和公司的开发时间而编写

## 使用例子

- 将组件的文件夹放在根目录下


- 对应页面的json文件引入

```json
{
	"usingComponents": {
		"popup": "../../components/popup/popup"
	}
}
```

- 按规则使用
```html
<!-- 
	isShowPopup:是否显示顶部弹出框 {Boolean}
	tipContent: 弹出框显示内容 {String} 
 -->
<popup is-show="{{isShowPopup}}" content="{{tipContent}}"></popup>
```

