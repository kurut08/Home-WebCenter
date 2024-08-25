import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";

import "./Containers.css";

export const Containers = () => {
    const [containers, setContainers] = useState([]);
    const {t} = useTranslation();

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
                    {Names: ["onedev"], Status: "Unknown"},
                    {Names: ["os-status"], Status: "Unknown"},
                    {Names: ["portainer"], Status: "Unknown"},
                    {Names: ["pgAdmin"], Status: "Unknown"}
                ])
            }
        };
        fetchContainers();

        setInterval(() => {
           fetchContainers();
        }, 10000);
    }, []);

    const GetContainerStatus = (name) => {
        const container = containers.find(container => container.Names.some(n => n.includes(name)));
        return container ? container.Status : 'Not running';
    };

    const GetContainerStatusClass = (status) => {
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

    const RedirectToPgAdmin = () => {
        window.location.href = `${window.location.protocol}//${window.location.hostname}:3001`;
    };

    const RedirectToPortainer = () => {
        window.location.href = `https://${window.location.hostname}:3002`;
    };

    const RedirectToFileBrowser = () => {
        window.location.href = `${window.location.protocol}//${window.location.hostname}:3003`;
    };

    const RedirectToOnedev = () => {
        window.location.href = `${window.location.protocol}//${window.location.hostname}:3006`;
    };

    return(
        <div id="docker-container">
            <div id="docker-label">
                <p id="docker-label-text">{t("docker.container.status")}</p>
            </div>
            <div id="docker-containers-content">
                <div className="docker-container-item">
                    <p>docker-backend</p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('docker-backend'))}`}>{GetContainerStatus('docker-backend')}</p>
                </div>
                <div className="docker-container-item docker-container-item-hover-redirect" onClick={RedirectToFileBrowser}>
                    <p><b>FileBrowser</b></p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('FileBrowser'))}`}>{GetContainerStatus('FileBrowser')}</p>
                </div>
                <div className="docker-container-item">
                    <p>os-status</p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('os-status'))}`}>{GetContainerStatus('os-status')}</p>
                </div>
                <div className="docker-container-item docker-container-item-hover-redirect" onClick={RedirectToOnedev}>
                    <p><b>OneDev</b></p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('onedev'))}`}>{GetContainerStatus('onedev')}</p>
                </div>
                <div className="docker-container-item docker-container-item-hover-redirect" onClick={RedirectToPortainer}>
                    <p><b>Portainer</b></p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('portainer'))}`}>{GetContainerStatus('portainer')}</p>
                </div>
                <div className="docker-container-item docker-container-item-hover-redirect" onClick={RedirectToPgAdmin}>
                    <p><b>pgAdmin</b></p>
                    <p className={`docker-container-status ${GetContainerStatusClass(GetContainerStatus('pgAdmin'))}`}>{GetContainerStatus('pgAdmin')}</p>
                </div>
            </div>
        </div>
    );
}