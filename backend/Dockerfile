FROM python:3.4-alpine
COPY . /backend
WORKDIR /backend
RUN pip install -r ./requirements.txt
EXPOSE 5000
ENTRYPOINT [ "python" ]
CMD ["views.py"]