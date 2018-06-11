const service = {
  allUsers: () =>
    fetch('/allUsers')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
  ,
  getSuggestions: (id) =>
    fetch(`/suggestions?id=${id}`)
      .then(r => Promise.resolve(r))
      .then(r => r.json())
}

export default service;
