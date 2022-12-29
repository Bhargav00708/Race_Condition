//https://www.nodejsdesignpatterns.com/blog/node-js-race-conditions/#:~:text=A%20race%20condition%20is%20a,trying%20to%20modify%20the%20resource.

const randomDelay = () => new Promise(resolve =>
    setTimeout(resolve, Math.random() * 100)
  )
  
  // Our global balance.
  // In a more complete implementation, this will live in the persistent data storage.
  let balance = 0
  
  async function loadBalance () {
    // simulates random delay to retrieve data from data storage
    await randomDelay()
    return balance
  }
  
  async function saveBalance (value) {
    // simulates random delay to write the data to the data storage
    await randomDelay()
    balance = value
  }
  
  async function sellGrapes () {
    const balance = await loadBalance()
    console.log(`sellGrapes - balance loaded: ${balance}`)
    const newBalance = balance + 50
    await saveBalance(newBalance)
    console.log(`sellGrapes - balance updated: ${newBalance}`)
  }
  
  async function sellOlives () {
    const balance = await loadBalance()
    console.log(`sellOlives - balance loaded: ${balance}`)
    const newBalance = balance + 50
    await saveBalance(newBalance)
    console.log(`sellOlives - balance updated: ${newBalance}`)
  }
  
  async function main () {
    const transaction1 = sellGrapes()
    const transaction2 =  sellOlives()
    await transaction1 
    await transaction2
    const balance = await loadBalance()
    console.log(`Final balance: ${balance}`)
  }
  
  main()
