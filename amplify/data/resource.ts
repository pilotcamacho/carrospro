import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  Propietario: a.model({
    id: a.id().required(),
    purchaseDate: a.date().required(),
    carroId: a.id().required(),
    carro: a.belongsTo('Carro', 'carroId'),
  }).identifier(['id', 'carroId'])
    .authorization((allow) => [allow.group('Admin'), allow.owner(), allow.authenticated().to(['read'])]),

  ToDo: a.model({
    name: a.string().required(),
    description: a.string(),
    isDone: a.boolean().default(false),
    doneDate: a.date(),
    carroId: a.id().required(),
    carro: a.belongsTo('Carro', 'carroId'),
    createdAt: a.datetime().required(),
  }).secondaryIndexes((index) => [index("carroId").sortKeys(['createdAt'])])
    .authorization((allow) => [allow.group('Admin'), allow.owner(), allow.authenticated().to(['read'])]),

  Document: a.model({
    name: a.string().required(),
    type: a.enum(['jpg', 'pdf']),
    s3_path: a.string(),
    s3_thumbnail_path: a.string(),
    issueDate: a.date(),
    expirationDate: a.date(),
    cost: a.float(),
    carroId: a.id().required(),
    carro: a.belongsTo('Carro', 'carroId'),
  }).secondaryIndexes((index) => [index("carroId").sortKeys(['expirationDate'])])
    .authorization((allow) => [allow.group('Admin'), allow.owner(), allow.authenticated().to(['read'])]),

  Service: a.model({
    name: a.string().required(),
    type: a.enum(['Gasolina', 'CambioAceite', 'Lavado', 'AguaVidrios', 'AguaMotor', 'Llantas', 'Taller', 'Parking']),
    description: a.string(),
    price: a.float().required(),
    km: a.integer().required(),
    dateTime: a.datetime().required(),
    location: a.customType({
      lat: a.float(),
      long: a.float(),
    }),
    carroId: a.id().required(),
    carro: a.belongsTo('Carro', 'carroId'),
  }).secondaryIndexes((index) => [index("carroId").sortKeys(['dateTime'])])
    .authorization((allow) => [allow.group('Admin'), allow.owner(), allow.authenticated().to(['read'])]),

  Carro: a.model({
    name: a.string().required(),
    brand: a.string().required(),
    model: a.string().required(),
    year: a.integer().required(),
    plate: a.string().required(),
    color: a.string().required(),
    documents: a.hasMany('Document', 'carroId'),
    services: a.hasMany('Service', 'carroId'),
    toDos: a.hasMany('ToDo', 'carroId'),
    propietarios: a.hasMany('Propietario', 'carroId'),
  })
    .authorization((allow) => [allow.group('Admin'), allow.owner(), allow.authenticated().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  name: 'CarrosProData',
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});


