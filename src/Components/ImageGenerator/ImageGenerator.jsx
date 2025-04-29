import React, { useRef } from "react";
import { useState } from "react";
import "./ImageGenerator.css";
import download from "../assets/download.jpeg";
import Navbar from "../Navbar/Navbar";

const ImageGenerator = () => {
    
    const [imgUrl, setImgUrl] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    
    const ImageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }

        setLoading(true);

        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
                "User-Agent": "Chrome",
            },

            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size: "512x512",
            }),
        });

        let data = await response.json();
        let data_array = data.data; 
        setImgUrl(data_array[0].url); 
        setLoading(false);
    }

    return (
     <>
        <Navbar/>

        <section className="intro">
            <h1>Generate Stunning AI-Generated Images</h1>
            <p>Transform your creative ideas into beautiful AI-generated visuals in seconds. Just type a description and let AI do the magic!</p>
        </section>

        <section className="features">
            <div className="feature-card">
                <h2>Fast Generation</h2>
                <p>AI-powered image creation in just a few seconds.</p>
            </div>

            <div className="feature-card">
                <h2>Creative Freedom</h2>
                <p>Describe anything and get a unique AI-generated image.</p>
            </div>

            <div className="feature-card">
                <h2>High-Quality Images</h2>
                <p>All images are crisp and optimized for modern web designs.</p>
            </div>
        </section>
        
        <div className="ai-image-generator">
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={imgUrl==="/"?download:imgUrl} alt="Default Image"/>
                </div>
            </div>
        </div>

        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
        </div>

        <div className="search-box">
            <input type="text" ref={inputRef} className="search-input" placeholder="Describe the image you want to create."/>
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
        </div>
     </>
    );
}

export default ImageGenerator;