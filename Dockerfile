FROM oven/bun:1-slim

WORKDIR /sandbox

# Copy runner
COPY run.sh /sandbox/run.sh
RUN chmod +x /sandbox/run.sh

# Run the script (code will be passed as args)
CMD ["/sandbox/run.sh"]
