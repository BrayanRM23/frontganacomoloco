import './styles/adminform.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminForm({ callback }) {
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");  
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Validación simple sin autenticación
        fetch('https://backganacomoloco-b1gi.vercel.app/v1/signos/loginadmin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(responseData => {
            // Verificar el tipo de usuario en la respuesta
            if (responseData.resultado === 'user') {
                callback(username);
                goTo('/userHome');
            } else if (responseData.resultado === 'admin') {
                callback(username);
                goTo("/adminHome");
            } else {
                alert("Credenciales inválidas");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud. Inténtalo de nuevo.");
        });
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">¡Gana como Loco!</h1>
            
            <h4 className="txt">Nombre de Usuario</h4>  
            <input 
                type="text" 
                className="entry" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            /><br />

            <h4 className="txt">Contraseña</h4>  
            <input 
                type="password" 
                className="entry" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            /><br />

            <input type="submit" value="Ingresar" id="btnEnviar" />
        </form>   
    );
}

export default AdminForm;
