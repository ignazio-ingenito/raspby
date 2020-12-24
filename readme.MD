# RaspByWeb

RaspByWeb help you to monitor your raspberry status with a nice web dashboard.

<img width="786" alt="Screenshot 2020-12-24 at 12 04 24" src="https://user-images.githubusercontent.com/25493712/103088879-232ddb80-45e4-11eb-8d62-c058e9fb1e15.png">


RaspByWeb uses FastApi, React, SWR, Tailwind, Gunicorn and Uvicorn.

## Live demo
https://raspby.ddns.net


### Get the code

Clone the repo 
```
git clone https://github.com/ignazio-ingenito/raspby.git
```

## Setup

Setup the virtualenv
```
python -m venv lib
```

Install all the requirements
```
source lib/bin/activate 
pip install -r requirements.txt
```

Frontend: Tailwind & react setup
```
cd webapp
npm install
npm audit fix
npm run build
```


### Setup Gunicorn & Uvicorn

Edit the file `raspbyweb.service` in the `services` folder replacing your app folder.

Then copy the file in `/etc/systemd/system`
```
sudo cp raspbyweb.service /etc/systemd/system
```

Run the service and make it active from the next reboot on.
```
sudo systemctl enable --now raspbyweb
```

To check if there's any errror run  
```
sudo systemctl status raspbyweb
```

### Setup Nginx

Install nginx
```
sudo apt install nginx
```

Edit the file `raspbyweb` in the `services` folder updating the `domain name`.
Then copy your file to the nginx config folder
```
sudo cp raspbyweb.conf /etc/nginx/sites-available
```

Test if the configuration works
```
nginx -t 
```

Activate your site 
```
sudo ln -s /etc/nginx/sites-available/raspbyweb.conf /etc/nginx/sites-enabled/
```

Restart nginx
```
sudo systemctl restart nginx
```

### Use Let's encrypt

Install Certbot and it’s Nginx plugin with apt:
```
sudo apt install certbot python3-certbot-nginx
```

Set the rules for the firewall
```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Obtaining an SSL Certificate
```
sudo certbot --nginx -d example.com -d your.domain.ext
```

Verifying Certbot Auto-Renewal
```
sudo systemctl status certbot.timer
```

To test the renewal process, you can do a dry run with certbot:
```
sudo certbot renew --dry-run
```

Restart nginx
```
sudo systemctl restart nginx
```