export const getForecast = async (revenue) => {

  const response = await fetch(
    'http://localhost:5001/predict',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        revenue
      })
    }
  )

  return response.json()
}