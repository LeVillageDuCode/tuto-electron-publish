function handleKeyPress (event) {
    console.log(`You pressed ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)
