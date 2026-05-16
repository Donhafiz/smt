import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function AuditLogs() {
  const { t } = useTranslation()

  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {

    try {

      const res = await axios.get('/api/audit')

      setLogs(res.data)

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Audit Logs
        </h1>

        <p className="text-gray-400">
          Full system activity history
        </p>

      </div>

      <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">

        {logs.map((log: any, i) => (

          <div
            key={i}
            className="p-4 border-b border-gray-800"
          >

            <p className="font-semibold">
              {log.action}
            </p>

            <p className="text-sm text-gray-400">
              {log.entity}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(log.createdAt).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

