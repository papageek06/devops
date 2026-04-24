FROM mongo:7.0

COPY --chown=mongodb:mongodb ./init/ /docker-entrypoint-initdb.d/

RUN chown -R mongodb:mongodb /data/db /data/configdb /docker-entrypoint-initdb.d

USER mongodb
