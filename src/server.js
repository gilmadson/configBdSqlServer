const express = require('express')
const sql = require('mssql');
const fs = require('fs');
const ldap = require("ldapjs");

const config = require('../src/config/config')

//servidor
const app = express()

// habilita server para receber dados json
app.use(express.json())
app.unsubscribe(express.urlencoded({ extended: true}))

// definindo as rotas
app.get('/', (req, res) => {
    //res.send('Servidor, ok!')
    

    const cli = ldap.createClient({
    
      url: "ldap://corp.caixa.gov.br:389",
    
    });
    
    try {
    
      cli.bind("corpcaixa\\c149086", "Xucula08", (err) => {
    
        if (err) {
    
          console.log("deu erro", { err });
    
        } else {
    
          console.log("deu certo!!!");
          
        }
    
      });
    
    } catch (error) {
    
      console.log("Deu catch");
    
    }
})

app.get('/sql', (req, res) => {

// Arquivo que será gravado com o resultado da query
var file = fs.createWriteStream('teste_sql.txt');
console.log('1')
//2.

//3.
function consultar() {
    //4.
    console.log('2')
    var dbConn = new sql.ConnectionPool(config);
    console.log('3')
    //5.
    
    dbConn.connect().then(function () {
      console.log('4')
        //6.
        var request = new sql.Request(dbConn);
        console.log('5')
        //7.
        
        request.query("SELECT * FROM sr2642.Conquiste2021_Unidades where NU_UNIDADE = 2778").then(function (resultado) {
           //Modelo para imprimir o resultado no console
            console.log("relação de agência" + resultado.recordset[0].NO_UNIDADE);
            
              //Rotina para pegar os dados do recordset
              /*for (var i = 0; i < resultado.recordset.length; i++)
              {
                console.log("NU_UNIDADE" + resultado.recordset[i].NU_UNIDADE);
                console.log("NO_UNIDADE" + resultado.recordset[i].NO_UNIDADE);

                //Atribui o resultado do campo para uma variável
                var Nome_da_variavel1 = resultado.recordset[i].NU_UNIDADE;
                var Nome_da_variavel2 = resultado.recordset[i].NO_UNIDADE;
                var cadeia = "{" + "CGC" + ":" + Nome_da_variavel1+ "," +"Nome" + ":" + Nome_da_variavel2 + "}";
                
                // Insere em formato Json em um arquivo
                file.write(JSON.stringify(cadeia));
                
              };*/
             res.json(resultado)
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}

//10.
consultar();
})

//executando o servidor 
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))