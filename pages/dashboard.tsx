import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import router, { useRouter } from "next/router"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  //userouter
  const router = useRouter()

  const [roomName, setRoomName] = useState('')

  const joinRoom = () => {
    router.push(`/room/${roomName || Math.random().toString(36).slice(2)}`)
  }

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/common/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])
 

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Dashboard</h1>
      <main className="">
       <h1>Lets join a room!</h1>
       <input onChange={(e) => setRoomName(e.target.value)} value={roomName} className="['room-name']" />
       <button onClick={joinRoom} type="button" className="['join-room']">Join Room</button>
      </main>
    </Layout>
  )
}
