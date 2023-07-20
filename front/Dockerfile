FROM node:18  

# COPY EVERYTHING FROM THE CURRENT DIRECTORY TO THE CONTAINER
COPY . /app

# SET THE WORKING DIRECTORY TO /app
WORKDIR /app

# RUN npm install
RUN npm install
RUN npm run build

EXPOSE 3000

# EXEC npm run dev
CMD ["npm", "run", "start"]