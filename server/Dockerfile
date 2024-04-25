FROM python:3.11-slim

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN python -m pip install --upgrade pip
RUN apt-get update && apt-get install python3-opencv -y
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]