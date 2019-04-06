export default {
    type: 'mongodb',
    url: process.env.MONGODB_URI,
    entities: ["dist/**/**.entity{.ts,.js}"],
    synchronize: true
};