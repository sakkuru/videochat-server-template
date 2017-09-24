import * as express from "express"

const app = express();

app.set('view engine', 'ejs');

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('App is listening on port %s', port);
});

app.get('/', (req, res) => {
    res.send('top page');
});

app.get('/:room', (req, res) => {
    let roomName = req.params.room;
    res.render('room', { roomName: roomName });
});

app.get('/js/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(process.cwd() + '/views/js/' + fileName);
});

