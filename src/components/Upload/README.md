# 通用文件 Upload 组件

## 用法

```javascript
<Upload accept={accept} multiple={multiple} fileMaxSize={fileMaxSize} handleImageUpload={handleImageUpload} ></Upload>,
```

## 支持参数

- id: string 用於選取 dom 元素 默認：imgpicker
- multiple: boolean 是否支持多文件上傳 默認：false
- accept: string 文件類型限制 默認：image/png, image/jpg
- fileMaxSize: number 文件大小限制 默認：1024

## 事件

- handleImageUpload: function 獲取上傳到的文件信息
