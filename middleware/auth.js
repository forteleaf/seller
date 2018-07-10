export default ({store, error}) => {
  if (!store.state.isAuth) {
    error({
      message: 'You are not Login',
      statusCode: 403
    })
  }
}
