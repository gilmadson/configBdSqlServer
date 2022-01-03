const express = require('express')

//servidor
const app = express()

// habilita server para receber dados json
app.use(express.json())
app.unsubscribe(express.urlencoded({ extended: true}))

// definindo as rotas
app.get('/', (req, res) => {
    res.send('Servidor, ok!')
})


//executando o servidor 
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))