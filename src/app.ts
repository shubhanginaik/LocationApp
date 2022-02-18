import axios from 'axios';
console.log('Location app starts...');

const form= document.querySelector('form')!;
const addressInput=document.getElementById('address')! as HTMLInputElement;
const api_key='AIzaSyAb8LDRqUOhRoxYmH7Oop1F-aIMVKAT4io';


type GoogleGeoCodingResponce ={
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status:'OK' | 'ZERO_RESULTS'
}

function searchAddressHandler(event:Event){
event.preventDefault();
const enteredAddress=addressInput.value;
// third party api

 axios.get<GoogleGeoCodingResponce>(
     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${api_key}`
 ).then((response)=>{
     if(response.data.status !== 'OK'){
         throw new Error ('Could noy find location')
     }
     //console.log(responce)
     const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );
      new google.maps.Marker({ position: coordinates, map: map });
    
 })
 .catch((err)=>{
     alert(err.message);
     console.log(err);
 })
}


form.addEventListener('submit',searchAddressHandler);