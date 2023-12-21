import express  from 'express';
import { engine } from 'express-handlebars';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import personasRoutes from './routes/personas.routes.js';


//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('views engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//Rutas
app.get('/', (req, res)=>{
    res.render('index.hbs')
})

app.use(personasRoutes);


//Public files
app.use(express.static(join(__dirname, 'public')));


//Ejecutar servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor funcionando en el puerto', app.get('port'));
});

