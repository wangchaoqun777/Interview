import { App } from 'vue'
import BasicSelect from './BasicSelect/index.vue'
import BasicTable from './BasicTable/index.vue'
import BasicForm from './BasicForm/index.vue'
import BasicPageList from './BasicPageList/index.vue'
import BasicTitle from './BasicTitle/index.vue'
export default {
  install(app: App): void {
    app.component(BasicSelect.name, BasicSelect)
    app.component(BasicTable.name, BasicTable)
    app.component(BasicForm.name, BasicForm)
    app.component(BasicPageList.name, BasicPageList)
    app.component(BasicTitle.name, BasicTitle)
  },
}
