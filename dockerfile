FROM node:14.2

# ENV DEBIAN_FRONTEND noninteractive
ARG APP_DIR=/apps/allure-server
EXPOSE 5005:5005

# Update is used to resynchronize the package index files from their sources. An update should always be performed before an upgrade.
RUN rm -vf /var/lib/apt/lists/*
RUN apt-get clean
RUN apt-get update -qqy \
  && apt-get -qqy install \
    apt-utils \
    wget \
    sudo \
    yarn

# Font libraries
RUN apt-get update -qqy \
  && apt-get -qqy install \
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    libfreetype6 \
    libfontconfig

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils software-properties-common

# Install OpenJDK-8
RUN apt-get update && \
    mkdir -p /usr/share/man/man1 && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

ENV NODE_PATH /usr/lib/node_modules

# Set the working directory
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . $APP_DIR
RUN yarn
RUN yarn global add allure-commandline
RUN yarn docker-client-build

ENV HOME=$APP_DIR
RUN chmod -Rf 777 .
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["bash", "./entrypoint.sh"]
