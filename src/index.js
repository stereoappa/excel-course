import '@/scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Formula} from '@/components/Formula/Formula'
import {Table} from '@/components/Table/Table'
import {rootReducer} from '@/redux/rootReducer';
import {createStore} from '@core/createStore';
import {storage} from '@core/utils';

const store = createStore(rootReducer, storage('excel-state'))

store.subscribe(state => {
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
