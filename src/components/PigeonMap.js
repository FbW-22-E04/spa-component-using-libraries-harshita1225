import { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl, Overlay } from 'pigeon-maps'

export default function PigeonMap({foundProviders, searchTerm}) {
  const [center, setCenter] = useState([48.949208441689805, 12.304167000000007])
  const [zoom, setZoom] = useState(5)
  const [markerContent, setMarkerContent] = useState(null)

    useEffect(() => {
        if (searchTerm === '') {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter([position.coords.latitude, position.coords.longitude])
                }, (error) => {
                    setCenter([48.949208441689805, 12.304167000000007])
                })
        } else if(foundProviders.length > 0) {
            setCenter([foundProviders[0].location.latitude, foundProviders[0].location.longitude]) 
        }
    }, [searchTerm, foundProviders])



  async function markerClicked(e) {
    const res = await fetch(`http://api.citybik.es${e.payload}`)
    const data = await res.json()
    setMarkerContent(data.network)
  } 
    
    return (
        <Map className="map" height={600} center={center} 
        zoom={zoom} 
        onBoundsChanged={({ center, zoom }) => { 
            setCenter(center) 
            setZoom(zoom) 
        }} >
        <ZoomControl />
        {foundProviders.map((provider, index) => <Marker key={index}
        width={50}
        anchor={[provider.location.latitude, provider.location.longitude]} payload={provider.href}
        onClick={markerClicked}
    />)}
            {markerContent && <Overlay className='map-overlay' anchor={[markerContent.location.latitude, markerContent.location.longitude]}>
                <h1>{markerContent.name}</h1>
                <ul>
                    {markerContent.company.map((item, index )=> <li key={index}>{item}</li>)} 
                </ul>
                </Overlay>}
            </Map>
    )
}
