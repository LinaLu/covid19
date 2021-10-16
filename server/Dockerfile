FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install -y python3-pip python3

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

ENTRYPOINT [ "python3" ]
CMD [ "main.py" ]

