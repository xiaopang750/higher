higher

1. 不能跨层级使用 fe-role

比如:

div(fe-role="Switch")
  ul
    li(fe-role="Widget")

2. 监听组件某些事件的时候 注意绑定的层级

比如:

div(fe-role="Switch")
  ul(fe-role="Switch")
    li(fe-role="Widget")

如果 把switchend 绑定在最外层会触发两次swtichend 因为事件会冒泡

如果 绑定在ul 上就只会触发一次
