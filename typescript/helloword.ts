import { fuchsia } from "color-name";

// 变量类型
var age:number =18
var height:number = 178.5 
var jss:string = '技术胖'
var zhende:boolean = true 
enum HUNMAN{nan="男人", nv="女人", yao="妖"}
var t:any = 10
function search (age:number):string {
  return '找到了'+ age +'aha'
}

function search1 (age:number, height?:number):string {
  let yy:string = ''
  yy= '找到了'+ age +'岁'
  if(height!=undefined){
    yy= yy + height
  }

  return yy
}
function search2 (...canshu:string[]):string {
  let yy:string = ''
  return yy
}

// 函数
function add(n1:number, n2:number):number {
  return n1+ n2
}
const add1 = (n1:number, n2:number):number => {
  return n1+ n2
}


var reuslt:string = search(age)
var result1:string= search1(age, height)
console.log(age, height, jss, zhende, HUNMAN.yao,reuslt, result1,add1(1,2) )

// 变量的作用域
// function zhengxing():void {
//   console.log(yangzi) // 出现变量提升
//   var yangzi:string = 'liudude'
// }
// zhengxing(yangzi)

// 全局变量 局部变量
function view ():void{
  var yangzia:string = '刘德华'
  {
    let yangzib:string = '小生杨'
  }
}

// 引用类型
let jspang = {
  name: "jishupang",
  website: 'jspang',
  age: '18',
  say: function() {
    console.log('weilebuluo')
  }
}
console.log(jspang.name)
jspang.say()

// 数组 --- arry String Date RegExp

// let arr1:number[]
// let arr2:Array<string>

// 字面量赋值法
// 构造函数赋值法
let arr1:number[] = []
let arr2:number[] = [1,2,34,56,2]
let arr3:Array<string> = ['jspang','jisjumm','232']
let arr4:Array<boolean> = [true, false]

let arr5:number[] = new Array()
let arr6:number[] = new Array(1,2,34,56,2)
let arr7:Array<string> = new Array('jspang','jisjumm','232')

// 元祖 (有顺序)
let arr8:[string, number]
arr8=['hehe',10]

let stringa:string = '1414'
let stringb:String = new String('141414')

let data1:Date = new Date()
// 传递一个整数

let data2:Date = new Date('2018/09/07')


//RegExp

let rega:RegExp = new RegExp('jpsang')

let regb:RegExp = new RegExp('jpsang','gi')

let regc:RegExp = /jpsang/gi

// test() exec() match()

let reg1:RegExp = /jpsang/i
let web:string = 'jspang.test'
let results1:boolean = reg1.test(web)
console.log(reg1.exec(web))

// 面向对象编程 类是对象具体事物的一个抽象，对象是类的具体表现
class Xiaojiejie {
  name:string
  age:number
  constructor(name:string, age:number){
    this.name = name
    this.age = age
  }
  say(){
    console.log('xiaogege')
  }
}
let jiejie:Xiaojiejie = new Xiaojiejie('fan', 18)

// 修饰符  public protected

class Xiaogege {
  public sex:string
  protected name: string
  private age: number
  public constructor(sex:string,name:string,age:number){
    this.sex = sex
    this.name = name
    this.age = age
  }
  public sayhello (){
    console.log('xioadidihao')
  }
  protected saylove (){
    console.log('l love you')
  }
}

var duxiang:Xiaogege = new Xiaogege('nv', 'reb', 18)

// 继承和重写
class Jspang{
  public name:string
  public age:number
  public skill:string
  constructor(name:string,age:number,skill:string){
    this.name = name
    this.age = age
    this.skill = skill
  }
  public interest(){
    console.log('codong')
  }
}
let jspangObj:Jspang = new Jspang('js', 18, 'xodong')


class Jschjilred extends Jspang{
  public interest(){
    super.interest()
    console.log('jianlitaobao')
  }
  public xingxiang:string = 'shuaiqi'
  public zhuaniqna(){
    console.log('zhuanqinajineng')
  }
}

let jsshuai:Jschjilred = new Jschjilred('jshsuai',5,'yanjjiang')

// 接口
interface aaaa{
  name: string
  age:number
  skill?:string
}

let Aaa:aaaa = {name:'nan', age:18}