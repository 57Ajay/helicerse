import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [data, setData] = useState(null)
  useEffect(()=>{
    const be = async()=>{
      const fetchBe = await axios.get("/api");
      console.log(fetchBe.data)
      setData(()=> fetchBe.data);
    };
    be();
  })
  return (
    <div className="text-2xl font-bold flex justify-center">
      {data}
    </div>
  )
}

export default App