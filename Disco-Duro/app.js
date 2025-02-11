import { PORT } from './env.js';
import { server } from './src/server.js';

const puerto = PORT || 3001;

server.listen(puerto, () => {
    console.log(`Servidor a la escucha en el puerto: ${puerto}`);
});
