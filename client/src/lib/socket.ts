import { io } from 'socket.io-client'

const socket = io() // Auto-connects to the same host (proxy will forward)

export default socket