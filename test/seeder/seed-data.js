module.exports = [{
  model: 'User',
  documents: [
    {
      name: {
        firstname: 'tonida',
        lastname: 'baraza'
      },
      username: 'tonee',
      email: 'toni@gmail.com',
      role: 'admin',
      password: 'admin'
    },
    {
      name: {
        firstname: 'Racheal',
        lastname: 'Asiko'
      },
      username: 'rael',
      email: 'rael@gmail.com',
      password: '12RaeL34'
    },
    {
      name: {
        firstname: 'Alex',
        lastname: 'Ogara'
      },
      username: 'alex',
      email: 'alex@gmail.com',
      password: '*dinNNerQ'
    }
  ]
},
{
  model: 'Role',
  documents: [
    {
      role: 'admin'
    // },
    // {
    //   role: 'public'
    }
  ]
},
{
  model: 'Document',
  documents: [
    {
      title: 'Christ',
      content: 'Christ is the Lord'
    },
    {
      title: 'Penny',
      content: 'I don \'t know what she wants'
    }
  ]
}];
