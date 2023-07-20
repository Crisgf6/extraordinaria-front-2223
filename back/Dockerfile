FROM denoland/deno:1.35.0

# COPY EVERYTHING FROM THE CURRENT DIRECTORY TO THE CONTAINER
COPY ./back /app

# SET THE WORKING DIRECTORY TO /app
WORKDIR /app/back

EXPOSE 4000

# EXEC deno task start
CMD ["deno", "task", "start"]