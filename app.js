import { server as app } from './src/server.js';
import { PORT } from './env.js';

const puerto = PORT || 3001;

app.listen(puerto, () => {
    console.log(`Servidor a la escucha en el puerto: ${puerto}`);
});
