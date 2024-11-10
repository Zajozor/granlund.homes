import {  useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ImageOverlay, MapContainer, Marker, Popup,  useMapEvents } from 'react-leaflet';
import { deleteItem, getItems, getProperty } from '../api/index';
import { Box, Button, Spinner, Tabs } from '@radix-ui/themes';
import { LatLngBounds } from 'leaflet';
import { RawItem } from '../types';
import CreateItemDialog from '../components/CreateItemDialog';


function MarkCreator({createMark, floor}: {createMark: (lat:number, lng:number, floor:number) => void, floor:number}) {
  useMapEvents({
    dblclick(e) {
        createMark(e.latlng.lat, e.latlng.lng, floor)
    },
  })
  return <></>

}

const FloorPlan = () => {
     const { id: propertyId } = useParams()
    
     const [floorPlans, setFloorPlans] = useState<string[]>([])
     const [items, setItems] = useState<RawItem[]>([])
     const [creatingItem, setCreatingItem] = useState<boolean>(false)
     const [clickCoords, setClickCoords] = useState<{x:number, y:number,floor:number} | null>(null)


     const createMark = useCallback((lat:number, lng:number, floor: number) =>
                                    {
                                        setClickCoords({x:lat, y:lng, floor})
                                        setCreatingItem(true)

                                        //setItems([...items, {id: 'f', image: '', condition_notes: '', xy_coordinates: {x:lat, y:lng, floor}, created_at: 'trr'}])
                                    }, [ setClickCoords, setCreatingItem])


    const deleteMark = useCallback((id: string) => {
        setItems(items.filter(i => i.id !== id ))
        deleteItem(id)
    }, [setItems, items])

     useEffect(() => {
         if (!propertyId) return;
         (async () =>{
             const p = await getProperty(propertyId)

             setFloorPlans(p.property.image)
         })()
     }, [propertyId])

     const reloadItems = useCallback(async() => {
         if (!propertyId) return;
             const its = await getItems(propertyId)
             setItems(its)
         },[setItems, propertyId])

     useEffect(() => {
         reloadItems()
     }, [reloadItems])


     if (floorPlans.length === 0) return <Spinner /> 
const bounds = new LatLngBounds([-1, -1], [1, 1])

return <><Tabs.Root defaultValue="0">
<Tabs.List>
{floorPlans.map((_, idx) => 
    <Tabs.Trigger key={idx.toString()} value={idx.toString()}>Floor {idx+1}</Tabs.Trigger>
)}
    </Tabs.List>

<Box pt="3">

{floorPlans.map((floor, idx) =>
                <Tabs.Content key={idx.toString()} value={idx.toString()}>
    <MapContainer style={{height: '75vh'}} center={[0, 0]} zoom={8} doubleClickZoom={false} >
    <MarkCreator createMark={createMark} floor={idx}/>
    <ImageOverlay
    url={floor}
    bounds={bounds}
    opacity={1}
    zIndex={10}
    />
    {items.filter(item => item.xy_coordinates.floor === idx).map(item => 
                   <Marker key={item.id} position={[item.xy_coordinates.x, item.xy_coordinates.y]}>
                   <Popup closeButton={true} >
                   {item.catalogue.name} [{item.catalogue.manufacturer}]
                   <br />

                   Condition: {item.condition_notes || '-'}<br />
                   <img src={item.image} width="50%" />
                   <br />

                    Added on: {new Date(item.created_at).toDateString()}
                        <ul>
                        {Object.entries(item.catalogue.other_data).filter(([,value]) => Array.isArray(value) || typeof value === 'string').splice(0, 6).map(([key, value]) => <li key={key}>
                                                                       {key.split('_').map((word) => { 
    return word[0].toUpperCase() + word.substring(1); 
}).join(' ')}: { Array.isArray(value) ? value.join(' ') : (typeof value !== 'object' ? 
    JSON.stringify(value).substring(0, 80).replace(/\w$/, '...') : '-' )
}
                                                                       </li>)}
                        </ul>
                    <br />
                    <Button onClick={() => deleteMark(item.id)} color="red" size="1">Remove</Button> 
                       </Popup>
                   </Marker>
                  )}
             </MapContainer>
                </Tabs.Content>
               )}
               </Box>


</Tabs.Root>
{clickCoords && <CreateItemDialog opened={creatingItem} onClose={() => { setCreatingItem(false); reloadItems()}} xy_coordinates={clickCoords}/>}
</>
};

export default FloorPlan;
