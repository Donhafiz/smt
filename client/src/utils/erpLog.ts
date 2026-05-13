export const logAction = (action: string) => {
  const logs = JSON.parse(localStorage.getItem('erp_logs') || '[]')

  logs.unshift({
    action,
    time: new Date().toISOString()
  })

  localStorage.setItem('erp_logs', JSON.stringify(logs))
}