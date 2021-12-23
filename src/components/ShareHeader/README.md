# 通用落地页分享头部组件

## 用法

```javascript
<ShareHead></ShareHead>
```

## 支持参数

- nowPage: string 当前页面名称，跳转webView必填
- jumpPage: string 跳转到的页面，跳转webView必填
- isFullScreen: boolean 是否全屏显示，仅跳webView支持
- isLight: boolean 全屏显示下，状态栏字体是否白色显示
- isFixed: boolean 是否悬浮下载
- scheme: string app跳转action参数，仅限非webView跳转使用
- dir: string 组件放置位置，用于多语言文件读取，默认：'components/ShareHead'

## 事件

- onDownload: function 点击下载事件
- onJump: function 点击跳转事件