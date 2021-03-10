cd ../client
docker build . -t zbowhay/client:0.0.1
cd ../../comments
docker build . -t zbowhay/comments:0.0.1
cd ../../event-bus
docker build . -t zbowhay/event-bus:0.0.1
cd ../../moderation
docker build . -t zbowhay/moderation:0.0.1
cd ../../posts
docker build . -t zbowhay/posts:0.0.1
cd ../../query
docker build . -t zbowhay/query:0.0.1
cd ../infra