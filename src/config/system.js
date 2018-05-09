import dotenv from 'dotenv'
dotenv.config()
export const nodeENV = process.env.NODE_ENV
export const baseURI = process.env.BASE_URI
export const projectName = process.env.PROJECT_NAME
export const port = process.env.PORT
