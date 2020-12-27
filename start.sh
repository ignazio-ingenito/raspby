source lib/bin/activate
cd /home/ignazio/projects/raspbyweb/webapp

echo -e "starting webpack monitor"
c &

echo -e "startting postcss monitor"
node_modules/.bin/postcss static/css/styles.css -o static/dist/styles.css --verbose --map &


echo -e "startting uvicorn monitor"
uvicorn app:app --reload