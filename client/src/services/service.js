const service = {
  allUsers: () =>
    fetch('/allUsers')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
}

export default service;
