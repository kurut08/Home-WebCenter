const express = require('express');
const Docker = require('dockerode')
const cors = require('cors');

const docker = new Docker({socketPath: '/var/run/docker.sock'})

const app = express();
const port = 3004;

app.use(cors());
app.get('/containers', async (req, res) => {
    const {name, id} = req.query;
    try
    {
        let containers = await docker.listContainers();
        if(name)
        {
            containers = containers.filter(container => container.Names.some(n => n.includes(name)));
        }
        if(id)
        {
            containers = containers.filter(containers => container.Id.includes(id));
        }

        res.json(containers);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {console.log(`Backend API listening at "http://localhost:${port}`)});