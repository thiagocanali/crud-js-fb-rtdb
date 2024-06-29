# crud-js-fb-rtdb


ChatGPT
O problema principal está na forma como você está importando os módulos do Firebase no seu código HTML. O Firebase v10 utiliza uma nova estrutura de módulos ECMAScript, mas a maneira como você está importando não está correta para as versões mais recentes do Firebase.

Aqui estão os ajustes que você precisa fazer:

Atualizar a importação do Firebase: Utilize os URLs corretos para importar os módulos do Firebase. O Firebase v10 e versões posteriores agora usam a sintaxe de módulos padrão do ECMAScript.

Corrigir as importações dos módulos: No Firebase v10, não há mais exportações individuais como child, set, update, remove, etc., diretamente de firebase-app.js. Em vez disso, você precisa importar esses módulos de firebase/database ou firebase/firestore, dependendo do serviço que você está utilizando (banco de dados em tempo real ou Firestore).

Exemplo de ajuste: No seu caso, você está trabalhando com o Realtime Database. Então, deve importar os módulos corretos para isso.

Aqui está como seu código deve ser ajustado:

html
Copiar código
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase v10 Crud</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
</head>

<body>
    <label>First Name</label>
    <input type="text" id="FnameInp">
    <br><br>

    <label>Last Name</label>
    <input type="text" id="LnameInp">
    <br><br>

    <label>Department</label>
    <select id="DeptInp">
        <option value="Development">Development</option>
        <option value="Testing">Testing</option>
        <option value="Management">Management</option>
        <option value="Administration">Administration</option>
    </select>
    <br><br>

    <label>Can Swim</label>
    <select id="SwimInp">
        <option value="yes">Yes</option>
        <option value="no">No</option>
    </select>
    <br><br>

    <label>CNIC No</label>
    <input type="number" id="CnicInp">
    <br><br>

    <button id="AddBtn">Add</button>
    <button id="RetBtn">Retrieve</button>
    <button id="UpdBtn">Update</button>
    <button id="DelBtn">Delete</button>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

        const firebaseConfig = {
            apiKey: "your-api-key",
            authDomain: "your-auth-domain",
            databaseURL: "your-database-url",
            projectId: "your-project-id",
            storageBucket: "your-storage-bucket",
            messagingSenderId: "your-sender-id",
            appId: "your-app-id"
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase();

        let FnameInp = document.getElementById('FnameInp');
        let LnameInp = document.getElementById('LnameInp');
        let DeptInp = document.getElementById('DeptInp');
        let SwimInp = document.getElementById('SwimInp');
        let CnicInp = document.getElementById('CnicInp');

        let AddBtn = document.getElementById('AddBtn');
        let RetBtn = document.getElementById('RetBtn');
        let UpdBtn = document.getElementById('UpdBtn');
        let DelBtn = document.getElementById('DelBtn');

        function AddData() {
            set(ref(db, 'EmployeeSet/' + CnicInp.value), {
                nameofemployee: { firstname: FnameInp.value, lastname: LnameInp.value },
                department: DeptInp.value,
                canswim: (SwimInp.value == "yes"),
                cnic: Number(CnicInp.value)
            }).then(() => {
                alert("Data Added Successfully");
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.error(error);
            });
        }

        function RetData() {
            get(ref(db, 'EmployeeSet/' + CnicInp.value)).then((snapshot) => {
                if (snapshot.exists()) {
                    FnameInp.value = snapshot.val().nameofemployee.firstname;
                    LnameInp.value = snapshot.val().nameofemployee.lastname;
                    DeptInp.value = snapshot.val().department;
                    SwimInp.value = (snapshot.val().canswim) ? "yes" : "no";
                } else {
                    alert("Employee does not exist");
                }
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.error(error);
            });
        }

        function UpdateData() {
            update(ref(db, 'EmployeeSet/' + CnicInp.value), {
                nameofemployee: { firstname: FnameInp.value, lastname: LnameInp.value },
                department: DeptInp.value,
                canswim: (SwimInp.value == "yes"),
                cnic: Number(CnicInp.value)
            }).then(() => {
                alert("Data Updated Successfully");
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.error(error);
            });
        }

        function DeleteData() {
            remove(ref(db, 'EmployeeSet/' + CnicInp.value))
            .then(() => {
                alert("Data Deleted Successfully");
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.error(error);
            });
        }

        AddBtn.addEventListener('click', AddData);
        RetBtn.addEventListener('click', RetData);
        UpdBtn.addEventListener('click', UpdateData);
        DelBtn.addEventListener('click', DeleteData);

    </script>

</body>

</html>
Explicações dos ajustes realizados:
Importações corretas: Importei initializeApp de firebase-app.js e getDatabase, ref, set, get, update, remove de firebase-database.js. Esses são os módulos corretos para trabalhar com o Realtime Database do Firebase v10.

Configuração do Firebase: A configuração do Firebase (firebaseConfig) foi mantida como você forneceu, mas lembre-se de substituir pelos valores reais do seu projeto Firebase.

Funções de manipulação de dados: As funções AddData, RetData, UpdateData e DeleteData foram ajustadas para usar os métodos corretos (set, get, update, remove) da nova API do Firebase v10.

Certifique-se de substituir "your-api-key", "your-auth-domain", etc., pelos valores reais do seu projeto Firebase. Além disso, sempre consulte a documentação mais recente do Firebase para obter orientações sobre como integrar o Firebase em suas aplicações web.
