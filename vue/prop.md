- prop

```js
props: {
  type: [ String, ],
  reqiured: true,
  default: 100,
  validator: function (value){
    return ['success', 'waring'].indexOf(value) !== -1
  }
}
```


- this.$once('hook: beforeDestory', ()=>{
  picker.destroy()
})