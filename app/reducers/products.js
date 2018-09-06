let initialState = [
  {id: 1, name: 'tv', cost: 1000, description: 'new model smart tv'},
  {id: 2, name: 'phone', cost: 300, description: 'iphoneX buy it now'}
]

export default function products(state=initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
