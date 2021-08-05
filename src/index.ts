import { App } from "./app";

async function initService() {
    await App.start()
}

initService()