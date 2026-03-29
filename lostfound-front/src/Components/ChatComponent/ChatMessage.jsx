import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {

    let navigate = useNavigate();

    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chatMessages");
        return saved ? JSON.parse(saved) : [];
    });

};
const [input, setInput] = useState("");
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

// Save messages to localStorage whenever they change
useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}, [messages]);

// Fetch user details once
useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await getUserDetails();
            const user = response.data?.username || response.data?.name || response.data;
            
            if (user) {
                setUsername(user);
                connect(user);
            } else {
                console.error("Username not found in API response");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchUserDetails();

return () => {
    if (stompClient) {
        console.log("🔌 Disconnecting WebSocket...");
        stompClient.deactivate();
        stompClient = null;
    }
};
}, []);
// Connect only once and prevent duplicates
const connect = (autoName = username) => {
    if (!autoName.trim()) return;

    // Prevent reconnect if already active
    if (stompClient && stompClient.active) {
        console.log("Already connected - skipping reconnect.");
        return;
    }
};