import React, {useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import styles from '../styles/Home.module.css';

const headerStyle = {
  color:'white',
  position:"absolute",
  zIndex:4,
  top:'20%',
  left:'40%'
}

const contentStyle = {
  color:'white',
  textAlign:"center",
  top:'50%',
  left:'25%',
  position:"absolute",
  zIndex:4
}

function sendEmail(email){
  const body = `Здравствуйте, я нашел вашего питомца.%0A-----------%0AС уважением, ${localStorage.user}`;
  window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}


function Animal(props){

  if(!props.data) return <p>Loading</p>
  const {name,message,img} = props.data;
  return (
      <div>
        <div class={styles.textName}>{name}</div>
        <div class={styles.textName}>{message}</div>
        <img
            alt="Чара (моя собака)"
            src={img}
        />
      </div>
  );
}

export default function Home() {
  const [animals,setAnimals] = React.useState([]);
  React.useEffect(()=>{
    fetch('/animals.json').then(data=>data.json()).then(data=>setAnimals(data));
  },[]);
  React.useEffect(()=>{
    let user = localStorage.getItem('user');
    if (user===null){
      while (user===null){
        user=prompt("Введите ваше имя пользователя");
        if (!user){
          alert('Обязательно!');
        }
        else {
          localStorage.setItem('user',user);
        }
      }
    }
  },[]);

  function logout(){
    localStorage.clear();
    location.reload();
  }

  function handleCliclk() {
    if (typeof window !== "undefined") {
      //This code is executed in the browser
      window.open("http://localhost:3000/form/");
    }}

  const router = useRouter()
  return (
      <div className={styles.container}>
        <Head>
          <title>Petto</title>
          <meta name="description" content="Социальная сеть для питомцев" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <main className={styles.main}>
          <button class={styles.doubleBorderButton} onClick={logout}>Переавторизоваться</button>
          <h1 class={styles.titleName}>Petto</h1>
          <AwesomeSlider style={{ "--slider-height-percentage": "30%" }}>
            {
              animals.map((data,i)=><div class = {styles.shadowBorder} key={i} style={{ zIndex: 2 }} onClick={()=>sendEmail(data?.email)}>
                <Animal   data={data} />
              </div>)
            }
          </AwesomeSlider><br/>

          <br/>
          <button class={styles.doubleBorderButton} onClick={() =>  router.push( '/form',)}>Создать анкету</button><br/>
        </main>

        <footer className={styles.footer}>
          Petto, (c) 2022
        </footer>
      </div>
  )
}
