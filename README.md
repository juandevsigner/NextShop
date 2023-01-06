#Next.js ShopNext
Run db local

```
docker-compose up -d
```

Local URL:

```
mongodb://localhost:27017/nextshopdb
```

Local rul:

```
MONGO_URL=mongodb://localhost:27017/nextshop
```

#Build node modules

```
yarn install
```

#Run app

```
yarn run dev
```

#Call database with example products

```
http://localhost:3000/api/seed
```
