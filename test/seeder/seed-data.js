module.exports = [{
  model: 'User',
  documents: [{
    _id: '57e2d4b0cbc1417317176519',
    name: {
      firstname: 'tonida',
      lastname: 'baraza'
    },
    username: 'tonee',
    email: 'toni@gmail.com',
    title: 'admin',
    password: 'admin'
  }, {
    _id: '57e2d4b0cbc141731717651a',
    name: {
      firstname: 'Racheal',
      lastname: 'Asiko'
    },
    username: 'rael',
    email: 'rael@gmail.com',
    password: '12RaeL34'
  }, {
    _id: '57e2d4b0cbc141731717651b',
    name: {
      firstname: 'Alex',
      lastname: 'Ogara'
    },
    username: 'alex',
    email: 'alex@gmail.com',
    password: '*dinNNerQ'
  }]
}, {
  model: 'Role',
  documents: [{
    _id: '57e3a3bb198c7df30279ca5e',
    title: 'admin'
  }, {
    _id: '57e3a3a0198c7df30279ca5d',
    title: 'user'
  }, {
    _id: '57e58a1e090f1c761e4cae94',
    title: 'superUser'
  }
]
}, {
  model: 'Document',
  documents: [{
    _id: '57e3f5260749b7a707b5e366',
    title: 'Christ',
    content: 'Christ is the Lord',
    ownerId: '57e2d4b0cbc1417317176519',
    createdAt: '2016-09-21T18:42:56.322Z',
    roleId: '57e3a3bb198c7df30279ca5e',
    view: 'private'
  }, {
    _id: '57e3f5260749b7a707b5e367',
    title: 'Penny',
    content: 'I don \'t know what she wants',
    ownerId: '57e2d4b0cbc141731717651a',
    createdAt: '2016-09-16T12:20:06.877Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    view: 'private'
  }, {
    _id: '57e3f6260749c7a707b5e367',
    title: 'Grace',
    content: 'God loved the world',
    ownerId: '57e2d4b0cbc141731717651a',
    createdAt: '2016-09-16T12:20:06.877Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    view: 'private'
  }, {
    _id: '57e3f5280749b7a707b5e369',
    title: 'Information',
    content: 'Information is power',
    ownerId: '57e2d4b0cbc141731717651b',
    createdAt: '2016-09-21T18:42:56.322Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    view: 'public'
  }, {
    _id: '57dbe376edaf099250e17b94',
    updatedAt: '2016-09-16T12:20:06.877Z',
    createdAt: '2016-09-16T12:20:06.877Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651a',
    content: 'You can become anything',
    title: 'Money',
    view: 'private'
  }, {
    _id: '57ddc4a5873c5ec457e1c20a',
    updatedAt: '2016-09-17T22:33:09.026Z',
    createdAt: '2016-09-17T22:33:09.026Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651a',
    content: 'today1',
    title: 'today12',
    view: 'private'
  }, {
    _id: '57e0d86fa61834bb0b05edf3',
    updatedAt: '2016-09-20T06:34:23.027Z',
    createdAt: '2016-09-20T06:34:23.027Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651a',
    content: 'pendo',
    title: 'pendoli',
    view: 'public'
  }, {
    _id: '57e0da12673cffd10b9d6ae3',
    updatedAt: '2016-09-20T06:41:22.368Z',
    createdAt: '2016-09-20T06:41:22.368Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651b',
    content: 'pendo',
    title: 'pendo is awesome',
    view: 'private'
  }, {
    _id: '57e0da84e0bc2bde0b944bbb',
    updatedAt: '2016-09-20T06:43:16.601Z',
    createdAt: '2016-09-20T06:43:16.601Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651b',
    content: 'pendo',
    title: 'pendo is awesome too',
    view: 'public'
  }, {
    _id: '57e39e3f8dbb818002cd6d52',
    updatedAt: '2016-09-22T09:02:55.194Z',
    createdAt: '2016-09-22T09:02:55.194Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651b',
    content: 'Good business, God business',
    title: 'Love',
    view: 'private'
  }, {
    _id: '57e39f108dbb818002cd6d53',
    updatedAt: '2016-09-22T09:06:24.692Z',
    createdAt: '2016-09-22T09:06:24.692Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651b',
    content: 'so tiresome',
    title: 'admin work',
    view: 'public'
  }, {
    _id: '57e39fe715fc08bb025af98b',
    updatedAt: '2016-09-22T09:09:59.833Z',
    createdAt: '2016-09-22T09:09:59.833Z',
    roleId: '57e3a3bb198c7df30279ca5e',
    ownerId: '57e2d4b0cbc1417317176519',
    content: 'so tiresome too',
    title: 'admin work2',
    view: 'private'
  }, {
    _id: '57e3a00e4ccd52bf0218bd7c',
    updatedAt: '2016-09-22T09:10:38.359Z',
    createdAt: '2016-09-22T09:10:38.359Z',
    roleId: '57e3a3bb198c7df30279ca5e',
    ownerId: '57e2d4b0cbc1417317176519',
    content: 'so tiresome too',
    title: 'admin work23',
    view: 'private'
  }, {
    _id: '57e3a41fab0377fc025d976b',
    updatedAt: '2016-09-22T09:27:59.414Z',
    createdAt: '2016-09-22T09:27:59.414Z',
    roleId: '57e3a3a0198c7df30279ca5d',
    ownerId: '57e2d4b0cbc141731717651a',
    content: 'Really tired',
    title: 'user',
    view: 'public'
  }]
}];
