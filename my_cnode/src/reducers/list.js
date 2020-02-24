export default  function list( state={
  loading: true,
  data: []
},action ) {
  switch(action.type) {
    case 'List_UPDATA_SUCC':
      return {
        data: action.data,
        loading: false
      }
    case "List_UPDATA_ERR": 
      return {
        data: action.data,
        loading: true
      }
    default: 
      return state
  }
}