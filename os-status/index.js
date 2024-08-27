const cors = require('cors');
const disk = require('diskusage');
const express = require('express');
const os = require('os');

const app = express();
const port = 3005;

//We assume that the application is running on a C drive on Windows or / drive on Linux
const targetPath = os.platform() === 'win32' ? 'C:' : '/';

function CpuUsage(res, mode, id)
{
    if(mode === 'core' && (id < 0 || id >= os.cpus().length))
    {
        res.json("Passed CPU Core that's out of range.");
    }
    else if(mode !== "core" && id !== undefined)
    {
        res.json("Requested CPU Core usage but didn't specify the Core.")
    }
    else
    {
        const startUsage = CalculateCpuUsage(mode, id);

        setTimeout(() => {
            const endUsage = CalculateCpuUsage(mode, id);
            const idleDifference = endUsage.idle - startUsage.idle;
            const totalDifference = endUsage.total - startUsage.total;

            const cpuUsagePercentage = ((totalDifference - idleDifference) / totalDifference) * 100;
            res.json(cpuUsagePercentage.toFixed(2));
        }, 100);
    }
}

function CalculateCpuUsage(mode, id)
{
    if(mode === 'core')
    {
        return CalculateCpuUsageCore(os.cpus()[id]);
    }
    else
    {
        const cpus = os.cpus();

        let idle = 0;
        let total = 0;

        for(let cpu of cpus)
        {
            let result = CalculateCpuUsageCore(cpu);
            idle += result.idle;
            total += result.total
        }

        return {
            idle,
            total
        };
    }
}

function CalculateCpuUsageCore(cpu)
{
    const user = cpu.times.user;
    const nice = cpu.times.nice;
    const sys = cpu.times.sys;
    const idle = cpu.times.idle;
    const irq = cpu.times.irq;

    const total = user + nice + sys + idle + irq;
    
    return {
        idle,
        total
    }
}

app.use(cors());

//Architecture
app.get('/architecture', async (req, res) => {
    try
    {
        res.json(os.machine());
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

//CPU
app.get('/cpu-count', async (req, res) => {
    try
    {
        res.json(os.cpus().length);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/cpu-usage', async (req, res) => {
    //Percentage
    try
    {
        CpuUsage(res);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/cpu-core-usage/', async (req, res) => {
    //Return a message that CPU Core was not specified
    try
    {
        res.json("CPU Core not specified");
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/cpu-core-usage/:id', async (req, res) => {
    //Percentage

    const id = req.params.id;

    try
    {
        CpuUsage(res,'core', id)
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

//Disk
app.get('/disk-free', async (req, res) => {
    //Bytes
    try
    {
        const {available} = disk.checkSync(targetPath);
        res.json(available);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/disk-total', async (req, res) => {
    //Bytes
    try
    {
        const {total} = disk.checkSync(targetPath);
        res.json(total);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/disk-used', async (req, res) => {
    //Bytes
    try
    {
        const {free, total} = disk.checkSync(targetPath);
        res.json(total - free);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/disk-used-percentage', async (req, res) => {
    //Bytes
    try
    {
        const {free, total} = disk.checkSync(targetPath);
        res.json((total - free) / total * 100);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

//RAM
app.get('/ram-free', async (req, res) => {
    //Bytes
    try
    {
        res.json(os.freemem());
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/ram-total', async (req, res) => {
    //Bytes
    try
    {
        res.json(os.totalmem());
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/ram-usage', async (req, res) => {
    //Bytes
    try
    {
        res.json(os.totalmem() - os.freemem());
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.get('/ram-usage-percentage', async (req, res) => {
    //%
    try
    {
        res.json((os.totalmem() - os.freemem()) / os.totalmem() * 100);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

//System
app.get('/os', async (req, res) => {
    try
    {
        let system = os.type();
        if(system === 'Darwin') system = 'MacOS';
        res.json(system);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

//Uptime
app.get('/os-uptime', async (req, res) => {
    //Seconds
    try
    {
        res.json(os.uptime());
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
})

app.listen(port, () => {console.log(`RPi-status API is listening at http://localhost:${port}`)});