

export const logger = {
    info: (message: string, context?: any) => {
        console.log(`info: ${message}, ${
            JSON.stringify(context)
        }`)
    },

    error: (message: string, err?: any) => {
        console.log(`errro: ${message}, ${
            JSON.stringify(err)
        }`)
    }
}