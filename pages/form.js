import Head from "next/head";
import React from "react";
import { useState } from 'react';
import styles from '../styles/Home.module.css';
// import fetch from "node-fetch";

export default function Home() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');
    const [species, setSpecies] = useState('');
    const [img] = useState('img.jpg');
    const [email] = useState('animalShelter@gmail.com');

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            name,
            age,
            message,
            species,
            img,
            email,
        };
        // console.log(data);

        // const response = fetch ('/api/handleUpload', {method: 'POST', body: JSON.stringify(data)})
        const endpoint = '/api/handleUpload';
        const JSONdata = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSONdata,
        }
        console.log(options);
        const response =  fetch (endpoint,options)
        console.log(response);
        // return data;
    };


/*
    const uploadToServer = async (event) => {
        const response = await fetch ('/api/handleUpload', {method: 'POST', body: ("iuytrew")})
    };*/

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <form onSubmit={handleSubmit} className={styles.decor}>
                    <label class={styles.titleName} htmlFor="name">Кличка животного:</label>
                    <br/>
                    <input
                        class={styles.inputMy}
                        id="name"
                        type="text"
                        onChange={e => setName(e.target.value)

                    }
                    /><br/>
                    <label  class={styles.titleName} htmlFor="age">Возраст животного:</label>
                    <br/>
                    <input
                        class={styles.inputMy}
                        id="age"
                        type="age"
                        onChange={e => setAge(e.target.value)}
                    /><br/>
                    <label class={styles.titleName} htmlFor="message">Сообщение:</label>
                    <br/>
                    <textarea
                        class={styles.inputMy}
                        id="message"
                        type="text"
                        rows="4"
                        onChange={e => setMessage(e.target.value)}
                    /><br/>
                    <label class={styles.titleName} htmlFor="message">Порода:</label>
                    <br/>
                    <input
                        class={styles.inputMy}
                        id="species"
                        type="text"
                        rows="4"
                        onChange={e => setSpecies(e.target.value)}
                    /><br/>
                    <button class={styles.doubleBorderButton} type="submit" /*onClick={uploadToServer}*/>Send</button>
                </form>
            </main>
        </div>
    );
};