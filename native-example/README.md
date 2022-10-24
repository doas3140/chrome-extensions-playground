# Docs

1. build extension and install it. read `extension/README.md`

2. run web. read `web/README.md`

3. install native app. read `native/README.md`

4. We need to run on https (for that we use lt). There should be "https://*.loca.lt/*" appended to manifest.json "externally_connectable"."matches" array.

```bash
sudo npm i -g lt
lt --port 3000 -h http://localtunnel.me # run https proxy and open the url in browser
```
