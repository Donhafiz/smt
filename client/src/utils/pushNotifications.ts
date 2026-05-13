export const requestNotificationPermission = async () => {

  if (!('Notification' in window)) {
    return
  }

  const permission =
    await Notification.requestPermission()

  if (permission === 'granted') {

    new Notification('✅ SMT ERP Notifications Enabled', {
      body: 'You will now receive live ERP alerts.'
    })

  }

}