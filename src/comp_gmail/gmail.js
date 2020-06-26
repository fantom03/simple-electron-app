onload = () => {
  const webview = document.querySelector('webview')
  const loading = document.getElementById('loading-div')
  
  webview.addEventListener('did-start-loading', () => loading.style.display = "flex" )
  webview.addEventListener('did-stop-loading', () => loading.style.display = "none")
}



