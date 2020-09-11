import '@/scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Formula} from '@/components/Formula/Formula'
import {Table} from '@/components/Table/Table'
import {rootReducer} from '@/redux/rootReducer';
import {createStore} from '@core/createStore';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
