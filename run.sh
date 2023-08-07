docker build -t nest-prisma-server .
docker run -d -p 3000:3000 --name kubik-app nest-prisma-server