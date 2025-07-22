rm -rf build/
npm install
npm run build
openssl aes-256-cbc -a -d -in key.pem.enc -out key.pem -k $ENC_KEY
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem -p 65002 $USER@$SERVER "rm -rf domains/gitstats.me/public_html/*"
scp -o  StrictHostKeyChecking=no -P 65002 -i key.pem  -r build/* $USER@$SERVER:domains/gitstats.me/public_html
