import React, {useEffect, useState} from "react";
import axios from "axios";

import "./Containers.css";

export const Containers = () => {
    const [containers, setContainers] = useState([]);
    useEffect(() => {
        const fetchContainers = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3004/containers`);
                setContainers(response.data);
            }
            catch(error)
            {
                console.error('Error fetching container status:', error);
                setContainers([
                    {Names: ["docker-backend"], Status: "Not running"},
                    {Names: ["FileBrowser"], Status: "Unknown"},
                    {Names: ["portainer"], Status: "Unknown"},
                    {Names: ["pgAdmin"], Status: "Unknown"}
                ])
            }
        };
        fetchContainers();

        //eslint-disable-next-line
        const intervalId = setInterval(() => {
           fetchContainers();
        }, 10000);
    }, []);

    const getContainerStatus = (name) => {
        const container = containers.find(container => container.Names.some(n => n.includes(name)));
        return container ? container.Status : 'Not running';
    };

    const getContainerStatusClass = (status) => {
        const lowerCaseStatus = status.toLowerCase();
        if(lowerCaseStatus === 'running' || lowerCaseStatus.includes('up'))
        {
            return 'docker-container-status-running';
        }
        else if(lowerCaseStatus === 'not running' || lowerCaseStatus.includes('stopped') || lowerCaseStatus.includes('exited'))
        {
            return 'docker-container-status-stopped'
        }
        else
        {
            return 'docker-container-status-other'
        }
    }

    const redirectToPgAdmin = () => {
        window.location.href = `${window.location.protocol}//${window.location.hostname}:3001`;
    };

    const redirectToPortainer = () => {
        window.location.href = `https://${window.location.hostname}:3002`;
    };

    const redirectToFileBrowser = () => {
        window.location.href = `${window.location.protocol}//${window.location.hostname}:3003`;
    };

    return(
        <div id="docker-container">
            <div id="docker-label">
                <p id="docker-label-text">Docker Containers Status</p>
            </div>
            <div id="docker-containers-content">
                <div className="docker-container-item">
                    <p>docker-backend</p>
                    <p className={`docker-container-status ${getContainerStatusClass(getContainerStatus('docker-backend'))}`}>{getContainerStatus('docker-backend')}</p>
                </div>
                <div className="docker-container-item" onClick={redirectToFileBrowser}>
                    <p>FileBrowser</p>
                    <p className={`docker-container-status ${getContainerStatusClass(getContainerStatus('FileBrowser'))}`}>{getContainerStatus('FileBrowser')}</p>
                </div>
                <div className="docker-container-item" onClick={redirectToPortainer}>
                    <p>Portainer</p>
                    <p className={`docker-container-status ${getContainerStatusClass(getContainerStatus('portainer'))}`}>{getContainerStatus('portainer')}</p>
                </div>
                <div className="docker-container-item" onClick={redirectToPgAdmin}>
                    <p>pgAdmin</p>
                    <p className={`docker-container-status ${getContainerStatusClass(getContainerStatus('pgAdmin'))}`}>{getContainerStatus('pgAdmin')}</p>
                </div>
            </div>
        </div>
    );
}