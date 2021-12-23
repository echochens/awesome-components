# 通用彈窗组件

## 用法

```javascript
<AwardPopup cls={'award-pop-class'} status={awardPopStatus} toggle={setAwardPopStatus} whiteClick={true}/>
```

## 支持参数

- cls: string class增加額外樣式
- status: boolean 彈窗是否显示
- updateAttr: object 數據依賴導致更新的數據，仅限用來判斷是否更新組件
- whiteClick: boolean 是否需要空白點擊關閉

## 事件

- toggle: boolean 点击展開收起事件