import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useTranslation} from "react-i18next";

import "./os-status.css";

export const OsStatus = () => {
    const [architecture, setArchitecture] = useState()
    const [cpuCount, setCpuCount] = useState();
    const [cpuCoreUsages, setCpuCoreUsages] = useState([]);
    const [cpuUsage, setCpuUsage] = useState("0%");
    const [diskTotal, setDiskTotal] = useState();
    const [diskUsage, setDiskUsage] = useState();
    const [diskUsagePercentage, setDiskUsagePercentage] = useState("0%");
    const [ramUsage, setRamUsage] = useState();
    const [ramUsagePercentage, setRamUsagePercentage] = useState("0%");
    const [ramTotal, setRamTotal] = useState();
    const [system, setSystem] = useState();
    const [uptime, setUptime] = useState();

    const {t} = useTranslation();

    useEffect(() => {
        setArchitecture(t("status.fetching"));
        setCpuCount(t("status.fetching"));
        setCpuUsage(t("status.fetching"));
        setDiskTotal(t("status.fetching"));
        setDiskUsage(t("status.fetching"));
        setDiskUsagePercentage(t("status.fetching"));
        setRamUsage(t("status.fetching"));
        setRamUsagePercentage(t("status.fetching"));
        setRamTotal(t("status.fetching"));
        setSystem(t("status.fetching"));
        setUptime(t("status.fetching"));

        let calculatedDiskUsage;
        let calculatedDiskTotal;
        let roundedDiskUsage;

        let roundedRamUsage;
        let roundedRamUsagePercentage;
        let roundedRamTotal;

        let calculatedUptimeSeconds;
        let calculatedUptimeMinutes;
        let calculatedUptimeHours;
        let calculatedUptimeDays;

        const FetchArchitecture = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/architecture`);
                setArchitecture(response.data);
            }
            catch(error)
            {
                console.error('Error fetching os architecture:', error);
                setTimeout(FetchArchitecture, 5000);
            }
        }
        const FetchCpuCount = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/cpu-count`);
                setCpuCount(response.data);
            }
            catch(error)
            {
                console.error('Error fetching CPU count:', error);
                setTimeout(FetchCpuCount, 5000);
            }
        }
        const FetchCpuUsage = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/cpu-usage`);
                setCpuUsage(response.data + "%");
            }
            catch(error)
            {
                console.error('Error fetching CPU usage:', error);
                setTimeout(FetchCpuUsage, 5000);
                setCpuUsage(t("status.fetching"));
            }
        }
        const FetchDiskTotal = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/disk-total`);
                calculatedDiskTotal = Math.round(response.data / 1024 / 1024)
                setDiskTotal(calculatedDiskTotal + "MB");
            }
            catch(error)
            {
                console.error('Error fetching disk size:', error);
                setTimeout(FetchDiskTotal, 5000);
                setDiskTotal(t("status.fetching"));
            }
        }
        const FetchDiskUsage = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/disk-used`);
                calculatedDiskUsage = Math.round(response.data / 1024 / 1024)
                setDiskUsage(calculatedDiskUsage + "MB");
            }
            catch(error)
            {
                console.error('Error fetching disk usage:', error);
                setTimeout(FetchDiskUsage, 5000);
                setDiskUsage(t("status.fetching"));
            }
        }
        const FetchDiskUsagePercentage = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/disk-used-percentage`);
                roundedDiskUsage = Math.round(response.data).toFixed(2);
                setDiskUsagePercentage(roundedDiskUsage + "%");
            }
            catch(error)
            {
                console.error('Error fetching disk usage:', error);
                setTimeout(FetchDiskUsagePercentage, 5000);
                setDiskUsagePercentage(t("status.fetching"));
            }
        }
        const FetchRamUsage = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/ram-usage`);
                roundedRamUsage = Math.round(response.data / 1024 / 1024);
                setRamUsage(roundedRamUsage + "MB");
            }
            catch(error)
            {
                console.error('Error fetching RAM usage:', error);
                setTimeout(FetchRamUsage, 5000);
                setRamUsage(t("status.fetching"));
            }
        }
        const FetchRamUsagePercentage = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/ram-usage-percentage`);
                roundedRamUsagePercentage = Math.round(response.data).toFixed(2);
                setRamUsagePercentage(roundedRamUsagePercentage + "%");
            }
            catch(error)
            {
                console.error('Error fetching RAM usage percentage:', error);
                setTimeout(FetchRamUsagePercentage, 5000);
                setRamUsagePercentage(t("status.fetching"));
            }
        }
        const FetchRamTotal = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/ram-total`);
                roundedRamTotal = Math.round(response.data / 1024 / 1024);
                setRamTotal(roundedRamTotal + "MB");
            }
            catch(error)
            {
                console.error('Error fetching RAM usage:', error);
                setTimeout(FetchRamTotal, 5000);
                setRamTotal(t("status.fetching"));
            }
        }
        const FetchOS = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/os`);
                setSystem(response.data);
            }
            catch(error)
            {
                console.error('Error fetching os:', error);
                setTimeout(FetchOS, 5000);
            }
        }
        const FetchUptime = async() => {
            try
            {
                const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/os-uptime`);
                calculatedUptimeSeconds = response.data;
                calculatedUptimeDays = Math.floor(calculatedUptimeSeconds / 60 / 60 / 24);
                calculatedUptimeSeconds %= (60 * 60 * 24);
                calculatedUptimeHours = Math.floor(calculatedUptimeSeconds / 60 / 60);
                calculatedUptimeSeconds %= (60 * 60);
                calculatedUptimeMinutes = Math.floor(calculatedUptimeSeconds / 60);
                calculatedUptimeSeconds %= 60;

                setUptime(`${calculatedUptimeDays}d:${calculatedUptimeHours}h:${calculatedUptimeMinutes}m:${calculatedUptimeSeconds}s`);
            }
            catch(error)
            {
                console.error('Error fetching os uptime:', error);
                setTimeout(FetchUptime, 5000);
                setUptime(t("status.fetching"));
            }
        }
        FetchArchitecture();
        FetchCpuCount();
        FetchCpuUsage();
        FetchDiskTotal();
        FetchDiskUsage();
        FetchDiskUsagePercentage();
        FetchRamUsage();
        FetchRamUsagePercentage();
        FetchRamTotal();
        FetchOS();
        FetchUptime();

        setInterval(() =>{
            FetchCpuUsage();
            FetchRamUsage();
            FetchRamUsagePercentage();
            FetchUptime();
        }, 5000);

        setInterval(() =>{
            FetchDiskUsage();
            FetchDiskUsagePercentage();
        }, 60000);
    }, [t]);

    useEffect(() => {
        const FetchCoreUsages = async() => {
            try
            {
                const usages = await Promise.all(
                    Array.from({length: cpuCount}).map(async (_, index) =>
                    {
                        const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:3005/cpu-core-usage/${index}`);
                        return response.data + "%";
                    })
                );
                setCpuCoreUsages(usages);
            }
            catch(error)
            {
                console.error("Error fetching core usage:", error);
                setTimeout(FetchCoreUsages, 5000);
                const response = Array.from({length: cpuCount}).map(() =>
                {
                    return t("status.fetching");
                });
                setCpuCoreUsages(response);
            }
        }
        if(cpuCount > 0)
        {
            FetchCoreUsages();
            setInterval(() =>{
                FetchCoreUsages();
            }, 5000)
        }
    }, [cpuCount, t]);


    return(
        <div id="os-status-container">
            <div className="os-status-label">
                <p id="os-status-text">{t("os.status")}</p>
            </div>
            <div className="os-status-content">
                <div className="os-status-container-item">
                    <p>{t("os.architecture")}</p>
                    <p>{architecture}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.cpu.count")}</p>
                    <p>{cpuCount}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.cpu.usage")}</p>
                    <p>{cpuUsage}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.disk.usage")}</p>
                    <p>{diskUsage} / {diskTotal}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.disk.usage.percentage")}</p>
                    <p>{diskUsagePercentage}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.ram.usage")}</p>
                    <p>{ramUsage} / {ramTotal}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.ram.usage.percentage")}</p>
                    <p>{ramUsagePercentage}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os")}</p>
                    <p>{system}</p>
                </div>
                <div className="os-status-container-item">
                    <p>{t("os.uptime")}</p>
                    <p>{uptime}</p>
                </div>
            </div>
            <div className="os-status-label">
                <p id="os-status-text">{t("os.cpus.status")}</p>
            </div>
            <div className="os-status-content">
                {cpuCoreUsages.map((usage, index) => (
                    <div key={index} className="os-status-container-item">
                        <p>Core {index + 1}</p>
                        <p>{usage}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}