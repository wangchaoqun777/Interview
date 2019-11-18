// const e = React.createElement
// return e(
//   'button', 
//   { onClick: () => this.setState({ liked: true }) }, 
//   'Like'
// )

// return (
//   <button onClick={ () => this.setState( {liked:true})}> Like </button>
// )


{/* <script type="text/babel"> */}
  const domContainer = document.querySelector('#like_button_container')
  ReactDOM.render( <button onClick={ () => this.setState( {liked:true})}> Like </button>, domContainer)
// </script>