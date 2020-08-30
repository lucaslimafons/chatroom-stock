# Jobsity Chatroom Stock Service

### Steps

1. First of all run
```
$ npm install
```

2. Create an environment file named .env and then copy the content from .env.dev and paste into .env

3. Start zookeeper server
```
$ npm run zookeeper
```

4. Start kafka server
```
$ npm run kafka
```

5. Create topics
```
$ kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic parse_stock_quote

$ kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic result_stock_quote
```

6. Run the project
```
$ npm start
```

That's it!
