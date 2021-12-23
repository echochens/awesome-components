# 跑马灯组件

## props 参数

- data: Array 跑马灯数据
- children: Function 跑马灯显示数据 DOM，必须函数组件，具体使用看用例
  - 该函数组件会接收数据项数据，以及 data 数组
- speed: Number 跑马灯速度，根据 type 的不同代表的含义也不同
- dir: Boolean 调整跑马灯运动方向，不用传值也可以
- type: Number 跑马灯类型，0 落隐落现 1 水平 2 自上而下 （默认 0）

## 向外导出的参数 使用 ref 接收

- index: useRef 当前的显示数据项
- data: useRef 跑马灯内部的数据列表，可以对其进行增删操作

## 用例

```javascript
const data = [
  { a: '我草，牛逼，6666' },
  { a: '恭喜xxx抽中绝世大礼包' },
  { a: '恭喜yyy抽走奖池8888奖金' },
]

// 简单使用
<Notice data={data}>
  {props => props.data.a}
</Notice>

// 自定义样式
<Notice data={data}>
  {({ data = {} }) => (
    <div style={{ backgroundColor: 'red' }}>{data.a}</div>
  )}
</Notice>

// 接收内部导出的数据
const NoticeHandle = useRef()
<Notice data={data} ref={NoticeHandle}>
  {props => props.data.a}
</Notice>
// 在 NoticeHandle.current 中就可以拿到导出的数据
```
