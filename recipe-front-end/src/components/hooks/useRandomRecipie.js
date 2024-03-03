import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const useRandomRecipie = () => {
  const [recipie, setRecipie] = useState({});
  useEffect(()=>{
    
    const socket = new WebSocket(process.env.REACT_APP_ActionCable_END_POINT)

    socket.onopen = function(event) {
      const msg = {
        command: "subscribe",
        identifier: JSON.stringify({
          id: uuidv4(),
          channel: 'RandomRecipieChannel'
        })
      };
      socket.send(JSON.stringify(msg))
    }
  
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if(data["type"] === "ping") return
      if(data?.message) setRecipie(data?.message)
    }
  
    socket.onclose = function (event) {
      console.log(event)
    }
  
    socket.onerror =  function (error) {
      alert(error.message)
    }
  }, [])

  return recipie
}

export default useRandomRecipie