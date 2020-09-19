import {Page} from '@core/page/Page'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@core/utils'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Formula} from '@/components/Formula/Formula'
import {Table} from '@/components/Table/Table'
import {normalizeInitialState} from '@/redux/initialState';
import {LocalStorageClient} from '@/shared/LocalStorageClient';
import {StateProcessor} from '@core/page/StateProcessor';


export class ExcelPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    )
  }

  async getRoot() {
    const state = await this.processor.get() // storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
