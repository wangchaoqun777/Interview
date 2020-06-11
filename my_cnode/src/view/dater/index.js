import React, { Component } from "react";
import Calendar from "rc-calendar";
import "rc-calendar/assets/index.css";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import MultiSelectPanel from "react-multi-select-panel";
import MultiSelect from "@khanacademy/react-multi-select";
import Select, { Option } from "rc-select";
// import "rc-select/assets/index.less";
// import Select from "react-select";
// require("react-multi-select-panel/index.css");
// const cn = location.search.indexOf("cn") !== -1;

const now = moment();
const options = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 }
];

// if (cn) {
now.locale("zh-cn").utcOffset(8);
// }
// const now = new Date(); // 今日
// const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 昨天
class Dater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      en: false,
      show: true,
      currentDate: "",
      selected: [],
      noSelectedOptions: [
        { id: "6069231", title: "哈哈哈测试上传配图绑定" },
        { id: "6069232", title: "测试计划计划" },
        { id: "6069233", title: "测试计划计划" }
      ],
      selectedOptions: [
        { id: "6069224", title: "kkkk" },
        { id: "6069225", title: "新的乱买词" },
        { id: "6069216", title: "21新增的移动计划112312311" },
        { id: "6069217", title: "测试测试...1" },
        { id: "6069218", title: "客户端测试 计划hhh" },
        { id: "6069199", title: "2222" },
        { id: "6069191", title: "多线程计划" },
        { id: "6069182", title: "1233456789" },
        { id: "6069183", title: "test_kune90909" }
      ],
      showSelects: false
    };
  }
  // getDateExtra = date => extra[+date];
  onConfirm = (startTime, endTime) => {
    this.setState({
      startTime,
      endTime
    });
  };
  onSelect = date => {
    this.setState({
      currentDate: date
    });
  };
  getRelax = () => {
    console.log("ok");
  };
  dateRender = (value, current, c) => {
    console.log("tag1", value);
    return (
      <div className="rc-calendar-date">
        <span>{value.date()}</span>
        <span>8h</span>
      </div>
    );
  };
  // setRelax = () => {
  //   const currentTime = +new Date(this.state.currentDate);
  //   if (currentTime <= +now) return Toast.info("请假日期应大于当前日期", 1);
  //   return alert("请假确认", "确定请假吗？", [
  //     { text: "取消", onPress: () => console.log("cancel") },
  //     {
  //       text: "确定",
  //       onPress: () => {}
  //     }
  //   ]);
  // };
  // componentDidMount() {
  //   const disable_arr = document.getElementsByClassName("disable");
  //   Object.keys(disable_arr).forEach(item => {
  //     disable_arr[item].classList.add("relax");
  //     disable_arr[item].classList.remove("disable");
  //   });
  // }
  btnClick() {
    const { showSelects } = this.state;
    this.setState({ showSelects: !showSelects });
  }

  panelSubmit(l, r) {
    console.log(Object.keys(r));
  }
  render() {
    const {
      noSelectedOptions,
      selectedOptions,
      showSelects,
      selected
    } = this.state;
    return (
      <Select
        style={{ width: "200px" }}
        prefixCls="wcq"
        className="wcq"
        id="id"
      >
        <Option value="jack">jack</Option>
        <Option value="lucy">lucy</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    );
  }
}
export default Dater;
