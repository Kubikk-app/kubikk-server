docker build -t nest-prisma-server .
docker run -d -t -p 3000:3000 --name kubik-app nest-prisma-server