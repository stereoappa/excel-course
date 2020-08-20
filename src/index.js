import '@/scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Formula} from '@/components/Formula/Formula'
import {Table} from '@/components/Table/Table'
import {rootReducer} from '@/redux/rootReducer';
import {createStore} from '@core/createStore';

const store = createStore(rootReducer, {
  tableTitle: 'My Table excel'
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
