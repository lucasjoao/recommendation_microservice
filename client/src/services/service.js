const service = {
  connect: () =>
    fetch('/connect')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
      .then(json => {
        return json.hasConnection ? Promise.resolve(true) : Promise.reject(false)
    })
  ,
  // get dump data
  allUsers: () =>
    fetch('/allUsers')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
  ,
  getSuggestions: (id) =>
    fetch(`/suggestions?id=${id}`)
      .then(r => Promise.resolve(r))
      .then(r => r.json())
  ,
  // BUG: get real data from other microservice
  realAllUsers: () =>
    fetch('/realAllUsers')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
}

export default service;
