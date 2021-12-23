# 通用下載组件

## 用法

```javascript
const { content = {} } = useLang({ langPath: dir })
<Download content={content} onDownload={onDownload} actionClip={actionClip} onCancel={onCancel} appType={APPENV} />

```

## 支持参数

- content: object 下載相關文本內容（eg: 標題title、文本info、下載按鈕名字download、取消按鈕名字agent）
- actionClip: string 点击后的复制内容
- appType: string 下載app的類型（eg: tiya、zy）

## 事件

- onDownload: function 点击下载事件
- onCancel: function 点击取消事件
