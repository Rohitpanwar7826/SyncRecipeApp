import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const useLiveRecipe = () => {
  const [recipes, setRecipes] = useState({});
  useEffect(()=>{
    
    const socket = new WebSocket(process.env.REACT_APP_ActionCable_END_POINT)

    socket.onopen = function(event) {
      const msg = {
        command: "subscribe",
        identifier: JSON.stringify({
          id: uuidv4(),
          channel: 'LiveRecipesChannel'
        })
      };
      socket.send(JSON.stringify(msg))
    }
  
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if(data["type"] === "ping") return
      if(data?.message) setRecipes(data?.message)
    }
  
    socket.onclose = function (event) {
      console.log(event)
      // alert("Server connection closed")
    }
  
    socket.onerror =  function (error) {
      alert(error.message)
      console.log(error)
    }
  }, [])

  return recipes
}

export default useLiveRecipe