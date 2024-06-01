import express, {NextFunction, Request, Response} from 'express'
import modsRouter from '@backend/routes/modsRoutes'
import combinationsRouter from '@backend//routes/combinationsRoutes'
import databaseInitializerRouter from '@backend/routes/databaseRoutes'
import visualisationsRouter from '@backend/routes/visualisationsRoutes'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import NodeCache from 'node-cache'
import path from 'path'
import {ROOT_DIRECTORY} from '@src/globals'

export const cache = new NodeCache()
const swaggerFile = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIRECTORY, 'swagger.json'), 'utf8'))

const cacheMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const key = request.originalUrl
    const cachedResponse = cache.get(key)
    if (cachedResponse) {
        response.send(cachedResponse)
    } else {
        next()
    }
}

const allowCrossDomain = (_request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(allowCrossDomain)
app.disable('etag')

app.use('/mods', modsRouter)
app.use('/combinations', combinationsRouter)
app.use('/database', databaseInitializerRouter)
app.use('/visualisations', visualisationsRouter)

app.use(cacheMiddleware)
export default app